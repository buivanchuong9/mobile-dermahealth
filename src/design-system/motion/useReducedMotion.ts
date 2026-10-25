import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/** True when the user asked the OS to reduce motion. Defaults to false. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then(value => {
        if (active) {
          setReduced(value);
        }
      })
      .catch(() => {});
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduced,
    );
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  return reduced;
}
