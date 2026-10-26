import { useContext } from 'react';
import { AppSessionContext } from '../AppSessionContext';
import type { AppSession } from '../AppSessionProvider.types';

export function useAppSession(): AppSession {
  const value = useContext(AppSessionContext);
  if (value === null) {
    throw new Error('useAppSession must be used inside an AppSessionProvider');
  }
  return value;
}
