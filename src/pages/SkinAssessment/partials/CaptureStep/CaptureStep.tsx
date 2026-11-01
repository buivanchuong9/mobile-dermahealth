import { useState } from 'react';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Banner } from '@components/feedback';
import { Button, Typography } from '@components/primitives';
import { Card } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { CaptureStepProps } from './CaptureStep.types';

export function CaptureStep({
  photo,
  onPhotoChange,
  onContinue,
}: CaptureStepProps) {
  const theme = useTheme();
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const choosePhoto = async (camera: boolean) => {
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      const options = {
        mediaType: 'photo' as const,
        quality: 0.8 as const,
        maxWidth: 1600,
        maxHeight: 1600,
      };
      const response = camera
        ? await launchCamera(options)
        : await launchImageLibrary(options);
      if (response.didCancel) return;
      const uri = response.assets?.[0]?.uri;
      if (response.errorCode || !uri) {
        setError(true);
      } else {
        onPhotoChange(uri);
      }
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Banner tone="info" message={translate('assessment.capture.intro')} />
      <Card>
        <Typography variant="subtitle" accessibilityRole="header">
          {translate('assessment.capture.tipsTitle')}
        </Typography>
        <View style={{ gap: theme.spacing[2] }}>
          <Typography>• {translate('assessment.capture.tip1')}</Typography>
          <Typography>• {translate('assessment.capture.tip2')}</Typography>
          <Typography>• {translate('assessment.capture.tip3')}</Typography>
        </View>
      </Card>
      {photo ? (
        <Card testID="assessment-photo">
          <Image
            source={{ uri: photo }}
            style={styles.photo}
            accessibilityLabel={translate('assessment.capture.sample')}
          />
          <Typography variant="caption" tone="secondary">
            {translate('assessment.capture.sampleNote')}
          </Typography>
          <Button
            label={translate('assessment.capture.removeSample')}
            variant="ghost"
            size="sm"
            onPress={() => onPhotoChange(null)}
          />
        </Card>
      ) : null}
      {error ? (
        <>
          <Banner tone="info" message={translate('assessment.capture.error')} />
          <Button
            label="Mở cài đặt thiết bị"
            variant="ghost"
            onPress={() => {
              Linking.openSettings().catch(() => {});
            }}
          />
        </>
      ) : null}
      <View style={{ gap: theme.spacing[2] }}>
        <Button
          label={translate('assessment.capture.takePhoto')}
          variant="secondary"
          onPress={() => choosePhoto(true)}
          disabled={busy}
          fullWidth
          testID="assessment-take-photo"
        />
        <Button
          label={translate('assessment.capture.pickPhoto')}
          variant="secondary"
          onPress={() => choosePhoto(false)}
          disabled={busy}
          fullWidth
          testID="assessment-pick-photo"
        />
      </View>
      <Button
        label={translate(
          photo ? 'assessment.capture.continue' : 'assessment.capture.skip',
        )}
        onPress={onContinue}
        disabled={busy}
        fullWidth
        size="lg"
        testID="assessment-capture-continue"
      />
    </>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#e8f1f2',
  },
});
