// Cấu trúc khóa học: 7 chương × các bài học.
// Nội dung chi tiết mỗi bài nằm trong src/data/lessons/chuong-N.js.
// `brief` là phạm vi của bài, dùng khi biên soạn để các bài không chồng lấn nhau.
const CURRICULUM = [
  {
    id: 'c1',
    no: 1,
    name: 'Nền móng',
    title: 'Hiểu thị trường trước khi bấm lệnh',
    tone: 'var(--ch-1)',
    desc: 'Crypto là gì, giá được tạo ra ở đâu, sàn và sổ lệnh vận hành ra sao, pháp lý Việt Nam 2026, và sự thật về tỷ lệ người thua lỗ.',
    outcome: 'Biết mình đang giao dịch cái gì, ở đâu, với luật chơi và chi phí nào.',
    lessons: [
      { id: 'c1-b1', title: 'Sự thật về trader nhỏ lẻ: vì sao đa số thua', brief: 'Số liệu thật (ESMA 74-89%, Brazil 97%, Đài Loan <1%, BIS 2023), vì sao cảm tính giết tài khoản, lời hứa của khóa học: không có kèo, chỉ có quy trình. Khác nhau giữa đầu tư, giao dịch, đánh bạc.' },
      { id: 'c1-b2', title: 'Crypto, blockchain và cách giá được hình thành', brief: 'Bitcoin, Ethereum, altcoin, stablecoin ở mức đủ dùng cho trader; giá = nơi người mua và người bán gặp nhau; vốn hóa, cung lưu hành, FDV; thanh khoản; vì sao crypto biến động mạnh (giao dịch 24/7, đòn bẩy, thanh khoản mỏng ở altcoin).' },
      { id: 'c1-b3', title: 'Sàn giao dịch, sổ lệnh và thanh khoản', brief: 'CEX vs DEX; sổ lệnh (bid/ask), spread, độ sâu thị trường, trượt giá (slippage); maker/taker; khối lượng giả (wash trading) ở sàn nhỏ; chọn sàn theo tiêu chí an toàn (proof of reserves và giới hạn của nó, sự cố FTX 11/2022).' },
      { id: 'c1-b4', title: 'Các loại lệnh và phí giao dịch', brief: 'Market, limit, stop-market, stop-limit, OCO, trailing stop, post-only, reduce-only; khi nào dùng lệnh nào; lệnh stop-limit có thể không khớp; tính phí maker/taker ảnh hưởng thế nào đến lợi nhuận khi giao dịch nhiều.' },
      { id: 'c1-b5', title: 'Bảo mật tài khoản, ví và các chiêu lừa đảo', brief: 'Ví lưu ký vs tự lưu ký, seed phrase, 2FA, whitelist rút tiền, phishing, approve độc hại, pig butchering, nhóm kèo/"chuyên gia" gọi vốn, pump and dump, vụ iFan/Pincoin 15.000 tỷ ở Việt Nam.' },
      { id: 'c1-b6', title: 'Pháp lý và thuế crypto tại Việt Nam 2026', brief: 'Luật Công nghiệp công nghệ số 71/2025/QH15 (hiệu lực 1/1/2026), Nghị quyết 05/2025/NQ-CP (thí điểm 5 năm, giao dịch bằng VND, sàn cấp phép), Nghị định 284/2026/NĐ-CP (phạt 30-50 triệu từ 1/9/2026, điều kiện 6 tháng), Thông tư 32/2026/TT-BTC (thuế TNCN 0,1%/lần). Trạng thái cấp phép đến 9/2026. Futures trên sàn nước ngoài nằm ở đâu trong khung pháp lý. Nhắc người học tự kiểm tra cập nhật.' }
    ]
  },
  {
    id: 'c2',
    no: 2,
    name: 'Đọc biểu đồ',
    title: 'Phân tích kỹ thuật cốt lõi',
    tone: 'var(--ch-2)',
    desc: 'Nến, khung thời gian, xu hướng, hỗ trợ kháng cự, khối lượng và các chỉ báo phổ biến, kèm giới hạn thật của từng công cụ.',
    outcome: 'Đọc được một biểu đồ và mô tả thị trường đang ở trạng thái nào, không đoán mò.',
    lessons: [
      { id: 'c2-b1', title: 'Nến Nhật và khung thời gian', brief: 'OHLC, thân và bóng nến, nến theo khung thời gian (1m đến 1W), giờ đóng nến UTC trên sàn, mẫu nến đơn và đôi phổ biến (doji, búa, nhấn chìm) và vì sao mẫu nến đơn lẻ có độ tin cậy thấp nếu không có bối cảnh.' },
      { id: 'c2-b2', title: 'Xu hướng và cấu trúc thị trường', brief: 'Đỉnh cao hơn/đáy cao hơn (HH/HL), LH/LL, đi ngang; phá vỡ cấu trúc; xác định xu hướng theo quy tắc thay vì cảm giác; đường xu hướng và cách vẽ không "ép".' },
      { id: 'c2-b3', title: 'Hỗ trợ, kháng cự và vùng giá', brief: 'Vì sao hỗ trợ/kháng cự là vùng chứ không phải đường; đổi vai trò (role reversal); phá vỡ giả; số tròn; cách đánh dấu vùng trên khung lớn; lỗi vẽ quá nhiều đường.' },
      { id: 'c2-b4', title: 'Khối lượng giao dịch', brief: 'Volume xác nhận hay phủ nhận chuyển động; breakout có volume; volume profile ở mức giới thiệu (POC, value area); volume sàn đơn lẻ vs tổng hợp; cảnh báo khối lượng giả.' },
      { id: 'c2-b5', title: 'Đường trung bình động', brief: 'SMA vs EMA, công thức ngắn; MA 20/50/200 thường dùng; MA làm bộ lọc xu hướng; giao cắt (golden/death cross) trễ; vì sao MA thua trong thị trường đi ngang.' },
      { id: 'c2-b6', title: 'RSI, MACD và giới hạn của chỉ báo', brief: 'RSI (Wilder 1978, 14 kỳ), vùng 70/30 và vì sao "quá mua" có thể tiếp tục tăng; phân kỳ; MACD (12,26,9); chỉ báo là dẫn xuất từ giá nên trễ; không chồng 5 chỉ báo cùng loại.' },
      { id: 'c2-b7', title: 'Fibonacci, mô hình giá và phân tích đa khung', brief: 'Fibonacci thoái lui (0.382/0.5/0.618) như vùng tham khảo, không phải phép màu; mô hình vai đầu vai, tam giác, cờ; phân tích đa khung thời gian (khung lớn định hướng, khung nhỏ vào lệnh); tỷ lệ 4-6 lần giữa các khung.' }
    ]
  },
  {
    id: 'c3',
    no: 3,
    name: 'Bối cảnh',
    title: 'Cơ bản, on-chain và vĩ mô',
    tone: 'var(--ch-3)',
    desc: 'Biểu đồ chỉ là một nửa câu chuyện. Học cách đánh giá dự án, đọc dòng tiền và hiểu các lực vĩ mô kéo cả thị trường.',
    outcome: 'Biết khi nào nên đứng ngoài và vì sao một đồng coin có thể giảm 90% dù biểu đồ trông đẹp.',
    lessons: [
      { id: 'c3-b1', title: 'Đánh giá dự án và tokenomics', brief: 'Cung, lạm phát token, lịch mở khóa (unlock), FDV vs vốn hóa, phân bổ cho đội ngũ/quỹ, doanh thu thật của giao thức; dấu hiệu dự án rác; ví dụ LUNA/UST 5/2022.' },
      { id: 'c3-b2', title: 'Chu kỳ Bitcoin, halving và vĩ mô', brief: 'Halving (4/2024, khối 840.000, còn 3,125 BTC), chu kỳ lịch sử và vì sao không đảm bảo lặp lại; lãi suất Fed, DXY, thanh khoản toàn cầu; ETF bitcoin giao ngay ở Mỹ (1/2024); đỉnh 10/2025 và các nhịp giảm sau đó; tương quan với chứng khoán công nghệ.' },
      { id: 'c3-b3', title: 'Dữ liệu on-chain và dòng tiền', brief: 'Dòng tiền vào/ra sàn, nguồn cung stablecoin, ví cá voi, dữ liệu phái sinh (open interest, funding) như bức tranh tâm lý; dominance BTC; công cụ miễn phí; cẩn trọng khi diễn giải.' },
      { id: 'c3-b4', title: 'Tin tức, sự kiện và cách không bị FOMO', brief: 'Lịch kinh tế (CPI, FOMC), lịch unlock, niêm yết; "mua tin đồn bán sự thật"; sự kiện 10/10/2025; quy tắc giao dịch quanh tin; kiểm chứng nguồn tin; mạng xã hội và nhóm kèo.' }
    ]
  },
  {
    id: 'c4',
    no: 4,
    name: 'Spot',
    title: 'Giao dịch Spot bài bản',
    tone: 'var(--ch-4)',
    desc: 'Mua bán tài sản thật, không đòn bẩy. Nơi tốt nhất để xây kỷ luật trước khi chạm vào futures.',
    outcome: 'Có một chiến lược spot rõ quy tắc: vào ở đâu, sai ở đâu, chốt ở đâu, bao nhiêu tiền.',
    lessons: [
      { id: 'c4-b1', title: 'DCA và đầu tư định kỳ', brief: 'DCA là gì, so với mua một lần; DCA không cứu được đồng coin chết; DCA có điều kiện; chọn tài sản cho DCA; tính giá vốn trung bình (có ví dụ số).' },
      { id: 'c4-b2', title: 'Chiến lược swing theo xu hướng', brief: 'Mua pullback trong xu hướng tăng, breakout-retest; điều kiện vào lệnh cụ thể; đặt dừng lỗ theo cấu trúc; chốt lời từng phần; ví dụ một lệnh hoàn chỉnh bằng số.' },
      { id: 'c4-b3', title: 'Kế hoạch giao dịch: vào, dừng lỗ, chốt lời', brief: 'Viết trading plan cho một lệnh; điểm vô hiệu (invalidation); dừng lỗ theo cấu trúc vs theo % vs theo ATR; mục tiêu theo vùng; không dời dừng lỗ ra xa; trailing stop.' },
      { id: 'c4-b4', title: 'Quản lý danh mục và phân bổ vốn', brief: 'Tỷ trọng BTC/ETH/altcoin, tiền mặt (stablecoin) là một vị thế, tương quan giữa các altcoin, tái cân bằng, rủi ro stablecoin, không dùng tiền vay/tiền sinh hoạt.' }
    ]
  },
  {
    id: 'c5',
    no: 5,
    name: 'Futures',
    title: 'Futures có kỷ luật: từ cơ chế đến điểm vào và dừng lỗ',
    tone: 'var(--ch-5)',
    desc: 'Phần trọng tâm của khóa học. Cơ chế thật của ký quỹ, đòn bẩy, thanh lý, funding; rồi cách nhận diện setup, chọn thời điểm vào, đặt dừng lỗ đúng chỗ và quản lý lệnh theo quy tắc.',
    outcome: 'Mở một lệnh futures theo quy trình viết sẵn: biết vì sao vào, sai ở đâu, mất tối đa bao nhiêu tiền, và làm gì khi giá chạy.',
    lessons: [
      { id: 'c5-b1', title: 'Futures là gì: perpetual, long và short', brief: 'Hợp đồng tương lai có kỳ hạn vs vĩnh cửu (perpetual); USDⓈ-M vs COIN-M; long/short; lãi lỗ tính trên giá trị danh nghĩa; ví dụ số; futures là trò chơi tổng bằng không trừ phí; ai là đối thủ của bạn (market maker, quỹ, bot).' },
      { id: 'c5-b2', title: 'Đòn bẩy và ký quỹ: cross và isolated', brief: 'Đòn bẩy thật = giá trị vị thế / vốn tài khoản (không phải con số trên thanh trượt); ký quỹ ban đầu, ký quỹ duy trì; cross vs isolated và rủi ro của cross; bậc ký quỹ theo quy mô vị thế; vì sao đòn bẩy không làm tăng lợi thế, chỉ tăng tốc độ.' },
      { id: 'c5-b3', title: 'Giá đánh dấu, thanh lý và ADL', brief: 'Mark price vs last price vs index price; công thức giá thanh lý gần đúng (isolated) và công thức Binance; quỹ bảo hiểm; tự động giảm đòn bẩy (ADL); râu nến quét thanh lý; nguyên tắc: dừng lỗ phải kích hoạt rất lâu trước giá thanh lý.' },
      { id: 'c5-b4', title: 'Funding rate, open interest và dữ liệu phái sinh', brief: 'Funding mỗi 8 giờ (00:00/08:00/16:00 UTC), công thức Binance, ai trả cho ai; chi phí funding khi giữ lệnh lâu; open interest, tỷ lệ long/short, bản đồ thanh lý: đọc như bức tranh đám đông, không phải tín hiệu mua bán; sự kiện 10/10/2025.' },
      { id: 'c5-b5', title: 'Nhận diện setup: khi nào có lý do để vào lệnh', brief: 'Khung 3 lớp: bối cảnh (xu hướng khung lớn) → vùng (hỗ trợ/kháng cự, vùng cung cầu) → kích hoạt (nến xác nhận, phá vỡ cấu trúc khung nhỏ). 3 setup có quy tắc: pullback theo xu hướng, breakout-retest, đảo chiều tại vùng lớn (khó nhất). Điều kiện KHÔNG vào lệnh (giữa biên độ, trước tin lớn, funding cực đoan, vừa thua 2 lệnh). Đánh giá chất lượng setup bằng thang điểm.' },
      { id: 'c5-b6', title: 'Thời điểm vào lệnh và cách khớp lệnh', brief: 'Chờ nến đóng thay vì vào giữa nến; lệnh limit tại vùng vs lệnh stop khi phá vỡ vs market; giờ giao dịch (phiên Á/Âu/Mỹ, giờ ra CPI/FOMC theo giờ Việt Nam, giờ funding); vào lệnh chia phần; khi lỡ tàu thì không đuổi; trượt giá khi biến động.' },
      { id: 'c5-b7', title: 'Đặt dừng lỗ đúng chỗ', brief: 'Dừng lỗ đặt ở điểm vô hiệu của ý tưởng, không đặt theo số tiền muốn mất; dừng lỗ theo cấu trúc (dưới đáy/trên đỉnh gần nhất), theo ATR (1-2×ATR), theo vùng; đệm thêm để tránh râu nến và vùng tập trung stop; trigger theo Mark price vs Last price trên Binance; stop-market vs stop-limit trên futures (stop-limit có thể trượt qua không khớp); luôn đặt ngay khi vào lệnh; không bao giờ dời xa hơn; khi nào dời về hòa vốn; sau đó mới tính khối lượng từ khoảng dừng lỗ. Nhiều ví dụ số.' },
      { id: 'c5-b8', title: 'Chốt lời và quản lý lệnh đang chạy', brief: 'Chốt lời theo vùng kháng cự/hỗ trợ tiếp theo và theo R; chốt từng phần (ví dụ 50% tại 1.5R-2R); trailing stop theo cấu trúc hoặc EMA; thêm vị thế đúng cách (pyramiding khi lệnh đã có lãi và dừng lỗ tổng không tăng rủi ro) vs nhồi lệnh thua; lệnh reduce-only; khi nào đóng lệnh sớm (ý tưởng bị vô hiệu); không nhìn PnL từng phút.' },
      { id: 'c5-b9', title: 'Bộ quy tắc kỷ luật futures và quy trình mở lệnh', brief: 'Bộ quy tắc cá nhân viết sẵn: đòn bẩy tối đa, rủi ro tối đa mỗi lệnh 0,5-1%, lỗ tối đa ngày/tuần (ví dụ 2R/ngày, 5R/tuần) rồi nghỉ, tối đa số lệnh mỗi ngày, không trade sau 2 lệnh thua liên tiếp, isolated mặc định. Quy trình mở lệnh từng bước trên giao diện sàn: chọn isolated, đặt đòn bẩy, nhập khối lượng tính sẵn, đặt TP/SL cùng lúc, kiểm tra giá thanh lý. Checklist tương tác.' },
      { id: 'c5-b10', title: 'Những cách cháy tài khoản futures nhanh nhất', brief: 'Đòn bẩy cao, không dừng lỗ, gồng lỗ, nhồi lệnh thua, cross toàn ví, trade tin, trả thù thị trường, copy trade mù quáng, dời dừng lỗ, all-in sau chuỗi thắng; mỗi lỗi kèm ví dụ số và quy tắc phòng tránh.' },
      { id: 'c5-b11', title: 'Short, phòng hộ và các chiến lược futures khác', brief: 'Short có kế hoạch trong xu hướng giảm và vì sao short khó hơn long (squeeze, funding); phòng hộ (hedge) danh mục spot bằng short; basis và funding arbitrage ở mức hiểu và rủi ro thật của nó; tại sao không nên grid/martingale đòn bẩy.' },
      { id: 'c5-b12', title: 'Futures vốn nhỏ: đánh lệnh 10–20 USDT sao cho có lời', brief: 'Quy trình đánh lệnh ký quỹ 10–20 USDT từng bước: đòn bẩy là kết quả chứ không phải đầu vào; rủi ro = ký quỹ × đòn bẩy × % dừng lỗ; vốn tối thiểu tương ứng; giá trị lệnh tối thiểu thật của Binance (BTC ≈ 85, ETH 20, alt 5 USDT); dừng lỗ tối đa cho phép; phí ăn bao nhiêu % R theo khung thời gian (ATR thật); vì sao scalp 1–5 phút gần như chắc thua với vốn nhỏ; chọn cặp và khung (H4 bối cảnh, H1/M15 kích hoạt); vào bằng limit (maker); 3 lệnh mẫu hoàn chỉnh; bài toán lợi nhuận thật sau 1 tháng; kế hoạch tăng vốn.' },
      { id: 'c5-b13', title: 'Lệnh vừa và lệnh lớn: từ 100 đến trên 1.000 USDT', brief: 'Cùng công thức, khác rủi ro: lệnh >100 USDT (tài khoản 1.000–10.000 USDT) và >1.000 USDT (tài khoản ≥ 10.000 USDT). Tổng rủi ro mở, tương quan giữa các lệnh, bậc ký quỹ, độ sâu sổ lệnh và trượt giá đo thật, chia lệnh (limit từng phần, TWAP qua API), hàng đợi ADL, rủi ro đối tác (FTX), không để hết vốn trên sàn, rút lợi nhuận định kỳ, áp lực tâm lý khi con số lớn, thuế 0,1% theo Thông tư 32/2026 khi giao dịch qua sàn được cấp phép.' }
    ]
  },
  {
    id: 'c6',
    no: 6,
    name: 'Rủi ro & tâm lý',
    title: 'Quản trị rủi ro và tâm lý giao dịch',
    tone: 'var(--ch-6)',
    desc: 'Phần quyết định bạn còn ở lại thị trường hay không. Toán học của thua lỗ, khối lượng lệnh, kỳ vọng, và bộ não con người khi đặt tiền.',
    outcome: 'Mỗi lệnh đều có rủi ro tính trước bằng tiền, và bạn nhận ra khi cảm xúc đang cầm chuột.',
    lessons: [
      { id: 'c6-b1', title: 'Quy tắc 1% và tính khối lượng lệnh', brief: 'Rủi ro mỗi lệnh = % tài khoản; công thức khối lượng = số tiền rủi ro / khoảng cách dừng lỗ; ví dụ spot và futures; khối lượng độc lập với đòn bẩy; tính cả phí và trượt giá; giới hạn rủi ro ngày/tuần.' },
      { id: 'c6-b2', title: 'Tỷ lệ R:R, tỷ lệ thắng và kỳ vọng', brief: 'R-multiple; kỳ vọng = WR×avgWin − (1−WR)×avgLoss; tỷ lệ thắng hòa vốn theo R:R; vì sao tỷ lệ thắng cao chưa chắc có lãi; chuỗi thua liên tiếp là bình thường (xác suất); Kelly ở mức giới thiệu và vì sao dùng một phần nhỏ.' },
      { id: 'c6-b3', title: 'Drawdown và toán học của thua lỗ', brief: 'Lỗ 50% cần lãi 100% để hòa; bảng phục hồi; rủi ro phá sản (risk of ruin) phụ thuộc % rủi ro mỗi lệnh; mô phỏng đường vốn 1% vs 10%; quy tắc dừng giao dịch khi drawdown chạm ngưỡng.' },
      { id: 'c6-b4', title: 'Tâm lý giao dịch: FOMO, trả thù và thiên kiến', brief: 'Né tránh mất mát (Kahneman & Tversky), hiệu ứng tài sản sở hữu, thiên kiến xác nhận, quá tự tin, FOMO, revenge trading, gồng lỗ cắt lãi; nhận diện trạng thái cảm xúc; quy tắc tạm dừng; vòng cảm xúc thị trường.' },
      { id: 'c6-b5', title: 'Nhật ký giao dịch và đánh giá hiệu suất', brief: 'Ghi gì trong nhật ký (setup, lý do, ảnh chụp, cảm xúc, R), các chỉ số: tỷ lệ thắng, R trung bình, kỳ vọng, profit factor, max drawdown; review tuần; phân loại lỗi (lỗi quy trình vs thua hợp lệ).' }
    ]
  },
  {
    id: 'c7',
    no: 7,
    name: 'Hệ thống',
    title: 'Xây hệ thống và thực hành',
    tone: 'var(--ch-7)',
    desc: 'Gộp mọi thứ thành một hệ thống có quy tắc, kiểm chứng nó bằng dữ liệu, rồi luyện tập với tiền giả trước khi dùng tiền thật.',
    outcome: 'Có một bản kế hoạch giao dịch viết ra giấy và lộ trình 90 ngày để kiểm chứng nó.',
    lessons: [
      { id: 'c7-b1', title: 'Thiết kế một hệ thống giao dịch có quy tắc', brief: 'Các thành phần: thị trường, khung thời gian, điều kiện vào, dừng lỗ, chốt lời, khối lượng, quản lý lệnh, điều kiện không giao dịch; viết quy tắc đủ rõ để người khác làm theo được; một hệ thống mẫu hoàn chỉnh.' },
      { id: 'c7-b2', title: 'Backtest, forward test và giao dịch giấy', brief: 'Backtest thủ công và bằng công cụ (TradingView replay), cỡ mẫu tối thiểu, overfitting, look-ahead bias, survivorship bias; forward test; testnet futures của sàn; khi nào chuyển sang tiền thật với khối lượng nhỏ.' },
      { id: 'c7-b3', title: 'Quy trình một phiên giao dịch và checklist trước lệnh', brief: 'Chuẩn bị trước phiên (lịch tin, khung lớn, vùng giá), checklist trước lệnh (có checklist tương tác), trong lệnh (không nhìn lãi lỗ mỗi phút), sau lệnh (nhật ký); giới hạn số lệnh; giao dịch không phải để giải trí.' },
      { id: 'c7-b4', title: 'Kế hoạch 90 ngày và con đường tiếp theo', brief: 'Lộ trình 90 ngày: 30 ngày giấy, 30 ngày tiền nhỏ, 30 ngày đánh giá; tiêu chí chuyển giai đoạn; khi nào nên bỏ trading chủ động và chỉ DCA; nguồn học tiếp uy tín; nhắc lại nguyên tắc sống còn.' }
    ]
  }
];

export default CURRICULUM;
