const lessons = {
  'c2-b1': {
    duration: 9,
    level: 'Cơ bản',
    summary: 'Đọc một cây nến qua bốn giá OHLC, hiểu giờ đóng nến theo UTC và dùng mẫu nến như tín hiệu cần bối cảnh, không phải lệnh mua bán.',
    goals: [
      'Đọc được giá mở, đóng, cao, thấp, thân và bóng của bất kỳ cây nến nào',
      'Biết chính xác giờ đóng nến D1, H4, W1 theo giờ Việt Nam',
      'Nhận diện doji, búa, sao băng, nhấn chìm và biết khi nào chúng đáng để ý',
      'Áp dụng quy trình ba câu hỏi trước khi tin vào một mẫu nến'
    ],
    blocks: [
      { type: 'h', text: 'Một cây nến kể gì: bốn con số OHLC' },
      { type: 'p', text: 'Biểu đồ nến Nhật (candlestick) bắt nguồn từ Nhật Bản, gắn với thương nhân buôn gạo Munehisa Homma (1724–1803) sống ở thế kỷ 18. Phương Tây chỉ biết rộng rãi đến nó sau khi Steve Nison giới thiệu vào năm 1991. Ngày nay gần như mọi sàn crypto đều dùng nến làm biểu đồ mặc định.' },
      { type: 'p', text: 'Mỗi cây nến tóm tắt một khoảng thời gian bằng bốn con số, gọi tắt là <strong>OHLC</strong>: giá mở (Open) là giá khớp đầu tiên, giá cao nhất (High), giá thấp nhất (Low) và giá đóng (Close) là giá khớp cuối cùng của khoảng thời gian đó.' },
      { type: 'list', items: [
        '<strong>Thân nến (body)</strong>: phần đặc nằm giữa giá mở và giá đóng. Nến xanh (tăng) là giá đóng cao hơn giá mở. Nến đỏ (giảm) là giá đóng thấp hơn giá mở.',
        '<strong>Bóng trên (upper wick/shadow)</strong>: từ đỉnh thân lên giá cao nhất. Bóng trên dài nghĩa là giá từng lên cao nhưng bị bán xuống.',
        '<strong>Bóng dưới (lower wick/shadow)</strong>: từ đáy thân xuống giá thấp nhất. Bóng dưới dài nghĩa là giá từng rơi sâu nhưng được mua lên lại.',
        '<strong>Biên độ (range)</strong>: giá cao nhất trừ giá thấp nhất, cho biết cây nến biến động mạnh hay yếu.'
      ] },
      { type: 'figure', name: 'candle-anatomy', caption: 'Nến tăng và nến giảm: thân nằm giữa giá mở và giá đóng, bóng nối tới giá cao nhất và thấp nhất.' },
      { type: 'calc', title: 'Tách một nến BTC D1 thành các phần (giá giả định)', rows: [
        ['Dữ liệu', 'Mở 80.000 · Cao 81.500 · Thấp 79.200 · Đóng 81.200 (USDT)'],
        ['Loại nến', 'Đóng 81.200 > Mở 80.000 → nến tăng'],
        ['Thân nến', '81.200 − 80.000 = 1.200 USDT'],
        ['Bóng trên', '81.500 − 81.200 = 300 USDT'],
        ['Bóng dưới', '80.000 − 79.200 = 800 USDT'],
        ['Biên độ', '81.500 − 79.200 = 2.300 USDT'],
        ['Thân so với biên độ', '1.200 ÷ 2.300 ≈ 52,2%']
      ], result: 'Nến tăng, thân chiếm khoảng một nửa biên độ, bóng dưới dài gấp gần 3 lần bóng trên: phe mua kiểm soát phần lớn phiên, nhưng đây mới là mô tả, chưa phải tín hiệu.' },
      { type: 'callout', tone: 'warn', title: 'Nến không cho biết thứ tự', text: 'Một cây nến không cho bạn biết giá lên đỉnh trước hay xuống đáy trước. Nến H4 có bóng dưới dài có thể đã quét thủng dừng lỗ của nhiều người rồi mới hồi lên. Muốn biết diễn biến bên trong, bạn phải xem khung nhỏ hơn.' },

      { type: 'h', text: 'Khung thời gian và giờ đóng nến' },
      { type: 'p', text: 'Khung thời gian (timeframe) là độ dài mỗi cây nến. Sàn lớn như Binance cung cấp từ 1 phút (1m) đến 1 tháng (1M), gồm 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M. Trong khóa này ta viết H1 = 1 giờ, H4 = 4 giờ, D1 = 1 ngày, W1 = 1 tuần.' },
      { type: 'p', text: 'Crypto giao dịch 24/7 nên không có giờ mở cửa hay đóng cửa như chứng khoán. Thay vào đó, dữ liệu nến của Binance mặc định tính theo giờ UTC. Việt Nam là UTC+7, nên bạn cần quy đổi để biết lúc nào nến thật sự đóng.' },
      { type: 'table', head: ['Khung', 'Đóng nến theo UTC', 'Giờ Việt Nam (UTC+7)'], rows: [
        ['D1', '00:00 mỗi ngày', '07:00 sáng'],
        ['H4', '00:00, 04:00, 08:00, 12:00, 16:00, 20:00', '07:00, 11:00, 15:00, 19:00, 23:00, 03:00'],
        ['H1', 'Đầu mỗi giờ', 'Đầu mỗi giờ'],
        ['W1', 'Thường là thứ Hai 00:00', 'Thường là 07:00 sáng thứ Hai']
      ] },
      { type: 'callout', tone: 'tip', title: 'Kiểm tra múi giờ biểu đồ', text: 'Một số giao diện biểu đồ cho bạn chọn múi giờ hiển thị. Đổi múi giờ hiển thị không làm đổi giờ đóng nến ngày trên dữ liệu gốc của sàn. Hãy mở cài đặt biểu đồ và ghi lại giờ đóng nến D1 thực tế trên sàn bạn dùng.' },
      { type: 'p', text: 'Quy tắc quan trọng nhất: <strong>một cây nến chỉ có ý nghĩa khi đã đóng</strong>. Nến D1 đang chạy lúc 20:00 giờ Việt Nam có thể trông như cây búa đẹp, nhưng đến 07:00 sáng hôm sau nó có thể thành nến giảm thân dài. Nếu hệ thống của bạn dựa trên nến D1, hãy ra quyết định sau 07:00 sáng, không phải giữa ngày.' },
      { type: 'p', text: 'Khung càng nhỏ thì nhiễu càng nhiều. Nến 1m, 5m phản ánh phần lớn là dao động ngẫu nhiên và lệnh của bot. Người mới nên bắt đầu với D1 và H4, vì mỗi quyết định có thời gian suy nghĩ và mỗi mẫu nến chứa nhiều giao dịch hơn.' },

      { type: 'h', text: 'Mẫu nến đơn và đôi phổ biến' },
      { type: 'figure', name: 'candle-patterns', caption: 'Doji, búa, sao băng, nhấn chìm tăng và nhấn chìm giảm.' },
      { type: 'table', head: ['Mẫu nến', 'Nhận diện', 'Ý nghĩa gốc', 'Điều kiện để đáng chú ý'], rows: [
        ['Doji', 'Giá mở và đóng gần như bằng nhau, thân rất mỏng', 'Do dự, hai phe giằng co', 'Xuất hiện sau chuỗi nến thân dài; doji giữa các nến thân nhỏ thì không quan trọng'],
        ['Búa (hammer)', 'Thân nhỏ ở phía trên, bóng dưới dài ít nhất gấp 2 lần thân, bóng trên rất ngắn hoặc không có', 'Bị bán mạnh nhưng được mua lên lại', 'Phải xuất hiện sau một nhịp giảm, tốt nhất tại vùng hỗ trợ'],
        ['Sao băng (shooting star)', 'Thân nhỏ ở phía dưới, bóng trên dài ít nhất gấp 2 lần thân', 'Được mua lên cao nhưng bị bán xuống', 'Phải xuất hiện sau một nhịp tăng, tốt nhất tại vùng kháng cự'],
        ['Nhấn chìm tăng (bullish engulfing)', 'Nến đỏ, sau đó nến xanh có thân trùm kín thân nến đỏ', 'Phe mua giành lại quyền kiểm soát', 'Sau nhịp giảm; nến xanh càng dài càng mạnh'],
        ['Nhấn chìm giảm (bearish engulfing)', 'Nến xanh, sau đó nến đỏ có thân trùm kín thân nến xanh', 'Phe bán giành lại quyền kiểm soát', 'Sau nhịp tăng, tại vùng kháng cự']
      ] },
      { type: 'calc', title: 'Kiểm tra một cây nến có đạt chuẩn búa không (giá giả định)', rows: [
        ['Dữ liệu nến H4', 'Mở 80.000 · Cao 80.150 · Thấp 78.800 · Đóng 80.100'],
        ['Thân', '80.100 − 80.000 = 100'],
        ['Bóng dưới', '80.000 − 78.800 = 1.200'],
        ['Bóng trên', '80.150 − 80.100 = 50'],
        ['Tỷ lệ bóng dưới / thân', '1.200 ÷ 100 = 12 lần (≥ 2 lần: đạt)'],
        ['Bóng trên so với thân', '50 < 100: bóng trên ngắn (đạt)']
      ], result: 'Về hình dạng đây là cây búa. Nhưng nó chỉ đáng giá nếu nằm sau một nhịp giảm và tại vùng hỗ trợ đã đánh dấu trước.' },

      { type: 'h', text: 'Vì sao mẫu nến đơn lẻ dễ lừa bạn' },
      { type: 'p', text: 'Mẫu nến rất dễ học, nên cũng rất dễ bị lạm dụng. StockCharts ChartSchool nhấn mạnh ba điều mà người mới hay bỏ qua:' },
      { type: 'list', ordered: true, items: [
        '<strong>Cần xu hướng trước đó.</strong> Một mẫu đảo chiều tăng chỉ có nghĩa khi có một xu hướng giảm để đảo. Cây búa xuất hiện giữa vùng đi ngang không đảo chiều cái gì cả.',
        '<strong>Cần xác nhận.</strong> ChartSchool gợi ý xác nhận nên đến trong 1 đến 3 nến sau mẫu, ví dụ một nến tăng thân dài hoặc một nhịp tăng có volume lớn. Không có xác nhận thì mẫu nến chỉ là một gợi ý.',
        '<strong>Hiệu lực ngắn.</strong> Mẫu nến là tín hiệu ngắn hạn, thường chỉ có tác dụng trong khoảng 1 đến 2 tuần trên nến ngày. Nó không dự báo xu hướng vài tháng.'
      ] },
      { type: 'callout', tone: 'risk', title: 'Mua ngay khi thấy búa là cách mất tiền phổ biến', text: 'Trong xu hướng giảm mạnh, bạn sẽ thấy nhiều cây búa liên tiếp, cây sau thấp hơn cây trước. Nếu mỗi lần thấy búa bạn lại mua, bạn đang bắt dao rơi nhiều lần. Mẫu nến là bộ lọc để xác nhận một vùng giá bạn đã chọn từ trước, không phải lý do độc lập để vào lệnh.' },
      { type: 'analogy', text: 'Mẫu nến giống một câu nói tách khỏi đoạn hội thoại. Câu "được thôi" có thể là đồng ý, cũng có thể là mỉa mai. Bạn chỉ hiểu đúng khi biết cả đoạn trước và sau. Xu hướng và vùng giá chính là đoạn hội thoại của cây nến.' },

      { type: 'h', text: 'Quy trình đọc nến có bối cảnh' },
      { type: 'steps', items: [
        { title: 'Xác định bối cảnh trên khung lớn', text: 'Trên D1, giá đang tăng, giảm hay đi ngang? (xem bài 2.2). Ghi ra một chữ: tăng, giảm hoặc ngang.' },
        { title: 'Kiểm tra vị trí', text: 'Nến có nằm tại vùng hỗ trợ hoặc kháng cự đã đánh dấu từ trước không? (xem bài 2.3). Nến đẹp ở giữa hư không thì bỏ qua.' },
        { title: 'Chờ nến đóng', text: 'Chỉ đánh giá khi nến đã đóng theo giờ của khung đó. Với D1 là sau 07:00 sáng giờ Việt Nam.' },
        { title: 'Chờ xác nhận', text: 'Chờ 1 đến 3 nến tiếp theo đi đúng hướng, ví dụ nến sau đóng cao hơn đỉnh của cây búa.' },
        { title: 'Đặt điểm sai', text: 'Nếu vào lệnh, điểm dừng lỗ tự nhiên là phía bên kia bóng nến. Với cây búa ở ví dụ trên là dưới 78.800. Nếu giá thủng mức này, ý tưởng đã sai.' }
      ] },
      { type: 'scenario', title: 'Cây búa trên H1 lúc 22:00', setup: 'BTC giảm liên tục 3 ngày trên D1 (giả định từ 86.000 xuống 80.000). Trên H1 xuất hiện một cây búa đẹp tại 80.000.', bad: 'Trader cảm tính thấy "búa đảo chiều" liền mua với toàn bộ vốn, không đặt dừng lỗ vì tin đáy đã đến. Hai giờ sau giá thủng 79.000, xuất hiện thêm một cây búa khác thấp hơn. Trader mua thêm để "trung bình giá".', good: 'Trader có kế hoạch ghi nhận bối cảnh D1 là giảm, nên không tìm lệnh mua trên H1. Anh chỉ đánh dấu cây búa vào nhật ký, chờ nến D1 đóng lúc 07:00 sáng và chờ cấu trúc D1 thay đổi trước khi cân nhắc mua. Không có lệnh cũng là một quyết định.' },
      { type: 'checklist', title: 'Trước khi tin vào một mẫu nến', items: [
        'Nến đã đóng theo đúng giờ của khung thời gian',
        'Có xu hướng trước đó để mẫu nến đảo chiều',
        'Mẫu nến nằm tại vùng giá đã đánh dấu từ trước',
        'Đã có ít nhất 1 nến xác nhận đi đúng hướng',
        'Biết giá nào thì ý tưởng sai và đặt dừng lỗ ở đó'
      ] }
    ],
    keyPoints: [
      'Mỗi nến gồm bốn giá OHLC; thân là từ mở đến đóng, bóng là tới giá cao nhất và thấp nhất.',
      'Nến D1 trên Binance đóng lúc 00:00 UTC, tức 07:00 sáng giờ Việt Nam; chỉ đánh giá nến khi đã đóng.',
      'Búa cần bóng dưới dài ít nhất gấp 2 lần thân và phải xuất hiện sau nhịp giảm.',
      'Mẫu nến cần bối cảnh (xu hướng, vùng giá) và xác nhận trong 1 đến 3 nến sau.',
      'Mẫu nến là bộ lọc xác nhận, không phải tín hiệu vào lệnh độc lập.'
    ],
    practice: [
      'Mở biểu đồ BTCUSDT D1, chọn 5 cây nến gần nhất và tự tính thân, bóng trên, bóng dưới, biên độ của từng cây.',
      'Ghi vào sổ giờ đóng nến D1 và H4 theo giờ Việt Nam trên sàn bạn dùng, đối chiếu bằng cách quan sát lúc nến mới xuất hiện.',
      'Tìm 5 cây búa trong 6 tháng dữ liệu D1. Với mỗi cây, ghi lại: có nằm sau nhịp giảm không, có ở vùng hỗ trợ không, 3 nến sau có xác nhận không.'
    ],
    quiz: [
      { q: 'Nến D1 có giá Mở 3.000, Cao 3.090, Thấp 2.940, Đóng 3.060 (giả định). Bóng dưới dài bao nhiêu?', options: ['120', '150', '30', '60'], answer: 3, explain: 'Nến tăng nên đáy thân là giá mở 3.000. Bóng dưới = 3.000 − 2.940 = 60. 120 là lấy giá đóng trừ giá thấp nhất (3.060 − 2.940), nhầm đáy thân của nến tăng; 30 là bóng trên (3.090 − 3.060); 150 là biên độ (3.090 − 2.940).' },
      { q: 'Bạn giao dịch theo nến D1 trên Binance và đang ở Việt Nam. Nến D1 hôm nay đóng lúc mấy giờ?', options: ['07:00 sáng hôm sau', '12:00 trưa cùng ngày', '19:00 tối cùng ngày', '00:00 đêm nay (nửa đêm)'], answer: 0, explain: 'Nến D1 mặc định đóng lúc 00:00 UTC, tức 07:00 sáng giờ Việt Nam (UTC+7). 00:00 đêm là giờ UTC chưa quy đổi; 12:00 và 19:00 không liên quan tới giờ đóng nến ngày.' },
      { q: 'Một cây búa hoàn hảo xuất hiện trên H4 khi giá đang đi ngang ở giữa biên độ, không gần hỗ trợ nào. Cách xử lý hợp lý nhất?', options: ['Mua ngay khi nến búa đóng cửa, vì búa là tín hiệu đảo chiều tăng', 'Bỏ qua, vì thiếu xu hướng giảm trước đó và vùng giá quan trọng', 'Bán khống, vì búa xuất hiện giữa vùng đi ngang là tín hiệu giảm', 'Mua thử với đòn bẩy nhỏ, dừng lỗ dưới bóng dưới của búa'], answer: 1, explain: 'Mẫu đảo chiều cần có xu hướng để đảo và nên nằm tại vùng giá đã đánh dấu. Mua ngay hay mua thử đều là dùng mẫu nến như tín hiệu độc lập. Búa không phải tín hiệu giảm.' },
      { q: 'Vì sao doji xuất hiện giữa một chuỗi nến thân nhỏ thường không quan trọng?', options: ['Vì doji chỉ có ý nghĩa trên khung nhỏ như M1, không dùng cho D1', 'Vì doji luôn báo hiệu xu hướng hiện tại sẽ tiếp diễn', 'Vì nến xung quanh đã do dự sẵn, doji không thêm thông tin', 'Vì doji cần volume gần bằng 0 mới hợp lệ'], answer: 2, explain: 'Theo Steve Nison (trích bởi ChartSchool), doji giữa các nến thân nhỏ không quan trọng, còn doji sau các nến thân dài mới đáng chú ý vì nó cho thấy lực đẩy trước đó đã khựng lại. Doji không giới hạn ở khung nhỏ như M1, không luôn báo tiếp diễn và không đòi hỏi volume gần bằng 0.' }
    ],
    sources: [
      { title: 'A Beginner’s Guide to Candlestick Charts', url: 'https://www.binance.com/en/academy/articles/a-beginners-guide-to-candlestick-charts', note: 'Binance Academy, tiếng Anh' },
      { title: 'Introduction to Candlesticks', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/candlestick-charts/introduction-to-candlesticks', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Candlestick Bullish Reversal Patterns', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/candlestick-charts/candlestick-bullish-reversal-patterns', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Market Data endpoints: Kline/Candlestick data', url: 'https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints', note: 'Binance Open Platform, tài liệu API chính thức (khung thời gian, múi giờ UTC)' }
    ],
    updated: '2026-09'
  },

  'c2-b2': {
    duration: 8,
    level: 'Cơ bản',
    summary: 'Xác định xu hướng bằng quy tắc đỉnh đáy HH/HL, LH/LL thay vì cảm giác, nhận biết phá vỡ cấu trúc và vẽ đường xu hướng không ép.',
    goals: [
      'Đánh dấu đỉnh và đáy (swing high/low) theo một quy tắc cố định',
      'Phân loại thị trường thành tăng, giảm hoặc đi ngang bằng tiêu chí cụ thể',
      'Nhận biết khi nào cấu trúc xu hướng bị phá vỡ',
      'Vẽ đường xu hướng đúng cách và biết giới hạn của nó'
    ],
    blocks: [
      { type: 'h', text: 'Xu hướng là gì: đỉnh và đáy' },
      { type: 'p', text: 'Nhiều người nói "BTC đang tăng" chỉ vì giá hôm nay cao hơn hôm qua, hoặc vì nhóm chat đang hào hứng. Đó là cảm giác. Phân tích kỹ thuật định nghĩa xu hướng bằng <strong>cấu trúc đỉnh và đáy</strong>, một ý tưởng có từ Lý thuyết Dow (Dow Theory) hơn 100 năm trước.' },
      { type: 'list', items: [
        '<strong>Xu hướng tăng (uptrend)</strong>: chuỗi đỉnh cao hơn (Higher High, HH) và đáy cao hơn (Higher Low, HL).',
        '<strong>Xu hướng giảm (downtrend)</strong>: chuỗi đỉnh thấp hơn (Lower High, LH) và đáy thấp hơn (Lower Low, LL).',
        '<strong>Đi ngang (range)</strong>: đỉnh và đáy không theo trật tự rõ, giá dao động trong một biên độ.'
      ] },
      { type: 'figure', name: 'trend-structure', caption: 'Xu hướng tăng với HH/HL, xu hướng giảm với LH/LL, và thị trường đi ngang.' },
      { type: 'p', text: 'Trước khi nói đỉnh cao hơn hay thấp hơn, bạn cần biết thế nào là một "đỉnh". Nếu không có quy tắc, bạn sẽ tự chọn những đỉnh đáy hợp với điều mình muốn thấy. Hãy dùng quy tắc cố định sau:' },
      { type: 'callout', tone: 'note', title: 'Quy tắc đánh dấu đỉnh đáy (swing point)', text: '<strong>Đỉnh (swing high)</strong>: một nến có giá cao nhất lớn hơn giá cao nhất của 2 nến bên trái và 2 nến bên phải. <strong>Đáy (swing low)</strong>: một nến có giá thấp nhất nhỏ hơn giá thấp nhất của 2 nến mỗi bên. Vì cần 2 nến bên phải, một đỉnh chỉ được xác nhận sau khi 2 nến tiếp theo đã đóng.' },

      { type: 'h', text: 'Phân loại xu hướng bằng quy tắc' },
      { type: 'p', text: 'Khóa học dùng một bộ tiêu chí đơn giản và kiểm tra được. Bạn có thể điều chỉnh, nhưng phải viết ra và dùng nhất quán.' },
      { type: 'table', head: ['Trạng thái', 'Điều kiện trên khung D1'], rows: [
        ['Tăng', 'Ít nhất 2 đỉnh cao hơn liên tiếp và 2 đáy cao hơn liên tiếp; giá đóng cửa hiện tại nằm trên đáy gần nhất'],
        ['Giảm', 'Ít nhất 2 đỉnh thấp hơn liên tiếp và 2 đáy thấp hơn liên tiếp; giá đóng cửa hiện tại nằm dưới đỉnh gần nhất'],
        ['Đi ngang', 'Không thỏa điều kiện tăng hoặc giảm, hoặc các đỉnh và đáy chênh nhau rất ít, giá quay lại cùng một vùng nhiều lần'],
        ['Không rõ', 'Cấu trúc vừa bị phá, chưa hình thành chuỗi mới. Coi như đi ngang cho đến khi đủ điều kiện']
      ] },
      { type: 'example', title: 'Đọc cấu trúc ETH trên D1 (giá giả định)', text: 'Các đáy và đỉnh lần lượt: đáy 2.800 → đỉnh 3.100 → đáy 2.900 → đỉnh 3.250 → đáy 2.980 → đỉnh 3.400. So sánh: đỉnh 3.250 > 3.100 và 3.400 > 3.250 là 2 HH. Đáy 2.900 > 2.800 và 2.980 > 2.900 là 2 HL. Giá đóng hiện tại 3.300 nằm trên đáy gần nhất 2.980. Kết luận: xu hướng tăng theo quy tắc. Mức cần theo dõi là 2.980, đáy cao hơn gần nhất.' },
      { type: 'p', text: 'Để ý rằng xu hướng tăng không có nghĩa là giá chỉ đi lên. Trong ví dụ, giá giảm từ 3.250 xuống 2.980, tức mất 270 USDT (khoảng 8,3%), mà xu hướng vẫn là tăng. Những nhịp điều chỉnh như vậy là bình thường. Lý thuyết Dow mô tả nhịp điều chỉnh thứ cấp thường lấy lại khoảng 1/3 đến 2/3 nhịp tăng trước đó.' },
      { type: 'calc', title: 'Nhịp điều chỉnh lấy lại bao nhiêu phần nhịp tăng (ví dụ trên)', rows: [
        ['Nhịp tăng', 'Từ đáy 2.900 lên đỉnh 3.250 = 350 USDT'],
        ['Nhịp điều chỉnh', 'Từ 3.250 xuống 2.980 = 270 USDT'],
        ['Tỷ lệ điều chỉnh', '270 ÷ 350 ≈ 77%'],
        ['Mức giảm tính theo %', '270 ÷ 3.250 ≈ 8,3%']
      ], result: 'Nhịp điều chỉnh sâu (77%, vượt 2/3), nhưng đáy 2.980 vẫn cao hơn 2.900 nên cấu trúc tăng chưa bị phá. Điều chỉnh sâu là dấu hiệu cần thận trọng hơn, không phải tín hiệu bán.' },

      { type: 'h', text: 'Phá vỡ cấu trúc: khi nào xu hướng kết thúc' },
      { type: 'p', text: 'Theo Lý thuyết Dow, xu hướng tăng vẫn còn hiệu lực cho đến khi có bằng chứng ngược lại: giá tạo một đỉnh thấp hơn rồi phá xuống dưới đáy gần nhất. Trong khóa này ta gọi đó là <strong>phá vỡ cấu trúc (break of structure)</strong>.' },
      { type: 'steps', items: [
        { title: 'Cảnh báo sớm', text: 'Giá không vượt được đỉnh cũ, tạo một đỉnh thấp hơn (LH). Đây mới là cảnh báo, chưa phải đảo chiều.' },
        { title: 'Phá vỡ', text: 'Một nến D1 đóng cửa dưới đáy cao hơn gần nhất (HL). Chỉ tính giá đóng cửa, không tính bóng nến chọc thủng rồi rút lên.' },
        { title: 'Chuyển trạng thái', text: 'Chuyển nhãn từ "tăng" sang "không rõ". Không vội gọi là xu hướng giảm. Cần có thêm LH và LL để đủ điều kiện giảm.' }
      ] },
      { type: 'callout', tone: 'risk', title: 'Đừng giữ lệnh mua khi cấu trúc đã phá', text: 'Nếu bạn mua theo xu hướng tăng với lý do "đang tạo HH/HL", thì khi nến D1 đóng dưới HL gần nhất, lý do vào lệnh đã mất. Giữ lệnh vì hy vọng là cách một khoản lỗ nhỏ biến thành khoản lỗ lớn. Đặt dừng lỗ dưới HL ngay từ đầu để thị trường tự đóng lệnh khi bạn sai.' },
      { type: 'p', text: 'Có hai lỗi đối xứng cần tránh. Lỗi thứ nhất là thấy một nến đỏ lớn liền nói "hết tăng rồi", trong khi đáy chưa bị thủng. Lỗi thứ hai là thấy cấu trúc đã phá nhưng vẫn tự nhủ "chỉ là điều chỉnh". Quy tắc giá đóng cửa giúp bạn tránh cả hai.' },

      { type: 'h', text: 'Đường xu hướng: vẽ đúng, không ép' },
      { type: 'p', text: 'Đường xu hướng (trend line) là đường thẳng nối các đáy trong xu hướng tăng, hoặc nối các đỉnh trong xu hướng giảm. Theo ChartSchool: cần 2 điểm để vẽ, điểm thứ 3 mới xác nhận đường đó có giá trị.' },
      { type: 'list', items: [
        'Xu hướng tăng: nối các đáy, đáy sau phải cao hơn đáy trước. Xu hướng giảm: nối các đỉnh, đỉnh sau thấp hơn đỉnh trước.',
        'Đường càng dốc thì càng dễ bị phá và càng ít giá trị. Một đường nối hai đáy cách nhau 2 nến sau cú bơm mạnh thường chỉ sống vài ngày.',
        'Các điểm chạm nên cách đều tương đối. Quá gần nhau thì không chứng minh được gì; quá xa nhau thì khó nói chúng liên quan.',
        'Chọn một cách vẽ và giữ nguyên: nối theo bóng nến hoặc theo thân nến, không đổi qua lại để đường "đẹp" hơn.'
      ] },
      { type: 'callout', tone: 'warn', title: 'Dấu hiệu bạn đang ép đường', text: 'Bạn phải xoay đường nhiều lần để né các nến cắt qua; bạn vẽ lại đường mỗi khi giá phá; bạn có 3 đường xu hướng khác nhau cho cùng một đoạn giá. Khi đó hãy xóa hết và quay về cấu trúc đỉnh đáy, thứ khách quan hơn nhiều.' },
      { type: 'p', text: 'Phá đường xu hướng chỉ là cảnh báo rằng động lượng đang thay đổi, không phải xác nhận đảo chiều. Giá có thể phá đường xu hướng tăng rồi đi ngang, trong khi cấu trúc HH/HL vẫn còn. Vì vậy trong khóa này, cấu trúc đỉnh đáy là tiêu chí chính, đường xu hướng chỉ là công cụ phụ để hình dung.' },

      { type: 'h', text: 'Dùng cấu trúc như bộ lọc giao dịch' },
      { type: 'p', text: 'Mục đích thực dụng của bài này là một bộ lọc: bạn chỉ tìm lệnh cùng chiều với cấu trúc khung lớn. Khi D1 tăng, bạn chỉ tìm lệnh mua ở nhịp điều chỉnh. Khi D1 giảm, người mới nên đứng ngoài với Spot, hoặc chỉ tìm lệnh bán trên Futures sau khi đã luyện trên Demo Trading. Khi D1 đi ngang hoặc không rõ, giảm khối lượng hoặc đứng ngoài.' },
      { type: 'scenario', title: 'Nến đỏ lớn trong xu hướng tăng', setup: 'BTC đang có 2 HH và 2 HL trên D1, đáy gần nhất 76.000 (giả định). Một nến D1 giảm từ 82.000 xuống 78.500, mạng xã hội tràn ngập tin "sập".', bad: 'Trader cảm tính hoảng sợ bán hết Spot ở 78.500, rồi mở thêm lệnh bán khống với đòn bẩy cao vì "xu hướng đã đảo". Hai ngày sau giá hồi về 81.000, lệnh bán lỗ, anh ta đóng lệnh và mua lại Spot ở giá cao hơn.', good: 'Trader có kế hoạch kiểm tra quy tắc: giá đóng 78.500 vẫn trên HL 76.000, cấu trúc chưa phá. Anh giữ vị thế với dừng lỗ đã đặt dưới 76.000, ghi vào nhật ký, và chỉ đổi nhãn xu hướng khi có nến D1 đóng dưới 76.000.' },
      { type: 'checklist', title: 'Kiểm tra xu hướng mỗi sáng sau 07:00', items: [
        'Đánh dấu các đỉnh đáy D1 theo quy tắc 2 nến mỗi bên',
        'Đếm số HH, HL hoặc LH, LL liên tiếp',
        'Ghi nhãn: tăng, giảm, đi ngang hoặc không rõ',
        'Ghi mức giá mà nếu nến D1 đóng qua thì nhãn thay đổi',
        'Chỉ tìm lệnh cùng chiều nhãn D1'
      ] }
    ],
    keyPoints: [
      'Xu hướng tăng là chuỗi HH và HL; xu hướng giảm là chuỗi LH và LL; còn lại là đi ngang hoặc không rõ.',
      'Đánh dấu đỉnh đáy bằng quy tắc cố định (2 nến mỗi bên) để không tự chọn điểm theo cảm xúc.',
      'Quy tắc khóa học: tăng khi có ít nhất 2 HH và 2 HL trên D1; cấu trúc tăng phá khi nến D1 đóng dưới HL gần nhất.',
      'Đường xu hướng cần 2 điểm để vẽ, điểm thứ 3 xác nhận; đường quá dốc hoặc phải ép thì ít giá trị.',
      'Dùng cấu trúc D1 làm bộ lọc: chỉ tìm lệnh cùng chiều, đứng ngoài khi không rõ.'
    ],
    practice: [
      'Mở biểu đồ BTCUSDT D1 trong 6 tháng gần nhất, đánh dấu mọi đỉnh đáy theo quy tắc 2 nến mỗi bên, rồi ghi nhãn xu hướng hiện tại.',
      'Tìm một lần cấu trúc tăng bị phá trong quá khứ: ghi lại HL bị thủng, ngày nến D1 đóng dưới HL, và giá đi thế nào 10 nến sau đó.',
      'Vẽ một đường xu hướng qua 2 đáy, đánh dấu điểm chạm thứ 3 nếu có. Nếu bạn phải xoay đường quá 2 lần, ghi lại "đường ép" và bỏ nó.'
    ],
    quiz: [
      { q: 'Trên D1, các đáy lần lượt là 70.000, 73.000, 72.000 và các đỉnh là 78.000, 80.000, 79.000 (giả định). Theo quy tắc của khóa, xu hướng hiện tại là gì?', options: ['Vẫn tăng, vì đỉnh 80.000 cao hơn 78.000 và đáy 73.000 cao hơn 70.000', 'Giảm, vì đỉnh 79.000 và đáy 72.000 đã thấp hơn trước', 'Không rõ hoặc đi ngang, vì mới có 1 LH và 1 LL', 'Tăng mạnh, vì giá vẫn trên 70.000'], answer: 2, explain: 'Đỉnh 79.000 thấp hơn 80.000 (LH) và đáy 72.000 thấp hơn 73.000 (LL), nên chuỗi tăng đã gián đoạn. Nhưng mới có 1 LH và 1 LL, chưa đủ 2 để gọi là giảm. Chỉ nhìn các cặp đỉnh đáy cũ hay chỉ nhìn giá trên 70.000 là bỏ qua cặp đỉnh đáy mới nhất; coi 1 LH và 1 LL là đủ để gọi giảm là sai quy tắc 2 LH và 2 LL.' },
      { q: 'Xu hướng tăng có HL gần nhất 2.900. Một nến D1 chọc xuống 2.850 nhưng đóng cửa ở 2.940. Theo quy tắc khóa học, cấu trúc tăng thế nào?', options: ['Vẫn còn, vì giá đóng 2.940 nằm trên 2.900', 'Đã phá, vì bóng nến đã xuống 2.850, dưới HL 2.900', 'Đã chuyển thành xu hướng giảm sau một lần thủng HL', 'Không đánh giá được nếu không có RSI'], answer: 0, explain: 'Quy tắc dùng giá đóng cửa D1 để tránh bị bóng nến đánh lừa. Bóng xuống 2.850 không phá cấu trúc. Một lần thủng cũng chưa đủ để gọi là xu hướng giảm (cần LH và LL). RSI không cần để đọc cấu trúc.' },
      { q: 'Điều nào sau đây cho thấy bạn đang "ép" đường xu hướng?', options: ['Đường nối 2 đáy và có điểm chạm thứ 3 xác nhận', 'Các điểm chạm cách nhau tương đối đều theo thời gian', 'Bạn nối theo bóng nến ở mọi điểm chạm, không lẫn với thân', 'Bạn phải xoay và vẽ lại nhiều lần để né nến cắt qua'], answer: 3, explain: 'Liên tục vẽ lại để đường "vừa" với giá là dấu hiệu ép. Ba lựa chọn còn lại đều là cách vẽ đúng: có điểm xác nhận thứ 3, điểm chạm cách đều, cách nối nhất quán.' },
      { q: 'Nhịp tăng từ 2.900 lên 3.250, sau đó điều chỉnh về 3.040 (giả định). Nhịp điều chỉnh lấy lại khoảng bao nhiêu phần nhịp tăng?', options: ['35%', '60%', '40%', '6,5%'], answer: 1, explain: 'Nhịp tăng 3.250 − 2.900 = 350. Nhịp điều chỉnh 3.250 − 3.040 = 210. 210 ÷ 350 = 60%. 35% và 40% là tính sai; 6,5% là mức giảm tính theo giá đỉnh (210 ÷ 3.250), không phải tỷ lệ so với nhịp tăng.' }
    ],
    sources: [
      { title: 'Dow Theory', url: 'https://chartschool.stockcharts.com/table-of-contents/market-analysis/dow-theory', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Trend Lines', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/trend-lines', note: 'StockCharts ChartSchool, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c2-b3': {
    duration: 8,
    level: 'Cơ bản',
    summary: 'Đánh dấu hỗ trợ và kháng cự như vùng giá trên khung lớn, hiểu đổi vai trò và phá vỡ giả, tránh vẽ quá nhiều đường.',
    goals: [
      'Vẽ vùng hỗ trợ và kháng cự có độ dày hợp lý trên D1 và H4',
      'Nhận biết đổi vai trò: kháng cự bị phá thành hỗ trợ',
      'Phân biệt phá vỡ thật và phá vỡ giả bằng quy tắc giá đóng cửa và kiểm tra lại',
      'Giới hạn số vùng trên biểu đồ để không bị rối'
    ],
    blocks: [
      { type: 'h', text: 'Hỗ trợ, kháng cự là vùng, không phải đường' },
      { type: 'p', text: '<strong>Hỗ trợ (support)</strong> là vùng giá mà lực mua đủ mạnh để chặn đà giảm. <strong>Kháng cự (resistance)</strong> là vùng mà lực bán đủ mạnh để chặn đà tăng. Chúng hình thành vì con người nhớ giá: người lỡ mua ở đỉnh cũ muốn bán hòa vốn khi giá quay lại; người lỡ cơ hội ở đáy cũ muốn mua khi giá về lại đó.' },
      { type: 'figure', name: 'support-resistance', caption: 'Vùng hỗ trợ và kháng cự: giá chạm nhiều lần nhưng không dừng đúng một mức.' },
      { type: 'p', text: 'Giá hiếm khi dừng đúng một con số. Lần một đảo chiều ở 84.600, lần hai ở 84.900, lần ba bóng nến chạm 85.200. Nếu bạn vẽ một đường ở 85.000, bạn sẽ thấy nó "bị phá" liên tục. ChartSchool khuyên dùng vùng (zone) vì phân tích kỹ thuật không phải khoa học chính xác.' },
      { type: 'calc', title: 'Xác định vùng kháng cự từ 3 lần chạm (giá giả định, D1)', rows: [
        ['Lần chạm 1', 'Giá cao nhất 84.600, đóng 84.300'],
        ['Lần chạm 2', 'Giá cao nhất 84.900, đóng 84.400'],
        ['Lần chạm 3', 'Giá cao nhất 85.200, đóng 84.500'],
        ['Cạnh dưới vùng', 'Giá đóng thấp nhất trong các lần chạm: 84.300'],
        ['Cạnh trên vùng', 'Giá cao nhất của các lần chạm: 85.200'],
        ['Độ dày vùng', '85.200 − 84.300 = 900 USDT'],
        ['Độ dày theo %', '900 ÷ 84.300 ≈ 1,07%']
      ], result: 'Vùng kháng cự 84.300–85.200, dày khoảng 1,07%. Bạn coi mọi giá trong vùng này là "đang ở kháng cự", không phải một mức duy nhất.' },
      { type: 'callout', tone: 'tip', title: 'Độ dày vùng bao nhiêu là hợp lý', text: 'Một cách tham khảo là so với ATR (Average True Range, chỉ báo biên độ trung bình do J. Welles Wilder giới thiệu năm 1978). Nếu vùng dày hơn khoảng 1 ATR của khung đó, có thể bạn đang gộp hai vùng khác nhau. Nếu mỏng hơn nhiều so với bóng nến thường gặp, bạn đang vẽ đường chứ không phải vùng.' },

      { type: 'h', text: 'Cách đánh dấu vùng trên khung lớn' },
      { type: 'steps', items: [
        { title: 'Bắt đầu từ W1 và D1', text: 'Vùng trên khung lớn chứa nhiều giao dịch hơn và được nhiều người nhìn thấy hơn. Vùng chỉ thấy trên M15 thường yếu.' },
        { title: 'Tìm nơi giá đảo chiều rõ', text: 'Đỉnh đáy nổi bật (xem quy tắc swing point ở bài 2.2), nơi giá quay đầu mạnh hoặc đi ngang lâu.' },
        { title: 'Yêu cầu ít nhất 2 lần phản ứng', text: 'Một vùng được đánh dấu khi giá đã phản ứng ít nhất 2 lần. Lần thứ 3 tăng độ tin cậy. Tuy vậy, càng bị chạm nhiều lần thì lực chặn ở đó có thể càng bị bào mòn.' },
        { title: 'Vẽ theo thân và bóng', text: 'Cạnh trong theo giá đóng cửa, cạnh ngoài theo bóng nến xa nhất như ví dụ trên.' },
        { title: 'Giới hạn số vùng', text: 'Giữ tối đa 2 vùng phía trên giá và 2 vùng phía dưới giá hiện tại trên D1. Chuyển sang H4 chỉ để tinh chỉnh, không thêm vùng mới tùy ý.' }
      ] },
      { type: 'p', text: '<strong>Số tròn</strong> như 80.000, 90.000, 100.000 USDT với BTC hay 3.000 USDT với ETH thường thu hút lệnh chờ và tin tức, nên hay trùng với vùng phản ứng. Nhưng số tròn không tự động là hỗ trợ. Hãy coi nó là yếu tố cộng thêm khi đã có phản ứng giá thật ở gần đó, không phải lý do độc lập.' },
      { type: 'callout', tone: 'warn', title: 'Lỗi vẽ quá nhiều đường', text: 'Khi biểu đồ có 15 đường, giá lúc nào cũng "đang ở hỗ trợ" hoặc "đang ở kháng cự". Bạn sẽ luôn tìm được lý do để mua và lý do để bán. Đó là dấu hiệu công cụ đang phục vụ cảm xúc chứ không phải kế hoạch. Xóa mọi vùng không có ít nhất 2 lần phản ứng rõ trên D1.' },

      { type: 'h', text: 'Đổi vai trò: kháng cự thành hỗ trợ' },
      { type: 'p', text: 'Khi giá phá lên qua kháng cự và đứng được, vùng đó thường trở thành hỗ trợ. Ngược lại, hỗ trợ bị phá xuống thường trở thành kháng cự. Hiện tượng này gọi là <strong>đổi vai trò (role reversal)</strong>. Lý do: người bán ở vùng cũ đã bị hấp thụ, còn người lỡ mua lúc phá vỡ sẽ muốn mua khi giá quay lại.' },
      { type: 'figure', name: 'breakout-retest', caption: 'Giá phá kháng cự, quay lại kiểm tra (retest), kháng cự cũ thành hỗ trợ mới.' },
      { type: 'example', title: 'Hỗ trợ bị phá thành kháng cự (giá giả định)', text: 'ETH có vùng hỗ trợ 2.950–3.000 trên D1, giá đã bật lên từ đây 3 lần. Rồi một nến D1 đóng ở 2.880, dưới vùng. Năm ngày sau giá hồi lên 2.990 nhưng không đóng được trên 3.000, để lại bóng trên dài và quay đầu. Vùng 2.950–3.000 giờ đóng vai kháng cự. Người đã mua ở hỗ trợ và đang lỗ có xu hướng bán hòa vốn khi giá quay lại, tạo áp lực bán tại đúng vùng cũ. Với người chỉ giao dịch Spot, đây là tín hiệu không mua lại trong vùng này cho đến khi giá đóng D1 trở lại trên 3.000.' },
      { type: 'p', text: 'Nhịp giá quay lại chạm vùng vừa phá gọi là <strong>kiểm tra lại (retest)</strong>. Retest cho bạn điểm vào gần vùng hơn, nên dừng lỗ ngắn hơn. Nhược điểm: không phải lúc nào giá cũng quay lại, bạn có thể lỡ nhịp tăng. Chấp nhận lỡ cơ hội rẻ hơn nhiều so với mua đuổi.' },
      { type: 'calc', title: 'Mua ngay khi phá vỡ hay chờ retest? (tài khoản giả định 1.000 USDT, rủi ro 1%)', rows: [
        ['Số tiền rủi ro', '1.000 × 1% = 10 USDT'],
        ['Cách A: mua khi nến đóng trên vùng', 'Vào 85.800, dừng lỗ dưới vùng 84.200 → khoảng cách 1.600'],
        ['Khối lượng cách A', '10 ÷ 1.600 = 0,00625 BTC (giá trị ≈ 536 USDT)'],
        ['Cách B: chờ retest cạnh trên vùng', 'Vào 85.300, dừng lỗ 84.200 → khoảng cách 1.100'],
        ['Khối lượng cách B', '10 ÷ 1.100 ≈ 0,00909 BTC (giá trị ≈ 775 USDT)'],
        ['Nếu giá lên 88.000', 'A lãi (88.000 − 85.800) × 0,00625 = 13,75 USDT; B lãi (88.000 − 85.300) × 0,00909 ≈ 24,55 USDT']
      ], result: 'Cùng rủi ro 10 USDT, chờ retest cho khối lượng lớn hơn và lãi cao hơn khi đúng. Đổi lại, có những lần giá không quay lại và bạn không có lệnh.' },
      { type: 'tool', name: 'position-size', note: 'Thử nhập giá vào và dừng lỗ của hai cách A và B để thấy khối lượng thay đổi thế nào.' },

      { type: 'h', text: 'Phá vỡ giả và cách lọc' },
      { type: 'p', text: '<strong>Phá vỡ giả (false breakout)</strong> là khi giá vượt khỏi vùng rồi nhanh chóng quay lại bên trong. Trong crypto, phá vỡ giả rất phổ biến vì thanh khoản quanh các vùng rõ ràng tập trung nhiều lệnh dừng lỗ và lệnh chờ. Giá chọc qua, kích hoạt các lệnh đó, rồi quay đầu.' },
      { type: 'figure', name: 'false-breakout', caption: 'Phá vỡ giả: giá vượt vùng kháng cự, không giữ được và quay đầu vào trong.' },
      { type: 'list', items: [
        '<strong>Chỉ tính giá đóng cửa</strong>: bóng nến vượt vùng chưa phải phá vỡ. ChartSchool nhấn mạnh phá vỡ phải tính trên giá đóng cửa.',
        '<strong>Lọc theo giá</strong>: yêu cầu giá đóng vượt cạnh vùng một khoảng tối thiểu. ChartSchool nêu ví dụ bộ lọc 3% với cổ phiếu; với BTC trên H4 bạn có thể chọn mức nhỏ hơn như 0,5% hoặc 0,5 ATR, miễn là viết ra và dùng nhất quán.',
        '<strong>Lọc theo thời gian</strong>: yêu cầu giá đứng ngoài vùng một số nến, ví dụ 2 nến H4 liên tiếp đóng trên vùng.',
        '<strong>Lọc bằng volume</strong>: phá vỡ thật thường đi kèm volume tăng (xem bài 2.4).',
        '<strong>Lọc bằng cấu trúc khung lớn</strong>: phá kháng cự khi D1 đang giảm có xác suất thất bại cao hơn.'
      ] },
      { type: 'callout', tone: 'risk', title: 'Dừng lỗ đặt ngay ở mép vùng dễ bị quét', text: 'Nếu bạn mua ở hỗ trợ và đặt dừng lỗ đúng cạnh dưới vùng, rất nhiều người khác cũng đặt ở đó. Một cú chọc bóng là đủ quét tất cả. Hãy đặt dừng lỗ dưới vùng một khoảng đệm (ví dụ 0,2–0,5 ATR), và tính khối lượng theo khoảng cách đó để số tiền rủi ro không đổi.' },
      { type: 'scenario', title: 'BTC vượt 85.200 lúc 2 giờ sáng', setup: 'Vùng kháng cự 84.300–85.200 (giả định). Một nến H1 chọc lên 85.700, mạng xã hội hô "phá đỉnh".', bad: 'Trader cảm tính mua đuổi ở 85.650 bằng lệnh thị trường, không đặt dừng lỗ. Nến H4 đóng lại ở 84.800, bên trong vùng. Anh chờ "về bờ", đến khi giá xuống 82.000 thì cắt lỗ trong hoảng loạn.', good: 'Trader có kế hoạch chờ nến H4 đóng. Nến đóng 84.800, bên trong vùng, nên anh ghi nhận phá vỡ giả và không làm gì. Kế hoạch của anh chỉ mua khi có 2 nến H4 đóng trên 85.200 và giá retest cạnh trên vùng, với dừng lỗ dưới 84.200.' }
    ],
    keyPoints: [
      'Hỗ trợ và kháng cự là vùng giá; vẽ cạnh trong theo giá đóng, cạnh ngoài theo bóng nến.',
      'Đánh dấu vùng trên W1 và D1, cần ít nhất 2 lần phản ứng, giữ tối đa 2 vùng mỗi phía.',
      'Kháng cự bị phá thường thành hỗ trợ (đổi vai trò); retest cho dừng lỗ ngắn hơn nhưng có thể lỡ nhịp.',
      'Lọc phá vỡ giả bằng giá đóng cửa, khoảng vượt tối thiểu, số nến đứng ngoài vùng và volume.',
      'Số tròn chỉ là yếu tố cộng thêm, không phải hỗ trợ tự động.'
    ],
    practice: [
      'Trên BTCUSDT D1, đánh dấu tối đa 2 vùng phía trên và 2 vùng phía dưới giá hiện tại, ghi cạnh trên, cạnh dưới và độ dày theo %.',
      'Tìm 3 lần phá vỡ trong quá khứ: ghi lại lần nào là phá vỡ giả nếu chỉ nhìn bóng nến, và lần nào vẫn là phá vỡ thật khi dùng quy tắc 2 nến H4 đóng ngoài vùng.',
      'Dùng công cụ tính khối lượng để so sánh lệnh mua khi phá vỡ và lệnh mua khi retest với cùng mức rủi ro 1%.'
    ],
    quiz: [
      { q: 'Ba lần giá chạm kháng cự có giá cao nhất 3.080, 3.110, 3.120 và giá đóng 3.040, 3.060, 3.050 (giả định). Theo cách vẽ của bài, vùng kháng cự là?', options: ['3.080–3.120', '3.110 chính xác', '3.060–3.080', '3.040–3.120'], answer: 3, explain: 'Cạnh dưới theo giá đóng thấp nhất (3.040), cạnh trên theo giá cao nhất (3.120). 3.080–3.120 chỉ dùng bóng nến; 3.110 là một đường chứ không phải vùng; 3.060–3.080 bỏ sót phần lớn phản ứng giá.' },
      { q: 'Tài khoản 1.000 USDT, rủi ro 1%. Bạn mua BTC ở 85.500, dừng lỗ 84.500 (giả định). Khối lượng đúng là?', options: ['0,1 BTC', '0,01 BTC', '0,0117 BTC', '0,001 BTC'], answer: 1, explain: 'Rủi ro 1.000 × 1% = 10 USDT. Khoảng cách 85.500 − 84.500 = 1.000. Khối lượng 10 ÷ 1.000 = 0,01 BTC. 0,1 BTC gấp 10 lần mức rủi ro; 0,001 BTC chỉ rủi ro 1 USDT; 0,0117 là con số không theo công thức.' },
      { q: 'Nến H1 chọc qua kháng cự nhưng nến H4 đóng lại bên trong vùng. Theo quy tắc lọc của bài, đây là gì?', options: ['Phá vỡ thật vì H1 đã đóng trên kháng cự, nên mua ngay', 'Phá vỡ giả chắc chắn, vào lệnh bán khống ngay', 'Chưa phá vỡ; có thể là phá vỡ giả, chờ thêm', 'Kháng cự đã đổi vai thành hỗ trợ cho nhịp sau'], answer: 2, explain: 'Phá vỡ chỉ tính trên giá đóng cửa của khung bạn dùng. H4 đóng trong vùng nên chưa phá vỡ. Phá vỡ giả có thể dẫn tới giảm nhưng không phải tín hiệu chắc chắn để bán. Đổi vai trò chỉ xảy ra sau khi phá thật.' },
      { q: 'Vì sao không nên đặt dừng lỗ đúng ở mép dưới vùng hỗ trợ?', options: ['Vì dừng lỗ dồn ở mép vùng dễ bị quét, cần thêm khoảng đệm', 'Vì sàn từ chối lệnh dừng lỗ đặt quá gần vùng hỗ trợ đã đánh dấu', 'Vì dừng lỗ nên đặt ở số tròn như 80.000 để dễ khớp', 'Vì hỗ trợ đủ mạnh thì không bao giờ bị phá'], answer: 0, explain: 'Mép vùng là nơi lệnh dừng lỗ tập trung, nên hay bị quét. Thêm khoảng đệm và tính lại khối lượng. Sàn không cấm đặt ở đó; số tròn không phải quy tắc đặt dừng lỗ; hỗ trợ có thể bị phá bất cứ lúc nào.' }
    ],
    sources: [
      { title: 'Support & Resistance', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/support-and-resistance', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Symmetrical Triangle (bộ lọc giá và thời gian cho phá vỡ)', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/chart-patterns/symmetrical-triangle', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Average True Range (ATR) and Average True Range Percent (ATRP)', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp', note: 'StockCharts ChartSchool, tiếng Anh (Wilder, 1978)' }
    ],
    updated: '2026-09'
  },

  'c2-b4': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Dùng khối lượng để xác nhận hoặc nghi ngờ chuyển động giá, đọc volume profile ở mức cơ bản và cảnh giác với khối lượng giả trên sàn.',
    goals: [
      'Đánh giá một nhịp tăng hay phá vỡ có được volume ủng hộ không bằng quy tắc cụ thể',
      'Hiểu POC và value area trong volume profile',
      'Phân biệt volume một sàn và volume tổng hợp',
      'Nhận biết rủi ro khối lượng giả (wash trading)'
    ],
    blocks: [
      { type: 'h', text: 'Volume cho biết gì' },
      { type: 'p', text: 'Khối lượng giao dịch (volume) là tổng số tài sản được khớp trong mỗi cây nến, ví dụ số BTC khớp trong một nến H4. Trên biểu đồ nó thường là các cột ở dưới cùng, cột xanh cho nến tăng, cột đỏ cho nến giảm. Mỗi giao dịch có một người mua và một người bán, nên volume không cho biết "phe mua nhiều hơn". Nó cho biết <strong>mức độ tham gia</strong>: bao nhiêu tiền sẵn sàng giao dịch ở mức giá đó.' },
      { type: 'p', text: 'Lý thuyết Dow nêu nguyên tắc: trong xu hướng tăng lành mạnh, volume nên lớn hơn ở các nhịp tăng và nhỏ đi ở các nhịp điều chỉnh. Ý tưởng đơn giản: chuyển động có nhiều người tham gia đáng tin hơn chuyển động chỉ có vài lệnh đẩy.' },
      { type: 'table', head: ['Giá', 'Volume', 'Cách đọc thận trọng'], rows: [
        ['Tăng', 'Tăng', 'Nhịp tăng được xác nhận, nhiều người tham gia'],
        ['Tăng', 'Giảm dần', 'Đà tăng có thể đang yếu đi, chưa phải tín hiệu bán'],
        ['Giảm', 'Tăng mạnh', 'Áp lực bán thật; hoặc bán tháo cuối nhịp nếu kèm bóng dưới dài tại hỗ trợ'],
        ['Giảm', 'Thấp', 'Nhịp điều chỉnh yên ắng, phù hợp với xu hướng tăng còn nguyên']
      ] },
      { type: 'example', title: 'Nến bán tháo tại hỗ trợ (giá giả định)', text: 'BTC giảm 5 nến D1 liên tiếp từ 86.000 về vùng hỗ trợ 76.000–77.000. Nến thứ 6 chọc xuống 74.800 với volume gấp 3 lần trung bình 20 nến, nhưng đóng cửa ở 76.900, để lại bóng dưới dài. Volume rất lớn cộng bóng dưới dài tại hỗ trợ gợi ý nhiều người đã bán hoảng loạn và có người mua hấp thụ. Đây chỉ là cảnh báo nhịp giảm có thể đang cạn, chưa phải tín hiệu mua. Bạn vẫn cần nến xác nhận và cấu trúc D1 thay đổi (bài 2.2) trước khi nghĩ tới lệnh mua.' },
      { type: 'callout', tone: 'warn', title: 'Volume không có hướng', text: 'Một cột volume đỏ lớn không có nghĩa "cá mập đang bán". Nó chỉ có nghĩa nhiều giao dịch khớp trong một nến giảm. Luôn đọc volume cùng với vị trí giá (vùng hỗ trợ, kháng cự) và cấu trúc xu hướng.' },

      { type: 'h', text: 'Breakout có volume: quy tắc cụ thể' },
      { type: 'p', text: 'Ở bài 2.3 bạn đã học lọc phá vỡ giả bằng giá đóng cửa. Volume là bộ lọc thứ hai. Một phá vỡ thật thường cần nhiều người mua mới để hấp thụ hết lượng bán ở kháng cự, nên volume nến phá vỡ thường cao hơn hẳn mức bình thường.' },
      { type: 'figure', name: 'volume-breakout', caption: 'Breakout có volume lớn vượt trung bình so với breakout volume yếu.' },
      { type: 'formula', title: 'Tỷ lệ volume tương đối', expr: 'Volume tương đối = Volume nến hiện tại ÷ Trung bình volume 20 nến trước', vars: [['Volume nến hiện tại', 'Volume của nến phá vỡ, chỉ tính khi nến đã đóng'], ['Trung bình 20 nến', 'Đường MA 20 của volume, có sẵn trên hầu hết biểu đồ']], note: 'Quy tắc khóa học: coi breakout được volume xác nhận khi volume tương đối từ 1,5 lần trở lên. Đây là ngưỡng thực hành bạn có thể điều chỉnh sau khi kiểm tra lại trên dữ liệu, không phải hằng số thị trường.' },
      { type: 'calc', title: 'Đánh giá hai lần phá vỡ trên H4 (số liệu giả định)', rows: [
        ['Trung bình volume 20 nến H4', '1.500 BTC'],
        ['Phá vỡ A: volume nến đóng trên vùng', '3.300 BTC'],
        ['Volume tương đối A', '3.300 ÷ 1.500 = 2,2 lần (≥ 1,5: đạt)'],
        ['Phá vỡ B: volume nến đóng trên vùng', '1.650 BTC'],
        ['Volume tương đối B', '1.650 ÷ 1.500 = 1,1 lần (< 1,5: không đạt)']
      ], result: 'Phá vỡ A có volume ủng hộ. Phá vỡ B đáng nghi: có thể chỉ là cú chọc quét dừng lỗ. Với B, bạn chờ retest hoặc bỏ qua.' },
      { type: 'callout', tone: 'risk', title: 'Volume cao không bảo đảm giá tiếp tục', text: 'Volume đột biến cũng xuất hiện ở đỉnh, khi người đến sau mua đuổi và người vào sớm chốt lời. Volume chỉ là một bộ lọc tăng xác suất. Lệnh vẫn cần dừng lỗ và khối lượng tính theo rủi ro.' },

      { type: 'h', text: 'Volume profile: POC và value area' },
      { type: 'p', text: 'Volume thông thường đo theo <em>thời gian</em> (mỗi nến bao nhiêu). <strong>Volume profile</strong> đo theo <em>giá</em>: trong một khoảng thời gian, mỗi mức giá đã khớp bao nhiêu. Kết quả là biểu đồ cột nằm ngang bên cạnh giá. StockCharts gọi công cụ tương tự là Volume-by-Price.' },
      { type: 'list', items: [
        '<strong>POC (Point of Control)</strong>: mức giá có volume khớp lớn nhất trong khoảng thời gian đang xét. Đây là nơi thị trường "đồng ý" về giá nhiều nhất.',
        '<strong>Value area</strong>: vùng giá chứa một tỷ lệ phần trăm nhất định của tổng volume, thường đặt mặc định là 70%. Cạnh trên gọi là VAH, cạnh dưới là VAL.',
        '<strong>Vùng volume thấp</strong>: giá thường đi qua nhanh vì ít người giao dịch ở đó trước kia.'
      ] },
      { type: 'example', title: 'Đọc volume profile đơn giản (giả định)', text: 'Trong 30 ngày, BTC dao động 76.000–86.000. POC nằm ở 80.500, value area 78.000–83.000. Giá hiện tại 84.500, trên VAH. Nếu giá điều chỉnh, vùng 83.000 (VAH) và 80.500 (POC) là hai nơi đáng theo dõi phản ứng. Bạn kết hợp với vùng hỗ trợ đã vẽ ở bài 2.3; nơi hai công cụ trùng nhau là vùng đáng tin hơn.' },
      { type: 'callout', tone: 'note', title: 'Giới hạn của volume profile', text: 'Kết quả phụ thuộc vào khoảng thời gian bạn chọn: đổi từ 30 ngày sang 90 ngày, POC có thể dời hẳn. Bản Volume-by-Price của StockCharts chỉ dựa trên giá đóng cửa, nên các mức chỉ có bóng nến sẽ không hiện ra. Hãy chọn một khoảng thời gian cố định và ghi lại, thay vì đổi khoảng cho đến khi thấy điều mình muốn.' },

      { type: 'h', text: 'Volume một sàn, volume tổng hợp và khối lượng giả' },
      { type: 'p', text: 'Chứng khoán có một sàn trung tâm. Crypto thì khác: cùng cặp BTC/USDT giao dịch trên hàng chục sàn, Spot và Futures tách riêng. Volume bạn thấy trên biểu đồ Binance Spot chỉ là volume của Binance Spot. Một nhịp tăng có thể đến từ Futures trong khi Spot rất yên. Vì vậy khi so sánh, hãy so trên cùng một sàn, cùng một thị trường, và biết rằng các trang tổng hợp có thể cộng dồn volume từ nhiều nguồn với chất lượng khác nhau.' },
      { type: 'p', text: 'Nguy hiểm hơn là <strong>khối lượng giả (wash trading)</strong>: sàn hoặc người giao dịch tự mua bán với chính mình để thổi phồng volume. Nghiên cứu "Crypto Wash Trading" của Cong, Li, Tang và Yang (Management Science, 2023) khảo sát 29 sàn tập trung và ước tính khối lượng giả trung bình chiếm <strong>hơn 70% volume báo cáo</strong> trên mỗi sàn không được quản lý. Các sàn được quản lý thì có mẫu giao dịch giống thị trường tài chính thông thường.' },
      { type: 'calc', title: 'Volume báo cáo và volume thật (minh họa)', rows: [
        ['Sàn nhỏ không được quản lý báo cáo', '1 tỷ USD volume 24 giờ cho một token'],
        ['Nếu 70% là giả (theo mức trung bình của nghiên cứu)', '1 tỷ × 70% = 700 triệu USD'],
        ['Volume thật còn lại', '1 tỷ − 700 triệu = 300 triệu USD']
      ], result: 'Thanh khoản thật chỉ bằng khoảng 30% con số hiển thị. Lệnh lớn của bạn có thể trượt giá nặng hơn nhiều so với dự tính.' },
      { type: 'callout', tone: 'risk', title: 'Token nhỏ, sàn nhỏ, volume đẹp bất thường', text: 'Volume khổng lồ trên một token mới, chỉ có ở một sàn ít tên tuổi, là dấu hiệu cảnh báo chứ không phải lý do mua. Kiểm tra sổ lệnh (độ sâu bid/ask), chênh lệch giá mua bán (spread) và so với các sàn lớn. Tại Việt Nam, nhớ rằng chỉ tổ chức được Bộ Tài chính cấp phép mới được cung cấp dịch vụ tài sản mã hóa theo Nghị quyết 05/2025/NQ-CP.' },

      { type: 'h', text: 'Đưa volume vào quy trình' },
      { type: 'scenario', title: 'Phá vỡ lúc cuối tuần', setup: 'ETH phá kháng cự 3.100 (giả định) vào tối Chủ nhật. Nến H4 đóng ở 3.140, nhưng volume chỉ 0,9 lần trung bình 20 nến.', bad: 'Trader cảm tính thấy giá xanh, mua ngay ở 3.140 với đòn bẩy 10x vì sợ lỡ. Sáng thứ Hai volume thật quay lại, giá rơi về 3.050. Giá chỉ giảm khoảng 2,9% nhưng với 10x anh đã mất khoảng 29% ký quỹ, và cắt lỗ trong hoảng loạn. Giá thanh lý ở quanh 2.840 vẫn còn xa, nhưng khoản lỗ đã lớn gấp nhiều lần mức anh từng định chịu.', good: 'Trader có kế hoạch ghi nhận: giá đóng trên vùng (đạt), volume tương đối 0,9 (không đạt). Một trên hai điều kiện là chưa đủ, nên anh đặt cảnh báo giá ở 3.100 và chờ retest có volume, không vào lệnh.' },
      { type: 'checklist', title: 'Kiểm tra volume trước khi vào lệnh phá vỡ', items: [
        'Nến phá vỡ đã đóng ngoài vùng',
        'Volume tương đối của nến phá vỡ từ 1,5 lần trung bình 20 nến trở lên',
        'So sánh trên cùng sàn và cùng thị trường (Spot với Spot)',
        'Ghi chú POC và value area của khoảng thời gian cố định',
        'Token có thanh khoản thật: spread hẹp, sổ lệnh đủ sâu'
      ] }
    ],
    keyPoints: [
      'Volume đo mức độ tham gia, không cho biết hướng; luôn đọc cùng vị trí giá và cấu trúc.',
      'Quy tắc khóa học: breakout được xác nhận khi volume nến phá vỡ từ 1,5 lần trung bình 20 nến.',
      'POC là mức giá khớp nhiều nhất; value area thường chứa 70% volume của khoảng thời gian chọn.',
      'Volume một sàn khác volume tổng hợp; so sánh trên cùng sàn, cùng thị trường.',
      'Wash trading có thể chiếm hơn 70% volume báo cáo ở sàn không được quản lý (Cong và cộng sự, 2023).'
    ],
    practice: [
      'Bật MA 20 của volume trên BTCUSDT H4. Tìm 5 lần phá vỡ vùng gần đây và tính volume tương đối của từng nến phá vỡ.',
      'Bật volume profile cho 30 ngày gần nhất, ghi POC, VAH, VAL và so sánh với các vùng hỗ trợ kháng cự bạn đã vẽ ở bài 2.3.',
      'Chọn một token nhỏ, so sánh volume 24 giờ và spread trên hai sàn khác nhau, ghi lại điểm bất thường nếu có.'
    ],
    quiz: [
      { q: 'Trung bình volume 20 nến H4 là 2.000 ETH. Nến phá vỡ có volume 2.600 ETH. Theo quy tắc 1,5 lần của khóa, kết luận?', options: ['Chưa đạt, vì 2.600 ÷ 2.000 = 1,3 lần', 'Đạt, vì volume nến phá vỡ cao hơn mức trung bình 20 nến', 'Đạt, vì 2.600 lớn hơn 1.500', 'Không đánh giá được nếu không có RSI'], answer: 0, explain: 'Volume tương đối = 2.600 ÷ 2.000 = 1,3 lần, dưới ngưỡng 1,5. Chỉ cần cao hơn trung bình là chưa đủ theo quy tắc. So với 1.500 là nhầm con số. RSI không liên quan tới quy tắc volume.' },
      { q: 'Trong volume profile, POC là gì?', options: ['Giá đóng cửa của nến gần nhất', 'Vùng giá chứa khoảng 70% tổng volume của khoảng đang xét', 'Mức giá có volume khớp lớn nhất trong khoảng đang xét', 'Mức giá cao nhất mà giá chạm tới trong khoảng đang xét'], answer: 2, explain: 'POC là mức giá có volume lớn nhất. Vùng chứa khoảng 70% volume là value area. Giá đóng gần nhất và giá cao nhất không liên quan tới định nghĩa POC.' },
      { q: 'Một sàn nhỏ báo cáo volume 500 triệu USD cho một token. Nếu 70% là khối lượng giả, volume thật khoảng bao nhiêu?', options: ['350 triệu USD', '150 triệu USD', '430 triệu USD', '70 triệu USD'], answer: 1, explain: 'Phần giả 500 × 70% = 350 triệu, phần thật 500 − 350 = 150 triệu. 350 triệu là phần giả; 430 và 70 triệu là tính sai.' },
      { q: 'Giá tăng lên kháng cự trong khi volume các nến tăng giảm dần. Cách hiểu thận trọng nhất?', options: ['Chắc chắn sắp đảo chiều giảm, nên bán khống ngay tại kháng cự', 'Volume không liên quan tới giá', 'Tín hiệu mua mạnh, vì giá vẫn tăng dù ít người tham gia', 'Đà tăng có thể yếu đi; chờ giá xác nhận rồi mới hành động'], answer: 3, explain: 'Volume giảm trong nhịp tăng gợi ý sự tham gia yếu đi, nhưng không phải tín hiệu bán chắc chắn. Nói volume không liên quan là sai; coi đó là tín hiệu mua mạnh là bỏ qua cảnh báo.' }
    ],
    sources: [
      { title: 'Volume-by-Price', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/volume-by-price', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Volume profile indicators: basic concepts', url: 'https://www.tradingview.com/support/solutions/43000502040-volume-profile-indicators-basic-concepts/', note: 'TradingView Help Center, tiếng Anh (định nghĩa POC, value area 70%)' },
      { title: 'Crypto Wash Trading (Cong, Li, Tang, Yang)', url: 'https://ideas.repec.org/a/inm/ormnsc/v69y2023i11p6427-6454.html', note: 'Management Science 69(11), 2023, tiếng Anh' },
      { title: 'Dow Theory', url: 'https://chartschool.stockcharts.com/table-of-contents/market-analysis/dow-theory', note: 'StockCharts ChartSchool, tiếng Anh (volume xác nhận xu hướng)' }
    ],
    updated: '2026-09'
  },

  'c2-b5': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Hiểu SMA và EMA, dùng MA 20/50/200 làm bộ lọc xu hướng, biết vì sao giao cắt luôn trễ và vì sao MA thua lỗ khi thị trường đi ngang.',
    goals: [
      'Tính được SMA và EMA bằng tay với số liệu nhỏ',
      'Dùng vị trí giá so với MA để lọc hướng giao dịch',
      'Hiểu golden cross và death cross, và vì sao chúng trễ',
      'Nhận biết thị trường đi ngang để tắt bộ lọc MA'
    ],
    blocks: [
      { type: 'h', text: 'SMA và EMA: hai cách lấy trung bình' },
      { type: 'p', text: 'Đường trung bình động (moving average, MA) làm mượt giá bằng cách lấy trung bình của N nến gần nhất và vẽ thành một đường. Nó giúp bạn nhìn hướng đi chung thay vì từng nến nhiễu. Có hai loại phổ biến:' },
      { type: 'formula', title: 'SMA (trung bình đơn giản)', expr: 'SMA(N) = (Giá đóng 1 + Giá đóng 2 + ... + Giá đóng N) ÷ N', vars: [['N', 'Số nến, ví dụ 20, 50, 200'], ['Giá đóng', 'Giá đóng cửa của từng nến']], note: 'Mọi nến trong N nến có trọng số bằng nhau.' },
      { type: 'formula', title: 'EMA (trung bình lũy thừa)', expr: 'EMA hôm nay = (Giá đóng hôm nay − EMA hôm qua) × k + EMA hôm qua, với k = 2 ÷ (N + 1)', vars: [['k', 'Hệ số trọng số cho giá mới nhất'], ['EMA hôm qua', 'Giá trị EMA của nến trước; lần đầu dùng SMA làm giá trị khởi đầu']], note: 'Theo ChartSchool, EMA 10 kỳ đặt trọng số 2 ÷ 11 ≈ 18,18% cho giá mới nhất. EMA bám giá sát hơn và đổi hướng sớm hơn SMA cùng độ dài.' },
      { type: 'calc', title: 'Tính SMA 5 và EMA 5 (giá đóng BTC giả định)', rows: [
        ['Giá đóng 5 nến', '80.000; 80.400; 80.200; 80.800; 81.100'],
        ['Tổng', '80.000 + 80.400 + 80.200 + 80.800 + 81.100 = 402.500'],
        ['SMA 5', '402.500 ÷ 5 = 80.500 (dùng làm EMA khởi đầu)'],
        ['Hệ số k của EMA 5', '2 ÷ (5 + 1) ≈ 0,3333'],
        ['Nến mới đóng ở 81.700: SMA 5 mới', '(402.500 − 80.000 + 81.700) ÷ 5 = 404.200 ÷ 5 = 80.840'],
        ['EMA 5 mới', '(81.700 − 80.500) × 0,3333 + 80.500 ≈ 80.900']
      ], result: 'Sau một nến tăng mạnh, EMA 5 lên 80.900 còn SMA 5 lên 80.840. EMA phản ứng nhanh hơn vì đặt trọng số lớn hơn cho giá mới.' },
      { type: 'p', text: 'Không có loại nào "tốt hơn" tuyệt đối. EMA nhanh hơn nên báo sớm hơn nhưng cũng bị nhiễu nhiều hơn. SMA chậm hơn, theo ChartSchool có thể phù hợp hơn để xác định hỗ trợ kháng cự dài hạn. Chọn một loại và dùng nhất quán.' },

      { type: 'h', text: 'MA 20, 50, 200 và MA làm bộ lọc xu hướng' },
      { type: 'table', head: ['Đường', 'Vai trò thường gặp', 'Trên D1 tương ứng'], rows: [
        ['EMA/SMA 20', 'Xu hướng ngắn hạn, nhịp điều chỉnh nông', 'Khoảng 3 tuần'],
        ['EMA/SMA 50', 'Xu hướng trung hạn', 'Khoảng 7 tuần'],
        ['SMA 200', 'Xu hướng dài hạn, được nhiều người theo dõi', 'Khoảng 6,5 tháng']
      ] },
      { type: 'p', text: 'Crypto giao dịch 7 ngày mỗi tuần, nên 200 nến D1 là khoảng 200 ngày lịch, ngắn hơn 200 ngày giao dịch của chứng khoán (khoảng 9–10 tháng). Khi đọc tài liệu chứng khoán, hãy nhớ khác biệt này.' },
      { type: 'p', text: 'Cùng một con số N cho ý nghĩa khác nhau trên từng khung. EMA 50 trên H4 là trung bình của 50 × 4 = 200 giờ, tức khoảng 8,3 ngày, ngắn hơn nhiều so với EMA 50 trên D1 (50 ngày). Vì vậy khi nói "giá trên EMA 50", luôn ghi kèm khung thời gian. Trong khóa này, bộ lọc xu hướng chính dùng EMA 50 trên D1; EMA trên H4 và H1 chỉ dùng để tìm vùng giá và điểm vào (xem bài 2.7).' },
      { type: 'figure', name: 'moving-averages', caption: 'Giá với EMA 20 và EMA 50: khi giá trên cả hai và EMA 20 trên EMA 50, xu hướng ngắn và trung hạn cùng tăng.' },
      { type: 'p', text: 'Cách dùng MA hiệu quả nhất cho người mới không phải là tín hiệu mua bán, mà là <strong>bộ lọc</strong>. Quy tắc của khóa trên D1:' },
      { type: 'list', ordered: true, items: [
        'Chỉ tìm lệnh mua khi giá đóng D1 nằm trên EMA 50 <strong>và</strong> EMA 50 đang dốc lên (EMA 50 hôm nay cao hơn 5 nến trước).',
        'Chỉ tìm lệnh bán (Futures, sau khi đã luyện Demo Trading) khi giá đóng dưới EMA 50 và EMA 50 dốc xuống.',
        'Nếu EMA 50 gần như nằm ngang hoặc giá cắt qua lại EMA 50 từ 3 lần trở lên trong 20 nến: coi là đi ngang, tắt bộ lọc MA và giảm khối lượng hoặc đứng ngoài.',
        'Bộ lọc MA phải đồng thuận với cấu trúc đỉnh đáy (bài 2.2). Nếu hai công cụ mâu thuẫn, ưu tiên đứng ngoài.'
      ] },
      { type: 'callout', tone: 'tip', title: 'MA như vùng động', text: 'Trong xu hướng tăng rõ, giá hay điều chỉnh về gần EMA 20 hoặc EMA 50 rồi tăng tiếp. Hãy coi khoảng quanh MA là một vùng tham khảo, kết hợp với vùng hỗ trợ ngang, chứ không mua đúng lúc giá chạm đường.' },

      { type: 'h', text: 'Golden cross, death cross và độ trễ' },
      { type: 'p', text: '<strong>Golden cross</strong> là khi MA ngắn cắt lên trên MA dài, phổ biến nhất là MA 50 cắt lên MA 200. <strong>Death cross</strong> là khi MA ngắn cắt xuống dưới MA dài. Truyền thông crypto rất thích hai thuật ngữ này. Vấn đề là chúng luôn đến muộn.' },
      { type: 'p', text: 'MA được tính từ giá quá khứ, nên bao giờ cũng đi sau giá. MA 200 trên D1 là trung bình của khoảng 200 ngày. Khi giá đã tăng một đoạn dài từ đáy, MA 50 mới dần vượt lên MA 200. Lúc giao cắt xảy ra, một phần lớn nhịp tăng có thể đã qua.' },
      { type: 'example', title: 'Độ trễ của giao cắt (minh họa giả định)', text: 'BTC tạo đáy ở 60.000 rồi tăng dần. Khi giá lên khoảng 75.000, MA 50 mới cắt lên MA 200. Người mua theo golden cross vào ở 75.000, tức sau khi giá đã tăng (75.000 − 60.000) ÷ 60.000 = 25% từ đáy. Nếu sau đó giá điều chỉnh về 68.000, họ lỗ (75.000 − 68.000) ÷ 75.000 ≈ 9,3% dù "tín hiệu đẹp".' },
      { type: 'callout', tone: 'warn', title: 'Giao cắt là xác nhận muộn, không phải dự báo', text: 'Golden cross cho bạn biết xu hướng trung hạn <em>đã</em> chuyển sang tăng từ một thời gian. Nó hữu ích để xác nhận bối cảnh, không phù hợp làm điểm vào lệnh. Nếu dùng làm điểm vào, bạn thường mua muộn và dừng lỗ xa.' },

      { type: 'h', text: 'Vì sao MA thua trong thị trường đi ngang' },
      { type: 'p', text: 'Khi giá đi ngang, MA nằm ngang giữa biên độ. Giá cắt lên, cắt xuống liên tục, và các đường MA cũng giao cắt nhau liên tục. ChartSchool gọi đó là <strong>whipsaw</strong>: tín hiệu liên tục đảo ngược, mỗi lần theo là một khoản lỗ nhỏ cộng thêm phí.' },
      { type: 'calc', title: 'Chi phí của whipsaw (giả định)', rows: [
        ['Tài khoản', '1.000 USDT, mỗi lệnh rủi ro 1% = 10 USDT'],
        ['Trong 2 tháng đi ngang', '6 tín hiệu giao cắt EMA 20/50, 5 lệnh thua đủ 1R, 1 lệnh thắng 1R'],
        ['Lỗ từ lệnh thua', '5 × 10 = 50 USDT'],
        ['Lãi từ lệnh thắng', '1 × 10 = 10 USDT'],
        ['Giá trị mỗi lệnh (giả định)', 'Khoảng 400 USDT (dừng lỗ cách giá vào 2,5%: 10 ÷ 2,5% = 400)'],
        ['Phí spot 0,1% mỗi chiều (vào + ra)', '400 × 0,1% × 2 = 0,8 USDT mỗi lệnh; 6 × 0,8 = 4,8 USDT'],
        ['Kết quả ròng', '−50 + 10 − 4,8 = −44,8 USDT, tức −4,48% tài khoản']
      ], result: 'Hệ thống giao cắt MA không sai, nó chỉ đang dùng sai môi trường. Bộ lọc "EMA 50 nằm ngang hoặc giá cắt qua 3 lần trong 20 nến" giúp bạn nhận ra và đứng ngoài.' },
      { type: 'scenario', title: 'Giao cắt lần thứ tư trong tháng', setup: 'ETH đi ngang 2.800–3.200 (giả định) suốt 6 tuần. EMA 20 vừa cắt lên EMA 50 lần thứ tư trong tháng.', bad: 'Trader cảm tính đã thua 3 lệnh giao cắt trước, lần này tăng gấp ba khối lượng "để gỡ". Giá lên 3.150 rồi quay về 2.850, anh mất trong một lệnh bằng cả ba lệnh trước cộng lại.', good: 'Trader có kế hoạch đếm: giá đã cắt EMA 50 bốn lần trong 20 nến, EMA 50 gần như nằm ngang. Theo quy tắc, đây là thị trường đi ngang, tắt tín hiệu MA. Anh chuyển sang chỉ quan sát hai cạnh biên độ 2.800 và 3.200, chờ phá vỡ có xác nhận.' },
      { type: 'callout', tone: 'risk', title: 'Đừng tăng khối lượng sau chuỗi thua', text: 'Chuỗi thua trong thị trường đi ngang là bình thường với mọi công cụ theo xu hướng. Tăng khối lượng để gỡ biến một giai đoạn bất lợi thành thiệt hại lớn. Giữ nguyên % rủi ro mỗi lệnh.' },
      { type: 'p', text: 'Một điều nữa: đừng tối ưu tham số MA cho đến khi quá khứ trông hoàn hảo. Bạn luôn có thể tìm được một cặp như EMA 17/43 cho kết quả đẹp trên 6 tháng dữ liệu cũ, nhưng cặp đó thường chỉ khớp với nhiễu của giai đoạn đó. Dùng các tham số phổ biến 20, 50, 200 có một lợi thế thực tế: nhiều người cùng nhìn, nên phản ứng quanh chúng dễ quan sát hơn.' },
      { type: 'checklist', title: 'Kiểm tra bộ lọc MA mỗi sáng trên D1', items: [
        'Giá đóng D1 nằm trên hay dưới EMA 50',
        'EMA 50 hôm nay cao hơn hay thấp hơn 5 nến trước',
        'Đếm số lần giá cắt qua EMA 50 trong 20 nến gần nhất (từ 3 lần là đi ngang)',
        'Bộ lọc MA có đồng thuận với cấu trúc HH/HL hoặc LH/LL không',
        'Ghi trạng thái cuối cùng: được mua, được bán, hoặc đứng ngoài'
      ] }
    ],
    keyPoints: [
      'SMA cho trọng số bằng nhau; EMA dùng k = 2 ÷ (N + 1) nên phản ứng nhanh hơn với giá mới.',
      'Dùng MA làm bộ lọc: chỉ tìm lệnh mua khi giá đóng D1 trên EMA 50 và EMA 50 dốc lên.',
      'Golden cross và death cross là xác nhận muộn vì MA tính từ giá quá khứ.',
      'Thị trường đi ngang gây whipsaw; khi giá cắt EMA 50 từ 3 lần trong 20 nến thì tắt bộ lọc MA.',
      '200 nến D1 trong crypto là khoảng 200 ngày lịch, khác 200 ngày giao dịch của chứng khoán.'
    ],
    practice: [
      'Lấy 6 giá đóng cửa D1 gần nhất của BTC, tự tính SMA 5 và EMA 5 như ví dụ, rồi so với giá trị trên biểu đồ.',
      'Trên BTCUSDT D1, bật EMA 20, EMA 50, SMA 200. Ghi trạng thái bộ lọc hôm nay: mua, bán, hay đi ngang theo quy tắc của bài.',
      'Tìm 2 lần golden cross gần nhất trên D1, tính giá đã tăng bao nhiêu % từ đáy trước đó tới ngày giao cắt.'
    ],
    quiz: [
      { q: 'Hệ số k của EMA 20 là bao nhiêu?', options: ['0,05', 'Khoảng 0,0952', '0,1', 'Khoảng 0,1818'], answer: 1, explain: 'k = 2 ÷ (20 + 1) = 2 ÷ 21 ≈ 0,0952. 0,05 là 1 ÷ 20 (trọng số của SMA); 0,1 là 2 ÷ 20, quên cộng 1; 0,1818 là hệ số của EMA 10.' },
      { q: 'EMA 5 hôm qua là 3.000, giá đóng hôm nay 3.060 (giả định). EMA 5 hôm nay là?', options: ['3.020', '3.060', '3.030', '3.012'], answer: 0, explain: 'k = 2 ÷ 6 ≈ 0,3333. EMA = (3.060 − 3.000) × 0,3333 + 3.000 ≈ 3.020. 3.060 là giá đóng, không phải EMA; 3.030 là lấy trung bình hai số; 3.012 là dùng k = 0,2.' },
      { q: 'Trên D1, giá đã cắt qua lại EMA 50 bốn lần trong 20 nến, EMA 50 gần như nằm ngang. Theo quy tắc khóa học, bạn nên?', options: ['Theo tín hiệu giao cắt tiếp theo với khối lượng gấp đôi', 'Mua, vì giá đang đóng cửa trên EMA 50 và EMA 50 chưa dốc xuống', 'Bán khống, vì giá cắt EMA 50 nhiều lần là dấu hiệu sắp phá xuống', 'Coi là đi ngang, tắt bộ lọc MA, giảm khối lượng hoặc đứng ngoài'], answer: 3, explain: 'Cắt qua từ 3 lần trong 20 nến và MA nằm ngang là điều kiện đi ngang của khóa. Tăng khối lượng sau chuỗi thua là sai lầm. Vị trí giá so với MA trong vùng ngang không có ý nghĩa xu hướng; đoán phá xuống là không có căn cứ.' },
      { q: 'Vì sao golden cross thường không phù hợp làm điểm vào lệnh?', options: ['Vì nó chỉ xuất hiện trên khung nhỏ như M1, nhiễu quá nhiều', 'Vì MA tính từ giá quá khứ, giao cắt đến khi giá đã đi xa', 'Vì golden cross thực ra là tín hiệu giảm, ngược với tên gọi', 'Vì nhiều sàn không cho hiển thị MA 200 trên biểu đồ'], answer: 1, explain: 'MA luôn đi sau giá, nên khi MA 50 cắt lên MA 200 thì giá thường đã tăng đáng kể. Golden cross không chỉ có trên khung nhỏ, không phải tín hiệu giảm, và mọi sàn lớn đều hiển thị MA 200.' }
    ],
    sources: [
      { title: 'Moving Averages - Simple and Exponential', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/moving-averages-simple-and-exponential', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Dow Theory', url: 'https://chartschool.stockcharts.com/table-of-contents/market-analysis/dow-theory', note: 'StockCharts ChartSchool, tiếng Anh (kết hợp MA với cấu trúc đỉnh đáy)' }
    ],
    updated: '2026-09'
  },

  'c2-b6': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Hiểu RSI của Wilder và MACD của Appel, vì sao quá mua vẫn có thể tăng tiếp, cách đọc phân kỳ và giới hạn chung của mọi chỉ báo.',
    goals: [
      'Tính được RSI từ lãi và lỗ trung bình, hiểu cách làm mượt của Wilder',
      'Đọc MACD, đường tín hiệu và histogram với tham số 12, 26, 9',
      'Dùng phân kỳ như cảnh báo, không phải lệnh đảo chiều',
      'Chọn tối đa hai chỉ báo khác loại thay vì chồng nhiều chỉ báo giống nhau'
    ],
    blocks: [
      { type: 'h', text: 'RSI: đo tốc độ tăng giảm' },
      { type: 'p', text: 'Chỉ số sức mạnh tương đối (Relative Strength Index, RSI) do J. Welles Wilder giới thiệu trong sách <em>New Concepts in Technical Trading Systems</em> năm 1978, cùng cuốn sách với ATR và ADX. RSI là chỉ báo động lượng (momentum), dao động từ 0 đến 100, mặc định 14 kỳ.' },
      { type: 'formula', title: 'Công thức RSI', expr: 'RS = Lãi trung bình ÷ Lỗ trung bình; RSI = 100 − 100 ÷ (1 + RS)', vars: [['Lãi trung bình', 'Trung bình mức tăng của các nến tăng trong 14 kỳ (nến giảm tính là 0)'], ['Lỗ trung bình', 'Trung bình mức giảm của các nến giảm trong 14 kỳ, lấy giá trị dương']], note: 'Làm mượt kiểu Wilder: Lãi trung bình mới = (Lãi trung bình cũ × 13 + Lãi hiện tại) ÷ 14. Lỗ trung bình tính tương tự.' },
      { type: 'calc', title: 'Tính RSI 14 qua hai nến (số liệu giả định, đơn vị USDT)', rows: [
        ['Hiện tại', 'Lãi trung bình 600, lỗ trung bình 300'],
        ['RS', '600 ÷ 300 = 2'],
        ['RSI', '100 − 100 ÷ (1 + 2) = 100 − 33,33 ≈ 66,67'],
        ['Nến tiếp theo tăng 900', 'Lãi TB mới = (600 × 13 + 900) ÷ 14 = 8.700 ÷ 14 ≈ 621,43'],
        ['Lỗ của nến này là 0', 'Lỗ TB mới = (300 × 13 + 0) ÷ 14 = 3.900 ÷ 14 ≈ 278,57'],
        ['RS mới', '621,43 ÷ 278,57 ≈ 2,2308'],
        ['RSI mới', '100 − 100 ÷ 3,2308 ≈ 69,05']
      ], result: 'Một nến tăng mạnh chỉ đẩy RSI từ 66,67 lên 69,05 vì cách làm mượt của Wilder. RSI phản ánh tốc độ đi của giá trong 14 kỳ, không phải một dự báo.' },
      { type: 'figure', name: 'rsi-divergence', caption: 'Giá và RSI với vùng 70/30; giá tạo đỉnh cao hơn trong khi RSI tạo đỉnh thấp hơn là phân kỳ giảm.' },

      { type: 'h', text: 'Quá mua không có nghĩa là sắp giảm' },
      { type: 'p', text: 'Cách hiểu truyền thống: RSI trên 70 là quá mua (overbought), dưới 30 là quá bán (oversold). Nhiều người mới dịch thẳng thành "trên 70 thì bán, dưới 30 thì mua". Đây là một trong những cách mất tiền nhanh nhất trong xu hướng mạnh.' },
      { type: 'p', text: 'RSI trên 70 chỉ có nghĩa là giá đã tăng nhanh trong 14 kỳ gần đây. Trong xu hướng tăng mạnh, giá có thể tăng nhanh rất lâu. ChartSchool dẫn ví dụ cổ phiếu có RSI quá mua nhưng không giảm, chỉ đi ngang vài tuần rồi tăng tiếp. ChartSchool cũng dẫn quan sát của Constance Brown (sách <em>Technical Analysis for the Trading Professional</em>): trong xu hướng tăng RSI thường dao động 40–90, vùng 40–50 đóng vai trò hỗ trợ; trong xu hướng giảm RSI thường dao động 10–60, vùng 50–60 là kháng cự. Các vùng này có thể lệch tùy tham số RSI, độ mạnh xu hướng và độ biến động của tài sản.' },
      { type: 'table', head: ['Bối cảnh D1', 'Cách dùng RSI như bộ lọc'], rows: [
        ['Xu hướng tăng (HH/HL, giá trên EMA 50)', 'Không bán chỉ vì RSI trên 70. Nhịp điều chỉnh đưa RSI về 40–50 có thể là vùng tìm lệnh mua, nếu trùng hỗ trợ.'],
        ['Xu hướng giảm (LH/LL, giá dưới EMA 50)', 'Không mua chỉ vì RSI dưới 30. Nhịp hồi đưa RSI lên 50–60 thường gặp kháng cự.'],
        ['Đi ngang', 'Vùng 70/30 hoạt động tốt hơn, nhưng vẫn cần giá ở cạnh biên độ và dừng lỗ ngoài biên.']
      ] },
      { type: 'callout', tone: 'risk', title: 'Bán khống vì RSI quá mua trong xu hướng tăng', text: 'Mở lệnh bán Futures chỉ vì RSI D1 trên 70 trong khi cấu trúc vẫn tăng là đi ngược xu hướng với một tín hiệu yếu. Nếu dùng đòn bẩy cao, một nhịp tăng tiếp 10% có thể đưa bạn tới thanh lý. RSI không bao giờ là lý do duy nhất để vào lệnh.' },

      { type: 'h', text: 'Phân kỳ: cảnh báo, không phải lệnh' },
      { type: 'p', text: '<strong>Phân kỳ giảm (bearish divergence)</strong>: giá tạo đỉnh cao hơn nhưng RSI tạo đỉnh thấp hơn. <strong>Phân kỳ tăng (bullish divergence)</strong>: giá tạo đáy thấp hơn nhưng RSI tạo đáy cao hơn. Theo Wilder, phân kỳ cho thấy động lượng không xác nhận giá, nên có thể là điểm đảo chiều tiềm năng.' },
      { type: 'p', text: 'Nhưng ChartSchool cảnh báo: một xu hướng tăng mạnh có thể có nhiều phân kỳ giảm liên tiếp trước khi thật sự tạo đỉnh, và phân kỳ tăng cũng xuất hiện nhiều lần trong xu hướng giảm mà giá vẫn giảm tiếp. Vì vậy quy tắc của khóa là:' },
      { type: 'list', ordered: true, items: [
        'Phân kỳ chỉ là <strong>cảnh báo</strong>: siết dừng lỗ, không mở thêm vị thế cùng chiều, cân nhắc chốt một phần.',
        'Chỉ cân nhắc lệnh ngược chiều khi phân kỳ đi kèm <strong>phá vỡ cấu trúc</strong> trên giá (nến đóng dưới HL gần nhất, bài 2.2).',
        'Phân kỳ phải nối hai đỉnh (hoặc hai đáy) đã xác nhận theo quy tắc swing point, không nối hai điểm tùy chọn.'
      ] },

      { type: 'h', text: 'MACD: hai đường trung bình thành một chỉ báo' },
      { type: 'p', text: 'MACD (Moving Average Convergence/Divergence) do Gerald Appel phát triển cuối thập niên 1970. Nó biến hai đường EMA (công cụ theo xu hướng, bài 2.5) thành một chỉ báo động lượng.' },
      { type: 'formula', title: 'Ba thành phần của MACD (12, 26, 9)', expr: 'Đường MACD = EMA 12 − EMA 26; Đường tín hiệu = EMA 9 của đường MACD; Histogram = Đường MACD − Đường tín hiệu', vars: [['MACD dương', 'EMA 12 nằm trên EMA 26: động lượng ngắn hạn mạnh hơn'], ['Histogram', 'Khoảng cách giữa MACD và đường tín hiệu; thu hẹp nghĩa là động lượng chậm lại']] },
      { type: 'calc', title: 'Đọc MACD tại một thời điểm (giá BTC giả định)', rows: [
        ['EMA 12', '81.000'],
        ['EMA 26', '80.400'],
        ['Đường MACD', '81.000 − 80.400 = 600'],
        ['Đường tín hiệu', '450'],
        ['Histogram', '600 − 450 = 150 (dương, MACD trên tín hiệu)']
      ], result: 'MACD dương và trên đường tín hiệu: động lượng đang nghiêng về tăng. Nếu histogram thu hẹp dần từ 150 về 0, động lượng đang chậm lại, dù giá có thể vẫn tăng.' },
      { type: 'figure', name: 'macd', caption: 'Giá, đường MACD, đường tín hiệu và histogram.' },
      { type: 'list', items: [
        'MACD không có giới hạn trên dưới như RSI, nên ChartSchool nhận định nó không phù hợp để xác định quá mua quá bán.',
        'Giá trị MACD phụ thuộc giá tài sản: MACD 600 của BTC không so được với MACD của ETH.',
        'Giao cắt với đường tín hiệu tạo nhiều whipsaw khi không có xu hướng mạnh, giống giao cắt MA ở bài 2.5.'
      ] },

      { type: 'h', text: 'Giới hạn chung của chỉ báo' },
      { type: 'p', text: 'RSI, MACD và MA đều được tính từ cùng một dữ liệu: giá quá khứ. Chúng là <strong>dẫn xuất của giá</strong>, nên không chứa thông tin mới mà giá không có, và luôn đi sau giá ít nhiều. Chúng giúp bạn đo và mô tả, không giúp bạn nhìn thấy tương lai.' },
      { type: 'callout', tone: 'warn', title: 'Năm chỉ báo động lượng không phải năm lần xác nhận', text: 'RSI, Stochastic, CCI, MACD, Momentum cùng đo tốc độ giá. Khi cả năm cùng báo "quá mua", bạn không có năm bằng chứng độc lập, bạn có một bằng chứng lặp lại năm lần. Quy tắc của khóa: tối đa một chỉ báo xu hướng (MA) và một chỉ báo động lượng (RSI hoặc MACD), cộng với cấu trúc giá và volume.' },
      { type: 'scenario', title: 'RSI D1 lên 78', setup: 'BTC có 3 HH và 3 HL trên D1, giá trên EMA 50 dốc lên (giả định). RSI D1 lên 78, MACD histogram bắt đầu thu hẹp.', bad: 'Trader cảm tính thấy "quá mua cực độ", bán hết Spot và mở lệnh short 20x. Giá tăng thêm 8% trong 5 ngày, RSI vẫn quanh 75. Lệnh short bị thanh lý, anh mua lại Spot ở giá cao hơn.', good: 'Trader có kế hoạch ghi nhận: cấu trúc và MA vẫn tăng, RSI cao chỉ là cảnh báo. Anh không mở lệnh mới vì giá xa vùng hỗ trợ, dời dừng lỗ lên dưới HL gần nhất, và chờ nhịp điều chỉnh về vùng hỗ trợ trùng RSI 40–50 để cân nhắc lệnh mua tiếp theo.' },
      { type: 'checklist', title: 'Dùng chỉ báo động lượng đúng vai trò', items: [
        'Đã xác định bối cảnh D1 bằng cấu trúc giá trước khi nhìn RSI hoặc MACD',
        'Không mở lệnh chỉ vì RSI trên 70 hoặc dưới 30',
        'Phân kỳ nối hai đỉnh hoặc hai đáy đã xác nhận, và chỉ được dùng như cảnh báo',
        'Lệnh ngược chiều chỉ được cân nhắc khi cấu trúc giá đã phá',
        'Trên biểu đồ chỉ có một chỉ báo động lượng'
      ] },
      { type: 'p', text: 'Cuối cùng, tham số mặc định (RSI 14, MACD 12/26/9) ra đời trong bối cảnh thị trường chứng khoán và hàng hóa, với số phiên giao dịch mỗi tuần khác crypto. Chúng vẫn dùng được cho crypto, nhưng đừng coi là tham số tối ưu. Việc đổi tham số liên tục để chỉ báo "khớp" với quá khứ chỉ làm bạn tự tin sai. Hãy giữ mặc định, ghi kết quả vào nhật ký giao dịch, và đánh giá sau ít nhất vài chục lệnh.' }
    ],
    keyPoints: [
      'RSI do Wilder giới thiệu năm 1978, mặc định 14 kỳ; RSI = 100 − 100 ÷ (1 + RS).',
      'RSI trên 70 trong xu hướng tăng mạnh có thể kéo dài; không bán chỉ vì quá mua.',
      'Phân kỳ là cảnh báo; chỉ cân nhắc lệnh ngược chiều khi có phá vỡ cấu trúc trên giá.',
      'MACD do Gerald Appel phát triển: EMA 12 − EMA 26, tín hiệu EMA 9, histogram là hiệu hai đường.',
      'Chỉ báo là dẫn xuất của giá nên trễ; dùng tối đa một chỉ báo xu hướng và một chỉ báo động lượng.'
    ],
    practice: [
      'Bật RSI 14 trên BTCUSDT D1. Tìm 3 lần RSI vượt 70 trong xu hướng tăng và ghi lại giá 10 nến sau đó cao hơn hay thấp hơn.',
      'Tìm một phân kỳ giảm trên D1, kiểm tra xem sau đó cấu trúc có bị phá không và giá đi thế nào.',
      'Dọn biểu đồ của bạn: chỉ giữ EMA 20/50, một chỉ báo động lượng và volume. Ghi lý do chọn chỉ báo động lượng đó.'
    ],
    quiz: [
      { q: 'Lãi trung bình 14 kỳ là 400, lỗ trung bình là 100 (giả định). RSI bằng bao nhiêu?', options: ['75', '25', '80', '4'], answer: 2, explain: 'RS = 400 ÷ 100 = 4. RSI = 100 − 100 ÷ (1 + 4) = 100 − 20 = 80. 75 là nhầm thành 100 − 100 ÷ 4 (quên cộng 1); 25 là 100 ÷ 4; 4 chỉ là RS, chưa đổi ra RSI.' },
      { q: 'EMA 12 là 3.050, EMA 26 là 3.020, đường tín hiệu là 35 (giả định). Histogram MACD là?', options: ['30', '65', '35', '−5'], answer: 3, explain: 'MACD = 3.050 − 3.020 = 30. Histogram = 30 − 35 = −5, tức MACD nằm dưới đường tín hiệu. 30 là đường MACD; 65 là cộng nhầm; 35 là đường tín hiệu.' },
      { q: 'BTC đang tăng rõ trên D1 (HH/HL, trên EMA 50), RSI D1 xuất hiện phân kỳ giảm. Theo quy tắc khóa học, hành động hợp lý là?', options: ['Siết dừng lỗ, không mua thêm, chờ xem cấu trúc có bị phá không', 'Mở lệnh short ngay, vì phân kỳ giảm báo đỉnh đã hình thành', 'Bỏ qua hoàn toàn, vì phân kỳ trong xu hướng mạnh không có ý nghĩa', 'Mua thêm, vì RSI vẫn trên 50 nghĩa là động lượng còn tăng'], answer: 0, explain: 'Phân kỳ là cảnh báo: bảo vệ lợi nhuận, không tăng vị thế. Short ngay là coi phân kỳ như lệnh độc lập khi cấu trúc chưa phá. Bỏ qua hoàn toàn thì phí thông tin cảnh báo. Mua thêm là đi ngược cảnh báo.' },
      { q: 'Biểu đồ của bạn có RSI, Stochastic, CCI và Momentum cùng báo quá mua. Nhận định nào đúng?', options: ['Bốn xác nhận độc lập nhau, nên xác suất giá giảm sắp tới rất cao', 'Cả bốn cùng đo động lượng từ giá, gần như một thông tin lặp lại', 'Nên thêm MACD để có năm xác nhận trước khi vào lệnh bán', 'Dùng càng nhiều chỉ báo thì tín hiệu càng ít bị trễ'], answer: 1, explain: 'Các chỉ báo này đều tính từ giá và đều đo tốc độ, nên không độc lập. Thêm MACD không đổi bản chất. Chồng chỉ báo không làm giảm độ trễ vì chúng đều là dẫn xuất của giá.' }
    ],
    sources: [
      { title: 'Relative Strength Index (RSI)', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/relative-strength-index-rsi', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'MACD (Moving Average Convergence/Divergence Oscillator)', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/macd-moving-average-convergence-divergence-oscillator', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Average True Range (ATR) and Average True Range Percent (ATRP)', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp', note: 'StockCharts ChartSchool, tiếng Anh (ATR cùng sách New Concepts in Technical Trading Systems, 1978)' }
    ],
    updated: '2026-09'
  },

  'c2-b7': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Dùng Fibonacci thoái lui như vùng tham khảo, đọc vai đầu vai, tam giác, cờ với điều kiện xác nhận, và phân tích đa khung theo tỷ lệ 4–6 lần.',
    goals: [
      'Vẽ Fibonacci thoái lui trên một sóng và tính các mức 38,2%, 50%, 61,8%',
      'Nhận diện vai đầu vai, tam giác, cờ và biết điều kiện hoàn thành mô hình',
      'Chọn bộ ba khung thời gian hợp lý và phân vai cho từng khung',
      'Kết hợp nhiều yếu tố thành vùng hợp lưu thay vì tin một công cụ'
    ],
    blocks: [
      { type: 'h', text: 'Fibonacci thoái lui: vùng tham khảo, không phải phép màu' },
      { type: 'p', text: 'Sau một sóng tăng, giá thường điều chỉnh lại một phần trước khi đi tiếp. Công cụ Fibonacci thoái lui (Fibonacci retracement) chia sóng đó thành các mức phần trăm để bạn biết giá đã điều chỉnh sâu bao nhiêu. Các mức phổ biến: 23,6%, 38,2%, 50%, 61,8% và đôi khi 78,6%.' },
      { type: 'p', text: 'Các tỷ lệ 23,6%, 38,2%, 61,8% xuất phát từ dãy Fibonacci và tỷ lệ vàng. Riêng 50% <strong>không phải</strong> số Fibonacci; ChartSchool giải thích nó đến từ nhận định của Lý thuyết Dow rằng giá thường lấy lại khoảng một nửa nhịp trước. Điều này nhắc bạn rằng các mức này là quy ước được nhiều người dùng, không phải quy luật tự nhiên của thị trường.' },
      { type: 'figure', name: 'fibonacci', caption: 'Fibonacci thoái lui 0,382 / 0,5 / 0,618 trên một sóng tăng.' },
      { type: 'formula', title: 'Mức thoái lui trên sóng tăng', expr: 'Mức thoái lui = Đỉnh sóng − (Đỉnh sóng − Đáy sóng) × Tỷ lệ', vars: [['Đáy sóng, Đỉnh sóng', 'Swing low và swing high đã xác nhận (bài 2.2)'], ['Tỷ lệ', '0,382; 0,5; 0,618']] },
      { type: 'calc', title: 'Fibonacci trên sóng BTC 70.000 → 90.000 (giả định)', rows: [
        ['Độ dài sóng', '90.000 − 70.000 = 20.000'],
        ['Mức 38,2%', '90.000 − 20.000 × 0,382 = 90.000 − 7.640 = 82.360'],
        ['Mức 50%', '90.000 − 20.000 × 0,5 = 80.000'],
        ['Mức 61,8%', '90.000 − 20.000 × 0,618 = 90.000 − 12.360 = 77.640'],
        ['Vùng tham khảo', 'Khoảng 77.640–82.360']
      ], result: 'Fibonacci không cho bạn một điểm mua, nó cho bạn một vùng rộng khoảng 4.700 USDT. Bạn thu hẹp vùng bằng cách tìm chỗ trùng với hỗ trợ ngang, EMA 50 hoặc POC.' },
      { type: 'callout', tone: 'warn', title: 'Fibonacci luôn "đúng" khi nhìn lại', text: 'Với 5 mức cách nhau vài phần trăm, giá gần như luôn phản ứng ở đâu đó gần một mức. Nhìn lại quá khứ thì mức nào cũng "chuẩn". ChartSchool nhấn mạnh các mức này không phải điểm đảo chiều cứng, chỉ là vùng cảnh báo, cần thêm nến, động lượng, volume hoặc mô hình để xác nhận. Quy tắc của khóa: chỉ dùng Fibonacci khi vùng 38,2–61,8% trùng với ít nhất một vùng hỗ trợ đã vẽ từ trước.' },

      { type: 'h', text: 'Mô hình vai đầu vai' },
      { type: 'p', text: 'Vai đầu vai (head and shoulders) là mô hình đảo chiều xuất hiện sau xu hướng tăng. Nó gồm ba đỉnh: đỉnh giữa (đầu) cao nhất, hai đỉnh hai bên (vai) thấp hơn và gần bằng nhau. Đường nối hai đáy giữa ba đỉnh gọi là <strong>đường viền cổ (neckline)</strong>.' },
      { type: 'figure', name: 'head-shoulders', caption: 'Vai trái, đầu, vai phải và đường viền cổ; mô hình chỉ hoàn thành khi giá phá đường viền cổ.' },
      { type: 'list', items: [
        '<strong>Mô hình chưa hoàn thành cho đến khi phá đường viền cổ</strong>, lý tưởng là nến đóng dưới đường viền cổ với volume tăng. Trước đó, nó chỉ là "có thể là vai đầu vai".',
        'Về cấu trúc, vai phải thấp hơn đầu chính là một LH, và phá đường viền cổ chính là phá HL gần nhất. Vai đầu vai là một cách gọi tên cho phá vỡ cấu trúc ở bài 2.2.',
        'Sau khi phá, giá hay quay lại kiểm tra đường viền cổ từ bên dưới; hỗ trợ cũ thành kháng cự (bài 2.3).',
        'Hai vai không cần đối xứng hoàn hảo. Quan trọng nhất là đường viền cổ và xác nhận bằng volume.'
      ] },
      { type: 'calc', title: 'Mục tiêu giá đo được của vai đầu vai (giả định)', rows: [
        ['Đỉnh đầu', '88.000'],
        ['Đường viền cổ', '80.000'],
        ['Chiều cao mô hình', '88.000 − 80.000 = 8.000'],
        ['Mục tiêu đo được', '80.000 − 8.000 = 72.000'],
        ['Dừng lỗ cho lệnh bán (ví dụ)', 'Trên vai phải, giả sử vai phải 84.500 → dừng lỗ 85.000'],
        ['Tỷ lệ R:R nếu bán ở 79.500', 'Rủi ro 85.000 − 79.500 = 5.500; mục tiêu 79.500 − 72.000 = 7.500; R:R ≈ 1,36']
      ], result: 'Mục tiêu đo được chỉ là hướng dẫn thô, không phải lời hứa. Ở ví dụ này R:R chỉ khoảng 1,36, chưa hấp dẫn; một lệnh chờ retest đường viền cổ có thể cho R:R tốt hơn.' },
      { type: 'callout', tone: 'risk', title: 'Bán khống trước khi đường viền cổ bị phá', text: 'Nhiều người thấy "vai phải đang hình thành" rồi bán khống sớm để có giá đẹp. Nếu giá không phá đường viền cổ mà quay lên vượt đầu, đó không còn là vai đầu vai và lệnh bán ngược xu hướng tăng sẽ lỗ nhanh. Với Futures, chỉ luyện các lệnh này trên Demo Trading trước.' },

      { type: 'h', text: 'Tam giác và cờ: mô hình tiếp diễn' },
      { type: 'table', head: ['Mô hình', 'Hình dạng', 'Điều kiện xác nhận'], rows: [
        ['Tam giác cân (symmetrical)', 'Đỉnh thấp dần và đáy cao dần, hội tụ; cần ít nhất 4 điểm chạm (2 mỗi cạnh)', 'Nến đóng ngoài cạnh tam giác, volume tăng khi phá; hướng phá không đoán trước được'],
        ['Tam giác tăng (ascending)', 'Cạnh trên nằm ngang, cạnh dưới dốc lên', 'Nến đóng trên cạnh ngang, volume tăng'],
        ['Tam giác giảm (descending)', 'Cạnh dưới nằm ngang, cạnh trên dốc xuống', 'Nến đóng dưới cạnh ngang, volume tăng'],
        ['Cờ tăng (bull flag)', 'Nhịp tăng mạnh (cán cờ), sau đó đi ngang hoặc hơi giảm trong kênh hẹp', 'Nến đóng trên cạnh trên của cờ, cùng chiều xu hướng khung lớn']
      ] },
      { type: 'p', text: 'ChartSchool dẫn Edwards và Magee rằng khoảng 75% tam giác cân là mô hình tiếp diễn, số còn lại là đảo chiều. Nghĩa là cứ 4 lần thì khoảng 1 lần đi ngược kỳ vọng. Trong tam giác, volume thường giảm dần khi biên độ co lại, và phá vỡ thật thường đi kèm volume tăng. Binance Academy tóm lại: xác nhận quan trọng hơn cái tên của mô hình.' },

      { type: 'h', text: 'Phân tích đa khung thời gian' },
      { type: 'p', text: 'Cùng một lúc, BTC có thể đang tăng trên D1, điều chỉnh trên H4 và giảm mạnh trên M15. Không khung nào "sai". Phân tích đa khung (multiple timeframe analysis) giải quyết mâu thuẫn này bằng cách phân vai rõ ràng cho từng khung.' },
      { type: 'figure', name: 'multi-timeframe', caption: 'Ba khung: D1 định hướng, H4 tìm vùng giá, H1 tìm điểm vào.' },
      { type: 'p', text: 'Alexander Elder đề xuất các khung cách nhau khoảng 5 lần: chọn khung giao dịch chính, khung lớn gấp khoảng 5 lần để xác định xu hướng. Theo ChartSchool mô tả hệ thống của Elder, tín hiệu mua trên khung ngày chỉ hợp lệ khi khung tuần đang tăng rõ; tín hiệu ngược chiều khung lớn bị bỏ qua. Trong thực tế, tỷ lệ 4–6 lần giữa các khung là hợp lý.' },
      { type: 'table', head: ['Kiểu giao dịch', 'Khung định hướng', 'Khung vùng giá', 'Khung vào lệnh', 'Tỷ lệ'], rows: [
        ['Giữ vài tuần', 'W1', 'D1', 'H4', '7 lần (ngoại lệ) và 6 lần'],
        ['Giữ vài ngày', 'D1', 'H4', 'H1', '6 lần và 4 lần'],
        ['Trong ngày', 'H4', 'H1', 'M15', '4 lần và 4 lần']
      ] },
      { type: 'p', text: 'Cặp W1/D1 là ngoại lệ: một tuần crypto có 7 nến D1 nên tỷ lệ là 7, hơi vượt khoảng 4–6. Sàn không có khung 5 ngày phổ biến, nên W1 vẫn là lựa chọn gần nhất cho khung định hướng của người giữ lệnh vài tuần.' },
      { type: 'steps', items: [
        { title: 'D1: định hướng', text: 'Ghi nhãn xu hướng theo cấu trúc (bài 2.2) và bộ lọc EMA 50 (bài 2.5). Chỉ giao dịch cùng chiều nhãn này. Nhãn "không rõ" nghĩa là đứng ngoài.' },
        { title: 'H4: vùng giá', text: 'Tìm vùng hợp lưu: hỗ trợ ngang, Fibonacci 38,2–61,8%, EMA 50 H4, POC. Cần ít nhất 2 yếu tố trùng nhau.' },
        { title: 'H1: điểm vào', text: 'Khi giá vào vùng, chờ tín hiệu xác nhận trên H1: mẫu nến tại vùng, phá cấu trúc giảm nhỏ trên H1, volume tăng. Đặt dừng lỗ dưới vùng H4, không phải dưới một nến H1 nhỏ.' }
      ] },
      { type: 'callout', tone: 'warn', title: 'Đừng nhảy khung để tìm lý do', text: 'Khi D1 không cho tín hiệu, rất dễ mở M5 để "tìm cơ hội". Khi lệnh đang lỗ trên H1, rất dễ mở D1 để tự nhủ "dài hạn vẫn tăng". Cả hai đều là đổi khung để phục vụ cảm xúc. Viết bộ ba khung vào kế hoạch và không đổi giữa chừng.' },

      { type: 'h', text: 'Ghép lại: vùng hợp lưu' },
      { type: 'scenario', title: 'ETH điều chỉnh sau sóng tăng', setup: 'Giả định: D1 tăng (2 HH, 2 HL, giá trên EMA 50 dốc lên). Sóng tăng 2.600 → 3.400. Fibonacci 50% ở 3.000, 61,8% ở khoảng 2.906. Vùng hỗ trợ ngang cũ 2.950–3.020. Giá đang về 3.050.', bad: 'Trader cảm tính thấy giá "đã giảm nhiều" nên mua ngay ở 3.050, sau đó thấy trên M5 có vai đầu vai nên bán cắt lỗ, rồi thấy nến búa trên M15 lại mua vào. Ba lệnh, ba lý do, không lệnh nào có dừng lỗ viết trước.', good: 'Trader có kế hoạch ghi: D1 tăng (được phép mua); vùng H4 hợp lưu 2.950–3.020 (hỗ trợ ngang trùng Fibonacci 50%). Anh chờ giá vào vùng và chờ nến H1 đóng xác nhận. Dừng lỗ dưới 2.900 (dưới mức 61,8% và dưới vùng). Khối lượng tính theo 1% tài khoản. Nếu giá không vào vùng, không có lệnh.' },
      { type: 'checklist', title: 'Kiểm tra trước lệnh theo đa khung', items: [
        'Nhãn D1 cho phép hướng giao dịch này',
        'Vùng H4 có ít nhất 2 yếu tố hợp lưu',
        'Mô hình giá (nếu có) đã hoàn thành bằng nến đóng qua mức xác nhận',
        'Tín hiệu H1 đã đóng nến',
        'Dừng lỗ nằm ngoài vùng H4, khối lượng tính theo % rủi ro cố định'
      ] }
    ],
    keyPoints: [
      'Fibonacci 38,2/50/61,8% là vùng tham khảo; 50% không phải số Fibonacci; chỉ dùng khi trùng hỗ trợ đã vẽ.',
      'Vai đầu vai chỉ hoàn thành khi nến đóng dưới đường viền cổ; mục tiêu đo được là hướng dẫn thô.',
      'Tam giác và cờ cần nến đóng ngoài cạnh và volume tăng; khoảng 1/4 tam giác cân đi ngược kỳ vọng.',
      'Phân tích đa khung theo tỷ lệ 4–6 lần: khung lớn định hướng, khung giữa tìm vùng, khung nhỏ vào lệnh.',
      'Không đổi khung giữa chừng để tìm lý do; vùng hợp lưu cần ít nhất 2 yếu tố.'
    ],
    practice: [
      'Chọn sóng tăng gần nhất trên BTCUSDT D1, tự tính mức 38,2%, 50%, 61,8% bằng tay rồi đối chiếu với công cụ Fibonacci trên biểu đồ.',
      'Tìm một mô hình vai đầu vai hoặc tam giác trong quá khứ, ghi ngày nến xác nhận và so sánh mục tiêu đo được với nơi giá thật sự dừng.',
      'Viết bộ ba khung thời gian của bạn (ví dụ D1/H4/H1) vào kế hoạch giao dịch, kèm vai trò của từng khung.'
    ],
    quiz: [
      { q: 'Sóng tăng từ 2.500 lên 3.500 (giả định). Mức Fibonacci thoái lui 61,8% nằm ở đâu?', options: ['3.118', '2.882', '3.000', '2.163'], answer: 1, explain: 'Độ dài sóng 1.000. Mức 61,8% = 3.500 − 1.000 × 0,618 = 2.882. 3.118 là cộng 618 từ đáy (2.500 + 618), tức chính là mức 38,2%; 3.000 là mức 50%; 2.163 là nhân nhầm giá đỉnh với tỷ lệ (3.500 × 0,618) thay vì nhân độ dài sóng.' },
      { q: 'Vai đầu vai có đỉnh đầu 3.600, đường viền cổ 3.200 (giả định). Mục tiêu đo được sau khi phá đường viền cổ là?', options: ['3.400', '2.600', '2.800', '3.000'], answer: 2, explain: 'Chiều cao = 3.600 − 3.200 = 400. Mục tiêu = 3.200 − 400 = 2.800. 3.400 là điểm giữa; 2.600 là trừ gấp đôi; 3.000 là trừ một nửa chiều cao.' },
      { q: 'Bạn giao dịch giữ lệnh vài ngày và dùng H4 làm khung tìm vùng giá. Theo tỷ lệ 4–6 lần, khung định hướng hợp lý là?', options: ['H1', 'M15', 'W1', 'D1'], answer: 3, explain: 'D1 dài gấp 6 lần H4, nằm trong tỷ lệ 4–6. H1 và M15 nhỏ hơn H4 nên không thể là khung định hướng. W1 dài gấp 42 lần H4, quá xa.' },
      { q: 'Vai phải đang hình thành nhưng giá chưa phá đường viền cổ. Điều nào đúng?', options: ['Chưa hoàn thành; chưa có tín hiệu bán, chỉ theo dõi', 'Mô hình đã hoàn thành, nên bán khống ngay để có giá tốt', 'Mục tiêu đo từ đầu xuống đường viền cổ đã chắc chắn sẽ đạt', 'Nên mua thêm vì vai phải thấp hơn đầu'], answer: 0, explain: 'Vai đầu vai chỉ hoàn thành khi nến đóng dưới đường viền cổ. Bán sớm là đoán trước. Mục tiêu đo được không bao giờ chắc chắn. Vai phải thấp hơn đầu là một LH, là cảnh báo cho lệnh mua, không phải lý do mua thêm.' }
    ],
    sources: [
      { title: 'Fibonacci Retracements', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/chart-annotation-tools/fibonacci-retracements', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Head and Shoulders Top', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/chart-patterns/head-and-shoulders-top', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Symmetrical Triangle', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/chart-patterns/symmetrical-triangle', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'A Beginner’s Guide to Classical Chart Patterns', url: 'https://www.binance.com/en/academy/articles/a-beginners-guide-to-classical-chart-patterns', note: 'Binance Academy, tiếng Anh' },
      { title: 'Elder Impulse System (khung tuần định hướng cho tín hiệu khung ngày)', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/chart-types/elder-impulse-system', note: 'StockCharts ChartSchool, tiếng Anh' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
