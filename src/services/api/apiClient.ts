import { createAppError, err, ok } from '../../model/common';
import type { AppError, AppErrorCode, Result } from '../../model/common';
import type { AccessTokenStore } from './accessTokenStore';
import type { EndpointDefinition } from '../../configs/urls';

type PathParams = Readonly<Record<string, string | number>>;
type QueryValue = string | number | boolean | undefined;

export type ApiRequest = {
  /** Fills `:name` segments of the endpoint path. */
  readonly params?: PathParams;
  readonly query?: Readonly<Record<string, QueryValue>>;
  /** Sent as JSON. */
  readonly body?: unknown;
  readonly signal?: AbortSignal;
};

export type ApiClient = {
  /**
   * Calls an endpoint from `urlsApi` and returns the unwrapped `data` of the
   * backend envelope, or an `AppError`. Never throws.
   */
  call<T>(
    endpoint: EndpointDefinition,
    request?: ApiRequest,
  ): Promise<Result<T, AppError>>;
};

export type ApiClientOptions = {
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly tokens: AccessTokenStore;
};

type Envelope = {
  readonly success?: boolean;
  readonly data?: unknown;
  readonly error?: { readonly code?: string; readonly message?: string };
};

function errorCodeForStatus(status: number): AppErrorCode {
  if (status === 401 || status === 403) {
    return 'permission_denied';
  }
  if (status === 404) {
    return 'not_found';
  }
  if (status === 400 || status === 409 || status === 422) {
    return 'validation';
  }
  return status >= 500 ? 'unavailable' : 'unknown';
}

function buildUrl(
  baseUrl: string,
  endpoint: EndpointDefinition,
  { params, query }: ApiRequest,
): string {
  const path = endpoint.path.replace(/:([A-Za-z0-9_]+)/g, (_, name: string) => {
    const value = params?.[name];
    if (value === undefined) {
      throw new Error(`Missing path parameter "${name}" for ${endpoint.path}`);
    }
    return encodeURIComponent(String(value));
  });
  const pairs = Object.entries(query ?? {})
    .filter((entry): entry is [string, string | number | boolean] => {
      return entry[1] !== undefined;
    })
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    );
  return baseUrl + path + (pairs.length > 0 ? `?${pairs.join('&')}` : '');
}

async function readEnvelope(response: Response): Promise<Envelope | null> {
  try {
    return (await response.json()) as Envelope;
  } catch {
    return null;
  }
}

export function createApiClient({
  baseUrl,
  timeoutMs,
  tokens,
}: ApiClientOptions): ApiClient {
  const root = baseUrl.replace(/\/+$/, '');

  return {
    async call<T>(endpoint: EndpointDefinition, request: ApiRequest = {}) {
      const token = tokens.get();
      if (endpoint.access === 'authenticated' && token === null) {
        return err(
          createAppError(
            'permission_denied',
            'Sign-in is required for this API.',
          ),
        );
      }

      let url: string;
      try {
        url = buildUrl(root, endpoint, request);
      } catch (cause) {
        return err(createAppError('validation', 'Invalid API request.', cause));
      }

      const headers: Record<string, string> = { Accept: 'application/json' };
      if (request.body !== undefined) {
        headers['Content-Type'] = 'application/json';
      }
      if (endpoint.access === 'authenticated' && token !== null) {
        headers.Authorization = `Bearer ${token}`;
      }

      const controller = new AbortController();
      request.signal?.addEventListener('abort', () => controller.abort());
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(url, {
          method: endpoint.method,
          headers,
          body:
            request.body === undefined
              ? undefined
              : JSON.stringify(request.body),
          signal: controller.signal,
        });
        const envelope = await readEnvelope(response);
        if (!response.ok || envelope?.success === false) {
          return err(
            createAppError(
              errorCodeForStatus(response.status),
              envelope?.error?.message ??
                `Request failed (${response.status}).`,
              envelope?.error?.code,
            ),
          );
        }
        return ok(envelope?.data as T);
      } catch (cause) {
        return err(
          createAppError('network', 'Could not reach the server.', cause),
        );
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
