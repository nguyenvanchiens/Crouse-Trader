import fs from 'node:fs';
import { run, summarize } from './backtest.mjs';
const out = {};
const S = (cfg) => summarize(run(cfg));
const pick = s => ({ n: s.n, win: s.winRate, expR: s.expR, totalR: s.totalR, pf: s.pf, maxDD: s.maxDD, cagr: s.cagr });
const base = run();
out.goc = summarize(base);
// theo năm, mã, chiều
const by = (f) => { const g = {}; for (const t of base.trades) { const k = f(t); (g[k] ||= []).push(t.r); } return Object.fromEntries(Object.entries(g).map(([k, a]) => [k, { n: a.length, expR: +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(3), totalR: +a.reduce((x, y) => x + y, 0).toFixed(1), win: +(a.filter(r => r > 0).length / a.length * 100).toFixed(0) }])); };
out.theoNam = by(t => new Date(t.t).getUTCFullYear());
out.theoMa = by(t => t.sym);
out.theoChieu = by(t => t.side);
// biến thể
out.khongPhi = pick(S({ taker: 0, maker: 0, slip: 0, fundingSkip: 1 }));
out.chiLong = pick(S({ sides: ['long'] }));
out.chiShort = pick(S({ sides: ['short'] }));
out.inSample_2020_2023 = pick(S({ to: Date.UTC(2024, 0, 1) }));
out.outSample_2024_2026 = pick(S({ from: Date.UTC(2024, 0, 1) }));
out.SOL_ngoaiPhamVi = pick(S({ symbols: ['SOLUSDT'] }));
out.BTC_ETH_SOL = pick(S({ symbols: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'], maxOpen: 3 }));
// ngẫu nhiên: cùng lọc xu hướng D1, cùng cách thoát lệnh, điểm vào ngẫu nhiên
const rnd = [];
for (let s = 1; s <= 200; s++) { const r = summarize(run({ randomEntry: true, seed: s })); if (r.n) rnd.push(r.expR); }
rnd.sort((a, b) => a - b);
out.ngauNhien = { lan: rnd.length, expR_trungVi: rnd[100], p5: rnd[10], p95: rnd[190], tiLeNgauNhienTotHonGoc: +(rnd.filter(x => x >= out.goc.expR).length / rnd.length * 100).toFixed(0) + '%' };
// Mua và giữ để tham chiếu
for (const s of ['BTCUSDT', 'ETHUSDT']) { const d = JSON.parse(fs.readFileSync(`data/${s}.json`)); out['muaGiu_' + s] = ((d.d1.at(-1)[4] / d.d1[0][1] - 1) * 100).toFixed(0) + '%'; }
fs.writeFileSync('results.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
