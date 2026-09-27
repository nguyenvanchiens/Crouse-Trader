import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../lib/course.js';

export default function NotFound() {
  useEffect(() => { document.title = `Không tìm thấy trang | ${BRAND}`; }, []);
  return (
    <main id="main" className="wrap cert-page">
      <div className="cert-locked">
        <h1>Không tìm thấy trang này</h1>
        <p>Đường dẫn có thể bị gõ sai hoặc bài học đã đổi tên. Chọn bài trong chương trình học.</p>
        <Link className="btn btn-brand" to="/#chuong-trinh">Mở chương trình học</Link>
      </div>
    </main>
  );
}
