// Chương 3: Cơ bản, on-chain và vĩ mô
const lessons = {
  'c3-b1': {
    duration: 10,
    level: 'Trung cấp',
    summary: 'Đọc tokenomics như đọc bảng cân đối: cung, lạm phát token, lịch mở khóa, FDV so với vốn hóa và doanh thu thật, để tránh những đồng coin sinh ra để xả.',
    goals: [
      'Dùng tỷ lệ FDV ÷ Vốn hóa và lịch mở khóa để tính mức pha loãng của một token',
      'Ước lượng áp lực bán từ một đợt mở khóa (unlock) trước khi nó xảy ra',
      'Nhận diện các dấu hiệu dự án rác và bài học từ LUNA/UST 5/2022'
    ],
    blocks: [
      { type: 'p', text: 'Biểu đồ cho bạn biết giá đang làm gì. Tokenomics cho bạn biết <strong>ai đang cầm token, bao nhiêu token sắp ra thị trường, và ai có động cơ bán</strong>. Rất nhiều đồng coin giảm 80–90% không phải vì biểu đồ xấu, mà vì nguồn cung mới đổ ra liên tục trong khi nhu cầu thật gần như bằng không. Bài này giúp bạn tự kiểm tra một token trong 15 phút trước khi đặt tiền vào.' },

      { type: 'h', text: 'Cung token: lưu hành, tổng cung và cung tối đa' },
      { type: 'p', text: 'Mỗi token có ba con số cung bạn cần phân biệt. Các trang dữ liệu như CoinGecko hay CoinMarketCap đều hiển thị cả ba, nhưng người mới thường chỉ nhìn giá.' },
      { type: 'table', head: ['Chỉ số', 'Ý nghĩa', 'Vì sao quan trọng'], rows: [
        ['Cung lưu hành (circulating supply)', 'Số token đang thực sự giao dịch được trên thị trường', 'Dùng để tính vốn hóa hiện tại'],
        ['Tổng cung (total supply)', 'Số token đã được tạo ra, gồm cả phần đang bị khóa', 'Phần chênh với cung lưu hành là nguồn cung sẽ ra sau'],
        ['Cung tối đa (max supply)', 'Giới hạn số token có thể tồn tại', 'Bitcoin có trần 21 triệu. Nhiều token không có trần, có thể phát hành thêm mãi']
      ] },
      { type: 'p', text: '<strong>Lạm phát token</strong> là tốc độ nguồn cung lưu hành tăng lên mỗi năm, do phần thưởng staking, phần thưởng khai thác, quỹ hệ sinh thái chi ra, hay các đợt mở khóa. Nếu cung tăng 30%/năm mà nhu cầu không tăng tương ứng, giá mỗi token bị kéo xuống dù dự án không có tin xấu nào.' },
      { type: 'example', title: 'Lợi suất staking không phải lợi nhuận thật (số giả định)', text: 'Token ABC trả lợi suất staking 8%/năm, nhưng nguồn cung tăng 10%/năm. Sau một năm, số token của bạn nhân 1,08, còn tổng cung nhân 1,10. Tỷ trọng sở hữu của bạn = 1,08 ÷ 1,10 ≈ 0,982, tức <strong>giảm khoảng 1,8%</strong> dù bạn thấy số token tăng lên. Người không stake còn bị pha loãng nhiều hơn: tỷ trọng giảm khoảng 9,1% (1 ÷ 1,10 ≈ 0,909).' },

      { type: 'h', text: 'FDV và vốn hóa: khoảng cách là áp lực bán tiềm ẩn' },
      { type: 'p', text: 'Nhắc nhanh (xem bài 1.2): Vốn hóa = Giá × Cung lưu hành; FDV = Giá × Cung tối đa (hoặc tổng cung nếu token không có trần). Ở bài này ta đi xa hơn: dùng <strong>tỷ lệ FDV ÷ Vốn hóa</strong> để đo mức pha loãng còn chờ phía trước, và dùng lịch mở khóa để biết pha loãng đó đến nhanh hay chậm.' },
      { type: 'table', head: ['FDV ÷ Vốn hóa', 'Tỷ lệ đang lưu hành', 'Cách đọc (ngưỡng thực hành của khóa)'], rows: [
        ['Dưới 1,5 lần', 'Trên khoảng 67%', 'Phần lớn cung đã ra thị trường; vẫn kiểm tra lạm phát phát hành hằng năm'],
        ['1,5–5 lần', 'Khoảng 20–67%', 'Bắt buộc đọc lịch mở khóa 12 tháng tới trước khi giao dịch'],
        ['Trên 5 lần', 'Dưới 20%', '<strong>Cờ đỏ</strong>: phần lớn cung chưa ra, áp lực bán tiềm ẩn rất lớn (khớp ô đầu tiên của checklist cuối bài)']
      ] },
      { type: 'calc', title: 'Pha loãng theo lịch mở khóa 12 tháng: token XYZ (toàn bộ số liệu là giả định)', rows: [
        ['Hiện tại', 'Giá 2 USDT, cung lưu hành 100 triệu, cung tối đa 1 tỷ token'],
        ['Vốn hóa và FDV', '2 × 100 triệu = 200 triệu USDT; 2 × 1 tỷ = 2 tỷ USDT'],
        ['FDV ÷ Vốn hóa', '2 tỷ ÷ 200 triệu = 10 lần (chỉ 10% đang lưu hành: cờ đỏ)'],
        ['Lịch vesting 12 tháng tới', 'Thêm 300 triệu token ra thị trường'],
        ['Cung lưu hành sau 12 tháng', '100 triệu + 300 triệu = 400 triệu (gấp 4 lần)'],
        ['Lạm phát cung trong năm', '300 triệu ÷ 100 triệu = 300%'],
        ['Nếu vốn hóa đứng yên 200 triệu USDT', 'Giá = 200 triệu ÷ 400 triệu = 0,5 USDT (giảm 75%)'],
        ['Để giữ giá 2 USDT', 'Vốn hóa phải lên 2 × 400 triệu = 800 triệu USDT, tức cần thêm 600 triệu USDT tiền mua mới trong 12 tháng']
      ], result: 'FDV ÷ Vốn hóa cho biết còn bao nhiêu pha loãng; lịch vesting cho biết nó đến nhanh thế nào. Token XYZ phải hút thêm 600 triệu USDT trong một năm chỉ để đứng giá.' },
      { type: 'callout', tone: 'warn', title: 'Token không có trần cung', text: 'Với token không có cung tối đa, FDV thường được tính theo tổng cung hiện tại. Con số này có thể thấp hơn mức pha loãng thật, vì token vẫn được phát hành thêm hằng năm. Khi đó hãy nhìn tốc độ phát hành (lạm phát token) thay vì chỉ nhìn FDV.' },

      { type: 'h', text: 'Lịch mở khóa (unlock) và phân bổ token' },
      { type: 'p', text: 'Phần lớn token mới đều khóa một phần nguồn cung cho đội ngũ, quỹ đầu tư, cố vấn. Theo Binance Academy, giai đoạn khóa thường kéo dài 1–2 năm hoặc hơn, thường có một <strong>cliff</strong> (giai đoạn đầu không mở token nào, phổ biến khoảng 12 tháng), sau đó mở dần theo lịch (vesting). Token bị khóa không tính vào cung lưu hành. Khi mở khóa, chúng có thể được bán ngay.' },
      { type: 'p', text: 'Hãy đọc bảng phân bổ (allocation) trong tài liệu dự án. Câu hỏi quan trọng nhất: <strong>ai đã mua token với giá bao nhiêu, và bao giờ họ được bán?</strong> Quỹ đầu tư mua vòng hạt giống ở giá rất thấp có động cơ chốt lời mạnh khi token mở khóa, bất kể dự án tốt hay xấu.' },
      { type: 'calc', title: 'Tác động của một đợt unlock (tiếp ví dụ XYZ, số giả định)', rows: [
        ['Lượng mở khóa sắp tới', '50 triệu token cho quỹ đầu tư (5% cung tối đa)'],
        ['Cung lưu hành sau unlock', '100 triệu + 50 triệu = 150 triệu (tăng 50%)'],
        ['Giá trị đợt unlock ở giá 2 USDT', '50 triệu × 2 = 100 triệu USDT'],
        ['Khối lượng giao dịch trung bình ngày (giả định)', '20 triệu USDT'],
        ['So với thanh khoản', '100 triệu ÷ 20 triệu = gấp 5 lần khối lượng một ngày'],
        ['Giá vốn của quỹ (giả định)', '0,1 USDT, tức đang lãi 2 ÷ 0,1 = 20 lần'],
        ['Nếu vốn hóa đứng yên 200 triệu USDT', 'Giá tương ứng = 200 triệu ÷ 150 triệu ≈ 1,33 USDT (giảm khoảng 33%)']
      ], result: 'Đợt unlock bằng 50% cung lưu hành và gấp 5 lần khối lượng ngày, lại rơi vào tay người đang lãi 20 lần. Đây là rủi ro lớn, cần có trong kế hoạch trước ngày mở khóa.' },
      { type: 'p', text: 'Phép tính "vốn hóa đứng yên" chỉ là minh họa đơn giản hóa. Thực tế không phải mọi token mở khóa đều bị bán ngay, và thị trường thường đã phản ánh một phần từ trước. Nhưng quy tắc thực dụng vẫn rõ: đợt unlock càng lớn so với cung lưu hành và so với khối lượng ngày, rủi ro áp lực bán càng cao.' },
      { type: 'callout', tone: 'risk', title: 'Đừng mở vị thế lớn ngay trước unlock lớn', text: 'Nếu một đợt unlock vượt 2–5% cung lưu hành hoặc vượt khối lượng giao dịch vài ngày, hãy coi đó là điều kiện không mở lệnh mua mới, hoặc giảm khối lượng. Với futures, biến động quanh ngày unlock có thể kích hoạt thanh lý hàng loạt ở cả hai chiều.' },

      { type: 'h', text: 'Doanh thu thật và nhu cầu thật' },
      { type: 'p', text: 'Một giao thức có giá trị bền khi có người <strong>trả tiền thật</strong> để dùng nó: phí giao dịch, phí vay, phí dịch vụ. Hãy tách hai thứ hay bị trộn lẫn:' },
      { type: 'list', items: [
        '<strong>Doanh thu từ người dùng</strong>: phí người dùng trả vì cần dịch vụ. Đây là nhu cầu thật.',
        '<strong>Phần thưởng in thêm token</strong>: dự án phát token mới để trả lợi suất. Đây là chi phí, không phải doanh thu, vì nó pha loãng người nắm giữ.',
        '<strong>Tổng giá trị khóa (TVL)</strong>: tiền gửi vào giao thức. TVL cao nhờ lợi suất bơm bằng token có thể rút đi rất nhanh khi lợi suất giảm.'
      ] },
      { type: 'example', title: 'So FDV với doanh thu (số giả định)', text: 'Giao thức XYZ thu 10 triệu USDT phí mỗi năm. FDV = 2 tỷ USDT. Tỷ lệ FDV ÷ doanh thu = 2 tỷ ÷ 10 triệu = <strong>200 lần</strong>. Nghĩa là thị trường đang trả giá bằng 200 năm doanh thu hiện tại. Không có con số "đúng" chung, nhưng khi so hai giao thức cùng loại, tỷ lệ này giúp bạn thấy cái nào đang được định giá bằng kỳ vọng thay vì bằng dòng tiền.' },

      { type: 'h', text: 'Dấu hiệu dự án rác và bài học LUNA/UST' },
      { type: 'checklist', title: 'Kiểm tra nhanh trước khi mua một token', items: [
        'Cung lưu hành dưới 20% cung tối đa (FDV gấp hơn 5 lần vốn hóa)',
        'Đội ngũ và quỹ nắm trên 40–50% nguồn cung, lịch mở khóa dày trong 12 tháng tới',
        'Lợi suất cao bất thường mà không giải thích được tiền đến từ đâu',
        'Doanh thu thật gần bằng 0, giá trị chủ yếu đến từ "hệ sinh thái sắp ra mắt"',
        'Đội ngũ ẩn danh, không có mã nguồn công khai hoặc kiểm toán hợp đồng thông minh',
        'Được quảng bá mạnh bởi nhóm kèo, KOL nhận tiền, hứa "x10, x100"',
        'Khối lượng chỉ tập trung ở một hai sàn nhỏ, sổ lệnh mỏng'
      ] },
      { type: 'p', text: 'Không có dấu hiệu nào ở trên tự nó chứng minh dự án lừa đảo. Nhưng càng nhiều ô được đánh dấu, bạn càng nên đứng ngoài. Đứng ngoài không mất tiền.' },
      { type: 'example', title: 'LUNA và UST (tháng 5/2022)', text: 'UST là stablecoin thuật toán, không được bảo chứng bằng USD trong ngân hàng mà dựa vào cơ chế đổi 1 UST lấy lượng LUNA trị giá 1 USD. Theo đơn kiện của SEC Mỹ (2/2023), Terraform Labs và CEO Do Kwon quảng bá UST có thể mang lại lợi suất tới 20%. Tháng 5/2022 UST mất neo 1 USD. Người nắm UST đổ xô đổi sang LUNA rồi bán, cơ chế phải in thêm LUNA với số lượng khổng lồ, cung LUNA phình to, giá LUNA và UST cùng rơi về gần 0 chỉ trong vài ngày. Bài học tokenomics: <strong>lợi suất cao không có nguồn doanh thu thật + nguồn cung có thể in vô hạn = rủi ro sụp đổ dây chuyền</strong>.' },
      { type: 'tool', name: 'drawdown', note: 'Thử nhập mức lỗ 90%: bạn sẽ thấy cần lãi 900% mới về lại vốn. Đó là lý do tránh token rác quan trọng hơn chọn trúng token tốt.' },
      { type: 'scenario', title: 'Token mới niêm yết đang tăng 60% trong tuần', setup: 'Token XYZ vừa lên sàn, cung lưu hành 10%, FDV 2 tỷ USDT. Nhóm Telegram báo "sắp có đối tác lớn". Lịch mở khóa cho thấy 3 tuần nữa có đợt unlock 50 triệu token.', bad: 'Thấy nến xanh liên tục, sợ lỡ cơ hội nên mua 40% tài khoản ở đỉnh, không xem lịch unlock. Ba tuần sau giá giảm 45%, tự nhủ "giữ dài hạn", rồi tiếp tục giữ khi giá giảm thêm.', good: 'Mở CoinGecko xem cung, FDV, bảng phân bổ và lịch mở khóa. Thấy đợt unlock bằng 50% cung lưu hành, ghi vào kế hoạch: không mua trước ngày unlock. Nếu vẫn muốn tham gia thì chờ sau unlock, giá tạo nền và có điểm vô hiệu rõ ràng, khối lượng tối đa theo quy tắc rủi ro 1% (xem bài 6.1).' }
    ],
    keyPoints: [
      'FDV ÷ Vốn hóa trên 5 lần (dưới 20% cung đang lưu hành) là cờ đỏ; lịch vesting cho biết pha loãng đến nhanh hay chậm.',
      'Tỷ lệ Vốn hóa ÷ FDV thấp nghĩa là còn nhiều token chờ ra thị trường.',
      'Đợt unlock lớn so với cung lưu hành và khối lượng ngày là điều kiện không mở vị thế mua mới.',
      'Lợi suất trả bằng token in thêm là chi phí pha loãng, không phải doanh thu.',
      'LUNA/UST 5/2022: lợi suất cao không có doanh thu thật và cung in vô hạn dẫn tới sụp đổ về gần 0.'
    ],
    practice: [
      'Chọn 3 token bạn đang quan tâm, ghi cung lưu hành, cung tối đa, vốn hóa, FDV và tính tỷ lệ Vốn hóa ÷ FDV.',
      'Tìm lịch mở khóa 3 tháng tới của một token, tính lượng unlock bằng bao nhiêu % cung lưu hành và gấp bao nhiêu lần khối lượng ngày.',
      'Chạy checklist "dự án rác" cho một token được quảng bá trong nhóm chat bạn tham gia. Đếm số ô bị đánh dấu.'
    ],
    quiz: [
      { q: 'Token A giá 1 USDT, cung lưu hành 200 triệu. Lịch vesting đưa thêm 100 triệu token ra thị trường trong 12 tháng tới. Nếu vốn hóa đứng yên, giá sau 12 tháng khoảng bao nhiêu?', options: ['1,5 USDT', 'Khoảng 0,67 USDT', '0,5 USDT', '1 USDT'], answer: 1, explain: 'Cung mới = 200 + 100 = 300 triệu. Giá = 200 triệu USDT ÷ 300 triệu ≈ 0,67 USDT, giảm khoảng 33%. 1,5 USDT là nhân 1,5 thay vì chia; 0,5 USDT là tính như thể cung tăng gấp đôi (mở khóa 200 triệu); 1 USDT là bỏ qua pha loãng.' },
      { q: 'Token B có cung lưu hành 200 triệu. Tuần tới mở khóa 60 triệu token cho quỹ đầu tư, khối lượng ngày khoảng 5 triệu USDT, giá 1 USDT. Nhận định nào hợp lý nhất?', options: ['Unlock không ảnh hưởng vì dự án đã công bố từ trước', 'Unlock chỉ ảnh hưởng nếu đội ngũ công bố sẽ bán', 'Unlock bằng 30% cung lưu hành và gấp 12 lần khối lượng ngày, nên coi là rủi ro lớn và không mở vị thế mua mới trước ngày đó', 'Nên mua trước unlock vì cung tăng làm thanh khoản tốt hơn'], answer: 2, explain: '60 ÷ 200 = 30% cung lưu hành; 60 triệu USDT ÷ 5 triệu = 12 lần khối lượng ngày. Công bố trước không xóa bỏ áp lực bán thật, người nhận không cần thông báo trước khi bán, và thanh khoản tốt hơn không đồng nghĩa giá tăng.' },
      { q: 'Một token trả lợi suất staking 12%/năm, trong khi nguồn cung tăng 15%/năm. Nếu bạn stake, tỷ trọng sở hữu của bạn thay đổi thế nào sau một năm?', options: ['Giảm khoảng 2,6%', 'Tăng 12%', 'Không đổi', 'Tăng khoảng 3%'], answer: 0, explain: '1,12 ÷ 1,15 ≈ 0,974, tức tỷ trọng giảm khoảng 2,6%. Lợi suất 12% chỉ là số token tăng, không phải phần sở hữu tăng. "Không đổi" và "tăng 3%" sai vì bỏ qua pha loãng hoặc lấy ngược phép tính.' },
      { q: 'Điểm yếu cốt lõi về tokenomics của UST/LUNA trước khi sụp đổ 5/2022 là gì?', options: ['Cung tối đa bị giới hạn quá thấp', 'Thiếu sàn niêm yết', 'Đội ngũ phát triển quá chậm', 'Neo giá dựa vào cơ chế in thêm LUNA, và lợi suất cao không đến từ doanh thu thật'], answer: 3, explain: 'Khi UST mất neo, cơ chế đổi UST lấy LUNA buộc in thêm LUNA hàng loạt, cung phình to và giá cả hai về gần 0. LUNA không bị giới hạn cung thấp (ngược lại), được niêm yết rộng rãi, và tốc độ phát triển không phải nguyên nhân.' }
    ],
    sources: [
      { title: 'Fully Diluted Value (FDV) Definition', url: 'https://coinmarketcap.com/academy/glossary/fully-diluted-value-fdv', note: 'CoinMarketCap Academy, tiếng Anh' },
      { title: 'Token Lockup', url: 'https://www.binance.com/en/academy/glossary/token-lockup', note: 'Binance Academy, tiếng Anh' },
      { title: 'SEC Charges Terraform and CEO Do Kwon with Defrauding Investors in Crypto Schemes', url: 'https://www.sec.gov/newsroom/press-releases/2023-32', note: 'SEC Mỹ, 16/02/2023, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c3-b2': {
    duration: 8,
    level: 'Cơ bản',
    summary: 'Halving, ETF, lãi suất Fed, đồng USD và thanh khoản toàn cầu: những lực lớn tạo nên chu kỳ bitcoin, và vì sao chu kỳ lịch sử không phải lời hứa.',
    goals: [
      'Giải thích halving làm thay đổi nguồn cung mới của bitcoin như thế nào, bằng số',
      'Biết các biến vĩ mô chính (lãi suất Fed, DXY, thanh khoản) tác động lên crypto ra sao',
      'Dùng bối cảnh chu kỳ để điều chỉnh mức rủi ro, không dùng để đoán đỉnh đáy'
    ],
    blocks: [
      { type: 'p', text: 'Một setup kỹ thuật đẹp trong thị trường đang siết tiền thường có tỷ lệ thành công thấp hơn cùng setup đó khi tiền đang dồi dào. Bài này không dạy bạn dự đoán giá. Nó giúp bạn trả lời câu hỏi: <strong>môi trường hiện tại đang thuận hay nghịch, và mình nên chấp nhận bao nhiêu rủi ro?</strong>' },

      { type: 'h', text: 'Halving: nguồn cung mới bị cắt một nửa' },
      { type: 'p', text: 'Bitcoin có cung tối đa 21 triệu. BTC mới chỉ sinh ra qua phần thưởng khối cho thợ đào. Cứ mỗi 210.000 khối (khoảng 4 năm), phần thưởng này giảm một nửa. Đó là <strong>halving</strong>.' },
      { type: 'table', head: ['Lần', 'Thời gian', 'Khối', 'Phần thưởng sau halving'], rows: [
        ['1', '28/11/2012', '210.000', '25 BTC'],
        ['2', '09/07/2016', '420.000', '12,5 BTC'],
        ['3', '11/05/2020', '630.000', '6,25 BTC'],
        ['4', '19–20/04/2024', '840.000', '3,125 BTC'],
        ['5 (ước tính)', 'khoảng 2028', '1.050.000', '1,5625 BTC']
      ] },
      { type: 'calc', title: 'Halving 2024 làm lượng BTC mới giảm bao nhiêu (ước tính gần đúng)', rows: [
        ['Số khối mỗi ngày (khoảng 10 phút/khối)', '24 × 60 ÷ 10 = 144 khối'],
        ['BTC mới mỗi ngày trước halving', '144 × 6,25 = 900 BTC'],
        ['BTC mới mỗi ngày sau halving', '144 × 3,125 = 450 BTC'],
        ['BTC mới mỗi năm sau halving', '450 × 365 = 164.250 BTC'],
        ['So với cung lưu hành khoảng 20,09 triệu', '164.250 ÷ 20.090.000 ≈ 0,82%/năm'],
        ['Ở giá giả định 80.000 USD', '450 × 80.000 = 36 triệu USD BTC mới mỗi ngày cần người mua']
      ], result: 'Sau halving 2024, lạm phát nguồn cung bitcoin chỉ còn khoảng 0,8%/năm. Nguồn cung mới giảm, nhưng giá vẫn do cầu quyết định.' },
      { type: 'callout', tone: 'warn', title: 'Halving không phải nút bấm tăng giá', text: 'Lịch halving được biết trước nhiều năm, nên thị trường có thể đã phản ánh một phần từ trước. Halving chỉ cắt nguồn cung mới. Nếu cầu giảm mạnh (lãi suất tăng, tiền rút khỏi tài sản rủi ro), giá vẫn có thể giảm sâu sau halving.' },

      { type: 'h', text: 'Chu kỳ lịch sử và vì sao không đảm bảo lặp lại' },
      { type: 'figure', name: 'market-cycle', caption: 'Bốn pha của một chu kỳ: tích lũy, tăng giá, phân phối, giảm giá. Chỉ nhìn rõ được sau khi đã xảy ra.' },
      { type: 'p', text: 'Nhìn lại lịch sử, bitcoin từng lập đỉnh chu kỳ trong khoảng 12–18 tháng sau các lần halving 2012, 2016, 2020, rồi giảm sâu 75–85% từ đỉnh trong năm tiếp theo. Chu kỳ gần nhất cũng có nét tương tự: đỉnh lịch sử khoảng <strong>126.080 USD vào tháng 10/2025</strong> (theo CoinGecko), khoảng 18 tháng sau halving 4/2024.' },
      { type: 'p', text: 'Nhưng chu kỳ này cũng khác các lần trước. BTC vượt đỉnh cũ của năm 2021 ngay từ tháng 3/2024, <strong>trước cả halving</strong>, điều chưa từng xảy ra, phần lớn nhờ dòng tiền vào ETF giao ngay. Cấu trúc người mua đã đổi: quỹ, công ty niêm yết, cố vấn tài chính tham gia nhiều hơn. Khi người chơi thay đổi, nhịp điệu cũ có thể không còn đúng.' },
      { type: 'list', items: [
        '<strong>Mẫu quá nhỏ</strong>: mới có 4 lần halving. Bốn điểm dữ liệu không đủ để khẳng định quy luật thống kê.',
        '<strong>Ai cũng biết chu kỳ</strong>: khi đám đông cùng chờ "đỉnh 18 tháng sau halving", họ bán sớm hơn, làm chu kỳ lệch đi.',
        '<strong>Vĩ mô chiếm ưu thế</strong>: năm 2022 giá giảm mạnh cùng lúc Fed tăng lãi suất nhanh, không chỉ vì "đến lịch giảm".'
      ] },
      { type: 'callout', tone: 'risk', title: 'Không đặt cược tài khoản vào một ngày trong lịch', text: 'Chu kỳ lịch sử <strong>không đảm bảo lặp lại</strong>. Mua đòn bẩy vì "sắp đến mùa tăng" hay short toàn bộ vì "đã đến đỉnh chu kỳ" là đánh bạc với lịch. Hãy dùng chu kỳ như một lớp bối cảnh để điều chỉnh mức rủi ro, còn điểm vào và dừng lỗ vẫn phải dựa vào cấu trúc giá.' },

      { type: 'h', text: 'Lãi suất Fed, DXY và thanh khoản toàn cầu' },
      { type: 'p', text: 'Crypto là tài sản rủi ro cao. Nó phản ứng mạnh với <strong>giá của tiền</strong>. Ba biến bạn nên theo dõi:' },
      { type: 'table', head: ['Biến số', 'Là gì', 'Tác động thường thấy lên crypto'], rows: [
        ['Lãi suất Fed (fed funds rate)', 'Lãi suất điều hành của Cục Dự trữ Liên bang Mỹ, do FOMC quyết định', 'Lãi suất cao: gửi tiền không rủi ro đã có lãi, tiền rời tài sản rủi ro. Lãi suất giảm: ngược lại'],
        ['DXY (chỉ số đồng USD)', 'Sức mạnh của USD so với rổ ngoại tệ chính (euro, yên, bảng...)', 'USD mạnh thường đi cùng điều kiện tài chính thắt chặt, bất lợi cho tài sản rủi ro'],
        ['Thanh khoản toàn cầu', 'Lượng tiền và tín dụng trong hệ thống, chịu ảnh hưởng của ngân hàng trung ương các nước', 'Tiền dồi dào thường nâng giá tài sản rủi ro; tiền bị rút lại thì ngược lại']
      ] },
      { type: 'p', text: 'Đây là xu hướng thường thấy, không phải quy luật cơ học. Có giai đoạn crypto đi ngược vĩ mô vì câu chuyện riêng (ETF, sự cố sàn, luật mới). Điều quan trọng là bạn biết <strong>kỳ vọng thị trường</strong> đang ở đâu, vì giá phản ứng với phần bất ngờ so với kỳ vọng, không phải với bản thân quyết định.' },
      { type: 'example', title: 'FOMC ngày 16/09/2026', text: 'Ngày 16/09/2026, FOMC <strong>tăng</strong> lãi suất 0,25 điểm phần trăm lên 3,75–4%, bỏ phiếu 12–0, nêu lý do lạm phát vẫn ở mức cao. Với trader, ý nghĩa thực dụng là: môi trường tiền tệ đang thắt chặt, không phải nới lỏng. Trong bối cảnh này, việc giảm rủi ro mỗi lệnh, ưu tiên setup theo xu hướng khung lớn và hạn chế đòn bẩy là hợp lý hơn so với giai đoạn tiền rẻ. Giờ công bố FOMC theo giờ Việt Nam xem ở bài 3.4.' },

      { type: 'h', text: 'ETF bitcoin giao ngay và tương quan với chứng khoán' },
      { type: 'p', text: 'Ngày 10/01/2024, SEC Mỹ chấp thuận các quỹ ETF bitcoin giao ngay. Nhà đầu tư có thể mua bitcoin qua tài khoản chứng khoán thông thường. Chủ tịch SEC khi đó, Gary Gensler, nhấn mạnh SEC <em>không</em> chấp thuận hay bảo chứng cho bitcoin, và gọi bitcoin là tài sản đầu cơ, biến động mạnh.' },
      { type: 'list', items: [
        '<strong>Hệ quả 1</strong>: dòng tiền vào/ra ETF mỗi ngày trở thành một lực cung cầu lớn, được công bố công khai.',
        '<strong>Hệ quả 2</strong>: bitcoin nằm trong danh mục cùng cổ phiếu, nên khi các quỹ giảm rủi ro, họ bán cả hai. Theo một ghi chú của IMF (1/2022), tương quan giữa bitcoin và các chỉ số chứng khoán Mỹ như S&P 500, Nasdaq tăng rõ trong giai đoạn 2020–2021 so với 2017–2019.',
        '<strong>Hệ quả 3</strong>: giờ mở cửa chứng khoán Mỹ (khoảng 20:30 giờ Việt Nam khi Mỹ theo giờ mùa hè) thường là lúc biến động bitcoin tăng.'
      ] },
      { type: 'p', text: 'Tương quan thay đổi theo thời gian. Có lúc rất cao, có lúc gần bằng 0. Đừng giả định bitcoin là "vàng kỹ thuật số" chống khủng hoảng: trong nhiều đợt bán tháo tài sản rủi ro, nó giảm cùng chứng khoán.' },

      { type: 'h', text: 'Đỉnh 10/2025 và cách dùng bối cảnh chu kỳ' },
      { type: 'p', text: 'Sau đỉnh khoảng 126.080 USD tháng 10/2025, thị trường trải qua cú sập ngày 10/10/2025 (khoảng 19 tỷ USD vị thế đòn bẩy bị thanh lý trong 24 giờ) và các nhịp giảm tiếp theo. Cuối 9/2026, BTC giao dịch quanh 84.000 USD.' },
      { type: 'calc', title: 'Khoảng cách từ đỉnh (theo số liệu CoinGecko, làm tròn)', rows: [
        ['Đỉnh 10/2025', '126.080 USD'],
        ['Giá cuối 9/2026', 'khoảng 84.000 USD'],
        ['Mức giảm từ đỉnh', '84.000 ÷ 126.080 − 1 ≈ −33,4%'],
        ['Mức tăng cần để về lại đỉnh', '126.080 ÷ 84.000 − 1 ≈ +50,1%']
      ], result: 'Giảm khoảng 33% từ đỉnh cần tăng khoảng 50% để hòa. Toán học của thua lỗ (bài 6.3) áp dụng cho cả thị trường.' },
      { type: 'steps', items: [
        { title: 'Xác định trạng thái khung lớn', text: 'Trên khung tuần: giá trên hay dưới MA 200 ngày/tuần, cấu trúc HH/HL hay LH/LL (xem bài 2.2 và 2.5).' },
        { title: 'Ghi nhận bối cảnh vĩ mô', text: 'Fed đang tăng, giữ hay giảm lãi suất? DXY đang mạnh lên hay yếu đi? Dòng tiền ETF gần đây vào hay ra?' },
        { title: 'Chọn chế độ rủi ro', text: 'Bối cảnh thuận: rủi ro chuẩn (ví dụ 1%/lệnh). Bối cảnh nghịch hoặc lẫn lộn: giảm còn 0,5%, ít lệnh hơn, ưu tiên spot.' },
        { title: 'Xem lại mỗi tháng', text: 'Không đổi quan điểm mỗi ngày theo tin tức. Ghi bối cảnh vào nhật ký giao dịch và xem lại sau mỗi cuộc họp FOMC.' }
      ] },
      { type: 'scenario', title: 'Đã 18 tháng sau halving', setup: 'Bạn đọc được "lịch sử cho thấy đỉnh chu kỳ đến 12–18 tháng sau halving". Giá vừa lập đỉnh mới, mạng xã hội hưng phấn.', bad: 'Tin chắc đỉnh đã đến, mở lệnh short đòn bẩy 20x với 50% tài khoản, không đặt dừng lỗ vì "chu kỳ luôn lặp lại". Giá tăng thêm 12% trước khi đảo chiều, vị thế bị thanh lý trước khi dự đoán kịp đúng.', good: 'Coi chu kỳ là lý do để thận trọng: chốt lời từng phần vị thế spot đang lãi, giảm rủi ro mỗi lệnh xuống 0,5%, và chỉ short khi cấu trúc khung ngày chuyển sang LH/LL, có dừng lỗ trên đỉnh gần nhất.' }
    ],
    keyPoints: [
      'Halving 4/2024 (khối 840.000) cắt phần thưởng còn 3,125 BTC; BTC mới khoảng 450 BTC/ngày, tức khoảng 0,8%/năm.',
      'Chu kỳ lịch sử chỉ có 4 điểm dữ liệu và không đảm bảo lặp lại; dùng nó để điều chỉnh rủi ro, không để đoán ngày.',
      'Lãi suất Fed, DXY và thanh khoản toàn cầu quyết định "giá của tiền"; ngày 16/09/2026 Fed tăng lãi suất lên 3,75–4%.',
      'ETF giao ngay (10/01/2024) đưa bitcoin vào danh mục của quỹ, làm tương quan với chứng khoán Mỹ rõ hơn.',
      'Từ đỉnh 126.080 USD (10/2025) về khoảng 84.000 USD là giảm khoảng 33%, cần tăng khoảng 50% để hòa.'
    ],
    practice: [
      'Viết một đoạn 5 dòng "bối cảnh hiện tại": xu hướng khung tuần của BTC, lãi suất Fed, hướng DXY, dòng tiền ETF gần đây. Kết luận bạn dùng mức rủi ro 1% hay 0,5% mỗi lệnh.',
      'Tính lại lượng BTC mới mỗi ngày sau halving 2028 (phần thưởng 1,5625 BTC) và so với hiện nay.',
      'Mở biểu đồ BTC khung tuần, đánh dấu 4 lần halving và các đỉnh sau đó. Ghi nhận khoảng cách thời gian, rồi viết ra 2 lý do vì sao lần tới có thể khác.'
    ],
    quiz: [
      { q: 'Sau halving 2024, mỗi ngày có khoảng 144 khối được tạo. Lượng BTC mới mỗi ngày là khoảng bao nhiêu?', options: ['450 BTC', '1.800 BTC', '900 BTC', '225 BTC'], answer: 0, explain: '144 × 3,125 = 450 BTC. 900 BTC là mức trước halving 2024 (phần thưởng 6,25). 1.800 BTC tương ứng phần thưởng 12,5 (sau halving 2016). 225 BTC là mức sau halving 2028.' },
      { q: 'Nhận định nào đúng nhất về chu kỳ halving?', options: ['Chu kỳ là cơ chế lập trình sẵn nên chắc chắn lặp lại', 'Sau ETF, chu kỳ không còn liên quan gì đến giá', 'Halving làm giá tăng ngay trong tháng diễn ra', 'Chu kỳ là mẫu lịch sử với rất ít điểm dữ liệu, có thể thay đổi khi cấu trúc thị trường và vĩ mô thay đổi'], answer: 3, explain: 'Chỉ phần thưởng khối là được lập trình; phản ứng giá thì không. Giá không nhất thiết tăng ngay khi halving. Nói chu kỳ "không còn liên quan gì" cũng là khẳng định quá mức, không có căn cứ.' },
      { q: 'Fed vừa tăng lãi suất vì lạm phát cao, DXY mạnh lên. Trader có kế hoạch nên điều chỉnh thế nào?', options: ['Short toàn bộ tài khoản vì chắc chắn giá sẽ giảm', 'Tăng đòn bẩy để tận dụng biến động', 'Giảm rủi ro mỗi lệnh, ưu tiên setup cùng xu hướng khung lớn, hạn chế đòn bẩy', 'Bỏ qua vĩ mô vì chỉ giao dịch theo biểu đồ'], answer: 2, explain: 'Môi trường thắt chặt thường bất lợi cho tài sản rủi ro, nên thu nhỏ rủi ro là hợp lý. Vĩ mô không đảm bảo hướng giá, nên short toàn bộ là đánh cược. Tăng đòn bẩy khi bối cảnh bất lợi làm tăng rủi ro thanh lý. Bỏ qua hoàn toàn vĩ mô là thiếu một lớp bối cảnh quan trọng.' },
      { q: 'Trước cuộc họp FOMC, thị trường gần như chắc chắn Fed sẽ giữ nguyên lãi suất. Fed giữ nguyên đúng như vậy. Cách hiểu nào hợp lý nhất?', options: ['Giá chắc chắn tăng mạnh vì Fed không tăng lãi suất', 'Quyết định không có bất ngờ nên tự nó thường gây ít biến động; phần bất ngờ (nếu có) nằm ở thông cáo và họp báo', 'Nên mở lệnh lớn ngay khi tin ra vì đã biết kết quả', 'Giá chắc chắn giảm mạnh vì Fed không giảm lãi suất'], answer: 1, explain: 'Giá phản ứng với phần bất ngờ so với kỳ vọng, không phải với bản thân quyết định. Kết quả đúng kỳ vọng đã được phản ánh vào giá, nên không có gì chắc chắn tăng hay giảm. Vào lệnh lớn ngay khi tin ra là bỏ qua cú giật hai chiều và quy tắc không mở lệnh mới quanh giờ tin (bài 3.4).' }
    ],
    sources: [
      { title: 'Bitcoin Halving', url: 'https://bitcoin.org/en/halving', note: 'Bitcoin.org, tiếng Anh' },
      { title: 'Statement on the Approval of Spot Bitcoin Exchange-Traded Products', url: 'https://www.sec.gov/newsroom/speeches-statements/gensler-statement-spot-bitcoin-011023', note: 'SEC Mỹ, Chủ tịch Gary Gensler, 10/01/2024, tiếng Anh' },
      { title: 'Global Financial Stability Notes 2022/01: Cryptic Connections: Spillovers between Crypto and Equity Markets', url: 'https://www.imf.org/-/media/files/publications/gfs-notes/2022/english/gfsnea2022001.pdf', note: 'IMF, Tara Iyer, 1/2022, tiếng Anh' },
      { title: 'Federal Reserve issues FOMC statement (16/09/2026)', url: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm', note: 'Cục Dự trữ Liên bang Mỹ, 2026, tiếng Anh' },
      { title: 'Bitcoin price, market cap and supply', url: 'https://www.coingecko.com/en/coins/bitcoin', note: 'CoinGecko, dữ liệu tra cứu 27/09/2026, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c3-b3': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Dòng tiền vào ra sàn, nguồn cung stablecoin, ví cá voi, dữ liệu phái sinh và BTC dominance: đọc như bức tranh tâm lý đám đông, không phải tín hiệu mua bán.',
    goals: [
      'Giải thích và tính được netflow của sàn, BTC dominance',
      'Đọc open interest và funding như thước đo mức độ đông đúc của một phía',
      'Tránh 5 lỗi diễn giải dữ liệu on-chain phổ biến'
    ],
    blocks: [
      { type: 'p', text: 'Blockchain là sổ cái công khai. Bất kỳ ai cũng xem được lượng coin chuyển vào sàn, rút khỏi sàn, hay ví lớn di chuyển. Dữ liệu phái sinh (open interest, funding) thì do sàn công bố. Đây là nguồn thông tin mà thị trường chứng khoán truyền thống không có. Nhưng nó dễ bị diễn giải sai. Bài này dạy bạn đọc dữ liệu như <strong>bối cảnh</strong>, không phải nút mua bán.' },

      { type: 'h', text: 'Dòng tiền vào và ra sàn (exchange flows)' },
      { type: 'p', text: '<strong>Inflow</strong> là lượng coin chuyển từ ví cá nhân vào sàn. <strong>Outflow</strong> là lượng rút từ sàn ra ví. <strong>Netflow</strong> (dòng ròng) là chênh lệch giữa hai con số. Cách hiểu phổ biến:' },
      { type: 'list', items: [
        'Coin đổ vào sàn nhiều: tăng nguồn cung sẵn sàng bán, có thể có áp lực chốt lời.',
        'Coin rút khỏi sàn nhiều: người nắm giữ mang về tự lưu ký, áp lực bán ngắn hạn giảm.',
        'Stablecoin đổ vào sàn: sức mua tiềm năng đang chờ sẵn.'
      ] },
      { type: 'formula', title: 'Dòng ròng của sàn', expr: 'Netflow = Inflow − Outflow', vars: [['Netflow > 0', 'Coin vào sàn nhiều hơn ra'], ['Netflow < 0', 'Coin ra khỏi sàn nhiều hơn vào']] },
      { type: 'calc', title: 'Ví dụ netflow trong một ngày (số giả định)', rows: [
        ['BTC chuyển vào các sàn', '12.000 BTC'],
        ['BTC rút khỏi các sàn', '9.500 BTC'],
        ['Netflow', '12.000 − 9.500 = +2.500 BTC'],
        ['Giá trị ở giá giả định 80.000 USD', '2.500 × 80.000 = 200 triệu USD']
      ], result: 'Netflow +2.500 BTC cho thấy lượng coin sẵn sàng bán tăng trong ngày. Nó chưa nói gì chắc chắn về hướng giá ngày mai.' },
      { type: 'callout', tone: 'warn', title: 'Dữ liệu dòng tiền có sai số', text: 'Binance tự nêu một nguồn sai phổ biến: giao dịch chuyển nội bộ giữa các ví của cùng một sàn có thể bị đếm nhầm thành rút tiền, nhất là với bitcoin do cơ chế địa chỉ trả lại tiền thừa (change address). Nhãn ví sàn của các nhà cung cấp dữ liệu cũng không hoàn hảo. Hãy so sánh nhiều nguồn trước khi kết luận.' },

      { type: 'h', text: 'Stablecoin và ví cá voi' },
      { type: 'p', text: '<strong>Tổng cung stablecoin</strong> (USDT, USDC...) phản ánh lượng "đô la" nằm trong hệ sinh thái crypto. Tổng cung tăng đều trong nhiều tháng thường cho thấy tiền mới đang vào. Tổng cung co lại cho thấy tiền đang rút ra. Đây là chỉ báo chậm, dùng để đọc xu hướng vài tuần đến vài tháng, không dùng cho một lệnh trong ngày.' },
      { type: 'p', text: '<strong>Cá voi (whale)</strong> là ví nắm lượng coin rất lớn. Các công cụ cảnh báo có thể báo khi một ví chuyển hàng nghìn BTC. Nhưng một giao dịch lớn có thể là sàn tự chuyển ví lạnh sang ví nóng, quỹ ETF nhận hàng từ đơn vị lưu ký, hay giao dịch thỏa thuận ngoài sàn (OTC). Không phải mọi lần cá voi chuyển coin vào sàn đều là "sắp xả".' },
      { type: 'analogy', text: 'Đọc dữ liệu on-chain giống nhìn xe tải ra vào một kho hàng. Bạn thấy hàng đang dồn vào kho, nhưng không biết chắc chủ kho định bán ngay, trữ lại hay chỉ chuyển sang kho khác. Muốn chắc hơn, bạn phải nhìn thêm giá ngoài chợ.' },

      { type: 'h', text: 'Dữ liệu phái sinh: open interest và funding như bức tranh tâm lý' },
      { type: 'p', text: '<strong>Open interest (OI)</strong> là tổng số hợp đồng futures đang mở, chưa đóng. <strong>Funding rate</strong> là khoản thanh toán định kỳ giữa bên long và bên short của hợp đồng vĩnh cửu: dương thì long trả short, âm thì short trả long. Cơ chế chi tiết nằm ở bài 5.4. Ở đây bạn chỉ cần dùng chúng để trả lời: <strong>phía nào đang đông và dùng nhiều đòn bẩy?</strong>' },
      { type: 'table', head: ['Giá', 'Open interest', 'Cách đọc thường gặp'], rows: [
        ['Tăng', 'Tăng', 'Có tiền mới mở vị thế theo chiều tăng; nếu funding cũng cao, phía long có thể đang đông'],
        ['Tăng', 'Giảm', 'Chủ yếu là short đóng lệnh (short squeeze), lực mua mới yếu hơn'],
        ['Giảm', 'Tăng', 'Áp lực short mới tăng; nếu funding âm sâu, phía short có thể đang đông'],
        ['Giảm', 'Giảm', 'Long đóng lệnh hoặc bị thanh lý, thị trường đang xả đòn bẩy']
      ] },
      { type: 'figure', name: 'funding-mechanism', caption: 'Funding dương: giá perpetual cao hơn giá chỉ số, long trả short. Funding âm: ngược lại.' },
      { type: 'calc', title: 'Funding cực đoan tốn bao nhiêu (số giả định)', rows: [
        ['Vị thế long, giá trị danh nghĩa', '10.000 USDT'],
        ['Funding rate', '+0,05% mỗi 8 giờ (cao hơn nhiều mức cơ sở 0,01%)'],
        ['Số lần thanh toán mỗi ngày', '3 lần'],
        ['Chi phí mỗi ngày', '10.000 × 0,05% × 3 = 15 USDT'],
        ['Chi phí 30 ngày', '15 × 30 = 450 USDT (4,5% giá trị vị thế)']
      ], result: 'Funding cao kéo dài nghĩa là rất nhiều người sẵn sàng trả phí để giữ long. Đám đông càng đông một phía, cú quét thanh lý ngược chiều càng mạnh khi giá đảo.' },
      { type: 'tool', name: 'funding', note: 'Thử thay funding rate và số ngày giữ lệnh để thấy chi phí tăng nhanh thế nào.' },
      { type: 'callout', tone: 'risk', title: 'OI và funding không phải tín hiệu vào lệnh', text: 'Binance Academy nhấn mạnh OI tự nó không dự đoán hướng giá. Funding có thể cực đoan nhiều ngày trước khi đảo chiều. Short chỉ vì "funding quá cao" là cách nhanh để bị squeeze. Dùng dữ liệu này để <strong>giảm khối lượng hoặc đứng ngoài</strong> khi đám đông quá đông, còn điểm vào vẫn theo setup kỹ thuật.' },

      { type: 'h', text: 'BTC dominance: tiền đang chảy về đâu' },
      { type: 'formula', title: 'Tỷ lệ thống trị của bitcoin', expr: 'BTC dominance = Vốn hóa BTC ÷ Tổng vốn hóa thị trường crypto × 100%', vars: [['Vốn hóa BTC', 'Giá BTC × cung lưu hành'], ['Tổng vốn hóa', 'Gồm cả altcoin và stablecoin']] },
      { type: 'calc', title: 'Dominance tăng dù BTC đứng giá (số giả định)', rows: [
        ['Vốn hóa BTC', '1.680 tỷ USD'],
        ['Tổng vốn hóa thị trường', '2.800 tỷ USD'],
        ['Dominance ban đầu', '1.680 ÷ 2.800 = 60%'],
        ['Altcoin giảm, tổng vốn hóa mất 100 tỷ, BTC đứng giá', 'Tổng vốn hóa còn 2.700 tỷ'],
        ['Dominance mới', '1.680 ÷ 2.700 ≈ 62,2%']
      ], result: 'Dominance tăng không nhất thiết vì BTC tăng. Nó có thể chỉ vì altcoin giảm mạnh hơn. Luôn đọc dominance cùng với giá BTC.' },
      { type: 'p', text: 'Stablecoin cũng nằm trong tổng vốn hóa, nên khi tiền rút về stablecoin, dominance có thể giảm mà altcoin không hề tăng. Theo Binance Academy, giá BTC tăng cùng dominance tăng thường gợi ý một thị trường do bitcoin dẫn dắt; còn giai đoạn altcoin cùng vượt trội bitcoin thường được gọi là "mùa altcoin". Cả hai chỉ là cách mô tả, không phải lịch hẹn.' },

      { type: 'h', text: 'Công cụ miễn phí và nguyên tắc diễn giải' },
      { type: 'table', head: ['Loại dữ liệu', 'Nơi xem miễn phí (tham khảo)'], rows: [
        ['Giá, vốn hóa, cung, dominance', 'CoinGecko, CoinMarketCap, TradingView (mã BTC.D)'],
        ['OI, funding, tỷ lệ long/short', 'Binance Futures → Data → Trading Data; CoinGlass (tổng hợp OI, funding, thanh lý từ nhiều sàn)'],
        ['Tổng cung stablecoin', 'DefiLlama (mục Stablecoins); trang minh bạch của đơn vị phát hành'],
        ['Tra một địa chỉ, một giao dịch', 'Trình duyệt blockchain (block explorer) như mempool.space cho BTC, Etherscan cho ETH'],
        ['Dòng tiền sàn, ví lớn', 'Glassnode, CryptoQuant: có gói miễn phí nhưng giới hạn chỉ số và độ phân giải dữ liệu']
      ] },
      { type: 'p', text: 'Các công cụ trên chỉ là ví dụ để bạn biết bắt đầu từ đâu, không phải khuyến nghị. Mỗi nơi dùng nhãn ví và phương pháp tổng hợp riêng, nên cùng một chỉ số có thể lệch nhau giữa hai trang. Gói miễn phí thường chỉ có dữ liệu theo ngày hoặc bị trễ. Hãy ghi rõ nguồn và khung thời gian mỗi khi chép số vào nhật ký, và so ít nhất hai nguồn trước khi kết luận.' },
      { type: 'steps', items: [
        { title: 'Hỏi "so với cái gì?"', text: 'Một con số đơn lẻ vô nghĩa. So với trung bình 30 ngày hoặc 90 ngày của chính nó.' },
        { title: 'Tìm xác nhận từ giá', text: 'Dữ liệu on-chain chỉ có giá trị khi khớp với cấu trúc giá. Netflow âm mà giá vẫn tạo LH/LL thì giá thắng.' },
        { title: 'Dùng để điều chỉnh rủi ro', text: 'Funding cực đoan, OI tăng dựng đứng: giảm khối lượng, không nới dừng lỗ, cân nhắc đứng ngoài.' },
        { title: 'Ghi vào nhật ký', text: 'Ghi các chỉ số lúc vào lệnh để sau 30–50 lệnh bạn biết chúng có thực sự giúp ích cho hệ thống của mình không.' }
      ] },
      { type: 'p', text: '<strong>5 lỗi diễn giải phổ biến</strong> bạn nên tránh:' },
      { type: 'list', ordered: true, items: [
        '<strong>Coi một giao dịch lớn là ý định bán</strong>: chuyển ví nội bộ, lưu ký ETF, OTC đều trông giống "nạp lên sàn".',
        '<strong>Nhìn một ngày thay vì xu hướng</strong>: netflow và cung stablecoin chỉ có ý nghĩa khi duy trì nhiều ngày, nhiều tuần.',
        '<strong>Coi funding cao là tín hiệu short</strong>: funding có thể cao kéo dài trong xu hướng tăng mạnh.',
        '<strong>Chọn dữ liệu hợp với quan điểm sẵn có</strong>: thiên kiến xác nhận (xem bài 6.4). Hãy ghi ra dữ liệu ủng hộ và dữ liệu phản bác trước khi quyết định.',
        '<strong>Tin ảnh chụp màn hình trên mạng xã hội</strong>: tự mở công cụ gốc, kiểm tra khung thời gian và đơn vị.'
      ] },
      { type: 'scenario', title: 'Cảnh báo "cá voi chuyển 5.000 BTC vào sàn"', setup: 'Một tài khoản mạng xã hội đăng: "Cá voi vừa nạp 5.000 BTC lên sàn, chuẩn bị xả!" Bạn đang giữ một vị thế long có dừng lỗ theo cấu trúc.', bad: 'Hoảng sợ đóng lệnh long, rồi mở short đòn bẩy cao vì tin sắp sập. Hóa ra đó là sàn chuyển ví nội bộ. Giá tăng, lệnh short dừng lỗ, lệnh long đã đóng mất phần lãi.', good: 'Kiểm tra nhãn ví trên trình duyệt blockchain và công cụ on-chain, xem giá có phá cấu trúc không. Không có xác nhận từ giá thì giữ nguyên kế hoạch: dừng lỗ vẫn ở điểm vô hiệu, không hành động theo một dòng tweet.' }
    ],
    keyPoints: [
      'Netflow = Inflow − Outflow; coin vào sàn nhiều gợi ý nguồn cung sẵn sàng bán tăng, nhưng dữ liệu có sai số.',
      'Tổng cung stablecoin là chỉ báo chậm về tiền vào ra hệ sinh thái, dùng cho xu hướng vài tuần đến vài tháng.',
      'OI và funding cho biết phía nào đang đông và dùng nhiều đòn bẩy; chúng không tự dự đoán hướng giá.',
      'BTC dominance có thể tăng chỉ vì altcoin giảm; luôn đọc cùng giá BTC.',
      'Dữ liệu on-chain dùng để điều chỉnh rủi ro và phải được giá xác nhận.'
    ],
    practice: [
      'Mở Binance Futures → Data → Trading Data, ghi OI và funding BTCUSDT hôm nay, so với 7 ngày trước. Viết một câu mô tả phía nào đang đông hơn.',
      'Ghi BTC dominance và giá BTC mỗi ngày trong 2 tuần, rồi phân loại từng ngày vào một trong bốn tổ hợp tăng/giảm.',
      'Lần tới thấy tin "cá voi chuyển coin", tra địa chỉ trên trình duyệt blockchain và ghi lại ví đó có nhãn sàn hay không.'
    ],
    quiz: [
      { q: 'Trong một ngày, 8.000 ETH được nạp vào các sàn và 11.000 ETH được rút ra. Netflow là bao nhiêu và thường được hiểu thế nào?', options: ['+3.000 ETH, áp lực bán tăng', '+19.000 ETH, thanh khoản tăng', '−19.000 ETH, sàn đang mất khách', '−3.000 ETH, lượng coin sẵn sàng bán trên sàn giảm'], answer: 3, explain: 'Netflow = 8.000 − 11.000 = −3.000 ETH. Coin rút ra nhiều hơn vào, thường được hiểu là áp lực bán ngắn hạn giảm. Dấu dương sai chiều; 19.000 là cộng thay vì trừ.' },
      { q: 'Giá BTC tăng mạnh, OI tăng dựng đứng, funding +0,08% mỗi 8 giờ nhiều ngày liền. Hành động hợp lý nhất là gì?', options: ['Mở short ngay vì funding quá cao', 'Tăng đòn bẩy long vì OI xác nhận xu hướng', 'Không mở thêm long lớn, giảm khối lượng, giữ dừng lỗ theo kế hoạch vì phía long đang rất đông', 'Bỏ qua vì dữ liệu phái sinh không liên quan đến giá'], answer: 2, explain: 'Funding cao kéo dài và OI tăng mạnh cho thấy long đông và dùng nhiều đòn bẩy, rủi ro quét thanh lý cao. Short chỉ vì funding là đánh cược đảo chiều, có thể bị squeeze. Tăng đòn bẩy làm tăng rủi ro. Dữ liệu phái sinh có liên quan tới biến động, nên không nên bỏ qua.' },
      { q: 'Vốn hóa BTC đứng yên ở 1.500 tỷ USD, tổng vốn hóa giảm từ 2.500 tỷ xuống 2.400 tỷ vì altcoin giảm. Dominance thay đổi thế nào?', options: ['Từ 60% lên 62,5%', 'Từ 60% xuống 57,5%', 'Không đổi 60%', 'Từ 62,5% xuống 60%'], answer: 0, explain: '1.500 ÷ 2.500 = 60%; 1.500 ÷ 2.400 = 62,5%. Dominance tăng dù BTC đứng giá. Hai phương án giảm sai chiều, còn "không đổi" bỏ qua việc mẫu số nhỏ lại.' },
      { q: 'Vì sao không nên coi mọi cảnh báo "cá voi nạp coin lên sàn" là tín hiệu bán?', options: ['Vì cá voi không bao giờ bán', 'Vì đó có thể là sàn chuyển ví nội bộ, quỹ lưu ký hoặc giao dịch OTC, và cần giá xác nhận', 'Vì giá luôn tăng sau khi cá voi nạp coin', 'Vì dữ liệu blockchain là bí mật'], answer: 1, explain: 'Giao dịch lớn có nhiều mục đích, nhãn ví không hoàn hảo. Cá voi có bán, dữ liệu blockchain là công khai, và giá không "luôn" tăng sau sự kiện nào cả.' }
    ],
    sources: [
      { title: 'The Power of Netflow: Understanding the Indicator and How it Underscores Binance’s Strength', url: 'https://www.binance.com/en/blog/markets/the-power-of-netflow-understanding-the-indicator-and-how-it-underscores-binances-strength-1574629156748725279', note: 'Binance Blog, 28/02/2024, tiếng Anh' },
      { title: 'What Is Open Interest?', url: 'https://www.binance.com/en/academy/articles/what-is-open-interest', note: 'Binance Academy, tiếng Anh' },
      { title: 'What Is BTC Dominance?', url: 'https://www.binance.com/en/academy/articles/what-is-btc-dominance', note: 'Binance Academy, tiếng Anh' },
      { title: 'Introduction to Binance Futures Funding Rates', url: 'https://www.binance.com/en/support/faq/detail/360033525031', note: 'Binance FAQ, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c3-b4': {
    duration: 8,
    level: 'Cơ bản',
    summary: 'Lịch tin vĩ mô theo giờ Việt Nam, lịch unlock và niêm yết, "mua tin đồn bán sự thật", bài học 10/10/2025 và bộ quy tắc giao dịch quanh tin để không bị FOMO.',
    goals: [
      'Lập lịch tin vĩ mô hàng tháng theo giờ Việt Nam, tính đúng giờ mùa hè và mùa đông của Mỹ',
      'Áp dụng bộ quy tắc cụ thể trước, trong và sau tin lớn',
      'Kiểm chứng nguồn tin và nhận diện nhóm kèo, tin giả trên mạng xã hội'
    ],
    blocks: [
      { type: 'p', text: 'Nhiều tài khoản bị xóa sổ không phải trong ngày bình thường, mà trong vài phút sau một bản tin. Tin tức làm spread giãn rộng, sổ lệnh mỏng đi, giá giật hai chiều quét dừng lỗ. Bài này cho bạn một lịch cụ thể và một bộ quy tắc để đối xử với tin tức như <strong>một rủi ro cần quản lý</strong>, không phải một cơ hội phải chớp.' },

      { type: 'h', text: 'Lịch tin vĩ mô theo giờ Việt Nam' },
      { type: 'p', text: 'Hai loại tin Mỹ ảnh hưởng mạnh nhất lên crypto là <strong>CPI</strong> (chỉ số giá tiêu dùng, thước đo lạm phát) và <strong>quyết định lãi suất của FOMC</strong>. Báo cáo việc làm (Employment Situation, thường gọi là NFP) cũng gây biến động lớn. Mỹ đổi giờ hai lần mỗi năm: năm 2026 giờ mùa hè (EDT) kéo dài từ 08/03 đến 01/11, sau đó là giờ mùa đông (EST). Giờ Việt Nam (UTC+7) không đổi, nên giờ tin theo giờ Việt Nam lệch đi 1 tiếng.' },
      { type: 'table', head: ['Sự kiện', 'Giờ Mỹ (ET)', 'Giờ VN khi Mỹ theo giờ mùa hè', 'Giờ VN khi Mỹ theo giờ mùa đông', 'Lịch còn lại năm 2026 (giờ VN)'], rows: [
        ['CPI Mỹ (BLS)', '08:30', '19:30', '20:30', '14/10 lúc 19:30; 10/11 và 10/12 lúc 20:30'],
        ['Báo cáo việc làm (BLS)', '08:30', '19:30', '20:30', '02/10 lúc 19:30; 06/11 và 04/12 lúc 20:30'],
        ['Quyết định lãi suất FOMC', '14:00', '01:00 sáng hôm sau', '02:00 sáng hôm sau', 'Họp 27–28/10: 01:00 ngày 29/10; họp 8–9/12: 02:00 ngày 10/12'],
        ['Họp báo Chủ tịch Fed', '14:30', '01:30 sáng hôm sau', '02:30 sáng hôm sau', 'Ngay sau mỗi quyết định FOMC'],
        ['Funding Binance (mặc định)', '—', '07:00, 15:00, 23:00', '07:00, 15:00, 23:00', 'Mỗi ngày (sàn có thể đổi chu kỳ khi biến động mạnh)'],
        ['Chứng khoán Mỹ mở cửa', '09:30', '20:30', '21:30', 'Các ngày giao dịch trong tuần']
      ] },
      { type: 'callout', tone: 'tip', title: 'Cách lập lịch mỗi tháng', text: 'Đầu mỗi tháng, mở lịch chính thức của BLS (CPI, việc làm) và lịch FOMC trên trang Fed. Ghi vào lịch điện thoại theo giờ Việt Nam, đặt nhắc trước 1 giờ. Đừng dựa vào ảnh lịch tin do người khác chụp lại vì dễ sai giờ khi Mỹ đổi giờ.' },
      { type: 'p', text: 'Ngoài tin vĩ mô, crypto còn có lịch riêng: <strong>lịch mở khóa token</strong> (xem bài 3.1), <strong>niêm yết</strong> hoặc hủy niêm yết trên sàn lớn, nâng cấp mạng lưới, và các phán quyết pháp lý. Với tin pháp lý ở Việt Nam, hãy đọc văn bản gốc trên cổng thông tin Chính phủ (xem bài 1.6).' },

      { type: 'h', text: '"Mua tin đồn, bán sự thật" và vì sao giá phản ứng ngược' },
      { type: 'p', text: 'Giá phản ứng với <strong>phần bất ngờ so với kỳ vọng</strong>, không phải với tin tốt hay xấu. Nếu thị trường đã chờ một tin tốt nhiều tuần, người mua sớm đã có lãi và chờ đúng ngày tin ra để bán. Đó là hiện tượng "mua tin đồn, bán sự thật" (buy the rumor, sell the news).' },
      { type: 'list', items: [
        '<strong>Niêm yết trên sàn lớn</strong>: token thường tăng mạnh khi có tin đồn hoặc thông báo, rồi nhiều trường hợp giảm sau khi giao dịch mở vì người mua sớm chốt lời.',
        '<strong>Sự kiện được chờ từ lâu</strong>: halving, nâng cấp mạng, ETF. Ngày diễn ra chưa chắc là ngày tăng giá.',
        '<strong>Tin vĩ mô</strong>: CPI "đúng kỳ vọng" thường gây ít biến động; CPI lệch xa dự báo mới tạo cú giật lớn. Hướng của cú giật đầu tiên thường bị đảo ngược trong vài phút.'
      ] },
      { type: 'figure', name: 'emotion-cycle', caption: 'Vòng cảm xúc: hưng phấn nhất thường gần đỉnh, tuyệt vọng nhất thường gần đáy. Tin tức khuếch đại mọi pha.' },

      { type: 'h', text: 'Bài học từ ngày 10/10/2025' },
      { type: 'example', title: 'Cú sập sau thông báo thuế quan', text: 'Tối thứ Sáu 10/10/2025 (giờ Mỹ), sau thông báo thuế quan 100% với hàng nhập khẩu Trung Quốc, thị trường crypto chứng kiến đợt thanh lý lớn nhất lịch sử: khoảng <strong>19 tỷ USD vị thế đòn bẩy bị thanh lý trong 24 giờ</strong>, hơn 1,6 triệu tài khoản bị thanh lý. Theo CoinGecko, giai đoạn dữ dội nhất rơi vào khoảng 20:50–21:30 UTC, tức khoảng 03:50–04:30 sáng thứ Bảy 11/10 theo giờ Việt Nam, lúc phần lớn trader Việt đang ngủ. Một số chiến lược tưởng đã phòng hộ cũng bị đóng qua cơ chế tự động giảm đòn bẩy (ADL, xem bài 5.3).' },
      { type: 'list', items: [
        'Tin lớn có thể đến <strong>ngoài lịch</strong>, vào cuối tuần, lúc bạn ngủ. Chỉ có dừng lỗ đặt sẵn và đòn bẩy thấp bảo vệ bạn.',
        'Thanh khoản mỏng vào tối thứ Sáu và cuối tuần làm cú giật mạnh hơn.',
        'Tài khoản cross dùng chung toàn bộ số dư làm ký quỹ, một vị thế thua kéo theo cả ví.'
      ] },
      { type: 'callout', tone: 'risk', title: 'Dừng lỗ có thể khớp tệ hơn giá bạn đặt', text: 'Trong tin lớn, lệnh stop-market vẫn khớp nhưng có thể trượt xa. Lệnh stop-limit có thể không khớp khi giá lao qua giá limit, để vị thế tiếp tục lỗ. Khoản lỗ thực tế có thể vượt 1R. Cách phòng duy nhất chắc chắn là khối lượng nhỏ hoặc không có vị thế khi tin ra.' },
      { type: 'calc', title: 'Trượt giá khi tin ra (số giả định)', rows: [
        ['Tài khoản', '10.000 USDT, rủi ro 1% = 100 USDT'],
        ['Long BTC giá vào', '80.000 USDT'],
        ['Dừng lỗ (stop-market)', '79.200 USDT, khoảng cách 800 USDT'],
        ['Khối lượng', '100 ÷ 800 = 0,125 BTC'],
        ['CPI ra, giá lao xuống, lệnh dừng lỗ khớp tại', '78.900 USDT'],
        ['Lỗ thực tế', '(80.000 − 78.900) × 0,125 = 137,5 USDT'],
        ['Tính theo R', '137,5 ÷ 100 = 1,375R']
      ], result: 'Kế hoạch mất 1R, thực tế mất gần 1,4R. Nếu giữ lệnh qua tin, hãy giảm khối lượng để khoản lỗ khi trượt giá vẫn nằm trong giới hạn.' },

      { type: 'h', text: 'Bộ quy tắc giao dịch quanh tin' },
      { type: 'steps', items: [
        { title: 'Trước tin 30–60 phút', text: 'Không mở lệnh mới. Với lệnh đang mở: hoặc đóng, hoặc giảm khối lượng sao cho lỗ khi trượt 1,5 lần khoảng dừng lỗ vẫn dưới 1% tài khoản. Kiểm tra dừng lỗ là stop-market và đã đặt trên sàn.' },
        { title: 'Khi tin ra', text: 'Không mở lệnh mới trong ít nhất 30 phút đầu (bộ chuẩn bài 5.9). Không mua đuổi nến xanh đầu tiên hay bán đuổi nến đỏ đầu tiên. Không dời dừng lỗ ra xa.' },
        { title: 'Sau tin 30–60 phút', text: 'Chờ nến khung 15 phút hoặc 1 giờ đóng. Xem giá đã chọn hướng, phá hay giữ vùng quan trọng chưa. Chỉ vào nếu có setup theo hệ thống, với khối lượng tính từ dừng lỗ mới.' },
        { title: 'Tin ngoài lịch', text: 'Tin chiến tranh, thuế quan, sàn sập: không giao dịch theo tiêu đề. Kiểm tra dừng lỗ, giảm đòn bẩy, đợi thị trường ổn định.' },
        { title: 'Ghi nhật ký', text: 'Ghi lại tin, phản ứng giá và cảm xúc của bạn. Sau vài tháng bạn sẽ biết mình có nên giao dịch quanh tin hay không.' }
      ] },
      { type: 'checklist', title: 'Kiểm tra trước ngày có tin lớn', items: [
        'Đã ghi giờ tin theo giờ Việt Nam (đã tính giờ mùa hè/mùa đông của Mỹ)',
        'Mọi vị thế đang mở đều có dừng lỗ stop-market đặt sẵn trên sàn',
        'Đòn bẩy và khối lượng đủ nhỏ để chịu được trượt giá',
        'Không dùng chế độ cross toàn ví cho vị thế giữ qua tin',
        'Đã quyết định trước: đứng ngoài hay giữ lệnh, không quyết định lúc tin ra'
      ] },

      { type: 'h', text: 'Kiểm chứng nguồn tin, mạng xã hội và nhóm kèo' },
      { type: 'p', text: 'Tin giả, ảnh chụp màn hình chỉnh sửa và tài khoản mạo danh xuất hiện rất nhanh sau mỗi sự kiện. Trước khi hành động theo một tin, hãy tự hỏi ba câu:' },
      { type: 'list', ordered: true, items: [
        '<strong>Nguồn gốc ở đâu?</strong> Trang chính thức của Fed, BLS, SEC, thông báo trên trang của sàn, văn bản trên cổng Chính phủ. Tài khoản mạng xã hội chỉ là người kể lại.',
        '<strong>Thời điểm nào?</strong> Tin cũ bị đăng lại như tin mới là chiêu phổ biến. Xem ngày đăng gốc.',
        '<strong>Ai được lợi?</strong> Người đăng có đang giữ coin đó, nhận tiền quảng bá, hay bán khóa học "tín hiệu" không?'
      ] },
      { type: 'callout', tone: 'risk', title: 'Nhóm kèo và "chuyên gia" gọi vốn', text: 'Nhóm Telegram, Zalo, Facebook hô "kèo x10", "tin nội bộ niêm yết" thường là nơi người tổ chức mua trước rồi bán cho thành viên (pump and dump). Không ai chia sẻ miễn phí tin nội bộ có giá trị thật. Tham gia nhóm gọi vốn, ủy thác, hay hứa lãi cố định có thể khiến bạn mất trắng. Xem thêm bài 1.5.' },
      { type: 'scenario', title: 'Đêm công bố FOMC', setup: 'Đêm 28/10/2026, FOMC công bố lúc 01:00 sáng 29/10 giờ Việt Nam. Bạn đang long BTC có lãi. Nhóm chat bàn tán "chắc chắn giảm lãi suất, bơm mạnh".', bad: 'Nghe nhóm chat, nhồi thêm long với đòn bẩy 25x lúc 00:55, không đặt dừng lỗ vì "chắc chắn tăng". Tin ra khác kỳ vọng, giá giật 4% xuống trong 2 phút. Ở 25x, giá chỉ cần đi ngược khoảng 3,5% là chạm giá thanh lý, nên vị thế bị thanh lý. Lên nhóm hỏi thì trưởng nhóm bảo "cá mập đánh úp".', good: 'Từ chiều đã quyết định: chốt 50% vị thế trước 00:00, dời dừng lỗ phần còn lại về hòa vốn, không mở lệnh mới. Tắt nhóm chat, đi ngủ. Sáng hôm sau đọc thông cáo trên trang Fed, xem nến H1 và H4 rồi mới cân nhắc lệnh mới theo setup.' }
    ],
    keyPoints: [
      'CPI và báo cáo việc làm Mỹ ra lúc 19:30 giờ VN khi Mỹ theo giờ mùa hè, 20:30 khi theo giờ mùa đông; FOMC công bố lúc 01:00 hoặc 02:00 sáng hôm sau.',
      'Giá phản ứng với phần bất ngờ so với kỳ vọng; "mua tin đồn, bán sự thật" thường xảy ra với niêm yết và sự kiện được chờ lâu.',
      'Ngày 10/10/2025: khoảng 19 tỷ USD bị thanh lý trong 24 giờ, xảy ra lúc rạng sáng giờ VN; chỉ dừng lỗ đặt sẵn và đòn bẩy thấp bảo vệ bạn.',
      'Quy tắc cốt lõi: không mở lệnh mới 30–60 phút trước tin, không mở lệnh mới trong ít nhất 30 phút sau tin, chờ nến đóng.',
      'Kiểm chứng nguồn gốc, thời điểm và động cơ người đăng trước khi hành động theo bất kỳ tin nào.'
    ],
    practice: [
      'Tạo lịch tin tháng tới trong điện thoại: CPI, báo cáo việc làm, FOMC theo giờ Việt Nam, có nhắc trước 1 giờ.',
      'Viết ra quy tắc cá nhân quanh tin của bạn (bao nhiêu phút trước và sau, giảm khối lượng bao nhiêu) và dán cạnh màn hình.',
      'Chọn một lần công bố CPI gần nhất, mở biểu đồ BTC khung 5 phút, ghi lại biên độ 30 phút đầu và hướng giá có bị đảo không.'
    ],
    quiz: [
      { q: 'CPI Mỹ tháng 11/2026 công bố lúc 08:30 giờ miền Đông Mỹ ngày 10/12/2026. Theo giờ Việt Nam là mấy giờ?', options: ['19:30 ngày 10/12', '08:30 ngày 11/12', '20:30 ngày 10/12', '21:30 ngày 10/12'], answer: 2, explain: 'Sau 01/11/2026 Mỹ theo giờ mùa đông (EST, UTC−5), chênh 12 giờ với Việt Nam: 08:30 + 12 = 20:30. 19:30 là giờ khi Mỹ theo giờ mùa hè. 21:30 là giờ mở cửa chứng khoán Mỹ mùa đông. 08:30 hôm sau là cộng sai.' },
      { q: 'Tài khoản 10.000 USDT, rủi ro 1%. Long BTC tại 80.000, dừng lỗ stop-market 79.000. Tin ra, lệnh khớp tại 78.500. Lỗ thực tế bao nhiêu R?', options: ['1R', '2R', '1,25R', '1,5R'], answer: 3, explain: 'Khối lượng = 100 ÷ 1.000 = 0,1 BTC. Lỗ thực tế = (80.000 − 78.500) × 0,1 = 150 USDT = 1,5R. 1R là lỗ theo kế hoạch, bỏ qua trượt giá. 1,25R và 2R tính sai khoảng trượt.' },
      { q: 'Một token được đồn sẽ niêm yết trên sàn lớn, đã tăng 80% trong một tuần. Sáng nay sàn xác nhận niêm yết. Theo nguyên tắc "mua tin đồn, bán sự thật", rủi ro chính là gì?', options: ['Giá chắc chắn tăng tiếp vì tin đã được xác nhận', 'Người mua sớm đã lãi lớn và có thể chốt lời khi tin được xác nhận, làm giá giảm', 'Sàn sẽ hủy niêm yết ngay', 'Không có rủi ro vì sàn lớn đã thẩm định'], answer: 1, explain: 'Tin đã được kỳ vọng và phản ánh vào giá; người mua sớm có động cơ bán. Tin xác nhận không đảm bảo giá tăng tiếp. Hủy niêm yết ngay là không có căn cứ. Sàn niêm yết không bảo đảm giá.' },
      { q: 'Theo bộ quy tắc giao dịch quanh tin, 20 phút trước giờ FOMC bạn nên làm gì với ý tưởng lệnh mới vừa thấy?', options: ['Không mở lệnh mới; chờ sau tin 30–60 phút, nến đóng và setup còn hợp lệ mới cân nhắc', 'Vào bằng lệnh stop-limit để kiểm soát giá', 'Vào ngay với khối lượng gấp đôi để kịp tin', 'Vào lệnh không dừng lỗ để tránh bị quét'], answer: 0, explain: 'Quy tắc là không mở lệnh mới trong 30–60 phút trước tin. Khối lượng gấp đôi làm tăng rủi ro. Stop-limit có thể không khớp khi giá lao qua. Không dừng lỗ trong tin lớn là cách nhanh nhất để mất khoản lỗ không giới hạn.' }
    ],
    sources: [
      { title: 'Schedule of Releases for the Consumer Price Index', url: 'https://www.bls.gov/schedule/news_release/cpi.htm', note: 'Cục Thống kê Lao động Mỹ (BLS), lịch 2026, tiếng Anh' },
      { title: 'Schedule of Releases for the Employment Situation', url: 'https://www.bls.gov/schedule/news_release/empsit.htm', note: 'BLS, lịch 2026, tiếng Anh' },
      { title: 'Meeting calendars and information (FOMC)', url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm', note: 'Cục Dự trữ Liên bang Mỹ, lịch 2026, tiếng Anh' },
      { title: 'October 10 Crypto Crash Explained', url: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained', note: 'CoinGecko Learn, tiếng Anh' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
