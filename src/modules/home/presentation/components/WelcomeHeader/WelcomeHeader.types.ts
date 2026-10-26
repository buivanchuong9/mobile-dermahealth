import type { LocalDateTime } from '@shared/utilities/localDateTime';

export type WelcomeHeaderProps = {
  readonly name: string;
  readonly now: LocalDateTime;
  readonly unreadCount: number;
  readonly onOpenNotifications: () => void;
};
