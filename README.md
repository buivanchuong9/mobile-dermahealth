<div align="center">

# DermaHealth

### Hành trình chăm sóc da rõ ràng hơn

**Đặt lịch. Hiểu làn da. Chủ động tiến trình.**

<br />

`React Native` · `TypeScript` · `Local-first` · `Tiếng Việt mặc định`

</div>

<div align="center">
  <img src="assets/dermahealth-orbit.svg" alt="Minh họa 3D chuyển động về hành trình chăm sóc da của DermaHealth" />
</div>

> Nền tảng mobile hỗ trợ người dùng quản lý hành trình chăm sóc da một cách
> rõ ràng, chủ động và nhất quán.

DermaHealth là ứng dụng React Native tập trung vào trải nghiệm chăm sóc da
liền mạch: từ hướng dẫn ban đầu, đặt lịch và xác nhận đến đánh giá da, hồ sơ sức khỏe
và theo dõi hàng đợi. Hiện tại sản phẩm đang ở giai đoạn **UI và simulation**;
các kho nghiệp vụ được mô phỏng để đội ngũ hoàn thiện luồng sử dụng
trước khi tích hợp hệ thống máy chủ chính thức.

> **Nguyên tắc thiết kế:** một hành trình, mọi bước tiếp theo đều rõ ràng.

## Mục tiêu sản phẩm

| Trụ cột | Giá trị mang lại |
| --- | --- |
| Đặt lịch đơn giản | Đặt lại lịch, hủy lịch và xác nhận trong một luồng nhất quán. |
| Hiểu tình trạng da | Bảng hỏi, đánh giá da và hồ sơ da được tổ chức rõ ràng. |
| Chủ động trong hành trình | Số thứ tự, thời gian dự kiến và thông báo giúp người dùng biết bước tiếp theo. |

## Phạm vi chức năng

| Module | Phạm vi |
| --- | --- |
| Hướng dẫn & tài khoản | Giới thiệu, đăng nhập, đăng ký và khôi phục mật khẩu |
| Trang chủ & hành trình | Tổng quan, việc cần làm, lịch hẹn, hàng đợi và nhắc việc |
| Lịch hẹn | Danh sách, đặt lại lịch, hủy lịch, chi tiết và xác nhận |
| Hàng đợi | Số thứ tự, số người phía trước, thời gian dự kiến và mô phỏng gọi lượt |
| Đánh giá da | Đồng thuận, bảng hỏi, kết quả mô phỏng và lịch sử |
| Hồ sơ sức khỏe | Dòng thời gian, tìm kiếm/lọc, chi tiết và nguồn dữ liệu |
| Trò chuyện & thông báo | Hội thoại, phản hồi mô phỏng và tùy chọn thông báo |
| Hồ sơ da | Loại da, mối quan tâm và lưu trữ cục bộ qua AsyncStorage |

## Công nghệ

- React Native `0.88`
- TypeScript `6`
- React Navigation
- AsyncStorage
- pnpm

## Chạy local

### Yêu cầu hệ thống

- Node.js `>= 22.11.0`
- pnpm
- Xcode (iOS) hoặc Android Studio và Android SDK (Android)

### Cài đặt

```bash
git clone https://github.com/buivanchuong9/mobile-dermahealth.git
cd mobile-dermahealth
pnpm install
cp .env.example .env
pnpm env:check
```

Khởi động Metro, sau đó chạy nền tảng cần phát triển:

```bash
pnpm start

# cửa sổ dòng lệnh khác
pnpm ios
# hoặc
pnpm android
```

> Các giá trị trong `.env` được đưa trực tiếp vào gói JavaScript và không phải
> thông tin bí mật. Không đặt khóa riêng, chứng chỉ hoặc thông tin xác thực thật
> vào file này. Xem [hướng dẫn môi trường](docs/development-guidelines/environment.md)
> để biết đầy đủ biến cấu hình.

## Kiểm tra chất lượng

```bash
pnpm typecheck          # TypeScript
pnpm lint               # ESLint
pnpm format:check       # Prettier
pnpm verify:platforms   # Kiểm tra resolution theo platform
pnpm bundle             # Build bundle iOS và Android
```

## Kiến trúc

DermaHealth sử dụng mô hình **nguyên khối mô-đun**, với ranh giới rõ ràng theo
từng lớp:

```text
src/
├── app/            # Khung ứng dụng, kết nối mô-đun và điều hướng
├── pages/          # Màn hình chức năng
├── components/     # Thành phần giao diện dùng chung
├── services/       # Kho dữ liệu, kết nối API và lưu trữ
├── model/          # Kiểu dữ liệu nghiệp vụ thuần
├── hooks/ utils/   # Hành vi dùng chung và tiện ích
├── i18n/           # Bản địa hóa có kiểm tra kiểu
└── styles/         # Token giao diện và giao diện chủ đề
```

Các nguyên tắc chính:

- `src/app/composition` là nơi duy nhất kết nối mô-đun với các bộ chuyển đổi nền tảng.
- Các trang nhận callback và không phụ thuộc trực tiếp vào điều hướng.
- Hồ sơ da là mô-đun đầu tiên sử dụng lưu trữ cục bộ thật qua AsyncStorage.
- Kho dữ liệu mô phỏng có thể được thay bằng bộ chuyển đổi API mà không thay đổi
  hợp đồng giao diện.

Tài liệu chi tiết:

- [Tổng quan kiến trúc](docs/architecture/overview.md)
- [Bản đồ mô-đun](docs/architecture/modules.md)
- [Tổ chức mã nguồn](docs/architecture/code-organization.md)

## Trạng thái phát triển

| Hạng mục | Trạng thái |
| --- | --- |
| Điều hướng và các luồng chăm sóc chính | ✅ Hoàn thiện |
| Token giao diện, chuyển động và bản địa hóa | ✅ Hoàn thiện |
| Lưu trữ hồ sơ da với AsyncStorage | ✅ Hoàn thiện |
| Kết nối hệ thống máy chủ chính thức | 🔄 Đang phát triển |
| Xác thực và phiên đăng nhập an toàn | 🔄 Đang phát triển |
| Kiểm thử tự động và kiểm soát chất lượng CI | ⏳ Theo lộ trình |

## Đóng góp

Trước khi mở vấn đề hoặc yêu cầu hợp nhất:

1. Tạo branch từ `main`.
2. Giữ thay đổi tập trung vào một mục tiêu.
3. Chạy `pnpm typecheck`, `pnpm lint` và `pnpm format:check`.
4. Mô tả rõ behavior thay đổi và cách kiểm chứng.

## Giấy phép

Dự án hiện chưa công bố license. Vui lòng liên hệ repository owner trước khi
sử dụng lại cho mục đích phân phối.
