// Tải nến và funding lịch sử từ API công khai Binance USDⓈ-M Futures
import fs from 'node:fs';
const API = 'https://fapi.binance.com/fapi/v1';
const START = Date.UTC(2020, 0, 1), END = Date.UTC(2026, 8, 27);
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function klines(sym, iv) {
  const out = []; let t = START;
  while (t < END) {
    const j = await (await fetch(`${API}/klines?symbol=${sym}&interval=${iv}&startTime=${t}&limit=1500`)).json();
    if (!j.length) break;
    for (const k of j) if (k[6] < END) out.push([k[0], +k[1], +k[2], +k[3], +k[4], k[6]]);
    t = j[j.length - 1][0] + 1; await sleep(120);
  }
  return out;
}
async function funding(sym) {
  const out = []; let t = START;
  while (t < END) {
    const j = await (await fetch(`${API}/fundingRate?symbol=${sym}&startTime=${t}&limit=1000`)).json();
    if (!j.length) break;
    for (const f of j) out.push([f.fundingTime, +f.fundingRate]);
    t = j[j.length - 1].fundingTime + 1; await sleep(120);
  }
  return out;
}
const LIST = process.argv.slice(2).length ? process.argv.slice(2) : ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
for (const s of LIST) {
  const d = { d1: await klines(s, '1d'), h4: process.env.D1ONLY ? [] : await klines(s, '4h'), fund: await funding(s) };
  fs.writeFileSync(`data/${s}.json`, JSON.stringify(d));
  console.log(s, 'D1', d.d1.length, 'H4', d.h4.length, 'funding', d.fund.length, new Date(d.d1[0][0]).toISOString().slice(0, 10), '→', new Date(d.d1.at(-1)[0]).toISOString().slice(0, 10));
}
