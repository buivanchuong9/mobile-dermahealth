import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { contrastRatio } from '../../accessibility';
import { contrastPairs } from '../contrastPairs';
import { lightTheme } from '../lightTheme';
import type { Theme } from '../Theme.types';
import { ThemeProvider, useTheme } from '../ThemeProvider';

const themes: readonly Theme[] = [lightTheme];

describe.each(themes)('contrast of the $name theme', theme => {
  test.each(contrastPairs.map(pair => [pair.description, pair] as const))(
    '%s meets its minimum ratio',
    (_description, pair) => {
      const ratio = contrastRatio(
        pair.foreground(theme),
        pair.background(theme),
      );
      expect(ratio).toBeGreaterThanOrEqual(pair.minimumRatio);
    },
  );
});

function ThemeName() {
  return <Text>{useTheme().name}</Text>;
}

test('ThemeProvider defaults to the light theme', () => {
  render(
    <ThemeProvider>
      <ThemeName />
    </ThemeProvider>,
  );
  expect(screen.getByText('light')).toBeTruthy();
});

test('ThemeProvider supplies a custom theme', () => {
  render(
    <ThemeProvider theme={{ ...lightTheme, name: 'light' }}>
      <ThemeName />
    </ThemeProvider>,
  );
  expect(screen.getByText('light')).toBeTruthy();
});

test('useTheme throws outside a provider', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => render(<ThemeName />)).toThrow('ThemeProvider');
  spy.mockRestore();
});
