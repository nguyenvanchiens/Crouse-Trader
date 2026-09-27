// Công cụ tính tương tác. Dùng ở trang Công cụ và nhúng trong bài học (block type 'tool').
import { useEffect, useId, useState } from 'react';
import { toolPrefs } from '../lib/store.js';

// Đọc số kiểu Việt Nam lẫn kiểu quốc tế: "80.000" | "80000" | "0,5" | "0.5"
export function num(v) {
  if (typeof v === 'number') return v;
  let s = String(v ?? '').trim().replace(/\s/g, '');
  if (!s) return NaN;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  return Number(s);
}
export const f = (n, d = 2) => (Number.isFinite(n) ? n.toLocaleString('vi-VN', { maximumFractionDigits: d, minimumFractionDigits: 0 }) : '—');
const pct = (n, d = 2) => (Number.isFinite(n) ? `${f(n, d)}%` : '—');

function usePrefs(name, defaults) {
  const [v, setV] = useState(() => toolPrefs.get(name, defaults));
  useEffect(() => { toolPrefs.set(name, v); }, [name, v]);
  return [v, (k, val) => setV(o => ({ ...o, [k]: val })), () => setV(defaults)];
}

function Field({ label, value, onChange, suffix, hint, wide }) {
  const id = useId();
  return (
    <label className={`field${wide ? ' wide' : ''}`} htmlFor={id}>
      <span className="field-l">{label}</span>
      <span className="field-in">
        <input id={id} type="text" inputMode="decimal" value={value} onChange={e => onChange(e.target.value)} autoComplete="off" />
        {suffix && <span className="sfx">{suffix}</span>}
      </span>
      {hint && <span className="field-h">{hint}</span>}
    </label>
  );
}

function Seg({ label, value, options, onChange }) {
  return (
    <div className="field seg-field" role="group" aria-label={label}>
      <span className="field-l">{label}</span>
      <span className="seg">
        {options.map(([k, t]) => (
          <button key={k} type="button" aria-pressed={value === k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>{t}</button>
        ))}
      </span>
    </div>
  );
}

function Out({ label, value, tone, big, note }) {
  return (
    <div className={`out${big ? ' big' : ''}${tone ? ` t-${tone}` : ''}`}>
      <span className="out-l">{label}</span>
      <span className="out-v">{value}</span>
      {note && <span className="out-n">{note}</span>}
    </div>
  );
}

function Shell({ title, desc, children, results, warn, onReset }) {
  return (
    <div className="tool">
      <div className="tool-head">
        <div><h3>{title}</h3>{desc && <p>{desc}</p>}</div>
        {onReset && <button type="button" className="link-btn" onClick={onReset}>Đặt lại</button>}
      </div>
      <div className="tool-body">
        <div className="tool-in">{children}</div>
        <div className="tool-out" aria-live="polite">
          {results}
          {warn && warn.length > 0 && <ul className="tool-warn">{warn.map((w, i) => <li key={i}>{w}</li>)}</ul>}
        </div>
      </div>
    </div>
  );
}

// ---------- Khối lượng lệnh ----------
export function PositionSize() {
  const [v, set, reset] = usePrefs('position-size', { acc: '1000', risk: '1', entry: '80000', stop: '78400', fee: '0,05', lev: '5', mmr: '0,5' });
  const acc = num(v.acc), rp = num(v.risk) / 100, E = num(v.entry), S = num(v.stop), fee = num(v.fee) / 100, L = num(v.lev), mmr = num(v.mmr) / 100;
  const long = S < E;
  const R = acc * rp;
  const dist = Math.abs(E - S);
  const size = R / (dist + (E + S) * (fee || 0));
  const notional = size * E;
  const realLev = notional / acc;
  const margin = notional / L;
  const liq = long ? E * (1 - 1 / L + mmr) : E * (1 + 1 / L - mmr);
  const valid = acc > 0 && rp > 0 && E > 0 && S > 0 && dist > 0;
  const warn = [];
  if (valid) {
    if (rp > 0.02) warn.push('Rủi ro trên 2% mỗi lệnh: một chuỗi 10 lệnh thua sẽ lấy đi hơn 18% tài khoản.');
    if (L > 0 && (long ? liq >= S : liq <= S)) warn.push('Giá thanh lý nằm TRƯỚC dừng lỗ: bạn sẽ bị thanh lý trước khi dừng lỗ kịp chạy. Giảm đòn bẩy.');
    else if (L > 0 && Math.abs(liq - S) < dist) warn.push('Giá thanh lý khá gần dừng lỗ. Nên chọn đòn bẩy thấp hơn để có khoảng an toàn.');
    if (margin > acc) warn.push('Ký quỹ cần lớn hơn vốn tài khoản: tăng đòn bẩy hoặc giảm khối lượng không phải là giải pháp, hãy xem lại khoảng dừng lỗ.');
    if (realLev > 3) warn.push(`Đòn bẩy thật ${f(realLev, 1)}x: dừng lỗ rất gần giá vào nên khối lượng phình lớn. Kiểm tra lại trượt giá.`);
  }
  return (
    <Shell title="Khối lượng lệnh theo rủi ro" onReset={reset}
      desc="Đặt dừng lỗ trước, rồi để con số rủi ro quyết định khối lượng. Dùng được cho cả spot và futures."
      warn={warn}
      results={valid ? (
        <>
          <Out big label={`Khối lượng ${long ? 'long' : 'short'}`} value={`${f(size, 6)} coin`} note={`Giá trị vị thế ${f(notional)} USDT`} />
          <Out label="Số tiền chấp nhận mất (1R)" value={`${f(R)} USDT`} tone="stop" />
          <Out label="Khoảng cách dừng lỗ" value={pct((dist / E) * 100)} />
          <Out label="Đòn bẩy thật" value={`${f(realLev, 2)}x`} note="Giá trị vị thế ÷ vốn tài khoản" />
          <Out label={`Ký quỹ cần ở ${f(L, 0)}x`} value={`${f(margin)} USDT`} />
          <Out label="Giá thanh lý gần đúng (isolated)" value={f(liq, 2)} tone={warn.some(w => w.includes('TRƯỚC')) ? 'stop' : undefined} />
        </>
      ) : <p className="tool-empty">Nhập vốn, % rủi ro, giá vào và giá dừng lỗ khác nhau để xem kết quả.</p>}>
      <Field label="Vốn tài khoản" value={v.acc} onChange={x => set('acc', x)} suffix="USDT" />
      <Field label="Rủi ro mỗi lệnh" value={v.risk} onChange={x => set('risk', x)} suffix="%" hint="Khuyến nghị 0,5–1%" />
      <Field label="Giá vào" value={v.entry} onChange={x => set('entry', x)} />
      <Field label="Giá dừng lỗ" value={v.stop} onChange={x => set('stop', x)} hint="Thấp hơn giá vào: long. Cao hơn: short." />
      <Field label="Phí mỗi chiều" value={v.fee} onChange={x => set('fee', x)} suffix="%" hint="Giả định, kiểm tra biểu phí sàn" />
      <Field label="Đòn bẩy đặt trên sàn" value={v.lev} onChange={x => set('lev', x)} suffix="x" />
      <Field label="Ký quỹ duy trì" value={v.mmr} onChange={x => set('mmr', x)} suffix="%" hint="Tra bảng bậc ký quỹ của sàn" />
    </Shell>
  );
}

// ---------- Giá thanh lý ----------
export function Liquidation() {
  const [v, set, reset] = usePrefs('liquidation', { side: 'long', entry: '80000', lev: '10', mmr: '0,5', stop: '77600' });
  const E = num(v.entry), L = num(v.lev), mmr = num(v.mmr) / 100, S = num(v.stop);
  const long = v.side === 'long';
  const liq = long ? E * (1 - 1 / L + mmr) : E * (1 + 1 / L - mmr);
  const dLiq = Math.abs(E - liq) / E * 100;
  const dStop = Number.isFinite(S) && S > 0 ? Math.abs(E - S) / E * 100 : NaN;
  const valid = E > 0 && L >= 1;
  const bad = Number.isFinite(dStop) && (long ? liq >= S : liq <= S);
  const warn = [];
  if (valid && bad) warn.push('Dừng lỗ nằm sau giá thanh lý. Vị thế sẽ bị thanh lý trước. Giảm đòn bẩy hoặc thêm ký quỹ.');
  else if (valid && Number.isFinite(dStop) && dLiq < dStop * 2) warn.push('Giá thanh lý chưa cách dừng lỗ đủ xa (nên xa gấp 2 lần trở lên), biến động mạnh có thể làm mark price nhảy qua.');
  return (
    <Shell title="Giá thanh lý gần đúng" onReset={reset}
      desc="Công thức gần đúng cho chế độ isolated, bỏ qua phí và số tiền duy trì của bậc. Giá sàn hiển thị mới là con số cuối cùng."
      warn={warn}
      results={valid ? (
        <>
          <Out big label="Giá thanh lý" value={f(liq, 2)} tone="stop" note={`Giá đi ngược ${pct(dLiq)} là mất ký quỹ của lệnh`} />
          {Number.isFinite(dStop) && <Out label="Khoảng cách tới dừng lỗ" value={pct(dStop)} />}
          {Number.isFinite(dStop) && <Out label="Thanh lý xa hơn dừng lỗ" value={bad ? 'Không' : `${f(dLiq / dStop, 1)} lần`} tone={bad ? 'stop' : dLiq >= dStop * 2 ? 'target' : undefined} />}
          <Out label="Công thức" value={long ? 'Giá vào × (1 − 1/đòn bẩy + MMR)' : 'Giá vào × (1 + 1/đòn bẩy − MMR)'} />
        </>
      ) : <p className="tool-empty">Nhập giá vào và đòn bẩy từ 1x trở lên.</p>}>
      <Seg label="Hướng lệnh" value={v.side} onChange={x => set('side', x)} options={[['long', 'Long'], ['short', 'Short']]} />
      <Field label="Giá vào" value={v.entry} onChange={x => set('entry', x)} />
      <Field label="Đòn bẩy" value={v.lev} onChange={x => set('lev', x)} suffix="x" />
      <Field label="Ký quỹ duy trì (MMR)" value={v.mmr} onChange={x => set('mmr', x)} suffix="%" />
      <Field label="Giá dừng lỗ dự kiến" value={v.stop} onChange={x => set('stop', x)} hint="Để kiểm tra dừng lỗ có chạy trước thanh lý không" />
    </Shell>
  );
}

// ---------- R:R và tỷ lệ thắng hoà vốn ----------
export function RiskReward() {
  const [v, set, reset] = usePrefs('rr', { entry: '80000', stop: '78400', target: '83200', fee: '0,05' });
  const E = num(v.entry), S = num(v.stop), T = num(v.target), fee = (num(v.fee) || 0) / 100;
  const long = S < E;
  const risk = Math.abs(E - S), reward = long ? T - E : E - T;
  const cost = E * fee * 2;
  const rr = reward / risk;
  const be = risk / (risk + reward) * 100;
  const beFee = (risk + cost) / (risk + reward) * 100;
  const valid = E > 0 && S > 0 && T > 0 && risk > 0 && reward > 0;
  return (
    <Shell title="Tỷ lệ R:R và tỷ lệ thắng hoà vốn" onReset={reset}
      desc="Lệnh có R:R càng cao thì bạn cần thắng càng ít lần để không lỗ. Phí làm tỷ lệ này tăng lên."
      warn={valid && rr < 1.5 ? ['R:R dưới 1,5: cần tỷ lệ thắng rất cao mới có lãi sau phí. Cân nhắc bỏ lệnh hoặc tìm điểm vào tốt hơn.'] : []}
      results={valid ? (
        <>
          <Out big label="R:R" value={`1 : ${f(rr, 2)}`} note={`Rủi ro ${f(risk)} · lợi nhuận ${f(reward)} mỗi coin`} />
          <Out label="Tỷ lệ thắng hoà vốn (chưa tính phí)" value={pct(be, 1)} />
          <Out label="Tỷ lệ thắng hoà vốn (có phí vào + ra)" value={pct(beFee, 1)} tone="stop" />
        </>
      ) : <p className="tool-empty">Mục tiêu phải nằm cùng phía lợi nhuận so với giá vào (long: trên giá vào, short: dưới giá vào).</p>}>
      <Field label="Giá vào" value={v.entry} onChange={x => set('entry', x)} />
      <Field label="Giá dừng lỗ" value={v.stop} onChange={x => set('stop', x)} />
      <Field label="Giá chốt lời" value={v.target} onChange={x => set('target', x)} />
      <Field label="Phí mỗi chiều" value={v.fee} onChange={x => set('fee', x)} suffix="%" />
    </Shell>
  );
}

// Xác suất có ít nhất một chuỗi thua dài >= k trong n lệnh
function streakProb(n, k, pLoss) {
  let dp = new Array(k).fill(0); dp[0] = 1;
  let hit = 0;
  for (let i = 0; i < n; i++) {
    const nx = new Array(k).fill(0);
    for (let j = 0; j < k; j++) {
      nx[0] += dp[j] * (1 - pLoss);
      if (j + 1 >= k) hit += dp[j] * pLoss; else nx[j + 1] += dp[j] * pLoss;
    }
    dp = nx;
  }
  return hit;
}

// ---------- Kỳ vọng ----------
export function Expectancy() {
  const [v, set, reset] = usePrefs('expectancy', { wr: '45', win: '2', loss: '1', n: '100', risk: '1' });
  const p = num(v.wr) / 100, W = num(v.win), Lr = num(v.loss), n = Math.round(num(v.n)), r = num(v.risk) / 100;
  const E = p * W - (1 - p) * Lr;
  const valid = p > 0 && p < 1 && W > 0 && Lr > 0 && n > 0;
  const s5 = valid ? streakProb(n, 5, 1 - p) : NaN;
  const s8 = valid ? streakProb(n, 8, 1 - p) : NaN;
  return (
    <Shell title="Kỳ vọng của hệ thống" onReset={reset}
      desc="Kỳ vọng dương là điều kiện cần. Chuỗi thua liên tiếp vẫn sẽ đến, hãy biết trước nó dài cỡ nào."
      warn={valid && E <= 0 ? ['Kỳ vọng âm hoặc bằng 0: giao dịch càng nhiều càng mất tiền. Không có cách quản lý vốn nào sửa được điều này.'] : []}
      results={valid ? (
        <>
          <Out big label="Kỳ vọng mỗi lệnh" value={`${E >= 0 ? '+' : ''}${f(E, 2)}R`} tone={E > 0 ? 'target' : 'stop'} />
          <Out label={`Sau ${n} lệnh (ước tính)`} value={`${E >= 0 ? '+' : ''}${f(E * n, 1)}R`} note={`≈ ${f(E * n * r * 100, 1)}% tài khoản nếu rủi ro ${f(r * 100, 2)}%/lệnh, chưa tính lãi kép`} />
          <Out label="Xác suất gặp chuỗi ≥ 5 lệnh thua" value={pct(s5 * 100, 0)} />
          <Out label="Xác suất gặp chuỗi ≥ 8 lệnh thua" value={pct(s8 * 100, 0)} />
        </>
      ) : <p className="tool-empty">Tỷ lệ thắng trong khoảng 1–99%, R thắng và R thua lớn hơn 0.</p>}>
      <Field label="Tỷ lệ thắng" value={v.wr} onChange={x => set('wr', x)} suffix="%" />
      <Field label="Lãi trung bình khi thắng" value={v.win} onChange={x => set('win', x)} suffix="R" />
      <Field label="Lỗ trung bình khi thua" value={v.loss} onChange={x => set('loss', x)} suffix="R" hint="Thường là 1R nếu bạn tôn trọng dừng lỗ" />
      <Field label="Số lệnh" value={v.n} onChange={x => set('n', x)} />
      <Field label="Rủi ro mỗi lệnh" value={v.risk} onChange={x => set('risk', x)} suffix="%" />
    </Shell>
  );
}

// ---------- Drawdown ----------
export function Drawdown() {
  const [v, set, reset] = usePrefs('drawdown', { loss: '30', risk: '2', streak: '10' });
  const l = num(v.loss) / 100, r = num(v.risk) / 100, k = Math.round(num(v.streak));
  const need = l / (1 - l) * 100;
  const left = Math.pow(1 - r, k) * 100;
  return (
    <Shell title="Toán học của thua lỗ" onReset={reset}
      desc="Lỗ và lãi không đối xứng. Mức lỗ càng sâu thì càng cần lãi nhiều hơn để quay về vốn."
      results={(
        <>
          <Out big label={`Lỗ ${pct(l * 100, 1)} cần lãi`} value={l > 0 && l < 1 ? pct(need, 1) : '—'} tone="stop" />
          <Out label={`Sau ${k} lệnh thua liên tiếp, rủi ro ${pct(r * 100, 1)}/lệnh`} value={r > 0 && r < 1 && k >= 0 ? `còn ${pct(left, 1)} vốn` : '—'} />
          <Out label="Để hồi phục lại" value={r > 0 && r < 1 && k >= 0 ? `cần lãi ${pct((100 / left - 1) * 100, 1)}` : '—'} />
        </>
      )}>
      <Field label="Mức lỗ tài khoản" value={v.loss} onChange={x => set('loss', x)} suffix="%" />
      <Field label="Rủi ro mỗi lệnh" value={v.risk} onChange={x => set('risk', x)} suffix="%" />
      <Field label="Số lệnh thua liên tiếp" value={v.streak} onChange={x => set('streak', x)} />
    </Shell>
  );
}

// ---------- DCA ----------
export function DcaTool() {
  const [v, set, reset] = usePrefs('dca', { rows: [['80000', '100'], ['74000', '100'], ['70000', '100'], ['76000', '100']], now: '82000' });
  const rows = v.rows.map(([p, a]) => [num(p), num(a)]).filter(([p, a]) => p > 0 && a > 0);
  const spent = rows.reduce((s, [, a]) => s + a, 0);
  const coins = rows.reduce((s, [p, a]) => s + a / p, 0);
  const avg = spent / coins;
  const now = num(v.now);
  const value = coins * now;
  const setRow = (i, j, x) => set('rows', v.rows.map((r, k) => (k === i ? (j === 0 ? [x, r[1]] : [r[0], x]) : r)));
  return (
    <Shell title="Giá vốn trung bình khi mua nhiều lần" onReset={reset}
      desc="Mỗi dòng là một lần mua: giá và số tiền bỏ ra."
      results={rows.length ? (
        <>
          <Out big label="Giá vốn trung bình" value={f(avg, 2)} note={`${f(coins, 6)} coin với ${f(spent)} USDT`} />
          {now > 0 && <Out label="Giá trị hiện tại" value={`${f(value)} USDT`} />}
          {now > 0 && <Out label="Lãi/lỗ" value={`${value >= spent ? '+' : ''}${pct((value / spent - 1) * 100)}`} tone={value >= spent ? 'target' : 'stop'} />}
        </>
      ) : <p className="tool-empty">Thêm ít nhất một lần mua có giá và số tiền lớn hơn 0.</p>}>
      <div className="dca-rows">
        {v.rows.map((r, i) => (
          <div className="dca-row" key={i}>
            <Field label={`Lần ${i + 1}: giá`} value={r[0]} onChange={x => setRow(i, 0, x)} />
            <Field label="Số tiền" value={r[1]} onChange={x => setRow(i, 1, x)} suffix="USDT" />
            <button type="button" className="icon-x" aria-label={`Xoá lần mua ${i + 1}`} onClick={() => set('rows', v.rows.filter((_, k) => k !== i))}>×</button>
          </div>
        ))}
        <button type="button" className="link-btn" onClick={() => set('rows', [...v.rows, ['', '100']])}>Thêm lần mua</button>
      </div>
      <Field label="Giá hiện tại" value={v.now} onChange={x => set('now', x)} />
    </Shell>
  );
}

// ---------- Funding ----------
export function FundingTool() {
  const [v, set, reset] = usePrefs('funding', { side: 'long', notional: '10000', rate: '0,01', days: '30', per: '3' });
  const N = num(v.notional), rate = num(v.rate) / 100, d = num(v.days), per = num(v.per);
  const times = d * per;
  const flow = N * rate * times;
  const pays = (v.side === 'long') === (rate > 0);
  const valid = N > 0 && d > 0 && per > 0 && Number.isFinite(rate);
  return (
    <Shell title="Chi phí funding khi giữ vị thế" onReset={reset}
      desc="Funding trả giữa bên long và short tại mỗi mốc (Binance mặc định 3 lần/ngày). Giả định funding giữ nguyên, thực tế thay đổi liên tục."
      results={valid ? (
        <>
          <Out big label={pays ? 'Bạn trả' : 'Bạn nhận'} value={`${f(Math.abs(flow))} USDT`} tone={pays ? 'stop' : 'target'} note={`${f(times, 0)} lần tính funding`} />
          <Out label="Tương đương mỗi năm" value={pct(Math.abs(rate) * per * 365 * 100, 1)} note="trên giá trị danh nghĩa" />
        </>
      ) : <p className="tool-empty">Nhập giá trị vị thế, funding và số ngày giữ lệnh.</p>}>
      <Seg label="Vị thế" value={v.side} onChange={x => set('side', x)} options={[['long', 'Long'], ['short', 'Short']]} />
      <Field label="Giá trị danh nghĩa" value={v.notional} onChange={x => set('notional', x)} suffix="USDT" />
      <Field label="Funding mỗi kỳ" value={v.rate} onChange={x => set('rate', x)} suffix="%" hint="Dương: long trả short. Âm: short trả long." />
      <Field label="Số ngày giữ" value={v.days} onChange={x => set('days', x)} />
      <Field label="Số kỳ mỗi ngày" value={v.per} onChange={x => set('per', x)} />
    </Shell>
  );
}

// ---------- Lập lệnh theo vốn (lệnh nhỏ và ràng buộc tối thiểu của sàn) ----------
const PAIRS = [['btc', 'BTC', 85], ['eth', 'ETH', 20], ['alt', 'SOL/BNB/XRP/DOGE', 5], ['custom', 'Khác', null]];
export function OrderPlan() {
  const [v, set, reset] = usePrefs('order-plan', { acc: '200', risk: '1', pair: 'eth', min: '20', entry: '3000', stop: '2955', margin: '10', feeIn: 'maker', mmr: '0,5' });
  const pair = PAIRS.find(p => p[0] === v.pair) || PAIRS[1];
  const minN = pair[2] ?? num(v.min);
  const acc = num(v.acc), R = acc * num(v.risk) / 100, E = num(v.entry), S = num(v.stop), M = num(v.margin), mmr = num(v.mmr) / 100;
  const long = S < E;
  const s = Math.abs(E - S) / E;
  const feeRT = (v.feeIn === 'maker' ? 0.0002 : 0.0005) + 0.0005;
  const want = R / (s + feeRT);
  const notional = Math.max(want, minN);
  const risk = notional * (s + feeRT);
  const lev = notional / M;
  const levMax = 1 / (3 * s + mmr);
  const liqL = Math.ceil(lev);
  const liq = long ? E * (1 - 1 / liqL + mmr) : E * (1 + 1 / liqL - mmr);
  const feeShare = feeRT / s * 100;
  const beWr = (1 + feeRT / s) / 3 * 100;
  const maxStop = (R / minN - feeRT) * 100;
  const valid = acc > 0 && R > 0 && E > 0 && S > 0 && s > 0 && M > 0 && minN > 0;
  const warn = [];
  if (valid) {
    if (want < minN) warn.push(`Khối lượng theo rủi ro (${f(want)} USDT) nhỏ hơn mức tối thiểu của sàn (${f(minN)} USDT). Lệnh buộc phải lớn hơn, rủi ro thật tăng lên ${f(risk, 2)} USDT = ${f(risk / acc * 100, 2)}% tài khoản. Hãy dời dừng lỗ gần hơn (nếu cấu trúc cho phép) hoặc chọn cặp có mức tối thiểu thấp hơn, hoặc bỏ lệnh.`);
    if (feeShare > 15) warn.push(`Phí vào + ra chiếm ${f(feeShare, 0)}% số tiền rủi ro. Dừng lỗ quá sát so với phí: dùng khung lớn hơn hoặc vào lệnh bằng limit.`);
    if (lev > levMax) warn.push(`Với ký quỹ ${f(M)} USDT bạn cần ${f(lev, 1)}x, cao hơn mức an toàn ${f(levMax, 1)}x (thanh lý cách xa ≥ 3 lần dừng lỗ). Tăng ký quỹ của lệnh, không phải tăng rủi ro.`);
    if (lev > 20) warn.push('Tài khoản futures mở dưới 30 ngày trên Binance không dùng được đòn bẩy trên 20x (quy định từ 07/12/2025).');
    if (risk / acc > 0.02) warn.push('Rủi ro thật trên 2% tài khoản: vốn quá nhỏ cho cặp và khoảng dừng lỗ này.');
  }
  return (
    <Shell title="Lập lệnh theo vốn" onReset={reset}
      desc="Dành cho lệnh nhỏ: bắt đầu từ số tiền chấp nhận mất, kiểm tra mức tối thiểu của sàn và phí, rồi mới ra đòn bẩy. Mức tối thiểu và phí lấy theo Binance ngày 27/09/2026."
      warn={warn}
      results={valid ? (
        <>
          <Out big label="Giá trị lệnh (danh nghĩa)" value={`${f(notional)} USDT`} note={`${f(notional / E, 4)} coin, ${long ? 'long' : 'short'}`} />
          <Out label="Rủi ro thật nếu chạm dừng lỗ, gồm phí" value={`${f(risk, 2)} USDT (${f(risk / acc * 100, 2)}%)`} tone="stop" />
          <Out label={`Đòn bẩy cần với ký quỹ ${f(M)} USDT`} value={`${f(lev, 1)}x`} tone={lev > levMax ? 'stop' : undefined} />
          <Out label="Đòn bẩy an toàn tối đa" value={`${f(levMax, 1)}x`} note="Để giá thanh lý cách xa ít nhất 3 lần khoảng dừng lỗ" />
          <Out label={`Giá thanh lý gần đúng ở ${liqL}x`} value={f(liq, 2)} />
          <Out label="Phí vào + ra chiếm" value={`${f(feeShare, 1)}% của R`} tone={feeShare > 15 ? 'stop' : 'target'} />
          <Out label="Tỷ lệ thắng hoà vốn nếu R:R = 1:2" value={`${f(beWr, 1)}%`} />
          <Out label="Dừng lỗ xa nhất cho phép với mức tối thiểu của sàn" value={maxStop > 0 ? `${f(maxStop, 2)}%` : 'Không có: R nhỏ hơn phí'} />
        </>
      ) : <p className="tool-empty">Nhập vốn, % rủi ro, giá vào, dừng lỗ và ký quỹ muốn bỏ cho lệnh.</p>}>
      <Field label="Vốn tài khoản futures" value={v.acc} onChange={x => set('acc', x)} suffix="USDT" />
      <Field label="Rủi ro mỗi lệnh" value={v.risk} onChange={x => set('risk', x)} suffix="%" />
      <div className="field wide seg-field" role="group" aria-label="Cặp giao dịch"><span className="field-l">Cặp (giá trị lệnh tối thiểu)</span>
        <span className="seg wrap">{PAIRS.map(([k, t, m]) => <button key={k} type="button" aria-pressed={v.pair === k} className={v.pair === k ? 'on' : ''} onClick={() => set('pair', k)}>{t}{m ? ` ≥${m}` : ''}</button>)}</span>
      </div>
      {v.pair === 'custom' && <Field label="Giá trị lệnh tối thiểu" value={v.min} onChange={x => set('min', x)} suffix="USDT" />}
      <Field label="Giá vào" value={v.entry} onChange={x => set('entry', x)} />
      <Field label="Giá dừng lỗ" value={v.stop} onChange={x => set('stop', x)} hint="Đặt theo cấu trúc biểu đồ trước" />
      <Field label="Ký quỹ muốn bỏ vào lệnh" value={v.margin} onChange={x => set('margin', x)} suffix="USDT" />
      <Seg label="Vào lệnh bằng" value={v.feeIn} onChange={x => set('feeIn', x)} options={[['maker', 'Limit (0,02%)'], ['taker', 'Market (0,05%)']]} />
      <Field label="Ký quỹ duy trì (MMR)" value={v.mmr} onChange={x => set('mmr', x)} suffix="%" />
    </Shell>
  );
}

export const TOOLS = {
  'order-plan': { C: OrderPlan, title: 'Lập lệnh theo vốn', desc: 'Lệnh nhỏ 10–20 USDT: mức tối thiểu của sàn, phí theo R, đòn bẩy cần và đòn bẩy an toàn.' },
  'position-size': { C: PositionSize, title: 'Khối lượng lệnh', desc: 'Tính khối lượng từ % rủi ro và khoảng dừng lỗ, kèm đòn bẩy thật và giá thanh lý.' },
  liquidation: { C: Liquidation, title: 'Giá thanh lý', desc: 'Ước tính giá thanh lý isolated và kiểm tra dừng lỗ có chạy trước không.' },
  rr: { C: RiskReward, title: 'R:R và hoà vốn', desc: 'Tỷ lệ lợi nhuận trên rủi ro và tỷ lệ thắng tối thiểu, có tính phí.' },
  expectancy: { C: Expectancy, title: 'Kỳ vọng', desc: 'Hệ thống có lãi về dài hạn không, và chuỗi thua dài cỡ nào.' },
  drawdown: { C: Drawdown, title: 'Drawdown', desc: 'Lỗ bao nhiêu thì cần lãi bao nhiêu để quay về vốn.' },
  dca: { C: DcaTool, title: 'Giá vốn DCA', desc: 'Giá vốn trung bình sau nhiều lần mua.' },
  funding: { C: FundingTool, title: 'Chi phí funding', desc: 'Tiền funding trả hoặc nhận khi giữ lệnh futures nhiều ngày.' }
};

export function ToolBlock({ name, note }) {
  const t = TOOLS[name];
  if (!t) return null;
  return (
    <div className="tool-embed">
      <t.C />
      {note && <p className="tool-note" dangerouslySetInnerHTML={{ __html: note }} />}
    </div>
  );
}
