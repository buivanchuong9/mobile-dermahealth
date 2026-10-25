import { fireEvent, render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../../theme';
import { Button } from '../Button';
import type { ButtonProps } from '../Button.types';

function setup(props: Partial<ButtonProps> = {}) {
  const onPress = jest.fn();
  render(
    <ThemeProvider>
      <Button label="Tiếp tục" onPress={onPress} {...props} />
    </ThemeProvider>,
  );
  return { onPress, button: screen.getByRole('button') };
}

test('renders the label and calls onPress', () => {
  const { onPress, button } = setup();
  expect(screen.getByText('Tiếp tục')).toBeTruthy();
  fireEvent.press(button);
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('does not call onPress when disabled', () => {
  const { onPress, button } = setup({ disabled: true });
  fireEvent.press(button);
  expect(onPress).not.toHaveBeenCalled();
  expect(button).toBeDisabled();
});

test('is busy and ignores presses while loading', () => {
  const { onPress, button } = setup({ loading: true });
  fireEvent.press(button);
  expect(onPress).not.toHaveBeenCalled();
  expect(button).toBeBusy();
  expect(button.props.accessibilityLabel).toBe('Tiếp tục, Đang tải');
});

test('uses accessibilityLabel and hint when provided', () => {
  const { button } = setup({
    accessibilityLabel: 'Tiếp tục sang bước sau',
    accessibilityHint: 'Mở màn hình tiếp theo',
  });
  expect(button.props.accessibilityLabel).toBe('Tiếp tục sang bước sau');
  expect(button.props.accessibilityHint).toBe('Mở màn hình tiếp theo');
});

test.each(['primary', 'secondary', 'ghost'] as const)(
  'renders the %s variant',
  variant => {
    setup({ variant });
    expect(screen.getByText('Tiếp tục')).toBeTruthy();
  },
);

test('small buttons expand their hit area to the minimum touch target', () => {
  const { button } = setup({ size: 'sm' });
  expect(button.props.hitSlop).toBe(2);
});

test('requires a ThemeProvider', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => render(<Button label="x" onPress={() => {}} />)).toThrow();
  spy.mockRestore();
});
