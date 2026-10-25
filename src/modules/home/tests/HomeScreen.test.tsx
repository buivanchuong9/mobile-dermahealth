import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { createAppError, err, ok } from '@core/contracts';
import { ThemeProvider } from '@design-system/theme';
import type { SkinProfile, SkinProfileUseCases } from '@modules/skin-profile';
import { SkinProfileSummaryCard } from '../presentation/components/SkinProfileSummaryCard';

const PROFILE: SkinProfile = {
  skinType: 'combination',
  concerns: ['acne', 'dullness'],
  updatedAt: '2026-01-01T00:00:00.000Z',
};

function createUseCases(
  load: SkinProfileUseCases['load'],
): SkinProfileUseCases {
  return {
    load,
    save: async () => err(createAppError('unknown', 'unused')),
    remove: async () => ok(undefined),
  };
}

function renderHome(load: SkinProfileUseCases['load']) {
  const onOpen = jest.fn();
  render(
    <ThemeProvider>
      <SkinProfileSummaryCard useCases={createUseCases(load)} onOpen={onOpen} />
    </ThemeProvider>,
  );
  return onOpen;
}

test('shows a loading state first', async () => {
  renderHome(() => new Promise(() => {}));
  expect(screen.getByTestId('home-skin-loading')).toBeTruthy();
});

test('empty state invites the user to fill in the profile', async () => {
  const onOpen = renderHome(async () => ok(null));
  await waitFor(() =>
    expect(screen.getByTestId('home-skin-empty')).toBeTruthy(),
  );
  expect(screen.getByText('Khai báo hồ sơ da')).toBeTruthy();
  fireEvent.press(screen.getByTestId('home-skin-open'));
  expect(onOpen).toHaveBeenCalledTimes(1);
});

test('shows the saved skin type and concerns', async () => {
  renderHome(async () => ok(PROFILE));
  await waitFor(() =>
    expect(screen.getByTestId('home-skin-type')).toBeTruthy(),
  );
  expect(screen.getByText('Da hỗn hợp')).toBeTruthy();
  expect(screen.getByText('Mụn')).toBeTruthy();
  expect(screen.getByText('Da xỉn màu')).toBeTruthy();
  expect(screen.getByText('Xem và cập nhật hồ sơ')).toBeTruthy();
});

test('a profile without concerns says so', async () => {
  renderHome(async () => ok({ ...PROFILE, concerns: [] }));
  await waitFor(() =>
    expect(screen.getByText('Chưa chọn mối quan tâm nào')).toBeTruthy(),
  );
});

test('a read error is announced and the profile can still be opened', async () => {
  const onOpen = renderHome(async () =>
    err(createAppError('storage', 'corrupt')),
  );
  await waitFor(() =>
    expect(
      screen.getByText('Không thể đọc hồ sơ đã lưu trên thiết bị này.'),
    ).toBeTruthy(),
  );
  fireEvent.press(screen.getByTestId('home-skin-open'));
  expect(onOpen).toHaveBeenCalledTimes(1);
});
