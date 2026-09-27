import fs from 'node:fs';
import { run } from './backtest.mjs';
const base = run();
const rs = base.trades.map(t => t.r);
console.log('== Cùng 455 lệnh, đổi % rủi ro mỗi lệnh ==');
for (const k of [0.005, 0.01, 0.02, 0.05, 0.1]) {
  let e = 1, pk = 1, dd = 0; for (const r of rs) { e *= 1 + k * r; pk = Math.max(pk, e); dd = Math.max(dd, 1 - e / pk); }
  console.log(`rủi ro ${k * 100}%: vốn cuối ${(e * 100).toFixed(0)}% vốn đầu, sụt giảm tối đa ${(dd * 100).toFixed(0)}%`);
}

// Donchian D1 kiểu Turtle: vào khi đóng cửa vượt đỉnh/đáy 55 ngày, dừng lỗ 2 ATR(20), thoát khi thủng đáy/đỉnh 20 ngày.
// Rủi ro 1%, phí taker 0,05% + trượt 0,02% mỗi chiều, funding lịch sử thật. Không tối ưu tham số (dùng tham số kinh điển).
function atr(b, n) { const o = []; let v = NaN, s = 0; b.forEach((x, i) => { const pc = i ? b[i - 1][4] : x[1]; const tr = Math.max(x[2] - x[3], Math.abs(x[2] - pc), Math.abs(x[3] - pc)); if (i < n) { s += tr; o.push(i === n - 1 ? (v = s / n) : NaN); } else { v = (v * (n - 1) + tr) / n; o.push(v); } }); return o; }
const cost = 0.0005 + 0.0002;
const all = [];
for (const sym of ['BTCUSDT', 'ETHUSDT', 'SOLUSDT']) {
  const { d1, fund } = JSON.parse(fs.readFileSync(`data/${sym}.json`));
  const a = atr(d1, 20);
  let pos = null;
  for (let i = 56; i < d1.length; i++) {
    const [, , h, l, c, ct] = d1[i];
    if (pos) {
      const dir = pos.dir;
      for (const f of fund) if (f[0] > pos.lastF && f[0] <= ct) { pos.fund += dir * pos.qty * c * f[1]; pos.lastF = f[0]; }
      const hi20 = Math.max(...d1.slice(i - 20, i).map(x => x[2])), lo20 = Math.min(...d1.slice(i - 20, i).map(x => x[3]));
      let px = null;
      if (dir === 1 && l <= pos.stop) px = pos.stop; else if (dir === -1 && h >= pos.stop) px = pos.stop;
      else if (dir === 1 && c < lo20) px = c; else if (dir === -1 && c > hi20) px = c;
      if (px !== null) {
        const pnl = dir * (px - pos.entry) * pos.qty - pos.qty * (pos.entry + px) * cost - pos.fund;
        all.push({ sym, t: pos.t, r: pnl / pos.risk, dir }); pos = null;
      }
      continue;
    }
    const hi55 = Math.max(...d1.slice(i - 55, i).map(x => x[2])), lo55 = Math.min(...d1.slice(i - 55, i).map(x => x[3]));
    const dir = c > hi55 ? 1 : c < lo55 ? -1 : 0;
    if (dir && a[i] > 0) { const stop = c - dir * 2 * a[i]; pos = { dir, entry: c, stop, qty: 1 / (2 * a[i]), risk: 1, t: ct, fund: 0, lastF: ct }; }
  }
}
all.sort((x, y) => x.t - y.t);
const sum = a => a.reduce((x, y) => x + y, 0);
const rep = (name, a) => { const w = a.filter(x => x.r > 0); console.log(`${name}: ${a.length} lệnh, thắng ${(w.length / a.length * 100).toFixed(0)}%, kỳ vọng ${(sum(a.map(x => x.r)) / a.length).toFixed(3)}R, tổng ${sum(a.map(x => x.r)).toFixed(1)}R, PF ${(sum(w.map(x => x.r)) / -sum(a.filter(x => x.r <= 0).map(x => x.r))).toFixed(2)}`); };
console.log('\n== Donchian 55/20 trên D1 (tham chiếu, tham số kinh điển, không tối ưu) ==');
rep('Cả 3 mã', all);
for (const s of ['BTCUSDT', 'ETHUSDT', 'SOLUSDT']) rep(s, all.filter(x => x.sym === s));
rep('2020–2023', all.filter(x => x.t < Date.UTC(2024, 0, 1)));
rep('2024–2026', all.filter(x => x.t >= Date.UTC(2024, 0, 1)));
rep('Chỉ long', all.filter(x => x.dir === 1)); rep('Chỉ short', all.filter(x => x.dir === -1));
