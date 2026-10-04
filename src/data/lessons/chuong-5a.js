const lessons = {
  'c5-b1': {
    duration: 10,
    level: 'Trung cấp',
    summary: 'Hợp đồng tương lai có kỳ hạn và vĩnh cửu, USDⓈ-M và COIN-M, cách tính lãi lỗ long/short bằng con số, và vì sao futures là trò chơi tổng bằng không trừ phí.',
    goals: [
      'Phân biệt hợp đồng có kỳ hạn, hợp đồng vĩnh cửu (perpetual), USDⓈ-M và COIN-M',
      'Tự tính lãi lỗ của một lệnh long hoặc short, đã trừ phí, trước khi bấm nút',
      'Hiểu vì sao tổng lãi lỗ của mọi người chơi futures luôn âm sau phí, và ai đang ngồi bên kia lệnh của bạn'
    ],
    blocks: [
      { type: 'h', text: 'Hợp đồng tương lai là gì' },
      { type: 'p', text: 'Khi mua spot (giao ngay), bạn trả tiền và nhận coin thật về ví. Khi giao dịch <strong>hợp đồng tương lai (futures)</strong>, bạn không mua coin. Bạn ký một hợp đồng với một người khác, cam kết thanh toán phần chênh lệch giá của tài sản đó. Giá đi đúng hướng bạn đặt cược thì bạn nhận chênh lệch. Giá đi ngược thì bạn trả chênh lệch.' },
      { type: 'p', text: 'Futures ban đầu sinh ra để phòng hộ (hedge): người nông dân bán trước vụ lúa ở giá cố định để khỏi lo giá sập. Trong crypto, futures chủ yếu được dùng để đầu cơ, vì nó cho phép hai thứ mà spot không làm được dễ dàng: kiếm lời khi giá giảm và mở vị thế lớn hơn số tiền đang có (đòn bẩy, xem bài 5.2).' },
      { type: 'table', head: ['Loại hợp đồng', 'Ngày hết hạn', 'Funding', 'Dùng cho ai'], rows: [
        ['Có kỳ hạn (delivery, ví dụ hợp đồng quý)', 'Có, cố định theo từng hợp đồng. Ví dụ hợp đồng quý BTCUSDT_261225 đáo hạn ngày 25/12/2026', 'Không có', 'Người giữ lâu, người phòng hộ muốn chi phí dự đoán được'],
        ['Vĩnh cửu (perpetual)', 'Không có, giữ bao lâu cũng được nếu không bị thanh lý', 'Có, trả/nhận định kỳ (bài 5.4)', 'Phần lớn trader nhỏ lẻ, giao dịch ngắn hạn']
      ] },
      { type: 'p', text: 'Hợp đồng vĩnh cửu không có ngày đáo hạn, nên sàn cần một cơ chế để giá hợp đồng không trôi quá xa giá giao ngay. Cơ chế đó là <strong>funding</strong>: khoản thanh toán định kỳ giữa bên long và bên short. Bài 5.4 sẽ tính chi tiết. Ở bài này bạn chỉ cần nhớ: giữ perpetual lâu có thể tốn tiền kể cả khi giá đứng yên.' },
      { type: 'h', text: 'USDⓈ-M và COIN-M: ký quỹ bằng gì, lãi lỗ bằng gì' },
      { type: 'table', head: ['', 'USDⓈ-M', 'COIN-M'], rows: [
        ['Ký quỹ và thanh toán', 'Bằng USDT hoặc USDC', 'Bằng chính coin cơ sở (BTC, ETH...)'],
        ['Giá trị một hợp đồng', 'Tính theo số lượng coin (1 hợp đồng BTCUSDT tương ứng 1 BTC, đặt được số lẻ)', 'Mỗi hợp đồng BTC đại diện 100 USD, ETH đại diện 10 USD'],
        ['Kỳ hạn có sẵn trên Binance', 'Vĩnh cửu cho rất nhiều cặp; riêng một số cặp lớn như BTCUSDT, ETHUSDT có thêm hợp đồng quý hiện tại và quý kế tiếp', 'Vĩnh cửu, và hợp đồng quý hiện tại, quý kế tiếp cho một số coin (BTC, ETH, BNB, XRP, SOL...)'],
        ['Điểm cần hiểu', 'Lãi lỗ tính thẳng ra USDT, dễ quy đổi', 'Tài sản ký quỹ tự biến động theo giá coin, lãi lỗ tính bằng coin']
      ] },
      { type: 'p', text: 'Với người mới, <strong>USDⓈ-M là lựa chọn dễ kiểm soát hơn</strong>: số dư đứng yên bằng USDT, lãi lỗ hiện thẳng bằng USDT. Ở COIN-M, nếu bạn long BTC bằng ký quỹ BTC thì khi giá giảm bạn lỗ hai lần: vị thế lỗ và bản thân tài sản ký quỹ mất giá. Toàn bộ ví dụ trong chương này dùng USDⓈ-M.' },
      { type: 'h', text: 'Long, short và cách tính lãi lỗ' },
      { type: 'list', items: [
        '<strong>Long</strong> (mua): kiếm lời khi giá tăng.',
        '<strong>Short</strong> (bán khống): kiếm lời khi giá giảm. Bạn không cần có coin trước, chỉ cần ký quỹ.',
        '<strong>Giá trị danh nghĩa (notional)</strong>: khối lượng × giá. Đây là quy mô thật của vị thế, và lãi lỗ tính trên con số này, không phải trên số tiền ký quỹ.'
      ] },
      { type: 'formula', title: 'Lãi lỗ của vị thế USDⓈ-M', expr: 'Long: PnL = Khối lượng × (Giá đóng − Giá mở) − Phí. Short: PnL = Khối lượng × (Giá mở − Giá đóng) − Phí', vars: [['Khối lượng', 'Số coin của vị thế, ví dụ 0,1 BTC'], ['Phí', 'Phí mở + phí đóng, mỗi lượt = Giá trị danh nghĩa lượt đó × tỷ lệ phí'], ['PnL', 'Lãi (dương) hoặc lỗ (âm), bằng USDT']], note: 'Chưa tính funding. Nếu giữ qua giờ funding thì cộng hoặc trừ thêm khoản funding (bài 5.4).' },
      { type: 'calc', title: 'Long 0,1 BTC perpetual (giả định BTC 80.000 USDT, phí taker 0,05% mỗi lượt)', rows: [
        ['Giá trị danh nghĩa khi mở', '0,1 × 80.000 = 8.000 USDT'],
        ['Phí mở', '8.000 × 0,05% = 4 USDT'],
        ['Trường hợp giá lên 84.000: lãi gộp', '0,1 × (84.000 − 80.000) = +400 USDT'],
        ['Phí đóng ở 84.000', '0,1 × 84.000 × 0,05% = 4,2 USDT'],
        ['Lãi ròng', '400 − 4 − 4,2 = +391,8 USDT'],
        ['Trường hợp giá xuống 76.000: lỗ gộp', '0,1 × (76.000 − 80.000) = −400 USDT'],
        ['Phí đóng ở 76.000', '7.600 × 0,05% = 3,8 USDT'],
        ['Lỗ ròng', '−400 − 4 − 3,8 = −407,8 USDT']
      ], result: 'Cùng biên độ 5%, bạn lãi 391,8 hoặc lỗ 407,8. Phí luôn làm lãi nhỏ đi và lỗ to ra.' },
      { type: 'calc', title: 'Short 0,1 BTC perpetual (cùng giả định)', rows: [
        ['Mở short ở 80.000, phí mở', '8.000 × 0,05% = 4 USDT'],
        ['Giá xuống 76.000: lãi gộp', '0,1 × (80.000 − 76.000) = +400 USDT'],
        ['Lãi ròng', '400 − 4 − 3,8 = +392,2 USDT'],
        ['Giá lên 84.000: lỗ gộp', '0,1 × (80.000 − 84.000) = −400 USDT'],
        ['Lỗ ròng', '−400 − 4 − 4,2 = −408,2 USDT']
      ], result: 'Short là hình ảnh đối xứng của long. Nhưng về lý thuyết giá có thể tăng không giới hạn, nên lỗ của short không có trần nếu bạn không đặt dừng lỗ.' },
      { type: 'callout', tone: 'note', title: 'Tỷ lệ phí trong ví dụ', text: 'Mức 0,05% cho lệnh taker (khớp ngay) và 0,02% cho lệnh maker (nằm chờ trong sổ lệnh) là mức thường gặp cho tài khoản thường trên USDⓈ-M. Đây là giả định để tính. Phí thật phụ thuộc cấp tài khoản và có thể thay đổi, hãy xem trang biểu phí của sàn trước khi tính cho mình.' },
      { type: 'h', text: 'So với spot: cùng lãi lỗ, khác rủi ro' },
      { type: 'p', text: 'Nếu bạn mua 0,1 BTC spot ở 80.000 và bán ở 84.000, lãi gộp cũng là 400 USDT. <strong>Lãi lỗ theo USDT giống hệt nhau khi khối lượng giống nhau.</strong> Khác biệt nằm ở chỗ khác:' },
      { type: 'table', head: ['Tiêu chí', 'Spot 0,1 BTC', 'Futures 0,1 BTC, ký quỹ 800 USDT (10x)'], rows: [
        ['Vốn bỏ ra', '8.000 USDT', '800 USDT ký quỹ'],
        ['Giá giảm 5% (76.000)', 'Lỗ 400 USDT trên giấy, vẫn giữ 0,1 BTC', 'Lỗ 400 USDT, tức 50% số ký quỹ'],
        ['Giá giảm khoảng 9,6% (72.320)', 'Lỗ 768 USDT trên giấy, vẫn giữ coin, có thể chờ', 'Bị thanh lý, gần như mất hết 800 USDT, không còn cơ hội chờ'],
        ['Kiếm lời khi giá giảm', 'Không (trừ khi vay coin)', 'Có, bằng lệnh short'],
        ['Chi phí giữ lâu', 'Không có', 'Funding mỗi 8 giờ']
      ] },
      { type: 'p', text: 'Điều đáng sợ của futures không phải là lỗ nhiều hơn spot trên cùng khối lượng. Điều đáng sợ là <strong>thanh lý (liquidation)</strong>: sàn đóng vị thế của bạn khi ký quỹ không còn đủ, biến khoản lỗ tạm thời thành khoản lỗ vĩnh viễn. Người giữ spot có thể chờ giá hồi. Người bị thanh lý thì không. Cơ chế này được giải thích kỹ ở bài 5.3.' },
      { type: 'callout', tone: 'risk', title: 'Lỗ nhanh hơn bạn nghĩ', text: 'Với ký quỹ 800 USDT cho vị thế 8.000 USDT, chỉ một cây nến giảm 5% đã lấy đi một nửa số ký quỹ. CFTC Mỹ cảnh báo rằng giao dịch futures bằng tài khoản ký quỹ khuếch đại rủi ro, bạn có thể mất nhiều hơn dự kiến rất nhanh. Luyện trên Binance Demo Trading (tiền ảo, giao diện thật) ít nhất vài tuần trước khi dùng tiền thật.' },
      { type: 'h', text: 'Trò chơi tổng bằng không, trừ phí' },
      { type: 'p', text: 'Mỗi hợp đồng futures có đúng hai phía: một người long và một người short. Khi giá tăng 4.000 USDT, người long 1 BTC lãi 4.000 thì người short 1 BTC bên kia lỗ đúng 4.000. Không có giá trị nào được tạo thêm. Tiền chỉ chuyển từ túi người này sang túi người kia. Đó là <strong>trò chơi tổng bằng không (zero-sum game)</strong>.' },
      { type: 'p', text: 'Nhưng thực tế còn tệ hơn tổng bằng không:' },
      { type: 'list', items: [
        '<strong>Phí giao dịch</strong>: cả hai phía đều trả phí cho sàn mỗi lần mở và đóng. Tiền này rời khỏi túi người chơi.',
        '<strong>Phí thanh lý</strong>: khi bị thanh lý, một khoản phí thanh lý (liquidation clearance fee) bị khấu trừ từ ký quỹ còn lại.',
        '<strong>Funding</strong>: chuyển trực tiếp giữa long và short, sàn không thu phí trên funding. Nó cũng là tổng bằng không giữa hai phía.',
        '<strong>Trượt giá (slippage)</strong>: lệnh market khớp ở giá kém hơn, phần chênh đó rơi vào túi người đặt lệnh chờ.'
      ] },
      { type: 'example', title: 'Hai người, một hợp đồng (giả định)', text: 'An long 0,1 BTC, Bình short 0,1 BTC, cùng giá 80.000, cùng đóng ở 84.000, phí taker 0,05% mỗi lượt. An lãi gộp +400, Bình lỗ gộp −400. Tổng gộp bằng 0. Mỗi người trả phí 4 + 4,2 = 8,2 USDT. An nhận ròng 391,8, Bình mất ròng 408,2. Tổng hai người: 391,8 − 408,2 = −16,4 USDT. Đúng bằng số phí sàn thu. Nhân lên với hàng triệu lệnh mỗi ngày, tập thể người chơi luôn âm.' },
      { type: 'p', text: 'Hàm ý rất thực dụng: để có lãi dài hạn, bạn không chỉ cần đúng hướng. Bạn phải <strong>giỏi hơn người ngồi bên kia lệnh đủ nhiều để bù được phí</strong>. Nếu bạn giao dịch ngẫu nhiên, kỳ vọng của bạn là âm, đúng bằng phí.' },
      { type: 'h', text: 'Ai đang ngồi bên kia lệnh của bạn' },
      { type: 'figure', name: 'order-book', caption: 'Mỗi lệnh long của bạn khớp với một người bán trong sổ lệnh. Người đặt lệnh chờ ở hai bên thường là nhà tạo lập thị trường và bot.' },
      { type: 'list', items: [
        '<strong>Nhà tạo lập thị trường (market maker)</strong>: đặt lệnh chờ cả hai phía, kiếm tiền từ chênh lệch mua bán (spread) và ưu đãi phí maker. Họ có hạ tầng nhanh, vốn lớn, quản trị rủi ro tự động.',
        '<strong>Quỹ và tổ chức</strong>: có đội ngũ phân tích, dữ liệu, thường dùng futures để phòng hộ hoặc kinh doanh chênh lệch (basis, funding).',
        '<strong>Bot giao dịch thuật toán</strong>: phản ứng trong mili giây với tin tức, sổ lệnh, dòng thanh lý.',
        '<strong>Trader nhỏ lẻ khác</strong>: một số có kỷ luật, phần lớn giao dịch theo cảm xúc. Các nghiên cứu về day trader (Brazil, Đài Loan) cho thấy chỉ một tỷ lệ rất nhỏ có lãi ổn định sau phí (xem bài 1.1 về thống kê).'
      ] },
      { type: 'scenario', title: 'Lần đầu mở futures', setup: 'Tài khoản 1.000 USDT. BTC vừa tăng mạnh, giả định 80.000. Một nhóm chat hô "long ngay kẻo lỡ".', bad: 'Mở long 0,1 BTC (8.000 USDT) với toàn bộ 1.000 USDT làm ký quỹ, không đặt dừng lỗ, nghĩ "giống mua spot thôi". Giá hồi 5% trong đêm, tài khoản mất 400 USDT, hoảng loạn đóng lệnh ở đáy.', good: 'Trước khi vào, tính trước: nếu sai và đóng ở dừng lỗ thì lỗ bao nhiêu USDT, đã gồm phí. Chọn khối lượng sao cho lỗ tối đa khoảng 1% tài khoản (10 USDT). Thử lệnh đó trên Demo Trading trước. Chỉ vào khi có setup theo kế hoạch, không vì nhóm chat.' },
      { type: 'callout', tone: 'warn', title: 'Pháp lý tại Việt Nam', text: 'Nghị quyết 05/2025/NQ-CP về thí điểm thị trường tài sản mã hóa không nhắc đến giao dịch phái sinh hay hợp đồng tương lai. Khung pháp lý đang thay đổi nhanh, hãy kiểm tra văn bản mới nhất trên cổng thông tin Chính phủ và Ủy ban Chứng khoán Nhà nước. Khóa học không phải tư vấn pháp lý.' }
    ],
    keyPoints: [
      'Perpetual không có ngày hết hạn nhưng có funding; hợp đồng có kỳ hạn không có funding.',
      'USDⓈ-M ký quỹ và tính lãi lỗ bằng USDT, dễ kiểm soát hơn COIN-M cho người mới.',
      'Lãi lỗ = khối lượng × chênh lệch giá − phí, tính trên giá trị danh nghĩa, không phải trên ký quỹ.',
      'Cùng khối lượng, futures và spot lãi lỗ bằng nhau; khác biệt chết người là thanh lý.',
      'Futures là tổng bằng không giữa long và short, cộng phí thì thành tổng âm cho người chơi.',
      'Bên kia lệnh của bạn thường là market maker, quỹ và bot có lợi thế hạ tầng.'
    ],
    practice: [
      'Mở Binance Demo Trading, chọn BTCUSDT perpetual (USDⓈ-M), mở một lệnh long và một lệnh short nhỏ. Ghi lại giá mở, giá đóng, phí thực tế và so với phép tính bằng tay.',
      'Tự tính: short 0,5 ETH ở 3.000, đóng ở 2.940, phí taker 0,05% mỗi lượt. Lãi ròng bao nhiêu? (Đáp án: 30 − 0,75 − 0,735 = 28,515 USDT)',
      'Viết ra giấy một câu trả lời: "Nếu tôi thắng lệnh này, ai đang thua, và vì sao tôi giỏi hơn họ?" Nếu không trả lời được, đừng vào lệnh thật.'
    ],
    quiz: [
      { q: 'Bạn short 2 ETH ở 3.000 USDT, đóng ở 2.850 USDT, phí taker 0,05% mỗi lượt. Lãi ròng là bao nhiêu?', options: ['294,15 USDT', '300 USDT', '305,85 USDT', '−294,15 USDT'], answer: 0, explain: 'Lãi gộp = 2 × (3.000 − 2.850) = 300. Phí mở = 6.000 × 0,05% = 3; phí đóng = 5.700 × 0,05% = 2,85. Lãi ròng = 300 − 3 − 2,85 = 294,15. 300 là quên phí; 305,85 là cộng phí thay vì trừ; số âm là nhầm chiều short.' },
      { q: 'Điểm khác biệt chính giữa perpetual và hợp đồng theo quý là gì?', options: ['Perpetual không có đòn bẩy', 'Perpetual không có ngày hết hạn và dùng funding để neo giá với giá giao ngay', 'Hợp đồng theo quý phải trả funding mỗi 8 giờ', 'Perpetual chỉ có ở COIN-M'], answer: 1, explain: 'Perpetual không đáo hạn nên cần funding để giữ giá gần giá chỉ số. Hợp đồng theo quý có ngày hết hạn và không có funding. Cả hai đều có đòn bẩy, và perpetual có cả ở USDⓈ-M lẫn COIN-M.' },
      { q: 'An long và Bình short cùng 0,1 BTC ở cùng giá, cùng đóng ở cùng giá, mỗi người trả tổng 8,2 USDT phí. Tổng lãi lỗ ròng của hai người là?', options: ['0 USDT', '+16,4 USDT', 'Tùy giá tăng hay giảm', '−16,4 USDT'], answer: 3, explain: 'Lãi gộp của người này đúng bằng lỗ gộp của người kia nên tổng gộp là 0 dù giá đi hướng nào. Trừ phí của cả hai: 0 − 8,2 − 8,2 = −16,4. Đó là lý do futures là tổng âm cho người chơi sau phí.' },
      { q: 'Bạn mua 0,1 BTC spot và một người khác long 0,1 BTC futures ký quỹ 800 USDT, cùng giá 80.000. Giá giảm về 72.000 rồi hồi lên 85.000. Nhận định nào đúng?', options: ['Cả hai cùng lãi khi giá hồi lên 85.000', 'Người futures lỗ ít hơn vì chỉ bỏ 800 USDT', 'Người spot vẫn giữ coin và lãi khi giá hồi; người futures đã bị thanh lý quanh 72.300 trước khi giá hồi', 'Người spot bị thanh lý ở 72.000'], answer: 2, explain: 'Với ký quỹ 800 cho vị thế 8.000, giá giảm khoảng 9,6% (quanh 72.300) là bị thanh lý, mất gần hết ký quỹ, không còn vị thế để hưởng nhịp hồi. Spot không bị thanh lý. Người futures không lỗ ít hơn: họ mất gần trọn 800 trong khi người spot cuối cùng lãi.' }
    ],
    sources: [
      { title: 'What Are Perpetual Futures and Quarterly Futures', url: 'https://www.binance.com/en/support/faq/what-are-perpetual-futures-and-quarterly-futures-d2a1afd5f829455c9ded23f0ca561a40', note: 'Binance Support, tiếng Anh' },
      { title: 'What Are USDⓈ-Margined Futures and COIN-Margined Futures?', url: 'https://www.binance.com/en/support/faq/detail/85eac2bba0b342819122dc9bd4745e9b', note: 'Binance Support, tiếng Anh' },
      { title: 'Binance Futures to Launch Multi-Currency Quarterly 0326 Delivery Contracts', url: 'https://panews.io/articles/01a0b392-7d2d-70a1-a8a4-deea7dcbb0a7', note: 'PANews, 2026, tiếng Anh: sau khi hợp đồng quý 0925 đáo hạn, Binance mở hợp đồng quý 0326 USDⓈ-M (BTCUSDT, ETHUSDT) và COIN-M' },
      { title: 'Introduction to Binance Futures Funding Rates', url: 'https://www.binance.com/en/support/faq/detail/360033525031', note: 'Binance Support, tiếng Anh (funding chuyển trực tiếp giữa người chơi, sàn không thu phí)' },
      { title: 'Understand the Risks of Virtual Currency Trading', url: 'https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html', note: 'CFTC, Customer Advisory, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c5-b2': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Đòn bẩy thật khác con số trên thanh trượt; ký quỹ ban đầu và duy trì; cross và isolated; bậc ký quỹ; vì sao đòn bẩy chỉ tăng tốc độ chứ không tăng lợi thế.',
    goals: [
      'Tính đúng đòn bẩy thật của tài khoản thay vì nhìn con số trên thanh trượt',
      'Tính ký quỹ ban đầu, ký quỹ duy trì theo bậc bằng công thức chính thức của Binance',
      'Chọn isolated làm mặc định và hiểu vì sao cross có thể kéo cả ví xuống'
    ],
    blocks: [
      { type: 'h', text: 'Đòn bẩy trên thanh trượt không phải đòn bẩy thật' },
      { type: 'p', text: 'Trên giao diện futures có một thanh trượt đòn bẩy (leverage) từ 1x đến 100x hoặc hơn. Nhiều người nghĩ chọn 20x nghĩa là mình đang "chơi đòn bẩy 20 lần". Không hẳn. Con số trên thanh trượt chỉ quyết định <strong>bạn phải khóa bao nhiêu tiền làm ký quỹ</strong> cho một vị thế. Nó không nói gì về mức rủi ro của cả tài khoản.' },
      { type: 'formula', title: 'Hai loại đòn bẩy', expr: 'Ký quỹ ban đầu = Giá trị danh nghĩa ÷ Đòn bẩy thanh trượt. Đòn bẩy thật = Tổng giá trị danh nghĩa các vị thế ÷ Tổng vốn tài khoản', vars: [['Giá trị danh nghĩa', 'Khối lượng × giá, quy mô thật của vị thế'], ['Đòn bẩy thanh trượt', 'Con số bạn chọn trên giao diện, quyết định ký quỹ bị khóa'], ['Tổng vốn tài khoản', 'Toàn bộ số dư ví futures (và nên tính cả tiền bạn dành cho giao dịch)']], note: 'Rủi ro của bạn đến từ đòn bẩy thật và khoảng cách dừng lỗ, không đến từ thanh trượt.' },
      { type: 'calc', title: 'Tài khoản 1.000 USDT, thanh trượt 20x (giả định)', rows: [
        ['Mở vị thế danh nghĩa', '500 USDT (ví dụ 0,00625 BTC ở giá 80.000)'],
        ['Ký quỹ ban đầu bị khóa', '500 ÷ 20 = 25 USDT'],
        ['Đòn bẩy thật', '500 ÷ 1.000 = 0,5x'],
        ['Giá đi ngược 4%', 'Lỗ 500 × 4% = 20 USDT = 2% tài khoản']
      ], result: 'Thanh trượt ghi 20x nhưng tài khoản chỉ gánh 0,5x. Rủi ro thấp hơn cả mua spot bằng toàn bộ vốn.' },
      { type: 'calc', title: 'Ngược lại: thanh trượt 5x nhưng đòn bẩy thật cũng 5x', rows: [
        ['Mở vị thế danh nghĩa', '5.000 USDT'],
        ['Ký quỹ ban đầu', '5.000 ÷ 5 = 1.000 USDT, tức toàn bộ tài khoản'],
        ['Đòn bẩy thật', '5.000 ÷ 1.000 = 5x'],
        ['Giá đi ngược 4%', 'Lỗ 5.000 × 4% = 200 USDT = 20% tài khoản']
      ], result: 'Thanh trượt "chỉ 5x" nhưng một nhịp 4% đã lấy đi 20% tài khoản. Con số nhỏ trên thanh trượt không làm bạn an toàn.' },
      { type: 'p', text: 'Bài học: <strong>thứ quyết định bạn mất bao nhiêu là khối lượng vị thế nhân với khoảng cách dừng lỗ</strong>. Hãy tính khối lượng từ số tiền rủi ro trước (ví dụ 1% tài khoản), sau đó mới chọn thanh trượt đủ để có ký quỹ. Công cụ dưới đây làm đúng việc đó.' },
      { type: 'tool', name: 'position-size', note: 'Nhập tài khoản 1.000 USDT, rủi ro 1%, giá vào 80.000, dừng lỗ 78.400. Khối lượng ra khoảng 0,00625 BTC, tức 500 USDT danh nghĩa, đòn bẩy thật 0,5x.' },
      { type: 'h', text: 'Ký quỹ ban đầu và ký quỹ duy trì' },
      { type: 'list', items: [
        '<strong>Ký quỹ ban đầu (initial margin)</strong>: số tiền phải có để mở vị thế, bằng giá trị danh nghĩa chia đòn bẩy bạn chọn.',
        '<strong>Ký quỹ duy trì (maintenance margin)</strong>: mức tối thiểu phải còn lại để giữ vị thế. Khi tài sản ký quỹ của vị thế tụt dưới mức này, vị thế bị thanh lý (bài 5.3).',
        'Theo Binance, ký quỹ duy trì <strong>luôn được tính cùng một cách dù bạn chọn đòn bẩy nào</strong>. Nó chỉ phụ thuộc giá trị danh nghĩa và bậc của vị thế.'
      ] },
      { type: 'formula', title: 'Ký quỹ duy trì (Binance USDⓈ-M)', expr: 'Ký quỹ duy trì = Giá trị danh nghĩa × Tỷ lệ ký quỹ duy trì (MMR) của bậc − Số tiền duy trì (maintenance amount) của bậc', vars: [['MMR', 'Maintenance Margin Rate, tăng dần theo bậc quy mô vị thế'], ['Maintenance amount', 'Khoản trừ cố định của từng bậc, giúp công thức liền mạch khi vị thế chuyển bậc']] },
      { type: 'calc', title: 'Ví dụ chính thức của Binance', rows: [
        ['Vị thế', '10 BTC × 26.000 = 260.000 USDT danh nghĩa'],
        ['Bậc áp dụng', 'Bậc 3: MMR 1%, maintenance amount 1.300 USDT'],
        ['Ký quỹ duy trì', '260.000 × 1% − 1.300 = 2.600 − 1.300 = 1.300 USDT']
      ], result: 'Vị thế 260.000 USDT cần giữ tối thiểu 1.300 USDT ký quỹ. Tụt dưới mức này là bị thanh lý.' },
      { type: 'h', text: 'Bậc ký quỹ: vị thế càng lớn, đòn bẩy tối đa càng thấp' },
      { type: 'p', text: 'Binance chia vị thế theo bậc giá trị danh nghĩa (margin tiers). Bậc càng cao thì MMR càng lớn và <strong>đòn bẩy tối đa được phép càng thấp</strong>. Lý do: vị thế lớn khó đóng hơn khi thị trường sập, nên sàn đòi đệm an toàn dày hơn. Bảng bậc cụ thể của từng hợp đồng nằm ở trang Leverage & Margin của sàn và có thể được sàn điều chỉnh khi thị trường biến động mạnh, nên hãy tra trực tiếp thay vì nhớ số.' },
      { type: 'callout', tone: 'tip', title: 'Hàm ý cho tài khoản nhỏ', text: 'Tài khoản vài nghìn USDT gần như luôn nằm ở bậc thấp nhất, nơi đòn bẩy tối đa rất cao. Việc sàn cho phép 100x không có nghĩa bạn nên dùng. Nó chỉ có nghĩa sàn cho phép bạn tự hại mình nhanh hơn.' },
      { type: 'h', text: 'Cross và isolated: một lệnh thua có thể kéo cả ví' },
      { type: 'table', head: ['', 'Isolated (ký quỹ cô lập)', 'Cross (ký quỹ chéo)'], rows: [
        ['Tiền chịu rủi ro', 'Chỉ số ký quỹ đã gán cho vị thế đó', 'Toàn bộ số dư ví futures'],
        ['Khi bị thanh lý', 'Mất phần ký quỹ của vị thế, phần còn lại của ví an toàn', 'Có thể mất gần như cả ví'],
        ['Giá thanh lý', 'Gần giá vào hơn (nếu ký quỹ ít)', 'Xa hơn, vì cả ví đứng sau, và thay đổi theo lãi lỗ các vị thế khác'],
        ['Khi bị thanh lý, lệnh chờ bị hủy', 'Các lệnh chờ cùng token', 'Tất cả lệnh chờ']
      ] },
      { type: 'calc', title: 'Long 1 ETH ở 3.000, thanh trượt 10x, ví 1.000 USDT (giả định MMR 0,5%, bỏ qua phí)', rows: [
        ['Isolated: ký quỹ gán cho vị thế', '3.000 ÷ 10 = 300 USDT'],
        ['Isolated: giá thanh lý gần đúng', '3.000 × (1 − 0,1 + 0,005) = 2.715 USDT'],
        ['Isolated: mất tối đa', 'Khoảng 300 USDT (30% ví), 700 USDT còn lại không bị đụng'],
        ['Cross: cả 1.000 USDT đứng sau vị thế', 'Thanh lý khi 1.000 − (3.000 − P) ≈ 0,5% × P'],
        ['Cross: giá thanh lý', 'P ≈ 2.000 ÷ 0,995 ≈ 2.010 USDT'],
        ['Cross: mất tối đa', '3.000 − 2.010 ≈ 990 USDT, tức gần 99% ví']
      ], result: 'Cross cho vị thế "sống lâu hơn" nhưng cái giá là toàn bộ ví. Một lệnh không có dừng lỗ ở cross có thể xóa sổ tài khoản.' },
      { type: 'callout', tone: 'risk', title: 'Cross và nhiều vị thế', text: 'Ở cross, lỗ của một vị thế ăn vào ký quỹ chung, kéo giá thanh lý của các vị thế khác lại gần. Trong đợt sập ngày 10/10/2025, CoinGecko mô tả hệ thống cross margin khuếch đại dây chuyền: lỗ ở một vị thế làm giảm tài sản thế chấp của mọi vị thế. Quy tắc của khóa học: dùng isolated mặc định, và luôn đặt dừng lỗ. Chỉ cân nhắc cross khi bạn thật sự hiểu và có lý do cụ thể (ví dụ phòng hộ), không bao giờ vì "muốn giá thanh lý xa hơn".' },
      { type: 'p', text: 'Lưu ý quan trọng: isolated không thay thế dừng lỗ. Nếu cả hai trường hợp trên đều có dừng lỗ ở 2.850 (−5%), bạn chỉ mất 150 USDT cộng phí dù chọn cross hay isolated. Isolated là lưới an toàn cuối cùng, dừng lỗ mới là kế hoạch.' },
      { type: 'h', text: 'Đòn bẩy chỉ tăng tốc độ, không tăng lợi thế' },
      { type: 'p', text: 'Nếu phương pháp của bạn có kỳ vọng âm, đòn bẩy làm bạn mất tiền nhanh hơn. Nếu kỳ vọng dương, đòn bẩy cao làm biến động tài khoản lớn đến mức một chuỗi thua bình thường cũng có thể xóa sổ bạn trước khi lợi thế kịp phát huy. Đòn bẩy không thay đổi tỷ lệ thắng, không thay đổi R:R. Nó chỉ phóng to mọi thứ, kể cả phí.' },
      { type: 'calc', title: 'Phí phóng to theo đòn bẩy thật (tài khoản 1.000 USDT, taker 0,05% mỗi lượt)', rows: [
        ['Đòn bẩy thật 1x: danh nghĩa 1.000', 'Phí khứ hồi 1.000 × 0,1% = 1 USDT = 0,1% tài khoản'],
        ['Đòn bẩy thật 20x: danh nghĩa 20.000', 'Phí khứ hồi 20.000 × 0,1% = 20 USDT = 2% tài khoản'],
        ['20x, giao dịch 10 lệnh', 'Mất 200 USDT = 20% tài khoản chỉ vì phí, chưa tính lỗ']
      ], result: 'Ở đòn bẩy thật cao, phí một lệnh đã lớn hơn cả mức rủi ro 1% hợp lý của một lệnh.' },
      { type: 'figure', name: 'equity-curves', caption: 'Cùng một chuỗi lệnh, rủi ro mỗi lệnh càng lớn thì đường vốn càng dao động và càng dễ về gần 0. Đòn bẩy thật cao chính là rủi ro lớn mỗi lệnh.' },
      { type: 'scenario', title: 'Chọn đòn bẩy cho lệnh long BTC', setup: 'Tài khoản 1.000 USDT. Giả định BTC 80.000, điểm vô hiệu của setup ở 78.400 (cách 2%).', bad: 'Kéo thanh trượt lên 50x "vì ký quỹ ít", dùng 500 USDT ký quỹ mở vị thế 25.000 USDT ở cross. Đòn bẩy thật 25x. Giá chạm dừng lỗ 78.400 là lỗ 25.000 × 2% = 500 USDT (50% tài khoản) cộng khoảng 25 USDT phí. Không đặt dừng lỗ thì cả ví 1.000 USDT đứng sau vị thế, giá thanh lý gần đúng khoảng 80.000 × (1 − 1.000/25.000 + 0,004) = 77.120, cách giá vào chỉ 3,6%.', good: 'Rủi ro 1% = 10 USDT. Khối lượng = 10 ÷ 1.600 = 0,00625 BTC (500 USDT danh nghĩa). Chọn isolated, thanh trượt 5x, ký quỹ 100 USDT, giá thanh lý gần đúng 64.320, cách xa dừng lỗ. Đòn bẩy thật 0,5x. Sai thì mất khoảng 10 USDT cộng phí dưới 1 USDT.' }
    ],
    keyPoints: [
      'Thanh trượt chỉ quyết định ký quỹ bị khóa; đòn bẩy thật = tổng danh nghĩa ÷ vốn tài khoản.',
      'Tính khối lượng từ số tiền rủi ro và khoảng dừng lỗ trước, chọn thanh trượt sau.',
      'Ký quỹ duy trì = danh nghĩa × MMR − maintenance amount, không phụ thuộc đòn bẩy bạn chọn.',
      'Vị thế càng lớn thì MMR càng cao, đòn bẩy tối đa càng thấp.',
      'Isolated là mặc định; cross có thể mất gần cả ví khi một lệnh không có dừng lỗ.',
      'Đòn bẩy không tăng lợi thế, chỉ tăng tốc độ thắng thua và phóng to phí.'
    ],
    practice: [
      'Mở ví futures (hoặc Demo Trading), cộng giá trị danh nghĩa mọi vị thế đang mở rồi chia cho tổng số dư. Ghi con số đòn bẩy thật lên giấy dán cạnh màn hình.',
      'Trên Demo Trading, mở cùng một vị thế 1 ETH hai lần: một lần isolated 10x, một lần cross. So sánh giá thanh lý mà sàn hiển thị với phép tính trong bài.',
      'Tìm trang Leverage & Margin của BTCUSDT trên sàn, chép lại MMR và maintenance amount của bậc 1 đến bậc 3, rồi tự tính ký quỹ duy trì cho vị thế 50.000 USDT.'
    ],
    quiz: [
      { q: 'Tài khoản 2.000 USDT. Bạn mở một vị thế danh nghĩa 1.000 USDT với thanh trượt 25x. Đòn bẩy thật và ký quỹ ban đầu là?', options: ['25x và 1.000 USDT', '25x và 40 USDT', '0,5x và 80 USDT', '0,5x và 40 USDT'], answer: 3, explain: 'Ký quỹ = 1.000 ÷ 25 = 40 USDT. Đòn bẩy thật = 1.000 ÷ 2.000 = 0,5x. 25x chỉ là con số thanh trượt; 80 USDT là chia nhầm cho 12,5.' },
      { q: 'Theo ví dụ chính thức của Binance, vị thế 260.000 USDT ở bậc 3 (MMR 1%, maintenance amount 1.300) cần ký quỹ duy trì bao nhiêu?', options: ['2.600 USDT', '3.900 USDT', '1.300 USDT', '260 USDT'], answer: 2, explain: '260.000 × 1% − 1.300 = 1.300. 2.600 là quên trừ maintenance amount; 3.900 là cộng thay vì trừ; 260 là dùng nhầm 0,1%.' },
      { q: 'Ví 1.000 USDT, bạn long 1 ETH ở 3.000 không đặt dừng lỗ. Nếu ETH sập mạnh, chế độ nào có thể làm bạn mất gần cả ví?', options: ['Cross', 'Isolated 10x', 'Isolated 2x', 'Cả hai chế độ đều chỉ mất ký quỹ ban đầu'], answer: 0, explain: 'Ở cross toàn bộ số dư ví đứng sau vị thế, giá thanh lý bị đẩy xa (khoảng 2.010) và bạn mất gần 990 USDT. Isolated 10x chỉ mất khoảng 300 USDT. Isolated 2x có ký quỹ 1.500, vượt quá số dư 1.000 nên không mở được đúng khối lượng này.' },
      { q: 'Tài khoản 1.000 USDT, đòn bẩy thật 20x, phí taker 0,05% mỗi lượt. Phí khứ hồi một lệnh chiếm bao nhiêu % tài khoản?', options: ['0,1%', '2%', '1%', '0,05%'], answer: 1, explain: 'Danh nghĩa 20.000 USDT, phí khứ hồi 20.000 × 0,1% = 20 USDT = 2% tài khoản. 0,1% là phí tính trên danh nghĩa, chưa quy về tài khoản; 1% chỉ tính một chiều; 0,05% là tỷ lệ phí một lượt.' }
    ],
    sources: [
      { title: 'Leverage and Margin of USDⓈ-M Futures', url: 'https://www.binance.com/en/support/faq/detail/360033162192', note: 'Binance Support, tiếng Anh (vị thế lớn hơn thì đòn bẩy tối đa thấp hơn)' },
      { title: 'How to Calculate Liquidation Price of USDⓈ-M Futures Contracts', url: 'https://www.binance.com/en/support/faq/detail/b3c689c1f50a44cabb3a84e663b81d93', note: 'Binance Support, tiếng Anh (ví dụ 260.000 USDT, bậc 3)' },
      { title: 'Liquidation Protocols', url: 'https://www.binance.com/en/support/faq/detail/360033525271', note: 'Binance Support, tiếng Anh (lệnh chờ bị hủy khi thanh lý ở cross và isolated)' },
      { title: 'October 10 Crypto Crash Explained', url: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained', note: 'CoinGecko Learn, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c5-b3': {
    duration: 11,
    level: 'Nâng cao',
    summary: 'Mark, last và index price; công thức giá thanh lý; margin ratio; giá phá sản; quỹ bảo hiểm và ADL. Quy tắc: dừng lỗ phải kích hoạt rất lâu trước thanh lý.',
    goals: [
      'Phân biệt mark price, last price, index price và biết cái nào kích hoạt thanh lý',
      'Tự tính giá thanh lý gần đúng của vị thế isolated và kiểm tra khoảng cách tới dừng lỗ',
      'Hiểu chuỗi thanh lý → quỹ bảo hiểm → ADL và chọn đòn bẩy sao cho không bao giờ bị thanh lý'
    ],
    blocks: [
      { type: 'h', text: 'Ba loại giá: last, mark và index' },
      { type: 'table', head: ['Loại giá', 'Là gì', 'Dùng để làm gì'], rows: [
        ['Last price (giá khớp gần nhất)', 'Giá giao dịch gần nhất của chính hợp đồng trên sàn', 'Khớp lệnh thật, tính PnL đã chốt (realized)'],
        ['Index price (giá chỉ số)', 'Trung bình có trọng số giá giao ngay trên nhiều sàn lớn (Binance, OKX, Coinbase, Kraken, Bybit...)', 'Làm mốc giá giao ngay, đầu vào của mark price và funding'],
        ['Mark price (giá đánh dấu)', 'Giá hợp lý ước tính, kết hợp index, funding và sổ lệnh', '<strong>Kích hoạt thanh lý</strong> và tính PnL chưa chốt (unrealized)']
      ] },
      { type: 'analogy', text: 'Binance tự ví von: mark price giống giá xăng trung bình cả nước, còn last price là giá ở cây xăng gần nhà bạn. Một cây xăng có thể bán đắt bất thường trong vài phút, nhưng giá trung bình cả nước thì không nhảy theo.' },
      { type: 'p', text: 'Mục đích của mark price là <strong>tránh thanh lý oan</strong> do một cú giật giá tức thời hoặc bị thao túng trên một sổ lệnh. Với index price, nếu giá ở một nguồn lệch quá 3% so với trung vị các nguồn thì bị giới hạn lại (với BTCUSDT và ETHUSDT ngưỡng là 1%).' },
      { type: 'formula', title: 'Mark price của Binance', expr: 'Mark Price = Trung vị (Giá 1, Giá 2, Giá hợp đồng)', vars: [['Giá 1', 'Price Index × (1 + Funding rate gần nhất × thời gian còn lại tới lần funding kế tiếp ÷ chu kỳ funding)'], ['Giá 2', 'Price Index + trung bình trượt 30 giây của (giá giữa bid1/ask1 − Price Index)'], ['Giá hợp đồng', 'Last price của hợp đồng']], note: 'Lấy trung vị của ba giá nên một giá bất thường đơn lẻ không kéo được mark price.' },
      { type: 'callout', tone: 'warn', title: 'Râu nến không phải lúc nào cũng an toàn', text: 'Mark price chống được râu nến trên một sàn, nhưng khi cả thị trường cùng sập thì mark price cũng sập theo. Râu nến dài quét qua các cụm giá thanh lý là chuyện thường gặp trong crypto. Đừng nghĩ "mark price sẽ cứu mình".' },
      { type: 'h', text: 'Khi nào bị thanh lý và công thức giá thanh lý' },
      { type: 'p', text: 'Binance thanh lý khi: <strong>Tài sản ký quỹ = Ký quỹ ban đầu + PnL đã chốt + PnL chưa chốt &lt; Ký quỹ duy trì</strong>. PnL chưa chốt tính theo mark price. Nói cách khác, khi lỗ ăn gần hết ký quỹ, chỉ còn lại mức duy trì, sàn sẽ đóng vị thế.' },
      { type: 'formula', title: 'Giá thanh lý gần đúng (isolated, bỏ qua phí và maintenance amount)', expr: 'Long: Giá thanh lý ≈ Giá vào × (1 − 1/Đòn bẩy + MMR). Short: Giá thanh lý ≈ Giá vào × (1 + 1/Đòn bẩy − MMR)', vars: [['Đòn bẩy', 'Đòn bẩy trên thanh trượt của vị thế isolated (ký quỹ = danh nghĩa ÷ đòn bẩy)'], ['MMR', 'Tỷ lệ ký quỹ duy trì của bậc']], note: 'Khoảng cách tới thanh lý ≈ 1/Đòn bẩy − MMR. Đây là công thức gần đúng dễ nhớ. Giá thật trên sàn lệch một chút vì phí, maintenance amount và việc ký quỹ duy trì tính theo mark price tại thời điểm thanh lý.' },
      { type: 'formula', title: 'Dạng chính xác hơn cho một vị thế isolated (bỏ qua phí)', expr: 'Long: Giá thanh lý = (Khối lượng × Giá vào − Ký quỹ − Maintenance amount) ÷ [Khối lượng × (1 − MMR)]. Short: Giá thanh lý = (Khối lượng × Giá vào + Ký quỹ + Maintenance amount) ÷ [Khối lượng × (1 + MMR)]', vars: [['Ký quỹ', 'Số ký quỹ đã gán cho vị thế isolated'], ['Maintenance amount', 'Khoản trừ của bậc, bằng 0 ở bậc thấp nhất']], note: 'Rút ra từ điều kiện thanh lý: Ký quỹ + PnL chưa chốt = Danh nghĩa tại giá thanh lý × MMR − Maintenance amount. Đây chính là công thức isolated của Binance khi chỉ có một vị thế.' },
      { type: 'calc', title: 'Long 0,1 BTC ở 80.000, isolated 10x, MMR 0,4% (giả định)', rows: [
        ['Ký quỹ', '8.000 ÷ 10 = 800 USDT'],
        ['Công thức gần đúng', '80.000 × (1 − 0,1 + 0,004) = 72.320'],
        ['Công thức chính xác hơn', '(0,1 × 80.000 − 800 − 0) ÷ (0,1 × 0,996) = 7.200 ÷ 0,0996 ≈ 72.289'],
        ['Giá phá sản (lỗ bằng đúng ký quỹ)', '80.000 × (1 − 0,1) = 72.000'],
        ['Khoảng cách từ giá vào tới thanh lý', 'Khoảng 9,6%']
      ], result: 'Chênh lệch giữa hai công thức chỉ khoảng 31 USDT. Dùng công thức gần đúng để ước lượng nhanh, luôn đối chiếu với giá thanh lý sàn hiển thị.' },
      { type: 'figure', name: 'leverage-liquidation', caption: 'Đòn bẩy càng cao, giá thanh lý càng sát giá vào. Ở 50x và 100x, một dao động bình thường trong ngày đã đủ thanh lý.' },
      { type: 'table', head: ['Đòn bẩy (isolated)', 'Long: giá thanh lý', 'Short: giá thanh lý', 'Khoảng cách'], rows: [
        ['2x', '40.320', '119.680', '49,6%'],
        ['3x', '≈ 53.653', '≈ 106.347', '≈ 32,9%'],
        ['5x', '64.320', '95.680', '19,6%'],
        ['10x', '72.320', '87.680', '9,6%'],
        ['20x', '76.320', '83.680', '4,6%'],
        ['50x', '78.720', '81.280', '1,6%'],
        ['100x', '79.520', '80.480', '0,6%']
      ] },
      { type: 'p', text: 'Bảng trên tính bằng công thức gần đúng, giá vào giả định 80.000, MMR giả định 0,4% cho mọi mức (thực tế MMR phụ thuộc bậc). BTC dao động 1–2% trong vài giờ là rất bình thường. Ở 50x, bạn bị thanh lý chỉ sau một nhịp như vậy.' },
      { type: 'tool', name: 'liquidation', note: 'Thử nhập giá vào 80.000, đòn bẩy 20x, MMR 0,4% cho cả long và short. Sau đó đổi đòn bẩy và quan sát khoảng cách thay đổi.' },
      { type: 'h', text: 'Margin ratio và vì sao giá thanh lý thực tế có thể tệ hơn' },
      { type: 'formula', title: 'Tỷ lệ ký quỹ (Margin Ratio) trên Binance', expr: 'Margin Ratio = Ký quỹ duy trì ÷ Số dư ký quỹ', vars: [['Số dư ký quỹ', 'Ký quỹ + PnL chưa chốt'], ['100%', 'Mức bị thanh lý']], note: 'Binance khuyến nghị giữ margin ratio dưới 80%.' },
      { type: 'calc', title: 'Margin ratio của vị thế long 0,1 BTC, ký quỹ 800 (giả định MMR 0,4%)', rows: [
        ['Mark 74.000', 'Số dư 800 − 600 = 200; duy trì 29,6; ratio 14,8%'],
        ['Mark 73.000', 'Số dư 100; duy trì 29,2; ratio 29,2%'],
        ['Mark 72.500', 'Số dư 50; duy trì 29; ratio 58%'],
        ['Mark 72.400', 'Số dư 40; duy trì 28,96; ratio 72,4%'],
        ['Mark khoảng 72.289', 'Ratio chạm 100%, bị thanh lý']
      ], result: 'Margin ratio tăng chậm lúc đầu rồi vọt lên ở đoạn cuối. Khi nó vượt 50%, bạn gần như không còn thời gian phản ứng.' },
      { type: 'p', text: 'Giá thanh lý hiển thị không phải lời hứa. Binance đưa ví dụ: một vị thế short BTC có giá thanh lý tính ra là 17.006, nhưng trong biến động cực mạnh mark price nhảy từ 17.000 lên 17.100 trong một giây, và vị thế bị thanh lý ở 17.100. Khi bị thanh lý, toàn bộ lệnh chờ (cross: tất cả; isolated: cùng token) bị hủy ngay, và sàn khấu trừ phí thanh lý từ ký quỹ còn lại. Binance cũng lưu ý <strong>vị thế nhỏ dễ bị thanh lý toàn bộ hơn</strong> vị thế lớn.' },
      { type: 'callout', tone: 'risk', title: 'Thanh lý gần như luôn mất trọn ký quỹ', text: 'Giữa giá thanh lý (72.289) và giá phá sản (72.000) chỉ còn một khoản đệm nhỏ, dùng để trả phí thanh lý và đóng vị thế. Đừng hy vọng được trả lại phần dư. Hãy coi bị thanh lý nghĩa là mất 100% số ký quỹ của vị thế.' },
      { type: 'h', text: 'Giá phá sản, quỹ bảo hiểm và ADL' },
      { type: 'steps', items: [
        { title: 'Thanh lý', text: 'Mark price chạm giá thanh lý, hệ thống tiếp quản và đóng vị thế trên thị trường.' },
        { title: 'Giá phá sản (bankruptcy price)', text: 'Giá mà tại đó lỗ bằng toàn bộ ký quỹ, số dư ký quỹ về 0. Nếu vị thế được đóng tốt hơn giá này, phần chênh đi vào quỹ bảo hiểm.' },
        { title: 'Quỹ bảo hiểm (insurance fund)', text: 'Nếu thị trường quá xấu, vị thế chỉ đóng được ở giá tệ hơn giá phá sản, quỹ bảo hiểm bù phần thiếu để bên thắng vẫn được trả đủ.' },
        { title: 'Tự động giảm đòn bẩy (ADL)', text: 'Bước cuối, chỉ xảy ra khi quỹ bảo hiểm không tiếp nhận được vị thế phá sản. Hệ thống đóng bớt vị thế đang lãi của người khác ở bên đối diện, tại giá phá sản của lệnh bị thanh lý, không tính phí giao dịch.' }
      ] },
      { type: 'formula', title: 'Thứ hạng ưu tiên ADL (Binance)', expr: 'Nếu % PnL ≥ 0: Hạng = % PnL × Đòn bẩy hiệu dụng. Nếu % PnL < 0: Hạng = % PnL ÷ Đòn bẩy hiệu dụng', vars: [['% PnL', 'Lãi chưa chốt ÷ |Giá trị danh nghĩa|'], ['Đòn bẩy hiệu dụng', '|Giá trị danh nghĩa| ÷ (Số dư tài khoản + Lãi chưa chốt)']], note: 'Hạng càng cao càng bị ADL trước. Người lãi nhiều và dùng đòn bẩy hiệu dụng cao đứng đầu hàng.' },
      { type: 'calc', title: 'Hai người cùng short lãi (giả định)', rows: [
        ['A: danh nghĩa 10.000, lãi 2.000, số dư 1.000', '% PnL = 20%; đòn bẩy hiệu dụng = 10.000 ÷ 3.000 ≈ 3,33; hạng ≈ 0,67'],
        ['B: danh nghĩa 10.000, lãi 2.000, số dư 9.000', '% PnL = 20%; đòn bẩy hiệu dụng = 10.000 ÷ 11.000 ≈ 0,91; hạng ≈ 0,18']
      ], result: 'A bị ADL trước B dù lãi bằng nhau, chỉ vì dùng đòn bẩy hiệu dụng cao hơn.' },
      { type: 'p', text: 'ADL là lý do bạn có thể bị đóng lệnh đang lãi mà không làm gì sai. Hợp đồng COIN-M dễ bị ADL hơn USDⓈ-M vì quỹ bảo hiểm dùng chung theo tài sản ký quỹ nên nhỏ hơn. Trong đợt sập 10/10/2025, CoinGecko mô tả các vị thế trung lập delta (long và short cùng lượng) bị vỡ vì chân short đang lãi bị đóng qua ADL, khiến lỗ của chân long không còn được bù.' },
      { type: 'h', text: 'Quy tắc: dừng lỗ phải kích hoạt rất lâu trước thanh lý' },
      { type: 'p', text: 'Thanh lý là thất bại của quản trị rủi ro, không phải một kịch bản trong kế hoạch. Dừng lỗ của bạn nằm ở điểm vô hiệu của ý tưởng (bài 5.7). Giá thanh lý phải nằm <strong>xa hơn dừng lỗ nhiều lần</strong>, để kể cả khi dừng lỗ bị trượt giá hoặc giá giật mạnh, bạn vẫn thoát trước khi bị sàn tiếp quản.' },
      { type: 'calc', title: 'Long BTC ở 80.000, dừng lỗ 78.400 (cách 2%), MMR 0,4% (giả định)', rows: [
        ['10x: giá thanh lý', '72.320, cách 9,6%, xa gấp khoảng 4,8 lần dừng lỗ'],
        ['20x: giá thanh lý', '76.320, cách 4,6%, chỉ gấp 2,3 lần'],
        ['50x: giá thanh lý', '78.720, nằm TRÊN dừng lỗ 78.400: bị thanh lý trước khi dừng lỗ kịp chạy'],
        ['Đòn bẩy tối đa để thanh lý xa ≥ 3 lần dừng lỗ', '1 ÷ (3 × 2% + 0,4%) = 1 ÷ 0,064 ≈ 15,6 → không quá 15x; bộ chuẩn bài 5.9 còn giới hạn thanh trượt tối đa 5x–10x']
      ], result: 'Với dừng lỗ 2%, đòn bẩy thanh trượt trên 15x đã vi phạm quy tắc. Nếu khối lượng tính theo rủi ro 1% thì thanh trượt 2–5x là đủ ký quỹ.' },
      { type: 'formula', title: 'Đòn bẩy thanh trượt tối đa theo quy tắc', expr: 'Đòn bẩy tối đa ≈ 1 ÷ (k × Khoảng dừng lỗ % + MMR)', vars: [['k', 'Bội số an toàn, ít nhất 3 (thanh lý cách giá vào ít nhất 3 lần khoảng dừng lỗ)'], ['Khoảng dừng lỗ %', 'Khoảng cách từ giá vào tới dừng lỗ, dạng thập phân']] },
      { type: 'scenario', title: 'Giá quét xuống nhanh trong đêm', setup: 'Long 0,1 BTC ở 80.000 (giả định). Cụm thanh lý lớn nằm quanh 78.500. Tin xấu ra lúc 1 giờ sáng.', bad: 'Dùng 50x isolated, ký quỹ 160 USDT, không đặt dừng lỗ vì "giá thanh lý đã là dừng lỗ rồi". Giá quét xuống 78.300 trong vài giây rồi hồi lên 80.500. Vị thế bị thanh lý ở khoảng 78.720, mất trọn 160 USDT cộng phí thanh lý, nhìn giá hồi mà không còn vị thế.', good: 'Khối lượng tính theo rủi ro 1% (bài 5.2), isolated 5x, giá thanh lý khoảng 64.320. Dừng lỗ Stop-Market ở điểm vô hiệu có đệm dưới cụm thanh lý. Nếu dừng lỗ chạy thì mất khoảng 1% tài khoản như kế hoạch; nếu không chạm thì vẫn còn vị thế khi giá hồi. Cả hai trường hợp đều không có thanh lý.' },
      { type: 'checklist', title: 'Trước mỗi lệnh futures', items: [
        'Đã chọn isolated',
        'Đã tính giá thanh lý và nó xa hơn dừng lỗ ít nhất 3 lần',
        'Dừng lỗ là Stop-Market, đặt ngay khi vào lệnh',
        'Margin ratio tính tại giá dừng lỗ không quá 30% (vị thế thỏa quy tắc 3 lần với dừng lỗ từ 0,5% trở lên luôn dưới mức này; ví dụ 10x, dừng lỗ 78.400: 31,36 ÷ 640 ≈ 4,9%). Mức 80% Binance khuyến nghị là ngưỡng báo động, không phải mục tiêu'
      ] }
    ],
    keyPoints: [
      'Thanh lý kích hoạt theo mark price (trung vị của ba giá), không theo last price.',
      'Khoảng cách tới thanh lý isolated ≈ 1/Đòn bẩy − MMR; ở 50x chỉ còn khoảng 1,6%.',
      'Giá thanh lý hiển thị có thể bị vượt trong biến động mạnh (ví dụ 17.006 thành 17.100).',
      'Chuỗi xử lý: thanh lý → giá phá sản → quỹ bảo hiểm → ADL; ADL ưu tiên người lãi nhiều, đòn bẩy cao.',
      'Coi bị thanh lý là mất 100% ký quỹ của vị thế.',
      'Giá thanh lý phải xa hơn dừng lỗ ít nhất 3 lần; đòn bẩy tối đa ≈ 1 ÷ (3 × khoảng dừng lỗ + MMR).'
    ],
    practice: [
      'Trên Demo Trading, mở cùng một vị thế BTC ở 5x, 20x và 50x isolated. Chép giá thanh lý sàn hiển thị và so với bảng trong bài.',
      'Mở trang giá của BTCUSDT perpetual, tìm chỗ hiển thị mark price, last price và index price. Quan sát trong 10 phút xem chúng lệch nhau bao nhiêu.',
      'Với lệnh tiếp theo bạn định vào, tính khoảng dừng lỗ %, rồi dùng công thức 1 ÷ (3 × d + MMR) để ra đòn bẩy thanh trượt tối đa. Viết con số vào nhật ký giao dịch.'
    ],
    quiz: [
      { q: 'Long BTC ở 80.000, isolated 20x, MMR 0,4%. Giá thanh lý gần đúng là?', options: ['76.000', '76.320', '84.000', '72.320'], answer: 1, explain: '80.000 × (1 − 1/20 + 0,004) = 80.000 × 0,954 = 76.320. 76.000 là quên MMR (đó gần với giá phá sản); 72.320 là của 10x; 84.000 là hướng short và sai công thức.' },
      { q: 'Bạn long BTC ở 80.000 với dừng lỗ ở 78.400. Mức đòn bẩy isolated nào khiến bạn bị thanh lý TRƯỚC khi dừng lỗ kịp kích hoạt (MMR 0,4%)?', options: ['50x', '10x', '20x', '5x'], answer: 0, explain: 'Ở 50x giá thanh lý ≈ 80.000 × (1 − 0,02 + 0,004) = 78.720, nằm trên dừng lỗ 78.400, nên thanh lý xảy ra trước. 20x cho 76.320, 10x cho 72.320, 5x cho 64.320, đều nằm dưới dừng lỗ.' },
      { q: 'Trên BTCUSDT perpetual, last price bất ngờ giật xuống sâu trong một giây rồi hồi lại, trong khi giá ở các sàn khác gần như không đổi. Điều gì quyết định vị thế long của bạn có bị thanh lý không?', options: ['Last price', 'Giá mở cửa ngày', 'Mark price', 'Giá trung bình của bạn trong 24 giờ'], answer: 2, explain: 'Binance dùng mark price để kích hoạt thanh lý. Mark price là trung vị của ba giá có dùng index từ nhiều sàn, nên cú giật của last price trên một sổ lệnh thường không kéo được nó. Last price chỉ dùng cho khớp lệnh và PnL đã chốt.' },
      { q: 'Hai trader cùng short lãi 20% trên vị thế 10.000 USDT. A có số dư 1.000, B có số dư 9.000. Khi ADL xảy ra, ai bị đóng trước?', options: ['B, vì số dư lớn hơn', 'Cả hai cùng lúc vì lãi bằng nhau', 'Không ai, vì ADL chỉ đóng vị thế đang lỗ', 'A, vì đòn bẩy hiệu dụng cao hơn nên hạng ADL cao hơn'], answer: 3, explain: 'Hạng = % PnL × Đòn bẩy hiệu dụng. A: 20% × (10.000 ÷ 3.000) ≈ 0,67. B: 20% × (10.000 ÷ 11.000) ≈ 0,18. A đứng trước. ADL đóng vị thế đang lãi ở bên đối diện, không phải vị thế lỗ.' }
    ],
    sources: [
      { title: 'Liquidation Protocols', url: 'https://www.binance.com/en/support/faq/detail/360033525271', note: 'Binance Support, tiếng Anh (điều kiện thanh lý, margin ratio, ví dụ 17.000 → 17.100)' },
      { title: 'What Is Auto-Deleveraging (ADL) and How Does It Work?', url: 'https://www.binance.com/en/support/faq/detail/360033525471', note: 'Binance Support, tiếng Anh (thứ hạng ADL, giá phá sản)' },
      { title: 'What Are Mark Price and Price Index in USDⓈ-Margined Futures?', url: 'https://www.binance.com/en/support/faq/detail/360033525071', note: 'Binance Support, tiếng Anh' },
      { title: 'Mark Price vs. Last Price on Binance Futures – What is the Difference?', url: 'https://www.binance.com/en/blog/futures/5704082076024731087', note: 'Binance Blog, tiếng Anh' },
      { title: 'How to Calculate Liquidation Price of USDⓈ-M Futures Contracts', url: 'https://www.binance.com/en/support/faq/detail/b3c689c1f50a44cabb3a84e663b81d93', note: 'Binance Support, tiếng Anh' },
      { title: 'October 10 Crypto Crash Explained', url: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained', note: 'CoinGecko Learn, tiếng Anh (ADL đóng chân short của vị thế trung lập delta)' }
    ],
    updated: '2026-09'
  },

  'c5-b4': {
    duration: 9,
    level: 'Trung cấp',
    summary: 'Funding mỗi 8 giờ, công thức Binance, ai trả cho ai, chi phí giữ lệnh lâu; đọc open interest, tỷ lệ long/short, bản đồ thanh lý như bức tranh đám đông; vụ 10/10/2025.',
    goals: [
      'Tính được funding phải trả hoặc nhận cho một vị thế và chi phí giữ lệnh nhiều ngày',
      'Hiểu công thức funding của Binance và vì sao funding thường nằm ở 0,01%',
      'Đọc open interest, tỷ lệ long/short, bản đồ thanh lý như dữ liệu về đám đông, không phải tín hiệu mua bán'
    ],
    blocks: [
      { type: 'h', text: 'Funding là gì, ai trả cho ai' },
      { type: 'p', text: 'Hợp đồng vĩnh cửu không đáo hạn, nên giá của nó có thể trôi xa giá giao ngay. <strong>Funding</strong> là khoản thanh toán định kỳ giữa bên long và bên short để kéo giá hợp đồng về gần giá chỉ số. Binance không thu phí trên funding: tiền chuyển thẳng giữa những người giữ vị thế đối nghịch.' },
      { type: 'figure', name: 'funding-mechanism', caption: 'Giá perpetual cao hơn giá chỉ số thì funding dương, long trả short. Thấp hơn thì funding âm, short trả long.' },
      { type: 'list', items: [
        '<strong>Funding dương</strong>: bên long trả bên short. Thường xảy ra khi đám đông long nhiều, giá hợp đồng cao hơn giá giao ngay.',
        '<strong>Funding âm</strong>: bên short trả bên long.',
        'Chỉ trả hoặc nhận nếu bạn <strong>đang giữ vị thế đúng thời điểm tính funding</strong>. Đóng lệnh trước thời điểm đó thì không trả, không nhận.'
      ] },
      { type: 'table', head: ['Mốc funding mặc định', 'Giờ UTC', 'Giờ Việt Nam (UTC+7)'], rows: [
        ['Lần 1', '00:00', '07:00'],
        ['Lần 2', '08:00', '15:00'],
        ['Lần 3', '16:00', '23:00']
      ] },
      { type: 'p', text: 'Chu kỳ mặc định là 8 giờ nhưng sàn có thể đổi chu kỳ cho từng hợp đồng khi biến động mạnh. Luôn xem đồng hồ đếm ngược funding cạnh giá trên giao diện, đừng giả định.' },
      { type: 'h', text: 'Công thức funding của Binance' },
      { type: 'formula', title: 'Số tiền funding', expr: 'Số tiền funding = Giá trị danh nghĩa vị thế × Funding rate', vars: [['Giá trị danh nghĩa', 'Mark price × Khối lượng tại thời điểm tính'], ['Funding rate', 'Tỷ lệ của kỳ đó, dương hoặc âm']] },
      { type: 'formula', title: 'Funding rate', expr: 'F = [P + clamp(I − P, 0,05%, −0,05%)] ÷ (8 ÷ N)', vars: [['P', 'Premium Index trung bình có trọng số theo thời gian trong chu kỳ, đo độ lệch giữa giá hợp đồng (impact bid/ask) và Price Index'], ['I', 'Lãi suất, mặc định 0,03%/ngày tức 0,01% mỗi 8 giờ (một số cặp như ETHBTC là 0%)'], ['clamp', 'Kẹp giá trị trong khoảng −0,05% đến +0,05%'], ['N', 'Số giờ của chu kỳ funding (funding interval); với chu kỳ 8 giờ thì 8 ÷ N = 1 nên công thức rút gọn thành F = P + clamp(I − P, 0,05%, −0,05%)']], note: 'Công thức theo FAQ funding của Binance. Premium Index tức thời = [Max(0, Impact Bid − Price Index) − Max(0, Price Index − Impact Ask)] ÷ Price Index. Funding còn bị giới hạn trần/sàn theo từng hợp đồng.' },
      { type: 'calc', title: 'Vì sao funding thường đứng ở 0,01% (chu kỳ 8 giờ)', rows: [
        ['Ví dụ chính thức của Binance: P = 0,0429%', '0,0429% + clamp(0,01% − 0,0429%) = 0,0429% − 0,0329% = 0,0100%'],
        ['P = 0,02%', '0,02% + (−0,01%) = 0,01%'],
        ['P = 0,1% (long rất đông)', 'I − P = −0,09%, bị kẹp về −0,05% → F = 0,1% − 0,05% = 0,05%'],
        ['P = −0,08% (short rất đông)', 'I − P = 0,09%, bị kẹp về 0,05% → F = −0,08% + 0,05% = −0,03%']
      ], result: 'Khi P nằm trong khoảng −0,04% đến 0,06%, funding luôn bằng đúng 0,01%. Funding chỉ lệch khỏi 0,01% khi giá hợp đồng lệch đáng kể so với giá chỉ số, tức khi một phía đông bất thường.' },
      { type: 'h', text: 'Chi phí funding khi giữ lệnh lâu' },
      { type: 'p', text: 'Ở mỗi kỳ, funding nghe rất nhỏ. Nhưng có 3 kỳ mỗi ngày, và nó tính trên <strong>giá trị danh nghĩa</strong>, không phải trên ký quỹ. Giữ perpetual vài tuần có thể tốn nhiều hơn bạn nghĩ.' },
      { type: 'calc', title: 'Long 10.000 USDT danh nghĩa trong 30 ngày (giả định danh nghĩa và funding không đổi)', rows: [
        ['Funding 0,01% mỗi 8 giờ: mỗi kỳ', '10.000 × 0,01% = 1 USDT'],
        ['Mỗi ngày (3 kỳ)', '3 USDT'],
        ['30 ngày (90 kỳ)', '90 USDT = 0,9% danh nghĩa'],
        ['Funding 0,05% mỗi 8 giờ: mỗi kỳ', '10.000 × 0,05% = 5 USDT'],
        ['Mỗi ngày', '15 USDT'],
        ['30 ngày', '450 USDT = 4,5% danh nghĩa'],
        ['Nếu tài khoản chỉ có 1.000 USDT (đòn bẩy thật 10x)', '90 USDT = 9% tài khoản; 450 USDT = 45% tài khoản']
      ], result: 'Với funding 0,05%, giá phải tăng 4,5% trong 30 ngày chỉ để người long hòa vốn phần funding, chưa tính phí giao dịch.' },
      { type: 'tool', name: 'funding', note: 'Nhập danh nghĩa 10.000 USDT, funding 0,01% và 0,05%, số ngày 30 để kiểm tra lại bảng trên. Thử thêm funding âm để thấy phía short phải trả.' },
      { type: 'callout', tone: 'risk', title: 'Funding cao là chi phí thật', text: 'Khi thị trường hưng phấn, funding có thể nằm ở mức cao nhiều ngày liền. Người long giữ lệnh "chờ lên tiếp" bị trừ tiền đều đặn 3 lần mỗi ngày, trực tiếp vào số dư ký quỹ, làm giá thanh lý của vị thế cross dịch lại gần. Nếu định giữ lệnh nhiều ngày, hãy cộng chi phí funding dự kiến vào kế hoạch như một khoản lỗ chắc chắn.' },
      { type: 'calc', title: 'Quy funding về R khi lập kế hoạch (tài khoản 1.000 USDT, giả định)', rows: [
        ['Kế hoạch', 'Long BTC, rủi ro 1R = 10 USDT, khối lượng 0,00625 BTC (500 USDT danh nghĩa), dự kiến giữ 5 ngày'],
        ['Funding 0,01% mỗi 8 giờ', '500 × 0,01% × 3 × 5 = 0,75 USDT ≈ 0,075R'],
        ['Funding 0,05% mỗi 8 giờ', '500 × 0,05% × 3 × 5 = 3,75 USDT ≈ 0,375R'],
        ['Mục tiêu chốt lời 2R = 20 USDT', 'Với funding 0,05%, lãi thực chỉ còn khoảng 20 − 3,75 = 16,25 USDT, tức 1,625R, chưa trừ phí giao dịch']
      ], result: 'Khi khối lượng tính đúng theo rủi ro, funding thường nhỏ. Nó chỉ thành gánh nặng khi đòn bẩy thật cao hoặc giữ lệnh lâu trong lúc funding cực đoan. Nhưng hãy luôn quy nó về R để biết R:R thực.' },
      { type: 'p', text: 'Chiều ngược lại cũng đúng: khi funding âm, người short phải trả. Ví dụ short 10.000 USDT danh nghĩa với funding −0,03% mỗi 8 giờ thì mỗi kỳ trả 3 USDT, mỗi ngày 9 USDT. Funding âm sâu thường xuất hiện khi đám đông short quá đông, đúng lúc thị trường dễ bật ngược. Short trong bối cảnh này vừa trả tiền giữ lệnh, vừa có nguy cơ bị ép đóng (short squeeze, xem bài 5.11).' },
      { type: 'callout', tone: 'tip', title: 'Mẹo về giờ funding', text: 'Nếu bạn giao dịch trong ngày, biết rằng funding chỉ tính tại 07:00, 15:00, 23:00 giờ Việt Nam. Đừng mở lệnh chỉ để né hay ăn funding: số tiền quá nhỏ so với biến động giá quanh các mốc này.' },
      { type: 'h', text: 'Open interest: bao nhiêu tiền đang đặt cược' },
      { type: 'p', text: '<strong>Open interest (OI)</strong> là tổng số hợp đồng đang mở, chưa đóng. OI tăng khi có người mua mới và người bán mới cùng mở vị thế; giảm khi hai bên cùng đóng; đứng yên khi hợp đồng chỉ chuyển tay. OI khác volume: volume đếm mọi hợp đồng giao dịch trong kỳ, còn OI đếm số đang mở tại một thời điểm.' },
      { type: 'table', head: ['Giá', 'OI', 'Cách đọc (chỉ là giả thuyết)'], rows: [
        ['Tăng', 'Tăng', 'Có tiền mới vào vị thế long; xu hướng có thể được hỗ trợ, nhưng đòn bẩy cũng đang tích tụ'],
        ['Giảm', 'Tăng', 'Áp lực bán khống tăng; nếu giá đảo chiều thì short có thể bị ép đóng hàng loạt'],
        ['Tăng hoặc giảm', 'Giảm', 'Vị thế đang được đóng lại, có thể do chốt lời hoặc thanh lý']
      ] },
      { type: 'callout', tone: 'warn', title: 'OI không dự đoán hướng giá', text: 'Binance Academy nhấn mạnh OI tự nó không dự đoán hướng giá. Nó cho biết lượng đòn bẩy trong hệ thống. Dùng kèm funding để xem một phía có đang đông quá không.' },
      { type: 'h', text: 'Tỷ lệ long/short, bản đồ thanh lý và đám đông' },
      { type: 'list', items: [
        '<strong>Tỷ lệ long/short</strong> (Binance Futures → Data → Trading Data): cho biết tỷ lệ tài khoản hoặc vị thế đang long so với short. Tỷ lệ lệch hẳn một phía cho thấy đám đông nghiêng về một hướng.',
        '<strong>Bản đồ thanh lý (liquidation map/heatmap)</strong>: các trang dữ liệu bên thứ ba ước tính nơi tập trung nhiều giá thanh lý, dựa trên OI và giả định về đòn bẩy. Đây là ước tính, không phải dữ liệu thật của từng vị thế.',
        'Cách dùng đúng: xem đây là <strong>bức tranh đám đông và nơi có thể xảy ra biến động mạnh</strong>, không phải lệnh mua bán. Đám đông quá đông một phía, funding cao, OI tăng nhanh là thị trường "dễ vỡ", nên giảm khối lượng hoặc đứng ngoài.'
      ] },
      { type: 'example', title: 'Ngày 10/10/2025: thanh lý dây chuyền', text: 'Sau thông báo thuế quan 100% với hàng nhập khẩu Trung Quốc, thị trường crypto chứng kiến đợt thanh lý lớn nhất lịch sử: khoảng 19 tỷ USD vị thế đòn bẩy bị thanh lý trong 24 giờ, hơn 1,6 triệu tài khoản. Theo CoinGecko, khoảng 6,93 tỷ USD thanh lý (khoảng 70% số liệu thanh lý mà họ phân tích) dồn vào chỉ 40 phút, từ 20:50 đến 21:30 UTC; BTC giảm từ đỉnh trong ngày 122.574 xuống 104.782 USD (−14,5%). Cơ chế: vị thế long bị thanh lý tạo lệnh bán, đẩy giá xuống thêm, chạm giá thanh lý của lớp tiếp theo. Cross margin làm lỗ lan sang mọi vị thế, và ADL đóng cả vị thế short phòng hộ đang lãi.' },
      { type: 'p', text: 'Nhìn lại, dữ liệu phái sinh trước những đợt như vậy thường cho thấy đòn bẩy tích tụ cao. Nhưng không ai biết trước ngày giờ tin ra. Bài học không phải "đọc OI để bắt đáy". Bài học là: <strong>khi đòn bẩy toàn thị trường cao, giá có thể đi xa hơn mọi phân tích kỹ thuật</strong>, và chỉ những người có dừng lỗ, đòn bẩy thấp, isolated mới sống sót.' },
      { type: 'scenario', title: 'Funding cao, OI tăng mạnh, tỷ lệ long lệch hẳn', setup: 'BTC tăng 3 ngày liền (giả định). Funding 0,05% mỗi 8 giờ, OI tăng nhanh, bản đồ thanh lý cho thấy cụm lớn phía dưới giá 4%.', bad: 'Thấy funding âm ở một coin khác là "tín hiệu mua", thấy funding cao ở BTC là "tín hiệu short", mở short 20x ngay không chờ setup. Hoặc ngược lại, long thêm 20x vì "mọi người đều long". Giữ nhiều ngày, trả funding 15 USDT mỗi ngày trên 10.000 danh nghĩa.', good: 'Ghi nhận: thị trường đông long, đòn bẩy cao, dễ có nhịp quét xuống. Không coi đó là lệnh. Chỉ vào khi setup đủ điều kiện, giảm một nửa khối lượng, dừng lỗ đặt ngoài cụm thanh lý, cộng chi phí funding vào kế hoạch nếu giữ qua đêm.' }
    ],
    keyPoints: [
      'Funding dương: long trả short; âm: short trả long. Binance không thu phí trên funding.',
      'Mốc funding mặc định 07:00, 15:00, 23:00 giờ Việt Nam; chỉ trả/nhận nếu đang giữ vị thế đúng lúc đó.',
      'F = [P + clamp(I − P, ±0,05%)] ÷ (8 ÷ N); với chu kỳ 8 giờ (N = 8) là F = P + clamp(I − P, ±0,05%), I = 0,01% mỗi 8 giờ, nên funding thường đúng 0,01%.',
      'Funding tính trên danh nghĩa: 10.000 USDT, 0,05%/8 giờ, 30 ngày tốn 450 USDT.',
      'OI, tỷ lệ long/short, bản đồ thanh lý là bức tranh đám đông, không phải tín hiệu mua bán.',
      'Ngày 10/10/2025: khoảng 19 tỷ USD bị thanh lý trong 24 giờ, minh chứng cho thanh lý dây chuyền.'
    ],
    practice: [
      'Mở Binance Futures → Data → Trading Data cho BTCUSDT. Ghi lại funding, OI và tỷ lệ long/short hôm nay vào nhật ký, lặp lại mỗi ngày trong 2 tuần để làm quen trạng thái "bình thường".',
      'Tính chi phí funding nếu bạn giữ vị thế 3.000 USDT danh nghĩa trong 14 ngày với funding 0,03% mỗi 8 giờ. (Đáp án: 3.000 × 0,03% × 3 × 14 = 37,8 USDT)',
      'Trên Demo Trading, mở một vị thế nhỏ trước mốc 15:00 và giữ qua mốc đó. Vào lịch sử giao dịch xem dòng funding fee và đối chiếu với công thức.'
    ],
    quiz: [
      { q: 'Funding rate là +0,03%. Bạn đang short vị thế danh nghĩa 5.000 USDT đúng lúc tính funding. Điều gì xảy ra?', options: ['Bạn trả 1,5 USDT', 'Bạn nhận 15 USDT', 'Bạn nhận 1,5 USDT', 'Không có gì vì Binance thu funding'], answer: 2, explain: 'Funding dương thì long trả short. Số tiền = 5.000 × 0,03% = 1,5 USDT, bạn là short nên nhận. 15 USDT là tính nhầm 0,3%. Binance không thu phí trên funding, tiền chuyển thẳng giữa người chơi.' },
      { q: 'Bạn giữ long 20.000 USDT danh nghĩa trong 10 ngày, funding không đổi ở 0,05% mỗi 8 giờ. Tổng funding phải trả là?', options: ['100 USDT', '10 USDT', '30 USDT', '300 USDT'], answer: 3, explain: 'Mỗi kỳ 20.000 × 0,05% = 10 USDT; 3 kỳ mỗi ngày là 30 USDT; 10 ngày là 300 USDT. 10 là một kỳ, 30 là một ngày, 100 là quên rằng mỗi ngày có 3 kỳ.' },
      { q: 'Bạn mở long lúc 15:10 và đóng lúc 22:40 cùng ngày (giờ Việt Nam), chu kỳ funding mặc định 8 giờ. Bạn trả bao nhiêu kỳ funding?', options: ['1 kỳ', '0 kỳ', '2 kỳ', 'Tùy funding dương hay âm'], answer: 1, explain: 'Các mốc là 07:00, 15:00, 23:00 giờ Việt Nam. Bạn mở sau 15:00 và đóng trước 23:00 nên không giữ vị thế tại mốc nào, không trả không nhận. Dấu của funding chỉ quyết định ai trả, không đổi số kỳ.' },
      { q: 'Giá BTC giảm, OI tăng nhanh, funding âm sâu, tỷ lệ short cao. Cách hiểu nào đúng nhất?', options: ['Phía short đang đông, dễ có nhịp ép short; dùng để quản trị rủi ro', 'Chắc chắn giá sẽ bật tăng mạnh, nên long ngay với đòn bẩy cao', 'Chắc chắn giá sẽ còn giảm tiếp, nên mở thêm lệnh short ngay', 'OI tăng nhanh nghĩa là giá sắp tăng, bất kể funding ra sao'], answer: 0, explain: 'Dữ liệu phái sinh mô tả đám đông và lượng đòn bẩy, không dự đoán hướng giá. Bối cảnh này cho biết nếu giá đảo chiều thì short có thể bị ép đóng dây chuyền, nên cần thận trọng. Các lựa chọn "chắc chắn" đều sai vì không dữ liệu nào bảo đảm hướng giá, và OI tăng tự nó không dự đoán hướng: ở đây OI tăng khi giá giảm là áp lực short đang tích tụ.' }
    ],
    sources: [
      { title: 'Introduction to Binance Futures Funding Rates', url: 'https://www.binance.com/en/support/faq/detail/360033525031', note: 'Binance Support, tiếng Anh (công thức funding, mốc giờ, ví dụ 0,0429%)' },
      { title: 'What Is Open Interest?', url: 'https://www.binance.com/en/academy/articles/what-is-open-interest', note: 'Binance Academy, tiếng Anh' },
      { title: 'October 10 Crypto Crash Explained', url: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained', note: 'CoinGecko Learn, tiếng Anh' },
      { title: 'How to Access Mock Trading in Binance Futures (chuyển sang Binance Demo Trading)', url: 'https://www.binance.com/en/support/faq/detail/b3706b248f2b4b1caabb4bf253bf067f', note: 'Binance Support, tiếng Anh' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
