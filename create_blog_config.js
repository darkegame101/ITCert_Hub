const fs = require('fs');

const extractedText = fs.readFileSync('extracted_post.html', 'utf8');
const lines = extractedText.split('\n\n');
const contentHtml = lines.slice(0, 112).join('\n\n'); // First 112 lines are the actual content

const blogData = `const BLOG_DATA = {
    posts: [
        {
            id: 'benchmark-docker-network',
            title: 'Benchmark: Docker bridge vs host network vs CNI overlay',
            category: 'sysadmin',
            date: '25/03/2026',
            author: 'Nguyễn Thanh Tuấn',
            thumbnail: 'assets/images/docker-benchmark.jpg',
            excerpt: 'Chênh lệch hiệu năng thực tế lớn đến đâu giữa Docker Bridge, Host Network và CNI Overlay? Đo lường độ trễ mạng thực tế.',
            content: \`<p><strong>Bài viết chia sẻ kết quả benchmark từ anh Nguyễn Thanh Tuấn trên cộng đồng DevOps VN.</strong></p>\n\n<img src="assets/images/docker-benchmark.jpg" alt="Benchmark" style="width:100%; border-radius:12px; margin-bottom:20px;">\n\n${contentHtml}\`
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
`;

fs.writeFileSync('assets/js/blog-config.js', blogData, 'utf8');
console.log('blog-config.js created!');
