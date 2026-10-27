import { useContext } from 'react';
import type { AppServices } from '../../../app/composition/createAppServices';
import { AppServicesContext } from '../AppServicesContext';

export function useAppServices(): AppServices {
  const services = useContext(AppServicesContext);
  if (services === null) {
    throw new Error(
      'useAppServices must be used inside an AppServicesProvider',
    );
  }
  return services;
}
