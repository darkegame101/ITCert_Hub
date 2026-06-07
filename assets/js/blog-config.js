const BLOG_DATA = {
    posts: [
        {
            id: 'benchmark-docker-network',
            title: 'Benchmark: Docker bridge vs host network vs CNI overlay',
            category: 'sysadmin',
            date: '03/01/2026',
            author: 'Nguyễn Thanh Tuấn',
            thumbnail: 'assets/images/docker-benchmark.jpg',
            excerpt: 'Chênh lệch hiệu năng thực tế lớn đến đâu giữa Docker Bridge, Host Network và CNI Overlay? Đo lường độ trễ mạng thực tế.',
            content: `<p><strong>Bài viết chia sẻ kết quả benchmark từ anh Nguyễn Thanh Tuấn trên cộng đồng DevOps VN.</strong></p>

<img src="assets/images/docker-benchmark.jpg" alt="Benchmark" style="width:100%; border-radius:12px; margin-bottom:20px;">

<p>Hiện tại đa phần hạ tầng dùng Kubernetes rồi có mấy service từ lâu đang chạy thuần Container và có issue lâu lâu mới lên chia sẻ cùng với anh em.</p>

<p>Trước tôi không để ý lắm tới network mode của container, Hệ thống chậm thì thường anh em sẽ soi DB trước, rồi tới cache, rồi query, rồi code. Phần network giữa các service thường bị xem là chuyện nền. Có overhead thì chắc có, nhưng cảm giác nó không phải thứ tạo ra khác biệt lớn.</p>

<p>Nhưng rồi đến một dạo trực Jira rảnh rảnh ngồi xem p99 của một hệ thống nội bộ.</p>

<p>Hệ thống đó không có dấu hiệu nghẽn rõ ràng. CPU không cao. DB không căng. Redis cũng ổn. Nhưng cứ vào giờ nhiều traffic là p99 nhảy lên khá khó chịu. Không phải kiểu sập hẳn, chỉ là mọi thứ mất độ mượt. Request nào xui thì chậm hẳn ra một đoạn.</p>

<p>Lúc đầu tôi cũng nghĩ chắc do app. Sau đó lôi connection pool ra xem, rồi nhìn GC, rồi soi timeout giữa các service. Cuối cùng mới thấy network path giữa service này với service kia cũng góp phần không nhỏ.</p>

<p>Thế là tôi ngồi đo lại cho rõ, với ba kiểu hay gặp nhất:</p>

<p>Điều tôi muốn biết khá đơn giản: với request nhỏ, gọi qua gọi lại liên tục giữa các service, thì phần chênh này thực tế lớn đến đâu. Nhất là ở p95 với p99.</p>

<h2>Bối cảnh bài benchmark</h2>

<p>Case tôi dùng cũng không có gì lạ.</p>

<p>Một service A gọi sang service B bằng HTTP nội bộ. Request JSON khoảng 1KB. Response cũng cỡ đó. Tôi bỏ TLS ra để nhìn cho sạch phần network, đỡ trộn thêm chi phí mã hóa. Bên service nhận cũng làm rất ít việc, gần như nhận request xong trả response lại luôn.</p>

<p>Ý là tôi không muốn benchmark framework hay business logic. Tôi chỉ muốn bóc phần network giữa service với service ra nhìn riêng.</p>

<p>Tôi chạy hai tình huống.</p>

<p>Một là hai service nằm cùng một node. Case này ngoài đời gặp khá nhiều, nhất là khi hệ thống còn chưa lớn hoặc scheduler đặt trùng máy.</p>

<p>Hai là hai service nằm khác node. Cái này mới sát production hơn, vì khi đã scale ra vài máy thì chuyện gọi khác node là bình thường.</p>

<p>Máy test là 8 vCPU, 16GB RAM, 10GbE. Mỗi bài tôi warm-up 10 giây, đo 60 giây, chạy 5 vòng rồi lấy median. Client benchmark nằm ở máy riêng để đỡ ảnh hưởng lẫn nhau.</p>

<h2>Ba kiểu network tôi đem ra so</h2>

<p>Bridge thì chắc ai chạy Docker cũng quen. Đây là mode mặc định. Container có network namespace riêng, đi qua bridge của host, thường kèm theo NAT và conntrack trong đường đi.</p>

<p>Host network thì đơn giản hơn nhiều. Container dùng thẳng network stack của host. Ít lớp hơn, ít xử lý hơn, bù lại phần cách ly mạng cũng kém đi.</p>

<p>Overlay thì tôi test theo kiểu phổ biến trong cluster multi-node, dạng VXLAN. Cái được là network model gọn hơn khi chạy nhiều node. Cái mất là packet phải đi vòng hơn và thêm vài lớp xử lý.</p>

<h2>Kết quả khi hai service nằm cùng node</h2>

<p>Bảng đầu tiên ra khá đúng với những gì tôi đoán, nhưng mức chênh không đến mức quá ghê gớm.</p>

<p>Host network đẹp nhất, cái này không có gì bất ngờ.</p>

<p>Bridge thấp hơn một chút. p99 từ 1.60ms lên 2.10ms. Overlay lên 2.70ms.</p>

<p>Điều tôi thấy đáng nói là bridge thực ra ổn hơn nhiều người hay nghĩ. Nếu chỉ nhìn case cùng node thì tôi không thấy lý do gì phải dị ứng với nó cả. Nó không đẹp bằng host network, nhưng cũng chưa đủ tệ để thành vấn đề trong đa số hệ thống bình thường.</p>

<p>Overlay thì bắt đầu lộ giá rồi. Dù vậy, nếu chỉ dừng ở case cùng node thì vẫn chưa thấy nó đáng sợ.</p>

<h2>Sang case khác node mới bắt đầu thấy rõ</h2>

<p>Khác biệt lộ ra rõ hơn khi request phải đi từ máy này sang máy kia.</p>

<p>Đến đây thì tôi gần như không còn quan tâm p50 nữa. p50 vẫn khá hiền. Tất cả vẫn quanh 1ms đến 1.5ms. Nếu chỉ nhìn median thì rất dễ kết luận là network mode không ảnh hưởng bao nhiêu.</p>

<p>Nhưng nhìn sang p99 thì câu chuyện khác hẳn.</p>

<p>Host network ở 4.8ms. Bridge lên 6.9ms. Overlay lên 10.8ms.</p>

<p>Một hop thì con số này có thể vẫn chịu được. Nhưng hệ thống microservice hiếm khi chỉ có một hop. Một request đi qua gateway, auth, user service, rồi thêm một hai service phụ nữa thì phần xấu nhất của từng hop cộng lại rất nhanh. Đó là lúc cả hệ thống bắt đầu cho cảm giác ì ra dù nhìn từng chỗ riêng lẻ chưa chắc thấy nghẽn.</p>

<p>Tôi nghĩ đây là chỗ nhiều team dễ bỏ sót nhất. Mỗi service nhìn riêng đều có vẻ ổn. Nhưng phần latency xấu của từng hop cộng lại thì không ổn chút nào.</p>

<h2>Tôi thử thêm burst traffic</h2>

<p>Production không chạy đều như máy phát nhịp, nên tôi thêm một bài nữa. Traffic tăng gấp đôi trong một đoạn ngắn rồi hạ xuống lại.</p>

<p>Bảng này nhìn phát ra vấn đề luôn.</p>

<p>Lúc có burst thì overlay bắt đầu lộ rõ nhược điểm hơn hẳn. p99 gần 19ms, trong khi host network vẫn dưới 8ms.</p>

<p>Đây là đoạn làm tôi thấy network mode không còn là chi tiết nhỏ nữa. Nếu service của mọi người gọi nhau nhiều, request nhỏ, concurrency cao, thì network path hoàn toàn có thể ăn vào độ trễ cuối cùng nhiều hơn mình tưởng.</p>

<h2>Vì sao overlay vấn đề nhất</h2>

<p>Thật ra overlay chậm hơn cũng không có gì oan cho nó. Nó đang giải một bài toán khó hơn.</p>

<p>Khi dùng overlay, mọi người đang đổi lấy:</p>

<p>Đổi lại packet phải đi qua thêm encapsulation, decapsulation, routing, policy và một loạt xử lý nữa.</p>

<p>Với request nhỏ, mấy phần chi phí cố định kiểu này lộ ra rất nhanh. Không phải do thiếu băng thông. Chủ yếu là vì bản thân request quá ngắn. Chỉ cần thêm một ít xử lý vào mỗi hop là nhìn ra ngay.</p>

<h2>Có nên dùng host network cho mọi thứ không</h2>

<p>Kết luận một cái gì đó áp dụng tất cả thì chưa hay rồi.</p>

<p>Host network đúng là đẹp nhất nếu chỉ nhìn latency. Nhưng nó cũng mang theo một loạt thứ không vui lắm. Port đụng nhau dễ hơn. Cách ly mạng kém hơn. Vận hành container cũng mất đi một phần tiện.</p>

<p>Bridge thì ở giữa và khá cân bằng. Nếu hệ thống chạy ít node hoặc chưa quá nhạy p99, tôi thấy bridge đủ ổn cho rất nhiều case.</p>

<p>Overlay thì đương nhiên đắt hơn về latency, nhất là lúc đi khác node. Nhưng nếu đang chạy cluster nhiều node thì nhiều khi đó là cái giá phải trả để đổi lấy sự linh hoạt lúc vận hành. Lúc này câu hỏi hợp lý hơn thường là service nào đủ nhạy để mình phải tối ưu riêng cho nó, chứ không phải có nên vứt overlay đi hết hay không.</p>

<h2>Vài điều sau bài test này</h2>

<p>Điều đáng nhớ nhất không phải là host network đứng đầu. Cái đó quá dễ đoán.</p>

<p>Thứ đáng nhớ hơn là bridge không tệ như tôi từng nghĩ. Còn overlay thì cái giá của nó lộ mạnh nhất ở p95 với p99, nhất là khi khác node và có burst traffic.</p>

<p>Nếu hệ thống của mọi người ít hop, timeout rộng, không quá nhạy vài mili-giây, có thể sự khác biệt này chưa thành vấn đề.</p>

<p>Nhưng nếu đang chạy một đám service gọi nhau liên tục, có fan-out, có retry, và từng thắc mắc vì sao hệ thống không nghẽn hẳn mà vẫn không mượt, thì network mode là một thứ rất đáng mang ra đo lại.</p>

<p>Sau lần này thì tôi không còn xem network giữa các service là chuyện nền nữa.</p>

<p>Host network vẫn là lựa chọn đẹp nhất nếu chỉ nhìn latency. Bridge là điểm cân bằng khá ổn. Overlay thì không miễn phí, và phần tiền mọi người trả thường nằm ở p95 với p99 chứ không nằm ở p50.</p>

<p>Cuối cùng thì cũng không có đáp án chung cho tất cả. Có chỗ cần sự đơn giản. Có chỗ cần sự linh hoạt. Có chỗ chỉ cần bớt vài mili-giây ở phần đuôi là đủ khác biệt rồi.</p>

<p>Nếu muốn ra quyết định cho đúng, tốt nhất vẫn là đem workload thật của hệ thống mình ra đo. Nhưng ít nhất sau bài test này, tôi thấy phần network giữa service với service đáng để nghiêm túc hơn nhiều so với cách tôi từng nghĩ.</p>

<h2>Thông tin nổi bật</h2>

<h2>Sự kiện phát trực tiếp​</h2>

<h2>Sự kiện đang hiện hành</h2>

<h2>Nội dung nổi bật</h2>

<h2>Bài viết khác</h2>

<p>DevOps VietNamCộng đồng DevOps VietNam - Kết nối, hợp tác, chia sẻ.</p>

<p>© 2017 devops.vn - Cộng đồng DevOps VietNam.</p>

<h2>Sự kiện đang hiện hành</h2>

<h2>Bài viết mới nhất</h2>

<p>' + scriptOptions._localizedStrings.webview_notification_text + '</p>

<p>" + scriptOptions._localizedStrings.redirect_overlay_title + "</p>

<p>" + scriptOptions._localizedStrings.redirect_overlay_text + "</p>`
        },
        {
            id: 'ccna-lo-trinh',
            title: 'Lộ Trình Học CCNA Từ Zero đến Pass Trong 3 Tháng',
            category: 'cisco',
            date: '05/06/2026',
            author: 'Admin',
            thumbnail: 'assets/images/logo.png',
            excerpt: 'Hướng dẫn chi tiết lộ trình học CCNA 200-301 cho người mới bắt đầu: tài liệu cần có, lịch học hàng ngày, cách luyện lab...',
            content: '<p>Nội dung đang được cập nhật...</p>'
        },
        {
            id: 'az900-meo',
            title: '10 Mẹo Vàng Để Pass AZ-900 Ngay Lần Đầu',
            category: 'microsoft',
            date: '02/06/2026',
            author: 'Cloud Expert',
            thumbnail: 'assets/images/logo.png',
            excerpt: 'Những kinh nghiệm thực tế từ hàng trăm học viên đã pass AZ-900. Tâm lý thi, cách quản lý thời gian và các domain...',
            content: '<p>Nội dung đang được cập nhật...</p>'
        },
        {
            id: 'aws-saac03',
            title: 'AWS SAA-C03 Cập Nhật Đề Thi Mới - Thay Đổi Quan Trọng 2026',
            category: 'aws',
            date: '28/05/2026',
            author: 'AWS Mentor',
            thumbnail: 'assets/images/logo.png',
            excerpt: 'AWS vừa cập nhật cấu trúc đề thi SAA-C03 với nhiều thay đổi về domain phân bổ và dạng câu hỏi mới...',
            content: '<p>Nội dung đang được cập nhật...</p>'
        }
    ]
};
