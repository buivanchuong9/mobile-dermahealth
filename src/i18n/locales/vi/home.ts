export const home = {
  title: 'Trang chủ',
  more: 'Xem thêm',
  greeting: 'Xin chào, {name}',
  today: 'Hôm nay là {date}',
  notificationsButton: 'Thông báo',
  notificationsButtonUnread: 'Thông báo, {count} chưa đọc',
  tip: {
    title: 'Mẹo cho lần đầu sử dụng',
    body: 'Xem hướng dẫn ngắn về cách đặt lịch, theo dõi số thứ tự và xem hồ sơ khám.',
    action: 'Xem hướng dẫn',
  },
  nextStep: {
    none: {
      title: 'Bắt đầu với lịch khám đầu tiên',
      body: 'Bạn chưa có lịch hẹn nào. Đặt lịch để theo dõi hành trình khám của bạn.',
      action: 'Đặt lịch khám',
    },
  },
  appointments: {
    title: 'Lịch hẹn sắp tới',
    viewAll: 'Xem tất cả lịch hẹn',
    empty: 'Bạn chưa có lịch hẹn sắp tới.',
    book: 'Đặt lịch khám',
  },
  queue: {
    title: 'Số thứ tự của bạn',
    summary: 'Còn {ahead} người phía trước · khoảng {minutes} phút',
    summaryDone: 'Bạn đã khám xong',
  },
  quickActions: {
    title: 'Làm nhanh',
    book: 'Đặt lịch khám',
    followUp: 'Tái khám',
    assessment: 'Đánh giá da',
    records: 'Hồ sơ khám',
    chat: 'Nhắn bác sĩ',
  },
  journey: {
    title: 'Hành trình chăm sóc',
    subtitle: 'Theo dõi từng bước, từ đặt lịch đến hồ sơ khám.',
    book: {
      title: 'Đặt lịch khám',
      description: 'Chọn khám trực tuyến hoặc trực tiếp',
    },
    visit: {
      title: 'Xem lịch hẹn',
      description: 'Thông tin bác sĩ, thời gian và địa điểm',
    },
    follow: {
      title: 'Theo dõi lượt khám',
      description: 'Xem số thứ tự và hướng dẫn tại phòng khám',
    },
    record: {
      title: 'Hồ sơ sức khỏe',
      description: 'Xem lại thông tin và lịch sử khám',
    },
  },
  reminders: {
    title: 'Nhắc nhở và thông báo',
    empty: 'Không có thông báo mới.',
    viewAll: 'Xem tất cả thông báo',
  },
  recentVisits: {
    title: 'Lần khám gần đây',
    empty: 'Chưa có lần khám nào.',
    viewAll: 'Xem toàn bộ hồ sơ',
  },
  loadFailed: 'Không thể tải một số thông tin trang chủ.',
  skinCard: {
    title: 'Hồ sơ da của bạn',
    subtitle: 'Thông tin do bạn tự khai báo, lưu trên thiết bị này.',
    skinTypeLabel: 'Loại da',
    concernsLabel: 'Mối quan tâm',
    noConcerns: 'Chưa chọn mối quan tâm nào',
    empty: 'Bạn chưa khai báo hồ sơ da.',
    loading: 'Đang tải hồ sơ da',
    loadFailed: 'Không thể đọc hồ sơ đã lưu trên thiết bị này.',
    createAction: 'Khai báo hồ sơ da',
    manageAction: 'Xem và cập nhật hồ sơ',
  },
} as const;
