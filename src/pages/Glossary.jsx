import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import GLOSSARY from '../data/glossary.js';
import { C, BRAND, lessonInfo, lessonUrl, lessonNum } from '../lib/course.js';

// Bỏ dấu để gõ "dung lo" vẫn tìm ra "Dừng lỗ"
const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

export default function Glossary() {
  const [q, setQ] = useState('');
  const [track, setTrack] = useState('');
  useEffect(() => { document.title = `Thuật ngữ | ${BRAND}`; }, []);

  const items = useMemo(() => {
    const term = norm(q.trim());
    return GLOSSARY
      .map(g => ({ ...g, info: lessonInfo(g.lesson) }))
      .filter(g => !track || (g.info && g.info.track.id === track))
      .filter(g => !term || norm(`${g.term} ${g.en} ${g.def}`).includes(term))
      .sort((a, b) => a.term.localeCompare(b.term, 'vi'));
  }, [q, track]);

  return (
    <main id="main" className="page">
      <div className="wrap">
        <header className="page-head">
          <h1>Thuật ngữ</h1>
          <p>{GLOSSARY.length} thuật ngữ dùng trong khóa học, tra được bằng tiếng Việt không dấu hoặc tiếng Anh. Mỗi mục dẫn tới bài giải thích kỹ nhất.</p>
        </header>
        <div className="gl-tools">
          <label className="visually-hidden" htmlFor="gl-q">Tìm thuật ngữ</label>
          <input className="gl-search" id="gl-q" type="search" value={q} onChange={e => setQ(e.target.value)} autoComplete="off"
            placeholder="Ví dụ: funding, dung lo, mark price" />
          <div className="gl-filters" role="group" aria-label="Lọc theo chương">
            <button className="chip" type="button" aria-pressed={!track} onClick={() => setTrack('')}>Tất cả</button>
            {C.map(t => (
              <button key={t.id} className="chip" type="button" aria-pressed={track === t.id} style={{ '--c': t.tone }} onClick={() => setTrack(t.id)}>
                <i aria-hidden="true" />{t.no}. {t.name}
              </button>
            ))}
          </div>
        </div>
        <p className="visually-hidden" aria-live="polite">{items.length} thuật ngữ</p>
        {items.length ? (
          <dl className="gl-list">
            {items.map(g => (
              <div className="gl-item" key={g.term} style={{ '--c': g.info ? g.info.track.tone : 'var(--ink-3)' }}>
                <dt>{g.term}{g.en && g.en !== g.term && <span className="en">{g.en}</span>}</dt>
                <dd>{g.def}{g.info && <> <Link className="gl-link" to={lessonUrl(g.info.id)}>Bài {lessonNum(g.info)}</Link></>}</dd>
              </div>
            ))}
          </dl>
        ) : <p className="empty">Không có thuật ngữ nào khớp với “{q}”. Thử từ khoá ngắn hơn hoặc bỏ bộ lọc chương.</p>}
      </div>
    </main>
  );
}
