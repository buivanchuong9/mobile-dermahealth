export const journey = {
  title: 'Hành trình khám',
  subtitle: 'Các bước từ đặt lịch đến tái khám',
  empty: {
    title: 'Chưa có hành trình khám',
    description:
      'Khi bạn có lịch hẹn tại phòng khám, các bước khám sẽ hiển thị tại đây.',
    action: 'Đặt lịch khám',
  },
  forAppointment: 'Lịch hẹn: {when} với {doctor}',
  nextAction: {
    title: 'Việc cần làm tiếp theo',
    prepare_visit: {
      title: 'Chuẩn bị cho buổi khám',
      body: 'Xem hướng dẫn chuẩn bị và đến phòng khám đúng ngày hẹn.',
      action: 'Xem chi tiết lịch hẹn',
    },
    check_in: {
      title: 'Check-in tại phòng khám',
      body: 'Hôm nay là ngày khám của bạn. Check-in để nhận số thứ tự.',
      action: 'Check-in ngay',
    },
    wait_in_queue: {
      title: 'Chờ đến lượt khám',
      body: 'Ngồi tại khu vực chờ và theo dõi số thứ tự của bạn.',
      action: 'Xem số thứ tự',
    },
    prepare_to_go: {
      title: 'Sắp đến lượt bạn',
      body: 'Hãy di chuyển đến phòng khám và chuẩn bị giấy tờ.',
      action: 'Xem số thứ tự',
    },
    go_to_room: {
      title: 'Mời bạn vào phòng khám',
      body: 'Đã đến lượt bạn. Vui lòng vào phòng khám ngay.',
      action: 'Xem số thứ tự',
    },
    in_consultation: {
      title: 'Bạn đang trong buổi khám',
      body: 'Hãy trao đổi với bác sĩ về tình trạng của bạn.',
      action: 'Xem số thứ tự',
    },
    review_care_instructions: {
      title: 'Xem hướng dẫn sau khám',
      body: 'Đơn thuốc và hướng dẫn chăm sóc do bác sĩ cung cấp.',
      action: 'Xem hồ sơ khám',
    },
    book_follow_up: {
      title: 'Đặt lịch tái khám',
      body: 'Nếu bác sĩ khuyến nghị tái khám, bạn có thể đặt lịch ngay.',
      action: 'Đặt lịch tái khám',
    },
  },
  status: {
    completed: 'Đã hoàn thành',
    current: 'Đang diễn ra',
    upcoming: 'Sắp tới',
    blocked: 'Chưa thể thực hiện',
  },
  steps: {
    booked: {
      title: 'Đặt lịch hẹn',
      description:
        'Lịch hẹn lúc {time} với {doctor} đã được xác nhận (mô phỏng).',
    },
    check_in: {
      title: 'Đến phòng khám và check-in',
      description:
        'Check-in tại quầy tiếp đón trong ngày khám để nhận số thứ tự.',
      location: 'Quầy tiếp đón, tầng 1',
    },
    waiting: {
      title: 'Chờ đến lượt khám',
      waitingDescription: 'Số của bạn: {ticket}. Còn {ahead} người trước bạn.',
      defaultDescription: 'Theo dõi số thứ tự để biết khi nào bạn được gọi.',
    },
    consultation: {
      title: 'Khám với bác sĩ',
      description: 'Vào phòng khám khi được gọi số.',
    },
    tests: {
      title: 'Xét nghiệm hoặc thủ thuật',
      blockedDescription: 'Chỉ thực hiện khi bác sĩ chỉ định sau buổi khám.',
      doneDescription:
        'Bác sĩ không chỉ định xét nghiệm trong lần khám mô phỏng này.',
    },
    prescription: {
      title: 'Đơn thuốc và hướng dẫn chăm sóc',
      description:
        'Do bác sĩ cung cấp sau buổi khám. Ứng dụng không tự đưa ra chỉ định điều trị.',
    },
    completion: {
      title: 'Hoàn tất lượt khám',
      description: 'Hoàn tất thủ tục tại quầy theo hướng dẫn của phòng khám.',
    },
    follow_up: {
      title: 'Tái khám',
      description: 'Đặt lịch tái khám nếu bác sĩ khuyến nghị.',
    },
  },
} as const;
