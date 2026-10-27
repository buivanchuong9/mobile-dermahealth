import { translate } from '@i18n';
import { FadeInView } from '../../motion';
import { EmptyState } from '../EmptyState';
import type { AsyncStateViewProps } from './AsyncStateView.types';

/**
 * Renders one async section in exactly one of three states: placeholder,
 * error with retry, or content. Content fades in when the data first arrives
 * and is not replayed by background refreshes.
 */
export function AsyncStateView<T, E>({
  state,
  loading,
  errorTitle,
  errorDescription,
  onRetry,
  errorTestID,
  children,
}: AsyncStateViewProps<T, E>) {
  if (state.status === 'loading') {
    return <>{loading}</>;
  }
  if (state.status === 'error') {
    return (
      <FadeInView variant="fade">
        <EmptyState
          icon="triangle-alert"
          title={errorTitle ?? translate('common.loadFailedTitle')}
          description={errorDescription ?? translate('common.loadFailedBody')}
          actionLabel={translate('common.retry')}
          onAction={onRetry}
          testID={errorTestID}
        />
      </FadeInView>
    );
  }
  return <FadeInView variant="fade">{children(state.data)}</FadeInView>;
}
