import { simulate, stat, portfolio } from './trend.mjs';
const SPLIT = Date.UTC(2024, 0, 1);
const ALL = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'DOGEUSDT', 'ADAUSDT', 'LINKUSDT', 'LTCUSDT', 'AVAXUSDT', 'DOTUSDT', 'TRXUSDT', 'BCHUSDT'];
for (const p of [{ N: 55, M: 20, K: 2, sides: 'both', filter: 'none' }, { N: 20, M: 10, K: 2, sides: 'both', filter: 'none' }]) {
  const full = ALL.flatMap(s => simulate(s, p)), test = full.filter(t => t.t >= SPLIT);
  const byY = {}; for (const t of full) (byY[new Date(t.t).getUTCFullYear()] ||= []).push(t);
  console.log(`\nN${p.N}/M${p.M}: toàn bộ ${JSON.stringify(stat(full))}`);
  console.log('  theo năm:', Object.entries(byY).map(([y, a]) => `${y}: ${stat(a).expR}R (${a.length})`).join(' | '));
  console.log('  long / short 2024–2026:', JSON.stringify(stat(test.filter(t => t.dir === 1))), JSON.stringify(stat(test.filter(t => t.dir === -1))));
  for (const [risk, mo] of [[0.01, 3], [0.005, 6]]) console.log(`  danh mục rủi ro ${risk * 100}%, tối đa ${mo} lệnh — 2024–2026:`, JSON.stringify(portfolio(test, risk, mo)), '| 2020–2026:', JSON.stringify(portfolio(full, risk, mo)));
  let s = 0, w = 0; for (const t of full) { s = t.r < 0 ? s + 1 : 0; w = Math.max(w, s); } console.log('  chuỗi thua dài nhất:', w);
}
