import { View } from 'react-native';
import { ProgressBar } from '@components/feedback';
import { Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { QuestionProgressProps } from './QuestionProgress.types';

/** "Câu 2 trên 4" and a progress bar. */
export function QuestionProgress({ current, total }: QuestionProgressProps) {
  const theme = useTheme();
  const text = translate('assessment.questions.progress', { current, total });
  return (
    <View style={{ gap: theme.spacing[2] }}>
      <Typography
        variant="caption"
        tone="secondary"
        accessibilityLiveRegion="polite"
      >
        {text}
      </Typography>
      <ProgressBar value={current / total} accessibilityLabel={text} />
    </View>
  );
}
