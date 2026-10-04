const lessons = {
  'c6-b1': {
    duration: 10,
    level: 'Trung cấp',
    summary: 'Tính khối lượng lệnh từ số tiền bạn chấp nhận mất, không phải từ số tiền bạn có hay đòn bẩy sàn cho. Kèm phí, trượt giá và giới hạn rủi ro ngày/tuần.',
    goals: [
      'Tính đúng khối lượng lệnh từ % rủi ro, giá vào và giá dừng lỗ cho cả spot và futures',
      'Hiểu vì sao khối lượng không phụ thuộc đòn bẩy, và đòn bẩy chỉ quyết định ký quỹ',
      'Đưa phí và trượt giá vào phép tính để lỗ thực tế không vượt mức đã định',
      'Đặt giới hạn rủi ro ngày, tuần và tổng rủi ro các lệnh đang mở'
    ],
    blocks: [
      { type: 'h', text: 'Quy tắc 1%: bạn quyết định số tiền mất trước khi vào lệnh' },
      { type: 'p', text: 'Phần lớn trader mới bắt đầu bằng câu hỏi: "Mình nên mua bao nhiêu?". Họ trả lời bằng cảm giác: tài khoản có 1.000 USDT thì mua 500 USDT, thấy "chắc ăn" thì mua cả 1.000 USDT. Cách nghĩ này đặt câu hỏi sai. Câu hỏi đúng là: <strong>"Nếu mình sai, mình chấp nhận mất bao nhiêu?"</strong>' },
      { type: 'p', text: '<strong>Quy tắc 1%</strong> nghĩa là mỗi lệnh, nếu chạm dừng lỗ (stop loss), bạn chỉ mất tối đa 1% tài khoản. Tài khoản 1.000 USDT thì mỗi lệnh chỉ được mất 10 USDT. Binance Academy mô tả đúng ý này: quy tắc 1% không giới hạn số tiền bạn bỏ vào lệnh, mà giới hạn số tiền bạn có thể mất. Tài liệu futures của Binance cũng nêu mức thường dùng cho tài sản biến động mạnh là 1–2% mỗi lệnh.' },
      { type: 'p', text: 'Số tiền rủi ro này gọi là <strong>1R</strong> (R viết tắt của risk, rủi ro ban đầu). Từ bài này trở đi, mọi lời lỗ trong khóa học sẽ được đo bằng R: lỗ đúng dừng lỗ là −1R, lãi gấp đôi rủi ro là +2R. Bài 6.2 sẽ đi sâu vào R-multiple.' },
      { type: 'analogy', text: 'Giống như đi chợ với ngân sách. Bạn không hỏi "túi mình có bao nhiêu tiền thì tiêu hết bấy nhiêu", mà hỏi "bữa này mình chi tối đa bao nhiêu". Quy tắc 1% là ngân sách thua lỗ cho mỗi lần thử.' },
      { type: 'callout', tone: 'warn', title: 'Lầm tưởng: rủi ro 1% nghĩa là chỉ mua 1% tài khoản', text: 'Sai. Nếu dừng lỗ cách giá vào 2%, bạn có thể mua lệnh trị giá 50% tài khoản mà vẫn chỉ mất 1% khi dừng lỗ kích hoạt. Rủi ro là tích của <em>khối lượng</em> và <em>khoảng cách dừng lỗ</em>, không phải bản thân khối lượng.' },

      { type: 'h', text: 'Công thức khối lượng lệnh' },
      { type: 'formula', title: 'Khối lượng theo rủi ro cố định', expr: 'Khối lượng = Số tiền rủi ro ÷ |Giá vào − Giá dừng lỗ|', vars: [
        ['Số tiền rủi ro', 'Vốn tài khoản × % rủi ro mỗi lệnh (ví dụ 1.000 × 1% = 10 USDT)'],
        ['Giá vào', 'Giá bạn dự kiến khớp lệnh'],
        ['Giá dừng lỗ', 'Điểm mà nếu giá chạm tới, ý tưởng giao dịch đã sai (điểm vô hiệu)'],
        ['Khối lượng', 'Số coin (BTC, ETH...) cần mua hoặc bán khống']
      ], note: 'Giá trị lệnh (notional) = Khối lượng × Giá vào. Công thức đúng cho cả lệnh mua (long) và bán khống (short), vì dùng giá trị tuyệt đối của khoảng cách.' },
      { type: 'p', text: 'Thứ tự làm luôn là: <strong>(1)</strong> chọn điểm dừng lỗ theo cấu trúc giá (xem bài 5.7), <strong>(2)</strong> tính khoảng cách, <strong>(3)</strong> chia số tiền rủi ro cho khoảng cách. Không bao giờ làm ngược lại, tức là chọn khối lượng trước rồi "nhét" dừng lỗ cho vừa túi tiền. Dừng lỗ đặt vì túi tiền thường nằm ở chỗ giá hay chạm tới, và bạn bị quét lệnh liên tục.' },
      { type: 'calc', title: 'Ví dụ spot: mua BTC (giá giả định)', rows: [
        ['Vốn tài khoản', '1.000 USDT'],
        ['Rủi ro 1%', '1.000 × 1% = 10 USDT'],
        ['Giá vào / dừng lỗ', '80.000 / 78.400 USDT (dưới đáy gần nhất)'],
        ['Khoảng cách dừng lỗ', '80.000 − 78.400 = 1.600 USDT (2%)'],
        ['Khối lượng', '10 ÷ 1.600 = 0,00625 BTC'],
        ['Giá trị lệnh', '0,00625 × 80.000 = 500 USDT'],
        ['Kiểm tra', '0,00625 × 1.600 = 10 USDT = 1% tài khoản']
      ], result: 'Bạn mua 500 USDT BTC, tức một nửa tài khoản, nhưng chỉ rủi ro 10 USDT nếu dừng lỗ kích hoạt đúng giá.' },
      { type: 'calc', title: 'Ví dụ khác: dừng lỗ xa hơn thì khối lượng nhỏ hơn', rows: [
        ['ETH giá vào (giả định)', '3.000 USDT'],
        ['Dừng lỗ', '2.910 USDT, khoảng cách 90 USDT (3%)'],
        ['Khối lượng', '10 ÷ 90 ≈ 0,1111 ETH'],
        ['Giá trị lệnh', '0,1111 × 3.000 ≈ 333 USDT']
      ], result: 'Dừng lỗ 3% thì chỉ được mua khoảng 333 USDT. Dừng lỗ càng xa, khối lượng càng nhỏ, rủi ro tiền vẫn là 10 USDT.' },
      { type: 'tool', name: 'position-size', note: 'Nhập vốn, % rủi ro, giá vào và giá dừng lỗ để kiểm tra lại hai ví dụ trên. Thử đổi dừng lỗ từ 2% lên 4% và xem khối lượng giảm một nửa.' },

      { type: 'h', text: 'Futures: khối lượng độc lập với đòn bẩy' },
      { type: 'p', text: 'Đây là điểm quan trọng nhất của bài với người chơi futures. <strong>Đòn bẩy không quyết định bạn lời lỗ bao nhiêu khi giá chạm dừng lỗ. Khối lượng mới quyết định.</strong> Đòn bẩy chỉ quyết định bạn phải đặt cọc (ký quỹ) bao nhiêu để mở được khối lượng đó.' },
      { type: 'table', head: ['Cùng setup BTC: vào 80.000, dừng lỗ 78.400', 'Spot', 'Futures 5x', 'Futures 10x', 'Futures 20x'], rows: [
        ['Khối lượng (theo rủi ro 10 USDT)', '0,00625 BTC', '0,00625 BTC', '0,00625 BTC', '0,00625 BTC'],
        ['Giá trị lệnh', '500 USDT', '500 USDT', '500 USDT', '500 USDT'],
        ['Tiền cần bỏ ra / ký quỹ', '500 USDT', '100 USDT', '50 USDT', '25 USDT'],
        ['Lỗ khi chạm dừng lỗ (chưa phí)', '10 USDT', '10 USDT', '10 USDT', '10 USDT']
      ] },
      { type: 'p', text: 'Nhìn bảng: lỗ khi chạm dừng lỗ luôn là 10 USDT dù dùng đòn bẩy nào. Cái thay đổi là ký quỹ bị khóa và khoảng cách tới giá thanh lý. Với 10x, giá thanh lý isolated gần đúng của lệnh long là 80.000 × (1 − 0,1 + 0,004) = 72.320 (giả định MMR 0,4%), nằm dưới dừng lỗ 78.400 khá xa. Dừng lỗ phải luôn nằm trước giá thanh lý rất xa; nếu không, sàn sẽ đóng lệnh của bạn trước dừng lỗ (xem bài 5.2 và 5.3).' },
      { type: 'p', text: 'Trader thua lỗ nặng thường làm ngược: có 100 USDT, chọn 20x, mở luôn lệnh 2.000 USDT. Với dừng lỗ 2%, một lần sai là mất 40 USDT, tức 40% số tiền, trong khi họ tưởng mình "chỉ dùng 100 USDT". Vấn đề không phải đòn bẩy 20x, mà là khối lượng quá lớn so với rủi ro chấp nhận được.' },
      { type: 'callout', tone: 'risk', title: 'Đòn bẩy cao làm hỏng kỷ luật, không phải công thức', text: 'Về toán, bạn có thể dùng 20x với khối lượng đúng. Nhưng đòn bẩy cao để lại nhiều tiền "rảnh" trong ví, khiến bạn dễ nhồi thêm lệnh hoặc nâng khối lượng khi nóng máu. Người mới nên giữ đòn bẩy trên thanh trượt thấp: thấp hơn càng tốt, tối đa 5x–10x theo bài 5.9, sao cho giá thanh lý cách giá vào ít nhất gấp 3 lần khoảng dừng lỗ; đòn bẩy thật (tổng danh nghĩa ÷ vốn) không quá 3x. Dùng ký quỹ isolated và luyện trên Demo Trading của sàn trước khi dùng tiền thật.' },

      { type: 'h', text: 'Tính phí và trượt giá vào rủi ro' },
      { type: 'p', text: 'Lỗ thực tế khi chạm dừng lỗ luôn lớn hơn 1R lý thuyết vì ba khoản: <strong>phí vào lệnh</strong>, <strong>phí thoát lệnh</strong> và <strong>trượt giá (slippage)</strong>, tức chênh lệch giữa giá dừng lỗ bạn đặt và giá khớp thật. Dừng lỗ dạng Stop-Market luôn khớp nếu còn thanh khoản nhưng có thể trượt khi thị trường chạy mạnh. Biểu phí spot Binance cho người dùng thường là 0,1% mỗi chiều (maker và taker).' },
      { type: 'calc', title: 'Lỗ thực tế của lệnh spot BTC ở trên', rows: [
        ['Phí mua', '500 × 0,1% = 0,50 USDT'],
        ['Giá trị khi thoát ở dừng lỗ', '0,00625 × 78.400 = 490 USDT'],
        ['Phí bán', '490 × 0,1% = 0,49 USDT'],
        ['Trượt giá giả định 0,05%', '490 × 0,05% ≈ 0,25 USDT'],
        ['Tổng lỗ thực tế', '10 + 0,50 + 0,49 + 0,25 ≈ 11,24 USDT (≈ 1,12% tài khoản)']
      ], result: 'Lệnh "rủi ro 1%" thực ra mất khoảng 1,12%. Nếu dừng lỗ hẹp hơn, phần phí chiếm tỷ trọng còn lớn hơn.' },
      { type: 'formula', title: 'Khối lượng đã tính chi phí', expr: 'Khối lượng = Số tiền rủi ro ÷ (Khoảng cách dừng lỗ + Phí vào mỗi đơn vị + Phí ra mỗi đơn vị + Trượt giá mỗi đơn vị)', vars: [
        ['Phí vào mỗi đơn vị', 'Giá vào × tỷ lệ phí'],
        ['Phí ra mỗi đơn vị', 'Giá dừng lỗ × tỷ lệ phí'],
        ['Trượt giá mỗi đơn vị', 'Giá dừng lỗ × % trượt giá dự phòng']
      ] },
      { type: 'calc', title: 'Tính lại khối lượng có chi phí', rows: [
        ['Spot: chi phí mỗi BTC', '1.600 + 80.000 × 0,1% + 78.400 × 0,1% + 78.400 × 0,05% = 1.600 + 80 + 78,4 + 39,2 = 1.797,6 USDT'],
        ['Spot: khối lượng', '10 ÷ 1.797,6 ≈ 0,00556 BTC (≈ 445 USDT)'],
        ['Futures, phí taker giả định 0,05%', '1.600 + 40 + 39,2 + 39,2 = 1.718,4 USDT mỗi BTC'],
        ['Futures: khối lượng', '10 ÷ 1.718,4 ≈ 0,00582 BTC (≈ 466 USDT)']
      ], result: 'Khối lượng giảm khoảng 7–11% so với cách tính bỏ qua chi phí, nhưng lỗ thực tế giờ đúng bằng 10 USDT. Với futures, nhớ cộng thêm funding nếu giữ lệnh qua các mốc thanh toán (bài 5.4).' },
      { type: 'callout', tone: 'tip', title: 'Mẹo làm tròn', text: 'Luôn làm tròn khối lượng <strong>xuống</strong> theo bước khối lượng tối thiểu của sàn. Làm tròn lên là tự nâng rủi ro lên trên 1%.' },

      { type: 'h', text: 'Giới hạn rủi ro ngày, tuần và tổng rủi ro đang mở' },
      { type: 'p', text: 'Quy tắc 1% bảo vệ từng lệnh. Nhưng nếu bạn vào 10 lệnh một ngày, mỗi lệnh 1%, bạn vẫn có thể mất 10% trong vài giờ. Vì vậy cần thêm giới hạn ở cấp độ ngày, tuần và danh mục.' },
      { type: 'table', head: ['Giới hạn', 'Mức chuẩn (bài 5.9)', 'Khi chạm thì làm gì'], rows: [
        ['Lỗ trong ngày', '2R (2% tài khoản khi R = 1%)', 'Dừng giao dịch, nghỉ đến hôm sau'],
        ['Thua liên tiếp', '2 lệnh', 'Dừng trong ngày, dù chưa chạm 2R'],
        ['Số lệnh mỗi ngày', 'Tối đa 3', 'Đủ 3 lệnh thì không mở thêm đến hôm sau'],
        ['Lỗ trong tuần', '5R (5% tài khoản khi R = 1%)', 'Nghỉ đến tuần sau, dành thời gian xem lại nhật ký'],
        ['Tổng rủi ro các lệnh đang mở', 'Tối đa 2 vị thế, tổng ≤ 2R', 'Không mở lệnh mới cho đến khi có lệnh đóng'],
        ['Lệnh tương quan (BTC, ETH, altcoin cùng chiều)', 'Tính như một lệnh lớn', 'Long BTC và long ETH cùng lúc gần như là một cược; giảm khối lượng từng lệnh']
      ] },
      { type: 'p', text: 'Đây là bộ chuẩn của khóa học (bài 5.9); bạn có thể chặt hơn, không được lỏng hơn. Binance trong bài về quản lý rủi ro futures nêu tổng vốn chịu rủi ro nên dưới 10% danh mục. Với người mới, mức ≤ 2R an toàn hơn nhiều vì crypto thường cùng rơi một lúc. Khi drawdown chạm 10% hoặc 20%, bạn áp dụng quy tắc giảm rủi ro và dừng giao dịch ở bài 6.3.' },
      { type: 'scenario', title: 'Hai trader, cùng tài khoản 1.000 USDT, cùng setup BTC', setup: 'BTC 80.000 (giả định), cả hai thấy tín hiệu long, dừng lỗ hợp lý ở 78.400.', bad: 'Trader A thấy "setup đẹp", chọn 20x, dùng 200 USDT ký quỹ mở lệnh 4.000 USDT. Không tính khối lượng, dừng lỗ để "tính sau". Giá quét xuống 78.300 rồi mới bật lên. Nếu có đặt dừng lỗ thì A mất khoảng 4.000 × 2% = 80 USDT cộng phí; nếu không đặt, A gồng tiếp và rủi ro mất cả 200 USDT ký quỹ.', good: 'Trader B tính trước: rủi ro 10 USDT, khoảng cách kèm chi phí 1.718,4 USDT/BTC, khối lượng 0,00582 BTC, dùng 5x isolated (ký quỹ khoảng 93 USDT). Dừng lỗ Stop-Market đặt ngay khi vào lệnh. Giá chạm dừng lỗ, B mất đúng khoảng 10 USDT, ghi nhật ký, chờ setup tiếp theo.' },
      { type: 'checklist', title: 'Trước mỗi lệnh', items: [
        'Đã xác định dừng lỗ theo cấu trúc giá, không theo túi tiền',
        'Số tiền rủi ro ≤ 1% vốn hiện tại (không phải vốn ban đầu)',
        'Khối lượng đã tính kèm phí và trượt giá, làm tròn xuống',
        'Giá thanh lý (futures) nằm xa ngoài dừng lỗ',
        'Tổng rủi ro đang mở và lỗ trong ngày còn dưới giới hạn'
      ] }
    ],
    keyPoints: [
      'Rủi ro mỗi lệnh (1R) = vốn × % rủi ro, thường 1%; đây là số tiền mất khi dừng lỗ kích hoạt.',
      'Khối lượng = Số tiền rủi ro ÷ khoảng cách dừng lỗ; chọn dừng lỗ trước, tính khối lượng sau.',
      'Đòn bẩy không đổi lời lỗ tại dừng lỗ; nó chỉ đổi ký quỹ và khoảng cách tới giá thanh lý.',
      'Cộng phí hai chiều và trượt giá vào khoảng cách để lỗ thực tế đúng bằng 1R.',
      'Đặt thêm giới hạn theo bài 5.9: lỗ ngày 2R, tuần 5R, thua 2 lệnh liên tiếp là dừng, tối đa 2 vị thế với tổng rủi ro mở ≤ 2R.'
    ],
    practice: [
      'Với tài khoản của bạn (hoặc giả định 1.000 USDT), tính khối lượng cho một lệnh long ETH giá 3.000, dừng lỗ 2.940, rủi ro 1%, phí 0,1% mỗi chiều, trượt giá 0,05%. Kiểm tra lại bằng công cụ trong bài.',
      'Mở Demo Trading futures, đặt cùng một lệnh với đòn bẩy 3x và 10x, ghi lại ký quỹ và giá thanh lý của mỗi lệnh, xác nhận lỗ tại dừng lỗ như nhau.',
      'Viết ra ba giới hạn của riêng bạn: % rủi ro mỗi lệnh, lỗ tối đa trong ngày, lỗ tối đa trong tuần. Dán ở chỗ bạn nhìn thấy khi giao dịch.'
    ],
    quiz: [
      { q: 'Tài khoản 2.000 USDT, rủi ro 1%. Long BTC tại 80.000, dừng lỗ 76.000 (bỏ qua phí). Khối lượng đúng là bao nhiêu?', options: ['0,025 BTC', '0,005 BTC', '0,0025 BTC', '0,05 BTC'], answer: 1, explain: 'Rủi ro 2.000 × 1% = 20 USDT; khoảng cách 4.000; khối lượng 20 ÷ 4.000 = 0,005 BTC (giá trị 400 USDT). 0,025 BTC là lấy 2.000 ÷ 80.000 (mua hết tài khoản); 0,0025 BTC chỉ rủi ro 10 USDT; 0,05 BTC rủi ro 200 USDT, tức 10%.' },
      { q: 'Cùng lệnh BTC khối lượng 0,005 BTC ở trên, bạn chuyển từ đòn bẩy 5x sang 20x. Điều gì thay đổi?', options: ['Lỗ khi chạm dừng lỗ tăng gấp 4 lần, từ 20 lên 80 USDT', 'Lãi khi chốt lời tăng gấp 4 lần', 'Không có gì thay đổi, kể cả ký quỹ', 'Ký quỹ còn 20 USDT, thanh lý gần hơn'], answer: 3, explain: 'Khối lượng giữ nguyên nên lời lỗ theo giá giữ nguyên. Đòn bẩy chỉ đổi ký quỹ (400 ÷ 5 = 80; 400 ÷ 20 = 20) và kéo giá thanh lý lại gần. "Không có gì thay đổi" sai vì ký quỹ và giá thanh lý có đổi. Lưu ý 20x đã vượt trần thanh trượt 10x của bài 5.9.' },
      { q: 'Bạn tính rủi ro 10 USDT nhưng chạm dừng lỗ lại mất 11,5 USDT. Nguyên nhân hợp lý nhất?', options: ['Chưa tính phí hai chiều và trượt giá', 'Sàn tính sai số tiền lỗ của lệnh này', 'Đòn bẩy quá thấp nên lỗ bị khuếch đại', 'Giá thanh lý nằm quá xa so với dừng lỗ'], answer: 0, explain: 'Phí vào, phí ra và trượt giá cộng thêm vào lỗ. Cách sửa là cộng chúng vào khoảng cách trước khi chia. Đòn bẩy thấp hay giá thanh lý xa không làm lỗ tại dừng lỗ tăng; nghi sàn tính sai trước khi kiểm tra phí là bỏ qua nguyên nhân phổ biến nhất.' },
      { q: 'Rủi ro 1%/lệnh, giới hạn lỗ ngày 2R theo bài 5.9. Sáng nay bạn đã thua 2 lệnh liên tiếp (−2R) và thấy một setup rất đẹp. Làm gì?', options: ['Vào với 0,5% vì setup đẹp và rủi ro nhỏ', 'Vào với 2% để gỡ lại nhanh hai lệnh thua', 'Dừng đến hết ngày, ghi setup vào nhật ký', 'Vào lệnh nhưng bỏ dừng lỗ để tránh bị quét'], answer: 2, explain: 'Bạn đã chạm cả hai cầu dao: lỗ 2R trong ngày và thua 2 lệnh liên tiếp. Giới hạn chỉ có tác dụng khi bạn tôn trọng nó tuyệt đối. Giảm khối lượng vẫn là phá quy tắc; tăng lên 2% là giao dịch trả thù; bỏ dừng lỗ là rủi ro không giới hạn.' }
    ],
    sources: [
      { title: 'How to Calculate Position Size in Trading', url: 'https://www.binance.com/en/academy/articles/how-to-calculate-position-size-in-trading', note: 'Binance Academy, tiếng Anh: công thức khối lượng theo % rủi ro và điểm vô hiệu' },
      { title: 'A Beginner\'s Guide to Risk Management', url: 'https://www.binance.com/en/academy/articles/a-beginners-guide-to-understanding-risk-management', note: 'Binance Academy, tiếng Anh: quy tắc 1%' },
      { title: 'Crypto Futures Risk and Money Management: 5 Things You Can Do to Better Manage Trading Risk', url: 'https://www.binance.com/en/blog/futures/crypto-futures-risk-and-money-management-5-things-you-can-do-to-better-manage-trading-risk-421499824684902191', note: 'Binance Blog, tiếng Anh: rủi ro 1–2%/lệnh, tổng rủi ro dưới 10%' },
      { title: 'Binance Trading Fee Rate (Spot)', url: 'https://www.binance.com/en/fee/trading', note: 'Binance, tiếng Anh: phí spot người dùng thường 0,1%' },
      { title: 'Types of Order on Binance Futures (Stop-Limit, Stop-Market)', url: 'https://www.binance.com/en/support/faq/detail/360036351051', note: 'Binance FAQ, tiếng Anh: Stop-Market có thể trượt giá' }
    ],
    updated: '2026-09'
  },

  'c6-b2': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Đo mọi lệnh bằng R, tính kỳ vọng, biết tỷ lệ thắng hòa vốn theo R:R, hiểu chuỗi thua là chuyện bình thường, và làm quen tiêu chuẩn Kelly.',
    goals: [
      'Quy đổi kết quả mọi lệnh ra R-multiple',
      'Tính kỳ vọng của một hệ thống và tỷ lệ thắng hòa vốn theo R:R, có tính phí',
      'Ước lượng chuỗi thua liên tiếp bạn sẽ gặp để không hoảng loạn',
      'Hiểu Kelly ở mức nguyên lý và vì sao chỉ dùng một phần nhỏ'
    ],
    blocks: [
      { type: 'h', text: 'R-multiple: đo mọi lệnh bằng cùng một thước' },
      { type: 'p', text: 'Van Tharp định nghĩa <strong>R</strong> là rủi ro ban đầu của lệnh, xác định bởi dừng lỗ ban đầu. <strong>R-multiple</strong> là kết quả lệnh chia cho R. Ví dụ của ông: mua cổ phiếu 50 USD, dừng lỗ 47 USD thì R là 3 USD mỗi cổ phiếu; thoát ở 47 là −1R; thoát ở 56 là +2R (lãi 6 USD ÷ 3 USD).' },
      { type: 'p', text: 'Vì sao dùng R thay vì USDT hay %? Vì tài khoản của bạn thay đổi theo thời gian, khối lượng mỗi lệnh khác nhau. Lãi 30 USDT có thể là lệnh tốt (+3R khi R = 10) hoặc lệnh tệ (+0,3R khi R = 100). R giúp bạn so sánh công bằng mọi lệnh, mọi giai đoạn, và nhận ra ngay lệnh nào lỗ quá −1R, dấu hiệu bạn đã dời hoặc bỏ dừng lỗ.' },
      { type: 'table', head: ['Lệnh (R = 10 USDT)', 'Kết quả', 'R-multiple', 'Nhận xét'], rows: [
        ['Chạm dừng lỗ', '−10 USDT', '−1R', 'Thua hợp lệ'],
        ['Chốt lời ở mục tiêu', '+25 USDT', '+2,5R', 'Đúng kế hoạch'],
        ['Thoát sớm vì sợ', '+4 USDT', '+0,4R', 'Cắt lãi quá sớm'],
        ['Gồng lỗ rồi mới cắt', '−32 USDT', '−3,2R', 'Lỗi kỷ luật nghiêm trọng']
      ] },
      { type: 'callout', tone: 'note', title: 'Tỷ lệ R:R', text: 'R:R (risk:reward) là tỷ lệ giữa rủi ro và lợi nhuận mục tiêu khi lên kế hoạch. Dừng lỗ cách 1.600, mục tiêu cách 3.200 là R:R 1:2. Đây là kế hoạch; R-multiple là kết quả thực tế sau khi đóng lệnh.' },

      { type: 'h', text: 'Kỳ vọng: con số quyết định bạn lãi hay lỗ về lâu dài' },
      { type: 'formula', title: 'Kỳ vọng mỗi lệnh (tính theo R)', expr: 'Kỳ vọng = Tỷ lệ thắng × R thắng trung bình − (1 − Tỷ lệ thắng) × R thua trung bình', vars: [
        ['Tỷ lệ thắng (WR)', 'Số lệnh thắng ÷ tổng số lệnh'],
        ['R thắng trung bình', 'Trung bình R của các lệnh thắng'],
        ['R thua trung bình', 'Trung bình độ lớn R của các lệnh thua (số dương)']
      ], note: 'Kỳ vọng dương nghĩa là trung bình mỗi lệnh mang về một phần R. Van Tharp nhấn mạnh: tỷ lệ thắng cao là thứ yếu so với kỳ vọng dương.' },
      { type: 'calc', title: 'Hai hệ thống giả định, mỗi hệ 100 lệnh, R = 10 USDT', rows: [
        ['Hệ A: thắng 40%, thắng TB 2R, thua TB 1R', '0,4 × 2 − 0,6 × 1 = 0,8 − 0,6 = +0,2R mỗi lệnh'],
        ['Hệ A sau 100 lệnh', '40 × 2R − 60 × 1R = +20R = +200 USDT (chưa phí)'],
        ['Hệ B: thắng 70%, thắng TB 0,5R, thua TB 1,5R', '0,7 × 0,5 − 0,3 × 1,5 = 0,35 − 0,45 = −0,1R mỗi lệnh'],
        ['Hệ B sau 100 lệnh', '70 × 0,5R − 30 × 1,5R = 35R − 45R = −10R = −100 USDT']
      ], result: 'Hệ B thắng 7/10 lệnh, cảm giác rất "sướng", nhưng vẫn mất tiền. Hệ A thua nhiều hơn thắng nhưng có lãi. Tỷ lệ thắng một mình không nói lên gì.' },
      { type: 'p', text: 'Hệ B là chân dung của nhiều trader nhỏ lẻ: chốt lời rất sớm khi mới lãi chút ít, nhưng khi lỗ thì gồng và cắt muộn. Họ thắng thường xuyên, tự tin, rồi vài lệnh thua lớn xóa sạch thành quả. Bài 6.4 giải thích tâm lý đứng sau hành vi này.' },
      { type: 'tool', name: 'expectancy', note: 'Nhập tỷ lệ thắng, R thắng và R thua trung bình để xem kỳ vọng. Thử hệ B rồi tăng R thắng lên 0,8R để thấy chỉ cần giữ lãi thêm một chút là đổi dấu kỳ vọng.' },

      { type: 'h', text: 'Tỷ lệ thắng hòa vốn theo R:R, và phí làm thay đổi gì' },
      { type: 'formula', title: 'Tỷ lệ thắng hòa vốn', expr: 'WR hòa vốn = 1 ÷ (1 + b)  ;  có phí: WR hòa vốn = (1 + c) ÷ (1 + b)', vars: [
        ['b', 'Lãi mục tiêu tính theo R (R:R 1:2 thì b = 2)'],
        ['c', 'Chi phí mỗi lệnh (phí hai chiều + trượt giá) tính theo R']
      ], note: 'Công thức có phí: mỗi lệnh thắng nhận b − c, mỗi lệnh thua mất 1 + c; đặt kỳ vọng bằng 0 rồi giải ra WR.' },
      { type: 'table', head: ['R:R', 'WR hòa vốn (không phí)', 'WR hòa vốn (chi phí 0,1R/lệnh)'], rows: [
        ['1:1', '50%', '55%'],
        ['1:1,5', '40%', '44%'],
        ['1:2', '33,3%', '36,7%'],
        ['1:3', '25%', '27,5%']
      ] },
      { type: 'p', text: 'Chi phí 0,1R ở đâu ra? Ví dụ lệnh spot bài 6.1: rủi ro 10 USDT, phí hai chiều khoảng 1 USDT, tức 0,1R. Dừng lỗ càng hẹp thì phí tính theo R càng lớn. Một lệnh lướt sóng dừng lỗ 0,5% có thể tốn 0,3–0,4R phí, khiến R:R 1:1 cần thắng trên 60% mới hòa.' },
      { type: 'tool', name: 'rr', note: 'Nhập giá vào, dừng lỗ, chốt lời để xem R:R và tỷ lệ thắng hòa vốn tương ứng.' },
      { type: 'callout', tone: 'warn', title: 'R:R cao không miễn phí', text: 'Đặt mục tiêu 1:5 thì WR hòa vốn chỉ 16,7%, nhưng mục tiêu càng xa thì giá càng ít khi chạm tới. R:R và tỷ lệ thắng luôn đánh đổi với nhau. Thứ cần tối ưu là kỳ vọng, và bạn chỉ biết kỳ vọng thật sau khi ghi nhật ký đủ nhiều lệnh (bài 6.5).' },

      { type: 'h', text: 'Chuỗi thua liên tiếp là bình thường' },
      { type: 'p', text: 'Người mới hay nghĩ: "Hệ thống thắng 50% thì thua 5 lệnh liền là hệ thống hỏng". Toán nói khác. Bảng dưới được tính chính xác bằng quy hoạch động, kiểm lại bằng 200.000 lần mô phỏng, với giả định mỗi lệnh độc lập và tỷ lệ thắng không đổi.' },
      { type: 'table', head: ['Trong 100 lệnh, xác suất gặp ít nhất một chuỗi thua dài ≥', 'WR 60%', 'WR 50%', 'WR 40%'], rows: [
        ['4 lệnh', '80,1%', '97,3%', '99,9%'],
        ['5 lệnh', '45,9%', '81,0%', '97,6%'],
        ['6 lệnh', '21,2%', '54,6%', '87,3%'],
        ['7 lệnh', '8,9%', '31,8%', '68,9%'],
        ['8 lệnh', '3,6%', '17,0%', '49,0%']
      ] },
      { type: 'p', text: 'Với tỷ lệ thắng 50%, gần như chắc chắn (97%) bạn gặp chuỗi 4 lệnh thua, khoảng 4/5 khả năng gặp chuỗi 5 lệnh, và hơn một nửa khả năng gặp chuỗi 6 lệnh trong 100 lệnh. Chuỗi thua dài nhất trung bình khoảng 6 lệnh. Với tỷ lệ thắng 40%, chuỗi dài nhất trung bình gần 8 lệnh.' },
      { type: 'example', title: 'Chuỗi 8 lệnh thua ảnh hưởng thế nào?', text: 'Rủi ro 1% mỗi lệnh: 8 lệnh thua liên tiếp mất khoảng 7,7% tài khoản (0,99<sup>8</sup> ≈ 0,923), khó chịu nhưng vẫn giao dịch tiếp được. Rủi ro 10% mỗi lệnh: mất khoảng 57% (0,9<sup>8</sup> ≈ 0,430), cần lãi 132% chỉ để hòa vốn. Cùng một hệ thống, khác nhau ở % rủi ro.' },
      { type: 'scenario', title: 'Sau 5 lệnh thua liên tiếp', setup: 'Hệ thống đã kiểm chứng: thắng khoảng 45%, R:R 1:2. Tuần này bạn thua 5 lệnh liền, mỗi lệnh −1R.', bad: 'Trader cảm tính kết luận hệ thống "hết ăn", bỏ sang chiến lược mới xem trên mạng, và nâng rủi ro lên 3% để "gỡ nhanh". Hai lệnh sau lại thua, mất thêm 6%.', good: 'Trader có kế hoạch kiểm tra nhật ký: 5 lệnh đều đúng setup, đúng dừng lỗ, tức là thua hợp lệ. Chuỗi 5 lệnh nằm trong mức toán học dự đoán. Giữ rủi ro 1% (hoặc giảm còn 0,5% theo quy tắc drawdown ở bài 6.3), tiếp tục thực hiện đúng quy trình.' },

      { type: 'h', text: 'Kelly: giới thiệu và vì sao chỉ dùng một phần nhỏ' },
      { type: 'p', text: 'Năm 1956, John L. Kelly Jr. (Bell Labs) công bố bài "A New Interpretation of Information Rate". Ông chỉ ra rằng đặt cược toàn bộ vốn mỗi lần tối đa hóa giá trị kỳ vọng, nhưng về lâu dài người chơi gần như chắc chắn cháy sạch. Thay vào đó, người chơi nên đặt một <em>tỷ lệ cố định</em> của vốn để tối đa hóa tốc độ tăng trưởng dài hạn. Với cược ăn 1 thua 1, tỷ lệ đó bằng xác suất thắng trừ xác suất thua.' },
      { type: 'formula', title: 'Tiêu chuẩn Kelly (dạng thường dùng trong giao dịch)', expr: 'f* = WR − (1 − WR) ÷ b', vars: [
        ['f*', 'Tỷ lệ vốn tối ưu đem ra rủi ro mỗi lệnh'],
        ['WR', 'Tỷ lệ thắng'],
        ['b', 'Lãi trung bình khi thắng chia cho lỗ trung bình khi thua']
      ] },
      { type: 'calc', title: 'Kelly cho hệ A ở trên', rows: [
        ['WR = 40%, b = 2', 'f* = 0,4 − 0,6 ÷ 2 = 0,4 − 0,3 = 0,10'],
        ['Kelly đầy đủ', 'Rủi ro 10% vốn mỗi lệnh'],
        ['Một phần tư Kelly', '10% ÷ 4 = 2,5%']
      ], result: 'Ngay cả một phần tư Kelly (2,5%) vẫn cao hơn quy tắc 1–2%. Kelly đầy đủ 10% với chuỗi 8 lệnh thua sẽ mất hơn một nửa tài khoản.' },
      { type: 'list', items: [
        '<strong>Số liệu đầu vào không chắc chắn.</strong> WR và b bạn đo từ vài chục lệnh có sai số lớn. Ước lượng dư một chút là Kelly đẩy bạn vào vùng đặt cược quá mức, nơi tăng trưởng giảm và rủi ro phá sản tăng vọt.',
        '<strong>Thị trường thay đổi.</strong> Kỳ vọng năm ngoái không bảo đảm cho năm nay.',
        '<strong>Drawdown của Kelly đầy đủ quá sâu</strong> với tâm lý con người. Hầu hết trader bỏ cuộc hoặc giao dịch trả thù trước khi đường vốn kịp hồi phục.',
        '<strong>Kết luận thực dụng:</strong> dùng Kelly như trần tham khảo. Nếu Kelly âm hoặc bằng 0, hệ thống không có lợi thế, đừng giao dịch nó. Nếu dương, vẫn giữ 0,5–1% mỗi lệnh khi còn là người mới.'
      ] },
      { type: 'callout', tone: 'risk', title: 'Không có công thức nào cứu được hệ thống kỳ vọng âm', text: 'Quản lý vốn chỉ quyết định bạn đi nhanh hay chậm, và sống sót được bao lâu. Nếu kỳ vọng âm sau phí, mọi cách chia khối lượng đều dẫn đến lỗ. Luôn kiểm chứng kỳ vọng trên Demo Trading hoặc bằng nhật ký trước khi tăng rủi ro.' }
    ],
    keyPoints: [
      'R là rủi ro ban đầu; kết quả mỗi lệnh quy về R-multiple để so sánh công bằng.',
      'Kỳ vọng = WR × R thắng TB − (1 − WR) × R thua TB; tỷ lệ thắng cao chưa chắc có lãi.',
      'WR hòa vốn = 1 ÷ (1 + b): 1:1 cần 50%, 1:2 cần 33,3%, 1:3 cần 25%; có phí thì cao hơn.',
      'Với WR 50%, trong 100 lệnh có khoảng 81% khả năng gặp chuỗi 5 lệnh thua liền; chuỗi thua là bình thường.',
      'Kelly f* = WR − (1 − WR)/b chỉ là trần tham khảo; thực tế dùng một phần nhỏ hoặc giữ 0,5–1%.'
    ],
    practice: [
      'Lấy 10–20 lệnh gần nhất của bạn (hoặc lệnh demo), quy đổi từng lệnh ra R-multiple, tính WR, R thắng TB, R thua TB và kỳ vọng.',
      'Tính chi phí trung bình mỗi lệnh của bạn theo R (phí hai chiều ÷ số tiền rủi ro), rồi tra lại WR hòa vốn thực tế với R:R bạn hay dùng.',
      'Viết sẵn một câu cho mình đọc khi gặp chuỗi thua: "Với tỷ lệ thắng của mình, chuỗi X lệnh thua là bình thường. Mình chỉ kiểm tra xem có sai quy trình không."'
    ],
    quiz: [
      { q: 'Một hệ thống thắng 60%, thắng trung bình 0,8R, thua trung bình 1,4R. Kỳ vọng mỗi lệnh là bao nhiêu?', options: ['+0,48R', '+0,20R', '−0,08R', '−0,56R'], answer: 2, explain: '0,6 × 0,8 − 0,4 × 1,4 = 0,48 − 0,56 = −0,08R. +0,48R là chỉ tính phần thắng; −0,56R là chỉ tính phần thua; +0,20R không khớp phép tính nào đúng. Hệ thắng 60% vẫn lỗ.' },
      { q: 'Bạn dùng R:R 1:2 và chi phí mỗi lệnh khoảng 0,1R. Tỷ lệ thắng hòa vốn xấp xỉ bao nhiêu?', options: ['36,7%', '33,3%', '30%', '50%'], answer: 0, explain: '(1 + 0,1) ÷ (1 + 2) = 1,1 ÷ 3 ≈ 36,7%. 33,3% là khi bỏ qua phí; 50% là của R:R 1:1; 30% thấp hơn cả mức không phí nên chắc chắn sai.' },
      { q: 'Hệ thống thắng 50%. Bạn vừa thua 5 lệnh liên tiếp, cả 5 đều đúng setup và đúng dừng lỗ. Nhận định nào đúng?', options: ['Hệ thống đã hỏng, cần đổi chiến lược ngay', 'Lệnh tiếp theo chắc chắn thắng vì "đến lượt"', 'Nên tăng rủi ro lên để gỡ lại cho nhanh', 'Bình thường: trong 100 lệnh, khả năng ≈ 81%'], answer: 3, explain: 'Với WR 50%, trong 100 lệnh có khoảng 81% khả năng gặp ít nhất một chuỗi ≥ 5 lệnh thua. Kết luận hệ hỏng cần mẫu lớn hơn nhiều. Mỗi lệnh độc lập nên không có chuyện "đến lượt thắng" (ngụy biện con bạc). Tăng rủi ro sau chuỗi thua là giao dịch trả thù.' },
      { q: 'Hệ thống có WR 50%, b = 1,5. Kelly đầy đủ là bao nhiêu và bạn nên dùng thế nào?', options: ['50%, dùng toàn bộ vì Kelly là mức tăng trưởng tối ưu', 'Khoảng 16,7%; chỉ coi là trần tham khảo', '33,3%, dùng toàn bộ vì hệ có lợi thế', '0%, vì hệ thống không có lợi thế nào'], answer: 1, explain: 'f* = 0,5 − 0,5 ÷ 1,5 ≈ 0,5 − 0,333 = 0,167. Hệ có lợi thế nên không phải 0%. 50% và 33,3% là tính sai. Kể cả con số đúng 16,7% cũng quá lớn để dùng trực tiếp vì WR và b ước lượng có sai số; thực tế giữ 0,5–1% mỗi lệnh.' }
    ],
    sources: [
      { title: 'A Short Lesson on R and R-multiples', url: 'https://vantharp.com/wp-content/uploads/2018/06/A_Short_Lesson_on_R_and_R-multiple.pdf', note: 'Van Tharp Institute, tiếng Anh: định nghĩa R, R-multiple, kỳ vọng' },
      { title: 'A New Interpretation of Information Rate (Kelly, 1956)', url: 'https://www.princeton.edu/~wbialek/rome/refs/kelly_56.pdf', note: 'J. L. Kelly Jr., Bell System Technical Journal 35(4), 1956, tiếng Anh' },
      { title: 'A Beginner\'s Guide to Risk Management', url: 'https://www.binance.com/en/academy/articles/a-beginners-guide-to-understanding-risk-management', note: 'Binance Academy, tiếng Anh: tỷ lệ R:R 1:2, 1:3' }
    ],
    updated: '2026-09'
  },

  'c6-b3': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Vì sao lỗ 50% cần lãi 100% để hòa, rủi ro phá sản tăng vọt thế nào theo % rủi ro mỗi lệnh, và quy tắc dừng giao dịch khi drawdown chạm ngưỡng.',
    goals: [
      'Đọc được bảng phục hồi: lỗ X% cần lãi bao nhiêu % để hòa vốn',
      'Hiểu rủi ro phá sản phụ thuộc % rủi ro mỗi lệnh qua kết quả mô phỏng',
      'Đặt quy tắc giảm rủi ro và dừng giao dịch khi drawdown chạm 10% và 20%'
    ],
    blocks: [
      { type: 'h', text: 'Drawdown là gì và vì sao nó bất đối xứng' },
      { type: 'p', text: '<strong>Drawdown</strong> (sụt giảm vốn) là mức giảm của tài khoản tính từ đỉnh cao nhất gần nhất. Tài khoản lên 1.200 USDT rồi xuống 900 USDT thì drawdown là (1.200 − 900) ÷ 1.200 = 25%. <strong>Max drawdown</strong> là drawdown lớn nhất trong cả giai đoạn.' },
      { type: 'p', text: 'Điều nguy hiểm: lỗ và lãi không đối xứng. Lỗ 50% đưa 1.000 USDT xuống 500 USDT. Để quay lại 1.000 USDT, bạn cần lãi 500 USDT trên nền 500 USDT, tức <strong>100%</strong>. Lỗ tính trên vốn lớn, còn lãi phục hồi tính trên vốn đã nhỏ đi.' },
      { type: 'formula', title: 'Mức lãi cần để hòa vốn', expr: 'Lãi cần = X ÷ (1 − X)', vars: [['X', 'Mức lỗ (drawdown) dạng số thập phân, ví dụ 30% = 0,3']], note: 'Ví dụ: lỗ 30% cần lãi 0,3 ÷ 0,7 ≈ 42,9%.' },
      { type: 'table', head: ['Lỗ (drawdown)', 'Lãi cần để hòa vốn', 'Ví dụ trên 1.000 USDT'], rows: [
        ['10%', '11,1%', '900 → cần +100'],
        ['20%', '25%', '800 → cần +200'],
        ['30%', '42,9%', '700 → cần +300'],
        ['40%', '66,7%', '600 → cần +400'],
        ['50%', '100%', '500 → cần +500'],
        ['75%', '300%', '250 → cần +750'],
        ['90%', '900%', '100 → cần +900']
      ] },
      { type: 'figure', name: 'drawdown-recovery', caption: 'Đường cong phục hồi dốc đứng sau mức lỗ khoảng 30–40%: càng lỗ sâu, lãi cần để hòa càng tăng nhanh.' },
      { type: 'p', text: 'Nhìn bảng, bạn thấy vùng dưới 20% còn "xử lý được": một hệ thống tốt có thể gỡ lại trong vài tháng. Trên 50%, bạn cần gấp đôi tài khoản chỉ để về chỗ cũ. Đó là lý do mục tiêu số 1 của quản trị rủi ro không phải kiếm nhiều nhất, mà là <strong>không bao giờ rơi vào vùng lỗ sâu</strong>.' },
      { type: 'tool', name: 'drawdown', note: 'Nhập mức lỗ để xem lãi cần để hòa vốn, và thử số lệnh thua liên tiếp với % rủi ro khác nhau.' },

      { type: 'h', text: 'Chuỗi thua và % rủi ro: cùng hệ thống, số phận khác nhau' },
      { type: 'calc', title: '10 lệnh thua liên tiếp, rủi ro tính trên vốn hiện tại', rows: [
        ['Rủi ro 1%/lệnh', '0,99<sup>10</sup> ≈ 0,904 → lỗ ≈ 9,6%; cần lãi ≈ 10,6% để hòa'],
        ['Rủi ro 5%/lệnh', '0,95<sup>10</sup> ≈ 0,599 → lỗ ≈ 40,1%; cần lãi ≈ 67,0%'],
        ['Rủi ro 10%/lệnh', '0,9<sup>10</sup> ≈ 0,349 → lỗ ≈ 65,1%; cần lãi ≈ 186,8%']
      ], result: 'Chuỗi 10 lệnh thua không hiếm với hệ thống thắng 40% (khoảng 20% khả năng trong 100 lệnh, xem bài 6.2). Ở mức 1% bạn vẫn đứng vững; ở mức 10% tài khoản gần như bị phá hủy.' },
      { type: 'figure', name: 'equity-curves', caption: 'Cùng một chuỗi lệnh, ba mức rủi ro 1%, 5%, 20% mỗi lệnh cho ra ba đường vốn rất khác nhau.' },
      { type: 'p', text: 'Hình trên cho thấy một điều mà người mới thường bỏ qua: <strong>chất lượng hệ thống và kết quả tài khoản là hai chuyện khác nhau</strong>. Hệ thống quyết định lợi thế; % rủi ro quyết định bạn có sống đủ lâu để lợi thế đó phát huy hay không.' },
      { type: 'p', text: 'Drawdown còn tốn một thứ ít ai tính: <strong>thời gian</strong>. Lãi phục hồi đến từ lợi thế của hệ thống, mà lợi thế thật thường nhỏ. Mỗi lệnh chỉ mang về trung bình một phần nhỏ của R, nên để gỡ một drawdown sâu bạn cần rất nhiều lệnh, tức nhiều tuần hoặc nhiều tháng giao dịch đúng quy trình.' },
      { type: 'calc', title: 'Mất bao lâu để gỡ drawdown? (giả định)', rows: [
        ['Hệ thống', 'Kỳ vọng +0,2R/lệnh, rủi ro 1% vốn hiện tại'],
        ['Tăng trưởng trung bình mỗi lệnh', '0,2 × 1% = 0,2% vốn'],
        ['Gỡ drawdown 10% (cần +11,1%)', 'ln(1,111) ÷ ln(1,002) ≈ 53 lệnh'],
        ['Gỡ drawdown 20% (cần +25%)', 'ln(1,25) ÷ ln(1,002) ≈ 112 lệnh'],
        ['Gỡ drawdown 50% (cần +100%)', 'ln(2) ÷ ln(1,002) ≈ 347 lệnh']
      ], result: 'Nếu bạn giao dịch khoảng 5 lệnh mỗi tuần, gỡ drawdown 20% mất gần 6 tháng, gỡ 50% mất hơn một năm, với điều kiện mọi thứ diễn ra đúng trung bình. Tránh drawdown sâu rẻ hơn gỡ nó rất nhiều.' },
      { type: 'analogy', text: 'Drawdown giống như rơi xuống hố. Hố 10% bạn trèo lên trong vài tuần. Hố 50% sâu đến mức bạn phải xây thang từ đầu, và trong lúc xây rất dễ nản rồi nhảy liều.' },

      { type: 'h', text: 'Rủi ro phá sản (risk of ruin) qua mô phỏng' },
      { type: 'p', text: '<strong>Rủi ro phá sản</strong> là xác suất tài khoản giảm xuống mức mà bạn không thể hoặc không muốn tiếp tục. Ở đây ta định nghĩa "phá sản" thực dụng là <strong>mất 50% vốn ban đầu</strong>, vì ở mức đó cần lãi 100% mới hòa và đa số người bỏ cuộc hoặc bắt đầu giao dịch liều.' },
      { type: 'callout', tone: 'note', title: 'Giả định của mô phỏng (tự chạy Monte Carlo bằng Node.js)', text: 'Mỗi kịch bản mô phỏng 50.000 lần, mỗi lần 200 lệnh. Mỗi lệnh độc lập; thắng thì +1,5R, thua thì −1R; R là % cố định của <em>vốn hiện tại</em>. Không tính phí, trượt giá, funding. Không có lệnh lỗ vượt −1R. Hệ tốt: WR 45%, kỳ vọng +0,125R/lệnh. Hệ hòa vốn: WR 40%, kỳ vọng 0R. Đây là mô hình đơn giản hóa; thực tế có phí, có lệnh trượt quá dừng lỗ nên kết quả thường tệ hơn.' },
      { type: 'table', head: ['Rủi ro mỗi lệnh', 'Hệ tốt: xác suất từng mất ≥ 50% vốn', 'Hệ tốt: xác suất gặp drawdown ≥ 20%', 'Hệ hòa vốn: xác suất từng mất ≥ 50% vốn'], rows: [
        ['1%', 'dưới 0,1%', 'khoảng 7%', 'dưới 0,1%'],
        ['2%', 'khoảng 0,2%', 'khoảng 64%', 'khoảng 6%'],
        ['5%', 'khoảng 14%', 'gần 100%', 'khoảng 55%'],
        ['10%', 'khoảng 50%', '100%', 'khoảng 87%'],
        ['20%', 'khoảng 86%', '100%', 'khoảng 99%']
      ] },
      { type: 'list', items: [
        '<strong>Với hệ có lợi thế</strong>, rủi ro 1–2% gần như không bao giờ mất một nửa vốn trong 200 lệnh. Lên 10%, cùng hệ đó có khoảng một nửa khả năng mất một nửa vốn.',
        '<strong>Với hệ hòa vốn</strong> (đa số người mới chưa có lợi thế thật sau phí), rủi ro 5% đã có hơn 50% khả năng mất một nửa tài khoản. Rủi ro nhỏ giúp bạn có thời gian học và phát hiện hệ thống không hiệu quả trước khi mất nhiều tiền.',
        '<strong>Drawdown 20% vẫn có thể xảy ra ngay cả ở mức 1%</strong> (khoảng 7% với hệ tốt, khoảng 38% với hệ hòa vốn trong mô phỏng). Vì vậy cần quy tắc xử lý drawdown được viết sẵn.'
      ] },
      { type: 'callout', tone: 'risk', title: 'Futures làm mọi thứ tệ hơn', text: 'Mô phỏng giả định lỗ không vượt −1R. Với futures đòn bẩy cao không dừng lỗ, một lệnh có thể mất toàn bộ ký quỹ, thậm chí cả ví nếu dùng cross margin. Ngày 10/10/2025, khoảng 19 tỷ USD vị thế đòn bẩy bị thanh lý trong 24 giờ. Rủi ro phá sản thật có thể cao hơn bảng trên rất nhiều.' },

      { type: 'h', text: 'Quy tắc dừng giao dịch khi drawdown chạm ngưỡng' },
      { type: 'p', text: 'Quyết định khi đang thua là quyết định tệ nhất, vì cảm xúc đang ở mức cao. Vì vậy bạn viết sẵn quy tắc khi tài khoản còn bình thường, và chỉ việc làm theo. Drawdown đo từ đỉnh vốn cao nhất, không phải vốn ban đầu. Hai mốc 10% và 20% là bộ chuẩn của khóa học (bài 5.9); mốc 5% là bước kiểm tra thêm.' },
      { type: 'steps', items: [
        { title: 'Drawdown 5%: kiểm tra', text: 'Mở nhật ký, xem các lệnh thua gần đây là thua hợp lệ hay lỗi quy trình. Không đổi gì nếu mọi lệnh đúng kế hoạch.' },
        { title: 'Drawdown 10%: giảm một nửa rủi ro', text: 'Giảm rủi ro mỗi lệnh từ 1% xuống 0,5%. Chỉ giao dịch setup chuẩn nhất (loại A). Xem lại toàn bộ lệnh của đợt drawdown. Chỉ quay lại 1% khi vốn hồi về dưới 5% drawdown.' },
        { title: 'Drawdown 20%: dừng giao dịch tiền thật', text: 'Đóng hoặc không mở thêm vị thế mới. Nghỉ ít nhất 1–2 tuần. Quay về Demo Trading hoặc giao dịch giấy tối thiểu 20–30 lệnh theo đúng quy trình.' },
        { title: 'Điều kiện quay lại', text: 'Chỉ giao dịch tiền thật lại khi: đã tìm ra nguyên nhân (thị trường đổi trạng thái, lỗi kỷ luật hay hệ thống không có lợi thế), kết quả demo có kỳ vọng dương, và bắt đầu lại ở 0,5%.' }
      ] },
      { type: 'scenario', title: 'Tài khoản đã sụt 20% từ đỉnh', setup: 'Tài khoản từng lên 1.250 USDT, nay còn 1.000 USDT sau một chuỗi lệnh thua và vài lệnh phá quy tắc.', bad: 'Trader cảm tính nghĩ "chỉ cần một lệnh 10x đúng là về bờ", mở lệnh lớn không dừng lỗ. Giá đi ngược, tài khoản còn 700 USDT. Giờ cần lãi gần 79% để về lại 1.250.', good: 'Trader có kế hoạch áp quy tắc 20%: ngừng giao dịch tiền thật, nghỉ một tuần, xem lại nhật ký và thấy 4 lệnh gần nhất là lỗi dời dừng lỗ. Luyện 30 lệnh trên demo chỉ với setup loại A, rồi quay lại với rủi ro 0,5%. Tài khoản vẫn còn 1.000 USDT để làm lại.' },
      { type: 'callout', tone: 'tip', title: 'Viết quy tắc ra giấy', text: 'Ghi các ngưỡng 5%, 10%, 20% và mức vốn tương ứng (ví dụ đỉnh 1.000 → 950, 900, 800 USDT) vào đầu nhật ký. Mỗi khi vốn đạt đỉnh mới, cập nhật lại các mốc.' }
    ],
    keyPoints: [
      'Drawdown đo từ đỉnh vốn; lãi cần để hòa = X ÷ (1 − X): lỗ 50% cần lãi 100%, lỗ 90% cần 900%.',
      'Cùng hệ thống, % rủi ro mỗi lệnh quyết định bạn có sống sót qua chuỗi thua hay không.',
      'Mô phỏng: hệ có lợi thế rủi ro 1–2% gần như không mất nửa vốn trong 200 lệnh; rủi ro 10% có khoảng 50% khả năng.',
      'Hệ hòa vốn với rủi ro 5% có hơn 50% khả năng mất nửa vốn: người mới cần rủi ro nhỏ để có thời gian học.',
      'Viết sẵn quy tắc: drawdown 10% giảm rủi ro một nửa; 20% dừng giao dịch tiền thật và quay về demo.'
    ],
    practice: [
      'Tính drawdown hiện tại của tài khoản bạn (hoặc tài khoản demo) từ đỉnh vốn cao nhất.',
      'Viết mốc vốn tương ứng với drawdown 5%, 10%, 20% và hành động kèm theo, dán vào đầu nhật ký.',
      'Dùng công cụ drawdown: với % rủi ro bạn đang dùng, tính số tiền mất sau 8 và 10 lệnh thua liên tiếp. Nếu con số khiến bạn khó chịu, giảm % rủi ro.'
    ],
    quiz: [
      { q: 'Tài khoản lỗ 40%. Bạn cần lãi bao nhiêu % trên vốn còn lại để hòa vốn?', options: ['66,7%', '40%', '60%', '140%'], answer: 0, explain: '0,4 ÷ 0,6 ≈ 66,7%. 40% là nhầm lỗ và lãi đối xứng; 60% là vốn còn lại; 140% không có cơ sở. Ví dụ 1.000 → 600, cần +400 trên nền 600.' },
      { q: 'Tài khoản từng đạt đỉnh 1.500 USDT, nay còn 1.200 USDT. Drawdown hiện tại và hành động theo quy tắc trong bài?', options: ['25%, dừng giao dịch và nghỉ một tuần', '15%, chưa cần làm gì thêm cả', '20%, dừng tiền thật, quay về demo', '10%, giảm rủi ro còn một nửa'], answer: 2, explain: '(1.500 − 1.200) ÷ 1.500 = 20%, chạm ngưỡng dừng tiền thật và quay về demo. 25% là chia cho 1.200 thay vì đỉnh; 15% tính sai; 10% là ngưỡng giảm rủi ro, nhưng drawdown thật đã là 20%.' },
      { q: 'Theo mô phỏng trong bài, với hệ có lợi thế (WR 45%, R:R 1:1,5), xác suất từng mất ≥ 50% vốn thay đổi thế nào khi tăng rủi ro từ 1% lên 10% mỗi lệnh?', options: ['Không đổi, vẫn dưới 0,1%', 'Từ dưới 0,1% lên khoảng 50%', 'Giảm, vì lãi tích lũy nhanh hơn', 'Từ dưới 0,1% lên khoảng 14%'], answer: 1, explain: 'Bảng mô phỏng: rủi ro 1% cho dưới 0,1%, rủi ro 10% cho khoảng 50%. 14% là mức của rủi ro 5%. Lợi thế không bảo vệ bạn khỏi chuỗi thua; % rủi ro lớn biến chuỗi thua bình thường thành drawdown phá hủy tài khoản, nên xác suất không thể giữ nguyên hay giảm.' },
      { q: 'Vì sao bài chọn "mất 50% vốn" làm định nghĩa phá sản thực dụng thay vì mất 100%?', options: ['Vì sàn tự khóa tài khoản khi lỗ 50%', 'Vì luật Việt Nam quy định như vậy', 'Vì lỗ 50% vẫn còn có thể là có lãi', 'Vì cần lãi 100% để hòa, dễ bỏ cuộc'], answer: 3, explain: 'Lỗ 50% cần lãi 100% chỉ để về chỗ cũ, và tâm lý thường sụp đổ trước đó: đa số bỏ cuộc hoặc bắt đầu giao dịch liều. Sàn không tự khóa tài khoản spot khi lỗ 50%; không có quy định pháp luật nào như vậy; lỗ 50% không thể là có lãi.' }
    ],
    sources: [
      { title: 'A Short Lesson on R and R-multiples', url: 'https://vantharp.com/wp-content/uploads/2018/06/A_Short_Lesson_on_R_and_R-multiple.pdf', note: 'Van Tharp Institute, tiếng Anh: quy mô vị thế và rủi ro mỗi lệnh' },
      { title: 'Crypto Futures Risk and Money Management: 5 Things You Can Do to Better Manage Trading Risk', url: 'https://www.binance.com/en/blog/futures/crypto-futures-risk-and-money-management-5-things-you-can-do-to-better-manage-trading-risk-421499824684902191', note: 'Binance Blog, tiếng Anh: rủi ro 1–2%/lệnh' },
      { title: 'October 10 Crypto Crash Explained', url: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained', note: 'CoinGecko, tiếng Anh: khoảng 19 tỷ USD bị thanh lý trong 24 giờ' },
      { title: 'Binance Demo Trading', url: 'https://www.binance.com/en/support/faq/detail/b3706b248f2b4b1caabb4bf253bf067f', note: 'Binance FAQ, tiếng Anh: giao dịch thử bằng tiền ảo' }
    ],
    updated: '2026-09'
  },

  'c6-b4': {
    duration: 9,
    level: 'Cơ bản',
    summary: 'Nhận diện né tránh mất mát, gồng lỗ cắt lãi, thiên kiến xác nhận, quá tự tin, FOMO và giao dịch trả thù, cùng các quy tắc tạm dừng cụ thể.',
    goals: [
      'Hiểu các thiên kiến tâm lý đã được nghiên cứu và cách chúng làm bạn mất tiền',
      'Nhận diện trạng thái cảm xúc của chính mình trước và trong lệnh',
      'Áp dụng bộ quy tắc tạm dừng cụ thể để cắt vòng lặp FOMO và trả thù'
    ],
    blocks: [
      { type: 'h', text: 'Né tránh mất mát: vì sao mất 100 đau hơn được 100' },
      { type: 'p', text: 'Năm 1979, Daniel Kahneman và Amos Tversky công bố <strong>lý thuyết triển vọng (prospect theory)</strong> trên tạp chí Econometrica. Một kết luận trung tâm: hàm giá trị của con người thường lõm với khoản lãi, lồi với khoản lỗ, và <em>dốc hơn ở phía lỗ</em>. Nói đơn giản: nỗi đau khi mất một khoản tiền lớn hơn niềm vui khi được cùng khoản đó. Hiện tượng này gọi là <strong>né tránh mất mát (loss aversion)</strong>.' },
      { type: 'p', text: 'Nghiên cứu cũng mô tả một hệ quả quan trọng: khi đứng trước khoản lãi chắc chắn, người ta thích an toàn; khi đứng trước khoản lỗ chắc chắn, người ta sẵn sàng liều để tránh nó. Trong giao dịch, điều này biến thành hành vi quen thuộc: lãi một chút là vội chốt, lỗ thì không chịu cắt mà "chờ về bờ".' },
      { type: 'quote', text: 'The value function is normally concave for gains, commonly convex for losses, and is generally steeper for losses than for gains.', cite: 'Kahneman & Tversky, "Prospect Theory: An Analysis of Decision under Risk", Econometrica, 1979' },

      { type: 'h', text: 'Gồng lỗ, cắt lãi: hiệu ứng bán lãi giữ lỗ' },
      { type: 'p', text: 'Năm 1985, Hersh Shefrin và Meir Statman đặt tên cho xu hướng "bán lệnh lãi quá sớm, giữ lệnh lỗ quá lâu" là <strong>hiệu ứng disposition (disposition effect)</strong>. Họ giải thích bằng tính toán tâm lý (mental accounting), sợ hối tiếc và khả năng tự kiểm soát kém.' },
      { type: 'p', text: 'Năm 1998, Terrance Odean kiểm chứng trên dữ liệu thật: lịch sử giao dịch 1987–1993 của 10.000 tài khoản tại một công ty môi giới lớn ở Mỹ. Kết quả: một cổ phiếu đang lãi có khả năng bị bán ra cao hơn hơn 50% so với một cổ phiếu đang lỗ. Và quyết định này không được biện minh bởi kết quả sau đó: trong năm tiếp theo, những cổ phiếu lãi đã bán có lợi nhuận vượt trội hơn những cổ phiếu lỗ vẫn giữ khoảng 3,4 điểm %.' },
      { type: 'p', text: 'Gần với hiệu ứng này là <strong>hiệu ứng tài sản sở hữu (endowment effect)</strong>: người ta có xu hướng định giá thứ mình đang nắm giữ cao hơn khi chưa sở hữu nó. Khi đã cầm một đồng coin, bạn dễ thấy mọi lý do để nó "phải tăng", và khó chấp nhận bán lỗ.' },
      { type: 'calc', title: 'Cái giá của gồng lỗ cắt lãi (R = 10 USDT, 10 lệnh giả định)', rows: [
        ['Theo kế hoạch: 4 thắng × 2R, 6 thua × 1R', '+8R − 6R = +2R = +20 USDT'],
        ['Cắt lãi sớm: 4 thắng × 0,8R', '+3,2R'],
        ['Gồng lỗ: 5 lệnh thua × 1R, 1 lệnh gồng tới −4R', '−5R − 4R = −9R'],
        ['Kết quả khi có cả hai lỗi', '+3,2R − 9R = −5,8R = −58 USDT']
      ], result: 'Cùng tín hiệu, cùng tỷ lệ thắng 40%. Chỉ vì hành vi, kết quả đổi từ +20 USDT sang −58 USDT.' },
      { type: 'scenario', title: 'Lệnh đang lỗ tiến gần dừng lỗ', setup: 'Long ETH ở 3.000 (giả định), dừng lỗ 2.940. Giá đang ở 2.950 và tiếp tục giảm.', bad: 'Trader cảm tính kéo dừng lỗ xuống 2.880 "cho thoáng", rồi hủy luôn dừng lỗ. Tự nhủ "ETH kiểu gì cũng hồi". Giá về 2.760, lỗ −4R, cuối cùng cắt trong hoảng loạn.', good: 'Trader có kế hoạch không chạm vào dừng lỗ. Lệnh đóng ở 2.940, lỗ −1R. Ghi nhật ký: "thua hợp lệ, setup đúng". Nếu giá sau đó tạo lại setup, vào lệnh mới với khối lượng tính lại từ đầu.' },
      { type: 'callout', tone: 'risk', title: 'Quy tắc cứng cho dừng lỗ', text: 'Dừng lỗ chỉ được dời theo chiều giảm rủi ro (lên với lệnh long, xuống với lệnh short). Không bao giờ nới dừng lỗ ra xa. Nếu bạn bắt gặp mình đang làm vậy, đóng lệnh ngay và dừng giao dịch trong ngày.' },

      { type: 'h', text: 'Thiên kiến xác nhận và quá tự tin' },
      { type: 'p', text: '<strong>Thiên kiến xác nhận (confirmation bias)</strong> là xu hướng tìm kiếm và tin vào thông tin ủng hộ điều mình đã nghĩ, bỏ qua thông tin ngược lại. Trader đang long sẽ lướt Telegram, X, YouTube để tìm người cũng dự báo tăng, và gạt đi mọi phân tích giảm. Kết quả là một vị thế sai được nuôi bằng "bằng chứng" chọn lọc.' },
      { type: 'list', items: [
        'Trước khi vào lệnh, viết ra <strong>một lý do mạnh nhất để lệnh này sai</strong> và mức giá chứng minh điều đó. Đó chính là dừng lỗ.',
        'Chỉ đánh giá lệnh bằng kế hoạch đã viết trước, không bằng ý kiến trên mạng trong lúc lệnh đang chạy.',
        'Bỏ theo dõi các kênh gọi kèo khi đang có vị thế mở.'
      ] },
      { type: 'p', text: '<strong>Quá tự tin (overconfidence)</strong> là tin rằng kỹ năng và thông tin của mình tốt hơn thực tế. Brad Barber và Terrance Odean (Journal of Finance, 2000) phân tích 66.465 hộ gia đình có tài khoản tại một công ty môi giới lớn giai đoạn 1991–1996. Nhóm giao dịch nhiều nhất chỉ đạt lợi nhuận khoảng 11,4%/năm, trong khi thị trường đạt 17,9%. Hộ trung bình đạt 16,4% và xoay vòng 75% danh mục mỗi năm. Các tác giả kết luận quá tự tin có thể giải thích mức giao dịch cao và kết quả kém.' },
      { type: 'quote', text: 'Our central message is that trading is hazardous to your wealth.', cite: 'Barber & Odean, "Trading Is Hazardous to Your Wealth", The Journal of Finance, 2000' },
      { type: 'callout', tone: 'warn', title: 'Sau chuỗi thắng là lúc nguy hiểm', text: 'Quá tự tin thường đến sau vài lệnh thắng liên tiếp: bạn tăng khối lượng, bỏ bớt bước kiểm tra, vào lệnh ngoài setup. Quy tắc: sau 3 lệnh thắng liền, không được tăng % rủi ro; lệnh tiếp theo phải qua đủ checklist như bình thường.' },

      { type: 'h', text: 'FOMO, giao dịch trả thù và vòng cảm xúc' },
      { type: 'p', text: '<strong>FOMO (fear of missing out, sợ bỏ lỡ)</strong> là cảm giác phải vào lệnh ngay vì giá đang chạy mà mình chưa có phần. FOMO thường đến khi nến tăng mạnh, cộng đồng hò reo, bạn bè khoe lãi. Vào lệnh lúc đó nghĩa là mua ở xa vùng giá hợp lý, dừng lỗ xa, R:R xấu. BIS ghi nhận người dùng crypto mới thường tham gia khi giá đang tăng, và phần lớn bị lỗ.' },
      { type: 'p', text: '<strong>Giao dịch trả thù (revenge trading)</strong> là vào lệnh ngay sau một lệnh thua để "lấy lại", thường với khối lượng lớn hơn và không có setup. Đây là con đường ngắn nhất từ drawdown 3% lên drawdown 20%.' },
      { type: 'figure', name: 'emotion-cycle', caption: 'Vòng cảm xúc theo giá: lạc quan, hưng phấn và tự mãn gần đỉnh; lo lắng, phủ nhận, hoảng loạn và đầu hàng khi giá giảm. Mua lúc hưng phấn và bán lúc hoảng loạn là chu trình mất tiền.' },
      { type: 'scenario', title: 'BTC vừa tăng 8% trong 2 giờ (giả định)', setup: 'Bạn không có vị thế. BTC từ 80.000 lên 86.400. Nhóm chat đầy ảnh chụp lãi.', bad: 'Trader cảm tính mua ngay ở 86.400 bằng market, 10x, không có dừng lỗ rõ ràng vì "không có vùng nào để đặt". Giá hồi về 83.000, lỗ gần 4% giá tức gần 40% ký quỹ. Hoảng loạn cắt lệnh, rồi 1 giờ sau vào short để gỡ.', good: 'Trader có kế hoạch nhận ra mình đang FOMO: tim đập nhanh, muốn bấm ngay. Áp quy tắc 15 phút: không vào lệnh nào trong 15 phút. Sau đó mở kế hoạch: giá đang xa mọi vùng hỗ trợ, không có điểm dừng lỗ hợp lý, R:R dưới 1:1,5. Ghi vào nhật ký "bỏ qua, ngoài kế hoạch", đặt cảnh báo giá ở vùng hồi về để chờ setup.' },
      { type: 'scenario', title: 'Vừa bị quét dừng lỗ rồi giá chạy đúng hướng', setup: 'Short ETH bị dừng lỗ −1R, sau đó giá rơi mạnh đúng như dự đoán ban đầu.', bad: 'Trader cảm tính tức giận, vào short lại ngay với gấp 3 khối lượng để "lấy lại cả vốn lẫn lãi". Giá bật ngược, thua −3R. Tổng −4R trong 20 phút.', good: 'Trader có kế hoạch chấp nhận: dừng lỗ đúng chỗ vẫn có lúc bị quét, đó là thua hợp lệ. Áp quy tắc tạm dừng 30 phút sau lệnh thua. Nếu có setup mới đúng kế hoạch, vào với khối lượng tính lại theo 1%, không nhân lên.' },

      { type: 'h', text: 'Nhận diện cảm xúc và quy tắc tạm dừng cụ thể' },
      { type: 'p', text: 'Bạn không loại bỏ được cảm xúc. Việc bạn làm được là <strong>nhận ra nó sớm</strong> và có quy tắc tự động chặn hành động. Quy tắc phải cụ thể đến mức không cần suy nghĩ khi áp dụng.' },
      { type: 'checklist', title: 'Tự kiểm tra trước khi bấm lệnh', items: [
        'Tôi có đang muốn vào lệnh vì sợ lỡ, hoặc để gỡ lệnh vừa thua không?',
        'Lệnh này có nằm trong kế hoạch viết trước phiên không?',
        'Tôi có đang mệt, thiếu ngủ, vừa uống rượu bia hoặc đang bực chuyện khác không?',
        'Nếu lệnh này chạm dừng lỗ, tôi có chấp nhận thoải mái không?',
        'Tôi có đang dùng khối lượng lớn hơn bình thường không?'
      ] },
      { type: 'table', head: ['Tình huống kích hoạt', 'Quy tắc tạm dừng'], rows: [
        ['Muốn vào lệnh vì giá chạy nhanh', 'Chờ 15 phút, rồi kiểm tra lại kế hoạch trước khi làm gì'],
        ['Vừa thua một lệnh', 'Nghỉ 30 phút, rời khỏi màn hình'],
        ['Thua 2 lệnh liên tiếp', 'Dừng đến hết ngày (bài 5.9)'],
        ['Lỗ 2R trong ngày, hoặc đã đủ 3 lệnh', 'Dừng đến hết ngày'],
        ['Phá bất kỳ quy tắc nào (nới dừng lỗ, vượt khối lượng, lệnh ngoài kế hoạch)', 'Đóng lệnh vi phạm, dừng đến hết ngày, ghi lỗi vào nhật ký'],
        ['Lỗ 5R trong tuần', 'Nghỉ đến tuần sau, xem lại nhật ký'],
        ['Drawdown 10% từ đỉnh vốn', 'Giảm rủi ro mỗi lệnh còn một nửa (bài 6.3); lựa chọn chặt hơn bộ chuẩn: nghỉ thêm đến hết tuần'],
        ['Drawdown 20% từ đỉnh vốn', 'Dừng tiền thật, quay lại demo và rà soát (bài 6.3)']
      ] },
      { type: 'p', text: 'Các mốc thua 2 lệnh liên tiếp, lỗ 2R/ngày, 3 lệnh/ngày, lỗ 5R/tuần và drawdown 10%/20% đúng bằng bộ chuẩn bài 5.9. Các mốc 15 phút, 30 phút, dừng ngày khi phá quy tắc và nghỉ thêm khi drawdown 10% là lựa chọn chặt hơn bộ chuẩn. Bạn được thêm quy tắc chặt hơn, không được nới lỏng.' },
      { type: 'callout', tone: 'tip', title: 'Biến quy tắc thành thói quen', text: 'Dán bảng tạm dừng cạnh màn hình. Đặt đồng hồ đếm ngược trên điện thoại mỗi khi áp dụng. Nhiều trader còn cài giới hạn trên chính sàn hoặc gỡ ứng dụng trên điện thoại khỏi màn hình chính để giảm giao dịch bốc đồng.' }
    ],
    keyPoints: [
      'Né tránh mất mát (Kahneman & Tversky, 1979): lỗ đau hơn lãi cùng mức, dẫn đến chốt lãi sớm và liều khi lỗ.',
      'Hiệu ứng disposition (Shefrin & Statman, 1985; Odean, 1998): bán lãi quá sớm, giữ lỗ quá lâu, và thường sai.',
      'Thiên kiến xác nhận làm bạn chỉ nghe điều mình muốn; quá tự tin làm bạn giao dịch quá nhiều (Barber & Odean, 2000).',
      'FOMO và giao dịch trả thù là hai cách nhanh nhất biến drawdown nhỏ thành drawdown lớn.',
      'Cảm xúc không loại bỏ được; hãy dùng quy tắc tạm dừng cụ thể: 15 phút, 30 phút, hết ngày (thua 2 lệnh liên tiếp hoặc lỗ 2R), hết tuần (lỗ 5R).'
    ],
    practice: [
      'Xem lại 10 lệnh gần nhất: đánh dấu lệnh nào vào vì FOMO, lệnh nào là trả thù, lệnh nào nới dừng lỗ. Tính tổng R của các lệnh đó.',
      'Chép bảng quy tắc tạm dừng, điều chỉnh cho phù hợp với bạn, ký tên và dán cạnh màn hình.',
      'Trong 2 tuần tới, trước mỗi lệnh ghi một dòng cảm xúc (bình tĩnh, sốt ruột, sợ, hưng phấn) và mức 1–5 vào nhật ký.'
    ],
    quiz: [
      { q: 'Bạn đang lãi +0,6R và lỗ −1,8R trên hai lệnh khác nhau. Bạn muốn chốt lệnh lãi ngay và giữ lệnh lỗ "chờ hồi". Đây là biểu hiện của gì?', options: ['Thiên kiến xác nhận: chỉ tìm tin ủng hộ', 'Disposition: bán lãi sớm, giữ lỗ lâu', 'Quản trị rủi ro tốt: chốt lãi an toàn', 'FOMO: sợ lỡ cú chạy tiếp theo'], answer: 1, explain: 'Đây đúng là hành vi Shefrin & Statman đặt tên và Odean (1998) kiểm chứng. Lệnh lỗ đã vượt −1R cho thấy dừng lỗ bị nới. Thiên kiến xác nhận là chọn lọc thông tin; FOMO là sợ bỏ lỡ khi chưa có lệnh; giữ lỗ vượt kế hoạch không phải quản trị rủi ro tốt.' },
      { q: 'Theo Barber & Odean (2000), nhóm hộ giao dịch nhiều nhất đạt lợi nhuận hằng năm thế nào so với thị trường?', options: ['Cao hơn thị trường khoảng 3 điểm %', 'Gần bằng thị trường, chênh không đáng kể', 'Khoảng 11,4%/năm so với 17,9%', 'Thua lỗ gần như toàn bộ vốn'], answer: 2, explain: 'Nghiên cứu 66.465 hộ (1991–1996): nhóm giao dịch nhiều nhất đạt 11,4%/năm, thị trường 17,9%, hộ trung bình 16,4%. Các lựa chọn khác không khớp số liệu. Tác giả gắn kết quả này với sự quá tự tin.' },
      { q: 'Vừa bị dừng lỗ −1R, giá lập tức chạy đúng hướng bạn dự đoán. Bạn muốn vào lại với gấp 3 khối lượng. Theo bảng quy tắc trong bài, bạn nên làm gì?', options: ['Nghỉ 30 phút, chờ setup mới nếu có', 'Vào ngay với gấp 3 khối lượng để gỡ', 'Vào ngay với đúng khối lượng như cũ', 'Dừng giao dịch đến hết cả tuần này'], answer: 0, explain: 'Sau một lệnh thua, quy tắc là nghỉ 30 phút; nếu có setup mới đúng kế hoạch thì vào với khối lượng tính lại theo 1%. Gấp 3 khối lượng là giao dịch trả thù; vào ngay là quyết định trong cảm xúc; nghỉ đến tuần sau chỉ áp dụng khi lỗ 5R trong tuần.' },
      { q: 'Cách nào giúp chống thiên kiến xác nhận hiệu quả nhất khi đang có vị thế long?', options: ['Đọc thêm nhiều bài phân tích tăng giá', 'Hỏi ý kiến nhóm chat xem mọi người có đang long không', 'Tắt dừng lỗ để khỏi bị quét giá', 'Viết trước lý do lệnh sai, đặt dừng lỗ ở đó'], answer: 3, explain: 'Chủ động tìm lý do mạnh nhất khiến mình sai, cùng mức giá chứng minh điều đó, rồi gắn nó vào dừng lỗ là cách đối trọng trực tiếp. Đọc thêm bài tăng giá và hỏi nhóm cùng phe chính là thiên kiến xác nhận; tắt dừng lỗ làm rủi ro không giới hạn.' }
    ],
    sources: [
      { title: 'Prospect Theory: An Analysis of Decision under Risk', url: 'https://www.econometricsociety.org/publications/econometrica/1979/03/01/prospect-theory-analysis-decision-under-risk', note: 'Kahneman & Tversky, Econometrica 47(2), 1979, tiếng Anh' },
      { title: 'The Disposition to Sell Winners Too Early and Ride Losers Too Long: Theory and Evidence', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1540-6261.1985.tb05002.x', note: 'Shefrin & Statman, The Journal of Finance 40(3), 1985, tiếng Anh' },
      { title: 'Are Investors Reluctant to Realize Their Losses?', url: 'https://faculty.haas.berkeley.edu/odean/papers%20current%20versions/areinvestorsreluctant.pdf', note: 'Terrance Odean, The Journal of Finance 53(5), 1998, tiếng Anh' },
      { title: 'Trading Is Hazardous to Your Wealth: The Common Stock Investment Performance of Individual Investors', url: 'https://faculty.haas.berkeley.edu/odean/papers%20current%20versions/individual_investor_performance_final.pdf', note: 'Barber & Odean, The Journal of Finance 55(2), 2000, tiếng Anh' },
      { title: 'Crypto shocks and retail losses (BIS Bulletin No 69)', url: 'https://www.bis.org/publ/bisbull69.pdf', note: 'Ngân hàng Thanh toán Quốc tế, 2/2023, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c6-b5': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Thiết kế nhật ký giao dịch, tính tỷ lệ thắng, R trung bình, kỳ vọng, profit factor, max drawdown từ 10 lệnh mẫu, và review tuần để phân loại lỗi.',
    goals: [
      'Lập nhật ký giao dịch với đủ các cột cần thiết',
      'Tự tính các chỉ số hiệu suất cốt lõi từ nhật ký',
      'Thực hiện review tuần và phân biệt lỗi quy trình với thua hợp lệ'
    ],
    blocks: [
      { type: 'h', text: 'Vì sao nhật ký là công cụ quan trọng nhất' },
      { type: 'p', text: 'Không có nhật ký, bạn chỉ nhớ những lệnh thắng lớn và những lệnh thua đau nhất. Trí nhớ chọn lọc làm bạn tin mình giỏi hơn (hoặc tệ hơn) thực tế. Các con số ở bài 6.2 và 6.3 như tỷ lệ thắng, kỳ vọng, drawdown chỉ có ý nghĩa khi được đo từ dữ liệu thật của chính bạn.' },
      { type: 'p', text: 'Binance Academy khuyên ghi nhật ký ngay sau khi vào lệnh, ghi cả phí và trượt giá, và ghi lại cảm xúc trước và trong lệnh, vì việc viết ra giúp bạn thấy cảm xúc ảnh hưởng đến quyết định thế nào. Họ cũng gợi ý tần suất xem lại: trader hoạt động nhiều xem hằng ngày, trader swing xem hằng tuần.' },
      { type: 'callout', tone: 'tip', title: 'Dùng trang Nhật ký của website', text: 'Website khóa học có trang <strong>Nhật ký</strong> với công cụ ghi lệnh: bạn nhập giá vào, dừng lỗ, chốt lời, kết quả, và công cụ tự quy đổi ra R cùng các chỉ số trong bài này. Nếu thích bảng tính, bạn có thể dùng Google Sheets hoặc Excel với các cột bên dưới.' },

      { type: 'h', text: 'Mẫu nhật ký: ghi gì trong mỗi lệnh' },
      { type: 'table', head: ['Cột', 'Ghi gì', 'Ví dụ'], rows: [
        ['Ngày, giờ vào/ra', 'Thời điểm khớp lệnh (giờ Việt Nam)', '12/09 20:45 – 13/09 09:10'],
        ['Cặp, loại', 'Spot hay futures, long hay short, đòn bẩy', 'BTCUSDT perp, long, 5x isolated'],
        ['Setup', 'Tên setup trong bộ quy tắc của bạn', 'Phá kháng cự H4, retest'],
        ['Lý do vào lệnh', '1–2 câu, viết trước khi bấm', 'Retest vùng 80.000 có nến búa, volume giảm khi hồi'],
        ['Giá vào, dừng lỗ, chốt lời', 'Theo kế hoạch', '80.000 / 78.400 / 83.200'],
        ['Khối lượng, R (USDT)', 'Khối lượng và số tiền rủi ro', '0,0058 BTC, R = 10 USDT'],
        ['Giá thoát, phí, funding', 'Chi phí thực tế', '83.150, phí 0,47, funding −0,12'],
        ['Kết quả (USDT và R)', 'Lãi lỗ ròng sau phí và quy ra R', '+17,7 USDT = +1,77R'],
        ['Ảnh chụp', 'Biểu đồ lúc vào và lúc ra', 'Link ảnh H4 và H1'],
        ['Cảm xúc (1–5)', 'Trạng thái trước và trong lệnh', 'Trước: bình tĩnh 2; trong: sốt ruột 4'],
        ['Tuân thủ kế hoạch?', 'Có / Không, và vi phạm gì', 'Có'],
        ['Phân loại', 'Thua hợp lệ / Lỗi quy trình / Lỗi thực thi / Thắng đúng kế hoạch / Thắng may', 'Thắng đúng kế hoạch'],
        ['Bài học', 'Một câu', 'Chờ retest cho điểm vào tốt hơn 0,4%']
      ] },
      { type: 'callout', tone: 'note', title: 'Ghi cả lệnh không vào', text: 'Setup đạt chuẩn mà bạn bỏ qua, hoặc lệnh bạn muốn vào vì FOMO nhưng đã kìm lại, cũng nên ghi. Chúng cho biết bạn có đang bỏ lỡ setup tốt hay đang tránh được bẫy.' },

      { type: 'h', text: 'Các chỉ số hiệu suất và cách tính' },
      { type: 'formula', title: 'Tỷ lệ thắng', expr: 'Tỷ lệ thắng = Số lệnh thắng ÷ Tổng số lệnh', vars: [['Lệnh thắng', 'Lệnh có kết quả ròng sau phí lớn hơn 0']] },
      { type: 'formula', title: 'R trung bình và kỳ vọng', expr: 'Kỳ vọng = Tổng R của mọi lệnh ÷ Số lệnh  =  WR × R thắng TB − (1 − WR) × R thua TB', vars: [['R thắng TB', 'Tổng R lệnh thắng ÷ số lệnh thắng'], ['R thua TB', 'Tổng |R| lệnh thua ÷ số lệnh thua']], note: 'R trung bình trên mọi lệnh chính là kỳ vọng thực tế của bạn.' },
      { type: 'formula', title: 'Profit factor', expr: 'Profit factor = Tổng lãi của lệnh thắng ÷ Tổng lỗ của lệnh thua (giá trị tuyệt đối)', vars: [['> 1', 'Có lãi'], ['= 1', 'Hòa vốn'], ['< 1', 'Lỗ']] },
      { type: 'formula', title: 'Max drawdown', expr: 'Max drawdown = Mức giảm lớn nhất từ một đỉnh của đường vốn tích lũy xuống đáy sau đó', vars: [['Đơn vị', 'Có thể đo bằng R hoặc % tài khoản']] },
      { type: 'table', head: ['#', 'Setup', 'Kết quả (R)', 'R tích lũy', 'Phân loại'], rows: [
        ['1', 'Retest hỗ trợ', '+2', '+2', 'Thắng đúng kế hoạch'],
        ['2', 'Phá kháng cự', '−1', '+1', 'Thua hợp lệ'],
        ['3', 'Không có setup (đuổi giá)', '−1', '0', 'Lỗi quy trình: FOMO'],
        ['4', 'Retest hỗ trợ', '+1,5', '+1,5', 'Thắng đúng kế hoạch'],
        ['5', 'Phá kháng cự', '−1', '+0,5', 'Thua hợp lệ'],
        ['6', 'Retest hỗ trợ', '+3', '+3,5', 'Thắng đúng kế hoạch'],
        ['7', 'Vào lại ngay sau lệnh thua', '−1', '+2,5', 'Lỗi quy trình: trả thù'],
        ['8', 'Phá kháng cự', '−0,5', '+2', 'Thoát sớm hợp lệ (tín hiệu vô hiệu trước dừng lỗ)'],
        ['9', 'Retest hỗ trợ', '+2', '+4', 'Thắng đúng kế hoạch'],
        ['10', 'Phá kháng cự', '−1', '+3', 'Thua hợp lệ']
      ] },
      { type: 'calc', title: 'Tính đầy đủ các chỉ số cho 10 lệnh giả định (R = 10 USDT, vốn 1.000 USDT)', rows: [
        ['Số lệnh thắng / thua', '4 thắng (lệnh 1, 4, 6, 9) / 6 thua'],
        ['Tỷ lệ thắng', '4 ÷ 10 = 40%'],
        ['Tổng R thắng', '2 + 1,5 + 3 + 2 = 8,5R'],
        ['Tổng R thua', '1 + 1 + 1 + 1 + 0,5 + 1 = 5,5R'],
        ['R thắng TB / R thua TB', '8,5 ÷ 4 = 2,125R / 5,5 ÷ 6 ≈ 0,917R'],
        ['Kỳ vọng (R trung bình)', '(8,5 − 5,5) ÷ 10 = +0,3R; kiểm tra: 0,4 × 2,125 − 0,6 × 0,917 ≈ 0,85 − 0,55 = 0,3R'],
        ['Profit factor', '8,5 ÷ 5,5 ≈ 1,55'],
        ['Max drawdown (R)', 'Đỉnh +2 (sau lệnh 1) xuống 0 (sau lệnh 3) = 2R'],
        ['Max drawdown (%)', 'Vốn 1.020 → 1.000 USDT: 20 ÷ 1.020 ≈ 1,96%'],
        ['Kết quả ròng', '+3R = +30 USDT']
      ], result: 'Hệ có kỳ vọng dương +0,3R, profit factor 1,55. Nhưng 2 trong 6 lệnh thua đến từ lỗi quy trình.' },
      { type: 'calc', title: 'Nếu loại bỏ 2 lệnh lỗi quy trình (lệnh 3 và 7)', rows: [
        ['Còn lại', '8 lệnh: 4 thắng, 4 thua'],
        ['Tổng R', '8,5 − 3,5 = +5R'],
        ['Kỳ vọng', '5 ÷ 8 = +0,625R'],
        ['Profit factor', '8,5 ÷ 3,5 ≈ 2,43']
      ], result: 'Hai lỗi quy trình đã lấy đi 2R, tức 20 USDT, và kéo kỳ vọng từ 0,625R xuống 0,3R. Sửa hành vi đem lại nhiều hơn tìm chỉ báo mới.' },
      { type: 'callout', tone: 'warn', title: '10 lệnh là quá ít để kết luận', text: 'Ví dụ trên chỉ để minh họa cách tính. Với 10 lệnh, tỷ lệ thắng và kỳ vọng có sai số rất lớn. Cần ít nhất 30–50 lệnh cùng một setup mới bắt đầu đánh giá được hệ thống. Đừng đổi hệ thống sau một tuần xấu.' },

      { type: 'h', text: 'Phân loại lỗi: thua hợp lệ khác lỗi quy trình' },
      { type: 'p', text: 'Không phải lệnh thua nào cũng là lỗi, và không phải lệnh thắng nào cũng là tốt. Một lệnh vào đúng setup, đúng khối lượng, đúng dừng lỗ mà vẫn thua là <strong>thua hợp lệ</strong>: đó là chi phí kinh doanh. Một lệnh phá quy tắc mà thắng là <strong>thắng may</strong>: nguy hiểm hơn vì nó thưởng cho hành vi xấu.' },
      { type: 'table', head: ['Loại', 'Định nghĩa', 'Ví dụ', 'Cách xử lý'], rows: [
        ['Thua hợp lệ', 'Làm đúng kế hoạch, thị trường đi ngược', 'Setup đúng, chạm dừng lỗ −1R', 'Không cần sửa gì; theo dõi tần suất'],
        ['Lỗi quy trình', 'Vi phạm quy tắc đã viết', 'Vào ngoài setup, FOMO, trả thù, nới dừng lỗ, vượt khối lượng, bỏ qua giới hạn ngày', 'Ghi rõ quy tắc bị phá; áp quy tắc tạm dừng; đếm số lỗi mỗi tuần'],
        ['Lỗi thực thi', 'Có ý định đúng nhưng thao tác sai', 'Nhập sai khối lượng, chọn nhầm cross, đặt Stop-Limit thay vì Stop-Market', 'Thêm bước kiểm tra vào checklist trước lệnh'],
        ['Lỗi phân tích', 'Tuân thủ quy tắc nhưng đọc sai bối cảnh', 'Vào long ngay trước tin CPI mà không để ý lịch', 'Bổ sung điều kiện lọc vào bộ quy tắc'],
        ['Thắng may', 'Phá quy tắc nhưng có lãi', 'Không đặt dừng lỗ, giá may mắn quay lại', 'Tính như lỗi quy trình, không được coi là thành công']
      ] },
      { type: 'scenario', title: 'Kết thúc tuần với 3 lệnh thua liền', setup: 'Tuần này bạn có 6 lệnh: 2 thắng, 4 thua, tổng −0,5R.', bad: 'Trader không ghi nhật ký chỉ nhớ "tuần tệ", kết luận chiến lược không hiệu quả và tuần sau thử chiến lược khác xem trên YouTube.', good: 'Trader có nhật ký lọc lại: 2 lệnh thua là thua hợp lệ, 2 lệnh thua còn lại là vào ngoài setup vào tối thứ Sáu khi mệt. Nếu bỏ 2 lệnh đó, tuần này +1,5R. Hành động: thêm quy tắc "không giao dịch sau 23:00", giữ nguyên chiến lược.' },

      { type: 'h', text: 'Quy trình review tuần' },
      { type: 'steps', items: [
        { title: 'Bước 1: Hoàn thiện dữ liệu (10 phút)', text: 'Kiểm tra mọi lệnh trong tuần đã có đủ cột: kết quả R, phí, ảnh chụp, cảm xúc, phân loại. Đối chiếu số dư với lịch sử lệnh của sàn.' },
        { title: 'Bước 2: Tính chỉ số (10 phút)', text: 'Tỷ lệ thắng, R trung bình, profit factor, tổng R của tuần, drawdown hiện tại so với đỉnh vốn. So với tuần trước và với trung bình 4 tuần.' },
        { title: 'Bước 3: Đếm lỗi quy trình (10 phút)', text: 'Đếm số lệnh lỗi quy trình và tổng R chúng gây ra. Mục tiêu dài hạn: 0 lỗi mỗi tuần. Nếu có từ 2 lỗi trở lên, tìm điểm chung (giờ giấc, cảm xúc, sau lệnh thua...).' },
        { title: 'Bước 4: Xem lại ảnh chụp (15 phút)', text: 'Xem biểu đồ của 2 lệnh thắng tốt nhất và 2 lệnh thua tệ nhất. Hỏi: điểm vào có thể tốt hơn không? Dừng lỗ có đúng cấu trúc không? Chốt lời có theo kế hoạch không?' },
        { title: 'Bước 5: Phân tích theo setup', text: 'Nếu đủ dữ liệu (từ 20 lệnh mỗi setup), so sánh kỳ vọng từng setup. Setup nào kỳ vọng âm liên tục sau 30–50 lệnh thì tạm ngưng để xem lại.' },
        { title: 'Bước 6: Chọn một cải tiến duy nhất', text: 'Viết ra một thay đổi cho tuần tới, cụ thể và đo được. Ví dụ: "Không vào lệnh trong 30 phút sau lệnh thua". Không đổi nhiều thứ cùng lúc, nếu không bạn không biết điều gì có tác dụng.' }
      ] },
      { type: 'callout', tone: 'risk', title: 'Khi số liệu báo động', text: 'Nếu review cho thấy drawdown chạm 10% hoặc 20%, hoặc kỳ vọng âm sau hơn 50 lệnh đúng quy trình, hãy áp quy tắc ở bài 6.3: giảm rủi ro hoặc dừng giao dịch tiền thật, quay lại Demo Trading. Tiếp tục giao dịch một hệ thống kỳ vọng âm chỉ làm mất tiền chậm hơn chứ không đổi kết quả.' }
    ],
    keyPoints: [
      'Nhật ký ghi setup, lý do, giá vào/dừng lỗ/chốt lời, R, phí, ảnh chụp, cảm xúc, tuân thủ và phân loại.',
      'Kỳ vọng = tổng R ÷ số lệnh; profit factor = tổng lãi ÷ tổng lỗ; max drawdown đo từ đỉnh đường vốn.',
      'Phân biệt thua hợp lệ (chi phí kinh doanh) với lỗi quy trình (phải sửa); thắng may cũng là lỗi.',
      'Review tuần: hoàn thiện dữ liệu, tính chỉ số, đếm lỗi, xem ảnh, chọn một cải tiến duy nhất.',
      'Cần 30–50 lệnh mỗi setup trước khi kết luận về hệ thống.'
    ],
    practice: [
      'Mở trang Nhật ký trên website (hoặc bảng tính) và nhập ít nhất 10 lệnh gần nhất, kể cả lệnh demo, với đầy đủ các cột.',
      'Tính tỷ lệ thắng, R thắng TB, R thua TB, kỳ vọng, profit factor và max drawdown cho 10 lệnh đó, so với kết quả công cụ tự tính.',
      'Đặt lịch review tuần cố định (ví dụ Chủ nhật 20:00, 1 giờ) và làm lần đầu theo 6 bước trong bài.'
    ],
    quiz: [
      { q: 'Nhật ký 20 lệnh: tổng lãi các lệnh thắng 36R, tổng lỗ các lệnh thua 24R. Profit factor và kỳ vọng?', options: ['1,5 và +0,6R', '0,67 và −0,6R', '1,5 và +1,2R', '12 và +0,6R'], answer: 0, explain: 'Profit factor = 36 ÷ 24 = 1,5. Kỳ vọng = (36 − 24) ÷ 20 = +0,6R. 0,67 là lấy ngược tỷ số; 1,2R là chia cho 10 thay vì 20; 12 là hiệu số, không phải tỷ số.' },
      { q: 'Đường vốn tích lũy (R) sau mỗi lệnh: 1; 3; 2; −1; 0,5; 4. Max drawdown tính theo R là bao nhiêu?', options: ['1R', '3R', '4R', '5R'], answer: 2, explain: 'Đỉnh cao nhất trước đáy là 3 (sau lệnh 2), đáy thấp nhất sau đó là −1 (sau lệnh 4), drawdown = 3 − (−1) = 4R. 1R là chỉ nhìn đoạn 3 → 2. 3R là đo từ 2 xuống −1, bỏ qua đỉnh 3. 5R là lấy đỉnh 4 trừ đáy −1, nhưng đỉnh 4 đến sau đáy nên không phải drawdown.' },
      { q: 'Bạn vào lệnh không có dừng lỗ, giá đi ngược 3% rồi quay lại, bạn chốt lãi +1,2R. Lệnh này nên phân loại thế nào?', options: ['Thắng đúng kế hoạch vì kết quả có lãi', 'Thua hợp lệ vì giá từng đi ngược 3%', 'Lỗi phân tích vì đọc sai bối cảnh', 'Thắng may, tính như lỗi quy trình'], answer: 3, explain: 'Kết quả lãi nhưng quy trình sai (không có dừng lỗ), nên là thắng may. Coi nó là thắng đúng kế hoạch sẽ củng cố thói quen nguy hiểm. Không phải thua; cũng không phải lỗi phân tích vì vấn đề là vi phạm quy tắc chứ không phải đọc sai bối cảnh.' },
      { q: 'Sau review tuần, bạn thấy 3 lệnh lỗi quy trình đều xảy ra sau 23:00. Cải tiến tốt nhất cho tuần tới là gì?', options: ['Đổi sang một chiến lược hoàn toàn khác', 'Thêm một quy tắc: không vào sau 23:00', 'Tăng rủi ro vào ban ngày để bù lại', 'Thêm ba chỉ báo mới để lọc tín hiệu'], answer: 1, explain: 'Nguyên nhân đã rõ (giờ giấc, mệt mỏi), nên sửa đúng chỗ bằng một thay đổi duy nhất và đo được, rồi đếm lại số lỗi tuần sau. Đổi chiến lược hay thêm chỉ báo không giải quyết hành vi; tăng rủi ro để bù là tăng nguy cơ drawdown.' }
    ],
    sources: [
      { title: 'What Is a Trading Journal and How to Use One?', url: 'https://www.binance.com/en/academy/articles/what-is-a-trading-journal-and-how-to-use-one', note: 'Binance Academy, tiếng Anh: các cột cần ghi, ghi cảm xúc, tần suất review' },
      { title: 'A Short Lesson on R and R-multiples', url: 'https://vantharp.com/wp-content/uploads/2018/06/A_Short_Lesson_on_R_and_R-multiple.pdf', note: 'Van Tharp Institute, tiếng Anh: đo kết quả bằng R-multiple' },
      { title: 'Crypto Futures Risk and Money Management: 5 Things You Can Do to Better Manage Trading Risk', url: 'https://www.binance.com/en/blog/futures/crypto-futures-risk-and-money-management-5-things-you-can-do-to-better-manage-trading-risk-421499824684902191', note: 'Binance Blog, tiếng Anh: kế hoạch giao dịch ghi rõ điểm vào, thoát, khối lượng' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
