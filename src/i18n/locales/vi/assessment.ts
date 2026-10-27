export const assessment = {
  title: 'Đánh giá da tham khảo',
  history: 'Lịch sử đánh giá',
  intro: {
    title: 'Trước khi bắt đầu',
    body: 'Bạn sẽ trả lời vài câu hỏi về tình trạng da để nhận gợi ý tham khảo. Đây là bản mô phỏng.',
    limitsTitle: 'Giới hạn cần biết',
    limit1: 'Không thay thế việc khám với bác sĩ da liễu.',
    limit2:
      'Kết quả là mô phỏng: không có mô hình AI thật và không có ảnh nào được phân tích.',
    limit3: 'Không dùng kết quả để tự điều trị hay tự dùng thuốc.',
    consent: 'Tôi hiểu các giới hạn trên và muốn tiếp tục.',
    consentRequired: 'Vui lòng xác nhận để tiếp tục.',
    start: 'Bắt đầu',
  },
  capture: {
    title: 'Ảnh vùng da (không bắt buộc)',
    intro:
      'Trong bản mô phỏng này, ứng dụng chưa truy cập camera hay thư viện ảnh và không lưu bất kỳ ảnh nào.',
    tipsTitle: 'Mẹo chụp ảnh rõ',
    tip1: 'Chụp nơi đủ ánh sáng tự nhiên, tránh ánh sáng vàng hoặc chói.',
    tip2: 'Giữ máy cách vùng da khoảng 20 đến 30 cm và giữ nét.',
    tip3: 'Chụp cả cận cảnh và toàn vùng, không dùng bộ lọc làm đẹp.',
    takePhoto: 'Chụp ảnh',
    pickPhoto: 'Chọn từ thư viện',
    sample: 'Ảnh minh họa (mô phỏng)',
    sampleNote:
      'Chưa có ảnh thật nào được chụp hoặc chọn. Kết quả không dựa trên phân tích ảnh.',
    removeSample: 'Bỏ ảnh minh họa',
    continue: 'Tiếp tục',
    skip: 'Bỏ qua, chỉ trả lời câu hỏi',
  },
  questions: {
    progress: 'Câu {current} trên {total}',
    back: 'Quay lại',
    next: 'Tiếp theo',
    submit: 'Xem gợi ý',
    area: {
      title: 'Bạn quan tâm vùng da nào?',
      options: {
        face: 'Mặt',
        neck: 'Cổ',
        back: 'Lưng',
        arms: 'Tay',
        legs: 'Chân',
        scalp: 'Da đầu',
      },
    },
    duration: {
      title: 'Tình trạng này kéo dài bao lâu?',
      options: {
        days: 'Vài ngày',
        weeks: 'Vài tuần',
        months: 'Vài tháng',
        longer: 'Hơn 6 tháng',
      },
    },
    symptoms: {
      title: 'Bạn nhận thấy những dấu hiệu nào?',
      hint: 'Chọn tất cả dấu hiệu phù hợp.',
      options: {
        redness: 'Đỏ da',
        itching: 'Ngứa',
        dryness: 'Khô da',
        scaling: 'Bong tróc',
        bumps: 'Nổi mụn hoặc nốt',
        oiliness: 'Da dầu bóng',
        dark_spots: 'Đốm sẫm màu',
        pain: 'Đau hoặc rát',
      },
    },
    severity: {
      title: 'Mức ảnh hưởng hiện tại?',
      options: {
        mild: { label: 'Nhẹ', description: 'Ít ảnh hưởng đến sinh hoạt' },
        moderate: { label: 'Vừa', description: 'Đôi khi gây khó chịu' },
        severe: {
          label: 'Nặng',
          description: 'Khó chịu nhiều, ảnh hưởng sinh hoạt',
        },
      },
    },
    errors: {
      area: 'Vui lòng chọn vùng da.',
      duration: 'Vui lòng chọn thời gian kéo dài.',
      symptoms: 'Vui lòng chọn ít nhất một dấu hiệu.',
      severity: 'Vui lòng chọn mức ảnh hưởng.',
    },
  },
  analyzing: {
    title: 'Đang tạo gợi ý mô phỏng',
    progressLabel: 'Tiến độ tạo gợi ý',
    note: 'Đây không phải phân tích bằng AI thật.',
    steps: {
      prepare: 'Chuẩn bị câu trả lời của bạn',
      rules: 'Áp dụng quy tắc mô phỏng',
      summarize: 'Tổng hợp gợi ý tham khảo',
    },
    failed: 'Không thể tạo gợi ý. Câu trả lời của bạn vẫn được giữ lại.',
    retry: 'Thử lại',
  },
  result: {
    title: 'Gợi ý tham khảo (mô phỏng)',
    banner:
      'Kết quả mô phỏng dựa trên câu trả lời của bạn. Không có mô hình AI thật và không có ảnh nào được phân tích. Đây không phải chẩn đoán y khoa.',
    findingsTitle: 'Dạng thường gặp phù hợp với mô tả',
    fit: {
      low: 'Mức phù hợp thấp',
      moderate: 'Mức phù hợp trung bình',
      high: 'Mức phù hợp cao',
    },
    findings: {
      dry_skin_pattern: {
        title: 'Da khô, thiếu ẩm',
        explanation:
          'Các dấu hiệu như khô, bong tróc hoặc ngứa thường gặp khi da thiếu ẩm.',
      },
      acne_pattern: {
        title: 'Biểu hiện giống mụn',
        explanation:
          'Nốt mụn, da dầu hoặc đỏ da quanh nốt thường gặp ở các tình trạng liên quan đến mụn.',
      },
      irritation_pattern: {
        title: 'Biểu hiện giống kích ứng da',
        explanation:
          'Đỏ, ngứa hoặc rát thường gặp khi da bị kích ứng với sản phẩm hoặc môi trường.',
      },
      pigmentation_pattern: {
        title: 'Biểu hiện giống tăng sắc tố',
        explanation:
          'Đốm sẫm màu có thể gặp sau viêm hoặc do tiếp xúc nắng, cần bác sĩ đánh giá.',
      },
    },
    uncertaintyTitle: 'Về độ chắc chắn',
    uncertainty:
      'Độ chắc chắn còn hạn chế: gợi ý chỉ dựa trên vài câu trả lời tự khai báo và nhiều tình trạng da có biểu hiện giống nhau. Chỉ bác sĩ mới đánh giá và chẩn đoán được.',
    urgency: {
      routine: {
        title: 'Có thể đặt lịch khám thường quy',
        body: 'Nên trao đổi với bác sĩ da liễu nếu tình trạng kéo dài hoặc tái đi tái lại.',
      },
      soon: {
        title: 'Nên đặt lịch khám trong thời gian tới',
        body: 'Tình trạng kéo dài hoặc ảnh hưởng ở mức vừa. Hãy đặt lịch để bác sĩ đánh giá.',
      },
      prompt: {
        title: 'Nên được bác sĩ đánh giá sớm',
        body: 'Bạn mô tả mức khó chịu đáng kể. Hãy đặt lịch khám sớm, hoặc đến cơ sở y tế nếu tình trạng nặng lên nhanh, kèm sốt hoặc lan rộng.',
      },
    },
    bookAppointment: 'Đặt lịch khám ({specialty})',
    viewHistory: 'Xem lịch sử đánh giá',
    startOver: 'Làm lại',
    disclaimer:
      'Gợi ý này không thay thế tư vấn y tế, không phải chẩn đoán và không đưa ra chỉ định dùng thuốc.',
  },
  historyScreen: {
    title: 'Lịch sử đánh giá',
    note: 'Chỉ lưu trong phiên này. Không lưu ảnh.',
    item: 'Gợi ý ngày {date}',
    empty: {
      title: 'Chưa có đánh giá nào',
      description: 'Các gợi ý tham khảo bạn tạo sẽ hiển thị tại đây.',
      action: 'Bắt đầu đánh giá',
    },
  },
} as const;
