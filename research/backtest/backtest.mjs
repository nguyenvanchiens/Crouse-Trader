// Backtest hệ thống mẫu "Hồi về EMA theo xu hướng D1" (bài 7.1), đúng từng quy tắc có thể lập trình được.
// Dữ liệu: nến D1/H4 và funding lịch sử từ API công khai Binance USDⓈ-M Futures (download.mjs).
// Chạy: node backtest.mjs
import fs from 'node:fs';

const DEF = {
  symbols: ['BTCUSDT', 'ETHUSDT'],
  risk: 0.01, maxOpen: 2,
  taker: 0.0005, maker: 0.0002, slip: 0.0002,
  fundingSkip: 0.0005,
  sides: ['long', 'short'],
  pauseAfterLosses: 3, pauseHours: 48, monthlyDD: 0.06,
  from: 0, to: Infinity,
  randomEntry: false, seed: 1
};

const ema = (a, n) => { const k = 2 / (n + 1); const o = new Array(a.length).fill(NaN); let e = 0; for (let i = 0; i < a.length; i++) { if (i < n - 1) { e += a[i]; continue; } if (i === n - 1) { e = (e + a[i]) / n; o[i] = e; continue; } e = a[i] * k + e * (1 - k); o[i] = e; } return o; };
const atr = (b, n) => { const o = new Array(b.length).fill(NaN); let s = 0, v = NaN; for (let i = 0; i < b.length; i++) { const [, , h, l] = b[i]; const pc = i ? b[i - 1][4] : b[i][1]; const tr = Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc)); if (i < n) { s += tr; if (i === n - 1) { v = s / n; o[i] = v; } continue; } v = (v * (n - 1) + tr) / n; o[i] = v; } return o; };

// Xu hướng D1: +1 long, -1 short, 0 đứng ngoài. Đỉnh/đáy xác nhận bằng 2 nến mỗi bên (quy ước chương 2).
function dailyTrend(d1) {
  const c = d1.map(x => x[4]), e20 = ema(c, 20), e50 = ema(c, 50);
  const lows = [], highs = [], trend = new Array(d1.length).fill(0);
  for (let k = 0; k < d1.length; k++) {
    const p = k - 2;
    if (p >= 2) {
      const l = d1[p][3], h = d1[p][2];
      if (l < d1[p - 1][3] && l < d1[p - 2][3] && l < d1[p + 1][3] && l < d1[p + 2][3]) lows.push([p, l]);
      if (h > d1[p - 1][2] && h > d1[p - 2][2] && h > d1[p + 1][2] && h > d1[p + 2][2]) highs.push([p, h]);
    }
    if (!(e50[k] > 0)) continue;
    const L = lows.slice(-2), H = highs.slice(-2);
    const upStruct = L.length === 2 && L[1][1] > L[0][1] && !c.slice(L[1][0], k + 1).some(x => x < L[1][1]);
    const dnStruct = H.length === 2 && H[1][1] < H[0][1] && !c.slice(H[1][0], k + 1).some(x => x > H[1][1]);
    if (c[k] > e50[k] && e20[k] > e50[k] && upStruct) trend[k] = 1;
    else if (c[k] < e50[k] && e20[k] < e50[k] && dnStruct) trend[k] = -1;
  }
  return trend;
}

function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

// Sinh tín hiệu vào lệnh cho một mã theo Phần 3–5
function signals(sym, D, cfg) {
  const { d1, h4, fund } = D;
  const trend = dailyTrend(d1);
  const c = h4.map(x => x[4]), e20 = ema(c, 20), e50 = ema(c, 50), a14 = atr(h4, 14);
  let di = -1; const tr4 = h4.map(b => { while (di + 1 < d1.length && d1[di + 1][5] <= b[5]) di++; return di >= 0 ? trend[di] : 0; });
  let fi = -1; const lastFund = h4.map(b => { while (fi + 1 < fund.length && fund[fi + 1][0] <= b[5]) fi++; return fi >= 0 ? fund[fi][1] : 0; });
  const out = [];
  const R = rng(cfg.seed + sym.length * 97);
  for (const side of cfg.sides) {
    const dir = side === 'long' ? 1 : -1;
    let armed = null;
    for (let j = 60; j < h4.length; j++) {
      const [, , h, l, cl] = h4[j];
      if (!(e50[j] > 0 && a14[j] > 0)) continue;
      if (tr4[j] !== dir) { armed = null; continue; }
      const top = Math.max(e20[j], e50[j]), bot = Math.min(e20[j], e50[j]);
      if (cfg.randomEntry) {
        if (R() < 0.012) {
          const lo = dir === 1 ? Math.min(...h4.slice(j - 5, j + 1).map(x => x[3])) : Math.max(...h4.slice(j - 5, j + 1).map(x => x[2]));
          out.push({ sym, side, j, t: h4[j][5], price: cl, ext: lo, atr: a14[j], fund: lastFund[j] });
        }
        continue;
      }
      if (!armed) {
        const touched = dir === 1 ? l <= top : h >= bot;
        const cameFrom = h4.slice(Math.max(0, j - 10), j).some((b, k) => dir === 1 ? b[4] > Math.max(e20[j - 10 + k] || 0, e50[j - 10 + k] || 0) : b[4] < Math.min(e20[j - 10 + k] || Infinity, e50[j - 10 + k] || Infinity));
        if (touched && cameFrom) {
          const seg = h4.slice(Math.max(0, j - 10), j + 1);
          const k0 = dir === 1 ? seg.reduce((m, b, k) => (b[2] > seg[m][2] ? k : m), 0) : seg.reduce((m, b, k) => (b[3] < seg[m][3] ? k : m), 0);
          armed = { touch: j, start: Math.max(0, j - 10) + k0, below: 0 };
        }
        continue;
      }
      // Đang chờ tín hiệu
      const beyond = dir === 1 ? cl < e50[j] : cl > e50[j];
      armed.below = beyond ? armed.below + 1 : 0;
      if (armed.below >= 3 || j - armed.touch > 6) { armed = null; continue; }
      const sig = dir === 1 ? cl > h4[j - 1][2] : cl < h4[j - 1][3];
      if (sig) {
        const seg = h4.slice(armed.start, j + 1);
        const ext = dir === 1 ? Math.min(...seg.map(b => b[3])) : Math.max(...seg.map(b => b[2]));
        out.push({ sym, side, j, t: h4[j][5], price: cl, ext, atr: a14[j], fund: lastFund[j] });
        armed = null;
      }
    }
  }
  return out;
}

export function run(cfg0 = {}) {
  const cfg = { ...DEF, ...cfg0 };
  const data = Object.fromEntries(cfg.symbols.map(s => [s, JSON.parse(fs.readFileSync(new URL(`./data/${s}.json`, import.meta.url)))]));
  const extra = Object.fromEntries(cfg.symbols.map(s => { const h4 = data[s].h4; return [s, { a22: atr(h4, 22) }]; }));
  const sigs = cfg.symbols.flatMap(s => signals(s, data[s], cfg)).filter(x => x.t >= cfg.from && x.t < cfg.to).sort((a, b) => a.t - b.t);

  let equity = 10000, peakMonth = 10000, month = '', blockedMonth = '', pauseUntil = 0, streak = 0;
  const open = [], trades = [], curve = [];
  const stats = { signals: sigs.length, skipAtr: 0, skipFunding: 0, skipOpen: 0, skipPause: 0, skipMonth: 0 };

  // Quản lý một lệnh từ nến sau nến vào đến khi đóng (Phần 7). Trả về kết quả.
  function simulate(p) {
    const { h4, fund } = data[p.sym]; const { a22 } = extra[p.sym];
    const dir = p.side === 'long' ? 1 : -1;
    let stop = p.stop, qty = p.qty, tp1 = false, fees = p.qty * p.entry * cfg.taker, pnl = 0, fundCost = 0, best = p.entry;
    let fk = fund.findIndex(f => f[0] > p.t);
    for (let j = p.j + 1; j < h4.length; j++) {
      const [ot, , h, l, cl, ct] = h4[j];
      while (fk >= 0 && fk < fund.length && fund[fk][0] <= ct) { fundCost += dir * qty * cl * fund[fk][1]; fk++; }
      best = dir === 1 ? Math.max(best, h) : Math.min(best, l);
      const hitStop = dir === 1 ? l <= stop : h >= stop;
      if (hitStop) {
        const px = stop * (1 - dir * cfg.slip);
        pnl += dir * (px - p.entry) * qty; fees += qty * px * cfg.taker;
        return { exitT: ct, exitJ: j, pnl, fees, fundCost, how: tp1 ? 'trail' : 'stop' };
      }
      const t1 = p.entry + dir * 2 * p.dist;
      if (!tp1 && (dir === 1 ? h >= t1 : l <= t1)) {
        const q = qty / 2; pnl += dir * (t1 - p.entry) * q; fees += q * t1 * cfg.maker; qty -= q; tp1 = true;
        stop = p.entry * (1 + dir * (cfg.taker * 2));
      }
      if (tp1 && j >= 22) {
        const w = h4.slice(j - 21, j + 1);
        const ch = dir === 1 ? Math.max(...w.map(b => b[2])) - 3 * a22[j] : Math.min(...w.map(b => b[3])) + 3 * a22[j];
        stop = dir === 1 ? Math.max(stop, ch) : Math.min(stop, ch);
      }
      if (!tp1 && j - p.j >= 12 && (dir === 1 ? best < p.entry + p.dist : best > p.entry - p.dist)) {
        const px = cl * (1 - dir * cfg.slip);
        pnl += dir * (px - p.entry) * qty; fees += qty * px * cfg.taker;
        return { exitT: ct, exitJ: j, pnl, fees, fundCost, how: 'time' };
      }
    }
    const last = h4[h4.length - 1];
    pnl += dir * (last[4] - p.entry) * qty;
    return { exitT: last[5], exitJ: h4.length - 1, pnl, fees, fundCost, how: 'open' };
  }

  const closeUntil = t => {
    open.sort((a, b) => a.res.exitT - b.res.exitT);
    while (open.length && open[0].res.exitT <= t) {
      const p = open.shift(); const net = p.res.pnl - p.res.fees - p.res.fundCost;
      equity += net;
      const r = net / p.riskUsd;
      trades.push({ sym: p.sym, side: p.side, t: p.t, exitT: p.res.exitT, r, gross: p.res.pnl / p.riskUsd, feeR: p.res.fees / p.riskUsd, fundR: p.res.fundCost / p.riskUsd, how: p.res.how, eq: equity });
      streak = r < 0 ? streak + 1 : 0;
      if (streak >= cfg.pauseAfterLosses) { pauseUntil = p.res.exitT + cfg.pauseHours * 3600e3; streak = 0; }
      const m = new Date(p.res.exitT).toISOString().slice(0, 7);
      if (m !== month) { month = m; peakMonth = equity; }
      peakMonth = Math.max(peakMonth, equity);
      if (equity < peakMonth * (1 - cfg.monthlyDD)) blockedMonth = m;
      curve.push([p.res.exitT, equity]);
    }
  };

  for (const s of sigs) {
    closeUntil(s.t);
    const m = new Date(s.t).toISOString().slice(0, 7);
    if (m !== month) { month = m; peakMonth = equity; }
    const dir = s.side === 'long' ? 1 : -1;
    const entry = s.price * (1 + dir * cfg.slip);
    const stop = s.ext - dir * 0.5 * s.atr;
    const dist = dir * (entry - stop);
    if (!(dist > 0) || dist > 3 * s.atr) { stats.skipAtr++; continue; }
    if (dir * s.fund >= cfg.fundingSkip) { stats.skipFunding++; continue; }
    if (s.t < pauseUntil) { stats.skipPause++; continue; }
    if (blockedMonth === m) { stats.skipMonth++; continue; }
    if (open.length >= cfg.maxOpen || open.some(o => o.sym === s.sym)) { stats.skipOpen++; continue; }
    const riskUsd = equity * cfg.risk;
    const p = { ...s, entry, stop, dist, qty: riskUsd / dist, riskUsd };
    p.res = simulate(p);
    open.push(p);
  }
  closeUntil(Infinity);
  return { cfg, trades, curve, stats, equity };
}

export function summarize(res) {
  const T = res.trades, n = T.length;
  if (!n) return { n: 0 };
  const rs = T.map(t => t.r), wins = rs.filter(r => r > 0), losses = rs.filter(r => r <= 0);
  const sum = a => a.reduce((x, y) => x + y, 0);
  let pk = 10000, mdd = 0; for (const [, e] of res.curve) { pk = Math.max(pk, e); mdd = Math.max(mdd, 1 - e / pk); }
  let s = 0, worst = 0; for (const r of rs) { s = r < 0 ? s + 1 : 0; worst = Math.max(worst, s); }
  const years = (T.at(-1).exitT - T[0].t) / (365.25 * 864e5);
  return {
    n, perYear: +(n / years).toFixed(1),
    winRate: +(wins.length / n * 100).toFixed(1),
    expR: +(sum(rs) / n).toFixed(3),
    totalR: +sum(rs).toFixed(1),
    pf: +(sum(wins) / -sum(losses)).toFixed(2),
    avgWin: +(sum(wins) / wins.length).toFixed(2), avgLoss: +(sum(losses) / losses.length).toFixed(2),
    feeR: +(sum(T.map(t => t.feeR)) / n).toFixed(3), fundR: +(sum(T.map(t => t.fundR)) / n).toFixed(3),
    maxDD: +(mdd * 100).toFixed(1), worstStreak: worst,
    finalEq: Math.round(res.equity), cagr: +((Math.pow(res.equity / 10000, 1 / years) - 1) * 100).toFixed(1),
    exits: T.reduce((o, t) => ((o[t.how] = (o[t.how] || 0) + 1), o), {})
  };
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}` || process.argv[1].endsWith('backtest.mjs')) {
  const base = run();
  console.log('THAM SỐ GỐC (BTC+ETH, long+short, 2020-01 → 2026-09)');
  console.log(summarize(base));
  console.log('Bộ lọc:', base.stats);
}
