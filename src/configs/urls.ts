/**
 * THE ONLY place that lists backend endpoints, their URL prefix and the
 * permission code each feature needs. To add or change an API, edit this file.
 *
 *   section    = a feature (appointments, me, ...)
 *   prefix     = the part of the URL after the domain (`APP_API_BASE_URL`)
 *   permission = the backend permission code (be/src/common/authorization/
 *                permissions.catalog.ts). Omit it when any signed-in user may
 *                call the API. The server enforces it; the client only uses it
 *                to hide actions (`canCallEndpoint`).
 *
 * Auth is implied by the helper you use: `open(...)` sends no token,
 * `secured(...)` attaches the bearer token and fails locally with
 * `permission_denied` when signed out.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Backend permission codes used by the mobile app (subset of the catalog). */
export const PERMISSIONS = {
  APPOINTMENT_BOOK: 'appointment.book',
  APPOINTMENT_MANAGE: 'appointment.manage',
  CONSENT_MANAGE_SELF: 'consent.manage.self',
  QUEUE_VIEW: 'queue.view',
  CHECKIN_QR_REDEEM: 'checkin.qr_redeem',
  MODULE_AI_ANALYSIS_ACCESS: 'module.ai_analysis.access',
  MODULE_RECORDS_ACCESS: 'module.records.access',
} as const;

export type PermissionCode = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export type EndpointDefinition = {
  readonly method: HttpMethod;
  /** Full path after the domain, may contain `:params`. */
  readonly path: string;
  readonly access: 'public' | 'authenticated';
  readonly permission?: PermissionCode;
};

/** URL prefixes appended to the domain. Change the API version here once. */
const PREFIX = {
  api: '/api/v1',
} as const;

const open = (
  method: HttpMethod,
  prefix: string,
  path: string,
): EndpointDefinition => ({ method, path: prefix + path, access: 'public' });

const secured = (
  method: HttpMethod,
  prefix: string,
  path: string,
  permission?: PermissionCode,
): EndpointDefinition =>
  permission
    ? { method, path: prefix + path, access: 'authenticated', permission }
    : { method, path: prefix + path, access: 'authenticated' };

const P = PREFIX.api;
const X = PERMISSIONS;

export const urlsApi = {
  auth: {
    register: open('POST', P, '/auth/registrations'),
    signIn: open('POST', P, '/auth/sessions'),
    refreshSession: open('POST', P, '/auth/session-refreshes'),
    signOut: secured('DELETE', P, '/auth/sessions/current'),
    forgotPassword: open('POST', P, '/auth/forgot-password'),
    resetPassword: open('POST', P, '/auth/reset-password'),
  },
  me: {
    getProfile: secured('GET', P, '/me'),
    updateProfile: secured('PATCH', P, '/me'),
    getPreferences: secured('GET', P, '/me/preferences'),
    updatePreferences: secured('PUT', P, '/me/preferences'),
  },
  patients: {
    getMine: secured('GET', P, '/patients/me'),
    getLifetimeRecord: secured(
      'GET',
      P,
      '/patients/:patientId/lifetime-medical-record',
      X.MODULE_RECORDS_ACCESS,
    ),
  },
  appointments: {
    list: secured('GET', P, '/appointments'),
    get: secured('GET', P, '/appointments/:appointmentId'),
    create: secured('POST', P, '/appointments', X.APPOINTMENT_BOOK),
    cancel: secured(
      'POST',
      P,
      '/appointments/:appointmentId/cancellations',
      X.APPOINTMENT_BOOK,
    ),
    reschedule: secured(
      'POST',
      P,
      '/appointments/:appointmentId/reschedules',
      X.APPOINTMENT_BOOK,
    ),
    createCheckInToken: secured(
      'POST',
      P,
      '/appointments/:appointmentId/check-in-tokens',
      X.CHECKIN_QR_REDEEM,
    ),
  },
  queue: {
    listTickets: secured('GET', P, '/queue-tickets', X.QUEUE_VIEW),
  },
  catalog: {
    listClinicLocations: secured('GET', P, '/clinic-locations'),
    listDepartments: secured('GET', P, '/departments'),
    listDoctors: secured('GET', P, '/doctors'),
    getDoctorAvailability: secured('GET', P, '/doctors/:doctorId/availability'),
  },
  skinAnalysis: {
    analyze: secured(
      'POST',
      P,
      '/ai/skin-analysis',
      X.MODULE_AI_ANALYSIS_ACCESS,
    ),
    analyzeCase: secured(
      'POST',
      P,
      '/ai/skin-analysis-cases',
      X.MODULE_AI_ANALYSIS_ACCESS,
    ),
  },
} as const satisfies Record<string, Record<string, EndpointDefinition>>;

/**
 * Client-side check for showing/hiding an action. `granted` is the permission
 * list of the signed-in user (null when signed out).
 */
export function canCallEndpoint(
  endpoint: EndpointDefinition,
  granted: readonly string[] | null,
): boolean {
  if (endpoint.access === 'public') {
    return true;
  }
  if (granted === null) {
    return false;
  }
  return (
    endpoint.permission === undefined || granted.includes(endpoint.permission)
  );
}
