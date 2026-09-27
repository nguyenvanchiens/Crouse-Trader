# Định dạng nội dung bài học

Mỗi file `src/data/lessons/chuong-N.js` là một ES module:

```js
const lessons = {
  'c1-b1': {
    duration: 18,                 // phút đọc ước tính (số nguyên)
    level: 'Cơ bản',              // 'Cơ bản' | 'Trung cấp' | 'Nâng cao'
    summary: 'Một câu mô tả bài học (≤ 170 ký tự).',
    goals: ['Mục tiêu 1', 'Mục tiêu 2', 'Mục tiêu 3'],   // "Sau bài này bạn sẽ..."
    blocks: [ /* xem các loại block bên dưới */ ],
    keyPoints: ['Ý chính 1', 'Ý chính 2', 'Ý chính 3', 'Ý chính 4'],
    practice: ['Bài tập thực hành 1', 'Bài tập 2'],       // việc cụ thể người học làm sau bài
    quiz: [
      { q: 'Câu hỏi?', options: ['A', 'B', 'C', 'D'], answer: 2, explain: 'Vì sao đáp án đúng.' }
    ],
    sources: [ { title: 'Tên nguồn', url: 'https://...', note: 'Tổ chức/tác giả, năm, ngôn ngữ' } ],
    video: { id: 'YouTubeID', title: '...', channel: '...', lang: 'en', minutes: 12 },  // tuỳ chọn, phải xác minh bằng oEmbed
    updated: '2026-09'
  }
};

export default lessons;
```

## Các loại block

Trường văn bản cho phép HTML inline: `<strong>`, `<em>`, `<code>`, `<a href>`, `<sup>`. Không dùng HTML khối.

| type | Trường | Ghi chú |
|---|---|---|
| `h` | `text` | Tiêu đề mục (h2). Mỗi bài 4–6 mục. |
| `p` | `text` | Đoạn văn. |
| `list` | `items: []`, `ordered?: true` | Danh sách. |
| `callout` | `tone: 'tip' \| 'warn' \| 'note' \| 'risk'`, `title`, `text` | tip = mẹo; warn = lầm tưởng/cẩn thận; note = mở rộng; risk = cảnh báo có thể mất tiền. |
| `example` | `title`, `text` | Tình huống cụ thể, nên có con số. |
| `analogy` | `text` | Phép so sánh đời thường. |
| `table` | `head: []`, `rows: [[]]` | Bảng so sánh. |
| `steps` | `items: [{title, text}]` | Quy trình có thứ tự thật sự. |
| `formula` | `title`, `expr`, `vars: [['ký hiệu','ý nghĩa']]`, `note?` | Công thức. `expr` viết dạng chữ, ví dụ `Khối lượng = Số tiền rủi ro ÷ (Giá vào − Giá dừng lỗ)`. |
| `calc` | `title`, `rows: [['Bước', 'Phép tính / giá trị']]`, `result` | Ví dụ tính toán từng bước bằng số cụ thể. Các con số PHẢI tính đúng. |
| `scenario` | `title`, `setup`, `bad`, `good` | So sánh trader cảm tính (`bad`) với trader có kế hoạch (`good`) trong cùng tình huống. |
| `figure` | `name`, `caption` | Hình minh hoạ vẽ sẵn. `name` là một trong danh sách FIGURES bên dưới. |
| `tool` | `name`, `note?` | Nhúng công cụ tính tương tác ngay trong bài. `name` là một trong danh sách TOOLS. |
| `checklist` | `title`, `items: []` | Danh sách tick được (người học tự đánh dấu). |
| `quote` | `text`, `cite` | Trích dẫn ngắn có nguồn thật. |

### FIGURES (hình vẽ sẵn)

| name | Nội dung |
|---|---|
| `candle-anatomy` | Giải phẫu nến tăng/giảm: giá mở, đóng, cao, thấp, thân, bóng. |
| `candle-patterns` | Doji, búa (hammer), sao băng (shooting star), nhấn chìm tăng, nhấn chìm giảm. |
| `trend-structure` | Xu hướng tăng (HH/HL), giảm (LH/LL), đi ngang. |
| `support-resistance` | Vùng hỗ trợ và kháng cự, giá chạm nhiều lần. |
| `breakout-retest` | Phá kháng cự, quay lại kiểm tra, kháng cự thành hỗ trợ. |
| `false-breakout` | Phá vỡ giả: giá vượt vùng rồi quay đầu. |
| `range-market` | Thị trường đi ngang trong biên độ. |
| `order-book` | Sổ lệnh: bên mua (bid), bên bán (ask), spread, độ sâu. |
| `volume-breakout` | Breakout có volume lớn vs breakout volume yếu. |
| `moving-averages` | Giá với EMA 20 và EMA 50, giao cắt. |
| `rsi-divergence` | Giá và RSI, vùng 70/30, phân kỳ giảm. |
| `macd` | Giá, đường MACD, đường tín hiệu, histogram. |
| `fibonacci` | Fibonacci thoái lui 0.382 / 0.5 / 0.618 trên một sóng tăng. |
| `head-shoulders` | Mô hình vai đầu vai với đường viền cổ. |
| `multi-timeframe` | Ba khung: D1 định hướng, H4 vùng giá, H1 điểm vào. |
| `trade-plan` | Kế hoạch lệnh: điểm vào, dừng lỗ, chốt lời 1R/2R/3R. |
| `leverage-liquidation` | Khoảng cách tới giá thanh lý theo đòn bẩy 2x đến 100x. |
| `funding-mechanism` | Giá perpetual so với giá chỉ số, ai trả funding cho ai. |
| `drawdown-recovery` | Mức lỗ và mức lãi cần để hoà vốn. |
| `equity-curves` | Mô phỏng đường vốn khi rủi ro 1%, 5%, 20% mỗi lệnh (cùng chuỗi lệnh). |
| `dca` | Mua định kỳ: giá thay đổi, giá vốn trung bình. |
| `market-cycle` | Chu kỳ: tích lũy, tăng giá, phân phối, giảm giá. |
| `emotion-cycle` | Vòng cảm xúc của nhà đầu tư theo giá. |

### TOOLS (công cụ tính nhúng)

| name | Công cụ |
|---|---|
| `position-size` | Khối lượng lệnh theo % rủi ro, giá vào, giá dừng lỗ. |
| `liquidation` | Giá thanh lý gần đúng (isolated) theo đòn bẩy và ký quỹ duy trì. |
| `rr` | Tỷ lệ R:R và tỷ lệ thắng hoà vốn. |
| `expectancy` | Kỳ vọng mỗi lệnh từ tỷ lệ thắng, R thắng, R thua. |
| `drawdown` | Lỗ X% cần lãi bao nhiêu %, và chuỗi thua liên tiếp. |
| `dca` | Giá vốn trung bình sau nhiều lần mua. |
| `funding` | Chi phí funding khi giữ vị thế N ngày. |
| `order-plan` | Lập lệnh theo vốn nhỏ: mức tối thiểu của sàn, phí theo % R, đòn bẩy cần và đòn bẩy an toàn tối đa. |

## Quy tắc viết
- Tiếng Việt tự nhiên, xưng "bạn", câu ngắn. Giải thích thuật ngữ tiếng Anh lần đầu: "dừng lỗ (stop loss)".
- Mỗi bài 1100–1700 từ nội dung, 4–6 mục `h`, ít nhất 1 `example` hoặc `calc` có con số, ít nhất 1 `figure` hoặc `tool` khi phù hợp, 1 `scenario` khi nói về hành vi.
- 4 câu quiz (4 lựa chọn), ưu tiên câu tình huống có tính toán. Rải vị trí đáp án đúng.
- 2–4 `sources` thật, đã mở và kiểm tra: tài liệu chính thức của sàn, Binance Academy, Investopedia, CFTC/SEC/ESMA, BIS, nghiên cứu học thuật, văn bản pháp luật Việt Nam.
- Chính xác về sự kiện. Không bịa số liệu, không bịa trích dẫn. Không chắc thì diễn đạt định tính.
- Không hứa lợi nhuận, không gọi kèo, không khuyên mua coin cụ thể. Ví dụ dùng BTC/ETH với giá tròn giả định và ghi rõ "giả định".
- `answer` là chỉ số 0-based.
