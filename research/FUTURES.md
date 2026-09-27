# Tư liệu Futures đã xác minh (Playwright, 27/09/2026)

Bổ sung cho FACTS.md. Tất cả trích từ trang gốc đã mở.

## Mark price, last price, index price (Binance)
- **Last price**: giá khớp gần nhất của hợp đồng. Dùng cho giao dịch thực tế và tính PnL đã chốt (realized).
- **Mark price**: giá trị hợp lý ước tính, kết hợp last price, bid1/ask1 của sổ lệnh, funding rate và giá giao ngay trung bình trên nhiều sàn lớn. Dùng để **kích hoạt thanh lý** và tính **PnL chưa chốt (unrealized)**. Mục đích: tránh bị thanh lý oan do một cú giật giá tức thời hoặc bị thao túng trên một sổ lệnh.
- Binance ví von: mark price giống giá xăng trung bình cả nước, last price là giá ở cây xăng gần nhà bạn.
- **Price index**: trung bình có trọng số giá giao ngay trên nhiều sàn (Binance, OKX, Coinbase, Kraken, Bybit, Bitget, KuCoin...). Nếu một nguồn lệch quá 3% so với trung vị thì bị giới hạn (với BTCUSDT/ETHUSDT là 1%).
- Công thức: Mark Price = Trung vị(Giá 1, Giá 2, Giá hợp đồng); Giá 1 = Price Index × (1 + Funding rate gần nhất × thời gian tới lần funding kế tiếp / chu kỳ funding); Giá 2 = Price Index + trung bình trượt 30 giây của (giá giữa bid1/ask1 − Price Index).
- Nguồn: https://www.binance.com/en/blog/futures/5704082076024731087 ; https://www.binance.com/en/support/faq/detail/360033525071

## Lệnh stop trên Binance Futures
- Có 2 loại: **Stop-Limit** và **Stop-Market**.
- Stop-Limit: khi giá chạm stop price (giá kích hoạt), một lệnh limit được đặt vào sổ lệnh. Binance khuyên đặt giá kích hoạt cao hơn giá limit một chút với lệnh bán (thấp hơn với lệnh mua) để tăng khả năng khớp. **Rủi ro: thị trường lao qua giá limit thì lệnh không khớp, vị thế vẫn mở.**
- Stop-Market: khi chạm giá kích hoạt, gửi lệnh market. **Luôn khớp (nếu còn thanh khoản) nhưng có thể trượt giá** khi biến động mạnh.
- Giá kích hoạt: có thể chọn **Last Price hoặc Mark Price**. Mặc định: Stop-Limit dùng Last Price, Stop-Market dùng Mark Price.
- Hệ thống tự từ chối lệnh không qua kiểm tra ký quỹ hoặc vượt giới hạn vị thế.
- Nguồn: https://www.binance.com/en/support/faq/detail/360036351051
- Hàm ý cho người học: **dừng lỗ của vị thế futures nên là Stop-Market** (chấp nhận trượt giá nhỏ để chắc chắn thoát), không dùng Stop-Limit cho dừng lỗ khẩn cấp.

## Price Protection (bảo vệ giá)
- Khi chênh lệch giữa Last price và Mark price vượt ngưỡng định sẵn, Price Protection **chặn không cho lệnh TP/SL kích hoạt**. Bật/tắt theo từng lệnh; không áp dụng với lệnh qua API.
- Ví dụ của Binance: BTCUSDT 25.000; TP market kích hoạt theo Mark ở 26.000; biến động làm Mark vọt 27.125 (lệch ~6,5% so với Last) → không có bảo vệ thì TP kích hoạt sớm, khớp gần 25.500; có bảo vệ ngưỡng 5% thì lệnh bị chặn, chờ điều kiện bình thường.
- Nhược điểm Binance tự nêu: trong biến động thật, bảo vệ giá có thể **ngăn cả lệnh thoát quản trị rủi ro**.
- Nguồn: https://www.binance.com/en/support/faq/detail/2b9dc811ce7340469357867122b975dc

## Quy trình thanh lý (Liquidation Protocols)
- Thanh lý kích hoạt khi: Tài sản ký quỹ = Ký quỹ ban đầu + PnL đã chốt + PnL chưa chốt < Ký quỹ duy trì.
- Tỷ lệ ký quỹ (Margin Ratio) = Ký quỹ duy trì / Số dư ký quỹ. Thanh lý khi đạt 100%. **Binance khuyến nghị giữ dưới 80%.**
- Vị thế càng lớn thì ký quỹ yêu cầu càng cao, đòn bẩy tối đa càng thấp (bậc ký quỹ).
- Khi biến động cực mạnh, mark price có thể nhảy vọt (ví dụ của Binance: short BTC, giá thanh lý tính là 17.006 nhưng mark nhảy từ 17.000 lên 17.100 trong một giây, vị thế bị thanh lý ở 17.100). Giá thanh lý thực tế có thể tệ hơn giá hiển thị.
- Khi bị thanh lý: mọi lệnh chờ (cross: tất cả; isolated: cùng token) bị hủy ngay.
- Vị thế nhỏ dễ bị thanh lý toàn bộ hơn vị thế lớn (vì ký quỹ duy trì hiệu dụng có thể thấp hơn phí thanh lý).
- Nguồn: https://www.binance.com/en/support/faq/detail/360033525271

## ADL (tự động giảm đòn bẩy) và quỹ bảo hiểm
- ADL là bước cuối của quy trình thanh lý, chỉ xảy ra khi **quỹ bảo hiểm không tiếp nhận được vị thế phá sản**.
- Vị thế **đang lãi** của người khác bị đóng bớt theo thứ hạng ưu tiên, dựa trên % lãi và đòn bẩy hiệu dụng: lãi nhiều và đòn bẩy cao bị xếp trước. Đóng tại giá phá sản (bankruptcy price) của lệnh bị thanh lý. Không tính phí giao dịch.
- Hợp đồng COIN-M dễ bị ADL hơn USDⓈ-M vì quỹ bảo hiểm dùng chung theo tài sản ký quỹ nên nhỏ hơn.
- Giá phá sản: giá mà tại đó lỗ bằng toàn bộ ký quỹ (số dư ký quỹ về 0).
- Công thức xếp hạng: % PnL = Lãi chưa chốt / |Giá trị danh nghĩa|; Đòn bẩy hiệu dụng = |Giá trị danh nghĩa| / (Số dư + Lãi chưa chốt); nếu % PnL ≥ 0 thì hạng = % PnL × Đòn bẩy hiệu dụng.
- Nguồn: https://www.binance.com/en/support/faq/detail/360033525471

## One-way mode và Hedge mode
- One-way: mỗi hợp đồng chỉ giữ một chiều; mở lệnh ngược chiều sẽ giảm/đóng vị thế hiện có.
- Hedge: giữ đồng thời long và short trên cùng hợp đồng. Ví dụ Binance: long 1 BTC + short 0,5 BTC ở 22.000; giá lên 24.000 lãi ròng (1 − 0,5) × 2.000 = 1.000; giá xuống 19.000 lỗ ròng (1 − 0,5) × 3.000 = 1.500, thay vì 3.000 nếu chỉ long.
- Không đổi được chế độ khi đang có vị thế hoặc lệnh chờ. Ở hedge mode + cross, long và short cùng mã dùng chung giá thanh lý.
- Nguồn: https://www.binance.com/en/support/faq/detail/360041513552

## Open interest (Binance Academy)
- OI = tổng số hợp đồng futures/options đang mở, chưa đóng. Tăng khi có người mua mới và người bán mới cùng mở vị thế; giảm khi hai bên cùng đóng; giữ nguyên khi hợp đồng chuyển tay.
- Khác volume: volume đếm mọi hợp đồng giao dịch trong kỳ; OI đếm số còn mở tại một thời điểm.
- Giá tăng cùng OI tăng: có thể có tiền mới hỗ trợ; giá giảm cùng OI tăng: áp lực bán khống tăng. Binance nhấn mạnh **OI tự nó không dự đoán hướng giá**, dùng kèm funding để xem một phía có đang đông quá không.
- Dữ liệu: Binance Futures → Data → Trading Data (OI, tỷ lệ long/short, funding).
- Nguồn: https://www.binance.com/en/academy/articles/what-is-open-interest

## Giao dịch thử (Demo Trading)
- Binance đã chuyển "Mock Trading" sang **Binance Demo Trading** (tiền ảo, giao diện thật). Futures Demo tại demo.binance.com; testnet API tại testnet.binancefuture.com.
- Nguồn: https://www.binance.com/en/support/faq/detail/b3706b248f2b4b1caabb4bf253bf067f

## ATR và dừng lỗ theo biến động (StockCharts ChartSchool)
- ATR do J. Welles Wilder giới thiệu (sách 1978). True Range = lớn nhất trong: (Cao − Thấp), |Cao − Đóng cửa trước|, |Thấp − Đóng cửa trước|. Mặc định 14 kỳ. ATR hiện tại = [(ATR trước × 13) + TR hiện tại] / 14.
- ATR chỉ đo biến động, **không chỉ hướng**. ATR là giá trị tuyệt đối nên không so sánh được giữa các tài sản giá khác nhau (dùng ATR% nếu cần so).
- **Chandelier Exit** (Charles Le Beau, trong sách của Alexander Elder): dừng lỗ kéo theo cho lệnh long = Đỉnh cao nhất 22 kỳ − 3 × ATR(22); short = Đáy thấp nhất 22 kỳ + 3 × ATR(22). Tài sản biến động mạnh cần hệ số lớn hơn.
- Nguồn: https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp ; https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit

## Giờ tin vĩ mô (quy đổi giờ Việt Nam, UTC+7)
- CPI Mỹ (BLS) công bố **8:30 sáng giờ miền Đông Mỹ** → **19:30 giờ VN** khi Mỹ theo giờ mùa hè (EDT, khoảng giữa tháng 3 đến đầu tháng 11), **20:30** khi theo giờ mùa đông (EST). Lịch 2026: 11/9, 14/10, 10/11, 10/12. https://www.bls.gov/schedule/news_release/cpi.htm
- Quyết định lãi suất FOMC công bố **2:00 chiều giờ miền Đông** → **01:00 sáng hôm sau giờ VN** (EDT) hoặc 02:00 (EST); họp báo 30 phút sau. https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm
- Ngày 16/09/2026 FOMC **tăng** lãi suất 0,25 điểm % lên 3,75–4%, bỏ phiếu 12–0, nêu lạm phát vẫn cao. https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm
- Funding Binance mặc định 00:00/08:00/16:00 UTC = **07:00/15:00/23:00 giờ VN**.

## Giờ hoạt động của thị trường
- Eross, Urquhart, Wolfe (Finance Research Letters, 2019), "Time-of-day periodicities of trading volume and volatility in Bitcoin exchange": khối lượng và biến động bitcoin **cao rõ rệt trong giờ giao dịch ban ngày của sàn chứng khoán châu Âu và Mỹ**; giờ mở cửa chứng khoán châu Á ảnh hưởng ít. https://www.sciencedirect.com/science/article/pii/S1544612319301904
- Quy đổi tham khảo (giờ VN): phiên Âu mở khoảng 14:00–15:00; phiên Mỹ (chứng khoán NY mở 9:30 ET) khoảng 20:30 (EDT) / 21:30 (EST).

## R-multiple và kỳ vọng (Van Tharp)
- R là rủi ro ban đầu của lệnh, số tiền bạn chấp nhận mất nếu dừng lỗ kích hoạt. Kết quả mỗi lệnh quy về bội số của R. Kỳ vọng = tổng mỗi R-multiple × xác suất xảy ra. Tỷ lệ thắng cao là thứ yếu so với kỳ vọng R dương. https://vantharp.com/wp-content/uploads/2018/06/A_Short_Lesson_on_R_and_R-multiple.pdf

## Stop hunting (săn dừng lỗ)
- Khái niệm: giá bị đẩy qua vùng tập trung nhiều lệnh dừng lỗ (dưới đáy rõ ràng, trên đỉnh rõ ràng, số tròn) để kích hoạt chúng rồi quay lại. Trên thị trường crypto có đòn bẩy, thanh lý hàng loạt tạo hiệu ứng tương tự (bản đồ thanh lý cho thấy nơi tập trung). Không phải lúc nào cũng là thao túng có chủ đích; thường là do thanh khoản tập trung ở đó.
- Cách phòng: đặt dừng lỗ ở điểm vô hiệu cộng thêm vùng đệm (ví dụ 0,2–0,5 × ATR) ngoài đáy/đỉnh, tránh đặt đúng số tròn; giảm khối lượng để có chỗ đặt dừng lỗ xa hơn mà rủi ro tiền không đổi.
