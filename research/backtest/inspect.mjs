import fs from 'node:fs';
import { run } from './backtest.mjs';
const r = run();
const d = JSON.parse(fs.readFileSync('data/ETHUSDT.json'));
const iso = t => new Date(t).toISOString().slice(0, 16).replace('T', ' ');
// In 5 lệnh ETH đầu tiên cùng nến quanh điểm vào để soi bằng mắt
const eth = r.trades.filter(t => t.sym === 'ETHUSDT').slice(0, 5);
for (const t of eth) {
  const j = d.h4.findIndex(b => b[5] === t.t);
  console.log(`\n${t.side} vào ${iso(t.t)} ra ${iso(t.exitT)} ${t.how} R=${t.r.toFixed(2)} (gộp ${t.gross.toFixed(2)}, phí ${t.feeR.toFixed(3)}, funding ${t.fundR.toFixed(3)})`);
  for (let k = j - 4; k <= j + 2; k++) { const b = d.h4[k]; console.log(`  ${iso(b[5])} O${b[1]} H${b[2]} L${b[3]} C${b[4]}${k === j ? '  <= nến tín hiệu' : ''}`); }
}
