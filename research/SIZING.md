# Dữ liệu quy mô lệnh (Playwright + API công khai Binance Futures, 27/09/2026)

## Quy tắc lệnh tối thiểu (GET https://fapi.binance.com/fapi/v1/exchangeInfo)
| Hợp đồng | Giá trị lệnh tối thiểu (MIN_NOTIONAL) | Bước khối lượng / tối thiểu | Ghi chú |
|---|---|---|---|
| BTCUSDT | 50 USDT | 0,001 BTC | BTC ≈ 84.750 → 0,001 BTC ≈ 85 USDT, nên lệnh BTC nhỏ nhất thực tế ≈ 85 USDT danh nghĩa |
| ETHUSDT | 20 USDT | 0,001 ETH | ETH ≈ 2.715 → 0,001 ETH ≈ 2,7 USDT; ràng buộc là 20 USDT |
| SOLUSDT, BNBUSDT, XRPUSDT, DOGEUSDT | 5 USDT | 0,01 / 0,01 / 0,1 / 1 | |
Quy tắc thay đổi theo thời gian: luôn xem Trading Rules trên sàn. Nguồn: https://fapi.binance.com/fapi/v1/exchangeInfo và https://www.binance.com/en/futures/trading-rules/perpetual

## Phí USDⓈ-M Futures (https://www.binance.com/en/fee/futureFee, đã mở 27/09/2026)
- Người dùng thường (< 5 triệu USD khối lượng 30 ngày): **maker 0,0200% / taker 0,0500%**; trả phí bằng BNB giảm 10%: 0,0180% / 0,0450%.
- Market order luôn là taker; limit chờ trong sổ lệnh là maker (https://www.binance.com/en/support/faq/detail/360033544231).
- Dừng lỗ stop-market khi kích hoạt là lệnh market → taker.

## Giới hạn đòn bẩy (https://www.binance.com/en/support/faq/detail/360033162192)
- Từ 07/12/2025: tài khoản futures mở dưới 30 ngày không dùng được đòn bẩy trên 20x.
- Từ 12/08/2025: tài khoản con (sub-account) của người dùng thường tối đa 5x.
- Vị thế càng lớn thì đòn bẩy tối đa càng thấp, tỷ lệ ký quỹ duy trì càng cao (bậc ký quỹ). Chế độ isolated đang có vị thế thì không giảm được đòn bẩy.

## TWAP (https://www.binance.com/en/support/faq/detail/093927599fd54fd48857237f6ebec0b0)
- Thuật toán chia lệnh lớn thành lệnh nhỏ theo thời gian, dành cho người dùng API trên USDⓈ-M Futures. Tối thiểu tương đương 1.000 USDT; thời gian 5 phút đến 24 giờ; tối đa 50 triệu USDT với BTCUSDT, 25 triệu với ETHUSDT, 5 triệu với hợp đồng khác. Dùng khi lệnh lớn hơn thanh khoản sẵn có trên sổ lệnh.

## ATR(14) thật, tính theo % giá (klines Binance Futures, 500 nến gần nhất đến 27/09/2026)
| Cặp | 15 phút | 1 giờ | 4 giờ | 1 ngày |
|---|---|---|---|---|
| BTCUSDT | 0,25% (p90 0,39%) | 0,53% (0,73%) | 1,01% (1,44%) | 2,98% (4,54%) |
| ETHUSDT | 0,33% (0,51%) | 0,74% (0,97%) | 1,41% (1,87%) | 4,84% (6,94%) |
| SOLUSDT | 0,44% (0,72%) | 0,91% (1,17%) | 1,60% (2,19%) | 5,57% (8,18%) |
| XRPUSDT | 0,63% (0,98%) | 1,08% (1,60%) | 1,52% (3,04%) | 5,05% (7,43%) |
| DOGEUSDT | 0,64% (0,98%) | 1,07% (1,72%) | 1,64% (2,97%) | 6,11% (8,47%) |
Số chính là trung vị; trong ngoặc là phân vị 90 (10% thời gian biến động lớn hơn). Khung 15m tính trên 5 ngày, 1h trên ~3 tuần, 4h trên ~3 tháng, 1d trên ~16 tháng. Đây là ảnh chụp một giai đoạn, không phải hằng số.

## Độ sâu sổ lệnh và trượt giá (GET /fapi/v1/depth?limit=1000, chụp 27/09/2026, thị trường yên)
| Cặp | Spread | Thanh khoản bên bán trong 0,1% | Trượt giá mua market 10.000 / 100.000 / 1.000.000 USDT |
|---|---|---|---|
| BTCUSDT | ~0,0001% | ~18,6 triệu USDT | ~0,0001% / ~0,0001% / ~0,0001% |
| ETHUSDT | ~0,0004% | ~7,9 triệu USDT | 0,0002% / 0,0023% / 0,0164% |
| SOLUSDT | ~0,008% | ~1,24 triệu USDT | 0,004% / 0,0075% / 0,047% |
| DOGEUSDT | ~0,010% | ~0,46 triệu USDT | 0,005% / 0,018% / 0,098% |
Lúc biến động mạnh (tin CPI, ngày 10/10/2025) sổ lệnh mỏng đi rất nhiều và trượt giá tăng vọt; đây là số lúc bình thường. Altcoin nhỏ hơn có thanh khoản kém hơn nhiều bậc.

## Công thức cốt lõi (tự suy ra, kiểm bằng số)
1. Rủi ro (USDT) = Giá trị danh nghĩa × % dừng lỗ. Đòn bẩy không có trong công thức.
2. Giá trị danh nghĩa = R ÷ % dừng lỗ. Ký quỹ = Giá trị danh nghĩa ÷ Đòn bẩy. Nghĩa là **đòn bẩy là kết quả** của việc bạn muốn bỏ bao nhiêu ký quỹ, không phải đầu vào.
3. Với "lệnh 10–20 USDT" (ký quỹ M, đòn bẩy L): rủi ro = M × L × % dừng lỗ. Ví dụ M = 10, L = 20, dừng lỗ 1% → rủi ro 2 USDT. Để 2 USDT ≤ 1% tài khoản thì tài khoản ≥ 200 USDT.
4. Ràng buộc lệnh tối thiểu: R tối thiểu = Giá trị lệnh tối thiểu × % dừng lỗ. Dừng lỗ tối đa cho phép = R ÷ Giá trị lệnh tối thiểu. Ví dụ BTC (≈85 USDT), R = 0,5 USDT → dừng lỗ tối đa ≈ 0,59%.
5. Phí khứ hồi tính theo R = (phí vào + phí ra) ÷ % dừng lỗ. Taker + taker = 0,10%: dừng lỗ 0,25% → 40% R; 0,5% → 20% R; 1% → 10% R; 1,5% → 6,7% R. Maker vào + taker ra = 0,07%: 1% → 7% R.
6. Tỷ lệ thắng hoà vốn có phí với R:R = k: WR ≥ (1 + c) ÷ (1 + k), trong đó c = phí khứ hồi tính theo R. Ví dụ k = 2, c = 0,4 → cần thắng 46,7% chỉ để hoà; c = 0,07 → 35,7%.
7. Đòn bẩy tối đa để giá thanh lý cách xa ít nhất 3 lần khoảng dừng lỗ: L ≤ 1 ÷ (3 × % dừng lỗ + MMR). Dừng lỗ 1%, MMR 0,5% → L ≤ 28x; dừng lỗ 2% → L ≤ 15x.
