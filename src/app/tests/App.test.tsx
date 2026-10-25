import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { App } from '@app/App';

jest.mock('@platform/storage', () => ({
  createLocalKeyValueStorage: () => ({
    getItem: async () => ({ ok: true, value: null }),
    setItem: async () => ({ ok: true, value: undefined }),
    removeItem: async () => ({ ok: true, value: undefined }),
  }),
}));

test('opens on Home and navigates to the Skin Profile screen and back', async () => {
  render(<App />);
  await waitFor(() =>
    expect(screen.getByTestId('home-skin-empty')).toBeTruthy(),
  );

  fireEvent.press(screen.getByTestId('home-skin-open'));
  await waitFor(() =>
    expect(screen.getByTestId('skin-profile-empty')).toBeTruthy(),
  );
  expect(screen.getByText('Hồ sơ da của bạn')).toBeTruthy();

  fireEvent.press(screen.getByTestId('back-button'));
  await waitFor(() =>
    expect(screen.getByTestId('home-skin-empty')).toBeTruthy(),
  );
});
