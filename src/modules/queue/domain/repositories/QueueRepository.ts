import type { AppError, Result } from '@core/contracts';
import type {
  IssueTicketRequest,
  QueueEvent,
  QueueSnapshot,
} from '../entities/Queue';

export interface QueueRepository {
  /** Resolves to `null` when the patient has no ticket. */
  getSnapshot(): Promise<Result<QueueSnapshot | null, AppError>>;
  /** Creates a ticket for the appointment; repeating the call reuses it. */
  issueTicket(
    request: IssueTicketRequest,
  ): Promise<Result<QueueSnapshot, AppError>>;
  /** Simulation only: moves the queue forward one step. */
  advance(): Promise<Result<QueueSnapshot, AppError>>;
  /** Simulation only: removes the ticket and restarts the clock. */
  reset(): Promise<Result<void, AppError>>;
  subscribe(listener: () => void): () => void;
  onEvent(listener: (event: QueueEvent) => void): () => void;
}
