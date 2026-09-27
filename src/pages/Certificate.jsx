import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { C, flat, BRAND, COURSE_TITLE, lessonUrl, lessonNum, totalMinutes, fmtMin } from '../lib/course.js';
import { progress, learner, useStore } from '../lib/store.js';
import { BrandMark } from '../components/Visuals.jsx';

// Mã chứng nhận: băm FNV-1a từ tên và thời điểm hoàn thành
function certCode(name, at) {
  let h = 2166136261;
  for (const ch of name + at) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return 'SL-' + (h >>> 0).toString(36).toUpperCase().padStart(7, '0');
}

export default function Certificate() {
  useStore();
  useEffect(() => { document.title = `Chứng nhận hoàn thành | ${BRAND}`; }, []);
  const at = progress.completedAt();

  if (!at) {
    const nxt = progress.next();
    return (
      <main id="main" className="wrap cert-page">
        <div className="cert-locked">
          <h1>Chứng nhận chưa mở khoá</h1>
          <p>Bạn còn {flat.length - progress.total()} bài nữa. Đánh dấu hoàn thành cả {flat.length} bài để nhận chứng nhận có tên mình.</p>
          <Link className="btn btn-brand" to={lessonUrl(nxt.id)}>Học tiếp bài {lessonNum(nxt)}</Link>
        </div>
      </main>
    );
  }

  const me = learner.get() || {};
  const name = me.name || `Học viên ${BRAND}`;
  const date = new Date(at).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main id="main" className="wrap cert-page">
      <div className="cert-tools">
        <p>{!me.name && <>Chưa có tên trên chứng nhận. <Link className="text-link" to="/hoc-cua-toi">Thêm tên ở trang Học của tôi</Link>.</>}</p>
        <button className="btn btn-dark" type="button" onClick={() => window.print()}>In hoặc lưu PDF</button>
      </div>
      <article className="certificate" aria-label="Chứng nhận hoàn thành">
        <div className="top"><span className="brand"><BrandMark /><span>{BRAND}</span></span><small>Mã chứng nhận: {certCode(name, at)}</small></div>
        <div className="mid">
          <small>Chứng nhận hoàn thành khóa học trao cho</small>
          <div className="name">{name}</div>
          <div className="course">{COURSE_TITLE}</div>
          <p className="desc">Đã hoàn thành {flat.length} bài học trong {C.length} chương ({fmtMin(totalMinutes())} nội dung): {C.map(t => t.title).join('; ')}.</p>
        </div>
        <div className="bottom"><div>Ngày hoàn thành<strong>{date}</strong></div><div className="r">Cấp bởi<strong>{BRAND}</strong></div></div>
        <p className="cert-note">Chứng nhận xác nhận việc hoàn thành nội dung học, không phải chứng chỉ hành nghề hay giấy phép tư vấn đầu tư.</p>
      </article>
    </main>
  );
}
