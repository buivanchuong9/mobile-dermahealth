import { View } from 'react-native';
import { Banner, ProgressBar } from '@components/feedback';
import { Button, Icon, Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { useAnalysisProgress } from './hooks/useAnalysisProgress';
import type { AnalyzingStepProps } from './AnalyzingStep.types';
import { styles } from './AnalyzingStep.styles';
import { STEPS } from './AnalyzingStep.constants';

export function AnalyzingStep({ status, onRetry }: AnalyzingStepProps) {
  const theme = useTheme();
  const running = status === 'running';
  const progress = useAnalysisProgress(running);

  return (
    <View
      style={[styles.center, { gap: theme.spacing[4] }]}
      testID="assessment-analyzing"
    >
      <Typography variant="title" align="center" accessibilityRole="header">
        {translate('assessment.analyzing.title')}
      </Typography>
      {running ? (
        <>
          <View style={styles.full}>
            <ProgressBar
              value={progress}
              accessibilityLabel={translate(
                'assessment.analyzing.progressLabel',
              )}
            />
          </View>
          <View style={{ gap: theme.spacing[2] }}>
            {STEPS.map((step, index) => {
              const done = progress > (index + 1) / (STEPS.length + 1);
              return (
                <View
                  key={step}
                  style={[styles.row, { gap: theme.spacing[2] }]}
                >
                  <Icon
                    name={done ? 'circle-check' : 'circle'}
                    size={18}
                    color={
                      done
                        ? theme.colors.feedback.success.foreground
                        : theme.colors.text.secondary
                    }
                  />
                  <Typography tone={done ? 'primary' : 'secondary'}>
                    {translate(`assessment.analyzing.steps.${step}`)}
                  </Typography>
                </View>
              );
            })}
          </View>
          <Typography variant="caption" tone="secondary" align="center">
            {translate('assessment.analyzing.note')}
          </Typography>
        </>
      ) : (
        <>
          <Banner
            tone="danger"
            message={translate('assessment.analyzing.failed')}
          />
          <Button
            label={translate('assessment.analyzing.retry')}
            onPress={onRetry}
            fullWidth
            testID="assessment-retry"
          />
        </>
      )}
    </View>
  );
}
