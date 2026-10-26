import { View } from 'react-native';
import { ProgressBar } from '@design-system/feedback';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
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
