import { ListItem } from '@components/data-display';
import { Button, Typography } from '@components/primitives';
import { SectionCard } from '@components/surfaces';
import { translate } from '@i18n';
import type { ReminderListProps } from './ReminderList.types';
import { ICON, MAX_ITEMS } from './ReminderList.constants';

export function ReminderList({
  notifications,
  onOpenNotifications,
}: ReminderListProps) {
  const shown = [...notifications]
    .sort((a, b) => Number(a.read) - Number(b.read))
    .slice(0, MAX_ITEMS);
  return (
    <SectionCard
      title={translate('home.reminders.title')}
      testID="home-reminders"
    >
      {shown.length === 0 ? (
        <Typography tone="secondary">
          {translate('home.reminders.empty')}
        </Typography>
      ) : (
        shown.map(item => (
          <ListItem
            key={item.id}
            icon={ICON[item.kind]}
            title={item.title}
            subtitle={item.body}
            onPress={onOpenNotifications}
          />
        ))
      )}
      <Button
        label={translate('home.reminders.viewAll')}
        variant="ghost"
        size="sm"
        onPress={onOpenNotifications}
      />
    </SectionCard>
  );
}
