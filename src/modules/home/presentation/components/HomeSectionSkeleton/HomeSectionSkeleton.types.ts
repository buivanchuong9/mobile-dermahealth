export type HomeSectionSkeletonVariant =
  | 'nextStep'
  | 'queue'
  | 'appointments'
  | 'reminders'
  | 'visits';

export type HomeSectionSkeletonProps = {
  readonly variant: HomeSectionSkeletonVariant;
};
