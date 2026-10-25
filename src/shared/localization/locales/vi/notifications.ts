export const notifications = {
  title: 'Thông báo',
  markAllRead: 'Đánh dấu tất cả đã đọc',
  unread: 'Chưa đọc',
  empty: {
    title: 'Chưa có thông báo',
    description: 'Nhắc lịch hẹn và cập nhật hàng đợi sẽ hiển thị tại đây.',
  },
  groups: {
    today: 'Hôm nay',
    earlier: 'Trước đó',
  },
  kind: {
    appointment_reminder: 'Nhắc lịch hẹn',
    queue_update: 'Cập nhật hàng đợi',
    follow_up_reminder: 'Nhắc tái khám',
    system: 'Thông báo hệ thống',
  },
  simulatedTag: 'Mô phỏng',
  preferences: {
    title: 'Cài đặt thông báo',
    previewNote:
      'Đây là cấu hình xem trước. Ứng dụng chưa xin quyền thông báo của hệ điều hành nên sẽ không có thông báo đẩy thật nào được gửi.',
    topics: 'Loại thông báo',
    appointmentReminders: 'Nhắc lịch hẹn',
    appointmentRemindersHint: 'Nhắc trước giờ hẹn của bạn.',
    queueUpdates: 'Cập nhật hàng đợi',
    queueUpdatesHint: 'Báo khi sắp đến lượt và khi được gọi số.',
    followUpReminders: 'Nhắc tái khám',
    followUpRemindersHint:
      'Nhắc khi đến hạn tái khám theo khuyến nghị của bác sĩ.',
    sound: 'Âm thanh và rung',
    alertVibration: 'Rung khi đến lượt',
    alertVibrationHint:
      'Rung nhẹ trên thiết bị. Có thể bị tắt bởi chế độ im lặng của máy. Chưa có âm thanh.',
  },
  seeded: {
    reminderTitle: 'Nhắc lịch hẹn hôm nay',
    reminderBody:
      'Lịch khám lúc 09:30 với BS. Trần Thu Lan. Hãy check-in khi đến phòng khám.',
    followUpTitle: 'Sắp đến hạn tái khám',
    followUpBody:
      'Bác sĩ khuyến nghị tái khám sau 3 tuần. Bạn có thể xem lịch tái khám trong mục Lịch hẹn.',
    welcomeTitle: 'Chào mừng đến với Dermahealth',
    welcomeBody:
      'Đây là bản trải nghiệm mô phỏng. Mọi dữ liệu đều là minh họa.',
  },
  queue: {
    upcomingTitle: 'Sắp đến lượt bạn',
    upcomingBody: 'Số {ticket} (mô phỏng): vui lòng di chuyển đến {room}.',
    calledTitle: 'Đã gọi số của bạn',
    calledBody: 'Số {ticket} (mô phỏng): mời bạn vào {room}.',
  },
} as const;
