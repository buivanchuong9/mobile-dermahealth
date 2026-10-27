export type ProfileScreenProps = {
  readonly fullName: string;
  readonly email: string;
  readonly onOpenSkinProfile: () => void;
  readonly onOpenNotificationPreferences: () => void;
  readonly onOpenAssessmentHistory: () => void;
  readonly onOpenGuide: () => void;
  readonly onOpenPrivacy: () => void;
  readonly onOpenAccessibility: () => void;
  readonly onSignOut: () => void;
};
