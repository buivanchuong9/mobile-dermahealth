import { View } from 'react-native';
import { Button, Typography } from '@components/primitives';
import { SectionCard } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { SimulationPanelProps } from './SimulationPanel.types';

export function SimulationPanel({
  finished,
  autoRunning,
  onAdvance,
  onToggleAuto,
  onReset,
}: SimulationPanelProps) {
  const theme = useTheme();
  return (
    <SectionCard
      title={translate('queue.simulation.title')}
      testID="queue-simulation"
    >
      <Typography variant="caption" tone="secondary">
        {translate('queue.simulation.note')}
      </Typography>
      {finished ? (
        <Typography variant="caption" accessibilityRole="alert">
          {translate('queue.simulation.finished')}
        </Typography>
      ) : null}
      <View style={{ gap: theme.spacing[2] }}>
        <Button
          label={translate('queue.simulation.advance')}
          onPress={onAdvance}
          disabled={finished}
          fullWidth
          testID="queue-advance"
        />
        <Button
          label={translate(
            autoRunning
              ? 'queue.simulation.autoStop'
              : 'queue.simulation.autoStart',
          )}
          variant="secondary"
          onPress={onToggleAuto}
          disabled={finished}
          fullWidth
          testID="queue-auto"
        />
        <Button
          label={translate('queue.simulation.reset')}
          variant="ghost"
          onPress={onReset}
          fullWidth
          testID="queue-reset"
        />
      </View>
    </SectionCard>
  );
}
