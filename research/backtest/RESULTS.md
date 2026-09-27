# Kết quả backtest hệ thống mẫu bài 7.1 (chạy ngày 27/09/2026)

Dữ liệu: API công khai Binance USDⓈ-M Futures, nến D1/H4 và funding lịch sử, BTCUSDT và ETHUSDT 01/01/2020 → 26/09/2026 (SOLUSDT từ 09/2020 để kiểm tra ngoài phạm vi).
Chạy lại: `node download.mjs` (tải dữ liệu), `node backtest.mjs`, `node analyze.mjs`, `node extra.mjs`.

## Giả định
- Đúng quy tắc bài 7.1: lọc xu hướng D1 (EMA20/50 + cấu trúc đỉnh/đáy 2-2), vào H4 khi hồi về vùng EMA20–50 rồi có nến đóng vượt đỉnh (thủng đáy) nến trước, dừng lỗ = đáy/đỉnh nhịp hồi ∓ 0,5 ATR(14), bỏ nếu dừng lỗ > 3 ATR; chốt 50% tại 2R, dời dừng lỗ về giá vào + phí, phần còn lại Chandelier 22/3; dừng lỗ thời gian 12 nến nếu chưa đạt 1R; rủi ro 1%, tối đa 2 lệnh mở; nghỉ 48 giờ sau 3 lệnh thua; dừng tháng khi sụt 6%; bỏ lệnh khi funding ≥ 0,05% theo chiều lệnh.
- Phí taker 0,05% (vào, dừng lỗ, thoát theo thời gian), maker 0,02% (chốt 2R), trượt giá 0,02% mỗi lệnh market, funding thật.
- Nến chạm cả dừng lỗ và mục tiêu: tính dừng lỗ trước.
- Chưa có: bộ lọc giờ tin CPI/FOMC/NFP; làm tròn bước khối lượng.

## Kết quả chính
| | Giá trị |
|---|---|
| Số lệnh | 455 |
| Tỷ lệ thắng | 38% (thắng TB +1,42R, thua TB −0,85R) |
| Kỳ vọng | +0,016R/lệnh, tổng +7,1R |
| Profit factor | 1,03 |
| Chi phí | phí 0,030R + funding 0,017R mỗi lệnh |
| Không chi phí | +0,057R/lệnh |
| Sụt giảm tối đa | 30% (rủi ro 1%), chuỗi thua dài nhất 12 |
| 2020–2023 / 2024–2026 | +0,093R (285 lệnh) / −0,119R (171 lệnh) |
| SOL (ngoài phạm vi) | −0,046R (202 lệnh) |
| Ngẫu nhiên (200 lần) | trung vị +0,027R; 54% số lần ≥ hệ thống |

Theo năm (R/lệnh): 2020 +0,268 · 2021 +0,108 · 2022 +0,062 · 2023 −0,012 · 2024 −0,072 · 2025 −0,185 · 2026 −0,085.

## Cùng chuỗi lệnh, đổi % rủi ro
| Rủi ro/lệnh | Vốn cuối | Sụt giảm tối đa |
|---|---|---|
| 0,5% | 102% | 16% |
| 1% | 103% | 30% |
| 2% | 97% | 53% |
| 5% | 51% | 90% |
| 10% | 4% | 100% |

## Tham chiếu: Donchian 55/20 D1, dừng lỗ 2 ATR(20), BTC/ETH/SOL, có phí và funding
89 lệnh, thắng 39%, +1,747R/lệnh, PF 4,37. Nhưng 2020–2023: +2,88R (52 lệnh); 2024–2026: +0,154R (37 lệnh). Long +3,19R (49 lệnh), short −0,02R (40 lệnh). Lợi nhuận tập trung ở các đợt tăng lớn 2020–2021; mẫu gần đây quá nhỏ để kết luận.

## Kết luận
- Hệ thống mẫu bài 7.1: không có lợi thế. Không dùng để giao dịch.
- Quản trị rủi ro (1%/lệnh) được xác nhận: cùng các lệnh, rủi ro nhỏ giữ vốn, rủi ro lớn phá tài khoản.
- Chi phí (phí + funding ≈ 0,047R/lệnh) đủ lớn để xoá một lợi thế mỏng.

# Kiểm tra tiếp: theo xu hướng khung ngày (trend.mjs, trend2.mjs, trend3.mjs)

Quy trình cố định trước: chọn tham số trên BTC, ETH 2020–2023 (lưới 48 biến thể Donchian N/M/K, long+short hoặc chỉ long, có/không lọc SMA200); kiểm tra 1: BTC, ETH 2024–09/2026; kiểm tra 2: 10 đồng chưa dùng; so với ngẫu nhiên. Tiêu chí đạt: kỳ vọng dương cả hai bộ kiểm tra và tỷ lệ ngẫu nhiên ≥ hệ thống dưới 5%.

- Chọn: N100/M10/K2/both. Kiểm tra 1: 28 lệnh, +0,004R. Kiểm tra 2 (2024–2026): 107 lệnh, +0,21R, 5/10 đồng lỗ. Ngẫu nhiên ≥ hệ thống: 25%. **Không đạt.**
- Độ bền: 46/48 biến thể dương trên dữ liệu kiểm tra 2024–2026 (12 mã), trung vị +0,40R.
- Tham số kinh điển (xem sau khi biết dữ liệu kiểm tra, nên chỉ mang tính tham khảo), 12 mã 2024–2026: Turtle 20/10 +0,26R (342 lệnh, ngẫu nhiên ≥: 4,3%); 55/20 +0,34R (174 lệnh, 6,7%); 55/20 chỉ long +0,66R (100 lệnh, 9,0%); 100/50 −0,10R (70,7%).
- Danh mục 55/20, rủi ro 1%, tối đa 3 lệnh: 2024–2026 +24% (CAGR 8,5%, DD 10,5%); 2020–2026 +182% (CAGR 18,2%, DD 16,9%), chuỗi thua dài nhất 12. Mua giữ BTC 2024–2026 +99%, ETH +18%.
- Kết luận: chưa hệ thống nào đạt chuẩn. Turtle 55/20 là ứng viên để forward test trên demo. Hạn chế: thiên kiến sống sót (chỉ đồng còn niêm yết), trượt giá giả định, danh mục chọn lệnh theo thứ tự đến trước.
