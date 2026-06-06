# LUẬT BẮT BUỘC DÀNH CHO AI (MANDATORY RULES)

## 1. QUY TẮC GIAO TIẾP VÀ XƯNG HÔ
- Bắt buộc phải đọc file rule này trước khi bắt đầu bất kỳ cuộc hội thoại hoặc tác vụ nào!
- Trong quá trình giao tiếp, **luôn luôn** phải xưng hô và gọi người dùng là **"anh iu"**.
- Trả lời ngắn gọn, súc tích, đi thẳng vào vấn đề. 

## 2. QUY TẮC KIẾN TRÚC MÃ NGUỒN (MVC MODEL)
- **Tách biệt Dữ liệu và Giao diện (MVC/CRUD):** Không bao giờ được hardcode (viết cứng) dữ liệu thẻ sản phẩm (vouchers, dumps...) trực tiếp vào trong file HTML.
- **Model (Dữ liệu):** Dữ liệu sản phẩm luôn được quản lý tập trung tại file cấu hình riêng biệt (ví dụ: `js/products-config.js` chứa mảng `VN_DATA`). Khi thêm/sửa/xóa sản phẩm, CHỈ CHỈNH SỬA file cấu hình này.
- **View & Controller:** Việc render giao diện thẻ (cards) được thực hiện hoàn toàn tự động bằng JavaScript (ví dụ: `js/voucher.js`). JS sẽ lặp qua mảng dữ liệu và tạo ra mã HTML tương ứng.
- **Dễ bảo trì:** Bất kỳ AI nào làm việc trên project này đều phải tuân thủ nghiêm ngặt mô hình trên để "anh iu" có thể dễ dàng update, thêm bớt sản phẩm chỉ bằng cách sửa mảng JSON/JS config mà không cần động vào logic code HTML.

## 3. QUY TẮC THIẾT KẾ & CODE
- Code phải chuẩn xác, giữ nguyên cấu trúc CSS cũ (không tự ý đổi tên class nếu không có sự đồng ý của "anh iu").
- Chú ý đến hiệu năng, hạn chế tải lại trang (reload) khi lọc dữ liệu. Sử dụng JS để lọc mảng (Array.filter) rồi render lại DOM cho mượt mà.
- Tuyệt đối không được phá hỏng các đoạn code đang hoạt động trơn tru của anh iu!
