import type { LocalDateTime } from '@utils/localDateTime';

export type WelcomeHeaderProps = {
  readonly name: string;
  readonly now: LocalDateTime;
  readonly unreadCount: number;
  readonly onOpenNotifications: () => void;
};
