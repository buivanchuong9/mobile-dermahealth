import { ScrollView } from 'react-native';
import { useTheme } from '@styles/theme';
import { useSkinProfile } from '../hooks/useSkinProfile';
import { SkinConcernSection } from './components/SkinConcernSection';
import { SkinProfileActions } from './components/SkinProfileActions';
import { SkinProfileIntro } from './components/SkinProfileIntro';
import { SkinProfileLoadFailed } from './components/SkinProfileLoadFailed';
import { SkinProfileLoading } from './components/SkinProfileLoading';
import { SkinTypeSection } from './components/SkinTypeSection';
import { useDeleteConfirmation } from './hooks/useDeleteConfirmation';
import type { SkinProfileScreenProps } from './SkinProfileScreen.types';

export function SkinProfileScreen({ useCases }: SkinProfileScreenProps) {
  const theme = useTheme();
  const profile = useSkinProfile(useCases);
  const confirmDelete = useDeleteConfirmation(profile.remove);

  if (profile.loadStatus === 'loading') {
    return <SkinProfileLoading />;
  }

  if (profile.loadStatus === 'failed') {
    return (
      <SkinProfileLoadFailed
        deleteFailed={profile.notice === 'delete_failed'}
        onRetry={profile.reload}
        onRequestDelete={confirmDelete}
      />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing[5],
        gap: theme.spacing[5],
      }}
    >
      <SkinProfileIntro hasSavedProfile={profile.savedProfile !== null} />
      <SkinTypeSection
        value={profile.skinType}
        onChange={profile.selectSkinType}
        showRequiredError={profile.issues.some(
          issue => issue.field === 'skinType',
        )}
        disabled={profile.saving}
      />
      <SkinConcernSection
        selected={profile.concerns}
        onToggle={profile.toggleConcern}
        disabled={profile.saving}
      />
      <SkinProfileActions
        notice={profile.notice}
        saving={profile.saving}
        hasSavedProfile={profile.savedProfile !== null}
        onSave={profile.submit}
        onRequestDelete={confirmDelete}
      />
    </ScrollView>
  );
}
