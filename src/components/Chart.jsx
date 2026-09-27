// Công cụ vẽ biểu đồ nến bằng SVG, dùng cho hình minh hoạ và hero.
// Dữ liệu nến được sinh có kiểm soát từ các "điểm mốc" giá để hình luôn đúng ý đồ sư phạm.

export function rng(seed = 1) {
  let s = (seed * 2654435761) >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

// way: [[chỉ số nến, giá đóng cửa mục tiêu], ...] tăng dần theo chỉ số.
// Trả về mảng nến { o, h, l, c, v } đi qua các mốc, có nhiễu và bóng nến.
export function walk(way, { seed = 7, noise = 0.5, wick = 0.6, vol = null } = {}) {
  const r = rng(seed);
  const span = Math.max(...way.map(w => w[1])) - Math.min(...way.map(w => w[1]));
  const unit = span / 40;
  const out = [];
  let prev = way[0][1];
  for (let k = 0; k < way.length - 1; k++) {
    const [i0, p0] = way[k];
    const [i1, p1] = way[k + 1];
    for (let i = i0; i < i1; i++) {
      const t = (i + 1 - i0) / (i1 - i0);
      const target = p0 + (p1 - p0) * t;
      const last = i === i1 - 1;
      const c = last ? p1 : target + (r() - 0.5) * unit * noise * 4;
      const o = prev;
      const body = Math.abs(c - o);
      const h = Math.max(o, c) + r() * (unit * wick + body * 0.25);
      const l = Math.min(o, c) - r() * (unit * wick + body * 0.25);
      const v = vol ? vol(i, r) : 0.4 + r() * 0.6;
      out.push({ o, h, l, c, v });
      prev = c;
    }
  }
  return out;
}

export function ema(values, n) {
  const k = 2 / (n + 1);
  const out = [];
  let e = values[0];
  values.forEach((v, i) => { e = i === 0 ? v : v * k + e * (1 - k); out.push(e); });
  return out;
}

export function rsi(closes, n = 14) {
  const out = [];
  let g = 0, lo = 0;
  closes.forEach((c, i) => {
    if (i === 0) { out.push(50); return; }
    const d = c - closes[i - 1];
    const up = Math.max(d, 0), dn = Math.max(-d, 0);
    if (i <= n) { g += up / n; lo += dn / n; }
    else { g = (g * (n - 1) + up) / n; lo = (lo * (n - 1) + dn) / n; }
    out.push(lo === 0 ? 100 : 100 - 100 / (1 + g / lo));
  });
  return out;
}

// Thang đo: chỉ số nến -> x, giá -> y
export function scale(candles, { x0 = 16, x1 = 480, y0 = 16, y1 = 240, lo, hi, padPct = 0.08 } = {}) {
  const mins = candles.map(c => c.l), maxs = candles.map(c => c.h);
  let a = lo ?? Math.min(...mins), b = hi ?? Math.max(...maxs);
  const pad = (b - a) * padPct;
  if (lo === undefined) a -= pad;
  if (hi === undefined) b += pad;
  const n = candles.length;
  const step = (x1 - x0) / n;
  return {
    step,
    bw: Math.max(2, step * 0.62),
    x: i => x0 + step * (i + 0.5),
    y: p => y1 - ((p - a) / (b - a)) * (y1 - y0),
    x0, x1, y0, y1, lo: a, hi: b
  };
}

export function Candles({ data, s, dim = null, hi = null }) {
  return (
    <g className="candles">
      {data.map((c, i) => {
        const up = c.c >= c.o;
        const faded = dim && (i < dim[0] || i > dim[1]);
        const strong = hi && i >= hi[0] && i <= hi[1];
        const yTop = s.y(Math.max(c.o, c.c));
        const yBot = s.y(Math.min(c.o, c.c));
        return (
          <g key={i} className={`cd ${up ? 'up' : 'down'}${faded ? ' faded' : ''}${strong ? ' strong' : ''}`} style={{ '--i': i }}>
            <line x1={s.x(i)} x2={s.x(i)} y1={s.y(c.h)} y2={s.y(c.l)} />
            <rect x={s.x(i) - s.bw / 2} y={yTop} width={s.bw} height={Math.max(1.2, yBot - yTop)} rx="0.8" />
          </g>
        );
      })}
    </g>
  );
}

// Đường ngang có nhãn (điểm vào, dừng lỗ, mục tiêu, vùng giá)
export function Level({ s, p, label, tone = 'level', from = null, to = null, side = 'right', dash = true }) {
  const xa = from === null ? s.x0 : s.x(from);
  const xb = to === null ? s.x1 : s.x(to);
  const y = s.y(p);
  return (
    <g className={`lvl t-${tone}`}>
      <line x1={xa} x2={xb} y1={y} y2={y} strokeDasharray={dash ? '5 4' : undefined} />
      {label && (
        <text x={side === 'right' ? xb - 4 : xa + 4} y={y - 6} textAnchor={side === 'right' ? 'end' : 'start'}>{label}</text>
      )}
    </g>
  );
}

// Dải vùng giá (hỗ trợ/kháng cự)
export function Zone({ s, a, b, label, tone = 'zone', from = null, to = null, side = 'left', below = false }) {
  const xa = from === null ? s.x0 : s.x(from);
  const xb = to === null ? s.x1 : s.x(to);
  const y1 = s.y(Math.max(a, b)), y2 = s.y(Math.min(a, b));
  return (
    <g className={`zone t-${tone}`}>
      <rect x={xa} y={y1} width={xb - xa} height={y2 - y1} rx="2" />
      {label && <text x={side === 'left' ? xa + 6 : xb - 6} y={below ? y2 + 15 : y1 - 6} textAnchor={side === 'left' ? 'start' : 'end'}>{label}</text>}
    </g>
  );
}

export function Line({ pts, cls = 'ln', dash }) {
  return <polyline className={cls} points={pts.map(p => p.join(',')).join(' ')} fill="none" strokeDasharray={dash} />;
}

// Nhãn chỉ vào một điểm: chấm + chữ
export function Mark({ x, y, label, dx = 0, dy = -12, anchor = 'middle', cls = '' }) {
  return (
    <g className={`mk ${cls}`}>
      <circle cx={x} cy={y} r="3.2" />
      <text x={x + dx} y={y + dy} textAnchor={anchor}>{label}</text>
    </g>
  );
}

export function Arrow({ x1, y1, x2, y2, cls = '' }) {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 7;
  const p1 = [x2 - L * Math.cos(a - 0.45), y2 - L * Math.sin(a - 0.45)];
  const p2 = [x2 - L * Math.cos(a + 0.45), y2 - L * Math.sin(a + 0.45)];
  return (
    <g className={`arw ${cls}`}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <polygon points={`${x2},${y2} ${p1.join(',')} ${p2.join(',')}`} />
    </g>
  );
}

export const fmt = (n, d = 0) => Number(n).toLocaleString('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d });
