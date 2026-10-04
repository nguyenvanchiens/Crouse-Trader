# Dữ kiện đã xác minh (tra cứu bằng Playwright, 27/09/2026)

Mỗi dòng có nguồn đã mở và đọc. Dùng chung cho mọi bài để các con số khớp nhau.

## Thống kê người giao dịch nhỏ lẻ
- ESMA (2018): phân tích của các cơ quan quản lý quốc gia ở EU cho thấy **74–89% tài khoản nhà đầu tư nhỏ lẻ giao dịch CFD thường thua lỗ**, lỗ trung bình mỗi khách từ 1.600 đến 29.000 euro. https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors
- Chague, De-Losso, Giovannetti, "Day Trading for a Living?" (2019): quan sát mọi cá nhân bắt đầu day trade hợp đồng tương lai chỉ số chứng khoán Brazil 2013–2015; **97% người kiên trì hơn 300 ngày bị lỗ**; chỉ khoảng 1% kiếm được hơn mức lương tối thiểu. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3423101
- Barber, Lee, Liu, Odean, "The Cross-Section of Speculator Skill" (Journal of Financial Markets, 2014): day trader Đài Loan 1992–2006; **dưới 1% tổng số day trader kiếm được lợi nhuận vượt trội ổn định, có thể dự đoán được sau phí**. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=529063
- BIS Bulletin số 69, "Crypto shocks and retail losses" (2/2023): dữ liệu các ứng dụng giao dịch crypto lớn từ 8/2015 đến 12/2022 cho thấy **phần lớn người dùng ứng dụng crypto ở gần như mọi nền kinh tế bị lỗ với bitcoin nắm giữ**; người mới thường vào khi giá tăng. https://www.bis.org/publ/bisbull69.pdf
- CFTC Customer Advisory "Understand the Risks of Virtual Currency Trading": giao dịch futures bằng tài khoản ký quỹ khuếch đại rủi ro. https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html

## Sự kiện thị trường
- Sàn FTX sụp đổ tháng 11/2022.
- Terra/LUNA và stablecoin UST sụp đổ tháng 5/2022.
- ETF bitcoin giao ngay được SEC Mỹ chấp thuận ngày 10/01/2024.
- Halving lần 4 của Bitcoin: 19–20/04/2024 tại khối 840.000, phần thưởng khối giảm từ 6,25 xuống 3,125 BTC. Halving diễn ra mỗi 210.000 khối (khoảng 4 năm). Cung tối đa 21 triệu BTC. https://bitcoin.org/en/halving , https://www.coingecko.com/en/coins/bitcoin/bitcoin-halving
- Đỉnh lịch sử BTC: khoảng **126.080 USD (tháng 10/2025)** theo CoinGecko. Cuối 9/2026 BTC giao dịch quanh 84.000 USD, tức thấp hơn đỉnh khoảng 33%. Nguồn cung lưu hành khoảng 20,09 triệu BTC. https://www.coingecko.com/en/coins/bitcoin
- **Ngày 10/10/2025**: sau thông báo thuế quan 100% với hàng nhập khẩu Trung Quốc, thị trường crypto chứng kiến đợt thanh lý lớn nhất lịch sử, khoảng **19 tỷ USD vị thế đòn bẩy bị thanh lý trong 24 giờ**, hơn 1,6 triệu tài khoản bị thanh lý. https://www.coingecko.com/learn/october-10-crypto-crash-explained
- Việt Nam: vụ iFan/Pincoin (Công ty Modern Tech, TP.HCM, 2018), khoảng 32.000 người bị thiệt hại, bị tố chiếm đoạt khoảng 15.000 tỷ đồng; Bộ Công an vào cuộc điều tra. https://vnexpress.net/nha-dau-tu-vao-tien-ao-ifan-keu-bi-lua-15-000-ty-dong-3734520.html

## Futures trên Binance (tài liệu chính thức)
- Funding: khoản thanh toán định kỳ giữa bên long và bên short của hợp đồng vĩnh cửu, để neo giá hợp đồng với giá chỉ số giao ngay. Funding dương thì long trả short; âm thì short trả long. Binance không thu phí trên funding.
- Số tiền funding = Giá trị danh nghĩa vị thế × Funding rate (Giá trị danh nghĩa = Mark price × Khối lượng).
- Chu kỳ mặc định 8 giờ: 00:00, 08:00, 16:00 UTC (tức 07:00, 15:00, 23:00 giờ Việt Nam). Chỉ trả/nhận nếu đang giữ vị thế tại thời điểm tính. Sàn có thể đổi chu kỳ khi biến động mạnh.
- Funding rate = [Premium Index (P) + clamp(Lãi suất − P, 0,05%, −0,05%)] ÷ (8 ÷ N), N = số giờ của chu kỳ funding (chu kỳ 8 giờ thì rút gọn thành P + clamp(...)); lãi suất mặc định 0,03%/ngày tức 0,01% mỗi 8 giờ. https://www.binance.com/en/support/faq/detail/360033525031
- Ký quỹ duy trì (maintenance margin) = Giá trị danh nghĩa × Tỷ lệ ký quỹ duy trì của bậc − Số tiền duy trì (maintenance amount) của bậc. Tỷ lệ tăng theo bậc quy mô vị thế. Ví dụ chính thức: 10 BTC × 26.000 = 260.000 USDT, bậc 3: 260.000 × 1% − 1.300 = 1.300 USDT. https://www.binance.com/en/support/faq/detail/b3c689c1f50a44cabb3a84e663b81d93
- Chế độ isolated: chỉ số dư ký quỹ của vị thế đó chịu rủi ro. Cross: toàn bộ số dư ví futures dùng chung, lãi/lỗ các vị thế khác ảnh hưởng giá thanh lý.
- Thanh lý dựa trên **mark price** (giá đánh dấu), không phải last price, để tránh bị thanh lý do thao túng giá tức thời.
- Công thức gần đúng giá thanh lý isolated, bỏ qua phí và số tiền duy trì:
  - Long: Giá thanh lý ≈ Giá vào × (1 − 1/Đòn bẩy + MMR)
  - Short: Giá thanh lý ≈ Giá vào × (1 + 1/Đòn bẩy − MMR)
  - Ví dụ: long BTC giá 80.000, đòn bẩy 10x, MMR 0,4% → ≈ 80.000 × (1 − 0,1 + 0,004) = 72.320.

## Pháp lý và thuế Việt Nam (tính đến 27/09/2026)
- **Luật Công nghiệp công nghệ số số 71/2025/QH15**, hiệu lực từ **01/01/2026**: lần đầu định nghĩa "tài sản số", "tài sản mã hóa" trong luật. https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Luat-Cong-nghiep-cong-nghe-so-2025-so-71-2025-QH15-621341.aspx
- **Nghị quyết 05/2025/NQ-CP** ngày 09/09/2025, hiệu lực ngay, **thí điểm 5 năm** thị trường tài sản mã hóa. Nội dung chính:
  - Chào bán, phát hành, giao dịch, thanh toán tài sản mã hóa phải bằng **Đồng Việt Nam**.
  - Chỉ tổ chức được Bộ Tài chính cấp phép mới được cung cấp dịch vụ và quảng cáo, tiếp thị tài sản mã hóa.
  - Sàn phải có vốn điều lệ tối thiểu **10.000 tỷ đồng**, tối thiểu 65% vốn do tổ chức góp, sở hữu nước ngoài tối đa 49%.
  - Nhà đầu tư trong nước đang có tài sản mã hóa và nhà đầu tư nước ngoài được mở tài khoản tại tổ chức được cấp phép để lưu ký, mua, bán.
  - **Sau 6 tháng kể từ khi tổ chức đầu tiên được cấp phép**, nhà đầu tư trong nước giao dịch không qua tổ chức được cấp phép sẽ bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự tùy mức độ.
  - Chính sách thuế áp dụng như chứng khoán cho đến khi có chính sách riêng.
  - Các dịch vụ được phép: tổ chức thị trường giao dịch, tự doanh, lưu ký, nền tảng phát hành. Nghị quyết **không nhắc đến giao dịch phái sinh/hợp đồng tương lai**.
  - Toàn văn: https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-5-2025-nq-cp-ve-trien-khai-thi-diem-thi-truong-tai-san-ma-hoa-tai-viet-nam-119250909184045221.htm
- **Thông tư 32/2026/TT-BTC** ngày 27/03/2026: cá nhân (cư trú hay không) chuyển nhượng tài sản mã hóa qua tổ chức cung cấp dịch vụ nộp **thuế TNCN 0,1% trên giá chuyển nhượng từng lần**; chuyển nhượng tài sản mã hóa không chịu thuế GTGT; tổ chức Việt Nam nộp thuế TNDN 20% trên thu nhập. https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/chinh-sach-moi/109643/cach-tinh-thue-doi-voi-tai-san-ma-hoa-tai-viet-nam-nam-2026
- **Nghị định 284/2026/NĐ-CP** (ban hành 7/2026), hiệu lực **01/09/2026**: phạt **30–50 triệu đồng** với nhà đầu tư trong nước giao dịch không qua tổ chức được Bộ Tài chính cấp phép; 70–100 triệu nếu giao dịch tài sản mã hóa chỉ dành cho nhà đầu tư nước ngoài; cung cấp dịch vụ hoặc quảng cáo khi chưa được cấp phép: 180–200 triệu (mức cho tổ chức; cá nhân bằng 1/2). https://baochinhphu.vn/cung-cap-dich-vu-lien-quan-den-tai-san-ma-hoa-khi-chua-duoc-cap-phep-bi-phat-toi-200-trieu-dong-10226071715275345.htm
- Theo Báo Thanh Niên 01/09/2026 dẫn lời ông Tô Trần Hòa (Ủy ban Chứng khoán Nhà nước): khi Việt Nam **chưa có sàn được cấp phép chính thức** thì nhà đầu tư chưa bị xử phạt; mức phạt chỉ áp dụng sau 6 tháng kể từ khi sàn đầu tiên được cấp phép. https://thanhnien.vn/tu-19-nha-dau-tu-ca-nhan-giao-dich-tai-san-ma-hoa-se-bi-xu-phat-185260901090323003.htm
- Tháng 5/2026 Bộ Tài chính xác nhận 5 hồ sơ hợp lệ vòng 1 (VIX, Dịch vụ Tài sản số Việt Nam, Việt Nam Thịnh Vượng, Lộc Phát Việt Nam, Techcom). https://vneconomy.vn/bo-tai-chinh-thong-tin-ve-5-ho-so-cap-phep-san-giao-dich-tai-san-ma-hoa.htm
- Luôn nhắc người học: khung pháp lý đang thay đổi nhanh, kiểm tra văn bản mới nhất trên cổng thông tin Chính phủ và Ủy ban Chứng khoán Nhà nước trước khi hành động. Khóa học không phải tư vấn pháp lý.

## Chỉ báo và kiến thức kinh điển
- RSI do J. Welles Wilder giới thiệu trong sách "New Concepts in Technical Trading Systems" (1978), mặc định 14 kỳ.
- MACD do Gerald Appel phát triển cuối thập niên 1970, tham số phổ biến 12, 26, 9.
- Lý thuyết triển vọng (prospect theory), né tránh mất mát: Kahneman & Tversky (1979, Econometrica).
