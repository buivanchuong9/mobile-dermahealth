import { Banner } from '@design-system/feedback';
import { translate } from '@shared/localization';
import type { QueueSnapshot } from '../../../domain/entities/Queue';

export function GuidanceCard({
  snapshot,
}: {
  readonly snapshot: QueueSnapshot;
}) {
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
