import fs from 'node:fs';
import { simulate, stat } from './trend.mjs';
const SPLIT = Date.UTC(2024, 0, 1);
const ALL = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'DOGEUSDT', 'ADAUSDT', 'LINKUSDT', 'LTCUSDT', 'AVAXUSDT', 'DOTUSDT', 'TRXUSDT', 'BCHUSDT'];
const days = ALL.reduce((a, s) => a + JSON.parse(fs.readFileSync(`data/${s}.json`)).d1.filter(b => b[5] >= SPLIT).length, 0);
for (const p of [{ N: 20, M: 10, K: 2, sides: 'both', filter: 'none' }, { N: 55, M: 20, K: 2, sides: 'both', filter: 'none' }, { N: 100, M: 50, K: 2, sides: 'both', filter: 'none' }, { N: 55, M: 20, K: 2, sides: 'long', filter: 'none' }]) {
  const tr = ALL.flatMap(s => simulate(s, p, { from: SPLIT }));
  const st = stat(tr);
  // hiệu chỉnh xác suất để số lệnh ngẫu nhiên xấp xỉ số lệnh hệ thống
  let prob = tr.length / days, rn = 0;
  for (let k = 0; k < 4; k++) { rn = ALL.flatMap((s, j) => simulate(s, p, { from: SPLIT, random: 7 + j, prob })).length; prob *= tr.length / Math.max(1, rn); }
  const rnd = [];
  for (let k = 1; k <= 300; k++) rnd.push(stat(ALL.flatMap((s, j) => simulate(s, p, { from: SPLIT, random: k * 131 + j, prob }))).expR);
  rnd.sort((a, b) => a - b);
  console.log(`N${p.N}/M${p.M}/${p.sides}: ${st.n} lệnh, thắng ${st.win}%, kỳ vọng ${st.expR}R, PF ${st.pf} | ngẫu nhiên (≈${rn} lệnh): trung vị ${rnd[150]}R, p95 ${rnd[285]}R, tỷ lệ ngẫu nhiên ≥ hệ thống ${(rnd.filter(x => x >= st.expR).length / 3).toFixed(1)}%`);
}
