import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Alert } from 'react-native';
import { createAppError, err, ok } from '@core/contracts';
import { ThemeProvider } from '@design-system/theme';
import type { SkinProfileUseCases } from '../application/use-cases/createSkinProfileUseCases';
import { SkinProfileScreen } from '../presentation/screens/SkinProfileScreen';
import { createFakeUseCases } from './testDoubles';

const SAVED = {
  skinType: 'dry',
  concerns: ['acne'],
  updatedAt: '2026-01-01T00:00:00.000Z',
} as const;

async function renderScreen(useCases: SkinProfileUseCases) {
  render(
    <ThemeProvider>
      <SkinProfileScreen useCases={useCases} />
    </ThemeProvider>,
  );
  await waitFor(() =>
    expect(screen.queryByTestId('skin-profile-loading')).toBeNull(),
  );
}

afterEach(() => jest.restoreAllMocks());

test('shows a loading state, then the empty state with the disclaimer', async () => {
  let release: () => void = () => {};
  const gate = new Promise<void>(resolve => (release = resolve));
  render(
    <ThemeProvider>
      <SkinProfileScreen
        useCases={createFakeUseCases({
          load: async () => {
            await gate;
            return ok(null);
          },
        })}
      />
    </ThemeProvider>,
  );
  expect(screen.getByTestId('skin-profile-loading')).toBeTruthy();

  release();
  await waitFor(() =>
    expect(screen.getByTestId('skin-profile-empty')).toBeTruthy(),
  );
  expect(screen.getByText(/không phải chẩn đoán y khoa/)).toBeTruthy();
  expect(screen.getByText(/chỉ được lưu trên thiết bị này/)).toBeTruthy();
  expect(screen.queryByTestId('skin-profile-delete')).toBeNull();
});

test('nothing is preselected when no profile exists', async () => {
  await renderScreen(createFakeUseCases());
  for (const radio of screen.getAllByRole('radio')) {
    expect(radio).not.toBeChecked();
  }
  for (const checkbox of screen.getAllByRole('checkbox')) {
    expect(checkbox).not.toBeChecked();
  }
});

test('loads a saved profile into the form', async () => {
  await renderScreen(createFakeUseCases({ load: async () => ok(SAVED) }));
  expect(screen.getByTestId('skin-type-dry')).toBeChecked();
  expect(screen.getByTestId('skin-concern-acne')).toBeChecked();
  expect(screen.queryByTestId('skin-profile-empty')).toBeNull();
  expect(screen.getByTestId('skin-profile-delete')).toBeTruthy();
});

test('exposes radio and checkbox semantics', async () => {
  await renderScreen(createFakeUseCases());
  expect(screen.getByLabelText('Loại da').props.accessibilityRole).toBe(
    'radiogroup',
  );
  expect(screen.getAllByRole('radio')).toHaveLength(6);
  expect(screen.getAllByRole('checkbox')).toHaveLength(8);

  fireEvent.press(screen.getByTestId('skin-type-oily'));
  expect(screen.getByTestId('skin-type-oily')).toBeChecked();
  expect(screen.getByTestId('skin-type-dry')).not.toBeChecked();
});

test('selecting a skin type is exclusive and concerns toggle', async () => {
  await renderScreen(createFakeUseCases());
  fireEvent.press(screen.getByTestId('skin-concern-acne'));
  expect(screen.getByTestId('skin-concern-acne')).toBeChecked();
  fireEvent.press(screen.getByTestId('skin-concern-acne'));
  expect(screen.getByTestId('skin-concern-acne')).not.toBeChecked();
});

test('blocks saving without a skin type and announces the error', async () => {
  const save = jest.fn();
  await renderScreen(createFakeUseCases({ save }));

  fireEvent.press(screen.getByTestId('skin-profile-save'));

  expect(save).not.toHaveBeenCalled();
  const message = screen.getByText('Vui lòng chọn loại da của bạn.');
  expect(message.props.accessibilityRole).toBe('alert');

  fireEvent.press(screen.getByTestId('skin-type-normal'));
  expect(screen.queryByText('Vui lòng chọn loại da của bạn.')).toBeNull();
});

test('saves the selection and confirms it', async () => {
  const save = jest.fn(createFakeUseCases().save);
  await renderScreen(createFakeUseCases({ save }));

  fireEvent.press(screen.getByTestId('skin-type-combination'));
  fireEvent.press(screen.getByTestId('skin-concern-dullness'));
  fireEvent.press(screen.getByTestId('skin-profile-save'));

  await waitFor(() =>
    expect(screen.getByTestId('skin-profile-saved')).toBeTruthy(),
  );
  expect(save).toHaveBeenCalledWith({
    skinType: 'combination',
    concerns: ['dullness'],
  });
  expect(screen.getByTestId('skin-profile-delete')).toBeTruthy();
});

test('shows a save failure and keeps the user input', async () => {
  await renderScreen(
    createFakeUseCases({
      save: async () => err(createAppError('storage', 'disk full')),
    }),
  );

  fireEvent.press(screen.getByTestId('skin-type-sensitive'));
  fireEvent.press(screen.getByTestId('skin-profile-save'));

  await waitFor(() =>
    expect(screen.getByTestId('skin-profile-save-failed')).toBeTruthy(),
  );
  expect(screen.queryByTestId('skin-profile-saved')).toBeNull();
  expect(screen.getByTestId('skin-type-sensitive')).toBeChecked();
  expect(screen.queryByText(/disk full/)).toBeNull();
});

test('a load failure offers retry and never shows the form', async () => {
  const load = jest
    .fn<ReturnType<SkinProfileUseCases['load']>, []>()
    .mockResolvedValueOnce(err(createAppError('storage', 'corrupt')))
    .mockResolvedValueOnce(ok(null));
  await renderScreen(createFakeUseCases({ load }));

  expect(screen.getByText('Không thể đọc hồ sơ đã lưu')).toBeTruthy();
  expect(screen.queryByTestId('skin-profile-save')).toBeNull();

  fireEvent.press(screen.getByTestId('skin-profile-retry'));
  await waitFor(() =>
    expect(screen.getByTestId('skin-profile-save')).toBeTruthy(),
  );
});

test('deleting asks for confirmation and then clears the form', async () => {
  const remove = jest.fn(async () => ok(undefined));
  const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  await renderScreen(
    createFakeUseCases({ load: async () => ok(SAVED), remove }),
  );

  fireEvent.press(screen.getByTestId('skin-profile-delete'));
  expect(remove).not.toHaveBeenCalled();
  const buttons = alert.mock.calls[0]?.[2] ?? [];
  buttons.find(button => button.style === 'destructive')?.onPress?.();

  await waitFor(() =>
    expect(screen.getByTestId('skin-profile-empty')).toBeTruthy(),
  );
  expect(remove).toHaveBeenCalledTimes(1);
  expect(screen.getByTestId('skin-type-dry')).not.toBeChecked();
});

test('a failed delete keeps the saved profile and reports it', async () => {
  const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  await renderScreen(
    createFakeUseCases({
      load: async () => ok(SAVED),
      remove: async () => err(createAppError('storage', 'locked')),
    }),
  );

  fireEvent.press(screen.getByTestId('skin-profile-delete'));
  alert.mock.calls[0]?.[2]?.find(b => b.style === 'destructive')?.onPress?.();

  await waitFor(() =>
    expect(
      screen.getByText('Không thể xóa hồ sơ. Vui lòng thử lại.'),
    ).toBeTruthy(),
  );
  expect(screen.getByTestId('skin-type-dry')).toBeChecked();
});
