import { StyleSheet } from 'react-native';

export const MAIN_SIZE = 168;

export const SATELLITE_SIZE = 56;

export const styles = StyleSheet.create({
  stage: {
    width: MAIN_SIZE + SATELLITE_SIZE,
    height: MAIN_SIZE + SATELLITE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: MAIN_SIZE,
    height: MAIN_SIZE,
    borderRadius: MAIN_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  satellite: {
    position: 'absolute',
    width: SATELLITE_SIZE,
    height: SATELLITE_SIZE,
    borderRadius: SATELLITE_SIZE / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRight: { top: 8, right: 0 },
  bottomLeft: { bottom: 8, left: 0 },
});
