export const queue = {
  title: 'Số thứ tự',
  yourTicket: 'Số của bạn',
  currentlyCalled: 'Đang gọi',
  ahead: 'Phía trước bạn',
  aheadValue: '{count} người',
  eta: 'Dự kiến chờ',
  etaValue: '{minutes} phút',
  lastUpdated: 'Cập nhật lúc {time}',
  location: 'Nơi khám',
  stage: {
    waiting: 'Đang chờ',
    upcoming: 'Sắp đến lượt',
    called: 'Đến lượt bạn',
    in_consultation: 'Đang khám',
    completed: 'Đã hoàn tất',
  },
  guidance: {
    wait: {
      title: 'Bạn chưa cần di chuyển',
      body: 'Hãy ngồi tại khu vực chờ. Bạn sẽ được báo khi sắp đến lượt.',
    },
    prepare: {
      title: 'Sắp đến lượt bạn',
      body: 'Vui lòng di chuyển đến {room} và chuẩn bị giấy tờ, kết quả khám trước đó.',
    },
    go_to_room: {
      title: 'Mời bạn vào khám',
      body: 'Đã đến lượt bạn. Vui lòng vào {room} ngay bây giờ.',
    },
    in_consultation: {
      title: 'Bạn đang trong buổi khám',
      body: 'Sau buổi khám, hãy xem đơn thuốc và hướng dẫn chăm sóc trong mục Hành trình.',
    },
    done: {
      title: 'Bạn đã khám xong',
      body: 'Cảm ơn bạn. Xem các bước tiếp theo trong mục Hành trình.',
    },
  },
  upcomingWarning: 'Sắp đến lượt bạn (mô phỏng): còn {count} người trước bạn.',
  calledAlert: 'Đã gọi số {ticket} (mô phỏng). Mời bạn vào {room}.',
  empty: {
    title: 'Bạn chưa có số thứ tự',
    description:
      'Số thứ tự được tạo khi bạn check-in tại lịch hẹn trong ngày khám.',
    action: 'Xem lịch hẹn',
  },
  viewJourney: 'Xem hành trình khám',
  simulation: {
    title: 'Điều khiển mô phỏng',
    note: 'Hàng đợi này là mô phỏng, không kết nối với hệ thống của phòng khám thật. Hãy dùng các nút dưới đây để xem từng trạng thái.',
    advance: 'Tiến thêm một bước',
    autoStart: 'Tự chạy mô phỏng',
    autoStop: 'Dừng tự chạy',
    reset: 'Làm lại từ đầu',
    finished: 'Mô phỏng đã hoàn tất.',
  },
  alerts: {
    title: 'Cảnh báo lượt khám',
    notifications: 'Thông báo khi sắp đến lượt',
    notificationsHint:
      'Cấu hình xem trước, ứng dụng chưa xin quyền thông báo của hệ điều hành.',
    sound: 'Rung khi đến lượt',
    soundHint:
      'Chỉ rung nhẹ trên thiết bị, có thể bị tắt bởi chế độ im lặng. Chưa có âm thanh.',
  },
} as const;
