/** Navigation intents the Home screen can raise; the app decides how to route. */
export type HomeActions = {
  readonly onOpenNotifications: () => void;
  readonly onOpenAppointment: (appointmentId: string) => void;
  readonly onOpenAppointments: () => void;
  readonly onBookAppointment: () => void;
  readonly onBookFollowUp: () => void;
  readonly onCheckIn: (appointmentId: string) => void;
  readonly onOpenQueue: () => void;
  readonly onOpenAssessment: () => void;
  readonly onOpenRecords: () => void;
  readonly onOpenRecord: (recordId: string) => void;
  readonly onOpenChat: () => void;
  readonly onOpenSkinProfile: () => void;
  readonly onOpenGuide: () => void;
};
