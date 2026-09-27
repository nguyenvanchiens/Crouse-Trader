# Nhiệm vụ biên soạn bài học: khóa "Sổ Lệnh" (giao dịch crypto Spot & Futures có kỷ luật)

Dự án: D:\AI\Crouse-Trader (React + Vite). Người học: người Việt, nhiều người đã từng thua lỗ vì trade theo cảm tính, muốn học bài bản để giao dịch có quy trình. Đây là chủ đề liên quan đến tiền thật, nên độ chính xác là yêu cầu số 1.

## Đọc trước khi viết (bắt buộc)
1. `src/data/SCHEMA.md`: định dạng dữ liệu, các loại block, danh sách FIGURES và TOOLS được phép. Chỉ dùng đúng tên trong danh sách.
2. `src/data/curriculum.js`: tiêu đề và `brief` (phạm vi) của từng bài. Bám sát brief, không lấn sang phạm vi bài khác (có thể nhắc "xem bài X.Y").
3. `research/FACTS.md` và `research/FUTURES.md`: dữ kiện đã xác minh bằng trình duyệt. Dùng đúng các con số này để mọi bài nhất quán.

## Nghiên cứu thêm
- Dùng WebSearch và WebFetch để kiểm chứng mọi dữ kiện không có trong FACTS/FUTURES. KHÔNG dùng công cụ Playwright/browser (trình duyệt đang được dùng chung, sẽ xung đột).
- Nguồn ưu tiên: tài liệu chính thức của sàn (Binance FAQ/Academy), CFTC, SEC, ESMA, BIS, Fed, StockCharts ChartSchool, Investopedia, Babypips, CME Group Education, nghiên cứu học thuật (SSRN), văn bản pháp luật trên chinhphu.vn / thuvienphapluat.vn.
- Mỗi `sources` phải là URL bạn đã mở được và thấy nội dung khớp. Không bịa URL, không bịa trích dẫn, không bịa số liệu. Không chắc thì viết định tính.

## Tiêu chuẩn nội dung
- Tiếng Việt tự nhiên, xưng "bạn", câu ngắn, rõ. Thuật ngữ tiếng Anh giải thích ở lần đầu: "dừng lỗ (stop loss)".
- Mỗi bài 1300–2000 từ phần blocks (bài chương 5 phần setup/vào lệnh/dừng lỗ/quản lý lệnh: 1800–2600 từ, thật chi tiết), 4–6 mục `h`.
- Mỗi bài phải có: ít nhất 1 `calc` hoặc `example` với con số cụ thể (tính đúng từng phép, tự kiểm lại bằng node), ít nhất 1 `figure` hoặc `tool` phù hợp, 1 `scenario` (trader cảm tính vs trader có kế hoạch) khi bài liên quan đến hành vi, `callout` tone 'risk' ở chỗ có thể mất tiền.
- Tính toán: dùng giá giả định tròn (ví dụ BTC 80.000 USDT, ETH 3.000 USDT, tài khoản 1.000 USDT hoặc 20 triệu đồng) và ghi rõ "giả định". Định dạng số kiểu Việt Nam: 80.000; 1,5%; 0,01%.
- Mục tiêu thực dụng: sau mỗi bài người học làm được việc cụ thể. Có quy tắc rõ ràng, điều kiện cụ thể, không nói chung chung.
- Không gọi kèo, không hứa lợi nhuận, không khuyên mua coin cụ thể, không quảng cáo sàn. Futures: luôn nhấn mạnh rủi ro, luyện trên Demo Trading trước. Nhắc khung pháp lý Việt Nam khi phù hợp (xem FACTS).
- `keyPoints` 4–6 ý; `practice` 2–4 bài tập làm ngay; `quiz` 4 câu, 4 lựa chọn, ưu tiên câu tình huống/tính toán, `answer` 0-based, rải vị trí đáp án đúng (không dồn một vị trí), `explain` giải thích cả vì sao các lựa chọn khác sai.
- `video` (tuỳ chọn): chỉ thêm nếu tìm được video YouTube giáo dục uy tín đúng chủ đề (ví dụ Binance Academy, The Plain Bagel, Whiteboard Crypto, Coin Bureau, Rayner Teo) VÀ đã xác minh tồn tại bằng WebFetch tới `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json` (trả về title, author_name). Ghi đúng title và channel từ oEmbed. Không chắc thì bỏ.
- `updated: '2026-09'`, `level` theo độ khó, `duration` = số từ / 180 làm tròn.

## Kỹ thuật
- Ghi file ES module đúng như SCHEMA (`const lessons = {...}; export default lessons;`). Dùng dấu nháy đơn cho chuỗi; nếu chuỗi có dấu nháy đơn thì dùng template literal hoặc escape.
- Sau khi ghi, kiểm tra cú pháp và cấu trúc bằng:
  `node -e "import('file:///D:/AI/Crouse-Trader/src/data/lessons/<TÊN_FILE>').then(m=>{const L=m.default;for(const[k,d]of Object.entries(L)){const w=JSON.stringify(d.blocks).split(/\s+/).length;console.log(k,w,'từ',d.quiz.length,'quiz',d.quiz.map(q=>q.answer).join(''))}})"`
- Kiểm lại mọi phép tính trong `calc` bằng node trước khi hoàn tất.
- Chỉ tạo/sửa đúng file được giao. Không sửa file khác trong dự án.

## Báo cáo cuối
Trả về ngắn gọn: file đã ghi, số bài, số từ mỗi bài, danh sách nguồn đã dùng, và bất kỳ dữ kiện nào bạn không xác minh được nên đã bỏ.
