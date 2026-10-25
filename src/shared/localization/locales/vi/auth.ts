export const auth = {
  welcome: {
    title: 'Chăm sóc da cùng Dermahealth',
    subtitle:
      'Đặt lịch khám, theo dõi số thứ tự và xem hồ sơ khám của bạn trong một ứng dụng.',
    signIn: 'Đăng nhập',
    register: 'Tạo tài khoản mới',
    simulatedNote:
      'Bản trải nghiệm mô phỏng: không có tài khoản hay dữ liệu thật nào được gửi đi.',
  },
  fields: {
    email: 'Email',
    emailPlaceholder: 'ten@example.com',
    password: 'Mật khẩu',
    passwordPlaceholder: 'Nhập mật khẩu',
    newPassword: 'Mật khẩu mới',
    confirmPassword: 'Nhập lại mật khẩu',
    fullName: 'Họ và tên',
    fullNamePlaceholder: 'Nguyễn Văn A',
    phone: 'Số điện thoại',
    phonePlaceholder: '0901234567',
  },
  hints: {
    password: 'Ít nhất 8 ký tự, gồm cả chữ và số.',
    phone: 'Số điện thoại Việt Nam gồm 10 chữ số, bắt đầu bằng 0.',
  },
  issues: {
    required: 'Vui lòng nhập thông tin này.',
    invalid_email: 'Email chưa đúng định dạng.',
    weak_password: 'Mật khẩu cần ít nhất 8 ký tự, gồm cả chữ và số.',
    invalid_phone: 'Số điện thoại chưa hợp lệ.',
    passwords_mismatch: 'Mật khẩu nhập lại chưa khớp.',
    terms_required: 'Vui lòng đồng ý để tiếp tục.',
  },
  signIn: {
    title: 'Đăng nhập',
    subtitle: 'Chào mừng bạn quay lại.',
    submit: 'Đăng nhập',
    forgot: 'Quên mật khẩu?',
    noAccount: 'Chưa có tài khoản?',
    createAccount: 'Tạo tài khoản',
    demoHint:
      'Tài khoản dùng thử (mô phỏng): demo@dermahealth.vn, mật khẩu Demo@1234.',
    failed: {
      permission_denied: 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.',
      unavailable:
        'Dịch vụ đăng nhập mô phỏng đang không khả dụng. Vui lòng thử lại sau.',
      unknown: 'Không thể đăng nhập. Vui lòng thử lại.',
    },
  },
  register: {
    title: 'Tạo tài khoản',
    subtitle: 'Chỉ mất một phút để bắt đầu.',
    submit: 'Tạo tài khoản',
    terms:
      'Tôi hiểu đây là bản mô phỏng và thông tin tôi nhập không được gửi đi hay lưu trữ.',
    haveAccount: 'Đã có tài khoản?',
    signIn: 'Đăng nhập',
    failed: {
      validation: 'Email này đã được dùng (mô phỏng). Hãy dùng email khác.',
      unavailable:
        'Dịch vụ đăng ký mô phỏng đang không khả dụng. Vui lòng thử lại sau.',
      unknown: 'Không thể tạo tài khoản. Vui lòng thử lại.',
    },
  },
  forgot: {
    title: 'Quên mật khẩu',
    subtitle: 'Nhập email để nhận hướng dẫn đặt lại mật khẩu.',
    submit: 'Gửi hướng dẫn',
    backToSignIn: 'Quay lại đăng nhập',
    successTitle: 'Đã gửi hướng dẫn (mô phỏng)',
    successBody:
      'Nếu email {email} có tài khoản, hướng dẫn đặt lại mật khẩu sẽ được gửi tới. Đây là mô phỏng nên không có email thật nào được gửi.',
    failed: 'Không thể gửi yêu cầu. Vui lòng thử lại.',
  },
} as const;
