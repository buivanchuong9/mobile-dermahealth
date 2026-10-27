export const chat = {
  title: 'Nhắn tin với bác sĩ',
  loadingMessages: 'Đang tải tin nhắn',
  simulatedBanner:
    'Cuộc trò chuyện mô phỏng: phản hồi được tạo tự động, không có bác sĩ thật nào xem hoặc trả lời tin nhắn của bạn.',
  empty: {
    list: {
      title: 'Chưa có cuộc trò chuyện',
      description: 'Các cuộc trò chuyện với bác sĩ sẽ hiển thị tại đây.',
    },
    conversation: {
      title: 'Chưa có tin nhắn',
      description: 'Hãy gửi tin nhắn đầu tiên hoặc chọn một gợi ý bên dưới.',
    },
  },
  context: 'Ngữ cảnh: {context}',
  noMessagesYet: 'Chưa có tin nhắn',
  unreadCount: '{count} tin chưa đọc',
  sender: {
    patient: 'Bạn',
    doctor_simulated: 'Phản hồi mô phỏng',
  },
  status: {
    sending: 'Đang gửi',
    sent: 'Đã gửi (mô phỏng)',
  },
  typing: 'Đang tạo phản hồi tự động (mô phỏng)…',
  composer: {
    label: 'Nhập tin nhắn',
    placeholder: 'Nhập tin nhắn…',
    send: 'Gửi tin nhắn',
  },
  quickRepliesLabel: 'Gợi ý trả lời nhanh',
  quickReplies: {
    reschedule: 'Tôi muốn đổi lịch hẹn',
    careQuestion: 'Tôi muốn hỏi về cách chăm sóc da',
    thanks: 'Cảm ơn bác sĩ',
  },
  autoReply:
    'Cảm ơn bạn đã nhắn. Đây là phản hồi tự động mô phỏng, chưa có bác sĩ nào xem tin nhắn này. Nếu bạn lo lắng về tình trạng của mình, hãy đặt lịch khám hoặc đến cơ sở y tế gần nhất.',
  sampleOpening:
    'Đây là tin nhắn mẫu của cuộc trò chuyện mô phỏng. Bạn có thể đặt câu hỏi về lịch tái khám hoặc cách chăm sóc da sau lần khám.',
  contexts: {
    afterVisit: 'Sau lần khám ngày 12/09',
    acneReview: 'Tái khám mụn và sẹo',
  },
} as const;
