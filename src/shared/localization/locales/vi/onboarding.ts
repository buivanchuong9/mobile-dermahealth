export const onboarding = {
  skip: 'Bỏ qua',
  back: 'Quay lại',
  next: 'Tiếp theo',
  start: 'Bắt đầu',
  progress: 'Trang {current} trên {total}',
  slides: {
    booking: {
      title: 'Đặt lịch khám dễ dàng',
      body: 'Chọn bác sĩ, ngày và giờ phù hợp. Bạn có thể đổi giờ hoặc hủy khi cần.',
    },
    queue: {
      title: 'Theo dõi số thứ tự',
      body: 'Biết còn bao nhiêu người trước bạn và nhận nhắc nhở khi sắp đến lượt.',
    },
    records: {
      title: 'Hồ sơ khám trong tầm tay',
      body: 'Xem lại các lần khám, đơn thuốc và hướng dẫn chăm sóc từ bác sĩ.',
    },
    assessment: {
      title: 'Đánh giá da tham khảo',
      body: 'Trả lời vài câu hỏi để nhận gợi ý tham khảo. Đây không phải chẩn đoán y khoa.',
    },
  },
  simulatedNote: 'Đây là bản trải nghiệm với dữ liệu mô phỏng.',
  guide: {
    title: 'Hướng dẫn sử dụng',
    subtitle: 'Những việc bạn có thể làm trong ứng dụng',
    booking: {
      title: 'Cách đặt lịch khám',
      steps:
        '1. Vào mục Lịch hẹn và chọn Đặt lịch khám mới.\n2. Chọn hình thức, chuyên khoa và bác sĩ.\n3. Chọn ngày, giờ còn trống rồi xác nhận.',
    },
    queue: {
      title: 'Cách theo dõi hàng đợi',
      steps:
        '1. Vào ngày khám, mở lịch hẹn và chọn Check-in.\n2. Ứng dụng tạo số thứ tự cho bạn.\n3. Theo dõi số đang gọi, số người phía trước và hướng dẫn di chuyển.',
    },
    records: {
      title: 'Cách xem hồ sơ khám',
      steps:
        '1. Vào mục Hồ sơ.\n2. Tìm theo từ khóa hoặc lọc theo nguồn thông tin.\n3. Chạm vào một mục để xem chi tiết và đặt lịch tái khám.',
    },
    assessment: {
      title: 'Về đánh giá da tham khảo',
      steps:
        'Kết quả chỉ mang tính tham khảo, không phải chẩn đoán. Nếu bạn lo lắng về tình trạng da, hãy đặt lịch với bác sĩ.',
    },
    simulated: {
      title: 'Về dữ liệu mô phỏng',
      steps:
        'Lịch hẹn, hàng đợi, hồ sơ, tin nhắn và kết quả đánh giá đều là dữ liệu minh họa. Không có thông tin thật nào được gửi tới phòng khám.',
    },
  },
} as const;
