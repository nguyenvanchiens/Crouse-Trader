import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND, lessonUrl } from '../lib/course.js';
import { journal, useStore } from '../lib/store.js';
import { useUI } from '../lib/ui.jsx';
import { num, f } from '../components/Tools.jsx';
import { IDownload, IPlus, ITrash } from '../components/Icons.jsx';

const SETUPS = ['Pullback theo xu hướng', 'Breakout-retest', 'Đảo chiều tại vùng lớn', 'DCA', 'Khác (ngoài kế hoạch)'];
const EMOTIONS = ['Bình tĩnh', 'Tự tin', 'Sợ lỡ cơ hội (FOMO)', 'Muốn gỡ lỗ', 'Sợ hãi', 'Chán, trade cho có'];

const today = () => new Date().toISOString().slice(0, 10);
const blank = () => ({ date: today(), pair: 'BTCUSDT', side: 'long', setup: SETUPS[0], entry: '', stop: '', exit: '', emotion: EMOTIONS[0], followed: 'yes', note: '' });

// R của một lệnh: lãi/lỗ theo giá chia cho khoảng dừng lỗ ban đầu
export function rOf(t) {
  const E = num(t.entry), S = num(t.stop), X = num(t.exit);
  if (!(E > 0 && S > 0 && X > 0) || E === S) return NaN;
  const risk = Math.abs(E - S);
  return (t.side === 'long' ? X - E : E - X) / risk;
}

function stats(list) {
  const rs = list.map(rOf).filter(Number.isFinite);
  const n = rs.length;
  const wins = rs.filter(r => r > 0), losses = rs.filter(r => r <= 0);
  const sumW = wins.reduce((a, b) => a + b, 0), sumL = -losses.reduce((a, b) => a + b, 0);
  let eq = 0, peak = 0, mdd = 0;
  [...rs].reverse().forEach(r => { eq += r; peak = Math.max(peak, eq); mdd = Math.max(mdd, peak - eq); });
  const followed = list.filter(t => t.followed === 'yes').length;
  const rOk = list.filter(t => t.followed === 'yes').map(rOf).filter(Number.isFinite);
  const rNo = list.filter(t => t.followed !== 'yes').map(rOf).filter(Number.isFinite);
  const avg = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
  return {
    n,
    wr: n ? wins.length / n * 100 : NaN,
    exp: avg(rs),
    total: rs.reduce((a, b) => a + b, 0),
    pf: sumL ? sumW / sumL : NaN,
    avgW: avg(wins), avgL: avg(losses),
    mdd,
    follow: list.length ? followed / list.length * 100 : NaN,
    rOk: avg(rOk), rNo: avg(rNo)
  };
}

function toCsv(list) {
  const head = ['Ngày', 'Cặp', 'Hướng', 'Setup', 'Giá vào', 'Dừng lỗ', 'Giá thoát', 'R', 'Cảm xúc', 'Đúng quy tắc', 'Ghi chú'];
  const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = list.map(t => [t.date, t.pair, t.side, t.setup, t.entry, t.stop, t.exit, Number.isFinite(rOf(t)) ? rOf(t).toFixed(2) : '', t.emotion, t.followed === 'yes' ? 'Có' : 'Không', t.note]);
  return '﻿' + [head, ...rows].map(r => r.map(esc).join(',')).join('\n');
}

export default function Journal() {
  useStore();
  const { toast } = useUI();
  const list = journal.all();
  const [form, setForm] = useState(blank);
  const set = (k, v) => setForm(o => ({ ...o, [k]: v }));
  const s = useMemo(() => stats(list), [list]);
  const preview = rOf(form);

  useEffect(() => { document.title = `Nhật ký lệnh | ${BRAND}`; }, []);

  function submit(e) {
    e.preventDefault();
    if (!Number.isFinite(rOf(form))) { toast('Cần giá vào, dừng lỗ và giá thoát hợp lệ'); return; }
    journal.add(form);
    setForm(o => ({ ...blank(), pair: o.pair, setup: o.setup }));
    toast('Đã ghi lệnh vào nhật ký');
  }

  function exportCsv() {
    const blob = new Blob([toCsv(list)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `nhat-ky-lenh-${today()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const R = v => (Number.isFinite(v) ? `${v > 0 ? '+' : ''}${f(v, 2)}R` : '—');

  return (
    <main id="main" className="page">
      <div className="wrap">
        <header className="page-head">
          <h1>Nhật ký lệnh</h1>
          <p>Ghi mỗi lệnh bằng R: lãi lỗ chia cho rủi ro ban đầu. Cách đo này không phụ thuộc số vốn, nên bạn so sánh được lệnh hôm nay với lệnh ba tháng trước. Dữ liệu chỉ lưu trên trình duyệt này; xuất CSV định kỳ để giữ lại. Cách đọc các chỉ số ở <Link className="text-link" to={lessonUrl('c6-b5')}>bài 6.5</Link>.</p>
        </header>

        <section className="j-stats" aria-label="Thống kê">
          <div className="stat"><span>Số lệnh</span><strong>{s.n}</strong></div>
          <div className="stat"><span>Tỷ lệ thắng</span><strong>{Number.isFinite(s.wr) ? `${f(s.wr, 1)}%` : '—'}</strong></div>
          <div className={`stat ${s.exp > 0 ? 't-target' : s.exp < 0 ? 't-stop' : ''}`}><span>Kỳ vọng mỗi lệnh</span><strong>{R(s.exp)}</strong></div>
          <div className="stat"><span>Tổng</span><strong>{R(s.total)}</strong></div>
          <div className="stat"><span>Profit factor</span><strong>{Number.isFinite(s.pf) ? f(s.pf, 2) : '—'}</strong></div>
          <div className="stat"><span>Sụt giảm tối đa</span><strong>{s.n ? `−${f(s.mdd, 2)}R` : '—'}</strong></div>
          <div className="stat"><span>Đúng quy tắc</span><strong>{Number.isFinite(s.follow) ? `${f(s.follow, 0)}%` : '—'}</strong></div>
          <div className="stat wide"><span>R trung bình: lệnh đúng quy tắc / lệnh phá quy tắc</span><strong>{R(s.rOk)} / {R(s.rNo)}</strong></div>
        </section>
        {s.n > 0 && s.n < 30 && <p className="j-hint">Mới có {s.n} lệnh. Dưới 30 lệnh, các chỉ số trên dao động rất mạnh và chưa nói được nhiều về hệ thống của bạn.</p>}

        <div className="j-grid">
          <form className="j-form" onSubmit={submit} aria-labelledby="jf-h">
            <h2 id="jf-h">Ghi lệnh mới</h2>
            <div className="j-fields">
              <label className="field"><span className="field-l">Ngày</span><span className="field-in"><input type="date" value={form.date} onChange={e => set('date', e.target.value)} /></span></label>
              <label className="field"><span className="field-l">Cặp</span><span className="field-in"><input value={form.pair} onChange={e => set('pair', e.target.value.toUpperCase())} maxLength={20} /></span></label>
              <div className="field seg-field" role="group" aria-label="Hướng lệnh"><span className="field-l">Hướng</span>
                <span className="seg">{[['long', 'Long'], ['short', 'Short']].map(([k, t]) => <button key={k} type="button" aria-pressed={form.side === k} className={form.side === k ? 'on' : ''} onClick={() => set('side', k)}>{t}</button>)}</span>
              </div>
              <label className="field"><span className="field-l">Setup</span><span className="field-in"><select value={form.setup} onChange={e => set('setup', e.target.value)}>{SETUPS.map(x => <option key={x}>{x}</option>)}</select></span></label>
              <label className="field"><span className="field-l">Giá vào</span><span className="field-in"><input inputMode="decimal" value={form.entry} onChange={e => set('entry', e.target.value)} /></span></label>
              <label className="field"><span className="field-l">Dừng lỗ ban đầu</span><span className="field-in"><input inputMode="decimal" value={form.stop} onChange={e => set('stop', e.target.value)} /></span></label>
              <label className="field"><span className="field-l">Giá thoát</span><span className="field-in"><input inputMode="decimal" value={form.exit} onChange={e => set('exit', e.target.value)} /></span></label>
              <label className="field"><span className="field-l">Cảm xúc khi vào lệnh</span><span className="field-in"><select value={form.emotion} onChange={e => set('emotion', e.target.value)}>{EMOTIONS.map(x => <option key={x}>{x}</option>)}</select></span></label>
              <div className="field seg-field" role="group" aria-label="Đúng quy tắc"><span className="field-l">Làm đúng quy tắc?</span>
                <span className="seg">{[['yes', 'Có'], ['no', 'Không']].map(([k, t]) => <button key={k} type="button" aria-pressed={form.followed === k} className={form.followed === k ? 'on' : ''} onClick={() => set('followed', k)}>{t}</button>)}</span>
              </div>
              <label className="field wide"><span className="field-l">Ghi chú: lý do vào, điều học được</span><span className="field-in"><textarea rows="3" value={form.note} onChange={e => set('note', e.target.value)} /></span></label>
            </div>
            <div className="j-submit">
              <span className={`j-preview ${preview > 0 ? 't-target' : preview < 0 ? 't-stop' : ''}`}>Kết quả: <strong>{R(preview)}</strong></span>
              <button className="btn btn-brand" type="submit"><IPlus />Ghi vào nhật ký</button>
            </div>
          </form>

          <section className="j-list" aria-labelledby="jl-h">
            <div className="j-list-head">
              <h2 id="jl-h">Các lệnh đã ghi</h2>
              {list.length > 0 && <button type="button" className="btn btn-ghost btn-sm" onClick={exportCsv}><IDownload />Xuất CSV</button>}
            </div>
            {list.length === 0 ? (
              <p className="empty">Chưa có lệnh nào. Ghi lệnh đầu tiên, kể cả lệnh trên tài khoản demo, để bắt đầu có dữ liệu thật về chính bạn.</p>
            ) : (
              <div className="table-wrap"><table className="j-table">
                <thead><tr><th scope="col">Ngày</th><th scope="col">Lệnh</th><th scope="col">Setup</th><th scope="col">R</th><th scope="col">Quy tắc</th><th scope="col"><span className="visually-hidden">Xoá</span></th></tr></thead>
                <tbody>
                  {list.map(t => {
                    const r = rOf(t);
                    return (
                      <tr key={t.id}>
                        <td>{t.date.split('-').reverse().join('/')}</td>
                        <td><strong>{t.pair}</strong> <span className={`side ${t.side}`}>{t.side === 'long' ? 'Long' : 'Short'}</span><small>{t.emotion}{t.note ? `. ${t.note}` : ''}</small></td>
                        <td>{t.setup}</td>
                        <td className={r > 0 ? 't-target' : 't-stop'}><strong>{R(r)}</strong></td>
                        <td>{t.followed === 'yes' ? 'Đúng' : <span className="t-stop">Phá</span>}</td>
                        <td><button type="button" className="icon-btn sm" aria-label={`Xoá lệnh ${t.pair} ngày ${t.date}`} onClick={() => { if (confirm('Xoá lệnh này khỏi nhật ký?')) journal.remove(t.id); }}><ITrash /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table></div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
