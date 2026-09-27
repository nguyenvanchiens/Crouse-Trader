# Sổ Lệnh: khóa học giao dịch crypto Spot và Futures có kỷ luật

Website khóa học tiếng Việt, viết bằng React (Vite + React Router). 7 chương, 43 bài, mỗi bài có bài đọc, hình minh hoạ vẽ bằng SVG, ví dụ tính toán, tình huống "trader cảm tính và trader có kế hoạch", 4 câu kiểm tra, nguồn tham khảo đã kiểm chứng và ghi chú. Có 8 công cụ tính, checklist trước lệnh, nhật ký giao dịch tính theo R, từ điển 90 thuật ngữ và chứng nhận hoàn thành. Nội dung cập nhật 27/09/2026.

## Chạy

```bash
npm install
npm run dev               # http://localhost:5392
npm run build             # kiểm tra dữ liệu bài học rồi xuất bản tĩnh ra dist/
npm run preview           # xem thử bản build
npm run deploy            # build và deploy lên Cloudflare Workers
npm run validate:lessons  # kiểm tra dữ liệu bài học
```

## Deploy

Trang tĩnh, deploy giống dự án Crouse-AI: Cloudflare Workers (`wrangler.jsonc`, SPA fallback) hoặc Cloudflare Pages (build `npm run build`, thư mục `dist`). `public/_headers` đặt CSP và cache.

## Cấu trúc

```
research/                 Dữ kiện đã xác minh (tra bằng Playwright), dùng khi biên soạn
  FACTS.md                thống kê thua lỗ, sự kiện thị trường, pháp lý và thuế Việt Nam
  FUTURES.md              mark price, lệnh stop, thanh lý, ADL, funding, ATR, giờ tin
  SIZING.md               lệnh tối thiểu, phí, ATR thật, độ sâu sổ lệnh (API Binance)
src/
  data/curriculum.js      7 chương, 43 bài (kèm phạm vi từng bài)
  data/lessons/*.js       nội dung bài học (định dạng: data/SCHEMA.md)
  data/glossary.js        thuật ngữ
  components/Chart.jsx    công cụ vẽ nến SVG
  components/Figures.jsx  23 hình minh hoạ
  components/Tools.jsx    8 công cụ tính
  pages/                  Home, Learn, ToolsPage, Journal, Dashboard, Glossary, Certificate
```

## Đường dẫn

| Trang | URL |
| --- | --- |
| Giới thiệu khóa học | `/` |
| Trình học | `/bai-hoc/:id?tab=kiem-tra\|nguon\|ghi-chu` |
| Công cụ tính | `/cong-cu?c=position-size\|order-plan\|liquidation\|rr\|expectancy\|drawdown\|funding\|dca` |
| Nhật ký lệnh | `/nhat-ky` |
| Học của tôi | `/hoc-cua-toi` |
| Thuật ngữ | `/thuat-ngu` |
| Chứng nhận | `/chung-nhan` |

## Cập nhật nội dung

Pháp lý, phí sàn, mức lệnh tối thiểu và giá thay đổi theo thời gian. Khi cập nhật, sửa `research/*.md` trước, rồi sửa bài liên quan trong `src/data/lessons/` và chạy `npm run validate:lessons`.

Nội dung chỉ nhằm mục đích giáo dục, không phải tư vấn đầu tư, pháp lý hay thuế.
