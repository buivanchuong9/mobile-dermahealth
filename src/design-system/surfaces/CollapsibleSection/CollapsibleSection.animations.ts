import { LayoutAnimation } from 'react-native';
import { useReducedMotion } from '../../motion';
import { useTheme } from '../../theme';

/** Returns a function that schedules the expand/collapse layout transition. */
export function useToggleAnimation(): () => void {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  return () => {
    if (reducedMotion) {
      return;
    }
    LayoutAnimation.configureNext({
      duration: theme.motion.duration.normal,
      update: { type: LayoutAnimation.Types.easeInEaseOut },
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
  };
}
