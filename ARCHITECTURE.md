# HƯỚNG DẪN KIẾN TRÚC & CHỈNH SỬA WEBSITE ITCERT HUB

Tài liệu này đóng vai trò như một "bản đồ" và sách hướng dẫn (Playbook) cho bất kỳ AI hoặc Developer nào làm việc trên dự án này. **Bắt buộc phải đọc và cập nhật file này nếu có bất kỳ sự thay đổi nào về cấu trúc!**

## 1. CẤU TRÚC THƯ MỤC CHUẨN (STANDARD FOLDER STRUCTURE)
Dự án được cấu trúc theo dạng Web Tĩnh (Static Site) tối ưu SEO, không sử dụng Framework phức tạp:
```text
ITCert Hub/
├── assets/                 <-- Thư mục chứa toàn bộ tài nguyên tĩnh
│   ├── css/                <-- Chứa tất cả các file style (base.css, home.css, components.css...)
│   ├── js/                 <-- Chứa tất cả các script và Data Config (MÔ HÌNH MVC NẰM Ở ĐÂY)
│   └── images/             <-- Chứa toàn bộ hình ảnh, icon (logo, hình bài viết, banner...)
├── .cursorrules            <-- Cấu hình luật bắt buộc cho AI Cursor
├── .windsurfrules          <-- Cấu hình luật bắt buộc cho AI Windsurf
├── RULES.md                <-- File luật chung, đồng bộ với 2 file trên
├── ARCHITECTURE.md         <-- FILE NÀY: Hướng dẫn cấu trúc và cách chỉnh sửa
├── sitemap.xml             <-- File sơ đồ web cho SEO
├── robots.txt              <-- File điều hướng bot tìm kiếm
└── *.html                  <-- Các trang giao diện chính (luôn nằm ở thư mục gốc để link ngắn gọn)
```

## 2. MÔ HÌNH KIẾN TRÚC: MVC / CRUD Ở CLIENT-SIDE
Website này áp dụng triệt để nguyên tắc **Tách biệt Dữ liệu và Giao diện**. Tuyệt đối KHÔNG viết cứng (hardcode) dữ liệu vào file `.html`.

### A. Quản lý Sản phẩm (Vouchers)
- **Data (Model):** `assets/js/products-config.js` -> Chứa biến `VN_DATA`. Quản lý toàn bộ thông tin voucher, giá cả, mã giảm giá.
- **View (Giao diện):** `voucher.html` -> Chỉ chứa một thẻ `<div id="voucher-grid"></div>` rỗng.
- **Controller (Logic):** `assets/js/voucher.js` -> Tự động đọc dữ liệu từ `VN_DATA` và sinh ra HTML nhét vào thẻ div trên.
=> *Cách thêm/sửa voucher:* Mở file `assets/js/products-config.js`, tìm mảng `vouchers` và thêm/sửa một object JSON là xong.

### B. Quản lý Blog & Bài Viết
- **Data (Model):** `assets/js/blog-config.js` -> Chứa biến `BLOG_DATA`. Quản lý mảng danh sách các bài viết (ID, Tiêu đề, Tác giả, Nội dung chi tiết).
- **View (Giao diện):** 
  - `blog.html` -> Trang danh sách bài viết. (Hiển thị thẻ bài)
  - `blog-post.html` -> Trang chi tiết một bài viết. (Đọc nội dung qua Query Param `?id=...`)
- **Controller (Logic):** `assets/js/blog.js` -> Đảm nhiệm việc load danh sách ra trang blog, hoặc load chi tiết 1 bài ra trang blog-post.
=> *Cách thêm/sửa bài viết:* Copy hình ảnh vào `assets/images/`, sau đó mở file `assets/js/blog-config.js`, thêm một phần tử vào mảng `BLOG_DATA.posts`.

## 3. LƯU Ý KHI CODE
- Bất cứ khi nào tạo ra một cấu trúc động (Dynamic View) mới, phải cập nhật tài liệu `ARCHITECTURE.md` này.
- Khi làm việc với CSS, tránh viết CSS inline. Phân bổ CSS vào các file tương ứng trong `assets/css/`.
- Luôn đảm bảo đường dẫn ảnh và tài nguyên phải tương đối theo chuẩn `assets/images/...`, `assets/css/...`, `assets/js/...`.
