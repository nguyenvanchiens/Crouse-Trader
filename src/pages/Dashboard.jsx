import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { C, flat, LESSONS, BRAND, lessonInfo, lessonUrl, lessonNum, trackMinutes, fmtMin, COURSE_TITLE } from '../lib/course.js';
import { progress, learner, notes, journal, useStore } from '../lib/store.js';
import { useUI } from '../lib/ui.jsx';
import { Html, Ring } from '../components/Visuals.jsx';
import { rOf } from './Journal.jsx';
import { f } from '../components/Tools.jsx';

export default function Dashboard() {
  useStore();
  const { toast } = useUI();
  const me = learner.get();
  const [name, setName] = useState((me && me.name) || '');
  useEffect(() => { document.title = `Học của tôi | ${BRAND}`; }, []);

  const total = progress.total();
  const pct = progress.pct();
  const quiz = progress.quiz();
  const qVals = Object.values(quiz);
  const qPct = qVals.length ? Math.round(qVals.reduce((s, q) => s + q.score, 0) / qVals.reduce((s, q) => s + q.total, 0) * 100) : null;
  const minsDone = flat.filter(l => progress.isDone(l.id)).reduce((s, l) => s + (LESSONS[l.id] ? LESSONS[l.id].duration : 0), 0);

  const last = progress.last() && lessonInfo(progress.last());
  const nxt = last && !progress.isDone(last.id) ? last : progress.next();
  const doneAll = !progress.next();
  const ns = notes.all();
  const noteLessons = flat.filter(l => ns[l.id]);
  const quizLessons = flat.filter(l => quiz[l.id]);
  const trades = journal.all();
  const rs = trades.map(rOf).filter(Number.isFinite);
  const exp = rs.length ? rs.reduce((a, b) => a + b, 0) / rs.length : NaN;

  function saveName(e) {
    e.preventDefault();
    learner.setName(name);
    toast('Đã lưu tên');
  }
  function reset() {
    if (!confirm('Xoá toàn bộ tiến độ, điểm kiểm tra, ghi chú và checklist trên trình duyệt này? Nhật ký lệnh được giữ lại.')) return;
    progress.reset();
    toast('Đã xoá tiến độ học');
  }

  return (
    <main id="main" className="page">
      <div className="wrap">
        <header className="page-head dash-head">
          <div>
            <h1>{me && me.name ? `Chào ${me.name}` : 'Học của tôi'}</h1>
            <p>{COURSE_TITLE}{me && me.since ? `. Bắt đầu ngày ${new Date(me.since).toLocaleDateString('vi-VN')}` : ''}</p>
          </div>
          <dl className="dash-stats">
            <div><dt>Hoàn thành</dt><dd>{pct}%</dd></div>
            <div><dt>Bài đã học</dt><dd>{total}/{flat.length}</dd></div>
            <div><dt>Thời gian</dt><dd>{fmtMin(minsDone)}</dd></div>
            <div><dt>Điểm kiểm tra</dt><dd>{qPct === null ? '—' : `${qPct}%`}</dd></div>
          </dl>
        </header>

        <div className="dash-grid">
          <div>
            {nxt ? (
              <Link className="continue-card" to={lessonUrl(nxt.id)} style={{ '--c': nxt.track.tone }}>
                <span className="cc-no" aria-hidden="true">{lessonNum(nxt)}</span>
                <span className="cc-body">
                  <span className="k">{total ? 'Học tiếp' : 'Bắt đầu'}: chương {nxt.track.no}, {nxt.track.title}</span>
                  <strong>{nxt.title}</strong>
                  {LESSONS[nxt.id] && <Html as="span" className="cc-sum" html={LESSONS[nxt.id].summary} />}
                </span>
              </Link>
            ) : (
              <div className="continue-card" style={{ '--c': 'var(--plan)' }}>
                <span className="cc-no" aria-hidden="true">{flat.length}</span>
                <span className="cc-body"><span className="k">Chúc mừng</span><strong>Bạn đã học xong cả khóa</strong><span className="cc-sum">Chứng nhận hoàn thành đã sẵn sàng. Bước tiếp theo là lộ trình kiểm chứng ở bài 7.4.</span></span>
              </div>
            )}

            <section className="dash-sec" aria-labelledby="chap-h">
              <h2 id="chap-h">Tiến độ theo chương</h2>
              <div className="chapter-rows">
                {C.map(t => {
                  const ids = t.lessons.map(l => l.id);
                  const d = progress.count(ids);
                  const first = t.lessons.find(l => !progress.isDone(l.id)) || t.lessons[0];
                  return (
                    <div className="chapter-row" key={t.id} style={{ '--c': t.tone }}>
                      <span className="cr-no" aria-hidden="true">{t.no}</span>
                      <div>
                        <h3>{t.title}</h3>
                        <div className="bar" role="img" aria-label={`Đã học ${d}/${ids.length} bài`}><i style={{ width: `${d / ids.length * 100}%` }} /></div>
                        <div className="meta">{d}/{ids.length} bài, {fmtMin(trackMinutes(t))}</div>
                      </div>
                      <Link className="btn btn-ghost btn-sm" to={lessonUrl(first.id)}>{d === 0 ? 'Bắt đầu' : d === ids.length ? 'Ôn lại' : 'Tiếp tục'}</Link>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="dash-sec" aria-labelledby="notes-h">
              <h2 id="notes-h">Ghi chú của bạn</h2>
              {noteLessons.length ? (
                <div className="note-cards">
                  {noteLessons.map(l => (
                    <Link key={l.id} className="note-card" to={lessonUrl(l.id, 'ghi-chu')}>
                      <span className="k">Bài {lessonNum(l)}</span>
                      <strong>{l.title}</strong>
                      <span className="txt">{ns[l.id].slice(0, 280)}{ns[l.id].length > 280 ? '...' : ''}</span>
                    </Link>
                  ))}
                </div>
              ) : <p className="empty">Chưa có ghi chú nào. Mở tab Ghi chú trong bất kỳ bài nào để ghi lại quy tắc bạn rút ra.</p>}
            </section>
          </div>

          <aside className="dash-side">
            <div className="side-card">
              <h2>Nhật ký lệnh</h2>
              {rs.length ? (
                <p><strong>{rs.length}</strong> lệnh đã ghi, kỳ vọng <strong className={exp > 0 ? 't-target' : 't-stop'}>{exp > 0 ? '+' : ''}{f(exp, 2)}R</strong> mỗi lệnh.</p>
              ) : <p>Chưa có lệnh nào. Ghi cả lệnh demo để có dữ liệu thật về cách bạn giao dịch.</p>}
              <Link className="btn btn-ghost btn-sm" to="/nhat-ky">Mở nhật ký</Link>
            </div>

            <div className="side-card">
              <h2>Chứng nhận</h2>
              {doneAll
                ? <Link className="btn btn-brand btn-block" to="/chung-nhan">Xem và in chứng nhận</Link>
                : <div className="cert-prog"><Ring pct={pct} size={44} stroke={5} /><p>Hoàn thành cả {flat.length} bài để nhận chứng nhận có tên bạn. Còn {flat.length - total} bài.</p></div>}
            </div>

            <div className="side-card">
              <h2>Điểm kiểm tra</h2>
              {quizLessons.length ? (
                <ul className="score-list">
                  {quizLessons.map(l => {
                    const q = quiz[l.id];
                    return <li key={l.id}><Link to={lessonUrl(l.id, 'kiem-tra')}>{lessonNum(l)} {l.title}</Link><b className={q.score === q.total ? 't-target' : ''}>{q.score}/{q.total}</b></li>;
                  })}
                </ul>
              ) : <p>Chưa làm bài kiểm tra nào. Mỗi bài có 4 câu ở tab Kiểm tra.</p>}
            </div>

            <div className="side-card">
              <h2>Tên trên chứng nhận</h2>
              <form className="name-form" onSubmit={saveName}>
                <label className="visually-hidden" htmlFor="name-in">Tên của bạn</label>
                <input id="name-in" value={name} onChange={e => setName(e.target.value)} maxLength={60} placeholder="Nhập tên của bạn" autoComplete="name" />
                <button className="btn btn-dark btn-sm" type="submit">Lưu tên</button>
              </form>
              <p className="reset-line"><button className="link-btn" type="button" onClick={reset}>Xoá tiến độ học trên trình duyệt này</button></p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
