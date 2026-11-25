import { Image, StyleSheet, View } from 'react-native';
import { Typography } from '@components/primitives';

export function AppBrand() {
  return (
    <View style={styles.brand} accessible accessibilityLabel="DermaHealth">
      <Image
        source={require('../../assets/brand/logo-mark.png')}
        style={styles.mark}
        resizeMode="contain"
      />
      <Typography variant="bodyStrong">DermaHealth</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  mark: { width: 38, height: 38, borderRadius: 10 },
});
