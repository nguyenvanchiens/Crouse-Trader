// Hình minh hoạ vẽ sẵn cho bài học. Tên hình: xem src/data/SCHEMA.md (FIGURES).
import { walk, ema, rsi, scale, Candles, Level, Zone, Line, Mark, Arrow, fmt } from './Chart.jsx';

function Svg({ w = 520, h = 280, label, children }) {
  return (
    <svg className="fig-svg" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

function Panel({ x, y, w, h, title }) {
  return (
    <g className="panel-frame">
      <rect x={x} y={y} width={w} height={h} rx="6" />
      {title && <text x={x + 10} y={y + 18}>{title}</text>}
    </g>
  );
}

// ---------- 1. Giải phẫu nến ----------
function CandleAnatomy() {
  const one = (cx, up) => {
    const top = 50, bot = 230, oY = up ? 170 : 90, cY = up ? 90 : 170;
    const bodyTop = Math.min(oY, cY), bodyBot = Math.max(oY, cY);
    const side = up ? -1 : 1;
    const lx = cx + side * 34;
    const anchor = up ? 'end' : 'start';
    const tx = cx + side * 40;
    return (
      <g className={`cd big ${up ? 'up' : 'down'}`}>
        <line x1={cx} x2={cx} y1={top} y2={bot} />
        <rect x={cx - 22} y={bodyTop} width="44" height={bodyBot - bodyTop} rx="2" />
        <g className="ann">
          <line x1={cx} x2={lx} y1={top} y2={top} /><text x={tx} y={top + 4} textAnchor={anchor}>Giá cao nhất</text>
          <line x1={cx + side * 22} x2={lx} y1={cY} y2={cY} /><text x={tx} y={cY + 4} textAnchor={anchor}>Giá đóng cửa</text>
          <line x1={cx + side * 22} x2={lx} y1={oY} y2={oY} /><text x={tx} y={oY + 4} textAnchor={anchor}>Giá mở cửa</text>
          <line x1={cx} x2={lx} y1={bot} y2={bot} /><text x={tx} y={bot + 4} textAnchor={anchor}>Giá thấp nhất</text>
        </g>
        <text className="tag" x={cx} y={262} textAnchor="middle">{up ? 'Nến tăng: đóng > mở' : 'Nến giảm: đóng < mở'}</text>
      </g>
    );
  };
  return (
    <Svg w={520} h={280} label="Giải phẫu nến tăng và nến giảm">
      {one(170, true)}
      {one(350, false)}
      <g className="ann soft">
        <text x={260} y={72} textAnchor="middle">Bóng trên</text>
        <text x={260} y={134} textAnchor="middle">Thân nến</text>
        <text x={260} y={204} textAnchor="middle">Bóng dưới</text>
      </g>
    </Svg>
  );
}

// ---------- 2. Mẫu nến ----------
function CandlePatterns() {
  const pats = [
    { t: 'Doji', d: 'Lưỡng lự', c: [[50, 54, 44, 49], [49, 55, 43, 49.4]] },
    { t: 'Búa', d: 'Sau giảm, từ chối giá thấp', c: [[56, 57, 50, 51], [51, 52, 44, 46], [46, 48.4, 36, 48]] },
    { t: 'Sao băng', d: 'Sau tăng, từ chối giá cao', c: [[40, 46, 39, 45], [45, 50, 44, 49], [49, 60, 48, 48.6]] },
    { t: 'Nhấn chìm tăng', d: 'Thân xanh bao trọn thân đỏ', c: [[54, 55, 47, 48], [49, 50, 44, 46], [45, 56, 44.5, 55]] },
    { t: 'Nhấn chìm giảm', d: 'Thân đỏ bao trọn thân xanh', c: [[42, 49, 41, 48], [47, 53, 46, 52], [53, 54, 41, 42]] }
  ];
  const W = 104;
  return (
    <Svg w={540} h={250} label="Các mẫu nến phổ biến">
      {pats.map((p, k) => {
        const data = p.c.map(([o, h, l, c]) => ({ o, h, l, c }));
        const s = scale(data, { x0: 8 + k * W + 14, x1: 8 + k * W + W - 14, y0: 34, y1: 170, lo: 34, hi: 62, padPct: 0 });
        return (
          <g key={p.t}>
            <Panel x={8 + k * W + 3} y={10} w={W - 6} h={228} />
            <Candles data={data} s={s} hi={[data.length - 1, data.length - 1]} dim={[data.length - 1, data.length - 1]} />
            <text className="tag" x={8 + k * W + W / 2} y={196} textAnchor="middle">{p.t}</text>
            <foreignObject x={8 + k * W + 8} y={204} width={W - 16} height={34}>
              <div className="fig-note">{p.d}</div>
            </foreignObject>
          </g>
        );
      })}
    </Svg>
  );
}

// ---------- 3. Cấu trúc xu hướng ----------
function TrendStructure() {
  const panels = [
    { t: 'Xu hướng tăng', pts: [[0, 30], [1, 60], [2, 45], [3, 78], [4, 62], [5, 96]], lab: ['', 'HH', 'HL', 'HH', 'HL', 'HH'], cls: 'up' },
    { t: 'Xu hướng giảm', pts: [[0, 96], [1, 66], [2, 80], [3, 48], [4, 62], [5, 30]], lab: ['', 'LL', 'LH', 'LL', 'LH', 'LL'], cls: 'down' },
    { t: 'Đi ngang', pts: [[0, 40], [1, 80], [2, 42], [3, 82], [4, 40], [5, 79]], lab: ['', 'Đỉnh', 'Đáy', 'Đỉnh', 'Đáy', 'Đỉnh'], cls: 'flat' }
  ];
  const W = 176;
  return (
    <Svg w={540} h={260} label="Cấu trúc thị trường: tăng, giảm, đi ngang">
      {panels.map((p, k) => {
        const X = i => 12 + k * W + 16 + i * ((W - 40) / 5);
        const Y = v => 220 - v * 1.7;
        const way = p.pts.map(([i, v]) => [i * 6, v]);
        const data = walk(way, { seed: 11 + k, noise: 0.25, wick: 0.4 });
        const s = scale(data, { x0: 12 + k * W + 10, x1: 12 + k * W + W - 16, y0: 220 - 100 * 1.7, y1: 220, lo: 0, hi: 100, padPct: 0 });
        return (
          <g key={p.t}>
            <Panel x={12 + k * W} y={8} w={W - 10} h={244} title={p.t} />
            <g className="faint"><Candles data={data} s={s} /></g>
            <Line pts={p.pts.map(([i, v]) => [X(i), Y(v)])} cls={`zig ${p.cls}`} />
            {p.pts.map(([i, v], j) => j > 0 && (
              <text key={j} className="zig-lab" x={X(i)} y={Y(v) + (j % 2 === (p.cls === 'down' ? 0 : 1) ? -9 : 18)} textAnchor="middle">{p.lab[j]}</text>
            ))}
            {p.cls === 'flat' && <><Level s={{ x0: 12 + k * W + 8, x1: 12 + k * W + W - 18, y: Y }} p={81} tone="stop" /><Level s={{ x0: 12 + k * W + 8, x1: 12 + k * W + W - 18, y: Y }} p={41} tone="target" /></>}
          </g>
        );
      })}
    </Svg>
  );
}

// ---------- 4. Hỗ trợ / kháng cự ----------
function SupportResistance() {
  const way = [[0, 52], [5, 70], [9, 57], [14, 71], [18, 49], [23, 69], [27, 50], [32, 70.5], [36, 58], [40, 64]];
  const data = walk(way, { seed: 21, noise: 0.35 });
  const s = scale(data, { x0: 16, x1: 504, y0: 30, y1: 250, lo: 40, hi: 80, padPct: 0 });
  return (
    <Svg w={520} h={270} label="Vùng hỗ trợ và kháng cự">
      <Zone s={s} a={68.5} b={72} label="Vùng kháng cự: giá bị từ chối nhiều lần" tone="res" />
      <Zone s={s} a={48} b={51.5} label="Vùng hỗ trợ: bên mua xuất hiện nhiều lần" tone="sup" below />
      <Candles data={data} s={s} />
    </Svg>
  );
}

// ---------- 5. Phá vỡ và kiểm tra lại ----------
function BreakoutRetest() {
  const way = [[0, 48], [5, 62], [9, 52], [14, 63], [18, 54], [22, 63.5], [25, 74], [29, 64], [33, 80], [37, 86]];
  const data = walk(way, { seed: 5, noise: 0.3 });
  const s = scale(data, { x0: 16, x1: 504, y0: 26, y1: 250, lo: 42, hi: 90, padPct: 0 });
  return (
    <Svg w={520} h={270} label="Phá vỡ kháng cự rồi kiểm tra lại">
      <Zone s={s} a={61.5} b={65} to={24} label="Kháng cự" tone="res" />
      <Zone s={s} a={61.5} b={65} from={24} label="Kiểm tra lại: kháng cự cũ thành hỗ trợ" tone="sup" side="right" below />
      <Candles data={data} s={s} />
      <Mark x={s.x(24)} y={s.y(74)} label="Phá vỡ, nến đóng trên vùng" dy={-14} />
      <Mark x={s.x(28)} y={s.y(62.5)} label="" cls="plan" />
    </Svg>
  );
}

// ---------- 6. Phá vỡ giả ----------
function FalseBreakout() {
  const way = [[0, 50], [5, 63], [9, 54], [14, 63.5], [18, 55], [22, 63], [23, 64], [26, 58], [30, 50], [34, 44]];
  const data = walk(way, { seed: 9, noise: 0.3 });
  data[22] = { o: 63, h: 71, l: 62.4, c: 63.4, v: 1 };
  const s = scale(data, { x0: 16, x1: 504, y0: 26, y1: 250, lo: 40, hi: 76, padPct: 0 });
  return (
    <Svg w={520} h={270} label="Phá vỡ giả">
      <Zone s={s} a={62} b={65} label="Kháng cự" tone="res" />
      <Candles data={data} s={s} hi={[22, 22]} />
      <Mark x={s.x(22)} y={s.y(71)} label="Râu vượt vùng, nến đóng lại bên trong" dy={-10} />
      <text className="note-t" x={s.x(0)} y={s.y(44)}>Người mua đuổi theo phá vỡ bị kẹt ở vùng cao</text>
    </Svg>
  );
}

// ---------- 7. Đi ngang ----------
function RangeMarket() {
  const way = [[0, 50], [4, 70], [8, 51], [13, 69], [17, 52], [21, 70], [25, 50.5], [30, 69.5], [34, 58]];
  const data = walk(way, { seed: 31, noise: 0.4 });
  const s = scale(data, { x0: 16, x1: 504, y0: 26, y1: 250, lo: 42, hi: 78, padPct: 0 });
  return (
    <Svg w={520} h={274} label="Thị trường đi ngang">
      <Zone s={s} a={68} b={71.5} label="Biên trên" tone="res" />
      <Zone s={s} a={48.5} b={52} label="Biên dưới" tone="sup" below />
      <Zone s={s} a={57} b={62} tone="mid" />
      <text className="sub" x={16} y={266}>Vùng xám giữa biên: rủi ro và lợi nhuận đều kém, nên đứng ngoài.</text>
      <Candles data={data} s={s} />
    </Svg>
  );
}

// ---------- 8. Sổ lệnh ----------
function OrderBook() {
  const asks = [[80060, 3.1], [80050, 1.4], [80040, 2.2], [80030, 0.9], [80020, 1.8], [80010, 0.6]];
  const bids = [[80000, 0.8], [79990, 2.0], [79980, 1.1], [79970, 2.6], [79960, 1.5], [79950, 3.4]];
  const max = 3.6, row = 18, bar = x => (x / max) * 190;
  return (
    <Svg w={520} h={300} label="Sổ lệnh: bên bán, bên mua và chênh lệch giá">
      <text className="th" x={40} y={22}>Giá (USDT)</text>
      <text className="th" x={170} y={22}>Khối lượng (BTC)</text>
      {asks.map(([p, q], i) => (
        <g key={p} className="ob ask">
          <rect x={150} y={32 + i * row} width={bar(q)} height={row - 4} rx="2" />
          <text x={40} y={45 + i * row}>{fmt(p)}</text>
          <text className="q" x={156} y={45 + i * row}>{fmt(q, 1)}</text>
        </g>
      ))}
      <g className="spread">
        <line x1={30} x2={350} y1={32 + 6 * row + 8} y2={32 + 6 * row + 8} />
        <text x={40} y={32 + 6 * row + 22}>Chênh lệch (spread) = 80.010 − 80.000 = 10 USDT</text>
        <line x1={30} x2={350} y1={32 + 6 * row + 30} y2={32 + 6 * row + 30} />
      </g>
      {bids.map(([p, q], i) => (
        <g key={p} className="ob bid">
          <rect x={150} y={176 + i * row} width={bar(q)} height={row - 4} rx="2" />
          <text x={40} y={189 + i * row}>{fmt(p)}</text>
          <text className="q" x={156} y={189 + i * row}>{fmt(q, 1)}</text>
        </g>
      ))}
      <g className="side-note">
        <text x={372} y={60}>Bên bán (ask)</text>
        <text className="sub" x={372} y={78}>Lệnh mua market khớp</text>
        <text className="sub" x={372} y={94}>từ giá bán thấp nhất đi lên</text>
        <text x={372} y={206}>Bên mua (bid)</text>
        <text className="sub" x={372} y={224}>Lệnh bán market khớp</text>
        <text className="sub" x={372} y={240}>từ giá mua cao nhất đi xuống</text>
      </g>
    </Svg>
  );
}

// ---------- 9. Volume xác nhận phá vỡ ----------
function VolumeBreakout() {
  const way = [[0, 50], [4, 60], [8, 53], [11, 61], [13, 64], [16, 55], [20, 60.5], [23, 70], [27, 75]];
  const vol = i => (i === 12 || i === 13 ? 0.35 : i >= 21 && i <= 23 ? 1.6 + (i - 21) * 0.2 : 0.5 + ((i * 37) % 10) / 25);
  const data = walk(way, { seed: 3, noise: 0.3, vol: (i) => vol(i) });
  const s = scale(data, { x0: 16, x1: 504, y0: 20, y1: 190, lo: 46, hi: 78, padPct: 0 });
  const vmax = 2.2;
  return (
    <Svg w={520} h={290} label="Khối lượng xác nhận phá vỡ">
      <Zone s={s} a={60} b={62.5} label="Kháng cự" tone="res" />
      <Candles data={data} s={s} />
      <g className="vol">
        {data.map((c, i) => (
          <rect key={i} className={c.c >= c.o ? 'up' : 'down'} x={s.x(i) - s.bw / 2} y={280 - (c.v / vmax) * 70} width={s.bw} height={(c.v / vmax) * 70} />
        ))}
      </g>
      <text className="note-t" x={s.x(12.5)} y={206} textAnchor="middle">Phá vỡ volume thấp: thất bại</text>
      <text className="note-t" x={s.x(22)} y={206} textAnchor="middle">Phá vỡ volume lớn: giữ được</text>
      <line className="sep" x1={16} x2={504} y1={212} y2={212} />
    </Svg>
  );
}

// ---------- 10. Đường trung bình ----------
function MovingAverages() {
  const way = [[0, 40], [10, 52], [22, 78], [30, 84], [36, 72], [44, 58], [52, 46], [58, 50]];
  const data = walk(way, { seed: 13, noise: 0.45 });
  const cl = data.map(d => d.c);
  const e20 = ema(cl, 9), e50 = ema(cl, 21);
  const s = scale(data, { x0: 16, x1: 504, y0: 26, y1: 250, lo: 34, hi: 90, padPct: 0 });
  const cross = [];
  for (let i = 12; i < data.length; i++) {
    const a = e20[i - 1] - e50[i - 1], b = e20[i] - e50[i];
    if (a <= 0 && b > 0) cross.push({ i, t: 'Giao cắt vàng (golden cross)' });
    if (a >= 0 && b < 0) cross.push({ i, t: 'Giao cắt tử thần (death cross)' });
  }
  return (
    <Svg w={520} h={270} label="Giá với hai đường trung bình động">
      <g className="faint"><Candles data={data} s={s} /></g>
      <Line pts={e20.map((v, i) => [s.x(i), s.y(v)])} cls="ma fast" />
      <Line pts={e50.map((v, i) => [s.x(i), s.y(v)])} cls="ma slow" />
      {cross.map(c => <Mark key={c.i} x={s.x(c.i)} y={s.y(e20[c.i])} label={c.t} dy={c.t.startsWith('Giao cắt v') ? 24 : -14} cls="plan" />)}
      <g className="legend">
        <line className="ma fast" x1={24} x2={44} y1={24} y2={24} /><text x={50} y={28}>EMA nhanh</text>
        <line className="ma slow" x1={130} x2={150} y1={24} y2={24} /><text x={156} y={28}>EMA chậm</text>
        <text className="sub" x={500} y={28} textAnchor="end">Giao cắt luôn đến sau đỉnh và đáy</text>
      </g>
    </Svg>
  );
}

// ---------- 11. RSI và phân kỳ ----------
function RsiDivergence() {
  const way = [[0, 40], [10, 50], [16, 72], [21, 62], [30, 76], [34, 66], [40, 54]];
  const data = walk(way, { seed: 17, noise: 0.25 });
  // RSI minh hoạ theo mốc thiết kế: đỉnh 1 ~78, đỉnh 2 ~64 (phân kỳ giảm)
  const rk = [[0, 48], [6, 55], [11, 63], [15, 78], [20, 46], [25, 57], [29, 64], [33, 50], [40, 34]];
  const r = data.map((_, i) => { const k = rk.findIndex(p => p[0] >= i); if (k <= 0) return rk[0][1]; const [a, va] = rk[k - 1], [b, vb] = rk[k]; return va + (vb - va) * (i - a) / (b - a) + Math.sin(i * 1.7) * 1.2; });
  const s = scale(data, { x0: 16, x1: 504, y0: 20, y1: 170, lo: 34, hi: 82, padPct: 0 });
  const ry = v => 280 - (v / 100) * 90;
  const peak = (a, b) => { let m = a; for (let i = a; i <= b; i++) if (data[i].h > data[m].h) m = i; return m; };
  const p1 = 15, p2 = 29;
  return (
    <Svg w={520} h={290} label="RSI và phân kỳ giảm">
      <Candles data={data} s={s} />
      <Line pts={[[s.x(p1), s.y(data[p1].h) - 6], [s.x(p2), s.y(data[p2].h) - 6]]} cls="div-line" />
      <text className="note-t" x={s.x(p2) + 8} y={s.y(data[p2].h) - 8}>Giá: đỉnh cao hơn</text>
      <line className="sep" x1={16} x2={504} y1={184} y2={184} />
      <rect className="rsi-band" x={16} y={ry(70)} width={488} height={ry(30) - ry(70)} />
      <Level s={{ x0: 16, x1: 504, y: v => ry(v) }} p={70} label="70" tone="level" side="left" />
      <Level s={{ x0: 16, x1: 504, y: v => ry(v) }} p={30} label="30" tone="level" side="left" />
      <Line pts={r.map((v, i) => [s.x(i), ry(v)])} cls="osc" />
      <Line pts={[[s.x(p1), ry(r[p1]) - 5], [s.x(p2), ry(r[p2]) - 5]]} cls="div-line" />
      <text className="note-t" x={s.x(p2) + 10} y={ry(r[p2]) + 20}>RSI: đỉnh thấp hơn</text>
      <text className="sub" x={500} y={200} textAnchor="end">RSI (14), minh hoạ</text>
    </Svg>
  );
}

// ---------- 12. MACD ----------
function Macd() {
  const way = [[0, 50], [12, 64], [20, 80], [28, 74], [36, 58], [44, 52], [52, 66]];
  const data = walk(way, { seed: 23, noise: 0.4 });
  const cl = data.map(d => d.c);
  const e12 = ema(cl, 12), e26 = ema(cl, 26);
  const m = cl.map((_, i) => e12[i] - e26[i]);
  const sig = ema(m, 9);
  const s = scale(data, { x0: 16, x1: 504, y0: 20, y1: 160, padPct: 0.06 });
  const mm = Math.max(...m.map(Math.abs), ...sig.map(Math.abs));
  const my = v => 250 - (v / mm) * 34;
  return (
    <Svg w={520} h={290} label="MACD: đường MACD, đường tín hiệu và histogram">
      <Candles data={data} s={s} />
      <line className="sep" x1={16} x2={504} y1={176} y2={176} />
      <g className="hist">
        {m.map((v, i) => <rect key={i} className={v - sig[i] >= 0 ? 'up' : 'down'} x={s.x(i) - s.bw / 2} y={Math.min(my(0), my(v - sig[i]))} width={s.bw} height={Math.abs(my(v - sig[i]) - my(0))} />)}
      </g>
      <line className="zero" x1={16} x2={504} y1={my(0)} y2={my(0)} />
      <Line pts={m.map((v, i) => [s.x(i), my(v)])} cls="osc" />
      <Line pts={sig.map((v, i) => [s.x(i), my(v)])} cls="osc sig" />
      <g className="legend">
        <line className="osc" x1={24} x2={44} y1={192} y2={192} /><text x={50} y={196}>MACD (12, 26)</text>
        <line className="osc sig" x1={160} x2={180} y1={192} y2={192} /><text x={186} y={196}>Tín hiệu (9)</text>
        <text className="sub" x={500} y={196} textAnchor="end">Cột = MACD − tín hiệu</text>
      </g>
    </Svg>
  );
}

// ---------- 13. Fibonacci ----------
function Fibonacci() {
  const A = 40, B = 80;
  const way = [[0, A], [16, B], [24, B - (B - A) * 0.618], [26, B - (B - A) * 0.6], [34, 88]];
  const data = walk(way, { seed: 29, noise: 0.3 });
  const s = scale(data, { x0: 16, x1: 430, y0: 16, y1: 238, lo: 34, hi: 92, padPct: 0 });
  const lv = [[0, '0 (đỉnh sóng)'], [0.236, '0.236'], [0.382, '0.382'], [0.5, '0.5'], [0.618, '0.618'], [0.786, '0.786'], [1, '1 (đáy sóng)']];
  return (
    <Svg w={520} h={270} label="Fibonacci thoái lui trên một sóng tăng">
      <Zone s={s} a={B - (B - A) * 0.5} b={B - (B - A) * 0.618} from={14} to={36} tone="plan" />
      {lv.map(([f, t]) => <Level key={f} s={s} p={B - (B - A) * f} label="" from={0} to={33} tone={f === 0.5 || f === 0.618 ? 'plan' : 'level'} />)}
      {lv.map(([f, t]) => <text key={t} className="fib-t" x={446} y={s.y(B - (B - A) * f) + 4}>{t}</text>)}
      <Candles data={data} s={s} />
      <text className="sub" x={16} y={262}>Vùng tô vàng 0.5–0.618: nơi thường được quan sát, không phải nơi giá chắc chắn dừng lại.</text>
    </Svg>
  );
}

// ---------- 14. Vai đầu vai ----------
function HeadShoulders() {
  const pts = [[0, 40], [6, 66], [10, 54], [16, 80], [22, 54.5], [28, 67], [33, 53], [36, 44], [40, 38]];
  const data = walk(pts, { seed: 41, noise: 0.25 });
  const s = scale(data, { x0: 16, x1: 504, y0: 26, y1: 250, lo: 28, hi: 86, padPct: 0 });
  return (
    <Svg w={520} h={270} label="Mô hình vai đầu vai">
      <g className="faint"><Candles data={data} s={s} /></g>
      <Line pts={pts.map(([i, v]) => [s.x(i - 0.5), s.y(v)])} cls="zig flat" />
      <Line pts={[[s.x(6), s.y(54.4)], [s.x(38), s.y(53.2)]]} cls="neck" />
      <text className="zig-lab" x={s.x(5.5)} y={s.y(66) - 10} textAnchor="middle">Vai trái</text>
      <text className="zig-lab" x={s.x(15.5)} y={s.y(80) - 10} textAnchor="middle">Đầu</text>
      <text className="zig-lab" x={s.x(27.5)} y={s.y(67) - 10} textAnchor="middle">Vai phải</text>
      <text className="note-t" x={s.x(38)} y={s.y(53.2) - 8} textAnchor="end">Đường viền cổ</text>
      <Arrow x1={s.x(36)} y1={s.y(50)} x2={s.x(39)} y2={s.y(39)} cls="down" />
      <text className="sub" x={500} y={258} textAnchor="end">Mô hình chỉ hoàn tất khi giá đóng cửa dưới đường viền cổ</text>
    </Svg>
  );
}

// ---------- 15. Đa khung thời gian ----------
function MultiTimeframe() {
  const W = 164;
  const p1 = walk([[0, 30], [6, 55], [9, 46], [15, 70], [18, 60], [20, 62]], { seed: 51, noise: 0.3 });
  const p2 = walk([[0, 70], [5, 64], [9, 66], [14, 60], [18, 61]], { seed: 52, noise: 0.35 });
  const p3 = walk([[0, 62], [4, 59.6], [7, 61], [10, 59.8], [13, 62.4], [16, 64]], { seed: 53, noise: 0.35 });
  const sets = [
    { t: 'D1: bối cảnh', d: p1, note: 'Xu hướng tăng rõ', z: [59, 62.5] },
    { t: 'H4: vùng giá', d: p2, note: 'Giá hồi về vùng hỗ trợ', z: [59, 62] },
    { t: 'H1: kích hoạt', d: p3, note: 'Phá đỉnh nhỏ: vào lệnh', z: null }
  ];
  return (
    <Svg w={540} h={260} label="Phân tích đa khung thời gian">
      {sets.map((st, k) => {
        const s = scale(st.d, { x0: 12 + k * (W + 8) + 10, x1: 12 + k * (W + 8) + W - 10, y0: 40, y1: 220 });
        return (
          <g key={k}>
            <Panel x={12 + k * (W + 8)} y={8} w={W} h={244} title={st.t} />
            {st.z && <Zone s={s} a={st.z[0]} b={st.z[1]} tone="sup" from={k === 0 ? 14 : 0} />}
            <Candles data={st.d} s={s} />
            {k === 2 && <Level s={s} p={61.4} label="Đỉnh nhỏ" tone="plan" from={4} />}
            <text className="sub" x={12 + k * (W + 8) + 10} y={242}>{st.note}</text>
            {k < 2 && <Arrow x1={12 + k * (W + 8) + W - 2} y1={130} x2={12 + (k + 1) * (W + 8) + 4} y2={130} cls="plan" />}
          </g>
        );
      })}
    </Svg>
  );
}

// ---------- 16. Kế hoạch lệnh ----------
export function TradePlanChart({ compact = false, animate = false }) {
  const entry = 80000, stop = 78400, risk = entry - stop;
  const way = [[0, 74200], [6, 77600], [10, 76100], [16, 81500], [20, 80900], [23, 79700], [25, 80000]];
  const data = walk(way, { seed: 61, noise: 0.35 });
  const n = data.length;
  const futureTo = n + 11;
  const s = scale([...data, { h: entry + risk * 3.3, l: 73300 }], { x0: 16, x1: compact ? 470 : 500, y0: 18, y1: compact ? 300 : 262, padPct: 0 });
  s.step = (s.x1 - s.x0) / futureTo; s.bw = s.step * 0.62; s.x = i => s.x0 + s.step * (i + 0.5);
  const T = k => entry + risk * k;
  return (
    <svg className={`fig-svg trade-plan${animate ? ' anim' : ''}`} viewBox={`0 0 ${compact ? 520 : 520} ${compact ? 320 : 280}`} role="img"
      aria-label="Kế hoạch lệnh long giả định: vào 80.000, dừng lỗ 78.400, chốt lời 1R, 2R, 3R">
      <rect className="rr-risk" x={s.x(n - 0.5)} y={s.y(entry)} width={s.x(futureTo) - s.x(n - 0.5)} height={s.y(stop) - s.y(entry)} />
      <rect className="rr-reward" x={s.x(n - 0.5)} y={s.y(T(3))} width={s.x(futureTo) - s.x(n - 0.5)} height={s.y(entry) - s.y(T(3))} />
      <Zone s={s} a={79600} b={80400} from={8} to={n} tone="sup" />
      <Candles data={data} s={s} />
      <g className="plan-lines">
        <Level s={s} p={T(3)} from={n - 0.5} label={`Chốt lời 3: ${fmt(T(3))} (+3R)`} tone="target" dash={false} />
        <Level s={s} p={T(2)} from={n - 0.5} label={`Chốt lời 2: ${fmt(T(2))} (+2R)`} tone="target" />
        <Level s={s} p={T(1)} from={n - 0.5} label={`+1R: ${fmt(T(1))}`} tone="level" />
        <Level s={s} p={entry} from={n - 0.5} label={`Vào lệnh: ${fmt(entry)}`} tone="entry" dash={false} />
        <Level s={s} p={stop} from={n - 0.5} label={`Dừng lỗ: ${fmt(stop)} (−1R)`} tone="stop" dash={false} />
      </g>
      <text className="sub" x={s.x(8)} y={s.y(80400) - 6}>Vùng hỗ trợ cũ</text>
    </svg>
  );
}

// ---------- 17. Đòn bẩy và thanh lý ----------
function LeverageLiquidation() {
  const mmr = 0.5;
  const L = [2, 3, 5, 10, 20, 50, 100];
  const d = L.map(l => Math.max(0, 100 / l - mmr));
  const X = v => 110 + (v / 50) * 370;
  return (
    <Svg w={520} h={292} label="Khoảng cách từ giá vào tới giá thanh lý theo đòn bẩy">
      <text className="th" x={16} y={22}>Đòn bẩy</text>
      <text className="th" x={110} y={22}>Giá đi ngược bao nhiêu % thì bị thanh lý (isolated, ký quỹ duy trì 0,5%)</text>
      {L.map((l, i) => (
        <g key={l} className={`lev ${d[i] < 5 ? 'hot' : d[i] < 15 ? 'warm' : ''}`}>
          <text x={16} y={52 + i * 32}>{l}x</text>
          <rect x={110} y={38 + i * 32} width={Math.max(2, X(d[i]) - 110)} height={20} rx="3" />
          <text className="v" x={X(d[i]) + 6} y={52 + i * 32}>{fmt(d[i], d[i] < 10 ? 1 : 1)}%</text>
        </g>
      ))}
      <line className="ref" x1={X(2)} x2={X(2)} y1={32} y2={262} />
      <text className="sub" x={16} y={280}>Vạch dọc = 2%. ATR ngày trung vị của BTC khoảng 3% (Binance Futures, 5/2025–9/2026).</text>
    </Svg>
  );
}

// ---------- 18. Cơ chế funding ----------
function FundingMechanism() {
  const xs = Array.from({ length: 60 }, (_, i) => i);
  const idx = xs.map(i => 60 + Math.sin(i / 9) * 6 + i * 0.1);
  const perp = xs.map((i, k) => idx[k] + (i < 30 ? 3.2 : -3) * Math.min(1, Math.abs(i - 30) / 8));
  const X = i => 20 + i * 8, Y = v => 250 - (v - 44) * 6;
  return (
    <Svg w={520} h={290} label="Funding: giá hợp đồng vĩnh cửu so với giá chỉ số">
      <Line pts={idx.map((v, i) => [X(i), Y(v)])} cls="ma slow" />
      <Line pts={perp.map((v, i) => [X(i), Y(v)])} cls="ma fast" />
      <line className="sep" x1={X(30)} x2={X(30)} y1={20} y2={270} />
      <text className="sub" x={500} y={262} textAnchor="end">Binance tính funding lúc 07:00, 15:00, 23:00 giờ Việt Nam</text>
      <g className="fund-box up"><rect x={24} y={20} width={210} height={52} rx="6" />
        <text x={36} y={42}>Giá perpetual cao hơn chỉ số</text><text className="sub" x={36} y={60}>Funding dương: bên long trả bên short</text></g>
      <g className="fund-box down"><rect x={X(31)} y={20} width={228} height={52} rx="6" />
        <text x={X(31) + 12} y={42}>Giá perpetual thấp hơn chỉ số</text><text className="sub" x={X(31) + 12} y={60}>Funding âm: bên short trả bên long</text></g>
      <g className="legend">
        <line className="ma fast" x1={24} x2={44} y1={282} y2={282} /><text x={50} y={286}>Giá hợp đồng vĩnh cửu</text>
        <line className="ma slow" x1={210} x2={230} y1={282} y2={282} /><text x={236} y={286}>Giá chỉ số (giao ngay)</text>
        
      </g>
    </Svg>
  );
}

// ---------- 19. Drawdown và phục hồi ----------
function DrawdownRecovery() {
  const L = [10, 20, 30, 40, 50, 60, 75, 90];
  const need = L.map(l => (l / (100 - l)) * 100);
  const cap = 300, X = v => 150 + (Math.min(v, cap) / cap) * 320;
  return (
    <Svg w={520} h={300} label="Mức lỗ và mức lãi cần để hoà vốn">
      <text className="th" x={16} y={22}>Tài khoản lỗ</text>
      <text className="th" x={150} y={22}>Cần lãi bao nhiêu % để quay về vốn ban đầu</text>
      {L.map((l, i) => (
        <g key={l} className={`lev ${l >= 50 ? 'hot' : l >= 30 ? 'warm' : ''}`}>
          <text x={16} y={52 + i * 30}>−{l}%</text>
          <rect x={150} y={38 + i * 30} width={X(need[i]) - 150} height={20} rx="3" />
          <text className="v" x={X(need[i]) + 6} y={52 + i * 30}>+{fmt(need[i], need[i] % 1 ? 1 : 0)}%{need[i] > cap ? ' (cột bị cắt)' : ''}</text>
        </g>
      ))}
      <text className="sub" x={16} y={290}>Công thức: lãi cần = lỗ ÷ (100% − lỗ)</text>
    </Svg>
  );
}

// ---------- 20. Đường vốn mô phỏng ----------
function EquityCurves() {
  const n = 150;
  // Chuỗi 150 lệnh có đúng 60 lệnh thắng (40%, bằng kỳ vọng), seed chọn sẵn để hình đại diện
  const r = (() => { let s = 30 * 7919; return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }; })();
  const wins = Array.from({ length: n }, () => r() < 0.4);
  const curve = risk => { let e = 1000; const out = [e]; wins.forEach(w => { e = e * (1 + (w ? 2 * risk : -risk)); out.push(e); }); return out; };
  const mdd = v => { let pk = v[0], d = 0; v.forEach(x => { pk = Math.max(pk, x); d = Math.max(d, 1 - x / pk); }); return d * 100; };
  const series = [
    { k: '1%', v: curve(0.01), cls: 'eq1' },
    { k: '5%', v: curve(0.05), cls: 'eq5' },
    { k: '20%', v: curve(0.2), cls: 'eq20' }
  ];
  const lg = v => Math.log10(Math.max(v, 10));
  const lo = 1, hi = 4.3;
  const X = i => 56 + (i / n) * 440, Y = v => 258 - ((lg(v) - lo) / (hi - lo)) * 180;
  const ticks = [10, 100, 1000, 10000];
  return (
    <Svg w={520} h={290} label="Cùng một chuỗi lệnh, ba mức rủi ro mỗi lệnh">
      {ticks.map(t => (
        <g key={t} className="grid"><line x1={56} x2={496} y1={Y(t)} y2={Y(t)} /><text x={50} y={Y(t) + 4} textAnchor="end">{fmt(t)}</text></g>
      ))}
      {series.map(sr => <Line key={sr.k} pts={sr.v.map((v, i) => [X(i), Y(v)])} cls={`eq ${sr.cls}`} />)}
      <g className="eq-legend">
        {series.map((sr, j) => (
          <g key={sr.k}>
            <line className={`eq ${sr.cls}`} x1={64} x2={84} y1={24 + j * 17} y2={24 + j * 17} />
            <text className={`eq-lab ${sr.cls}`} x={90} y={28 + j * 17}>Rủi ro {sr.k}/lệnh: kết thúc {fmt(sr.v[n])} USDT, có lúc sụt {fmt(mdd(sr.v))}%</text>
          </g>
        ))}
      </g>
      <text className="sub" x={56} y={278}>150 lệnh mô phỏng: thắng 40% (+2R), thua 60% (−1R), vốn 1.000 USDT, trục log.</text>
    </Svg>
  );
}

// ---------- 21. DCA ----------
function Dca() {
  const prices = [100, 88, 72, 64, 70, 58, 66, 80, 92, 104, 112, 120];
  let coins = 0, spent = 0;
  const avg = prices.map(p => { coins += 100 / p; spent += 100; return spent / coins; });
  const X = i => 40 + i * 40, Y = v => 250 - (v - 40) * 2.4;
  return (
    <Svg w={520} h={280} label="Mua định kỳ và giá vốn trung bình">
      <Line pts={prices.map((p, i) => [X(i), Y(p)])} cls="ma fast" />
      {prices.map((p, i) => <g key={i} className="mk plan"><circle cx={X(i)} cy={Y(p)} r="4" /></g>)}
      <polyline className="avg-step" fill="none" points={avg.flatMap((a, i) => [[X(i), Y(a)], [X(i + 1), Y(a)]]).slice(0, -1).map(p => p.join(',')).join(' ')} />
      <text className="note-t good" x={X(11)} y={Y(avg[11]) - 8} textAnchor="end">Giá vốn trung bình: {fmt(avg[11], 1)}</text>
      <text className="note-t" x={X(0) + 6} y={Y(100) - 10}>Giá mua mỗi kỳ</text>
      <text className="sub" x={16} y={272}>12 kỳ, mỗi kỳ mua 100 USDT, giá giả định. Mua đều giúp mua nhiều hơn khi giá thấp.</text>
    </Svg>
  );
}

// ---------- 22. Chu kỳ thị trường ----------
function MarketCycle() {
  const f = t => 150 - Math.sin((t - 0.25) * Math.PI * 2) * 90;
  const pts = Array.from({ length: 101 }, (_, i) => [30 + i * 4.6, f(i / 100)]);
  const ph = [
    { a: 0, b: 25, t: 'Tích lũy', d: 'Giá đi ngang ở vùng thấp' },
    { a: 25, b: 50, t: 'Tăng giá', d: 'Đỉnh và đáy cao dần' },
    { a: 50, b: 75, t: 'Phân phối', d: 'Đi ngang ở vùng cao' },
    { a: 75, b: 100, t: 'Giảm giá', d: 'Đỉnh và đáy thấp dần' }
  ];
  return (
    <Svg w={520} h={280} label="Bốn pha của chu kỳ thị trường">
      {ph.map((p, i) => (
        <g key={p.t} className={`phase p${i}`}>
          <rect x={30 + p.a * 4.6} y={20} width={(p.b - p.a) * 4.6} height={236} />
          <text x={30 + ((p.a + p.b) / 2) * 4.6} y={40} textAnchor="middle">{p.t}</text>
          <text className="sub" x={30 + ((p.a + p.b) / 2) * 4.6} y={58} textAnchor="middle">{p.d}</text>
        </g>
      ))}
      <Line pts={pts.map(([x, y]) => [x, y + 20])} cls="cycle" />
    </Svg>
  );
}

// ---------- 23. Vòng cảm xúc ----------
function EmotionCycle() {
  const f = t => 160 - Math.sin(t * Math.PI * 2 - 0.4) * 100 - t * 30;
  const pts = Array.from({ length: 101 }, (_, i) => [30 + i * 4.6, f(i / 100)]);
  const labs = [[4, 'Lạc quan'], [12, 'Hào hứng'], [21, 'Phấn khích'], [30, 'Hưng phấn'], [38, 'Lo lắng'], [44, 'Phủ nhận'], [50, 'Sợ hãi'], [56, 'Tuyệt vọng'], [62, 'Hoảng loạn'], [69, 'Đầu hàng'], [79, 'Chán nản'], [88, 'Hy vọng'], [94, 'Nhẹ nhõm'], [99, 'Lạc quan']];
  const peak = pts.reduce((m, p) => (p[1] < m[1] ? p : m), pts[0]);
  const trough = pts.slice(40).reduce((m, p) => (p[1] > m[1] ? p : m), pts[40]);
  return (
    <Svg w={520} h={300} label="Vòng cảm xúc của nhà đầu tư">
      <Line pts={pts} cls="cycle" />
      {labs.map(([i, t], k) => {
        const [x, y] = pts[i];
        const above = k <= 3 || k >= 11;
        const dx = k >= 4 && k <= 9 ? 8 : 0;
        return <g key={k} className="emo"><circle cx={x} cy={y} r="3" /><text x={x + dx} y={above ? y - 9 : k === 10 ? y + 18 : y + 4} textAnchor={dx ? 'start' : 'middle'}>{t}</text></g>;
      })}
      <text className="note-t risk" x={peak[0]} y={peak[1] - 28} textAnchor="middle">Rủi ro cao nhất</text>
      <text className="note-t good" x={trough[0]} y={trough[1] + 36} textAnchor="middle">Cơ hội lớn nhất, nhưng cảm giác tệ nhất</text>
    </Svg>
  );
}

function TradePlanFigure() { return <TradePlanChart />; }

export const FIGURES = {
  'candle-anatomy': CandleAnatomy,
  'candle-patterns': CandlePatterns,
  'trend-structure': TrendStructure,
  'support-resistance': SupportResistance,
  'breakout-retest': BreakoutRetest,
  'false-breakout': FalseBreakout,
  'range-market': RangeMarket,
  'order-book': OrderBook,
  'volume-breakout': VolumeBreakout,
  'moving-averages': MovingAverages,
  'rsi-divergence': RsiDivergence,
  macd: Macd,
  fibonacci: Fibonacci,
  'head-shoulders': HeadShoulders,
  'multi-timeframe': MultiTimeframe,
  'trade-plan': TradePlanFigure,
  'leverage-liquidation': LeverageLiquidation,
  'funding-mechanism': FundingMechanism,
  'drawdown-recovery': DrawdownRecovery,
  'equity-curves': EquityCurves,
  dca: Dca,
  'market-cycle': MarketCycle,
  'emotion-cycle': EmotionCycle
};

export default function Figure({ name, caption }) {
  const F = FIGURES[name];
  if (!F) return null;
  return (
    <figure className="fig">
      <div className="fig-scroll"><F /></div>
      {caption && <figcaption dangerouslySetInnerHTML={{ __html: caption }} />}
    </figure>
  );
}
