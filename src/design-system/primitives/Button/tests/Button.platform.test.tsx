import { render, screen } from '@testing-library/react-native';
import { Platform, StyleSheet } from 'react-native';
import { ThemeProvider } from '../../../theme';
import { Button } from '../Button';
import { getPressFeedback } from '../Button.feedback';

// Runs in both the "ios" and "android" Jest projects: the imported module
// `../Button.feedback` must resolve to the implementation of the active platform.
const expectedPlatform = Platform.OS === 'android' ? 'android' : 'ios';

test('Button.feedback resolves to the active platform implementation', () => {
  expect(getPressFeedback('#2563EB').platform).toBe(expectedPlatform);
});

test('android uses a ripple, iOS dims the button on press', () => {
  const feedback = getPressFeedback('#2563EB');
  if (expectedPlatform === 'android') {
    expect(feedback.pressableProps.android_ripple).toEqual({
      color: '#2563EB29',
    });
    expect(feedback.getPressedStyle(true)).toEqual({});
  } else {
    expect(feedback.pressableProps.android_ripple).toBeUndefined();
    expect(feedback.getPressedStyle(true)).toEqual({ opacity: 0.7 });
  }
});

test('Button applies the platform container style', () => {
  render(
    <ThemeProvider>
      <Button label="Tiếp tục" onPress={() => {}} />
    </ThemeProvider>,
  );
  const style = StyleSheet.flatten(screen.getByRole('button').props.style);
  expect(style.overflow).toBe(
    expectedPlatform === 'android' ? 'hidden' : undefined,
  );
});
