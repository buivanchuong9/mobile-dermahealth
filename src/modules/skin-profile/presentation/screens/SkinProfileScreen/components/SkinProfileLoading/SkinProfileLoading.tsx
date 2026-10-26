import { ScrollView } from 'react-native';
import { Skeleton, SkeletonGroup } from '@design-system/feedback';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';

/** Form-shaped placeholder: intro, skin-type options, concern options. */
export function SkinProfileLoading() {
  const theme = useTheme();
  return (
    <ScrollView
      scrollEnabled={false}
      contentContainerStyle={{ padding: theme.spacing[5] }}
    >
      <SkeletonGroup
        label={translate('skinProfile.loading')}
        gap={theme.spacing[5]}
        testID="skin-profile-loading"
      >
        <Skeleton width="60%" height={26} />
        <Skeleton width="90%" height={14} />
        <Skeleton width="45%" height={18} />
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} height={64} radius={theme.radius.md} />
        ))}
        <Skeleton width="45%" height={18} />
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} height={52} radius={theme.radius.md} />
        ))}
      </SkeletonGroup>
    </ScrollView>
  );
}
