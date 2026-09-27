import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { C, flat, LESSONS, BRAND, COURSE_TITLE, lessonInfo, lessonUrl, lessonNum, ytThumb, ytEmbed, ytWatch } from '../lib/course.js';
import { progress, notes, useStore } from '../lib/store.js';
import { useUI } from '../lib/ui.jsx';
import { BrandMark, Html, Ring } from '../components/Visuals.jsx';
import { ThemeToggle } from '../components/Layout.jsx';
import LessonBlocks from '../components/LessonBlocks.jsx';
import Quiz from '../components/Quiz.jsx';
import { IAward, ICheck, IChev, IClock, IClose, IDoc, ILeft, ILink, IMenu, INote, IPlay, IQuiz, IRefresh, IRight, ICalc } from '../components/Icons.jsx';

const TABS = [
  { key: 'bai-hoc', label: 'Bài học', Icon: IDoc },
  { key: 'kiem-tra', label: 'Kiểm tra', Icon: IQuiz },
  { key: 'nguon', label: 'Nguồn', Icon: ILink },
  { key: 'ghi-chu', label: 'Ghi chú', Icon: INote }
];

function Video({ v, num }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="lesson-video">
      <div className="lv-frame">
        {playing
          ? <iframe src={ytEmbed(v.id)} title={v.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          : (
            <button type="button" className="lv-poster" aria-label={`Phát video: ${v.title}`} onClick={() => setPlaying(true)}>
              <img src={ytThumb(v.id)} alt="" loading="lazy" />
              <span className="play"><IPlay /></span>
            </button>
          )}
      </div>
      <figcaption>
        <span>Video tham khảo cho bài {num}: <strong>{v.title}</strong>, {v.channel}{v.lang === 'vi' ? '' : ' (tiếng Anh, bật phụ đề tự động tiếng Việt trong cài đặt video)'}.</span>
        <a href={ytWatch(v.id)} target="_blank" rel="noopener">Mở trên YouTube</a>
      </figcaption>
    </figure>
  );
}

function Sidebar({ info, open, onClose }) {
  const { toast } = useUI();
  const [openSecs, setOpenSecs] = useState(() => new Set([info.track.id]));
  const curRef = useRef(null);
  useEffect(() => { setOpenSecs(s => new Set(s).add(info.track.id)); }, [info.track.id]);
  useEffect(() => { if (curRef.current) curRef.current.scrollIntoView({ block: 'nearest' }); }, [info.id]);

  return (
    <aside className={`learn-side${open ? ' open' : ''}`} id="side" aria-label="Nội dung khóa học">
      <div className="side-head"><h2>Nội dung khóa học</h2><button className="icon-btn side-close" type="button" aria-label="Đóng" onClick={onClose}><IClose /></button></div>
      {C.map(tr => {
        const isOpen = openSecs.has(tr.id);
        return (
          <section key={tr.id} className="side-sec" data-open={isOpen} style={{ '--c': tr.tone }}>
            <button type="button" aria-expanded={isOpen}
              onClick={() => setOpenSecs(s => { const n = new Set(s); n.has(tr.id) ? n.delete(tr.id) : n.add(tr.id); return n; })}>
              <span className="sn" aria-hidden="true">{tr.no}</span>
              <span className="st"><strong>{tr.title}</strong><small>{progress.count(tr.lessons.map(l => l.id))}/{tr.lessons.length} bài</small></span><IChev />
            </button>
            <ul>
              {tr.lessons.map((l, i) => {
                const d = LESSONS[l.id];
                const cur = l.id === info.id;
                const done = progress.isDone(l.id);
                return (
                  <li key={l.id} className={`side-item${cur ? ' current' : ''}`} ref={cur ? curRef : undefined}>
                    <input type="checkbox" checked={done} aria-label={`Đánh dấu đã học bài ${tr.no}.${i + 1}`}
                      onChange={e => { progress.set(l.id, e.target.checked); toast(e.target.checked ? 'Đã đánh dấu hoàn thành' : 'Đã bỏ đánh dấu'); }} />
                    <div>
                      <Link to={lessonUrl(l.id)} aria-current={cur ? 'page' : undefined} onClick={onClose}>{tr.no}.{i + 1} {l.title}</Link>
                      <span className="sub">{d ? `${d.duration} phút${d.level ? `, ${d.level.toLowerCase()}` : ''}` : 'Đang biên soạn'}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </aside>
  );
}

function NotesPanel({ id, num }) {
  const [text, setText] = useState(() => notes.get(id));
  const [status, setStatus] = useState('');
  const timer = useRef();
  useEffect(() => { setText(notes.get(id)); setStatus(''); }, [id]);
  function change(e) {
    const v = e.target.value;
    setText(v);
    setStatus('Đang lưu...');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { notes.set(id, v); setStatus('Đã lưu'); }, 500);
  }
  return (
    <div className="panel-inner">
      <h2 className="panel-h">Ghi chú của bạn</h2>
      <p className="panel-sub">Tự động lưu trên trình duyệt này. Xem lại tất cả ghi chú ở trang Học của tôi.</p>
      <label className="visually-hidden" htmlFor="note">Ghi chú cho bài {num}</label>
      <textarea id="note" value={text} onChange={change} placeholder="Quy tắc bạn rút ra, câu hỏi còn thắc mắc, một lệnh cũ của bạn mà bài này giải thích được..." />
      <p className="saved" aria-live="polite">{status}</p>
    </div>
  );
}

export default function Learn() {
  useStore();
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useUI();
  const [sideOpen, setSideOpen] = useState(false);
  const tabsRef = useRef(null);

  const info = lessonInfo(id);
  const data = info && LESSONS[info.id];
  const tab = TABS.some(t => t.key === params.get('tab')) ? params.get('tab') : 'bai-hoc';

  useEffect(() => {
    if (!info) return;
    document.title = `${lessonNum(info)} ${info.title} | ${BRAND}`;
    progress.touch(info.id);
    window.scrollTo(0, 0);
  }, [info]);

  if (!info) return <Navigate to="/khong-tim-thay" replace />;

  const t = info.track;
  const num = lessonNum(info);
  const idx = flat.findIndex(l => l.id === info.id);
  const prev = flat[idx - 1];
  const next = flat[idx + 1];
  const done = progress.isDone(info.id);
  const quiz = (data && data.quiz) || [];
  const res = (data && data.sources) || [];
  const qScore = progress.quiz()[info.id];
  const updated = data && data.updated ? data.updated.split('-').reverse().join('/') : null;
  const tools = data ? data.blocks.filter(b => b.type === 'tool').length : 0;

  function showTab(key) {
    setParams(key === 'bai-hoc' ? {} : { tab: key }, { replace: true });
    const top = tabsRef.current.getBoundingClientRect().top + scrollY - 56;
    if (scrollY > top) scrollTo({ top });
  }

  function complete() {
    progress.set(info.id, true);
    if (!progress.next()) { toast('Bạn đã hoàn thành cả khóa học!'); setTimeout(() => navigate('/chung-nhan'), 900); return; }
    if (next) navigate(lessonUrl(next.id));
  }

  function onTabKey(e) {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const i = TABS.findIndex(x => x.key === tab);
    const n = TABS[(i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length];
    showTab(n.key);
    requestAnimationFrame(() => document.getElementById(`tab-${n.key}`)?.focus());
  }

  const badge = {
    'kiem-tra': qScore ? { text: `${qScore.score}/${qScore.total}`, ok: qScore.score === qScore.total } : { text: quiz.length },
    nguon: { text: res.length },
    'ghi-chu': notes.get(info.id) ? { text: '1' } : null
  };

  return (
    <div className="learn" style={{ '--c': t.tone }}>
      <a className="skip-link" href="#main">Bỏ qua, tới nội dung bài</a>
      <header className="player-top">
        <div className="in">
          <Link className="brand" to="/" aria-label={`${BRAND}, trang khóa học`}><BrandMark /></Link>
          <Link className="course-name" to="/#chuong-trinh">{COURSE_TITLE}</Link>
          <div className="tools">
            <Link className="prog" to="/hoc-cua-toi" title="Tiến độ của bạn"><Ring pct={progress.pct()} size={30} /><span><strong>{progress.total()}</strong>/{flat.length} bài</span></Link>
            <Link className="btn btn-light btn-sm top-link" to="/cong-cu"><ICalc /><span>Công cụ</span></Link>
            <Link className="btn btn-light btn-sm top-link cert-btn" to="/chung-nhan"><IAward /><span>Chứng nhận</span></Link>
            <ThemeToggle />
            <button className="icon-btn side-open" type="button" aria-controls="side" aria-expanded={sideOpen} aria-label="Mở nội dung khóa học" onClick={() => setSideOpen(o => !o)}><IMenu /></button>
          </div>
        </div>
      </header>

      <div className="learn-layout">
        <main className="learn-main" id="main">
          <header className="lesson-head">
            <div className="lesson-head-in">
              <p className="lesson-kicker"><span className="kn">{num}</span>Chương {t.no}, {t.title}. Bài {info.index + 1}/{t.lessons.length}</p>
              <h1 className="lesson-h1">{info.title}</h1>
              {data && <Html as="p" className="lesson-summary" html={data.summary} />}
              {data && (
                <div className="lesson-meta">
                  <span className="pill"><IClock />{data.duration} phút đọc</span>
                  {data.level && <span className="pill">{data.level}</span>}
                  <span className="pill"><IQuiz />{quiz.length} câu hỏi</span>
                  {tools > 0 && <span className="pill"><ICalc />{tools} công cụ tính</span>}
                  {updated && <span className="pill"><IRefresh />Cập nhật {updated}</span>}
                </div>
              )}
            </div>
          </header>

          <nav className="tabs" aria-label="Phần của bài học" ref={tabsRef}>
            <div className="in" role="tablist" onKeyDown={onTabKey}>
              {TABS.map(({ key, label, Icon }) => (
                <button key={key} type="button" role="tab" id={`tab-${key}`} aria-controls={`panel-${key}`}
                  aria-selected={tab === key} tabIndex={tab === key ? 0 : -1} onClick={() => showTab(key)}>
                  <Icon />{label}
                  {badge[key] && <span className={`badge${badge[key].ok ? ' ok' : ''}`}>{badge[key].text}</span>}
                </button>
              ))}
            </div>
          </nav>

          {!data ? (
            <section className="panel" role="tabpanel" id="panel-bai-hoc"><div className="panel-inner">
              <p className="empty">Bài này đang được biên soạn. Bạn có thể học các bài khác trong lúc chờ.</p>
            </div></section>
          ) : (
            <>
              <section className="panel" role="tabpanel" id="panel-bai-hoc" aria-labelledby="tab-bai-hoc" hidden={tab !== 'bai-hoc'}>
                <div className="panel-inner">
                  {data.goals && (
                    <section className="goals" aria-labelledby="goals-h">
                      <h2 id="goals-h">Sau bài này, bạn sẽ</h2>
                      <ul>{data.goals.map((g, i) => <li key={i}><ICheck /><Html html={g} /></li>)}</ul>
                    </section>
                  )}
                  {data.video && <Video v={data.video} num={num} />}
                  <LessonBlocks key={info.id} blocks={data.blocks} num={num} lessonId={info.id} />
                  {data.keyPoints && (
                    <section className="keypoints" aria-labelledby="kp-h">
                      <h2 id="kp-h">Những điều cần nhớ</h2>
                      <ul>{data.keyPoints.map((k, i) => <Html as="li" key={i} html={k} />)}</ul>
                    </section>
                  )}
                  {data.practice && data.practice.length > 0 && (
                    <section className="practice" aria-labelledby="pr-h">
                      <h2 id="pr-h">Thực hành ngay</h2>
                      <ol>{data.practice.map((k, i) => <Html as="li" key={i} html={k} />)}</ol>
                    </section>
                  )}
                  {quiz.length > 0 && (
                    <div className="next-cta">
                      <p>Đọc xong rồi? Kiểm tra lại hiểu biết của bạn.<small>{quiz.length} câu trắc nghiệm, có giải thích từng đáp án.</small></p>
                      <button className="btn btn-dark" type="button" onClick={() => showTab('kiem-tra')}>Làm bài kiểm tra</button>
                    </div>
                  )}
                </div>
              </section>

              <section className="panel" role="tabpanel" id="panel-kiem-tra" aria-labelledby="tab-kiem-tra" hidden={tab !== 'kiem-tra'}>
                <div className="panel-inner">
                  <div className="quiz-intro">
                    <div><h2 className="panel-h">Kiểm tra nhanh: bài {num}</h2><p className="panel-sub">Chọn một đáp án cho mỗi câu. Giải thích hiện ra ngay sau khi bạn chọn.</p></div>
                    {qScore && <span className="pill">Điểm gần nhất: {qScore.score}/{qScore.total}</span>}
                  </div>
                  <Quiz key={info.id} quiz={quiz}
                    onFinish={(score, total) => progress.setQuiz(info.id, score, total)}
                    extraActions={!done && <button className="btn btn-line btn-sm" type="button" onClick={complete}>Hoàn thành bài</button>} />
                </div>
              </section>

              <section className="panel" role="tabpanel" id="panel-nguon" aria-labelledby="tab-nguon" hidden={tab !== 'nguon'}>
                <div className="panel-inner">
                  <h2 className="panel-h">Nguồn tham khảo</h2>
                  <p className="panel-sub">Các dữ kiện và con số trong bài dựa trên những nguồn dưới đây. Nên đọc bản gốc với những gì liên quan đến tiền của bạn.</p>
                  {res.length ? (
                    <ul className="res-list">
                      {res.map(r => (
                        <li key={r.url}><a href={r.url} target="_blank" rel="noopener"><span className="ic"><ILink /></span><span><strong>{r.title}</strong>{r.note && <span>{r.note}</span>}</span></a></li>
                      ))}
                    </ul>
                  ) : <p className="empty">Bài này chưa có nguồn tham khảo.</p>}
                </div>
              </section>

              <section className="panel notes" role="tabpanel" id="panel-ghi-chu" aria-labelledby="tab-ghi-chu" hidden={tab !== 'ghi-chu'}>
                <NotesPanel id={info.id} num={num} />
              </section>
            </>
          )}

          <div className="learn-foot"><div className="in">
            {prev && <Link className="btn btn-ghost btn-sm" to={lessonUrl(prev.id)} title={`Bài trước: ${prev.title}`}><ILeft /><span className="t">Bài trước</span></Link>}
            <span className="pos">Bài {idx + 1}/{flat.length}</span>
            <span className="spacer" />
            {done ? (
              <>
                <span className="pill done-pill"><ICheck />Đã hoàn thành</span>
                {next
                  ? <Link className="btn btn-dark btn-sm" to={lessonUrl(next.id)}><span className="t">Bài tiếp theo</span><IRight /></Link>
                  : <Link className="btn btn-dark btn-sm" to="/chung-nhan">Nhận chứng nhận</Link>}
              </>
            ) : (
              <>
                <button className="btn btn-brand btn-sm" type="button" onClick={complete}><ICheck /><span className="t-long">{next ? 'Hoàn thành và học tiếp' : 'Hoàn thành khóa học'}</span><span className="t-short">Hoàn thành</span></button>
                {next && <Link className="btn btn-ghost btn-sm" to={lessonUrl(next.id)} title={`Bài tiếp: ${next.title}`}><span className="t">Bỏ qua</span><IRight /></Link>}
              </>
            )}
          </div></div>
        </main>
        <Sidebar info={info} open={sideOpen} onClose={() => setSideOpen(false)} />
      </div>
    </div>
  );
}
