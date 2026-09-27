// Kiểm tra dữ liệu bài học: đủ bài, đúng loại block, tên hình/công cụ hợp lệ, đáp án quiz hợp lệ.
// Chạy: npm run validate:lessons
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import CURRICULUM from '../src/data/curriculum.js';
import GLOSSARY from '../src/data/glossary.js';

const dir = new URL('../src/data/lessons/', import.meta.url);
const L = {};
for (const f of readdirSync(dir).filter(f => f.endsWith('.js'))) {
  Object.assign(L, (await import(pathToFileURL(new URL(f, dir).pathname.replace(/^\/(\w:)/, '$1')).href)).default);
}

const TYPES = ['h', 'p', 'list', 'callout', 'example', 'analogy', 'table', 'steps', 'formula', 'calc', 'scenario', 'figure', 'tool', 'checklist', 'quote'];
const FIGURES = ['candle-anatomy', 'candle-patterns', 'trend-structure', 'support-resistance', 'breakout-retest', 'false-breakout', 'range-market', 'order-book', 'volume-breakout', 'moving-averages', 'rsi-divergence', 'macd', 'fibonacci', 'head-shoulders', 'multi-timeframe', 'trade-plan', 'leverage-liquidation', 'funding-mechanism', 'drawdown-recovery', 'equity-curves', 'dca', 'market-cycle', 'emotion-cycle'];
const TOOLS = ['position-size', 'order-plan', 'liquidation', 'rr', 'expectancy', 'drawdown', 'dca', 'funding'];
const errors = [];
const ids = new Set();
let lessons = 0, quiz = 0, minutes = 0, words = 0;

for (const t of CURRICULUM) {
  for (const l of t.lessons) {
    ids.add(l.id);
    const d = L[l.id];
    if (!d) { errors.push(`${l.id}: thiếu nội dung`); continue; }
    lessons++; minutes += d.duration || 0; quiz += (d.quiz || []).length;
    words += JSON.stringify(d.blocks).split(/\s+/).length;
    if (!d.summary) errors.push(`${l.id}: thiếu summary`);
    if (!(d.sources || []).length) errors.push(`${l.id}: thiếu nguồn`);
    (d.blocks || []).forEach((b, i) => {
      if (!TYPES.includes(b.type)) errors.push(`${l.id}: block ${i} có type lạ "${b.type}"`);
      if (b.type === 'figure' && !FIGURES.includes(b.name)) errors.push(`${l.id}: hình không tồn tại "${b.name}"`);
      if (b.type === 'tool' && !TOOLS.includes(b.name)) errors.push(`${l.id}: công cụ không tồn tại "${b.name}"`);
    });
    (d.quiz || []).forEach((q, i) => {
      if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length)) errors.push(`${l.id}: câu ${i + 1} có đáp án không hợp lệ`);
    });
  }
}
for (const k of Object.keys(L)) if (!ids.has(k)) errors.push(`${k}: có nội dung nhưng không có trong curriculum.js`);
for (const g of GLOSSARY) if (g.lesson && !ids.has(g.lesson)) errors.push(`Thuật ngữ "${g.term}" trỏ tới bài không tồn tại ${g.lesson}`);

console.log(`${lessons} bài, ${quiz} câu hỏi, ${GLOSSARY.length} thuật ngữ, khoảng ${words} từ, ${minutes} phút đọc`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Dữ liệu hợp lệ.');
