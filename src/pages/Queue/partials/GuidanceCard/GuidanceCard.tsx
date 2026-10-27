import { Banner } from '@components/feedback';
import { translate } from '@i18n';
import type { GuidanceCardProps } from './GuidanceCard.types';

export function GuidanceCard({ snapshot }: GuidanceCardProps) {
  const tone =
    snapshot.guidance === 'go_to_room'
      ? 'success'
      : snapshot.guidance === 'prepare'
      ? 'warning'
      : 'info';
  return (
    <Banner
      tone={tone}
      icon={snapshot.guidance === 'go_to_room' ? 'door-open' : 'navigation'}
      title={translate(`queue.guidance.${snapshot.guidance}.title`)}
      message={translate(`queue.guidance.${snapshot.guidance}.body`, {
        room: snapshot.ticket.room,
      })}
      testID="queue-guidance"
    />
  );
}
