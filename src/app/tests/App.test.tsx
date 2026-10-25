import { render, screen, waitFor } from '@testing-library/react-native';
import { App } from '@app/App';

jest.mock('@platform/storage', () => ({
  createLocalKeyValueStorage: () => ({
    getItem: async () => ({ ok: true, value: null }),
    setItem: async () => ({ ok: true, value: undefined }),
    removeItem: async () => ({ ok: true, value: undefined }),
  }),
}));

test('opens on the Skin Profile screen with no profile saved', async () => {
  render(<App />);
  await waitFor(() =>
    expect(screen.getByTestId('skin-profile-empty')).toBeTruthy(),
  );
  expect(screen.getByText('Hồ sơ da của bạn')).toBeTruthy();
});
