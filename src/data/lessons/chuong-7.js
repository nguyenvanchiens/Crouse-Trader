const lessons = {
  'c7-b1': {
    duration: 11,
    level: 'Nâng cao',
    summary: 'Ghép mọi thứ đã học thành một hệ thống có quy tắc viết ra giấy, đủ rõ để người khác làm theo và cho cùng một kết quả.',
    goals: [
      'Liệt kê đủ 8 thành phần của một hệ thống giao dịch và biết mỗi phần trả lời câu hỏi gì',
      'Viết quy tắc ở dạng kiểm tra được (đúng/sai), không dùng từ mơ hồ như "có vẻ", "khá mạnh"',
      'Đọc hiểu và tự điều chỉnh một hệ thống mẫu hoàn chỉnh cho BTC/ETH khung D1/H4'
    ],
    blocks: [
      { type: 'h', text: 'Hệ thống giao dịch là gì và vì sao phải viết ra' },
      { type: 'p', text: 'Hệ thống giao dịch (trading system) là một bộ quy tắc trả lời trước mọi câu hỏi bạn sẽ gặp khi cầm lệnh: giao dịch cái gì, khi nào vào, đặt dừng lỗ ở đâu, vào bao nhiêu, thoát khi nào, và khi nào đứng ngoài. Khi các câu trả lời nằm sẵn trên giấy, quyết định trong phiên chỉ còn là đối chiếu. Cảm xúc không còn chỗ để chen vào.' },
      { type: 'p', text: 'Lý do quan trọng thứ hai: chỉ hệ thống viết ra mới <strong>đo được</strong>. Nếu hôm nay bạn vào lệnh vì "thấy nến đẹp", ngày mai vì "RSI thấp", thì 50 lệnh sau bạn có 50 hệ thống khác nhau, mỗi cái một lệnh. Không thể biết cái nào có lợi thế. Ở bài 7.2 bạn sẽ backtest, và backtest chỉ có nghĩa khi quy tắc cố định.' },
      { type: 'analogy', text: 'Hệ thống giống công thức nấu ăn của một chuỗi nhà hàng. Đầu bếp ở Hà Nội và ở TP.HCM làm theo cùng công thức thì món ăn giống nhau. Nếu công thức ghi "nêm vừa ăn", mỗi người nêm một kiểu và bạn không bao giờ biết món dở là do công thức hay do người nấu.' },
      { type: 'callout', tone: 'warn', title: 'Phép thử "người lạ"', text: 'Đưa bản quy tắc cho một người chưa từng nói chuyện với bạn, cùng một biểu đồ. Nếu họ không xác định được chính xác điểm vào, dừng lỗ, khối lượng và điểm thoát giống bạn, quy tắc còn mơ hồ. Mỗi chỗ họ phải hỏi lại là một chỗ cảm xúc sẽ chen vào khi có tiền thật.' },

      { type: 'h', text: '8 thành phần bắt buộc' },
      { type: 'table', head: ['Thành phần', 'Câu hỏi phải trả lời', 'Ví dụ quy tắc kiểm tra được'], rows: [
        ['1. Thị trường', 'Giao dịch mã nào, spot hay futures?', 'Chỉ BTCUSDT, ETHUSDT'],
        ['2. Khung thời gian', 'Khung nào định hướng, khung nào vào lệnh?', 'D1 định hướng, H4 tìm điểm vào'],
        ['3. Điều kiện xu hướng', 'Khi nào được phép long/short?', 'Nến D1 đóng trên EMA 50 và EMA 20 > EMA 50'],
        ['4. Điều kiện vào', 'Tín hiệu cụ thể nào kích hoạt lệnh?', 'Nến H4 đóng cửa trên đỉnh nến H4 trước đó sau nhịp hồi'],
        ['5. Dừng lỗ', 'Sai ở đâu thì thoát?', 'Dưới đáy nhịp hồi trừ 0,5 × ATR(14) H4'],
        ['6. Khối lượng', 'Vào bao nhiêu?', 'Rủi ro 1% tài khoản mỗi lệnh'],
        ['7. Chốt lời và quản lý lệnh', 'Thoát khi đúng như thế nào?', 'Chốt 50% ở 2R, phần còn lại kéo dừng lỗ'],
        ['8. Điều kiện không giao dịch', 'Khi nào đứng ngoài dù có tín hiệu?', 'Không mở lệnh trong 60 phút quanh giờ công bố CPI, FOMC']
      ] },
      { type: 'p', text: 'Thiếu một thành phần là hệ thống có lỗ hổng. Thiếu phần 8 là lỗi phổ biến nhất: nhiều người có quy tắc vào lệnh rất kỹ nhưng không có quy tắc "khi nào không làm gì", nên vẫn lao vào lúc tin lớn hoặc sau chuỗi thua.' },
      { type: 'list', items: [
        '<strong>Dùng số, không dùng tính từ.</strong> "Giá hồi sâu" là mơ hồ. "Giá chạm vùng giữa EMA 20 và EMA 50 khung H4" là kiểm tra được.',
        '<strong>Dùng giá đóng cửa của nến đã hoàn thành.</strong> Nến đang chạy có thể đổi màu trước khi đóng. Quy tắc chỉ đọc nến đã đóng.',
        '<strong>Mỗi quy tắc có ngoại lệ thì ngoại lệ cũng phải viết ra.</strong> Không có ngoại lệ "tùy tình hình".',
        '<strong>Ít quy tắc hơn là tốt hơn.</strong> Hệ thống 5 điều kiện dễ làm đúng và dễ kiểm tra hơn hệ thống 15 điều kiện. Càng nhiều điều kiện càng dễ rơi vào overfitting (xem bài 7.2).'
      ] },

      { type: 'h', text: 'Hệ thống mẫu: "Hồi về EMA theo xu hướng D1"' },
      { type: 'callout', tone: 'risk', title: 'Hệ thống mẫu này đã được backtest: KHÔNG có lợi thế', text: 'Hệ thống dưới đây dùng để minh họa cách viết quy tắc cho đủ rõ, đủ để máy tính chạy được. Khóa học đã backtest đúng các quy tắc này trên dữ liệu thật BTC và ETH từ 01/2020 đến 09/2026 (455 lệnh, có phí, trượt giá và funding thật): kỳ vọng chỉ <strong>+0,016R mỗi lệnh</strong>, âm liên tục từ năm 2023, và không tốt hơn vào lệnh ngẫu nhiên. Chi tiết ở <a href="/bai-hoc/c7-b2">bài 7.2</a>. <strong>Không dùng hệ thống này để giao dịch.</strong> Hãy dùng nó như bài tập: đọc quy tắc, rồi học cách kiểm chứng và loại bỏ một hệ thống không có lợi thế. Ứng viên có dấu hiệu tốt hơn để bạn forward test là hệ thống theo xu hướng khung ngày Turtle 55/20, cũng ở bài 7.2, và nó cũng chưa được chứng minh.' },
      { type: 'steps', items: [
        { title: 'Phần 1. Thị trường', text: 'BTCUSDT và ETHUSDT. Có thể dùng spot (chỉ long) hoặc hợp đồng perpetual USDⓈ-M (long và short đối xứng). Không giao dịch altcoin với hệ thống này. BTC và ETH thường đi cùng chiều nên được tính như một nhóm rủi ro.' },
        { title: 'Phần 2. Khung thời gian', text: 'D1 để xác định xu hướng. H4 để tìm điểm vào và quản lý lệnh. Chỉ xem biểu đồ sau khi nến H4 đóng (theo giờ VN: 03:00, 07:00, 11:00, 15:00, 19:00, 23:00). Không dùng khung nhỏ hơn H4.' },
        { title: 'Phần 3. Điều kiện xu hướng (lọc D1)', text: 'Chỉ được LONG khi cả ba đúng trên nến D1 đã đóng: (a) giá đóng cửa trên EMA 50; (b) EMA 20 nằm trên EMA 50; (c) cấu trúc tăng: đáy D1 gần nhất cao hơn đáy trước đó và chưa bị đóng cửa phá xuống. SHORT (chỉ perpetual) khi cả ba điều ngược lại đúng. Không thỏa đủ ba điều: không giao dịch mã đó.' },
        { title: 'Phần 4. Điều kiện vào (khung H4)', text: 'Với LONG: (a) giá hồi xuống chạm vùng giữa EMA 20 và EMA 50 của H4; (b) trong nhịp hồi, không nến H4 nào đóng cửa dưới EMA 50 H4 quá 2 nến liên tiếp; (c) tín hiệu: một nến H4 đóng cửa cao hơn đỉnh của nến H4 ngay trước nó. Vào lệnh bằng lệnh market ngay khi nến tín hiệu đóng. Nếu 6 nến H4 kể từ lúc chạm vùng mà chưa có tín hiệu, bỏ setup.' },
        { title: 'Phần 5. Dừng lỗ', text: 'Đặt tại đáy thấp nhất của nhịp hồi trừ 0,5 × ATR(14) H4 (vùng đệm chống quét dừng lỗ). Dùng lệnh Stop-Market, đặt ngay khi vào lệnh. Nếu khoảng cách dừng lỗ lớn hơn 3 × ATR(14) H4 thì bỏ lệnh vì điểm vào quá xa điểm sai. Không bao giờ nới dừng lỗ ra xa hơn.' },
        { title: 'Phần 6. Khối lượng và đòn bẩy', text: 'Rủi ro 1% số dư tài khoản mỗi lệnh. Khối lượng = Số tiền rủi ro ÷ Khoảng cách dừng lỗ, làm tròn XUỐNG theo bước khối lượng của sàn. Futures: chế độ isolated, đòn bẩy tối đa 3x, khoảng cách từ giá vào đến giá thanh lý ít nhất gấp 3 lần khoảng cách đến dừng lỗ (bài 5.9). Tổng rủi ro mở cùng lúc tối đa 2R, tức 2% (tối đa 2 lệnh).' },
        { title: 'Phần 7. Chốt lời và quản lý lệnh', text: 'Khi giá đạt 2R: chốt 50% khối lượng, dời dừng lỗ phần còn lại về giá vào cộng phí. Phần còn lại dùng dừng lỗ kéo theo kiểu Chandelier Exit trên H4: Đỉnh cao nhất 22 nến H4 − 3 × ATR(22), cập nhật sau mỗi nến H4 đóng, chỉ dời lên, không dời xuống. Dừng lỗ thời gian: nếu sau 12 nến H4 (2 ngày) giá chưa đạt 1R, đóng toàn bộ.' },
        { title: 'Phần 8. Điều kiện không giao dịch', text: 'Các mục (a), (b), (c) dưới đây là quy tắc riêng của hệ thống mẫu (đã dùng trong backtest), chặt hơn ở một số điểm so với bộ chuẩn bài 5.9. (a) Không mở lệnh trong 60 phút trước và sau giờ công bố CPI Mỹ, bảng lương phi nông nghiệp và quyết định lãi suất FOMC (bảng giờ VN ở bài 7.3). (b) Thua 3 lệnh liên tiếp: nghỉ 48 giờ. (c) Sụt giảm 6% từ đỉnh tài khoản trong tháng: dừng đến hết tháng và xem lại nhật ký. (d) Funding rate cao bất thường theo chiều lệnh của bạn, ví dụ từ 0,05% mỗi 8 giờ trở lên (ngưỡng tự đặt, cần kiểm chứng khi backtest): bỏ qua. (e) Mệt, say, vừa cãi nhau, đang cần tiền gấp: không mở biểu đồ. (f) Cộng thêm bộ chuẩn bài 5.9: lỗ 2R trong ngày thì nghỉ đến hôm sau, lỗ 5R trong tuần thì nghỉ đến tuần sau, tối đa 3 lệnh mỗi ngày, thua 2 lệnh liên tiếp thì dừng trong ngày, sụt 10% từ đỉnh thì giảm rủi ro còn một nửa, sụt 20% thì dừng tiền thật.' }
      ] },
      { type: 'figure', name: 'trade-plan', caption: 'Cấu trúc lệnh của hệ thống mẫu: điểm vào sau nến tín hiệu H4, dừng lỗ dưới đáy nhịp hồi có đệm ATR, chốt 50% tại 2R, phần còn lại kéo dừng lỗ.' },

      { type: 'h', text: 'Chạy thử hệ thống mẫu trên một lệnh ETH' },
      { type: 'p', text: 'Tài khoản futures giả định 1.000 USDT. D1 của ETH thỏa điều kiện xu hướng tăng. Trên H4, giá hồi về vùng EMA 20–EMA 50, đáy nhịp hồi là 2.910. Một nến H4 đóng cửa ở 3.000, cao hơn đỉnh nến trước. ATR(14) H4 là 40 USDT. Tất cả là số giả định.' },
      { type: 'calc', title: 'Tính một lệnh theo đúng quy tắc (giả định, phí 0,05% mỗi chiều)', rows: [
        ['Vùng đệm ATR', '0,5 × 40 = 20 USDT'],
        ['Giá dừng lỗ', '2.910 − 20 = 2.890 USDT'],
        ['Khoảng cách dừng lỗ', '3.000 − 2.890 = 110 USDT (nhỏ hơn 3 × ATR = 120, hợp lệ)'],
        ['Số tiền rủi ro 1%', '1.000 × 1% = 10 USDT'],
        ['Khối lượng lý thuyết', '10 ÷ 110 = 0,0909 ETH → làm tròn xuống 0,09 ETH'],
        ['Rủi ro thực tế (1R)', '0,09 × 110 = 9,9 USDT'],
        ['Giá trị danh nghĩa, ký quỹ 3x', '0,09 × 3.000 = 270 USDT; ký quỹ 270 ÷ 3 = 90 USDT'],
        ['Giá thanh lý gần đúng (MMR giả định 0,5%)', '3.000 × (1 − 1/3 + 0,005) ≈ 2.015, xa hơn dừng lỗ 2.890 nhiều'],
        ['Mục tiêu 2R', '3.000 + 2 × 110 = 3.220 USDT'],
        ['Chốt 50% ở 2R', '0,045 × 220 = 9,9 USDT'],
        ['Phần còn lại bị dừng kéo theo ở 3.300', '0,045 × 300 = 13,5 USDT'],
        ['Phí 3 lần khớp', '270 × 0,05% + 144,9 × 0,05% + 148,5 × 0,05% ≈ 0,28 USDT'],
        ['Lãi ròng', '9,9 + 13,5 − 0,28 ≈ 23,12 USDT']
      ], result: 'Lãi ròng khoảng 23,12 USDT, tức khoảng 2,34R. Nếu giá chạm dừng lỗ thay vì mục tiêu, bạn mất khoảng 9,9 USDT cộng phí. Một lệnh đẹp như thế này không chứng minh gì về hệ thống.' },
      { type: 'callout', tone: 'note', title: 'Vì sao dùng ATR cho vùng đệm', text: 'ATR (Average True Range) đo biên độ dao động trung bình, không chỉ hướng. Đệm theo ATR tự nở ra khi thị trường biến động mạnh và co lại khi thị trường yên, nên dừng lỗ ít bị quét bởi nhiễu thông thường hơn một khoảng cố định. ATR là giá trị tuyệt đối, nên ATR của BTC và ETH không so sánh trực tiếp được.' },

      { type: 'h', text: 'Tự viết hệ thống của bạn: quy trình 5 bước' },
      { type: 'scenario', title: 'Hai người cùng thấy ETH hồi về EMA 20 H4', setup: 'Cả hai đều thích ý tưởng "mua khi hồi trong xu hướng tăng". Giá chạm EMA 20 H4 lúc 22:00, nến H4 chưa đóng.', bad: 'Người thứ nhất không có quy tắc viết ra. Anh vào lệnh ngay vì "chạm EMA rồi", đặt dừng lỗ theo cảm giác ở số tròn 2.900, vào 10x vì "lệnh này chắc". Giá quét xuống 2.895 rồi bật lên. Anh bị dừng, tức giận, vào lại lệnh lớn hơn. Tuần sau anh không nhớ mình đã vào vì lý do gì để rút kinh nghiệm.', good: 'Người thứ hai mở bản quy tắc. Nến H4 chưa đóng nên chưa có tín hiệu. Chờ đến 23:00, nến đóng nhưng chưa vượt đỉnh nến trước, tiếp tục chờ. Có tín hiệu thì tính khối lượng theo 1%, dừng lỗ dưới đáy trừ đệm ATR, đặt lệnh, ghi nhật ký với mã quy tắc. Thắng hay thua, lệnh này là một điểm dữ liệu sạch cho việc đánh giá hệ thống.' },
      { type: 'steps', items: [
        { title: 'Chọn một ý tưởng duy nhất', text: 'Ví dụ: theo xu hướng và mua khi hồi, hoặc giao dịch phá vỡ biên độ. Không trộn ba ý tưởng vào một hệ thống.' },
        { title: 'Viết 8 thành phần thành câu đúng/sai', text: 'Mỗi dòng phải trả lời được "có" hoặc "không" khi nhìn biểu đồ. Dòng nào cần "cảm nhận" thì viết lại.' },
        { title: 'Làm phép thử người lạ', text: 'Đưa quy tắc và 5 biểu đồ cho một người khác. So sánh điểm vào và dừng lỗ họ chọn với của bạn. Sửa mọi chỗ khác nhau.' },
        { title: 'Đánh số phiên bản', text: 'Ghi "Hệ thống A v1.0, ngày 01/10/2026". Mọi thay đổi sau này tạo phiên bản mới và phải test lại. Không sửa quy tắc giữa chừng một đợt test.' },
        { title: 'Chuyển sang bài 7.2', text: 'Backtest ít nhất 100 lệnh trước khi tin vào bất kỳ con số nào.' }
      ] },
      { type: 'callout', tone: 'risk', title: 'Hệ thống không làm bạn an toàn nếu bạn không tuân thủ', text: 'Một hệ thống có kỳ vọng dương vẫn thua lỗ nếu bạn bỏ dừng lỗ một lần với đòn bẩy cao. Quy tắc rủi ro (1%, isolated, đòn bẩy thấp, dừng lỗ đặt ngay) quan trọng hơn quy tắc vào lệnh. Futures có thể mất toàn bộ ký quỹ rất nhanh.' }
    ],
    keyPoints: [
      'Hệ thống giao dịch là bộ quy tắc trả lời trước mọi quyết định, gồm 8 phần: thị trường, khung thời gian, xu hướng, điều kiện vào, dừng lỗ, khối lượng, chốt lời/quản lý lệnh, điều kiện không giao dịch.',
      'Quy tắc phải kiểm tra được bằng đúng/sai, dùng nến đã đóng, dùng số thay cho tính từ.',
      'Phép thử người lạ: người khác đọc quy tắc phải ra cùng điểm vào, dừng lỗ, khối lượng như bạn.',
      'Hệ thống mẫu D1/H4 đã được backtest 455 lệnh: không có lợi thế (+0,016R/lệnh). Dùng nó để học cách viết quy tắc, không dùng để giao dịch.',
      'Đánh số phiên bản và không sửa quy tắc giữa đợt test; điều kiện không giao dịch là phần hay bị bỏ quên nhất.'
    ],
    practice: [
      'Viết hệ thống của bạn thành 8 mục theo bảng trong bài, mỗi mục tối đa 3 dòng, đặt tên và số phiên bản v1.0.',
      'Mở biểu đồ H4 của ETHUSDT, tìm 3 lần giá hồi về vùng EMA 20–EMA 50 trong xu hướng tăng D1 và tính đúng giá dừng lỗ, khối lượng cho tài khoản giả định 1.000 USDT.',
      'Làm phép thử người lạ: gửi quy tắc và 3 biểu đồ trên cho một người khác, ghi lại mọi chỗ họ chọn khác bạn và sửa quy tắc.'
    ],
    quiz: [
      { q: 'Quy tắc nào sau đây được viết đủ rõ để kiểm tra bằng đúng/sai?', options: ['Vào lệnh khi xu hướng D1 tăng mạnh và lực mua trên H4 áp đảo', 'Vào khi nến H4 đóng trên đỉnh nến H4 trước, D1 đóng trên EMA 50', 'Vào lệnh khi giá hồi đủ sâu về vùng hỗ trợ mạnh và nến trông đẹp', 'Vào lệnh khi thấy dòng tiền vào rõ và thị trường đang khá hưng phấn'], answer: 1, explain: 'Chỉ lựa chọn B có điều kiện đo được trên nến đã đóng. "Tăng mạnh", "áp đảo", "đủ sâu", "trông đẹp", "khá hưng phấn" là tính từ, mỗi người hiểu một kiểu nên không kiểm tra và không backtest được.' },
      { q: 'Theo hệ thống mẫu, tài khoản 2.000 USDT, BTC vào 80.000, đáy nhịp hồi 78.000, ATR(14) H4 = 800. Khối lượng lý thuyết là bao nhiêu?', options: ['0,025 BTC', '0,01 BTC', '0,0167 BTC', '0,0083 BTC'], answer: 3, explain: 'Dừng lỗ = 78.000 − 0,5 × 800 = 77.600; khoảng cách = 80.000 − 77.600 = 2.400, bằng đúng 3 × ATR = 2.400. Quy tắc chỉ bỏ lệnh khi dừng lỗ LỚN HƠN 3 ATR, nên lệnh vẫn hợp lệ. Rủi ro 1% = 20 USDT; 20 ÷ 2.400 ≈ 0,0083 BTC. 0,01 BTC là khi quên vùng đệm (20 ÷ 2.000). 0,025 BTC là lấy nhầm ATR làm khoảng cách dừng lỗ (20 ÷ 800). 0,0167 BTC là rủi ro 2% (40 ÷ 2.400), vượt mức 1% của hệ thống.' },
      { q: 'Thành phần nào thường bị bỏ quên nhất và khiến trader vẫn vào lệnh lúc tin lớn hoặc sau chuỗi thua?', options: ['Điều kiện không giao dịch', 'Khung thời gian vào lệnh', 'Điều kiện vào lệnh cụ thể', 'Thị trường được giao dịch'], answer: 0, explain: 'Nhiều người có quy tắc vào rất kỹ nhưng không viết khi nào đứng ngoài. Khung thời gian, điều kiện vào và thị trường thường được nghĩ đến trước tiên nên ít bị thiếu hơn.' },
      { q: 'Bạn đang test hệ thống A v1.0 được 40 lệnh thì muốn đổi EMA 20 thành EMA 21 vì "trông khớp hơn". Cách làm đúng là gì?', options: ['Đổi ngay sang EMA 21 và gộp tiếp 40 lệnh cũ vào cùng kết quả', 'Đổi sang EMA 21 nhưng chỉ giữ lại các lệnh thắng để so sánh', 'Ghi thành v1.1, test lại từ đầu và không trộn với kết quả v1.0', 'Giữ nguyên mãi mãi vì hệ thống đã viết ra thì không được sửa'], answer: 2, explain: 'Mỗi thay đổi tạo phiên bản mới phải test riêng. Trộn kết quả làm dữ liệu vô nghĩa. Chọn lệnh thắng là tự lừa mình. Hệ thống được phép cải tiến, nhưng phải có kiểm soát, nên "không bao giờ thay đổi" cũng sai.' }
    ],
    sources: [
      { title: 'Average True Range (ATR) and Average True Range Percent (ATRP)', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Chandelier Exit', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Moving Averages - Simple and Exponential', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/moving-averages-simple-and-exponential', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Types of Stop Orders (Binance Futures)', url: 'https://www.binance.com/en/support/faq/detail/360036351051', note: 'Binance FAQ, tiếng Anh' },
      { title: 'A Short Lesson on R and R-multiple', url: 'https://vantharp.com/wp-content/uploads/2018/06/A_Short_Lesson_on_R_and_R-multiple.pdf', note: 'Van Tharp Institute, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c7-b2': {
    duration: 11,
    level: 'Nâng cao',
    summary: 'Kiểm tra hệ thống trên dữ liệu quá khứ và thời gian thực bằng tiền ảo, tránh các bẫy thống kê, rồi đặt tiêu chí rõ ràng trước khi dùng tiền thật.',
    goals: [
      'Backtest thủ công một hệ thống bằng TradingView Bar Replay mà không nhìn trước tương lai',
      'Giải thích vì sao 30 lệnh là quá ít và tránh overfitting, look-ahead bias, survivorship bias',
      'Forward test trên Binance Demo Trading và biết tiêu chí cụ thể để chuyển sang tiền thật khối lượng nhỏ'
    ],
    blocks: [
      { type: 'h', text: 'Ba bước kiểm chứng: backtest, forward test, tiền thật nhỏ' },
      { type: 'p', text: 'Một hệ thống mới giống một loại thuốc mới. Không ai bán thuốc chỉ vì người phát minh "thấy nó hiệu quả". Bạn cũng vậy: hệ thống phải qua ba bước, mỗi bước có tiêu chí đạt/không đạt viết sẵn.' },
      { type: 'list', ordered: true, items: [
        '<strong>Backtest</strong> (kiểm tra ngược): áp quy tắc lên dữ liệu quá khứ để xem hệ thống có lợi thế không. Nhanh, rẻ, nhưng dễ tự lừa mình.',
        '<strong>Forward test</strong> (kiểm tra tới) hay giao dịch giấy (paper trading): chạy hệ thống trên thị trường thời gian thực bằng tiền ảo. Chậm hơn, nhưng không thể nhìn trước tương lai.',
        '<strong>Tiền thật khối lượng nhỏ</strong>: kiểm tra phần mà tiền ảo không đo được, đó là cảm xúc của bạn và trượt giá thực tế.'
      ] },
      { type: 'callout', tone: 'warn', title: 'Backtest tốt không có nghĩa là hệ thống tốt', text: 'Backtest chỉ trả lời "quy tắc này đã có thể hoạt động trong quá khứ không, nếu tôi làm đúng". Nó không đảm bảo tương lai. Mục đích chính của backtest là loại bỏ nhanh các hệ thống tệ, không phải để chứng minh hệ thống tốt.' },

      { type: 'h', text: 'Backtest thủ công bằng TradingView Bar Replay' },
      { type: 'p', text: 'Bar Replay là tính năng của TradingView cho phép chọn một thời điểm trong quá khứ, ẩn toàn bộ nến phía sau, rồi cho nến hiện ra lần lượt. Theo tài liệu hỗ trợ của TradingView, bạn bấm nút Bar Replay trên thanh công cụ phía trên biểu đồ, chọn điểm bắt đầu (click vào nến, chọn ngày, hoặc chọn nến ngẫu nhiên), rồi bấm Play hoặc bấm Forward để tiến từng bước. Phím tắt: Shift + mũi tên xuống để chạy/dừng, Shift + mũi tên phải để tiến một nến. Nút "Jump to real-time" đưa bạn về dữ liệu hiện tại.' },
      { type: 'p', text: 'TradingView còn có chế độ giao dịch trong replay: bạn đặt vốn ban đầu, mức phí, rồi đặt lệnh limit, stop, stop-limit và kéo thả chốt lời/dừng lỗ trên biểu đồ. Lưu ý từ tài liệu chính thức: dữ liệu phiên replay trading <strong>không được lưu</strong> sau khi kết thúc, nên bạn phải ghi từng lệnh vào bảng tính của mình. Với khung D1 trở lên, mọi gói đều xem được toàn bộ lịch sử; dữ liệu trong ngày (intraday) bị giới hạn theo gói tài khoản.' },
      { type: 'steps', items: [
        { title: 'Chuẩn bị bảng ghi', text: 'Cột: ngày giờ, mã, chiều, giá vào, dừng lỗ, khoảng cách, R đạt được, phí ước tính, funding ước tính, quy tắc đã tuân thủ đủ chưa, ghi chú. Mỗi lệnh quy về bội số R.' },
        { title: 'Chọn giai đoạn đa dạng', text: 'Chọn điểm bắt đầu ở nhiều giai đoạn: thị trường tăng, giảm, đi ngang. Ví dụ với BTC: năm 2022 (giảm mạnh, có sụp đổ LUNA và FTX), 2023, 2024 và 2025. Chỉ test trong thị trường tăng sẽ cho kết quả quá đẹp.' },
        { title: 'Tiến từng nến, quyết định trước khi xem nến sau', text: 'Mỗi khi nến H4 đóng, đối chiếu quy tắc và ghi quyết định vào bảng TRƯỚC khi bấm Forward. Tuyệt đối không kéo biểu đồ sang phải để "xem thử".' },
        { title: 'Ghi mọi tín hiệu, kể cả tín hiệu bạn không thích', text: 'Nếu quy tắc bảo vào, bạn ghi lệnh. Bỏ qua lệnh "trông xấu" là đưa phán đoán cá nhân vào, làm kết quả không còn là của hệ thống.' },
        { title: 'Trừ chi phí', text: 'Mỗi lệnh trừ phí hai chiều, trượt giá giả định và funding theo số kỳ đã giữ. Xem phần chi phí bên dưới.' }
      ] },

      { type: 'h', text: 'Cỡ mẫu: vì sao 30 lệnh là quá ít' },
      { type: 'p', text: 'Nhiều người nghe "30 mẫu là đủ" từ môn thống kê và dừng ở 30 lệnh. Với giao dịch, con số này quá nhỏ vì kết quả mỗi lệnh dao động rất lớn: lệnh thua mất 1R, lệnh thắng được 2R hoặc 3R. Với ít lệnh, may rủi dễ dàng biến hệ thống không có lợi thế thành hệ thống "thắng lớn", và ngược lại.' },
      { type: 'calc', title: 'Độ bất định của kết quả theo số lệnh (giả định hệ thống thắng 40%, thắng +2R, thua −1R)', rows: [
        ['Kỳ vọng thật mỗi lệnh', '0,4 × 2 − 0,6 × 1 = +0,2R'],
        ['Độ lệch chuẩn kết quả mỗi lệnh', '√(0,4 × 0,6) × 3 ≈ 1,47R'],
        ['30 lệnh: sai số chuẩn', '1,47 ÷ √30 ≈ 0,27R → khoảng tin cậy 95% từ khoảng −0,33R đến +0,73R'],
        ['100 lệnh: sai số chuẩn', '1,47 ÷ √100 ≈ 0,15R → khoảng từ −0,09R đến +0,49R'],
        ['200 lệnh: sai số chuẩn', '1,47 ÷ √200 ≈ 0,10R → khoảng từ khoảng 0R đến +0,40R'],
        ['Tỷ lệ thắng đo được với 30 lệnh (thật là 40%)', 'Khoảng tin cậy 95% ≈ 40% ± 1,96 × √(0,4 × 0,6 ÷ 30) ≈ 40% ± 17,5 điểm, tức từ khoảng 22% đến 58%']
      ], result: 'Với 30 lệnh, một hệ thống có kỳ vọng thật +0,2R vẫn có thể cho kết quả âm hoặc dương rất đẹp chỉ do may rủi. Ngay cả 100 lệnh vẫn chưa loại trừ được khả năng kỳ vọng bằng 0. Vì vậy 100 lệnh là mức tối thiểu để bắt đầu tin một phần, còn 200 lệnh trở lên mới cho bức tranh rõ hơn.' },
      { type: 'p', text: 'Khuyến nghị thực dụng: <strong>tối thiểu 100 lệnh backtest</strong> trải qua cả thị trường tăng, giảm và đi ngang. Chỉ tiếp tục nếu kỳ vọng sau chi phí dương rõ ràng, ví dụ từ +0,15R trở lên, và chuỗi thua dài nhất nằm trong mức bạn chịu được. Nếu hệ thống cho quá ít tín hiệu để có 100 lệnh trên BTC và ETH trong vài năm dữ liệu, bạn cần thời gian test dài hơn, không phải hạ tiêu chuẩn.' },
      { type: 'figure', name: 'equity-curves', caption: 'Cùng một chuỗi lệnh, rủi ro 1%, 5% và 20% mỗi lệnh cho ra đường vốn rất khác nhau. Backtest cho bạn chuỗi R; mức rủi ro quyết định bạn có sống sót qua chuỗi thua hay không.' },

      { type: 'h', text: 'Ba bẫy làm backtest đẹp giả tạo' },
      { type: 'table', head: ['Bẫy', 'Là gì', 'Cách phòng'], rows: [
        ['Overfitting (khớp quá mức)', 'Chỉnh tham số cho đến khi khớp hoàn hảo với dữ liệu quá khứ. Hệ thống "học thuộc" nhiễu, không học quy luật.', 'Ít tham số; chọn tham số phổ biến (EMA 20/50, ATR 14) trước khi test; chia dữ liệu: phát triển trên một giai đoạn, kiểm tra trên giai đoạn chưa từng xem.'],
        ['Look-ahead bias (nhìn trước tương lai)', 'Dùng thông tin mà lúc đó chưa có. Ví dụ quyết định dựa trên nến chưa đóng, hoặc biết trước đáy nhịp hồi là đáy thật.', 'Chỉ đọc nến đã đóng; ghi quyết định trước khi bấm Forward; không kéo biểu đồ sang phải.'],
        ['Survivorship bias (thiên kiến kẻ sống sót)', 'Chỉ test trên những đồng coin còn tồn tại hôm nay. Coin đã chết, bị hủy niêm yết không có trên biểu đồ sàn nên bị bỏ qua.', 'Giới hạn hệ thống vào BTC, ETH; nếu test altcoin, phải chọn danh sách coin theo đúng thời điểm quá khứ, gồm cả coin đã chết.']
      ] },
      { type: 'p', text: 'Survivorship bias đặc biệt nặng trong crypto. Giả sử bạn mở danh sách 20 coin lớn nhất hôm nay và test chiến lược "mua coin đang tăng mạnh" từ năm 2021. Kết quả chắc chắn đẹp, vì danh sách hôm nay đã loại bỏ những coin sụp đổ. LUNA từng nằm trong nhóm vốn hóa lớn trước khi sụp đổ tháng 5/2022; hàng loạt token khác bị hủy niêm yết hoặc về gần 0 và biến mất khỏi danh sách. Biểu đồ trên sàn chỉ hiển thị những mã còn niêm yết, nên bạn không thể tự nhìn thấy những lệnh lẽ ra đã thua ở các coin đã chết. Đây là một lý do để hệ thống cho người mới chỉ giao dịch BTC và ETH.' },
      { type: 'p', text: 'Overfitting cũng có nghiên cứu nghiêm túc. Bailey, Borwein, López de Prado và Zhu (bài "The Probability of Backtest Overfitting") chỉ ra rằng các kỹ thuật thống kê thông thường để chống khớp quá mức, như giữ lại một phần dữ liệu để kiểm tra (hold-out), thường không đáng tin khi đánh giá backtest đầu tư, và đề xuất cách ước lượng xác suất một backtest bị overfitting. Trực giác đơn giản: bạn thử càng nhiều biến thể rồi chọn cái đẹp nhất, khả năng cái được chọn chỉ đẹp nhờ may mắn càng cao. Quy tắc cho bạn: ghi lại <strong>số biến thể đã thử</strong>. Thử 50 bộ tham số rồi chọn bộ đẹp nhất thì con số đẹp đó gần như vô nghĩa.' },
      { type: 'callout', tone: 'risk', title: 'Chi phí có thể xóa sạch lợi thế', text: 'Giả định: dừng lỗ cách giá vào 2%, nên giá trị danh nghĩa bằng 50 lần số tiền rủi ro. Phí 0,05% mỗi chiều (0,1% khứ hồi) tốn 0,05R. Trượt giá giả định 0,03% mỗi chiều tốn 0,03R. Giữ lệnh 3 ngày qua 9 kỳ funding 0,01% tốn thêm 0,045R. Tổng khoảng 0,125R mỗi lệnh. Hệ thống có kỳ vọng gộp +0,2R chỉ còn khoảng +0,075R. Với dừng lỗ 1%, chi phí tính theo R tăng gấp đôi lên 0,25R và hệ thống thành lỗ. Dừng lỗ càng hẹp, chi phí theo R càng lớn.' },

      { type: 'h', text: 'Ví dụ thật: backtest hệ thống mẫu của bài 7.1' },
      { type: 'p', text: 'Để bạn thấy backtest trung thực trông như thế nào, khóa học đã lập trình đúng từng quy tắc của hệ thống "Hồi về EMA theo xu hướng D1" ở bài 7.1 và chạy trên dữ liệu thật của Binance USDⓈ-M Futures: nến D1 và H4 của BTCUSDT, ETHUSDT từ 01/01/2020 đến 26/09/2026, cùng lịch sử funding thật (7.385 mốc mỗi mã). Giả định chi phí: phí taker 0,05% cho lệnh market và dừng lỗ, maker 0,02% cho lệnh chốt lời, trượt giá 0,02% mỗi lệnh market. Khi một nến chạm cả dừng lỗ lẫn mục tiêu, tính là dính dừng lỗ trước (giả định bất lợi). Chưa áp dụng bộ lọc tin CPI/FOMC vì thiếu lịch sử giờ tin đầy đủ.' },
      { type: 'table', head: ['Chỉ số', 'Kết quả'], rows: [
        ['Số lệnh', '455 trong khoảng 6,74 năm dữ liệu (01/01/2020 đến 26/09/2026), tức khoảng 67–68 lệnh/năm hay 1,3 lệnh/tuần'],
        ['Tỷ lệ thắng', '38%; lệnh thắng trung bình +1,42R, lệnh thua trung bình −0,85R'],
        ['Kỳ vọng mỗi lệnh', '<strong>+0,016R</strong> (tổng +7,1R sau gần 7 năm)'],
        ['Profit factor', '1,03'],
        ['Chi phí trung bình mỗi lệnh', 'Phí 0,030R + funding 0,017R ≈ 0,047R. Không có chi phí, kỳ vọng là +0,057R'],
        ['Sụt giảm tối đa (rủi ro 1%)', '30%; chuỗi thua dài nhất 12 lệnh'],
        ['Theo năm', '2020: +0,27R/lệnh · 2021: +0,11R · 2022: +0,06R · 2023: −0,01R · 2024: −0,07R · 2025: −0,19R · 2026: −0,09R'],
        ['Chia đôi dữ liệu', '2020–2023: +0,093R/lệnh (285 lệnh). 2024–2026: <strong>−0,119R/lệnh</strong> (171 lệnh)'],
        ['Thử trên SOL (không dùng khi viết quy tắc)', '202 lệnh, −0,046R/lệnh'],
        ['So với vào lệnh ngẫu nhiên', '200 lần mô phỏng vào ngẫu nhiên, cùng bộ lọc xu hướng và cùng cách thoát: trung vị +0,027R/lệnh. 54% số lần ngẫu nhiên cho kết quả bằng hoặc tốt hơn hệ thống']
      ] },
      { type: 'callout', tone: 'risk', title: 'Kết luận: hệ thống mẫu không có lợi thế', text: 'Kỳ vọng sát 0, xấu đi đều qua từng năm, âm trên dữ liệu gần đây và trên mã chưa dùng khi viết quy tắc, và không hơn vào lệnh ngẫu nhiên. Đây đúng là trường hợp phải loại bỏ ở bước backtest, trước khi mất một đồng nào. Một bộ quy tắc trông rất hợp lý trên giấy vẫn có thể không có lợi thế.' },
      { type: 'p', text: 'Có hai điều <strong>đã được dữ liệu xác nhận</strong> trong cùng lần kiểm tra này. Thứ nhất, quản trị rủi ro giữ bạn sống. Cùng đúng 455 lệnh đó, chỉ đổi % rủi ro mỗi lệnh: rủi ro 0,5% kết thúc 102% vốn, sụt tối đa 16%; rủi ro 1% kết thúc 103%, sụt tối đa 30%; rủi ro 2% kết thúc 97%, sụt tối đa 53%; rủi ro 5% còn 51% vốn, từng sụt 90%; rủi ro 10% còn 4% vốn. Một hệ thống hoà vốn với rủi ro nhỏ là tài khoản còn nguyên để học tiếp; cùng hệ thống đó với rủi ro lớn là tài khoản cháy. Thứ hai, chi phí là thật: phí và funding lấy mất khoảng 0,047R mỗi lệnh, gần gấp ba phần lợi nhuận còn lại.' },
      { type: 'h', text: 'Kiểm tra tiếp: theo xu hướng khung ngày, theo đúng quy trình' },
      { type: 'p', text: 'Sau khi loại hệ thống mẫu, khóa học kiểm tra họ hệ thống theo xu hướng kinh điển trên khung ngày (kiểu Turtle): vào lệnh khi giá đóng cửa vượt đỉnh N ngày (hoặc thủng đáy N ngày), dừng lỗ 2 hoặc 3 × ATR(20), thoát khi giá đóng cửa thủng đáy M ngày (hoặc vượt đỉnh M ngày). Quy trình được cố định <strong>trước khi</strong> nhìn kết quả: (1) chọn tham số chỉ trên BTC, ETH giai đoạn 2020–2023, trong lưới 48 biến thể; (2) kiểm tra trên BTC, ETH 2024–09/2026; (3) kiểm tra trên 10 đồng chưa dùng (BNB, XRP, DOGE, ADA, LINK, LTC, AVAX, DOT, TRX, BCH); (4) so với vào lệnh ngẫu nhiên có cùng số lệnh, cùng dừng lỗ và cùng cách thoát. Chi phí: phí taker 0,05%, trượt giá 0,02% (BTC, ETH) và 0,05% (các đồng khác), funding thật.' },
      { type: 'table', head: ['Bước', 'Kết quả'], rows: [
        ['Biến thể được chọn trên dữ liệu thiết kế', 'N100 / M10 / 2 ATR, long và short (kỳ vọng cao nhất trong các biến thể có từ 25 lệnh trở lên)'],
        ['Kiểm tra 1: BTC, ETH 2024–2026', '28 lệnh, +0,004R/lệnh: <strong>hoà vốn</strong>'],
        ['Kiểm tra 2: 10 đồng chưa dùng, 2024–2026', '107 lệnh, +0,21R/lệnh; 5 trên 10 đồng lỗ'],
        ['So với ngẫu nhiên (12 mã, 2024–2026)', '25% số lần vào ngẫu nhiên cho kết quả bằng hoặc tốt hơn: <strong>không khác biệt có ý nghĩa</strong>'],
        ['Kết luận theo quy trình đã đặt trước', '<strong>Không đạt.</strong> Tham số chọn trên dữ liệu cũ không giữ được lợi thế trên dữ liệu mới']
      ] },
      { type: 'p', text: 'Điều đáng chú ý là cả họ hệ thống vẫn có dấu hiệu dương: trên dữ liệu kiểm tra 2024–2026 của 12 mã, 46 trên 48 biến thể có kỳ vọng dương, trung vị +0,40R/lệnh. Tham số kinh điển lấy nguyên từ tài liệu gốc (không do khóa học tối ưu) cho kết quả như sau trên 12 mã, giai đoạn 2024–2026:' },
      { type: 'table', head: ['Phiên bản', 'Lệnh', 'Kỳ vọng', 'Ngẫu nhiên ≥ hệ thống', 'Ghi chú'], rows: [
        ['Turtle 20/10, long và short', '342', '+0,26R', '4,3%', 'Nhiều lệnh nhất trong bảng'],
        ['Turtle 55/20, long và short', '174', '+0,34R', '6,7%', 'Bỏ phía short (dòng dưới) thì kỳ vọng tăng lên +0,66R'],
        ['55/20 chỉ long', '100', '+0,66R', '9,0%', 'Làm được trên spot, không cần đòn bẩy'],
        ['100/50, long và short', 'không ghi', '−0,10R', '70,7%', 'Không có lợi thế']
      ] },
      { type: 'p', text: 'Một kiểm tra tham chiếu khác, chạy trước đó với Donchian 55/20 khung ngày, dừng lỗ 2 × ATR(20), trên BTC, ETH, SOL giai đoạn 2020–2026 (bộ dữ liệu khác bảng trên), cũng cho thấy lợi thế nằm ở phía long: long +3,19R/lệnh (49 lệnh), short −0,02R/lệnh (40 lệnh). Tổng 89 lệnh nghe rất đẹp (+1,747R/lệnh), nhưng 2020–2023 là +2,88R còn 2024–2026 chỉ +0,154R, và lợi nhuận tập trung ở các đợt tăng lớn 2020–2021.' },
      { type: 'p', text: 'Danh mục Turtle 55/20 với rủi ro 1% mỗi lệnh, tối đa 3 lệnh mở cùng lúc: giai đoạn 2024–2026 tăng 24% (khoảng 8,5%/năm), sụt giảm tối đa 10,5%. Cả giai đoạn 2020–2026: tăng 182%, sụt giảm tối đa 16,9%, chuỗi thua dài nhất 12 lệnh; lợi nhuận tập trung mạnh ở năm 2020. Để so sánh, mua và giữ BTC giai đoạn 2024–2026 tăng 99%, ETH tăng 18%.' },
      { type: 'callout', tone: 'warn', title: 'Đọc kết quả này thế nào cho đúng', text: 'Chưa có hệ thống nào qua được kiểm tra theo chuẩn khóa học đặt ra (kỳ vọng dương trên cả hai bộ dữ liệu kiểm tra và tỷ lệ ngẫu nhiên tốt hơn dưới 5%). Các phiên bản Turtle kinh điển có dấu hiệu lợi thế nhỏ, chủ yếu ở phía long, nhưng mức ý nghĩa ở ngưỡng biên, và bảng thứ hai được xem sau khi đã biết dữ liệu kiểm tra, nên dễ bị ảnh hưởng bởi việc chọn lựa. Vì vậy: <strong>Turtle 55/20 là ứng viên đáng forward test trên Demo Trading, không phải hệ thống đã được chứng minh.</strong> Lưu ý thêm: 12 đồng được kiểm tra đều là đồng còn tồn tại đến nay (thiên kiến sống sót), và giao dịch theo xu hướng có nhiều giai đoạn thua kéo dài.' },
      { type: 'callout', tone: 'note', title: 'Tự chạy lại được', text: 'Mã nguồn backtest và dữ liệu nằm trong thư mục <code>research/backtest</code> của dự án (<code>download.mjs</code>, <code>backtest.mjs</code>, <code>analyze.mjs</code>). Bạn có thể đổi quy tắc, chạy lại, và so với vào lệnh ngẫu nhiên. Mọi thay đổi quy tắc tạo phiên bản mới và phải kiểm tra trên dữ liệu chưa dùng.' },
      { type: 'h', text: 'Forward test trên Binance Demo Trading' },
      { type: 'p', text: 'Binance đã chuyển tính năng Mock Trading cũ sang <strong>Binance Demo Trading</strong>: giao diện thật, tiền ảo. Futures Demo truy cập tại demo.binance.com; môi trường thử API cho lập trình viên là testnet.binancefuture.com. Ở đây bạn chạy hệ thống trong thời gian thực, không thể xem trước nến tương lai, nên look-ahead bias gần như biến mất.' },
      { type: 'list', items: [
        '<strong>Dùng số dư demo giống số tiền thật bạn định dùng.</strong> Nếu định giao dịch 1.000 USDT thì coi tài khoản demo là 1.000 USDT, dù số dư ảo lớn hơn. Tính khối lượng theo 1% của 1.000.',
        '<strong>Đặt lệnh đúng như tiền thật</strong>: isolated, đòn bẩy tối đa theo quy tắc, Stop-Market cho dừng lỗ, đặt ngay khi vào.',
        '<strong>Ghi nhật ký như thật</strong>, gồm cả cảm xúc và những lần suýt phá quy tắc.',
        '<strong>Biết giới hạn</strong>: khớp lệnh trên demo có thể khác thực tế, trượt giá thường nhẹ hơn. Quan trọng hơn, mất tiền ảo không đau, nên demo đánh giá thấp áp lực tâm lý.'
      ] },
      { type: 'scenario', title: 'Backtest đẹp sau 25 lệnh', setup: 'Sau 25 lệnh backtest bằng Bar Replay, hệ thống cho kỳ vọng +0,6R. Người học rất phấn khởi.', bad: 'Người thứ nhất nạp ngay 20 triệu đồng, vào futures 10x vì "đã test rồi". Tuần đầu thua 6 lệnh liên tiếp, điều hoàn toàn có thể xảy ra với hệ thống thắng 40%. Anh kết luận hệ thống hỏng, đổi sang cách khác, lặp lại vòng cũ.', good: 'Người thứ hai biết 25 lệnh là quá ít. Cô test tiếp đến 120 lệnh, kỳ vọng sau chi phí giảm còn +0,18R, chuỗi thua dài nhất 8 lệnh. Cô forward test trên Demo Trading thêm 30 lệnh, tuân thủ 93%, rồi mới vào tiền thật với rủi ro 0,25% mỗi lệnh. Khi gặp chuỗi thua 6 lệnh, cô không hoảng vì đã thấy điều này trong dữ liệu.' },

      { type: 'h', text: 'Khi nào chuyển sang tiền thật' },
      { type: 'checklist', title: 'Chỉ chuyển sang tiền thật khi đạt TẤT CẢ', items: [
        'Backtest tối thiểu 100 lệnh, qua cả thị trường tăng, giảm, đi ngang',
        'Kỳ vọng sau phí, trượt giá, funding dương rõ ràng (ví dụ ≥ +0,15R)',
        'Đã ghi lại số biến thể tham số đã thử và không chọn bộ tham số "đẹp nhất" trong hàng chục bộ',
        'Forward test trên Demo Trading tối thiểu 30 lệnh với cùng phiên bản quy tắc',
        'Kỳ vọng forward test không thấp hơn một nửa kỳ vọng backtest',
        'Tỷ lệ tuân thủ quy tắc ≥ 90% trong forward test',
        'Đã biết chuỗi thua dài nhất trong dữ liệu và chấp nhận được nó ở mức rủi ro dự kiến',
        'Số tiền dự định dùng là tiền bạn chấp nhận mất hết mà không ảnh hưởng cuộc sống'
      ] },
      { type: 'p', text: 'Khi bắt đầu tiền thật, dùng rủi ro 0,25–0,5% mỗi lệnh thay vì 1% trong ít nhất 20 lệnh đầu. Mục tiêu giai đoạn này không phải kiếm tiền mà là đo khoảng cách giữa demo và thực tế: trượt giá thật, và việc bạn có còn tuân thủ khi mất tiền thật không. Lộ trình chi tiết ở bài 7.4.' }
    ],
    keyPoints: [
      'Kiểm chứng qua ba bước: backtest, forward test bằng tiền ảo, rồi tiền thật khối lượng nhỏ; mỗi bước có tiêu chí viết sẵn.',
      'TradingView Bar Replay cho phép tiến từng nến trong quá khứ; ghi quyết định trước khi bấm Forward và tự lưu lệnh vì dữ liệu replay trading không được lưu.',
      '30 lệnh quá ít: kết quả có thể âm hoặc dương rất đẹp chỉ do may rủi; tối thiểu 100 lệnh, càng nhiều càng tốt.',
      'Overfitting, look-ahead bias và survivorship bias đều làm backtest đẹp giả tạo; coin đã chết không còn trên biểu đồ.',
      'Phí, trượt giá, funding có thể xóa lợi thế, nhất là khi dừng lỗ hẹp.',
      'Forward test trên Binance Demo Trading, rồi vào tiền thật với rủi ro 0,25–0,5% mỗi lệnh.'
    ],
    practice: [
      'Mở TradingView, bật Bar Replay trên BTCUSDT khung H4, chọn điểm bắt đầu đầu năm 2022, và backtest 20 lệnh đầu tiên của hệ thống bạn viết ở bài 7.1, ghi vào bảng tính theo R.',
      'Với mỗi lệnh đã ghi, tính chi phí phí, trượt giá, funding quy ra R và so kỳ vọng trước và sau chi phí.',
      'Tạo tài khoản Binance Demo Trading, đặt thử một lệnh futures isolated với Stop-Market dừng lỗ theo đúng quy tắc, khối lượng tính theo 1% của số vốn thật bạn định dùng.'
    ],
    quiz: [
      { q: 'Backtest 30 lệnh cho kỳ vọng +0,5R. Kết luận hợp lý nhất là gì?', options: ['Hệ thống chắc chắn có lợi thế, có thể vào tiền thật ngay', 'Hệ thống chắc chắn không có lợi thế, nên bỏ ngay từ bây giờ', 'Chưa kết luận được; 30 lệnh quá ít, cần test tối thiểu 100 lệnh', 'Có lợi thế rõ, nên tăng đòn bẩy để tận dụng tối đa kỳ vọng'], answer: 2, explain: 'Với 30 lệnh, sai số chuẩn của kỳ vọng rất lớn, may rủi có thể tạo ra +0,5R. Không kết luận được có hay không có lợi thế. Tăng đòn bẩy dựa trên mẫu nhỏ là rủi ro nghiêm trọng.' },
      { q: 'Bạn test chiến lược trên 20 altcoin lớn nhất HIỆN NAY, dùng dữ liệu từ 2021. Kết quả rất tốt. Lỗi chính là gì?', options: ['Survivorship bias: danh sách hôm nay đã loại các coin đã chết', 'Look-ahead bias: dùng nến chưa đóng để ra quyết định vào lệnh', 'Cỡ mẫu quá lớn nên kết quả bị làm mượt một cách giả tạo', 'Chi phí funding giả định quá thấp so với thực tế thị trường'], answer: 0, explain: 'Chọn danh sách coin theo hiện tại nghĩa là chỉ test trên kẻ sống sót. Look-ahead bias là lỗi khác (dùng thông tin chưa có). Cỡ mẫu lớn không phải lỗi. Funding không giải thích vì sao kết quả đẹp giả tạo.' },
      { q: 'Giả định dừng lỗ cách giá vào 1%, phí 0,05% mỗi chiều. Riêng phí khứ hồi tốn bao nhiêu R?', options: ['0,05R', '0,01R', '0,5R', '0,1R'], answer: 3, explain: 'Dừng lỗ 1% nghĩa là giá trị danh nghĩa bằng 100 lần số tiền rủi ro. Phí khứ hồi 0,1% danh nghĩa = 0,1% × 100R = 0,1R. 0,05R là trường hợp dừng lỗ 2%. 0,01R và 0,5R không đúng phép tính.' },
      { q: 'Khi backtest bằng Bar Replay, việc nào gây ra look-ahead bias?', options: ['Ghi quyết định vào bảng trước khi bấm Forward sang nến kế tiếp', 'Kéo biểu đồ sang phải xem nến sau rồi mới quyết định vào lệnh', 'Chỉ đọc tín hiệu trên nến đã đóng, bỏ qua nến đang chạy dở', 'Chọn điểm bắt đầu ở nhiều giai đoạn tăng, giảm và đi ngang'], answer: 1, explain: 'Xem nến tương lai rồi quyết định là dùng thông tin mà lúc đó chưa có. Các lựa chọn còn lại chính là cách phòng look-ahead bias và làm backtest đáng tin hơn.' }
    ],
    sources: [
      { title: 'Bar Replay: how and why to test a strategy in the past', url: 'https://www.tradingview.com/support/solutions/43000712747-bar-replay-how-and-why-to-test-a-strategy-in-the-past/', note: 'TradingView Help Center, tiếng Anh' },
      { title: 'Learn to trade on historical data', url: 'https://www.tradingview.com/support/solutions/43000691889-learn-to-trade-on-historical-data/', note: 'TradingView Help Center, tiếng Anh' },
      { title: 'How much data is available for Bar Replay?', url: 'https://www.tradingview.com/support/solutions/43000692816-how-much-data-is-available-for-bar-replay/', note: 'TradingView Help Center, tiếng Anh' },
      { title: 'The Probability of Backtest Overfitting (Bailey, Borwein, López de Prado, Zhu)', url: 'https://scholarworks.wmich.edu/math_pubs/42/', note: 'Western Michigan University ScholarWorks, tiếng Anh' },
      { title: 'Mock Trading has transitioned to Binance Demo Trading', url: 'https://www.binance.com/en/support/faq/detail/b3706b248f2b4b1caabb4bf253bf067f', note: 'Binance FAQ, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c7-b3': {
    duration: 10,
    level: 'Trung cấp',
    summary: 'Biến mỗi phiên giao dịch thành một quy trình lặp lại: chuẩn bị trước, checklist trước lệnh, im lặng trong lệnh, ghi nhật ký sau lệnh.',
    goals: [
      'Chuẩn bị một phiên trong 20–30 phút: lịch tin theo giờ Việt Nam, khung lớn, vùng giá, cảnh báo giá',
      'Dùng checklist trước lệnh tổng hợp toàn khóa và từ chối lệnh khi thiếu một mục',
      'Đặt giới hạn số lệnh, mức lỗ ngày và thói quen sau lệnh để giao dịch không thành trò giải trí'
    ],
    blocks: [
      { type: 'h', text: 'Vì sao cần quy trình phiên' },
      { type: 'p', text: 'Phi công trước mỗi chuyến bay đều đọc checklist, dù đã bay hàng nghìn giờ. Không phải vì họ quên cách bay, mà vì một bước bị bỏ sót lúc mệt hoặc vội có thể gây hậu quả lớn. Giao dịch cũng vậy. Phần lớn lệnh thua nặng không đến từ phân tích sai, mà từ việc bỏ qua một bước: quên tin CPI, quên đặt dừng lỗ, vào lệnh khi đang tức.' },
      { type: 'p', text: 'Quy trình phiên chia làm ba giai đoạn: <strong>trước phiên</strong> (chuẩn bị, quyết định có giao dịch hay không), <strong>trong lệnh</strong> (để hệ thống làm việc), <strong>sau lệnh</strong> (ghi nhật ký, rút bài học). Với hệ thống D1/H4 như ở bài 7.1, bạn không cần ngồi cả ngày. Tổng thời gian thường chỉ 30–60 phút mỗi ngày.' },
      { type: 'callout', tone: 'risk', title: 'Hệ thống 7.1 ở đây chỉ là ví dụ quy trình', text: 'Các bước bên dưới dùng hệ thống mẫu bài 7.1 (vùng EMA 20–50, chốt 50% ở 2R, Chandelier) làm ví dụ cụ thể để bạn thấy một quy trình phiên chạy ra sao. Hệ thống đó đã backtest và <strong>không có lợi thế</strong> (bài 7.2), nên đây là bài học về cách vận hành quy trình, không phải vì hệ thống có lãi. Khi giao dịch tiền thật, thay phần điều kiện vào, dừng lỗ, chốt lời bằng hệ thống của chính bạn đã qua kiểm chứng ở bài 7.2. Phần kỷ luật chung (giới hạn ngày, tuần, chuỗi thua) giữ theo bộ chuẩn bài 5.9.' },
      { type: 'callout', tone: 'warn', title: 'Giao dịch không phải để giải trí', text: 'Nếu bạn mở ứng dụng sàn khi chán, khi chờ xe buýt, hay trước khi ngủ "cho vui", đó là dấu hiệu giao dịch đang thay thế giải trí. Thị trường crypto chạy 24/7, luôn có nến đang chạy để bạn bấm. Đa số ngày trong quy trình tốt là ngày <strong>không có lệnh nào</strong>, và đó là kết quả bình thường.' },

      { type: 'h', text: 'Quy trình ba giai đoạn' },
      { type: 'steps', items: [
        { title: 'Trước phiên 1: kiểm tra bản thân', text: 'Ngủ đủ không? Có đang tức giận, say, hay cần tiền gấp không? Hôm nay đã thua 2 lệnh liên tiếp hoặc lỗ 2R chưa? Tuần này đã lỗ 5R chưa? Có đang trong thời gian nghỉ theo quy tắc hệ thống của bạn không? Có một câu trả lời "có" là hôm nay không giao dịch.' },
        { title: 'Trước phiên 2: xem lịch tin', text: 'Mở lịch kinh tế, ghi các tin lớn trong 24 giờ tới theo giờ Việt Nam (xem bảng bên dưới). Đánh dấu vùng cấm mở lệnh quanh giờ tin. Bộ chuẩn bài 5.9 là 30 phút trước và 30 phút sau; hệ thống mẫu 7.1 dùng 60 phút, chặt hơn. Bài này dùng 60 phút.' },
        { title: 'Trước phiên 3: khung lớn', text: 'Mở D1 của BTC và ETH. Xu hướng theo quy tắc là tăng, giảm hay không rõ? Không rõ thì mã đó hôm nay không giao dịch.' },
        { title: 'Trước phiên 4: vùng giá và cảnh báo', text: 'Trên H4, đánh dấu vùng giá bạn chờ (ví dụ vùng EMA 20–EMA 50, hỗ trợ cũ). Đặt cảnh báo giá (alert) tại vùng đó rồi đóng biểu đồ. Không ngồi nhìn chờ giá.' },
        { title: 'Trong lệnh 1: đặt lệnh trọn gói', text: 'Khi có tín hiệu và qua checklist, đặt lệnh vào, dừng lỗ Stop-Market và mục tiêu chốt lời ngay trong một lần. Kiểm tra lại khối lượng, đòn bẩy, chế độ isolated trên màn hình xác nhận.' },
        { title: 'Trong lệnh 2: không nhìn lãi lỗ từng phút', text: 'Chỉ xem lại lệnh khi nến H4 đóng hoặc khi cảnh báo kêu. Nhìn con số lãi lỗ nhảy liên tục tạo cảm giác phải "làm gì đó", dẫn đến chốt non hoặc dời dừng lỗ. Tắt thông báo lãi lỗ nếu cần.' },
        { title: 'Trong lệnh 3: chỉ hành động theo quy tắc', text: 'Các hành động hợp lệ là những hành động hệ thống của bạn viết sẵn. Với hệ thống mẫu 7.1: chốt 50% ở 2R, dời dừng lỗ về hòa vốn, cập nhật dừng lỗ kéo theo sau nến H4 đóng, đóng theo dừng lỗ thời gian. Mọi hành động khác là phá quy tắc.' },
        { title: 'Sau lệnh 1: ghi nhật ký trong 24 giờ', text: 'Ghi giá vào, dừng lỗ, kết quả theo R, ảnh chụp biểu đồ lúc vào và lúc ra, đã tuân thủ đủ mọi quy tắc chưa, cảm xúc lúc vào và lúc ra (xem bài 6.5).' },
        { title: 'Sau lệnh 2: đánh giá quyết định, không đánh giá kết quả', text: 'Lệnh thua nhưng đúng quy tắc là lệnh tốt. Lệnh thắng nhưng phá quy tắc là lệnh xấu. Chấm điểm tuân thủ, không chấm điểm lãi lỗ.' },
        { title: 'Sau lệnh 3: kiểm tra giới hạn', text: 'Đã chạm giới hạn số lệnh hoặc mức lỗ ngày chưa? Nếu có, đóng ứng dụng sàn đến hết ngày.' }
      ] },

      { type: 'h', text: 'Giờ tin quan trọng theo giờ Việt Nam' },
      { type: 'p', text: 'Các số liệu vĩ mô Mỹ thường làm crypto biến động mạnh trong vài phút. Mỹ đổi giờ mùa hè (EDT) sang giờ mùa đông (EST) vào Chủ nhật đầu tháng 11, năm 2026 là ngày 01/11. Sau ngày này, giờ công bố theo giờ Việt Nam lùi một tiếng.' },
      { type: 'table', head: ['Sự kiện', 'Giờ Mỹ (ET)', 'Giờ VN khi Mỹ theo giờ mùa hè', 'Giờ VN khi Mỹ theo giờ mùa đông', 'Lịch gần nhất (giờ VN)'], rows: [
        ['CPI Mỹ (lạm phát, BLS)', '8:30 sáng', '19:30', '20:30', '14/10 lúc 19:30; 10/11 và 10/12 lúc 20:30'],
        ['Bảng lương phi nông nghiệp (Employment Situation, BLS)', '8:30 sáng', '19:30', '20:30', '02/10 lúc 19:30; 06/11 và 04/12 lúc 20:30'],
        ['Quyết định lãi suất FOMC', '2:00 chiều', '01:00 sáng hôm sau', '02:00 sáng hôm sau', 'Họp 27–28/10: 01:00 ngày 29/10; họp 8–9/12: 02:00 ngày 10/12. Họp báo 30 phút sau'],
        ['Funding Binance (mặc định)', '00:00, 08:00, 16:00 UTC', '07:00, 15:00, 23:00', '07:00, 15:00, 23:00', 'Hằng ngày; sàn có thể đổi chu kỳ khi biến động mạnh'],
        ['Chứng khoán New York mở cửa', '9:30 sáng', '20:30', '21:30', 'Ngày giao dịch trong tuần']
      ] },
      { type: 'callout', tone: 'note', title: 'Lịch có thể thay đổi', text: 'Lịch FOMC được Fed ghi là dự kiến cho đến khi được xác nhận ở cuộc họp trước đó. Luôn kiểm tra lịch mới nhất trên trang BLS và Federal Reserve. Ngoài ra, nghiên cứu của Eross, Urquhart và Wolfe (2019) cho thấy khối lượng và biến động bitcoin cao rõ rệt trong giờ giao dịch ban ngày của châu Âu và Mỹ, tức buổi chiều và tối theo giờ Việt Nam.' },

      { type: 'h', text: 'Checklist trước lệnh: tổng hợp cả khóa' },
      { type: 'p', text: 'Đây là checklist tổng hợp từ các chương trước. Mở nó trước mọi lệnh. Chỉ một mục chưa tick là không vào lệnh, không có ngoại lệ. Sau vài tuần bạn sẽ làm hết trong 2–3 phút.' },
      { type: 'checklist', title: 'Checklist trước lệnh', items: [
        'Tôi tỉnh táo, không tức giận, không vội, không đang trong thời gian nghỉ sau chuỗi thua',
        'Không có tin lớn (CPI, bảng lương, FOMC) trong 60 phút tới hoặc 60 phút vừa qua',
        'Xu hướng khung D1 thỏa đúng điều kiện trong hệ thống của tôi',
        'Giá đang ở vùng giá đã đánh dấu trước phiên, không phải vùng tôi vừa vẽ thêm để hợp lý hóa lệnh',
        'Tín hiệu vào xuất hiện trên nến H4 ĐÃ ĐÓNG',
        'Dừng lỗ đặt tại điểm quy tắc chỉ định, có vùng đệm ATR, không đặt đúng số tròn',
        'Khối lượng đã tính bằng công thức: rủi ro 1% ÷ khoảng cách dừng lỗ, làm tròn xuống',
        'Tổng rủi ro các lệnh đang mở cộng lệnh này không vượt 2R (2% tài khoản nếu 1R = 1%), tối đa 2 lệnh mở',
        'Futures: chế độ isolated, đòn bẩy thật không quá 3x, khoảng cách tới giá thanh lý ít nhất gấp 3 lần khoảng cách tới dừng lỗ',
        'Dừng lỗ dùng Stop-Market và sẽ được đặt cùng lúc với lệnh vào',
        'Mục tiêu 2R có không gian, không có kháng cự lớn chắn ngay trước',
        'Funding rate không cao bất thường theo chiều lệnh của tôi',
        'Tôi chấp nhận mất 1R của lệnh này mà không cảm thấy phải gỡ lại',
        'Hôm nay chưa chạm giới hạn số lệnh, mức lỗ 2R, chưa thua 2 lệnh liên tiếp; tuần này chưa lỗ 5R',
        'Tôi đã chụp biểu đồ và sẵn sàng ghi nhật ký'
      ] },
      { type: 'tool', name: 'position-size', note: 'Nhập số dư, % rủi ro, giá vào và giá dừng lỗ để lấy khối lượng trước khi tick mục khối lượng trong checklist.' },
      { type: 'calc', title: 'Kiểm tra khối lượng trước lệnh BTC (giả định)', rows: [
        ['Tài khoản, rủi ro 1%', '1.000 USDT × 1% = 10 USDT'],
        ['Giá vào, dừng lỗ', '80.000 và 78.400 → khoảng cách 1.600 USDT'],
        ['Khối lượng lý thuyết', '10 ÷ 1.600 = 0,00625 BTC'],
        ['Làm tròn xuống theo bước 0,001 BTC', '0,006 BTC'],
        ['Rủi ro thực tế', '0,006 × 1.600 = 9,6 USDT (0,96%)'],
        ['Giá trị danh nghĩa', '0,006 × 80.000 = 480 USDT']
      ], result: 'Vào 0,006 BTC, rủi ro 9,6 USDT. Giá trị danh nghĩa 480 USDT nhỏ hơn số dư, nên đòn bẩy thực tế chưa tới 1x dù bạn đặt 3x ở isolated. Đòn bẩy trên màn hình chỉ quyết định ký quỹ, không quyết định rủi ro.' },

      { type: 'h', text: 'Giới hạn số lệnh và mức lỗ ngày' },
      { type: 'list', items: [
        '<strong>Tối đa 2 lệnh mới mỗi ngày.</strong> Đây là mức chặt hơn trần 3 lệnh của bộ chuẩn bài 5.9. Với hệ thống H4, hiếm khi có hơn 2 tín hiệu hợp lệ. Lệnh thứ ba thường là lệnh cảm xúc.',
        '<strong>Lỗ ngày tối đa 2R, lỗ tuần tối đa 5R</strong> (bài 5.9; với 1R = 1% là 2% và 5% tài khoản). Chạm mức ngày thì đóng ứng dụng đến hôm sau, chạm mức tuần thì nghỉ đến tuần sau, kể cả khi "thấy cơ hội rất đẹp".',
        '<strong>Thua 2 lệnh liên tiếp: dừng trong ngày</strong> (bài 5.9). Riêng hệ thống mẫu 7.1 có thêm quy tắc chặt hơn: thua 3 lệnh liên tiếp thì nghỉ 48 giờ. Chuỗi thua là bình thường về thống kê, nhưng là lúc dễ giao dịch trả thù nhất.',
        '<strong>Không mở lệnh sau 23:00 nếu sáng hôm sau đi làm.</strong> Ngủ kém ngày mai sẽ quyết định kém.',
        '<strong>Không xem biểu đồ quá số lần đã định</strong>, ví dụ tối đa 6 lần mỗi ngày tại lúc nến H4 đóng.'
      ] },
      { type: 'scenario', title: 'Tối có tin CPI', setup: 'Tối 14/10/2026, CPI Mỹ công bố lúc 19:30 giờ VN. Lúc 19:00, ETH vừa hồi về vùng bạn đã đánh dấu và nến H4 19:00 cho tín hiệu vào.', bad: 'Người thứ nhất không xem lịch. Anh vào long lúc 19:05 với 10x vì tín hiệu "đẹp". 19:30 CPI ra, giá giật mạnh cả hai chiều, dừng lỗ Stop-Limit của anh bị trượt qua không khớp. Anh mất gấp ba lần dự tính, rồi mở tiếp lệnh ngược chiều để gỡ.', good: 'Người thứ hai đã ghi CPI 19:30 vào lịch lúc chuẩn bị trước phiên. Checklist mục 2 không tick được nên cô bỏ lệnh. Cô chờ đến nến H4 đóng lúc 23:00, sau vùng cấm, đánh giá lại từ đầu. Setup đã hỏng, cô không vào. Ngày không lệnh nào, rủi ro bằng 0.' },
      { type: 'callout', tone: 'risk', title: 'Vùng quanh tin lớn là nơi dừng lỗ bị trượt', text: 'Khi tin ra, thanh khoản sổ lệnh có thể mỏng đi trong vài giây và giá nhảy qua nhiều mức. Stop-Limit có thể không khớp, Stop-Market có thể khớp xa hơn giá kích hoạt. Mức lỗ thực tế có thể lớn hơn 1R. Đứng ngoài 60 phút quanh tin lớn rẻ hơn nhiều so với một lệnh trượt nặng.' }
    ],
    keyPoints: [
      'Mỗi phiên có ba giai đoạn: trước phiên (bản thân, lịch tin, khung lớn, vùng giá), trong lệnh (đặt trọn gói, không nhìn lãi lỗ từng phút), sau lệnh (nhật ký, chấm điểm tuân thủ).',
      'CPI và bảng lương Mỹ ra lúc 19:30 giờ VN khi Mỹ theo giờ mùa hè, 20:30 khi theo giờ mùa đông (từ 01/11/2026); FOMC 01:00 hoặc 02:00 sáng hôm sau.',
      'Checklist trước lệnh: thiếu một mục là không vào, không có ngoại lệ.',
      'Giới hạn: lỗ ngày 2R, lỗ tuần 5R, thua 2 lệnh liên tiếp dừng trong ngày (bài 5.9); bài này chọn tối đa 2 lệnh mới mỗi ngày, chặt hơn trần 3 lệnh. Quy tắc 3 thua nghỉ 48 giờ là của riêng hệ thống mẫu 7.1.',
      'Đa số ngày không có lệnh là bình thường; giao dịch không phải trò giải trí.'
    ],
    practice: [
      'Mở lịch BLS và Federal Reserve, ghi mọi ngày CPI, bảng lương, FOMC từ nay đến cuối năm theo giờ Việt Nam vào lịch điện thoại, kèm nhắc trước 60 phút.',
      'In hoặc lưu checklist trước lệnh, rồi chạy nó cho 3 setup trên Demo Trading trong tuần này, ghi lại mục nào khiến bạn bỏ lệnh.',
      'Viết 5 giới hạn cá nhân (số lệnh mỗi ngày, lỗ ngày, chuỗi thua, giờ không giao dịch, số lần xem biểu đồ) và dán cạnh màn hình.'
    ],
    quiz: [
      { q: 'CPI Mỹ tháng 10/2026 công bố ngày 10/11/2026 lúc 8:30 sáng giờ miền Đông. Theo giờ Việt Nam là mấy giờ?', options: ['19:30 ngày 10/11', '07:30 ngày 10/11', '21:30 ngày 10/11', '20:30 ngày 10/11'], answer: 3, explain: 'Từ 01/11/2026 Mỹ theo giờ mùa đông (EST, UTC−5), chênh 12 giờ với Việt Nam (UTC+7): 8:30 + 12 = 20:30. 19:30 là giờ khi Mỹ còn theo giờ mùa hè. 07:30 và 21:30 là tính sai chênh lệch.' },
      { q: 'Tài khoản 1.000 USDT, rủi ro 1%, vào BTC 80.000, dừng lỗ 78.400. Bạn đặt đòn bẩy 3x isolated. Rủi ro thực tế nếu dừng lỗ kích hoạt (bỏ qua phí, trượt giá) khi vào 0,006 BTC?', options: ['30 USDT, vì đòn bẩy 3x nhân rủi ro lên 3 lần', '9,6 USDT', '480 USDT', '160 USDT'], answer: 1, explain: 'Rủi ro = khối lượng × khoảng cách dừng lỗ = 0,006 × 1.600 = 9,6 USDT. Đòn bẩy chỉ quyết định ký quỹ, không nhân rủi ro khi khối lượng đã cố định. 480 USDT là giá trị danh nghĩa. 160 USDT là ký quỹ ở 3x.' },
      { q: 'Lệnh của bạn đang lãi 1,5R, chưa tới 2R. Bạn thấy lo và muốn chốt hết. Theo quy trình, bạn nên làm gì?', options: ['Chốt hết ngay để khóa lãi 1,5R trước khi giá quay đầu', 'Dời dừng lỗ sát giá hiện tại để giữ phần lãi đang có', 'Chỉ làm điều quy tắc cho phép, xem lại khi nến H4 đóng', 'Mở thêm một lệnh cùng chiều để tận dụng đà đang chạy'], answer: 2, explain: 'Trong lệnh chỉ thực hiện hành động hợp lệ theo quy tắc. Chốt non và dời dừng lỗ tùy tiện làm hỏng kỳ vọng của hệ thống và làm nhật ký không còn đo được hệ thống. Mở thêm lệnh vì hưng phấn là phá giới hạn rủi ro.' },
      { q: 'Hôm nay bạn đã thua 2 lệnh liên tiếp, tổng lỗ 2R. Một setup rất đẹp xuất hiện. Bạn làm gì?', options: ['Không vào: thua 2 lệnh liên tiếp, chạm 2R, nghỉ đến mai', 'Vào với khối lượng gấp đôi để gỡ lại 2R vừa mất trong ngày', 'Vào bình thường với 1R vì setup đẹp và đúng hệ thống', 'Vào nhưng bỏ dừng lỗ để lệnh có thêm chỗ dao động'], answer: 0, explain: 'Theo bộ chuẩn bài 5.9, thua 2 lệnh liên tiếp là dừng trong ngày, và lỗ 2R là chạm giới hạn lỗ ngày. Hai giới hạn này được đặt ra chính cho khoảnh khắc này. Gấp đôi khối lượng là giao dịch trả thù. "Setup đẹp" sau chuỗi thua là cảm nhận dễ sai nhất. Bỏ dừng lỗ là vi phạm quy tắc sống còn.' }
    ],
    sources: [
      { title: 'Schedule of Releases for the Consumer Price Index', url: 'https://www.bls.gov/schedule/news_release/cpi.htm', note: 'U.S. Bureau of Labor Statistics, tiếng Anh' },
      { title: 'Schedule of Releases for the Employment Situation', url: 'https://www.bls.gov/schedule/news_release/empsit.htm', note: 'U.S. Bureau of Labor Statistics, tiếng Anh' },
      { title: 'Meeting calendars and information (FOMC)', url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm', note: 'Federal Reserve, tiếng Anh' },
      { title: 'Introduction to Binance Futures Funding Rates', url: 'https://www.binance.com/en/support/faq/detail/360033525031', note: 'Binance FAQ, tiếng Anh' },
      { title: 'Time-of-day periodicities of trading volume and volatility in Bitcoin exchange (Eross, Urquhart, Wolfe, 2019)', url: 'https://www.sciencedirect.com/science/article/pii/S1544612319301904', note: 'Finance Research Letters, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c7-b4': {
    duration: 11,
    level: 'Trung cấp',
    summary: 'Lộ trình tối thiểu 90 ngày có tiêu chí định lượng để chuyển giai đoạn, cách nhận ra khi nào nên dừng trading chủ động, nguồn học tiếp và lời kết của khóa.',
    goals: [
      'Lập kế hoạch tối thiểu 90 ngày gồm 3 giai đoạn với tiêu chí chuyển giai đoạn đo được',
      'Biết các dấu hiệu định lượng cho thấy nên dừng trading chủ động và chuyển sang DCA',
      'Có danh sách nguồn học tiếp uy tín và nắm lại khung pháp lý, thuế Việt Nam hiện hành'
    ],
    blocks: [
      { type: 'h', text: 'Lộ trình tối thiểu 90 ngày: ba giai đoạn, ba cửa kiểm tra' },
      { type: 'p', text: 'Bạn đã có một bản mẫu để viết hệ thống (bài 7.1), cách kiểm chứng (bài 7.2) và quy trình phiên (bài 7.3). Lưu ý: chính hệ thống mẫu 7.1 đã trượt backtest, nên bạn chưa có hệ thống nào để giao dịch tiền thật. Ở giai đoạn 1, bạn làm một trong hai việc: tự thiết kế hệ thống của mình rồi backtest nó, hoặc forward test một ứng viên như Turtle 55/20 khung D1 (bài 7.2), vốn cũng <strong>chưa đạt chuẩn</strong> của khóa. Bài cuối ghép mọi thứ thành một lộ trình có cửa kiểm tra. Mỗi cửa có tiêu chí bằng số. Không đạt thì ở lại hoặc quay lại, không "thử liều" giai đoạn sau.' },
      { type: 'callout', tone: 'warn', title: '90 ngày là tối thiểu, không phải hạn chót', text: 'Tiêu chí chuyển giai đoạn tính theo số lệnh, không theo số ngày. Hệ thống khung D1/H4 cho rất ít lệnh. Ví dụ hệ thống mẫu 7.1 chỉ có 455 lệnh trên BTC và ETH trong 6,74 năm, khoảng 67–68 lệnh mỗi năm, tức 1,3 lệnh mỗi tuần. Với tần suất đó, 30 lệnh demo mất khoảng 23 tuần (hơn 5 tháng), 20 lệnh tiền thật mất thêm khoảng 15 tuần. Cả lộ trình có thể kéo dài 9–12 tháng. Hệ thống khung ngày như Turtle 55/20 còn cho ít lệnh hơn trên mỗi mã. Hạ tiêu chuẩn cho kịp lịch là cách nhanh nhất để quay về trading cảm tính.' },
      { type: 'table', head: ['Giai đoạn', 'Việc chính', 'Tiêu chí để sang giai đoạn sau (phải đạt TẤT CẢ)'], rows: [
        ['Giai đoạn 1: Giấy (tối thiểu 30 ngày, thường 5–6 tháng)', 'Tự viết hệ thống v1.0 hoặc chọn một ứng viên như Turtle 55/20 D1. Backtest bằng Bar Replay hoặc mã nguồn. Forward test trên Binance Demo Trading với số dư coi như số vốn thật dự định.', '≥ 100 lệnh backtest; ≥ 30 lệnh demo thời gian thực với cùng phiên bản quy tắc; kỳ vọng sau chi phí ≥ +0,15R; tuân thủ quy tắc ≥ 90%; 0 lần vi phạm quy tắc rủi ro (không đặt dừng lỗ, vượt 1%)'],
        ['Giai đoạn 2: Tiền nhỏ (tối thiểu 30 ngày, thường 3–4 tháng)', 'Tiền thật, rủi ro 0,25–0,5% mỗi lệnh, ưu tiên spot hoặc futures isolated tối đa 3x. Cùng phiên bản quy tắc.', '≥ 20 lệnh thật; tuân thủ ≥ 90%; sụt giảm tối đa ≤ 5% tài khoản; kỳ vọng thực tế không thấp hơn 50% kỳ vọng backtest; trượt giá thực tế đã được ghi và cập nhật vào tính toán'],
        ['Giai đoạn 3: Đánh giá (tối thiểu 30 ngày)', 'Tiếp tục ở mức rủi ro nhỏ. Cuối kỳ tổng hợp toàn bộ dữ liệu, so sánh backtest, demo và thật.', 'Quyết định một trong ba: tăng dần lên rủi ro 1%; lặp lại giai đoạn 2 với hệ thống đã sửa (phiên bản mới phải test lại từ giai đoạn 1); hoặc dừng trading chủ động và chỉ DCA']
      ] },
      { type: 'p', text: 'Tỷ lệ tuân thủ được tính đơn giản: số lệnh làm đúng 100% quy tắc chia cho tổng số lệnh. Một lệnh vào đúng nhưng dời dừng lỗ là một lệnh không tuân thủ. Con số này quan trọng hơn lãi lỗ ở 90 ngày đầu, vì lãi lỗ ngắn hạn phần lớn là may rủi, còn tuân thủ hoàn toàn trong tay bạn.' },

      { type: 'h', text: 'Mỗi tuần làm gì' },
      { type: 'steps', items: [
        { title: 'Hằng ngày (30–60 phút)', text: 'Chạy quy trình phiên của bài 7.3: kiểm tra bản thân, lịch tin, D1, vùng giá, cảnh báo. Ghi nhật ký mọi lệnh trong 24 giờ.' },
        { title: 'Cuối tuần (60 phút)', text: 'Tính số lệnh, tỷ lệ tuân thủ, tổng R, chuỗi thua dài nhất. Đọc lại 3 lệnh tệ nhất về mặt tuân thủ, không phải tệ nhất về lãi lỗ.' },
        { title: 'Cuối mỗi 30 ngày (2 giờ)', text: 'Đối chiếu với tiêu chí trong bảng. Viết một đoạn kết luận: đạt hay không, vì sao. Chưa đủ số lệnh thì ghi "chưa đủ dữ liệu" và ở lại, không chấm đạt sớm. Quyết định chuyển, ở lại, hay quay lại giai đoạn trước.' },
        { title: 'Không làm trong suốt lộ trình', text: 'Không đổi hệ thống giữa giai đoạn. Không thêm mã ngoài danh sách đã ghi trong hệ thống. Không tăng rủi ro vì "đang thắng". Không dùng tiền vay.' }
      ] },

      { type: 'h', text: 'Khi nào nên dừng trading chủ động và chỉ DCA' },
      { type: 'p', text: 'Đây là phần khó nói nhất nhưng quan trọng nhất. Số liệu ở chương 1 cho thấy đa số trader nhỏ lẻ thua lỗ: nghiên cứu Brazil ghi nhận 97% người day trade kiên trì hơn 300 ngày bị lỗ, và nghiên cứu Đài Loan cho thấy dưới 1% day trader có lợi nhuận vượt trội ổn định sau phí. Dừng trading chủ động không phải thất bại. Với nhiều người, đó là quyết định tài chính tốt nhất.' },
      { type: 'checklist', title: 'Dấu hiệu nên dừng trading chủ động (chỉ cần một)', items: [
        'Sau ít nhất 100 lệnh thật, kỳ vọng sau mọi chi phí vẫn ≤ 0',
        'Tỷ lệ tuân thủ dưới 80% trong hai tháng liên tiếp, dù đã cố gắng',
        'Sụt giảm tài khoản chạm 20% từ đỉnh (mức dừng tiền thật của bài 5.9), hoặc vượt rõ mức sụt tối đa trong backtest của chính hệ thống',
        'Lợi nhuận sau chi phí thấp hơn việc chỉ mua định kỳ BTC trong cùng giai đoạn',
        'Bạn vay tiền, dùng tiền sinh hoạt, hoặc giấu gia đình để giao dịch',
        'Giao dịch làm bạn mất ngủ, ảnh hưởng công việc hoặc các mối quan hệ',
        'Bạn liên tục phá giới hạn lỗ ngày và giao dịch trả thù'
      ] },
      { type: 'p', text: 'Về ngưỡng sụt giảm: bộ chuẩn bài 5.9 yêu cầu sụt 10% từ đỉnh thì giảm rủi ro mỗi lệnh còn một nửa, sụt 20% thì dừng tiền thật, quay lại demo và rà soát. Ngưỡng của từng hệ thống nên dựa vào mức sụt tối đa trong backtest của chính nó. Ví dụ danh mục Turtle 55/20 với rủi ro 1% từng sụt 16,9% trong giai đoạn 2020–2026. Nếu bạn đặt ngưỡng bỏ hệ thống ở 15%, bạn sẽ bỏ nó trong một đợt sụt mà lịch sử cho thấy là bình thường. Ngược lại, sụt vượt rõ mức tối đa của backtest là dấu hiệu hệ thống có thể đã hết tác dụng, hoặc bạn đang làm khác quy tắc.' },
      { type: 'calc', title: 'Thời gian của bạn đáng giá bao nhiêu? (giả định)', rows: [
        ['Vốn giao dịch', '20.000.000 đồng'],
        ['Lãi ròng sau 90 ngày (giả định khá tốt)', '20.000.000 × 3% = 600.000 đồng'],
        ['Thời gian bỏ ra', '1 giờ/ngày × 90 ngày = 90 giờ'],
        ['Thu nhập mỗi giờ', '600.000 ÷ 90 ≈ 6.667 đồng/giờ'],
        ['Thuế TNCN 0,1% khi bán qua tổ chức được cấp phép, ví dụ một lần bán 10.000.000 đồng', '10.000.000 × 0,1% = 10.000 đồng']
      ], result: 'Ngay cả khi có lãi, với vốn nhỏ, thu nhập mỗi giờ có thể rất thấp. Giá trị thật của 90 ngày đầu là kỹ năng và dữ liệu về bản thân, không phải tiền lãi. Nếu dữ liệu cho thấy bạn không có lợi thế, thời gian đó nên dành cho công việc chính và DCA.' },
      { type: 'figure', name: 'dca', caption: 'DCA: mua cùng một số tiền theo định kỳ. Giá vốn trung bình tự điều chỉnh theo giá thị trường, không cần canh điểm vào, không cần nhìn biểu đồ mỗi ngày.' },
      { type: 'scenario', title: 'Cuối lộ trình: dữ liệu không như mong muốn', setup: 'Sau khoảng một năm theo lộ trình, người học có 35 lệnh thật, tuân thủ 72%, kỳ vọng −0,1R. Các lệnh thua lớn nhất đều là lệnh phá quy tắc.', bad: 'Người thứ nhất nghĩ "chỉ cần hệ thống tốt hơn". Anh bỏ hệ thống, mua một khóa "tín hiệu VIP", tăng đòn bẩy để gỡ nhanh. Sáu tháng sau tài khoản còn một nửa.', good: 'Người thứ hai đọc dữ liệu: vấn đề không phải hệ thống mà là tuân thủ. Cô chọn hoặc quay về giai đoạn giấy 30 ngày chỉ để luyện tuân thủ, hoặc dừng trading chủ động. Cô chọn cách thứ hai: đặt lệnh DCA hằng tháng với số tiền cố định, xóa ứng dụng futures, và dùng thời gian học thêm kỹ năng nghề chính.' },

      { type: 'h', text: 'Pháp lý, thuế và nguồn học tiếp' },
      { type: 'callout', tone: 'risk', title: 'Khung pháp lý Việt Nam (tính đến 27/09/2026)', text: 'Nghị quyết 05/2025/NQ-CP thí điểm thị trường tài sản mã hóa 5 năm: giao dịch phải bằng Đồng Việt Nam qua tổ chức được Bộ Tài chính cấp phép, và nghị quyết <strong>không nhắc đến giao dịch phái sinh/hợp đồng tương lai</strong>. Nghị định 284/2026/NĐ-CP (hiệu lực 01/09/2026) quy định phạt 30–50 triệu đồng với nhà đầu tư trong nước giao dịch không qua tổ chức được cấp phép; theo Ủy ban Chứng khoán Nhà nước, mức phạt áp dụng sau 6 tháng kể từ khi sàn đầu tiên được cấp phép. Thông tư 32/2026/TT-BTC: thuế TNCN 0,1% trên giá chuyển nhượng từng lần qua tổ chức cung cấp dịch vụ. Khung pháp lý thay đổi nhanh; kiểm tra văn bản mới nhất trên cổng thông tin Chính phủ và Ủy ban Chứng khoán Nhà nước. Khóa học không phải tư vấn pháp lý.' },
      { type: 'p', text: 'Sách kinh điển nên đọc tiếp, theo thứ tự ưu tiên cho người đã học xong khóa này:' },
      { type: 'list', items: [
        '<strong>Mark Douglas, "Trading in the Zone" (2000)</strong>: tâm lý, tư duy xác suất, vì sao tuân thủ quan trọng hơn dự đoán.',
        '<strong>Van K. Tharp, "Trade Your Way to Financial Freedom" (1999)</strong>: R-multiple, kỳ vọng, quản lý khối lượng lệnh.',
        '<strong>Jack D. Schwager, "Market Wizards" (1989)</strong>: phỏng vấn các trader chuyên nghiệp; điểm chung của họ là quản trị rủi ro.',
        '<strong>John J. Murphy, "Technical Analysis of the Financial Markets" (1999)</strong>: sách giáo khoa phân tích kỹ thuật toàn diện.',
        '<strong>Daniel Kahneman, "Thinking, Fast and Slow" (2011)</strong>: các thiên kiến nhận thức ảnh hưởng quyết định tài chính.',
        '<strong>Nassim Nicholas Taleb, "Fooled by Randomness" (2001)</strong>: phân biệt kỹ năng với may mắn, rất hợp khi đánh giá backtest.'
      ] },
      { type: 'p', text: 'Trang giáo dục chính thức, miễn phí: <strong>Binance Academy</strong> (kiến thức crypto, futures), <strong>StockCharts ChartSchool</strong> (chỉ báo, mô hình giá), <strong>CFTC Learn and Protect</strong> và <strong>Investor.gov của SEC</strong> (cảnh báo lừa đảo, rủi ro), <strong>Babypips</strong> (nền tảng giao dịch cho người mới), trung tâm trợ giúp <strong>TradingView</strong> (công cụ backtest). Tại Việt Nam: cổng thông tin Chính phủ và Ủy ban Chứng khoán Nhà nước cho văn bản pháp lý. Tránh các nhóm "tín hiệu VIP", người hứa lợi nhuận cố định, và mọi khóa học khoe ảnh chụp lãi.' },

      { type: 'h', text: 'Nguyên tắc sống còn và lời kết' },
      { type: 'list', ordered: true, items: [
        'Rủi ro tối đa 1% tài khoản mỗi lệnh; tổng rủi ro mở tối đa 2%.',
        'Dừng lỗ đặt ngay khi vào lệnh, dùng Stop-Market với futures, không bao giờ nới ra xa.',
        'Futures chỉ isolated, đòn bẩy thấp, luyện trên Demo Trading trước.',
        'Không giao dịch quanh tin lớn, khi mệt, khi tức, khi cần tiền gấp.',
        'Không dùng tiền vay, tiền sinh hoạt; chỉ dùng tiền bạn chấp nhận mất hết.',
        'Mọi thay đổi hệ thống phải test lại; mọi lệnh phải ghi nhật ký.',
        'Nếu dữ liệu nói bạn không có lợi thế, hãy tin dữ liệu và chuyển sang DCA.'
      ] },
      { type: 'p', text: 'Khóa học này không hứa bạn sẽ kiếm được tiền. Không ai trung thực có thể hứa điều đó. Điều khóa học cố gắng làm là giúp bạn thay tiếng nói của cảm xúc bằng quy tắc, thay niềm tin bằng dữ liệu, và giữ tài khoản sống đủ lâu để biết sự thật về chính mình. Nếu cuối lộ trình bạn kết luận rằng DCA hợp với mình hơn, khóa học đã thành công, vì bạn đã tránh được những năm thua lỗ mà nhiều người phải trải qua trước khi hiểu ra. Chúc bạn giao dịch có kỷ luật, và biết dừng đúng lúc.' }
    ],
    keyPoints: [
      'Lộ trình tối thiểu 90 ngày: giấy, tiền nhỏ (rủi ro 0,25–0,5%), đánh giá; mỗi cửa có tiêu chí bằng số và tính theo số lệnh, nên với hệ thống D1/H4 thường mất 9–12 tháng.',
      'Hệ thống mẫu 7.1 đã trượt backtest; giai đoạn 1 là tự thiết kế hệ thống hoặc forward test một ứng viên như Turtle 55/20, vốn chưa đạt chuẩn.',
      'Tiêu chí mẫu: ≥ 100 lệnh backtest, ≥ 30 lệnh demo, tuân thủ ≥ 90%, kỳ vọng sau chi phí ≥ +0,15R; thiếu số lệnh thì kéo dài, không hạ chuẩn.',
      'Dừng trading chủ động khi kỳ vọng ≤ 0 sau 100 lệnh thật, tuân thủ < 80% hai tháng liền, sụt 20% từ đỉnh hoặc vượt rõ mức sụt tối đa của backtest, hoặc giao dịch ảnh hưởng cuộc sống.',
      'DCA là lựa chọn hợp lý, không phải thất bại; thời gian của bạn cũng có giá.',
      'Pháp lý VN đang thay đổi: giao dịch qua tổ chức được cấp phép, thuế TNCN 0,1% mỗi lần chuyển nhượng, phái sinh chưa được đề cập.'
    ],
    practice: [
      'Chép bảng lộ trình vào lịch của bạn, ghi ngày bắt đầu và ngày kiểm tra cuối mỗi giai đoạn, kèm tiêu chí bằng số.',
      'Tạo bảng theo dõi tuần với các cột: số lệnh, tỷ lệ tuân thủ, tổng R, chuỗi thua dài nhất, sụt giảm tối đa.',
      'Viết sẵn "kế hoạch B": số tiền DCA hằng tháng, ngày mua, và điều kiện cụ thể khiến bạn chuyển sang kế hoạch này.',
      'Chọn một cuốn sách trong danh sách và đặt mục tiêu đọc xong trong giai đoạn 1.'
    ],
    quiz: [
      { q: 'Kết thúc giai đoạn giấy, bạn có 110 lệnh backtest, 34 lệnh demo, tuân thủ 85%, kỳ vọng +0,2R. Bạn nên làm gì?', options: ['Ở lại giai đoạn giấy, vì tuân thủ 85% chưa đạt mức 90%', 'Chuyển sang tiền thật nhỏ vì kỳ vọng dương và đủ số lệnh', 'Chuyển sang tiền thật với rủi ro 1% luôn cho đỡ mất thời gian', 'Đổi sang hệ thống khác vì hệ thống này vẫn chưa hoàn hảo'], answer: 0, explain: 'Phải đạt tất cả tiêu chí. Số lệnh và kỳ vọng đạt, nhưng tuân thủ 85% dưới 90%. Kỳ vọng dương khi bạn không làm đúng quy tắc không đáng tin. Đổi hệ thống không giải quyết vấn đề tuân thủ.' },
      { q: 'Vốn 20 triệu đồng, lãi ròng 3% sau 90 ngày, mỗi ngày dành 1 giờ. Thu nhập mỗi giờ khoảng bao nhiêu?', options: ['66.667 đồng', '600.000 đồng', '6.667 đồng', '222 đồng'], answer: 2, explain: '20.000.000 × 3% = 600.000 đồng; 600.000 ÷ 90 giờ ≈ 6.667 đồng/giờ. 600.000 là tổng lãi, 66.667 là chia cho 9 giờ, 222 là chia nhầm cho 2.700.' },
      { q: 'Trường hợp nào là dấu hiệu rõ ràng nên dừng trading chủ động và chuyển sang DCA?', options: ['Thua 4 lệnh liên tiếp ngay trong tuần đầu dùng tiền thật', 'Sau 120 lệnh thật, kỳ vọng −0,05R, tuân thủ dưới 80% hai tháng', 'Thị trường đi ngang suốt một tháng, hệ thống gần như không có lệnh', 'Có một lệnh thắng lớn nhưng lệnh đó phá quy tắc dừng lỗ'], answer: 1, explain: 'Mẫu đủ lớn (trên 100 lệnh) với kỳ vọng âm và tuân thủ kém kéo dài là bằng chứng rõ ràng. Chuỗi 4 thua là bình thường về thống kê. Thị trường đi ngang một tháng chỉ cần đứng ngoài. Một lệnh phá quy tắc cần rút kinh nghiệm, chưa đủ để dừng hẳn.' },
      { q: 'Theo Thông tư 32/2026/TT-BTC, cá nhân bán tài sản mã hóa trị giá 50 triệu đồng qua tổ chức cung cấp dịch vụ nộp thuế TNCN bao nhiêu?', options: ['5.000.000 đồng (10%)', '500.000 đồng (1%)', '0 đồng', '50.000 đồng (0,1%)'], answer: 3, explain: 'Thuế TNCN là 0,1% trên giá chuyển nhượng từng lần: 50.000.000 × 0,1% = 50.000 đồng. 10% và 1% là tỷ lệ sai. Không phải 0 vì thuế tính trên từng lần chuyển nhượng, kể cả khi lỗ.' }
    ],
    sources: [
      { title: 'Toàn văn Nghị quyết 05/2025/NQ-CP về triển khai thí điểm thị trường tài sản mã hóa tại Việt Nam', url: 'https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-5-2025-nq-cp-ve-trien-khai-thi-diem-thi-truong-tai-san-ma-hoa-tai-viet-nam-119250909184045221.htm', note: 'Cổng thông tin Chính phủ, 2025, tiếng Việt' },
      { title: 'Cách tính thuế đối với tài sản mã hóa tại Việt Nam năm 2026', url: 'https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/chinh-sach-moi/109643/cach-tinh-thue-doi-voi-tai-san-ma-hoa-tai-viet-nam-nam-2026', note: 'Thư Viện Pháp Luật, 2026, tiếng Việt' },
      { title: 'Cung cấp dịch vụ liên quan đến tài sản mã hóa khi chưa được cấp phép bị phạt tới 200 triệu đồng', url: 'https://baochinhphu.vn/cung-cap-dich-vu-lien-quan-den-tai-san-ma-hoa-khi-chua-duoc-cap-phep-bi-phat-toi-200-trieu-dong-10226071715275345.htm', note: 'Báo Chính phủ, 2026, tiếng Việt' },
      { title: 'Từ 1.9, nhà đầu tư cá nhân giao dịch tài sản mã hóa sẽ bị xử phạt?', url: 'https://thanhnien.vn/tu-19-nha-dau-tu-ca-nhan-giao-dich-tai-san-ma-hoa-se-bi-xu-phat-185260901090323003.htm', note: 'Báo Thanh Niên, 01/09/2026, tiếng Việt' },
      { title: 'Day Trading for a Living? (Chague, De-Losso, Giovannetti)', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3423101', note: 'SSRN, 2019, tiếng Anh' },
      { title: 'Understand the Risks of Virtual Currency Trading', url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html', note: 'CFTC, tiếng Anh' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
