export const vi = {
  app: {
    name: 'Dermahealth',
    tagline: 'Chăm sóc da khoa học, mỗi ngày',
  },
  common: {
    loading: 'Đang tải',
    continue: 'Tiếp tục',
    learnMore: 'Tìm hiểu thêm',
    skip: 'Bỏ qua',
    cancel: 'Hủy',
  },
  skinProfile: {
    title: 'Hồ sơ da của bạn',
    disclaimer:
      'Đây là thông tin do chính bạn tự khai báo để cá nhân hóa trải nghiệm chăm sóc da. Hồ sơ này không phải chẩn đoán y khoa và không thay thế tư vấn của bác sĩ da liễu.',
    storageNotice:
      'Hồ sơ chỉ được lưu trên thiết bị này và không được gửi đi đâu. Bạn có thể xóa bất cứ lúc nào.',
    emptyIntro:
      'Bạn chưa khai báo hồ sơ da. Hãy chọn loại da và các mối quan tâm của bạn.',
    loading: 'Đang tải hồ sơ da',
    skinType: {
      title: 'Loại da',
      options: {
        normal: {
          label: 'Da thường',
          description: 'Cân bằng, ít khi khô hoặc bóng dầu',
        },
        dry: {
          label: 'Da khô',
          description: 'Thường có cảm giác căng hoặc khô ráp',
        },
        oily: {
          label: 'Da dầu',
          description: 'Thường bóng dầu, nhất là vùng chữ T',
        },
        combination: {
          label: 'Da hỗn hợp',
          description: 'Vùng chữ T dầu, hai bên má thường hoặc khô',
        },
        sensitive: {
          label: 'Da nhạy cảm',
          description: 'Dễ châm chích hoặc đỏ khi dùng sản phẩm',
        },
        unsure: {
          label: 'Tôi chưa chắc',
          description: 'Tôi chưa biết loại da của mình',
        },
      },
    },
    concerns: {
      title: 'Mối quan tâm về da',
      optionalHint: 'Không bắt buộc. Bạn có thể chọn nhiều mục.',
      options: {
        acne: 'Mụn',
        dryness: 'Da khô',
        oiliness: 'Da dầu',
        sensitivity: 'Da nhạy cảm',
        dark_spots: 'Đốm sẫm màu',
        fine_lines: 'Nếp nhăn nhỏ',
        large_pores: 'Lỗ chân lông to',
        dullness: 'Da xỉn màu',
      },
    },
    actions: {
      save: 'Lưu hồ sơ',
      retry: 'Thử lại',
      delete: 'Xóa hồ sơ đã lưu',
    },
    messages: {
      saved: 'Đã lưu hồ sơ trên thiết bị này.',
      skinTypeRequired: 'Vui lòng chọn loại da của bạn.',
      saveFailed:
        'Không thể lưu hồ sơ. Dữ liệu đã lưu trước đó không bị thay đổi. Vui lòng thử lại.',
      deleteFailed: 'Không thể xóa hồ sơ. Vui lòng thử lại.',
      loadFailedTitle: 'Không thể đọc hồ sơ đã lưu',
      loadFailedDetail:
        'Dữ liệu có thể bị hỏng hoặc được tạo bởi phiên bản ứng dụng mới hơn. Ứng dụng sẽ không tự ghi đè. Bạn có thể thử lại hoặc xóa dữ liệu đã lưu để bắt đầu lại.',
      deleteConfirmTitle: 'Xóa hồ sơ da?',
      deleteConfirmMessage:
        'Hồ sơ đã lưu trên thiết bị sẽ bị xóa vĩnh viễn và không thể khôi phục.',
    },
  },
} as const;
