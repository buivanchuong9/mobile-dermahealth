export const settings = {
  profile: {
    title: 'Tài khoản',
    simulatedAccount: 'Tài khoản mô phỏng',
    menu: {
      skinProfile: 'Hồ sơ da của bạn',
      skinProfileHint: 'Thông tin tự khai báo, lưu trên thiết bị này',
      notifications: 'Cài đặt thông báo',
      notificationsHint: 'Nhắc lịch hẹn, hàng đợi, rung',
      assessmentHistory: 'Lịch sử đánh giá da',
      assessmentHistoryHint: 'Các gợi ý tham khảo mô phỏng',
      guide: 'Hướng dẫn sử dụng',
      guideHint: 'Đặt lịch, hàng đợi, hồ sơ khám',
      privacy: 'Quyền riêng tư và giới hạn',
      privacyHint: 'Dữ liệu của bạn được xử lý như thế nào',
      accessibility: 'Trợ năng',
      accessibilityHint: 'Chuyển động, cỡ chữ, vùng chạm',
    },
    signOut: 'Đăng xuất',
    signOutDialog: {
      title: 'Đăng xuất?',
      message:
        'Bạn sẽ quay về màn hình chào. Dữ liệu mô phỏng trong phiên này sẽ được đặt lại khi mở lại ứng dụng.',
      confirm: 'Đăng xuất',
    },
    version: 'Bản trải nghiệm mô phỏng',
  },
  privacy: {
    title: 'Quyền riêng tư và giới hạn',
    intro:
      'Ứng dụng này là bản trải nghiệm giao diện. Dưới đây là cách thông tin của bạn được xử lý.',
    sections: {
      simulated: {
        title: 'Dữ liệu mô phỏng',
        body: 'Lịch hẹn, hàng đợi, hồ sơ khám, tin nhắn và kết quả đánh giá là dữ liệu minh họa nằm trong bộ nhớ của ứng dụng. Không có kết nối tới phòng khám, bác sĩ hay máy chủ nào.',
      },
      network: {
        title: 'Không gửi dữ liệu ra ngoài',
        body: 'Ứng dụng không gửi thông tin qua mạng, không có phân tích hành vi, theo dõi hay dịch vụ bên thứ ba.',
      },
      skinProfile: {
        title: 'Hồ sơ da bạn tự khai báo',
        body: 'Loại da và mối quan tâm bạn chọn được lưu trên thiết bị này khi bạn bấm Lưu. Bộ nhớ này không được mã hóa, vì vậy hãy cân nhắc nếu thiết bị dùng chung. Bạn có thể xóa hồ sơ bất cứ lúc nào.',
      },
      photos: {
        title: 'Ảnh da',
        body: 'Bản mô phỏng không truy cập camera hay thư viện ảnh và không lưu ảnh da.',
      },
      medical: {
        title: 'Không phải tư vấn y tế',
        body: 'Gợi ý tham khảo, tin nhắn tự động và nội dung trong ứng dụng không phải chẩn đoán hay chỉ định điều trị. Hãy gặp bác sĩ khi bạn lo lắng về sức khỏe.',
      },
      limits: {
        title: 'Giới hạn đã biết',
        body: 'Thông báo đẩy, âm thanh cảnh báo, đăng nhập thật và đồng bộ với phòng khám chưa được hỗ trợ trong bản này.',
      },
    },
  },
  accessibility: {
    title: 'Trợ năng',
    intro: 'Ứng dụng tôn trọng các thiết lập trợ năng của hệ điều hành.',
    motion: {
      title: 'Giảm chuyển động',
      statusOn: 'Đang bật',
      statusOff: 'Đang tắt',
      on: 'Đang bật trong hệ điều hành. Ứng dụng tắt hoặc giảm các hiệu ứng chuyển động.',
      off: 'Đang tắt trong hệ điều hành. Ứng dụng dùng các hiệu ứng ngắn, nhẹ.',
      howTo: 'Bạn có thể thay đổi trong phần Trợ năng của cài đặt thiết bị.',
    },
    text: {
      title: 'Cỡ chữ',
      body: 'Ứng dụng theo cỡ chữ hệ thống. Hãy tăng cỡ chữ trong cài đặt thiết bị nếu cần đọc dễ hơn.',
    },
    touch: {
      title: 'Vùng chạm và trạng thái',
      body: 'Các nút và lựa chọn có vùng chạm đủ lớn, trạng thái được đọc bởi trình đọc màn hình và không chỉ dựa vào màu sắc.',
    },
  },
} as const;
