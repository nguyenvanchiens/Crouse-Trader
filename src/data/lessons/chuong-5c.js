const lessons = {
  'c5-b9': {
    duration: 14,
    level: 'Trung cấp',
    summary: 'Một bộ quy tắc kỷ luật futures viết sẵn có con số cụ thể, lý do toán học và tâm lý của từng quy tắc, cùng quy trình mở lệnh từng bước trên Binance Futures.',
    goals: [
      'Viết được bộ quy tắc futures cá nhân có con số: rủi ro mỗi lệnh, đòn bẩy thật tối đa, giới hạn lỗ ngày và tuần, số lệnh tối đa',
      'Hiểu vì sao mỗi quy tắc tồn tại, bằng toán (chuỗi thua, mức sụt vốn) và bằng tâm lý (cảm xúc sau thua lỗ)',
      'Mở một lệnh futures đúng quy trình trên giao diện Binance: isolated, one-way, đòn bẩy, khối lượng tính sẵn, TP/SL đặt cùng lúc, kiểm tra giá thanh lý',
      'Dùng checklist trước lệnh để chặn các lệnh cảm tính trước khi chúng xảy ra'
    ],
    blocks: [
      { type: 'h', text: 'Vì sao phải viết quy tắc ra giấy trước khi trade' },
      { type: 'p', text: 'Phần lớn tài khoản futures không cháy vì một phân tích sai. Chúng cháy vì một chuỗi quyết định được đưa ra trong lúc nóng: vừa thua xong muốn gỡ, vừa thắng xong thấy mình giỏi, thấy nến xanh dài thì sợ lỡ tàu. Kahneman và Tversky (1979) chỉ ra con người đau vì mất mát mạnh hơn nhiều so với vui vì được lợi cùng số tiền. Vì vậy khi đang lỗ, ta có xu hướng liều hơn để tránh phải chốt lỗ.' },
      { type: 'p', text: 'Cách duy nhất chống lại phản xạ này là quyết định trước, lúc còn bình tĩnh. Nếu một quy tắc cần bạn "cân nhắc tùy tình huống", nó không phải quy tắc. Quy tắc tốt phải có con số và có điều kiện rõ ràng để kiểm tra được: đúng hoặc sai.' },
      { type: 'callout', tone: 'risk', title: 'Thực tế về người trade nhỏ lẻ', text: 'ESMA (2018) ghi nhận 74–89% tài khoản nhà đầu tư nhỏ lẻ giao dịch CFD thua lỗ. Nghiên cứu "Day Trading for a Living?" (2019) cho thấy 97% người kiên trì day trade hợp đồng tương lai ở Brazil hơn 300 ngày bị lỗ. Futures crypto có đòn bẩy cao hơn và chạy 24/7. Bộ quy tắc không đảm bảo bạn thắng, nó chỉ giúp bạn sống sót đủ lâu để học.' },

      { type: 'h', text: 'Bộ quy tắc mẫu: 12 điều có con số' },
      { type: 'p', text: 'Dưới đây là một bộ quy tắc mẫu cho người mới đến trung cấp, tài khoản giả định 1.000 USDT. Bạn có thể chỉnh con số cho hợp với mình, nhưng chỉ chỉnh vào cuối tuần, khi không có lệnh mở, và theo hướng an toàn hơn nếu đang thua.' },
      { type: 'table', head: ['#', 'Quy tắc', 'Con số mẫu'], rows: [
        ['1', 'Rủi ro tối đa mỗi lệnh (1R)', '0,5–1% vốn (5–10 USDT với tài khoản 1.000 USDT)'],
        ['2', 'Đòn bẩy thật tối đa (giá trị danh nghĩa tất cả vị thế ÷ tổng vốn)', '3x'],
        ['3', 'Đòn bẩy trên thanh trượt của sàn', 'Tối đa 5x–10x, chỉ để giảm ký quỹ khóa, không để tăng khối lượng'],
        ['4', 'Chế độ ký quỹ', 'Isolated mặc định, one-way mode'],
        ['5', 'Không có dừng lỗ thì không mở lệnh', 'Dừng lỗ stop-market đặt cùng lúc với lệnh vào'],
        ['6', 'Lỗ tối đa trong ngày', '2R thì đóng máy, nghỉ đến hôm sau'],
        ['7', 'Lỗ tối đa trong tuần', '5R thì nghỉ đến tuần sau'],
        ['8', 'Số lệnh tối đa mỗi ngày', '3 lệnh (kể cả lệnh hòa vốn)'],
        ['9', 'Thua 2 lệnh liên tiếp', 'Dừng trong ngày, dù chưa chạm 2R'],
        ['10', 'Tin vĩ mô lớn (CPI, FOMC)', 'Không mở lệnh mới trong 30 phút trước và 30 phút sau giờ công bố'],
        ['11', 'Vị thế mở cùng lúc', 'Tối đa 2, tổng rủi ro mở không quá 2R'],
        ['12', 'Không bao giờ dời dừng lỗ ra xa, không nhồi thêm vào lệnh đang lỗ', 'Không có ngoại lệ']
      ] },
      { type: 'p', text: '<strong>Quy tắc 1 và 2: rủi ro nhỏ và đòn bẩy thật thấp.</strong> Với rủi ro 1% mỗi lệnh, 10 lệnh thua liên tiếp chỉ làm vốn giảm khoảng 9,6% (0,99<sup>10</sup> ≈ 0,904). Với rủi ro 5%, cùng chuỗi đó làm mất khoảng 40%, và bạn cần lãi khoảng 67% mới về lại vốn cũ. Đòn bẩy thật 3x có nghĩa: tổng giá trị danh nghĩa các vị thế không quá 3.000 USDT khi vốn là 1.000 USDT.' },
      { type: 'p', text: '<strong>Quy tắc 3: đòn bẩy trên thanh trượt khác đòn bẩy thật.</strong> Con số 20x hay 50x trên sàn chỉ quyết định bạn phải khóa bao nhiêu ký quỹ và giá thanh lý nằm ở đâu. Khối lượng lệnh phải được tính từ khoảng cách dừng lỗ, không từ thanh trượt. Để thanh trượt ở mức 5x–10x giúp giá thanh lý nằm rất xa dừng lỗ. Lưu ý thêm: theo Binance, từ ngày 7/12/2025 tài khoản futures mới mở trong 30 ngày đầu không được dùng đòn bẩy trên 20x.' },
      { type: 'p', text: '<strong>Quy tắc 6, 7, 9: giới hạn lỗ ngày, tuần và chuỗi thua.</strong> Đây là "cầu dao điện" của tài khoản. Toán học: nếu bạn chạm giới hạn 5R/tuần (5% vốn) cả 4 tuần liền, tài khoản giảm khoảng 18,5% (1 − 0,95<sup>4</sup>). Đau, nhưng vẫn còn hơn 80% vốn để học tiếp. Không có cầu dao, một ngày tồi tệ có thể lấy đi 20–30%. Tâm lý: sau 2 lệnh thua liên tiếp, bạn không còn là người đã lập kế hoạch sáng nay. Bạn là người muốn gỡ. Nghỉ là cách rẻ nhất để cắt vòng xoáy đó.' },
      { type: 'calc', title: 'Chuỗi thua xảy ra thường hơn bạn nghĩ (giả định tỷ lệ thắng 40%)', rows: [
        ['Xác suất thua 2 lệnh liên tiếp (tại một thời điểm bất kỳ)', '0,6 × 0,6 = 0,36 → 36%'],
        ['Xác suất thua 5 lệnh liên tiếp', '0,6<sup>5</sup> ≈ 0,078 → khoảng 7,8%'],
        ['Trong 100 lệnh, xác suất gặp ít nhất một chuỗi 5 lệnh thua', 'Khoảng 97,6% (tính bằng quy hoạch động)'],
        ['Trong 100 lệnh, xác suất gặp ít nhất một chuỗi 8 lệnh thua', 'Khoảng 49%'],
        ['Với rủi ro 1%/lệnh, chuỗi 8 lệnh thua làm mất', '1 − 0,99<sup>8</sup> ≈ 7,7% vốn'],
        ['Với rủi ro 10%/lệnh, cùng chuỗi đó làm mất', '1 − 0,9<sup>8</sup> ≈ 57% vốn']
      ], result: 'Chuỗi thua dài gần như chắc chắn sẽ đến. Bạn không tránh được nó, bạn chỉ chọn được nó đau bao nhiêu. Rủi ro 0,5–1% là mức để chuỗi thua tệ nhất vẫn chỉ là một vết xước.' },
      { type: 'p', text: '<strong>Quy tắc 8: tối đa 3 lệnh mỗi ngày.</strong> Setup tốt hiếm, và mỗi lệnh còn tốn phí hai chiều: giả định phí taker 0,05% mỗi chiều, một vị thế danh nghĩa 2.000 USDT tốn khoảng 2 USDT phí vào và ra, tức 0,2R nếu R là 10 USDT. Mười lệnh như vậy mỗi ngày là 2R phí, bằng cả giới hạn lỗ ngày.' },
      { type: 'p', text: '<strong>Quy tắc 10: tránh 30 phút quanh tin lớn.</strong> CPI Mỹ công bố lúc 19:30 giờ Việt Nam khi Mỹ theo giờ mùa hè (20:30 khi theo giờ mùa đông). Quyết định lãi suất FOMC ra lúc 01:00 sáng giờ Việt Nam (02:00 mùa đông). Quy tắc cụ thể: CPI mùa hè thì không mở lệnh mới từ 19:00 đến 20:00.' },

      { type: 'h', text: 'Tính trước khi bấm: khối lượng, đòn bẩy thật, giá thanh lý' },
      { type: 'p', text: 'Mọi con số của lệnh phải có trước khi bạn mở giao diện đặt lệnh. Thứ tự luôn là: điểm vô hiệu (dừng lỗ) → số tiền rủi ro → khối lượng → kiểm tra đòn bẩy thật → chọn đòn bẩy trên thanh trượt → kiểm tra giá thanh lý. Không bao giờ đi ngược: chọn 20x rồi xem "vào được bao nhiêu".' },
      { type: 'formula', title: 'Khối lượng theo rủi ro', expr: 'Khối lượng = Số tiền rủi ro ÷ |Giá vào − Giá dừng lỗ|', vars: [['Số tiền rủi ro', 'Vốn × % rủi ro (1R)'], ['Giá vào', 'Giá dự kiến khớp'], ['Giá dừng lỗ', 'Điểm vô hiệu của ý tưởng, cộng vùng đệm']], note: 'Làm tròn khối lượng XUỐNG theo bước khối lượng của sàn. Làm tròn lên là âm thầm tăng rủi ro.' },
      { type: 'calc', title: 'Ví dụ: long BTC (giá giả định)', rows: [
        ['Vốn, rủi ro 1%', '1.000 USDT × 1% = 10 USDT'],
        ['Giá vào, dừng lỗ', '80.000 và 78.800 → khoảng cách 1.200 USDT (1,5%)'],
        ['Khối lượng lý thuyết', '10 ÷ 1.200 ≈ 0,00833 BTC → làm tròn xuống 0,008 BTC'],
        ['Giá trị danh nghĩa', '0,008 × 80.000 = 640 USDT'],
        ['Đòn bẩy thật', '640 ÷ 1.000 = 0,64x (dưới giới hạn 3x)'],
        ['Lỗ nếu chạm dừng lỗ', '0,008 × 1.200 = 9,6 USDT'],
        ['Phí ước tính hai chiều (giả định taker 0,05%)', '640 × 0,05% × 2 = 0,64 USDT'],
        ['Tổng lỗ nếu thua', '9,6 + 0,64 ≈ 10,24 USDT, xấp xỉ 1R'],
        ['Chọn thanh trượt 5x, isolated', 'Ký quỹ ban đầu = 640 ÷ 5 = 128 USDT'],
        ['Giá thanh lý gần đúng (MMR giả định 0,4%)', '80.000 × (1 − 1/5 + 0,004) = 64.320'],
        ['So sánh', 'Dừng lỗ cách giá vào 1,5%, giá thanh lý cách khoảng 19,6%']
      ], result: 'Dừng lỗ sẽ kích hoạt rất lâu trước khi vị thế đến gần giá thanh lý. Đó mới là lệnh đúng quy tắc: thanh lý chỉ là con số dự phòng, không bao giờ là "dừng lỗ" của bạn.' },
      { type: 'p', text: 'Quy tắc đòn bẩy thật 3x còn có tác dụng lọc lệnh. Với rủi ro 10 USDT, nếu dừng lỗ chỉ cách 0,5% thì giá trị danh nghĩa là 2.000 USDT (2x), vẫn được. Nếu dừng lỗ chỉ cách 0,3%, danh nghĩa thành khoảng 3.333 USDT, vượt 3x. Khi đó bạn giảm rủi ro xuống 0,8% hoặc bỏ lệnh.' },
      { type: 'tool', name: 'position-size', note: 'Nhập vốn, % rủi ro, giá vào và giá dừng lỗ của lệnh bạn định vào. Sau đó chia giá trị danh nghĩa cho vốn để kiểm tra đòn bẩy thật không vượt 3x.' },
      { type: 'tool', name: 'liquidation', note: 'Nhập giá vào và đòn bẩy trên thanh trượt. Giá thanh lý phải cách giá vào ít nhất gấp 3 lần khoảng cách dừng lỗ. Nếu không, hạ đòn bẩy trên thanh trượt.' },

      { type: 'h', text: 'Quy trình mở lệnh từng bước trên Binance Futures' },
      { type: 'p', text: 'Các bước dưới đây đối chiếu với tài liệu hỗ trợ chính thức của Binance (xem mục nguồn). Hãy làm lần đầu trên Binance Demo Trading (tiền ảo, giao diện thật) trước khi dùng tiền thật.' },
      { type: 'steps', items: [
        { title: '1. Chọn đúng loại hợp đồng', text: 'Vào mục Phái sinh (Derivatives), chọn <strong>USDⓈ-M Futures</strong>, chọn cặp perpetual (ví dụ BTCUSDT Perpetual).' },
        { title: '2. Đặt chế độ vị thế one-way', text: 'Biểu tượng cài đặt góc trên bên phải → Features (Tính năng) → Position Mode → chọn <strong>One-Way Mode</strong>. Theo Binance, không đổi được chế độ khi đang có vị thế hoặc lệnh chờ, nên làm việc này một lần từ đầu.' },
        { title: '3. Chuyển sang Isolated', text: 'Bấm nút chế độ ký quỹ (mặc định hiện chữ Cross) ở phía trên khung đặt lệnh → chọn <strong>Isolated</strong> → Confirm. Binance nói rõ mọi hợp đồng mặc định là Cross và không đổi được khi đang có lệnh chờ hoặc vị thế. Phải chọn trước khi vào lệnh.' },
        { title: '4. Đặt đòn bẩy trên thanh trượt', text: 'Bấm nút đòn bẩy (ví dụ 20x) cạnh nút Isolated, kéo về mức theo quy tắc (ví dụ 5x) → Confirm. Ở chế độ isolated, Binance không cho giảm đòn bẩy của vị thế đang mở, nên phải đặt trước.' },
        { title: '5. Chọn loại lệnh vào', text: 'Limit nếu vào tại vùng giá đã chọn, Market nếu vào theo tín hiệu đã đóng nến, Stop nếu vào khi phá vỡ (xem bài 5.6).' },
        { title: '6. Nhập khối lượng tính sẵn', text: 'Chọn đơn vị là BTC (không phải USDT hay % thanh trượt) và gõ đúng số đã tính, ví dụ 0,008. Không kéo thanh % số dư, vì nó tính theo ký quỹ × đòn bẩy, không theo rủi ro.' },
        { title: '7. Tích ô TP/SL và nhập ngay', text: 'Tích ô <strong>TP/SL</strong> trong khung đặt lệnh. Nhập giá dừng lỗ (78.800) và chốt lời (ví dụ 82.400 cho 2R). Theo Binance, đây là lệnh chiến lược: khi lệnh chính khớp thì TP và SL mới có hiệu lực, một bên khớp thì bên kia tự hủy.' },
        { title: '8. Chọn giá kích hoạt', text: 'Với SL, chọn loại market (stop-market) để chắc chắn thoát. Chọn trigger theo Mark Price để tránh bị quét bởi một cú giật giá tức thời trên sổ lệnh, hoặc Last Price nếu bạn đặt dừng lỗ theo nến trên biểu đồ giá khớp.' },
        { title: '9. Bấm Mua/Long và kiểm tra tab Positions', text: 'Ngay sau khi khớp, kiểm tra ở tab Positions: kích thước đúng 0,008 BTC, cột TP/SL đã hiện hai giá, giá thanh lý ước tính nằm xa dừng lỗ, tỷ lệ ký quỹ (margin ratio) thấp. Binance khuyến nghị giữ margin ratio dưới 80%; lệnh đúng quy tắc thường chỉ vài phần trăm.' },
        { title: '10. Ghi nhật ký rồi rời màn hình', text: 'Ghi lý do vào lệnh, giá vào, SL, TP, R, ảnh chụp biểu đồ.' }
      ] },
      { type: 'callout', tone: 'risk', title: 'Dừng lỗ quá sát có thể bị hủy', text: 'Binance cảnh báo: nếu giá kích hoạt của lệnh phụ (TP/SL) quá gần lệnh chính, khả năng cao lệnh phụ bị hủy khi lệnh chính khớp. Sau khi khớp, luôn kiểm tra tab Positions xem SL còn đó không. Nếu không thấy SL, đặt lại ngay bằng nút thêm TP/SL của vị thế, hoặc đóng lệnh.' },

      { type: 'h', text: 'Checklist trước lệnh và một ngày giao dịch mẫu' },
      { type: 'checklist', title: 'Checklist trước khi bấm mở lệnh', items: [
        'Hôm nay tôi chưa chạm lỗ 2R, tuần này chưa chạm 5R',
        'Tôi chưa thua 2 lệnh liên tiếp hôm nay và đây chưa phải lệnh thứ 4 trong ngày',
        'Không có tin CPI, FOMC hay tin lớn trong 30 phút tới hoặc 30 phút vừa qua',
        'Setup nằm trong danh sách setup của tôi, bối cảnh khung lớn ủng hộ hướng lệnh',
        'Tôi biết điểm vô hiệu và đã đặt dừng lỗ theo cấu trúc, có vùng đệm',
        'Khối lượng tính từ 0,5–1% vốn và khoảng dừng lỗ, đã làm tròn xuống, đã cộng phí',
        'Đòn bẩy thật (tổng danh nghĩa ÷ vốn) không vượt 3x, kể cả các lệnh đang mở',
        'Chế độ Isolated và One-Way đã bật, đòn bẩy thanh trượt đã đặt theo quy tắc',
        'TP/SL được nhập cùng lúc với lệnh vào, SL là stop-market, đã chọn trigger Mark hoặc Last',
        'Giá thanh lý cách giá vào ít nhất gấp 3 lần khoảng cách dừng lỗ',
        'Chốt lời đầu tiên ở vùng hợp lý, R:R ít nhất 1,5',
        'Tôi không vào lệnh vì vừa thua, vì sợ lỡ tàu hay vì ai đó gọi kèo',
        'Tôi chấp nhận mất đúng 1R này mà không thấy khó chịu'
      ] },
      { type: 'scenario', title: 'Tối có CPI, đã thua 1 lệnh buổi chiều', setup: 'Vốn 1.000 USDT. Buổi chiều thua 1 lệnh (−1R = −10 USDT). 19:15, BTC tăng mạnh trước giờ CPI 19:30, mạng xã hội bàn tán "sắp phá đỉnh".', bad: 'Trader cảm tính muốn gỡ lệnh chiều. Để nguyên Cross, kéo thanh trượt lên 50x, vào 50% số dư, định "khi nào đi đúng thì đặt SL". CPI ra, giá giật lên rồi sập 2% trong vài phút. Với 50x, biên độ tới thanh lý chỉ khoảng 1,6%. Vị thế bị thanh lý, mất khoảng 500 USDT, tức 50R, trong chưa đầy 10 phút.', good: 'Trader có kế hoạch mở checklist: mục 3 sai (tin CPI trong 30 phút tới). Không vào lệnh. 20:00 giá ổn định, có setup pullback đúng quy tắc, vào 0,008 BTC, Isolated 5x, SL và TP đặt cùng lúc. Lệnh thua, lỗ ≈ 1R. Tổng ngày −2R: đúng giới hạn, đóng máy. Mất 20 USDT, còn 980 USDT và kỷ luật nguyên vẹn.' },
      { type: 'p', text: 'Để quy tắc sống được, bạn cần ghi lại mọi lần vi phạm. Cuối tuần, đếm: bao nhiêu lệnh, bao nhiêu R thắng thua, bao nhiêu lần phạm quy tắc. Một lệnh lãi mà phạm quy tắc vẫn là lệnh xấu. Nếu trong tuần bạn phạm quy tắc từ 2 lần trở lên, tuần sau giảm rủi ro xuống 0,5% mỗi lệnh.' },

      { type: 'h', text: 'Luyện trên Demo Trading và nâng dần từng bậc' },
      { type: 'p', text: 'Binance đã chuyển Mock Trading thành Binance Demo Trading, dùng tiền ảo trên giao diện thật. Đây là nơi tốt nhất để luyện quy trình 10 bước cho đến khi thành phản xạ, đặc biệt là việc tích ô TP/SL và kiểm tra tab Positions. Đề xuất một lộ trình: ít nhất 30 lệnh trên Demo mà không phạm quy tắc, rồi mới chuyển sang tiền thật với số vốn bạn sẵn sàng mất hoàn toàn, rủi ro 0,5% mỗi lệnh trong 30 lệnh đầu.' },
      { type: 'callout', tone: 'note', title: 'Khung pháp lý Việt Nam', text: 'Nghị quyết 05/2025/NQ-CP thí điểm thị trường tài sản mã hóa không nhắc tới giao dịch phái sinh, hợp đồng tương lai. Nghị định 284/2026/NĐ-CP có mức phạt với nhà đầu tư trong nước giao dịch không qua tổ chức được cấp phép, áp dụng sau 6 tháng kể từ khi sàn đầu tiên được cấp phép. Kiểm tra văn bản mới nhất trước khi hành động. Khóa học không phải tư vấn pháp lý.' }
    ],
    keyPoints: [
      'Quy tắc phải có con số kiểm tra được: rủi ro 0,5–1%/lệnh, đòn bẩy thật tối đa 3x, dừng khi lỗ 2R/ngày hoặc 5R/tuần, tối đa 3 lệnh/ngày, dừng sau 2 lệnh thua liên tiếp',
      'Khối lượng tính từ khoảng dừng lỗ, không từ thanh trượt đòn bẩy; đòn bẩy trên sàn chỉ quyết định ký quỹ khóa và giá thanh lý',
      'Chuỗi 5–8 lệnh thua gần như chắc chắn xảy ra trong 100 lệnh; rủi ro nhỏ là thứ giúp bạn sống sót qua nó',
      'Trên Binance: USDⓈ-M, One-Way, Isolated, đặt đòn bẩy, nhập khối lượng tính sẵn, tích TP/SL, SL stop-market, kiểm tra tab Positions',
      'Giá thanh lý phải cách xa hơn dừng lỗ nhiều lần; không mở lệnh trong 30 phút quanh tin lớn',
      'Luyện quy trình trên Binance Demo Trading trước, ghi lại mọi lần phạm quy tắc'
    ],
    practice: [
      'Chép bảng 12 quy tắc ra giấy hoặc ghi chú điện thoại, điền con số của riêng bạn, ký tên và ngày. Dán cạnh màn hình.',
      'Trên Binance Demo Trading, đặt sẵn One-Way và Isolated, rồi mở 3 lệnh BTCUSDT theo đúng 10 bước; chụp màn hình tab Positions để xác nhận SL và TP đã hiện.',
      'Tra lịch CPI và FOMC tháng tới, ghi các khung giờ cấm mở lệnh theo giờ Việt Nam vào lịch điện thoại.',
      'Với vốn của bạn, tính khối lượng cho một lệnh long ETH giả định vào 3.000, dừng lỗ 2.940, rủi ro 1%; kiểm tra đòn bẩy thật.'
    ],
    quiz: [
      { q: 'Vốn 1.000 USDT, rủi ro 1%. Long BTC tại 80.000, dừng lỗ 79.600. Khối lượng đúng và đòn bẩy thật là bao nhiêu?', options: ['0,0125 BTC, khoảng 1x', '0,025 BTC, 2x', '0,25 BTC, 20x', '0,0025 BTC, 0,2x'], answer: 1, explain: 'Khoảng cách dừng lỗ 400 USDT. Khối lượng = 10 ÷ 400 = 0,025 BTC, danh nghĩa 2.000 USDT, đòn bẩy thật 2x (dưới 3x). 0,0125 BTC là tính với rủi ro 0,5%. 0,25 BTC là rủi ro 100 USDT (10%). 0,0025 BTC là tính sai một chữ số.' },
      { q: 'Bạn đã thua 2 lệnh liên tiếp hôm nay, tổng −1,8R. Một setup rất đẹp xuất hiện. Theo bộ quy tắc mẫu, bạn làm gì?', options: ['Vào lệnh với rủi ro 0,2R để không vượt 2R', 'Vào lệnh bình thường vì chưa chạm 2R', 'Không vào, dừng giao dịch trong ngày vì đã thua 2 lệnh liên tiếp', 'Vào lệnh gấp đôi khối lượng để gỡ'], answer: 2, explain: 'Quy tắc 9 độc lập với quy tắc 2R: thua 2 lệnh liên tiếp là dừng trong ngày. Vào lệnh "bình thường" hay "nhỏ để vừa giới hạn" đều là tìm cách lách luật. Gấp đôi khối lượng là trả thù thị trường, vi phạm nặng nhất.' },
      { q: 'Vì sao nên chuyển sang Isolated và đặt đòn bẩy TRƯỚC khi vào lệnh trên Binance?', options: ['Vì Isolated luôn có phí thấp hơn Cross', 'Vì Binance không cho đổi chế độ ký quỹ khi đang có vị thế hoặc lệnh chờ, và không cho giảm đòn bẩy của vị thế isolated đang mở', 'Vì Isolated đảm bảo không bao giờ bị thanh lý', 'Vì đòn bẩy cao hơn làm lệnh khớp nhanh hơn'], answer: 1, explain: 'Theo tài liệu Binance, chế độ ký quỹ không đổi được khi có lệnh chờ hoặc vị thế, và vị thế isolated đang mở không giảm được đòn bẩy. Isolated không giảm phí, vẫn có thể bị thanh lý (chỉ giới hạn mất trong ký quỹ của vị thế), và đòn bẩy không ảnh hưởng tốc độ khớp.' },
      { q: 'CPI Mỹ công bố 8:30 sáng giờ miền Đông, đang là giờ mùa hè. Theo quy tắc 30 phút, bạn không mở lệnh mới trong khung giờ Việt Nam nào?', options: ['07:00–08:00', '20:00–21:00', '01:00–02:00', '19:00–20:00'], answer: 3, explain: 'Giờ mùa hè (EDT) CPI ra lúc 19:30 giờ Việt Nam, nên cấm từ 19:00 đến 20:00. 20:00–21:00 đúng cho giờ mùa đông (CPI 20:30). 01:00–02:00 là quanh giờ FOMC. 07:00 là một mốc funding, không phải giờ CPI.' }
    ],
    sources: [
      { title: 'How to Switch Between the Cross Margin and Isolated Margin Modes?', url: 'https://www.binance.com/en/support/faq/how-to-switch-between-the-cross-margin-and-isolated-margin-modes-360038075852', note: 'Binance Support, tiếng Anh' },
      { title: 'Leverage and Margin of USDⓈ-M Futures', url: 'https://www.binance.com/en/support/faq/360033162192', note: 'Binance Support: điều chỉnh đòn bẩy, giới hạn 20x cho tài khoản mới từ 7/12/2025, tiếng Anh' },
      { title: 'What are TP/SL Orders and Frequently Asked Questions', url: 'https://www.binance.com/en/support/faq/detail/e1ee1738141c49718550fa9061be4bf3', note: 'Binance Support: tích ô TP/SL khi đặt lệnh, OTOCO, tiếng Anh' },
      { title: 'What Is Hedge Mode and How to Use It?', url: 'https://www.binance.com/en/support/faq/detail/360041513552', note: 'Binance Support: đổi Position Mode, tiếng Anh' },
      { title: 'Binance Futures Liquidation Protocols', url: 'https://www.binance.com/en/support/faq/detail/360033525271', note: 'Binance Support: margin ratio, khuyến nghị dưới 80%, tiếng Anh' },
      { title: 'Binance Demo Trading', url: 'https://www.binance.com/en/support/faq/detail/b3706b248f2b4b1caabb4bf253bf067f', note: 'Binance Support, tiếng Anh' },
      { title: 'ESMA agrees to prohibit binary options and restrict CFDs', url: 'https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors', note: 'ESMA, 2018, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c5-b10': {
    duration: 11,
    level: 'Trung cấp',
    summary: 'Mười cách cháy tài khoản futures phổ biến nhất, mỗi cách kèm ví dụ số cho thấy tài khoản mất bao nhiêu và một quy tắc cụ thể để phòng tránh.',
    goals: [
      'Nhận ra 10 hành vi làm cháy tài khoản futures và nhìn thấy chúng bằng con số',
      'Hiểu vì sao lỗ lớn cần lãi lớn hơn nhiều để hoà vốn',
      'Gắn mỗi lỗi với một quy tắc phòng tránh kiểm tra được',
      'Rút bài học từ sự kiện thanh lý ngày 10/10/2025'
    ],
    blocks: [
      { type: 'h', text: 'Tài khoản không cháy trong một lệnh, nó cháy trong một thói quen' },
      { type: 'p', text: 'Ngày 10/10/2025, sau thông báo thuế quan 100% với hàng nhập khẩu Trung Quốc, thị trường crypto chứng kiến đợt thanh lý lớn nhất lịch sử: theo CoinGecko, hơn 19 tỷ USD vị thế đòn bẩy bị thanh lý trong 24 giờ, hơn 1,6 triệu tài khoản bị thanh lý. Khoảng 70% số thanh lý đó diễn ra chỉ trong 40 phút. BTC giảm từ khoảng 122.574 xuống 104.782 USD (khoảng 14,5%), một số altcoin có lúc mất hơn 40%.' },
      { type: 'p', text: 'Những ngày như thế không tạo ra lỗi mới. Chúng chỉ phơi bày các thói quen xấu đã tồn tại từ trước: đòn bẩy quá cao, không có dừng lỗ, dùng cross toàn ví, hay nhồi thêm vào lệnh đang lỗ. Bài này đi qua 10 thói quen đó. Mỗi thói quen có một ví dụ số (giả định) và một quy tắc để chặn nó.' },
      { type: 'figure', name: 'drawdown-recovery', caption: 'Lỗ càng sâu, mức lãi cần để hoà vốn càng tăng rất nhanh: lỗ 50% cần lãi 100%, lỗ 90% cần lãi 900%.' },
      { type: 'calc', title: 'Toán của sự sụt vốn', rows: [
        ['Lỗ 10%', 'Cần lãi 1 ÷ 0,9 − 1 ≈ 11,1%'],
        ['Lỗ 30%', 'Cần lãi 1 ÷ 0,7 − 1 ≈ 42,9%'],
        ['Lỗ 50%', 'Cần lãi 100%'],
        ['Lỗ 75%', 'Cần lãi 300%'],
        ['Lỗ 90%', 'Cần lãi 900%']
      ], result: 'Mục tiêu số 1 của trader futures không phải kiếm nhiều, mà là không bao giờ để mình rơi vào vùng lỗ 30% trở lên.' },

      { type: 'h', text: 'Nhóm 1: lỗi về cấu trúc lệnh (đòn bẩy, dừng lỗ, cross)' },
      { type: 'p', text: '<strong>Lỗi 1: đòn bẩy cao.</strong> Đòn bẩy không làm bạn đoán đúng hơn, nó chỉ làm khoảng cách tới thanh lý ngắn lại. Công thức gần đúng cho long isolated: Giá thanh lý ≈ Giá vào × (1 − 1/Đòn bẩy + MMR).' },
      { type: 'figure', name: 'leverage-liquidation', caption: 'Đòn bẩy càng cao, giá chỉ cần đi ngược một đoạn rất ngắn là chạm thanh lý.' },
      { type: 'example', title: 'Long 50x với toàn bộ ký quỹ (giá giả định)', text: 'Tài khoản 1.000 USDT, dùng hết 1.000 làm ký quỹ, 50x, long BTC 80.000 → giá trị danh nghĩa 50.000 USDT. Giá thanh lý ≈ 80.000 × (1 − 0,02 + 0,004) = 78.720, tức giá chỉ cần giảm 1,6%. BTC dao động 1,6% trong một giờ là chuyện thường. Kết quả: mất 1.000 USDT, 100% tài khoản. <strong>Quy tắc chặn:</strong> đòn bẩy thật tối đa 3x; thanh trượt tối đa 5x–10x.' },
      { type: 'p', text: '<strong>Lỗi 2: không đặt dừng lỗ.</strong> Người không đặt dừng lỗ thường nghĩ "mình sẽ tự cắt khi cần". Nhưng những cú sập mạnh nhất diễn ra trong vài phút, thường vào lúc bạn đang ngủ.' },
      { type: 'example', title: 'Giữ long không dừng lỗ qua một cú sập 14,5%', text: 'Tài khoản 1.000 USDT, long BTC với đòn bẩy thật 3x (danh nghĩa 3.000 USDT), không dừng lỗ. BTC giảm 14,5% như ngày 10/10/2025 → lỗ 3.000 × 14,5% = 435 USDT, tức 43,5% tài khoản. Nếu đòn bẩy thật 5x → lỗ 72,5%. Cùng lệnh đó có dừng lỗ theo quy tắc 1% → lỗ khoảng 10 USDT, cộng trượt giá có thể thành 15–20 USDT. <strong>Quy tắc chặn:</strong> không có dừng lỗ thì không mở lệnh; dừng lỗ đặt cùng lúc với lệnh vào.' },
      { type: 'p', text: '<strong>Lỗi 3: dùng cross toàn ví.</strong> Ở chế độ Cross, toàn bộ số dư ví futures cùng đỡ các vị thế. Một vị thế lỗ nặng có thể kéo sập tất cả, và khi thanh lý xảy ra ở cross, mọi lệnh chờ đều bị hủy.' },
      { type: 'example', title: 'Ba lệnh altcoin ở Cross (giả định)', text: 'Ví futures 2.000 USDT, Cross, long 3 altcoin, mỗi lệnh danh nghĩa 4.000 USDT (tổng 12.000, đòn bẩy thật 6x). Altcoin thường đi cùng chiều. Chúng cùng giảm khoảng 16,7% là tổng lỗ 12.000 × 16,7% ≈ 2.000: cả ví về gần 0, trước khi phí thanh lý được tính. Ngày 10/10/2025 có altcoin mất hơn 40%. Nếu dùng Isolated, mỗi lệnh ký quỹ 400 USDT, tệ nhất mất 1.200 USDT và còn 800. Tốt hơn nữa: có dừng lỗ, khi đó mỗi lệnh chỉ mất khoảng 1R. <strong>Quy tắc chặn:</strong> Isolated mặc định; tối đa 2 vị thế cùng lúc, tổng rủi ro mở không quá 2R.' },
      { type: 'callout', tone: 'risk', title: 'Giá thanh lý thực tế có thể tệ hơn giá hiển thị', text: 'Binance lưu ý khi biến động cực mạnh, mark price có thể nhảy vọt trong một giây và vị thế bị thanh lý ở giá tệ hơn giá thanh lý ước tính. Đừng coi giá thanh lý là "dừng lỗ cuối cùng" có thể tin cậy.' },

      { type: 'h', text: 'Nhóm 2: lỗi khi lệnh đang lỗ (gồng lỗ, nhồi lệnh, dời dừng lỗ)' },
      { type: 'p', text: '<strong>Lỗi 4: gồng lỗ.</strong> Giá chạm vùng dừng lỗ nhưng bạn tắt lệnh dừng lỗ và "chờ giá về". Đây là né tránh mất mát ở dạng thuần nhất: chốt lỗ là thừa nhận sai, nên ta hoãn lại. Một lệnh kế hoạch lỗ 1R có thể thành 5R, 8R. Với R = 10 USDT, một lệnh gồng tới −8R là mất 80 USDT, xóa sạch lợi nhuận của 4 lệnh thắng 2R. <strong>Quy tắc chặn:</strong> SL là lệnh đặt trên sàn, không phải ghi chú trong đầu. Không bao giờ hủy SL khi lệnh đang lỗ.' },
      { type: 'p', text: '<strong>Lỗi 5: nhồi lệnh thua (martingale).</strong> Mỗi lần giá giảm, mua thêm gấp đôi để kéo giá vốn xuống. Cảm giác rất hay vì chỉ cần giá hồi một chút là có lãi. Nhưng khối lượng tăng theo cấp số nhân.' },
      { type: 'calc', title: 'Nhồi gấp đôi mỗi 2.000 USDT (giá giả định, tài khoản 1.000 USDT)', rows: [
        ['Lần 1', 'Long 0,01 BTC tại 80.000 (800 USDT)'],
        ['Lần 2', '0,02 BTC tại 78.000 (1.560 USDT)'],
        ['Lần 3', '0,04 BTC tại 76.000 (3.040 USDT)'],
        ['Lần 4', '0,08 BTC tại 74.000 (5.920 USDT)'],
        ['Tổng', '0,15 BTC, vốn bỏ ra 11.320 USDT, giá vốn trung bình ≈ 75.467'],
        ['Đòn bẩy thật', '11.320 ÷ 1.000 ≈ 11,3x'],
        ['Nếu giá hồi về 76.000', 'Lãi 0,15 × (76.000 − 75.467) ≈ 80 USDT: "thấy chiến thuật hiệu quả"'],
        ['Nếu giá xuống 72.000', 'Lỗ 0,15 × (72.000 − 75.467) ≈ −520 USDT (52% tài khoản)'],
        ['Giá làm lỗ bằng cả tài khoản', '75.467 − 1.000 ÷ 0,15 ≈ 68.800, tức BTC chỉ cần giảm 14% từ 80.000']
      ], result: 'Martingale thắng nhỏ nhiều lần rồi thua một lần lớn hơn tổng tất cả các lần thắng. Một cú giảm 14% như ngày 10/10/2025 là đủ xóa sổ. Quy tắc chặn: chỉ thêm vị thế vào lệnh đang lãi, và khi đó tổng rủi ro không tăng (xem bài 5.8).' },
      { type: 'p', text: '<strong>Lỗi 6: dời dừng lỗ ra xa.</strong> Giá sắp chạm SL, bạn kéo SL xuống thêm "một chút". Mỗi lần dời, R thật của lệnh lớn lên, và lợi thế của hệ thống biến mất mà bạn không nhận ra.' },
      { type: 'calc', title: 'Dời dừng lỗ phá hủy kỳ vọng như thế nào', rows: [
        ['Hệ thống gốc', 'Tỷ lệ thắng 40%, thắng 2R, thua 1R'],
        ['Kỳ vọng gốc', '0,4 × 2 − 0,6 × 1 = +0,2R mỗi lệnh'],
        ['Nếu một nửa số lệnh thua bị dời SL thành lỗ 3R', '0,4 × 2 − 0,3 × 1 − 0,3 × 3'],
        ['Kỳ vọng mới', '0,8 − 0,3 − 0,9 = −0,4R mỗi lệnh']
      ], result: 'Từ một hệ thống có lãi thành hệ thống lỗ chắc chắn, chỉ vì một thói quen nhỏ. Quy tắc chặn: SL chỉ được dời về phía có lợi (thu hẹp rủi ro), không bao giờ ngược lại.' },

      { type: 'h', text: 'Nhóm 3: lỗi cảm xúc và thông tin (trả thù, trade tin, copy trade, all-in)' },
      { type: 'p', text: '<strong>Lỗi 7: trả thù thị trường.</strong> Thua 2 lệnh, bạn tăng gấp đôi rủi ro để gỡ nhanh. Thua tiếp, lại gấp đôi.' },
      { type: 'example', title: 'Tăng rủi ro sau mỗi lệnh thua (giả định)', text: 'Tài khoản 1.000 USDT. Thua 2 lệnh 1% → còn 980,1. Trả thù: lệnh 3 rủi ro 2%, lệnh 4 rủi ro 4%, lệnh 5 rủi ro 8%, cả ba đều thua → còn khoảng 848,3 USDT, tức mất khoảng 15,2% trong một buổi tối, cần lãi khoảng 17,9% để hoà vốn. Nếu giữ đúng quy tắc, bạn dừng ở −2%. <strong>Quy tắc chặn:</strong> thua 2 lệnh liên tiếp là dừng trong ngày; % rủi ro chỉ được chỉnh vào cuối tuần.' },
      { type: 'p', text: '<strong>Lỗi 8: trade tin.</strong> Vào lệnh ngay lúc CPI hay FOMC ra, hy vọng bắt được cú chạy đầu tiên. Vấn đề là giá có thể giật hai chiều và thanh khoản mỏng làm lệnh stop-market khớp xa giá đặt.' },
      { type: 'example', title: 'Trượt giá khi tin ra (giả định)', text: 'Long 0,008 BTC tại 80.000, SL stop-market 78.800 (rủi ro kế hoạch 9,6 USDT). Tin ra, giá lao qua 78.800 và lệnh khớp ở 78.200. Lỗ thực tế 0,008 × 1.800 = 14,4 USDT, tức 1,5 lần R dự kiến. Nếu dùng stop-limit, lệnh có thể không khớp, vị thế vẫn mở trong lúc giá tiếp tục rơi. <strong>Quy tắc chặn:</strong> không mở lệnh mới trong 30 phút trước và sau tin lớn; SL dùng stop-market.' },
      { type: 'p', text: '<strong>Lỗi 9: copy trade mù quáng.</strong> Bảng xếp hạng thường khoe ROI rất cao trong 30 ngày. Nhưng ROI cao trong thời gian ngắn thường đến từ đòn bẩy cao, và bạn không thấy những tài khoản đã cháy (thiên lệch sống sót). Nếu người dẫn dùng 50x, chỉ cần giá đi ngược 1,6% là toàn bộ số tiền bạn cấp cho lệnh đó có thể mất. Bạn còn vào sau họ một nhịp, giá kém hơn. <strong>Quy tắc chặn:</strong> không copy ai mà bạn không biết đòn bẩy, dừng lỗ và mức sụt vốn tối đa lịch sử; số tiền copy tính như một lệnh có rủi ro, không quá vài phần trăm vốn.' },
      { type: 'p', text: '<strong>Lỗi 10: all-in sau chuỗi thắng.</strong> Sau 5 lệnh thắng, tài khoản từ 1.000 lên 1.300 USDT và bạn thấy mình "đã hiểu thị trường". Bạn dùng cả 1.300 làm ký quỹ ở 20x. Giá thanh lý cách giá vào chỉ khoảng 4,6% (1/20 − 0,4%). Một cú giảm 5% là mất toàn bộ 1.300, kể cả phần lãi của cả tháng. <strong>Quy tắc chặn:</strong> % rủi ro cố định mỗi lệnh; chuỗi thắng không phải lý do tăng rủi ro.' },
      { type: 'callout', tone: 'risk', title: 'Thống kê không đứng về phía người trade cảm tính', text: 'Barber, Lee, Liu, Odean (2014) thấy dưới 1% day trader Đài Loan kiếm được lợi nhuận vượt trội ổn định sau phí. BIS (2023) ghi nhận phần lớn người dùng ứng dụng crypto ở gần như mọi nền kinh tế bị lỗ với bitcoin nắm giữ. Nếu bạn làm những điều giống số đông, kết quả của bạn sẽ giống số đông.' },

      { type: 'h', text: 'Tình huống: cùng một buổi tối, hai kết cục' },
      { type: 'scenario', title: 'Thua lệnh đầu, thị trường biến động mạnh', setup: 'Tài khoản 1.000 USDT. Lệnh đầu tiên trong ngày thua −1R (−10 USDT). Giá BTC bắt đầu giảm nhanh, mạng xã hội đầy ảnh chụp lãi lớn của người short.', bad: 'Trader cảm tính chuyển sang Cross, short 30x với 400 USDT ký quỹ, không đặt SL "vì chắc chắn còn giảm". Giá bật ngược 3% do short squeeze, lệnh bị thanh lý, mất 400. Tức tối, long lại 30x với 500 USDT, nhồi thêm khi giá giảm. Cuối đêm tài khoản còn khoảng 60 USDT: mất 94%, cần lãi khoảng 1.567% để hoà vốn.', good: 'Trader có kế hoạch nhìn checklist: chưa thua 2 lệnh liên tiếp, chưa chạm 2R. Có setup short theo xu hướng, vào khối lượng tính từ rủi ro 1%, Isolated 5x, SL trên đỉnh cấu trúc gần nhất. Lệnh thua, lỗ ≈ 1R. Đã thua 2 lệnh liên tiếp, tổng −2R: đóng máy. Tài khoản còn khoảng 980 USDT. Hôm sau quay lại với đầu óc tỉnh táo.' },
      { type: 'table', head: ['Lỗi', 'Quy tắc chặn'], rows: [
        ['Đòn bẩy cao', 'Đòn bẩy thật tối đa 3x, thanh trượt tối đa 5x–10x'],
        ['Không dừng lỗ', 'Không có SL thì không mở lệnh, SL đặt cùng lúc'],
        ['Cross toàn ví', 'Isolated mặc định, tối đa 2 vị thế, tổng rủi ro mở ≤ 2R'],
        ['Gồng lỗ', 'Không hủy SL khi lệnh đang lỗ'],
        ['Nhồi lệnh thua', 'Chỉ thêm vào lệnh đang lãi, tổng rủi ro không tăng'],
        ['Dời dừng lỗ', 'SL chỉ dời về phía giảm rủi ro'],
        ['Trả thù', 'Thua 2 lệnh liên tiếp là dừng, lỗ 2R/ngày là dừng'],
        ['Trade tin', 'Không mở lệnh 30 phút quanh CPI, FOMC'],
        ['Copy trade mù', 'Biết đòn bẩy, SL, sụt vốn tối đa của người dẫn; giới hạn tiền copy'],
        ['All-in sau chuỗi thắng', '% rủi ro cố định, chỉ chỉnh vào cuối tuần']
      ] },
      { type: 'p', text: 'Hãy chụp bảng này lại. Mỗi khi xem nhật ký giao dịch cuối tuần, đánh dấu lỗi nào xuất hiện. Chỉ cần loại được 3 lỗi đầu (đòn bẩy cao, không dừng lỗ, cross toàn ví), bạn đã tránh được phần lớn các kịch bản cháy tài khoản trong một đêm như 10/10/2025.' },
      { type: 'callout', tone: 'tip', title: 'Luyện trên Demo Trading', text: 'Thử cố ý mở một lệnh 50x trên Binance Demo Trading và quan sát giá thanh lý nằm sát giá vào thế nào. Thấy tận mắt bằng tiền ảo rẻ hơn rất nhiều so với học bằng tiền thật.' }
    ],
    keyPoints: [
      'Lỗ càng sâu càng khó gỡ: lỗ 50% cần lãi 100%, lỗ 90% cần lãi 900%',
      'Ba lỗi gây cháy nhanh nhất là đòn bẩy cao, không dừng lỗ và cross toàn ví; 50x chỉ cần giá đi ngược khoảng 1,6%',
      'Martingale và nhồi lệnh thua tạo nhiều lần thắng nhỏ rồi một lần thua lớn hơn tất cả; ví dụ nhồi 4 lần gấp đôi cháy tài khoản chỉ với cú giảm 14%',
      'Dời dừng lỗ ra xa có thể biến kỳ vọng +0,2R thành −0,4R mỗi lệnh',
      'Trả thù, trade tin, copy trade mù và all-in sau chuỗi thắng đều là lỗi cảm xúc; chặn bằng quy tắc có con số, không bằng ý chí',
      'Ngày 10/10/2025 hơn 19 tỷ USD vị thế bị thanh lý trong 24 giờ, hơn 1,6 triệu tài khoản: thị trường có thể giảm 14% trong vài giờ'
    ],
    practice: [
      'Xem lại 20 lệnh gần nhất (thật hoặc Demo), đánh dấu mỗi lệnh phạm lỗi nào trong 10 lỗi. Lỗi xuất hiện nhiều nhất là thứ bạn sửa trong tháng này.',
      'Dùng công cụ tính thanh lý với giá vào 80.000 và đòn bẩy 5x, 10x, 20x, 50x; ghi lại khoảng cách % tới thanh lý của từng mức.',
      'Tự tính: tài khoản 1.000 USDT, long nhồi gấp đôi 3 lần mỗi khi giá giảm 3% từ 80.000, khởi đầu 0,01 BTC. Giá vốn trung bình là bao nhiêu và giá giảm tới đâu thì lỗ bằng cả tài khoản?'
    ],
    quiz: [
      { q: 'Tài khoản lỗ 40%. Cần lãi bao nhiêu phần trăm trên số vốn còn lại để hoà vốn?', options: ['40%', 'Khoảng 66,7%', '60%', 'Khoảng 28,6%'], answer: 1, explain: 'Còn 60% vốn, cần 1 ÷ 0,6 − 1 ≈ 66,7%. 40% là ngộ nhận phổ biến rằng lỗ bao nhiêu lãi bấy nhiêu là đủ. 60% nhầm với phần vốn còn lại. 28,6% là tính ngược chiều (0,4 ÷ 1,4).' },
      { q: 'Hệ thống thắng 40%, thắng 2R, thua 1R. Bạn có thói quen dời SL khiến một nửa số lệnh thua thành lỗ 3R. Kỳ vọng mỗi lệnh là bao nhiêu?', options: ['+0,2R', '0R', '−0,4R', '−1R'], answer: 2, explain: '0,4 × 2 − 0,3 × 1 − 0,3 × 3 = 0,8 − 0,3 − 0,9 = −0,4R. +0,2R là kỳ vọng gốc khi không dời SL. 0R và −1R không khớp với phép tính.' },
      { q: 'Ví futures 2.000 USDT ở Cross, 3 lệnh long altcoin mỗi lệnh danh nghĩa 4.000 USDT. Cả ba cùng giảm 20%. Điều gì nhiều khả năng xảy ra?', options: ['Chỉ lệnh lỗ nhất bị thanh lý, hai lệnh còn lại an toàn', 'Không sao vì Cross dùng chung ký quỹ nên chịu được lâu hơn', 'Tài khoản lỗ 20% tức 400 USDT', 'Tổng lỗ khoảng 2.400 USDT vượt số dư, toàn bộ ví bị thanh lý và mọi lệnh chờ bị hủy'], answer: 3, explain: 'Tổng danh nghĩa 12.000 × 20% = 2.400 USDT, lớn hơn cả ví 2.000, nên cả ví bị thanh lý (thực tế xảy ra sớm hơn, quanh mức giảm khoảng 16–17%). Ở Cross, các vị thế dùng chung ký quỹ nên kéo nhau cùng chết; lỗ tính trên danh nghĩa, không trên số dư.' },
      { q: 'Sau 5 lệnh thắng liên tiếp, cách xử lý nào đúng với bộ quy tắc kỷ luật?', options: ['Giữ nguyên % rủi ro mỗi lệnh; chỉ xem xét điều chỉnh vào cuối tuần theo dữ liệu', 'Tăng đòn bẩy lên 20x vì đang có phong độ', 'Dùng toàn bộ lợi nhuận làm ký quỹ cho lệnh tiếp theo', 'Bỏ SL cho lệnh tiếp vì xác suất thắng đang cao'], answer: 0, explain: 'Chuỗi thắng không làm lệnh sau có xác suất thắng cao hơn. Tăng đòn bẩy, all-in lợi nhuận hay bỏ SL đều là lỗi 10 (all-in sau chuỗi thắng) và lỗi 2 (không dừng lỗ), có thể xóa sạch lợi nhuận cả tháng trong một lệnh.' }
    ],
    sources: [
      { title: 'October 10 Crypto Crash Explained', url: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained', note: 'CoinGecko, 2025, tiếng Anh' },
      { title: 'Binance Futures Liquidation Protocols', url: 'https://www.binance.com/en/support/faq/detail/360033525271', note: 'Binance Support, tiếng Anh' },
      { title: 'The Cross-Section of Speculator Skill: Evidence from Day Trading', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=529063', note: 'Barber, Lee, Liu, Odean, Journal of Financial Markets 2014, tiếng Anh' },
      { title: 'Crypto shocks and retail losses (BIS Bulletin 69)', url: 'https://www.bis.org/publ/bisbull69.pdf', note: 'BIS, 2023, tiếng Anh' },
      { title: 'What Is Stop Order?', url: 'https://www.binance.com/en/support/faq/detail/360036351051', note: 'Binance Support: stop-limit vs stop-market, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c5-b11': {
    duration: 12,
    level: 'Nâng cao',
    summary: 'Short có kế hoạch và vì sao short khó, phòng hộ danh mục spot bằng short perpetual, basis và funding arbitrage cùng rủi ro thật, vì sao không grid hay martingale với đòn bẩy.',
    goals: [
      'Lập kế hoạch lệnh short có điều kiện, dừng lỗ trên đỉnh cấu trúc và khối lượng tính từ rủi ro',
      'Giải thích ba lý do short khó hơn long: short squeeze, funding âm, xu hướng tăng dài hạn',
      'Tính được kết quả khi phòng hộ một phần danh mục spot bằng short perpetual',
      'Hiểu basis, funding arbitrage (delta-neutral) và những rủi ro làm chiến lược "gần như không rủi ro" này thua lỗ'
    ],
    blocks: [
      { type: 'h', text: 'Short có kế hoạch: điều kiện, dừng lỗ, khối lượng' },
      { type: 'p', text: 'Short (bán khống) trên perpetual là mở vị thế kiếm lời khi giá giảm. Về thao tác, nó giống long, chỉ bấm nút Bán/Short. Về kỷ luật, nó cần chặt hơn, vì các lực đẩy giá đi ngược bạn thường nhanh và mạnh hơn. Một lệnh short hợp lệ phải thỏa đủ ba lớp của bài 5.5, theo chiều ngược lại:' },
      { type: 'list', ordered: true, items: [
        '<strong>Bối cảnh:</strong> khung D1 đang giảm, có đỉnh sau thấp hơn đỉnh trước (LH) và đáy sau thấp hơn đáy trước (LL). Không short chỉ vì "tăng nhiều quá rồi".',
        '<strong>Vùng:</strong> giá hồi lên vùng kháng cự hoặc vùng vừa bị phá xuống (hỗ trợ cũ thành kháng cự) trên H4.',
        '<strong>Kích hoạt:</strong> trên H1 có nến từ chối rõ hoặc cấu trúc tăng ngắn bị phá (đáy nhỏ gần nhất bị thủng), chờ nến đóng.',
        '<strong>Dừng lỗ:</strong> trên đỉnh cấu trúc gần nhất (đỉnh LH) cộng vùng đệm 0,2–0,5 × ATR, tránh đặt đúng số tròn.',
        '<strong>Không short khi:</strong> funding đang âm sâu (đám đông đã short rất đông), giá đang ở sát hỗ trợ lớn, hoặc trong 30 phút quanh tin vĩ mô.'
      ] },
      { type: 'calc', title: 'Lệnh short ETH (giá giả định)', rows: [
        ['Vốn, rủi ro 1%', '1.000 USDT → 10 USDT'],
        ['Vào short', '3.000'],
        ['Đỉnh cấu trúc LH', '3.090; thêm vùng đệm → SL 3.110'],
        ['Khoảng dừng lỗ', '3.110 − 3.000 = 110 USDT'],
        ['Khối lượng', '10 ÷ 110 ≈ 0,0909 → làm tròn xuống 0,09 ETH'],
        ['Danh nghĩa, đòn bẩy thật', '0,09 × 3.000 = 270 USDT → 0,27x'],
        ['Lỗ nếu chạm SL', '0,09 × 110 = 9,9 USDT'],
        ['Chốt lời 2R', '3.000 − 2 × 110 = 2.780 → lãi 0,09 × 220 = 19,8 USDT'],
        ['Giá thanh lý gần đúng, Isolated 5x, MMR 0,4%', '3.000 × (1 + 0,2 − 0,004) = 3.588']
      ], result: 'SL ở 3.110 kích hoạt rất lâu trước giá thanh lý 3.588. Với short, SL càng quan trọng hơn long vì lỗ của short không có giới hạn trên về lý thuyết.' },

      { type: 'h', text: 'Vì sao short khó hơn long' },
      { type: 'p', text: '<strong>1. Lỗ không giới hạn và short squeeze.</strong> Long tệ nhất là giá về 0. Short thì giá có thể tăng gấp đôi, gấp ba. Theo Binance Academy, short squeeze xảy ra khi giá tăng mạnh khiến nhiều người short phải đóng vị thế cùng lúc. Muốn đóng short phải mua vào, lệnh mua đó đẩy giá lên thêm, kích hoạt tiếp dừng lỗ và thanh lý của người short khác. Short càng đông, cú squeeze càng mạnh. Đó là lý do SL của short phải nằm trên đỉnh cấu trúc, nơi ý tưởng bị vô hiệu, chứ không phải trên "một mức cảm thấy hợp lý".' },
      { type: 'p', text: '<strong>2. Funding âm khi short đông.</strong> Funding âm nghĩa là short trả tiền cho long. Khi bạn short theo đám đông, bạn vừa đứng cùng phía với nhiều người dễ bị squeeze, vừa phải trả phí giữ lệnh.' },
      { type: 'calc', title: 'Chi phí funding âm khi giữ short (giả định)', rows: [
        ['Danh nghĩa vị thế', '10.000 USDT'],
        ['Funding', '−0,05% mỗi 8 giờ (short trả long)'],
        ['Mỗi kỳ', '10.000 × 0,05% = 5 USDT'],
        ['Mỗi ngày (3 kỳ)', '15 USDT'],
        ['Giữ 30 ngày', '15 × 30 = 450 USDT']
      ], result: 'Nếu vốn 1.000 USDT với danh nghĩa 10.000, chỉ riêng funding 30 ngày đã ngốn 45% tài khoản dù giá không đi đâu. Đây cũng là lý do không giữ vị thế đòn bẩy lâu ngày.' },
      { type: 'p', text: '<strong>3. Xu hướng dài hạn.</strong> Qua các chu kỳ đã qua, giá BTC từng lập các đỉnh mới cao hơn. Đỉnh gần nhất theo CoinGecko khoảng 126.080 USD vào tháng 10/2025, và cuối 9/2026 giá quanh 84.000 USD, thấp hơn đỉnh khoảng 33%. Quá khứ không đảm bảo tương lai, nhưng nó cho thấy: đợt giảm thường kèm những cú hồi rất mạnh, và short ngược xu hướng khung lớn là trò chơi có tỷ lệ thành công thấp. Người mới nên tập short chỉ khi D1 đã giảm rõ, khối lượng nhỏ hơn long (ví dụ rủi ro 0,5% thay vì 1%).' },
      { type: 'callout', tone: 'risk', title: 'Short altcoin nhỏ đặc biệt nguy hiểm', text: 'Coin vốn hóa nhỏ, thanh khoản mỏng có thể tăng vài chục phần trăm trong vài phút. Stop-market có thể khớp xa giá đặt. Nếu đang học, chỉ short BTC hoặc ETH, khối lượng nhỏ, luôn có SL.' },

      { type: 'h', text: 'Phòng hộ (hedge) danh mục spot bằng short perpetual' },
      { type: 'p', text: 'Phòng hộ không phải để kiếm thêm, mà để giảm biến động của tài sản bạn đang giữ, ví dụ khi bạn giữ BTC dài hạn nhưng lo ngại một giai đoạn rủi ro (tin vĩ mô lớn, sự kiện bất định) và không muốn bán spot. Short perpetual một phần số BTC đang giữ sẽ bù một phần lỗ khi giá giảm, và cũng cắt một phần lãi khi giá tăng.' },
      { type: 'p', text: 'Binance minh họa logic này bằng hedge mode trên cùng hợp đồng: long 1 BTC và short 0,5 BTC ở giá 22.000. Giá lên 24.000 thì lãi ròng (1 − 0,5) × 2.000 = 1.000; giá xuống 19.000 thì lỗ ròng (1 − 0,5) × 3.000 = 1.500, thay vì 3.000 nếu chỉ long. Với danh mục spot, cách hiểu y hệt: phần spot đóng vai trò chân long.' },
      { type: 'calc', title: 'Hedge 50% danh mục 0,5 BTC spot (giá giả định)', rows: [
        ['Giữ spot', '0,5 BTC, giá 80.000 → 40.000 USDT'],
        ['Short perpetual', '0,25 BTC (danh nghĩa 20.000 USDT), Isolated, ký quỹ 10.000 USDT (2x)'],
        ['Giá thanh lý gần đúng của chân short', '80.000 × (1 + 0,5 − 0,004) = 119.680'],
        ['Kịch bản giá giảm về 68.000 (−15%)', 'Spot −6.000; short +3.000; ròng −3.000'],
        ['Kịch bản giá tăng lên 92.000 (+15%)', 'Spot +6.000; short −3.000; ròng +3.000'],
        ['Không hedge', 'Lãi hoặc lỗ 6.000 tùy chiều'],
        ['Funding nếu +0,01%/8 giờ (short nhận)', '20.000 × 0,01% × 3 = 6 USDT/ngày; nếu funding âm thì bạn trả']
      ], result: 'Hedge 50% cắt đôi cả lỗ lẫn lãi. Đó là cái giá của sự yên tâm, không phải lợi nhuận miễn phí.' },
      { type: 'callout', tone: 'risk', title: 'Spot không cứu được chân short bị thanh lý', text: 'BTC spot nằm ở ví spot, không đỡ ký quỹ cho vị thế short trong ví futures. Nếu giá tăng mạnh, chân short có thể bị thanh lý dù tổng tài sản của bạn vẫn tăng; khi đó bạn mất ký quỹ và mất luôn lớp phòng hộ. Giữ đòn bẩy chân short thấp (1x–2x), kiểm tra giá thanh lý và nạp thêm ký quỹ trước khi margin ratio lên cao.' },
      { type: 'list', items: [
        'Chỉ hedge trong thời gian có lý do cụ thể, đặt sẵn ngày hoặc điều kiện gỡ hedge.',
        'Tỷ lệ hedge (25%, 50%, 100%) quyết định trước, không thay đổi theo cảm xúc từng ngày.',
        'Hedge 100% đồng nghĩa gần như đứng ngoài thị trường; lúc đó bán bớt spot có khi đơn giản hơn.',
        'Tính cả phí vào ra và funding; hedge kéo dài nhiều tháng có thể tốn đáng kể.'
      ] },

      { type: 'h', text: 'Basis và funding arbitrage: hiểu cơ chế, thấy rủi ro' },
      { type: 'p', text: '<strong>Basis</strong> là chênh lệch giữa giá hợp đồng tương lai và giá spot. Hợp đồng quý (có ngày đáo hạn) thường có giá cao hơn spot khi thị trường lạc quan, và chênh lệch này thu hẹp về 0 khi đáo hạn. Chiến lược "cash and carry": mua spot và short hợp đồng quý cùng khối lượng, giữ tới đáo hạn để hưởng basis.' },
      { type: 'calc', title: 'Basis hợp đồng quý (giá giả định)', rows: [
        ['Spot', '80.000'],
        ['Hợp đồng quý, còn 90 ngày', '81.600'],
        ['Basis', '(81.600 − 80.000) ÷ 80.000 = 2%'],
        ['Quy đổi năm (đơn giản)', '2% × 365 ÷ 90 ≈ 8,1%/năm, trước phí']
      ], result: 'Lãi này đến từ việc chênh lệch hội tụ, không từ đoán hướng giá. Nhưng nó chỉ đạt được nếu bạn giữ được cả hai chân tới cuối.' },
      { type: 'p', text: '<strong>Funding arbitrage</strong> theo tài liệu Binance là chiến lược delta-neutral (trung tính với biến động giá): long spot và short perpetual cùng khối lượng. Lỗ ở chân này được bù bằng lãi ở chân kia, còn bạn thu funding khi funding dương.' },
      { type: 'calc', title: 'Funding arbitrage 1 BTC (giả định)', rows: [
        ['Long spot', '1 BTC × 80.000 = 80.000 USDT'],
        ['Short perpetual', '1 BTC, ký quỹ Isolated 20.000 USDT (4x)'],
        ['Tổng vốn cần', '100.000 USDT'],
        ['Funding giả định', '+0,01% mỗi 8 giờ → 80.000 × 0,03% = 24 USDT/ngày'],
        ['Một năm nếu funding không đổi', '24 × 365 = 8.760 USDT ≈ 8,76% trên vốn 100.000'],
        ['Phí vào ra (giả định spot 0,1%, futures 0,05% mỗi chiều)', '80.000 × 0,1% × 2 + 80.000 × 0,05% × 2 = 240 USDT'],
        ['Giá thanh lý gần đúng chân short 4x', '80.000 × (1 + 0,25 − 0,004) = 99.680, tức giá chỉ cần tăng khoảng 24,6%']
      ], result: 'Vài phần trăm mỗi năm trên số vốn lớn, với giả định funding luôn dương. Con số này nhỏ hơn nhiều so với những gì quảng cáo "lợi nhuận thụ động" hay hứa hẹn, và rủi ro thì có thật.' },
      { type: 'p', text: 'Rủi ro thật của chiến lược "trung tính":' },
      { type: 'list', items: [
        '<strong>Sàn sụp đổ:</strong> cả hai chân thường nằm trên cùng một sàn. FTX sụp đổ tháng 11/2022; SEC sau đó cáo buộc tiền của khách hàng FTX bị chuyển sang Alameda Research. Delta-neutral không bảo vệ bạn khỏi rủi ro đối tác: sàn mất thì cả hai chân cùng mất.',
        '<strong>Thanh lý chân short khi giá tăng mạnh:</strong> spot lãi nhưng nằm ở ví khác, chân short có thể bị thanh lý trước khi bạn kịp nạp ký quỹ. Khi đó bạn chỉ còn một chân long trần, không còn trung tính.',
        '<strong>Funding đảo chiều:</strong> Binance nêu rõ khi funding âm, người short phải trả phí thay vì nhận. Funding âm kéo dài làm chiến lược lỗ dần.',
        '<strong>ADL (tự động giảm đòn bẩy):</strong> khi quỹ bảo hiểm không đỡ nổi, vị thế đang lãi bị đóng bớt. CoinGecko ghi nhận ngày 10/10/2025 nhiều vị thế delta-neutral của market maker bị ADL đóng mất chân short đang lãi, để lại chân long lỗ không được bù.',
        '<strong>Chênh lệch giá cực đoan:</strong> trong biến động mạnh, giá perpetual có thể lệch xa spot, gây lỗ tạm thời trên chân futures đủ lớn để đe dọa ký quỹ.'
      ] },
      { type: 'callout', tone: 'risk', title: '"Không rủi ro" là tín hiệu cảnh báo', text: 'Bất kỳ sản phẩm nào gọi funding arbitrage là "lãi chắc chắn" đều đang bỏ qua rủi ro sàn, thanh lý, funding đảo chiều và ADL. Hiểu cơ chế để đọc thị trường là đủ; đừng dồn phần lớn tài sản vào một sàn để "ăn funding".' },

      { type: 'h', text: 'Vì sao không dùng grid và martingale với đòn bẩy' },
      { type: 'p', text: 'Grid (lưới) đặt sẵn nhiều lệnh mua dưới giá và bán trên giá, ăn chênh lệch mỗi khi giá dao động. Trong thị trường đi ngang, nó tạo ra rất nhiều lần thắng nhỏ, nhìn biểu đồ lợi nhuận rất đẹp. Vấn đề nằm ở xu hướng: khi giá giảm một mạch, grid long mua đầy các tầng rồi ôm toàn bộ khối lượng đó, và đòn bẩy biến lỗ tạm thời thành thanh lý.' },
      { type: 'calc', title: 'Grid long 10 tầng có đòn bẩy (giả định, tài khoản 1.000 USDT)', rows: [
        ['Thiết lập', '10 lệnh mua, mỗi lệnh 0,0125 BTC, cách nhau 800 USDT từ 79.200 xuống 72.000'],
        ['Lãi mỗi ô lưới khi giá dao động', '0,0125 × 800 = 10 USDT'],
        ['Nếu giá giảm thẳng qua cả 10 tầng', 'Nắm 0,125 BTC, tổng 9.450 USDT, giá vốn trung bình 75.600'],
        ['Đòn bẩy thật lúc này', '9.450 ÷ 1.000 ≈ 9,5x'],
        ['Giá xuống 68.000 (−15% từ 80.000)', 'Lỗ 0,125 × (75.600 − 68.000) = 950 USDT, gần như cháy tài khoản']
      ], result: 'Một đợt giảm 15% xóa đi thành quả của khoảng 95 ô lưới thắng. Grid không có dừng lỗ về bản chất là martingale chậm: càng giảm càng mua thêm.' },
      { type: 'p', text: 'Martingale với đòn bẩy còn nhanh hơn: nhồi gấp đôi sau mỗi lần giảm. Như bài 5.10 đã tính, nhồi 4 lần gấp đôi mỗi 2.000 USDT từ 80.000 dẫn tới đòn bẩy thật khoảng 11,3x và cháy tài khoản khi BTC giảm khoảng 14%. Ngày 10/10/2025, BTC giảm khoảng 14,5% trong một ngày. Chiến lược này không cần xác suất thấp để thất bại; nó chỉ cần một ngày tồi tệ.' },
      { type: 'scenario', title: 'Đang giữ spot, thị trường có dấu hiệu yếu', setup: 'Bạn giữ 0,5 BTC spot mua giá 80.000. D1 bắt đầu tạo đỉnh thấp hơn, tuần sau có FOMC. Một nhóm chat rủ chạy bot grid long 20x để "tận dụng biến động".', bad: 'Trader cảm tính chạy grid long 20x bằng 2.000 USDT trong ví futures, đồng thời vẫn giữ nguyên spot không kế hoạch. Giá giảm 15% sau FOMC: grid mua đầy các tầng và bị thanh lý, spot lỗ 6.000 USDT. Họ lỗ cả hai nơi, cùng một chiều.', good: 'Trader có kế hoạch viết rõ: hedge 50% bằng short 0,25 BTC perpetual, Isolated 2x, gỡ hedge khi D1 lấy lại đỉnh gần nhất hoặc sau 3 tuần. Giá giảm 15%: spot −6.000, short +3.000, ròng −3.000. Không grid, không nhồi lệnh. Khi xu hướng giảm được xác nhận, họ xem xét thêm lệnh short riêng với rủi ro 0,5%, SL trên đỉnh cấu trúc.' },
      { type: 'callout', tone: 'tip', title: 'Luyện trước trên Demo Trading', text: 'Thử mở một cặp hedge (long và short) và một lệnh short có SL trên Binance Demo Trading. Quan sát giá thanh lý của chân short thay đổi thế nào khi bạn đổi đòn bẩy trên thanh trượt.' }
    ],
    keyPoints: [
      'Short hợp lệ cần D1 giảm, giá hồi lên kháng cự, kích hoạt trên khung nhỏ; SL trên đỉnh cấu trúc cộng vùng đệm, khối lượng tính từ rủi ro',
      'Short khó hơn long vì lỗ không giới hạn, short squeeze, funding âm khi đám đông short và xu hướng tăng dài hạn của BTC qua các chu kỳ',
      'Hedge 50% danh mục spot cắt đôi cả lỗ lẫn lãi; chân short phải có ký quỹ riêng và đòn bẩy thấp để không bị thanh lý',
      'Basis và funding arbitrage chỉ cho vài phần trăm mỗi năm và vẫn có rủi ro sàn sụp, thanh lý chân short, funding đảo chiều, ADL',
      'Grid và martingale có đòn bẩy thắng nhỏ nhiều lần rồi mất gần hết trong một đợt giảm 14–15%'
    ],
    practice: [
      'Chọn một đợt giảm của BTC hoặc ETH trên D1 trong quá khứ. Đánh dấu một điểm short hợp lệ theo 3 lớp, đặt SL trên đỉnh cấu trúc, tính khối lượng với rủi ro 0,5% vốn của bạn.',
      'Với danh mục spot giả định của bạn, tính kết quả hedge 25% và 50% khi giá giảm 20% và tăng 20%. Tính giá thanh lý chân short ở 2x và 5x.',
      'Tra funding hiện tại của BTCUSDT perpetual trên Binance Futures → Data. Tính funding một vị thế 1.000 USDT phải trả hoặc nhận trong 30 ngày nếu mức đó giữ nguyên.'
    ],
    quiz: [
      { q: 'Vốn 1.000 USDT, rủi ro 0,5%. Short BTC tại 80.000, đỉnh cấu trúc 80.900, bạn đặt SL 81.000. Khối lượng đúng là bao nhiêu?', options: ['0,0025 BTC', '0,0556 BTC', '0,005 BTC', '0,05 BTC'], answer: 2, explain: 'Rủi ro 5 USDT, khoảng dừng lỗ 1.000 USDT → 5 ÷ 1.000 = 0,005 BTC. 0,0025 là tính với rủi ro 0,25%. 0,05 và 0,0556 là tính rủi ro 50 USDT (5%) với khoảng 1.000 và 900, sai cả rủi ro lẫn chỗ đặt SL.' },
      { q: 'Bạn giữ 1 BTC spot, short 0,5 BTC perpetual ở 80.000. Giá xuống 72.000. Lãi lỗ ròng là bao nhiêu (bỏ qua phí, funding)?', options: ['−4.000 USDT', '+4.000 USDT', '−8.000 USDT', '0 USDT'], answer: 0, explain: 'Spot lỗ 8.000, short lãi 0,5 × 8.000 = 4.000, ròng −4.000 = (1 − 0,5) × 8.000. −8.000 là không hedge. 0 chỉ đúng khi hedge 100%. +4.000 là chỉ nhìn chân short.' },
      { q: 'Chiến lược long spot + short perpetual cùng khối lượng để nhận funding. Rủi ro nào KHÔNG được delta-neutral bảo vệ?', options: ['Giá BTC giảm 10% trong một ngày yên ả', 'Giá dao động ngang trong biên độ hẹp', 'Funding dương ổn định', 'Sàn sụp đổ, ADL đóng chân short đang lãi, hoặc chân short bị thanh lý khi giá tăng vọt'], answer: 3, explain: 'Delta-neutral chỉ bù trừ biến động giá thông thường giữa hai chân. Rủi ro đối tác (như FTX 2022), ADL (như 10/10/2025) và thanh lý chân short phá vỡ tính trung tính. Giá giảm 10% bình thường, đi ngang hay funding dương ổn định là những trường hợp chiến lược vận hành đúng.' },
      { q: 'Vì sao grid long có đòn bẩy nguy hiểm trong xu hướng giảm?', options: ['Vì grid càng giảm càng mua thêm, tích lũy khối lượng lớn mà không có dừng lỗ, nên một đợt giảm mạnh có thể xóa kết quả của hàng chục ô lưới thắng', 'Vì grid chỉ hoạt động khi funding âm', 'Vì grid không bao giờ khớp lệnh trong xu hướng giảm', 'Vì grid luôn dùng Cross nên phí cao hơn'], answer: 0, explain: 'Grid long mua dần các tầng khi giá giảm, giống martingale chậm. Trong ví dụ, 10 tầng với 1.000 USDT cho đòn bẩy thật 9,5x, giảm 15% lỗ khoảng 950 USDT, bằng 95 ô lưới thắng. Grid không phụ thuộc funding, vẫn khớp lệnh trong xu hướng giảm (chính vì vậy mới ôm hàng), và chế độ ký quỹ không làm phí khác.' }
    ],
    sources: [
      { title: 'What Is a Short Squeeze?', url: 'https://www.binance.com/en/academy/articles/what-is-a-short-squeeze', note: 'Binance Academy, tiếng Anh' },
      { title: 'What Is Hedge Mode and How to Use It?', url: 'https://www.binance.com/en/support/faq/detail/360041513552', note: 'Binance Support: ví dụ long 1 BTC + short 0,5 BTC, tiếng Anh' },
      { title: 'How to Use the Funding Rate Arbitrage on Binance Futures?', url: 'https://www.binance.com/en/support/faq/how-to-use-the-funding-rate-arbitrage-on-binance-futures-61012e690cf343e7979649282a2ccc3c', note: 'Binance Support: định nghĩa delta-neutral, tiếng Anh' },
      { title: 'Introduction to Binance Futures Funding Rates', url: 'https://www.binance.com/en/support/faq/detail/360033525031', note: 'Binance Support, tiếng Anh' },
      { title: 'What Is Auto-Deleveraging (ADL) and How Does It Work?', url: 'https://www.binance.com/en/support/faq/detail/360033525471', note: 'Binance Support, tiếng Anh' },
      { title: 'SEC Charges Samuel Bankman-Fried with Defrauding Investors in Crypto Asset Trading Platform FTX', url: 'https://www.sec.gov/newsroom/press-releases/2022-219', note: 'SEC, 12/2022, tiếng Anh' },
      { title: 'October 10 Crypto Crash Explained', url: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained', note: 'CoinGecko, 2025: ADL với vị thế delta-neutral, tiếng Anh' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
