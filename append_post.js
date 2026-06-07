const fs = require('fs');

let content = fs.readFileSync('assets/js/blog-config.js', 'utf8');

// Fix the previous date corruption
content = content.replace('date: \'25/03/2026\'', 'date: \'03/01/2026\'');

const newPost = `
        {
            id: 'no-space-left-on-device',
            title: '"No space left on device" nhưng ổ cứng vẫn còn 40% dung lượng? Đây là một trong những lỗi Linux dễ gây hiểu lầm nhất',
            category: 'sysadmin',
            date: '08/06/2026',
            author: 'Admin',
            thumbnail: 'assets/images/nospacedevice.jpg',
            excerpt: 'Khám phá tại sao hệ thống Linux báo lỗi No space left on device dù df -h vẫn báo ổ cứng còn trống đến 40%.',
            content: \`<p>Một trong những tình huống khiến nhiều DevOps, SysAdmin và SRE đau đầu là nhìn thấy ứng dụng báo lỗi:</p>
<blockquote><p><code>No space left on device</code></p></blockquote>
<p>Phản ứng đầu tiên của hầu hết mọi người thường là:</p>
<pre><code>df -h</code></pre>
<p>Kết quả:</p>
<pre><code>Filesystem      Size  Used Avail Use%
/dev/xvda1      100G   60G   40G  60%</code></pre>
<p>Ổ đĩa vẫn còn hàng chục GB trống. Nhưng ứng dụng vẫn không ghi được dữ liệu. Log vẫn lỗi. Container vẫn crash. Database vẫn báo "disk full".</p>
<p>Vậy chuyện gì đang xảy ra?</p>

<h3>Không phải lúc nào "No space left on device" cũng có nghĩa là hết dung lượng</h3>
<p>Đây là một trong những hiểu lầm phổ biến nhất khi vận hành Linux. Thông báo này thực chất có thể xuất phát từ nhiều nguyên nhân khác nhau.</p>
<p>Trong một số trường hợp: <strong>Disk vẫn còn trống nhưng hệ điều hành không thể tạo thêm file mới.</strong> Nghe có vẻ vô lý nhưng hoàn toàn có thể xảy ra.</p>

<h3>Thủ phạm phổ biến: Hết inode</h3>
<p>Linux quản lý file thông qua inode. Mỗi file hoặc thư mục trên hệ thống đều cần một inode. Khi tạo file mới:</p>
<ul>
  <li>Cần dung lượng lưu dữ liệu</li>
  <li>Cần một inode để lưu metadata</li>
</ul>
<p>Nếu inode bị sử dụng hết: <code>No space left on device</code> sẽ xuất hiện mặc dù ổ cứng vẫn còn rất nhiều GB trống.</p>
<p>Kiểm tra bằng:</p>
<pre><code>df -i</code></pre>
<p>Ví dụ:</p>
<pre><code>Filesystem      Inodes   IUsed   IFree IUse%
/dev/xvda1        6.5M    6.5M       0  100%</code></pre>
<p>Lúc này vấn đề không nằm ở disk space. Mà nằm ở inode.</p>

<h3>Hệ thống log sinh file quá nhiều</h3>
<p>Đây là nguyên nhân rất thường gặp. Ví dụ:</p>
<pre><code>logs/
├── app-1.log
├── app-2.log
├── app-3.log
...
├── app-500000.log</code></pre>
<p>Tổng dung lượng có thể chỉ vài GB. Nhưng số lượng file quá lớn. Kết quả: Inode bị sử dụng hết. Không tạo được file mới. Application bắt đầu lỗi.</p>

<h3>Docker cũng là "nghi phạm quen thuộc"</h3>
<p>Nhiều môi trường Docker hoặc Kubernetes gặp tình trạng: Container logs, Container layers, Image cache, Temporary files tăng dần theo thời gian. Đặc biệt trên những host chạy lâu năm.</p>
<p>Một số trường hợp chạy <code>docker system df</code> cho thấy dung lượng vẫn ổn. Nhưng số lượng file bên trong overlay filesystem lại cực lớn.</p>

<h3>File đã bị xóa nhưng dung lượng vẫn không được giải phóng</h3>
<p>Đây là lỗi kinh điển trong production. Ví dụ: <code>rm huge.log</code>. Bạn nghĩ đã giải phóng được 50 GB. Nhưng <code>df -h</code> vẫn không thay đổi.</p>
<p>Nguyên nhân là process nào đó vẫn đang giữ file descriptor. Linux chỉ thực sự giải phóng dung lượng khi file bị xóa VÀ process không còn sử dụng file đó.</p>
<p>Kiểm tra:</p>
<pre><code>lsof | grep deleted</code></pre>
<p>Nhiều trường hợp chỉ cần restart service là lấy lại hàng chục GB dung lượng.</p>

<h3>Tmpfs hoặc bộ nhớ tạm bị đầy</h3>
<p>Một số ứng dụng ghi dữ liệu vào: <code>/tmp</code>, <code>/dev/shm</code>, <code>run</code>, <code>tmpfs</code>. Khi các vùng này đầy, ứng dụng cũng có thể báo <code>No space left on device</code> dù ổ cứng vật lý còn rất nhiều dung lượng.</p>
<p>Kiểm tra bằng <code>df -h</code> và chú ý các filesystem dạng tmpfs, shm.</p>

<h3>Kubernetes cũng có thể gặp lỗi tương tự</h3>
<p>Trong Kubernetes, lỗi này thường xuất hiện khi EmptyDir đầy, Ephemeral Storage đầy, hoặc Container logs tăng quá nhanh dẫn đến Node Disk Pressure.</p>
<p>Kết quả: Pod restart liên tục, Eviction xảy ra, Scheduling thất bại, trong khi người vận hành vẫn thấy node còn nhiều dung lượng.</p>

<h3>Cách tiếp cận khi gặp lỗi</h3>
<p>Thay vì chỉ chạy <code>df -h</code>, hãy kiểm tra theo checklist:</p>
<ol>
  <li><strong>Bước 1:</strong> <code>df -h</code> - Xem dung lượng thực tế.</li>
  <li><strong>Bước 2:</strong> <code>df -i</code> - Kiểm tra inode.</li>
  <li><strong>Bước 3:</strong> <code>lsof | grep deleted</code> - Tìm file đã bị xóa nhưng vẫn đang mở.</li>
  <li><strong>Bước 4:</strong> <code>du -sh /*</code> - Xác định thư mục chiếm nhiều dung lượng.</li>
  <li><strong>Bước 5:</strong> Kiểm tra Docker, Kubernetes, tmpfs, application logs.</li>
</ol>

<h3>Bài học rút ra</h3>
<p>Một trong những sai lầm phổ biến của người mới làm Linux là nghĩ rằng: <em>"Disk còn trống thì chắc chắn không thể bị lỗi hết chỗ."</em> Thực tế hệ điều hành phức tạp hơn nhiều. Dung lượng lưu trữ chỉ là một phần của câu chuyện.</p>
<p>Inode, file descriptor, tmpfs, container storage hay log management đều có thể trở thành nguyên nhân khiến hệ thống báo <code>No space left on device</code> trong khi ổ cứng vẫn còn hàng chục GB trống.</p>

<h3>Kết luận</h3>
<p>Khi gặp lỗi <code>No space left on device</code>, đừng vội kết luận rằng server đã hết dung lượng. Hãy nhớ rằng: <strong>Disk Space ≠ Khả năng tạo file mới.</strong></p>
<p>Nhiều sự cố production kéo dài hàng giờ chỉ vì mọi người chăm chăm nhìn vào <code>df -h</code> mà quên kiểm tra inode, file descriptor hoặc container storage. Đôi khi nguyên nhân không nằm ở việc hết dung lượng. Mà nằm ở cách Linux quản lý tài nguyên bên dưới.</p>\`
        },`;

content = content.replace('posts: [', 'posts: [\n' + newPost);

fs.writeFileSync('assets/js/blog-config.js', content, 'utf8');
console.log('Post appended');
