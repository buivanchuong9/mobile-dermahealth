export const appointments = {
  title: 'Lịch hẹn',
  bookNew: 'Đặt lịch khám mới',
  tabs: {
    upcoming: 'Sắp tới',
    past: 'Đã khám',
    followUp: 'Tái khám',
  },
  empty: {
    upcoming: {
      title: 'Chưa có lịch hẹn sắp tới',
      description: 'Đặt lịch khám để bắt đầu hành trình chăm sóc da của bạn.',
    },
    past: {
      title: 'Chưa có lịch sử khám',
      description: 'Các lần khám đã hoàn thành sẽ hiển thị tại đây.',
    },
    followUp: {
      title: 'Chưa có lịch tái khám',
      description:
        'Lịch tái khám theo chỉ định của bác sĩ sẽ hiển thị tại đây.',
    },
  },
  status: {
    confirmed: 'Đã xác nhận',
    checked_in: 'Đã check-in',
    completed: 'Đã khám',
    cancelled: 'Đã hủy',
  },
  kind: {
    new: 'Khám mới',
    follow_up: 'Tái khám',
  },
  consultationType: {
    in_person: 'Tại phòng khám',
    video: 'Tư vấn video',
  },
  consultationTypeHint: {
    in_person: 'Đến trực tiếp phòng khám',
    video: 'Tư vấn từ xa tại nhà',
  },
  specialty: {
    general: 'Da liễu tổng quát',
    acne: 'Điều trị mụn và sẹo',
    aesthetic: 'Da liễu thẩm mỹ',
    allergy: 'Dị ứng và miễn dịch da',
  },
  booking: {
    title: 'Đặt lịch khám',
    followUpTitle: 'Đặt lịch tái khám',
    rescheduleTitle: 'Đổi giờ hẹn',
    rescheduleIntro: 'Chọn ngày và giờ mới cho lịch hẹn với {doctor}.',
    followUpIntro: 'Lịch tái khám nối tiếp lần khám trước của bạn.',
    typeSection: 'Hình thức khám',
    specialtySection: 'Chuyên khoa',
    doctorSection: 'Bác sĩ phụ trách',
    dateSection: 'Chọn ngày',
    timeSection: 'Chọn giờ',
    morning: 'Buổi sáng',
    afternoon: 'Buổi chiều',
    sundayClosed: 'Phòng khám nghỉ chủ nhật. Vui lòng chọn ngày khác.',
    noSlots: 'Không còn giờ trống trong ngày này. Vui lòng chọn ngày khác.',
    slotUnavailable: 'Hết chỗ',
    loadingDoctors: 'Đang tải danh sách bác sĩ',
    loadingSlots: 'Đang tải giờ trống',
    summary: 'Tóm tắt lịch hẹn',
    summaryEmpty: 'Chọn bác sĩ, ngày và giờ để xem tóm tắt.',
    confirm: 'Xác nhận đặt lịch',
    confirmReschedule: 'Xác nhận đổi giờ',
    simulatedNote:
      'Đây là lịch hẹn mô phỏng, không được gửi tới phòng khám thật.',
    issues: {
      missing_doctor: 'Vui lòng chọn bác sĩ.',
      missing_time: 'Vui lòng chọn ngày và giờ khám.',
      slot_in_past:
        'Giờ đã chọn đã qua hoặc quá gần. Vui lòng chọn giờ muộn hơn ít nhất 1 giờ.',
      overlaps_existing: 'Bạn đã có lịch hẹn khác vào khoảng thời gian này.',
    },
    submitFailed:
      'Không thể hoàn tất. Giờ này có thể vừa hết chỗ, vui lòng chọn giờ khác.',
  },
  confirmation: {
    bookedTitle: 'Đặt lịch thành công',
    rescheduledTitle: 'Đổi giờ thành công',
    simulatedBody:
      'Lịch hẹn này chỉ tồn tại trong bản trải nghiệm mô phỏng và không được gửi tới phòng khám thật.',
    viewDetail: 'Xem chi tiết lịch hẹn',
    backHome: 'Về trang chủ',
  },
  detail: {
    title: 'Chi tiết lịch hẹn',
    when: 'Thời gian khám',
    doctor: 'Bác sĩ phụ trách',
    place: 'Địa điểm',
    room: 'Phòng khám',
    online: 'Tư vấn video, không cần đến phòng khám',
    preparation: 'Chuẩn bị trước khi đến',
    simulatedNote:
      'Lịch hẹn mô phỏng, không phải lịch hẹn thật tại phòng khám.',
    checkIn: 'Check-in',
    checkInHint: 'Check-in mở trong ngày khám tại phòng khám.',
    reschedule: 'Đổi giờ hẹn',
    cancel: 'Hủy lịch hẹn',
    blocked: {
      too_close: 'Không thể đổi hoặc hủy trong vòng 2 giờ trước giờ hẹn.',
      not_confirmed: 'Lịch hẹn đã check-in nên không thể đổi hoặc hủy.',
      not_active: 'Lịch hẹn này không còn có thể thay đổi.',
    },
    cancelDialog: {
      title: 'Hủy lịch hẹn?',
      message:
        'Lịch hẹn lúc {time} sẽ bị hủy. Bạn có thể đặt lại bất cứ lúc nào.',
      confirm: 'Hủy lịch hẹn',
      keep: 'Giữ lịch hẹn',
    },
    cancelled: 'Đã hủy lịch hẹn (mô phỏng).',
    actionFailed: 'Không thực hiện được thao tác. Vui lòng thử lại.',
    notFound: 'Không tìm thấy lịch hẹn này.',
  },
} as const;
