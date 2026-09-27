// Kiểm tra hệ thống theo xu hướng khung ngày (Donchian/Turtle + bộ lọc SMA 200) theo quy trình tách dữ liệu.
// Thiết kế: BTC, ETH 2020–2023. Kiểm tra 1: BTC, ETH 2024–09/2026. Kiểm tra 2: 10 đồng chưa dùng.
// Chạy: node trend.mjs
import fs from 'node:fs';

const SPLIT = Date.UTC(2024, 0, 1);
const DESIGN = ['BTCUSDT', 'ETHUSDT'];
const HOLDOUT = ['BNBUSDT', 'XRPUSDT', 'DOGEUSDT', 'ADAUSDT', 'LINKUSDT', 'LTCUSDT', 'AVAXUSDT', 'DOTUSDT', 'TRXUSDT', 'BCHUSDT'];
const TAKER = 0.0005;
const slipOf = s => (DESIGN.includes(s) ? 0.0002 : 0.0005);
const cache = {};
const load = s => (cache[s] ||= JSON.parse(fs.readFileSync(new URL(`./data/${s}.json`, import.meta.url))));

const atrW = (b, n) => { const o = []; let v = NaN, s = 0; b.forEach((x, i) => { const pc = i ? b[i - 1][4] : x[1]; const tr = Math.max(x[2] - x[3], Math.abs(x[2] - pc), Math.abs(x[3] - pc)); if (i < n) { s += tr; o.push(i === n - 1 ? (v = s / n) : NaN); } else { v = (v * (n - 1) + tr) / n; o.push(v); } }); return o; };
const sma = (a, n) => { const o = []; let s = 0; a.forEach((x, i) => { s += x; if (i >= n) s -= a[i - n]; o.push(i >= n - 1 ? s / n : NaN); }); return o; };
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

// Mô phỏng một mã. p = { N, M, K, sides: 'both'|'long', filter: 'none'|'sma200' }
// opt.from/to: chỉ mở lệnh trong khoảng; opt.cut: dữ liệu bị cắt tại thời điểm này (đóng lệnh cưỡng bức)
export function simulate(sym, p, opt = {}) {
  const { d1: all, fund } = load(sym);
  const d1 = opt.cut ? all.filter(b => b[5] <= opt.cut) : all;
  const a = atrW(d1, 20), s200 = sma(d1.map(b => b[4]), 200);
  const slip = slipOf(sym), R = opt.random ? rng(opt.random) : null;
  const trades = [];
  let pos = null, fi = 0;
  const from = opt.from ?? 0, to = opt.to ?? Infinity;
  for (let i = Math.max(p.N, 200) + 1; i < d1.length; i++) {
    const [, o, h, l, c, ct] = d1[i];
    if (pos) {
      while (fi < fund.length && fund[fi][0] <= ct) { if (fund[fi][0] > pos.t) pos.fund += pos.dir * pos.qty * c * fund[fi][1]; fi++; }
      const lo = Math.min(...d1.slice(i - p.M, i).map(x => x[3])), hi = Math.max(...d1.slice(i - p.M, i).map(x => x[2]));
      let px = null;
      if (pos.dir === 1) { if (o <= pos.stop) px = o; else if (l <= pos.stop) px = pos.stop; else if (c < lo) px = c; }
      else { if (o >= pos.stop) px = o; else if (h >= pos.stop) px = pos.stop; else if (c > hi) px = c; }
      if (px === null && i === d1.length - 1) px = c;
      if (px !== null) {
        px *= 1 - pos.dir * slip;
        const pnl = pos.dir * (px - pos.entry) * pos.qty - pos.qty * (pos.entry + px) * TAKER - pos.fund;
        trades.push({ sym, dir: pos.dir, t: pos.t, exitT: ct, r: pnl / pos.risk, hold: (ct - pos.t) / 864e5 });
        pos = null;
      }
      continue;
    }
    if (ct < from || ct >= to || !(a[i] > 0)) continue;
    const hiN = Math.max(...d1.slice(i - p.N, i).map(x => x[2])), loN = Math.min(...d1.slice(i - p.N, i).map(x => x[3]));
    let dir = 0;
    if (R) { if (R() < opt.prob) dir = R() < 0.5 ? 1 : -1; }
    else dir = c > hiN ? 1 : c < loN ? -1 : 0;
    if (dir === -1 && p.sides === 'long') dir = 0;
    if (p.filter === 'sma200' && dir !== 0 && !(dir === 1 ? c > s200[i] : c < s200[i])) dir = 0;
    if (!dir) continue;
    const entry = c * (1 + dir * slip), dist = p.K * a[i];
    pos = { dir, entry, stop: entry - dir * dist, qty: 1 / dist, risk: 1, t: ct, fund: 0 };
    while (fi < fund.length && fund[fi][0] <= ct) fi++;
  }
  return trades;
}

export const stat = tr => {
  const n = tr.length; if (!n) return { n: 0, expR: 0, totalR: 0, win: 0, pf: 0 };
  const rs = tr.map(t => t.r), w = rs.filter(r => r > 0), sum = x => x.reduce((a, b) => a + b, 0);
  return { n, win: +(w.length / n * 100).toFixed(0), expR: +(sum(rs) / n).toFixed(3), totalR: +sum(rs).toFixed(1), pf: +(sum(w) / Math.max(1e-9, -sum(rs.filter(r => r <= 0)))).toFixed(2), medHold: Math.round(tr.map(t => t.hold).sort((a, b) => a - b)[Math.floor(n / 2)]) };
};

// Danh mục: rủi ro % vốn mỗi lệnh, tối đa maxOpen lệnh mở cùng lúc
export function portfolio(tr, risk = 0.01, maxOpen = 3) {
  const ev = [...tr].sort((a, b) => a.t - b.t);
  let eq = 1, pk = 1, dd = 0; const open = [];
  const settle = t => { open.sort((a, b) => a.exitT - b.exitT); while (open.length && open[0].exitT <= t) { const x = open.shift(); eq += x.r * x.riskAmt; pk = Math.max(pk, eq); dd = Math.max(dd, 1 - eq / pk); } };
  let taken = 0;
  for (const t of ev) { settle(t.t); if (open.length >= maxOpen) continue; open.push({ ...t, riskAmt: eq * risk }); taken++; }
  settle(Infinity);
  const yrs = (ev.at(-1).exitT - ev[0].t) / (365.25 * 864e5);
  return { taken, finalEq: +(eq * 100).toFixed(0) + '%', cagr: +((Math.pow(eq, 1 / yrs) - 1) * 100).toFixed(1), maxDD: +(dd * 100).toFixed(1) };
}

const grid = [];
for (const [N, Ms] of [[20, [10]], [55, [10, 20]], [100, [10, 20, 50]]]) for (const M of Ms) for (const K of [2, 3]) for (const sides of ['both', 'long']) for (const filter of ['none', 'sma200']) grid.push({ N, M, K, sides, filter });
const name = p => `N${p.N}/M${p.M}/K${p.K}/${p.sides}/${p.filter}`;

if (process.argv[1].endsWith('trend.mjs')) {
  // 1) Thiết kế: chỉ dữ liệu BTC, ETH trước 2024 (dữ liệu bị cắt, không nhìn thấy tương lai)
  const design = grid.map(p => ({ p, s: stat(DESIGN.flatMap(sym => simulate(sym, p, { cut: SPLIT }))) }));
  design.sort((a, b) => b.s.expR - a.s.expR);
  console.log('== THIẾT KẾ (BTC, ETH, 2020–2023): 10 biến thể tốt nhất / tổng', grid.length);
  design.slice(0, 10).forEach(d => console.log(name(d.p), JSON.stringify(d.s)));
  const exps = design.map(d => d.s.expR).sort((a, b) => a - b);
  console.log('Trung vị cả lưới:', exps[Math.floor(exps.length / 2)], ' Số biến thể dương:', exps.filter(x => x > 0).length + '/' + exps.length);
  const chosen = design.filter(d => d.s.n >= 25)[0].p;
  console.log('\n>>> CHỌN (kỳ vọng cao nhất, tối thiểu 25 lệnh):', name(chosen), '— từ đây không sửa tham số nữa');
  fs.writeFileSync('chosen.json', JSON.stringify(chosen));

  // 2) Kiểm tra 1: BTC, ETH từ 2024
  const t1 = DESIGN.flatMap(sym => simulate(sym, chosen, { from: SPLIT }));
  console.log('\n== KIỂM TRA 1 (BTC, ETH, 01/2024–09/2026):', JSON.stringify(stat(t1)));
  // 3) Kiểm tra 2: 10 đồng chưa dùng, cả giai đoạn và riêng từ 2024
  const t2 = HOLDOUT.flatMap(sym => simulate(sym, chosen));
  const t2b = t2.filter(t => t.t >= SPLIT);
  console.log('== KIỂM TRA 2 (10 đồng chưa dùng, 2020–2026):', JSON.stringify(stat(t2)));
  console.log('   riêng 2024–2026:', JSON.stringify(stat(t2b)));
  for (const s of HOLDOUT) { const x = stat(t2.filter(t => t.sym === s)); console.log('   ', s.padEnd(9), `n=${x.n} expR=${x.expR} tổng=${x.totalR}R`); }
  // Độ bền: cả lưới trên dữ liệu kiểm tra
  const gridTest = grid.map(p => stat([...DESIGN.flatMap(sym => simulate(sym, p, { from: SPLIT })), ...HOLDOUT.flatMap(sym => simulate(sym, p, { from: SPLIT }))]).expR).sort((a, b) => a - b);
  console.log('\n== Độ bền: cả', grid.length, 'biến thể trên toàn bộ dữ liệu kiểm tra 2024–2026 (12 mã): trung vị', gridTest[Math.floor(gridTest.length / 2)], ', số biến thể dương', gridTest.filter(x => x > 0).length + '/' + gridTest.length);

  // 4) So với ngẫu nhiên trên dữ liệu kiểm tra 2024–2026 (12 mã), cùng tần suất, cùng dừng lỗ và cách thoát
  const allTest = [...t1, ...t2b];
  const days = [...DESIGN, ...HOLDOUT].reduce((a, s) => a + load(s).d1.filter(b => b[5] >= SPLIT).length, 0);
  const prob = allTest.length / days * 1.6;
  const rnd = [];
  for (let k = 1; k <= 300; k++) rnd.push(stat([...DESIGN, ...HOLDOUT].flatMap((sym, j) => simulate(sym, chosen, { from: SPLIT, random: k * 131 + j, prob }))).expR);
  rnd.sort((a, b) => a - b);
  const e = stat(allTest).expR;
  console.log('\n== So với ngẫu nhiên (300 lần, dữ liệu kiểm tra 2024–2026, 12 mã): hệ thống', e, ' ngẫu nhiên trung vị', rnd[150], ' p95', rnd[285], ' tỷ lệ ngẫu nhiên ≥ hệ thống:', (rnd.filter(x => x >= e).length / 3).toFixed(1) + '%');

  // 5) Danh mục với rủi ro 1%, tối đa 3 lệnh mở
  console.log('\n== Danh mục rủi ro 1%/lệnh, tối đa 3 lệnh mở');
  console.log('   Kiểm tra 2024–2026 (12 mã):', JSON.stringify(portfolio(allTest)));
  console.log('   Toàn bộ 2020–2026 (12 mã):', JSON.stringify(portfolio([...DESIGN.flatMap(sym => simulate(sym, chosen)), ...t2])));
  for (const s of ['BTCUSDT', 'ETHUSDT']) { const d = load(s).d1.filter(b => b[5] >= SPLIT); console.log(`   Mua và giữ ${s} 2024–2026: ${((d.at(-1)[4] / d[0][1] - 1) * 100).toFixed(0)}%`); }
  fs.writeFileSync('trend-results.json', JSON.stringify({ chosen, design: design.slice(0, 10).map(d => ({ v: name(d.p), ...d.s })), test1: stat(t1), test2: stat(t2), test2from2024: stat(t2b), random: { system: e, median: rnd[150], p95: rnd[285] } }, null, 1));
}
