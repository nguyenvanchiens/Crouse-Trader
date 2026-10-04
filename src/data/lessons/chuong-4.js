const lessons = {
  'c4-b1': {
    duration: 9,
    level: 'Cơ bản',
    summary: 'DCA là mua định kỳ một số tiền cố định. Bài này chỉ cách tính giá vốn trung bình, khi nào DCA có ích và vì sao nó không cứu được đồng coin đi về 0.',
    goals: [
      'Hiểu DCA là gì và nó khác mua một lần (lump sum) ở điểm nào',
      'Tự tính được giá vốn trung bình sau nhiều lần mua',
      'Viết được một kế hoạch DCA có điều kiện: mua gì, bao nhiêu, bao lâu, khi nào dừng'
    ],
    blocks: [
      { type: 'h', text: 'DCA là gì và vì sao nhiều người cần nó' },
      { type: 'p', text: 'DCA (dollar-cost averaging, mua trung bình giá định kỳ) là cách mua một <strong>số tiền cố định</strong> vào một tài sản theo <strong>lịch cố định</strong>, ví dụ 100 USDT mỗi tuần hoặc 2 triệu đồng mỗi tháng, bất kể giá đang lên hay xuống. Bạn không cố đoán đáy. Bạn chỉ làm đúng lịch.' },
      { type: 'p', text: 'Vì số tiền mỗi lần bằng nhau, khi giá thấp bạn mua được nhiều đơn vị hơn, khi giá cao bạn mua được ít hơn. Kết quả là giá vốn trung bình của bạn thường thấp hơn trung bình cộng các mức giá bạn đã mua. Đây không phải phép màu, chỉ là toán học.' },
      { type: 'p', text: 'Lợi ích lớn nhất của DCA không nằm ở con số. Nó nằm ở hành vi. Người từng thua lỗ vì cảm tính thường mắc hai lỗi: mua dồn khi giá đang tăng nóng vì sợ lỡ (FOMO) và bán tháo khi giá giảm vì hoảng. Một lịch mua cố định, tốt nhất là tự động, cắt bớt cả hai lỗi này. Binance Academy cũng nêu DCA giúp giảm quyết định theo cảm xúc và tạo thói quen đầu tư đều đặn.' },
      { type: 'figure', name: 'dca', caption: 'Mua cùng một số tiền mỗi kỳ: giá thấp mua được nhiều đơn vị hơn, nên giá vốn trung bình bị kéo xuống.' },
      { type: 'analogy', text: 'DCA giống việc đổ xăng mỗi tuần 500.000 đồng. Tuần xăng rẻ bạn được nhiều lít hơn, tuần xăng đắt được ít lít hơn. Bạn không cần đoán hôm nào xăng rẻ nhất, và cũng không bao giờ phải đổ cả năm một lần vào đúng ngày giá cao nhất.' },

      { type: 'h', text: 'Tính giá vốn trung bình: ví dụ 6 lần mua' },
      { type: 'formula', title: 'Giá vốn trung bình', expr: 'Giá vốn trung bình = Tổng số tiền đã bỏ ra ÷ Tổng số đơn vị đã mua', vars: [['Tổng số tiền', 'Cộng tất cả các lần mua (nên cộng cả phí)'], ['Tổng số đơn vị', 'Cộng số coin nhận được ở mỗi lần = Số tiền lần đó ÷ Giá lần đó']], note: 'Không lấy trung bình cộng các mức giá. Cách đó chỉ đúng khi mỗi lần bạn mua cùng một số lượng coin, không phải cùng một số tiền.' },
      { type: 'calc', title: 'DCA 100 USDT mỗi tháng vào BTC trong 6 tháng (giá giả định, bỏ qua phí)', rows: [
        ['Tháng 1: giá 80.000', '100 ÷ 80.000 = 0,001250 BTC'],
        ['Tháng 2: giá 72.000', '100 ÷ 72.000 ≈ 0,001389 BTC'],
        ['Tháng 3: giá 64.000', '100 ÷ 64.000 ≈ 0,001563 BTC'],
        ['Tháng 4: giá 70.000', '100 ÷ 70.000 ≈ 0,001429 BTC'],
        ['Tháng 5: giá 85.000', '100 ÷ 85.000 ≈ 0,001176 BTC'],
        ['Tháng 6: giá 76.000', '100 ÷ 76.000 ≈ 0,001316 BTC'],
        ['Tổng tiền và tổng BTC', '600 USDT; ≈ 0,008122 BTC'],
        ['Giá vốn trung bình', '600 ÷ 0,008122 ≈ 73.871 USDT'],
        ['So với trung bình cộng 6 mức giá', '(80.000 + 72.000 + 64.000 + 70.000 + 85.000 + 76.000) ÷ 6 = 74.500'],
        ['Giá trị ở giá 76.000', '0,008122 × 76.000 ≈ 617,29 USDT']
      ], result: 'Giá vốn trung bình khoảng 73.871, thấp hơn trung bình cộng 74.500. Ở giá 76.000 danh mục lãi khoảng 17,29 USDT, tức +2,88%, dù giá cuối kỳ vẫn thấp hơn giá lần mua đầu tiên.' },
      { type: 'tool', name: 'dca', note: 'Nhập lại 6 mức giá ở trên để tự kiểm tra, sau đó thử kịch bản giá giảm liên tục để thấy giới hạn của DCA.' },
      { type: 'callout', tone: 'tip', title: 'Đừng quên phí', text: 'Với khoản mua nhỏ, phí có thể ăn đáng kể. Phí 0,1% mỗi lần trên 100 USDT là 0,1 USDT, không lớn. Nhưng nếu bạn mua qua kênh có phí cố định hoặc chênh lệch giá mua bán cao, chia nhỏ quá mức (mua mỗi ngày 5 USDT) có thể tốn hơn lợi ích. Chọn tần suất tuần hoặc tháng là đủ.' },

      { type: 'h', text: 'DCA so với mua một lần' },
      { type: 'p', text: 'Nếu bạn đang có sẵn một khoản tiền lớn, câu hỏi thật sự là: đổ hết ngay hay chia ra mua dần? Nghiên cứu của Vanguard trên thị trường cổ phiếu ở nhiều khu vực, giai đoạn 1976–2022, cho thấy mua một lần thắng cách chia làm 3 phần mua trong 3 tháng ở khoảng <strong>61,6% đến 73,7% số trường hợp</strong> (so sánh lợi nhuận trên các giai đoạn 1 năm cuộn liên tiếp; tỷ lệ khác nhau theo từng thị trường). Thời gian chia nhỏ càng dài, mua một lần càng hay thắng hơn. Lý do: thị trường đó có xu hướng tăng dài hạn, nên chờ đợi thường nghĩa là mua ở giá cao hơn. Ngược lại, trong những kịch bản xấu nhất, chia nhỏ giúp lỗ ít hơn một chút.' },
      { type: 'callout', tone: 'warn', title: 'Đó là dữ liệu cổ phiếu, không phải crypto', text: 'Kết quả của Vanguard dựa trên chỉ số cổ phiếu đa dạng hóa, vốn có xu hướng tăng dài hạn. Crypto biến động mạnh hơn nhiều, lịch sử ngắn hơn, và phần lớn altcoin không có xu hướng tăng dài hạn nào cả. Đừng mang con số này áp nguyên sang crypto.' },
      { type: 'table', head: ['Tiêu chí', 'Mua một lần', 'DCA'], rows: [
        ['Phù hợp khi', 'Đã có khoản tiền lớn, chịu được biến động ngay', 'Có thu nhập đều, muốn tích lũy dần'],
        ['Rủi ro thời điểm', 'Cao: có thể mua đúng đỉnh', 'Thấp hơn: giá vốn trải trên nhiều mốc'],
        ['Khi giá tăng đều', 'Thường lãi nhiều hơn', 'Lãi ít hơn vì mua sau ở giá cao'],
        ['Khi giá giảm rồi hồi', 'Chịu lỗ sâu hơn trong lúc giảm', 'Giá vốn được kéo xuống'],
        ['Tác động tâm lý', 'Dễ hối hận, dễ bán hoảng', 'Dễ giữ kỷ luật hơn']
      ] },
      { type: 'p', text: 'Với người đi làm, câu hỏi này thường không đặt ra: bạn nhận lương mỗi tháng, nên mua định kỳ từ phần tiền nhàn rỗi mỗi tháng chính là DCA tự nhiên. Điều cần quyết định là mua <em>cái gì</em> và <em>điều kiện nào thì dừng</em>.' },

      { type: 'h', text: 'DCA không cứu được đồng coin đi về 0' },
      { type: 'p', text: 'Đây là hiểu lầm nguy hiểm nhất. Nhiều người nghĩ: cứ giá giảm là mua thêm, giá vốn thấp dần, rồi sẽ có ngày về bờ. Điều này chỉ đúng nếu giá <strong>quay lại</strong> trên giá vốn. Nếu tài sản chết dần, giá vốn giảm nhưng giá thị trường giảm nhanh hơn.' },
      { type: 'calc', title: 'DCA 100 USDT mỗi tháng vào một altcoin suy tàn (giá giả định)', rows: [
        ['Giá 6 tháng', '1,00 → 0,60 → 0,35 → 0,20 → 0,10 → 0,05 USDT'],
        ['Số token mua được', '100 + 166,67 + 285,71 + 500 + 1.000 + 2.000 = 4.052,38 token'],
        ['Giá vốn trung bình', '600 ÷ 4.052,38 ≈ 0,1481 USDT'],
        ['Giá trị ở giá 0,05', '4.052,38 × 0,05 ≈ 202,62 USDT, lỗ khoảng 66%'],
        ['Nếu giá tiếp tục về 0,01', '4.052,38 × 0,01 ≈ 40,52 USDT, lỗ khoảng 93%']
      ], result: 'Giá vốn đã giảm từ 1,00 xuống 0,1481, trông rất "đẹp", nhưng tài khoản vẫn mất gần hết. DCA chỉ trung bình hóa giá mua, không tạo ra giá trị cho tài sản.' },
      { type: 'callout', tone: 'risk', title: 'DCA vào tài sản sai = mất tiền có kỷ luật', text: 'Terra/LUNA sụp đổ tháng 5/2022 là ví dụ: ai "mua thêm để hạ giá vốn" khi LUNA lao dốc đều mất gần như toàn bộ. Rất nhiều altcoin sau mỗi chu kỳ không bao giờ quay lại đỉnh cũ. Trước khi DCA, hãy hỏi: nếu giá giảm 80% và không hồi trong 3 năm, tôi có chịu được không?' },
      { type: 'p', text: 'Cũng đừng nhầm DCA với "gồng lỗ rồi bình quân giá". DCA là kế hoạch lập <em>trước</em>, với số tiền cố định và tài sản đã chọn kỹ. Bình quân giá xuống trong một lệnh giao dịch ngắn hạn đã sai là phản ứng cảm tính <em>sau</em> khi thua, thường làm lệnh lỗ phình to. Chương 5 và chương 6 sẽ nói kỹ vì sao không được làm vậy với lệnh có dừng lỗ.' },

      { type: 'h', text: 'Chọn tài sản và viết kế hoạch DCA có điều kiện' },
      { type: 'p', text: 'DCA hợp lý nhất với tài sản có khả năng tồn tại lâu dài, thanh khoản cao và không phụ thuộc vào một đội ngũ nhỏ. Với phần lớn người học, đó là nhóm tài sản vốn hóa lớn nhất thị trường. Đây không phải lời khuyên mua coin cụ thể; bạn tự đánh giá theo tiêu chí ở chương 3.' },
      { type: 'checklist', title: 'Tài sản có đủ điều kiện để DCA không?', items: [
        'Đã tồn tại qua ít nhất một chu kỳ giảm mạnh mà vẫn hoạt động',
        'Thanh khoản cao, giao dịch trên nhiều sàn lớn, spread hẹp',
        'Không có lịch mở khóa (unlock) token lớn đè giá trong 1–2 năm tới',
        'Bạn giải thích được trong 2 câu vì sao nó còn giá trị sau 5 năm',
        'Không có tỷ trọng quá lớn trong danh mục (xem bài 4.4)'
      ] },
      { type: 'steps', items: [
        { title: 'Chốt số tiền', text: 'Chỉ dùng tiền nhàn rỗi sau khi đã có quỹ dự phòng. Ví dụ: 2 triệu đồng mỗi tháng, tương đương 10% thu nhập.' },
        { title: 'Chốt lịch', text: 'Ngày cố định, ví dụ ngày 5 hằng tháng. Dùng tính năng mua định kỳ tự động nếu nền tảng hợp pháp bạn dùng có hỗ trợ, để không phải "quyết định" mỗi lần.' },
        { title: 'Chốt thời hạn', text: 'DCA có ý nghĩa với kỳ hạn dài, ví dụ 24–48 tháng. Nếu bạn cần tiền trong 6 tháng tới, đừng DCA vào crypto.' },
        { title: 'Chốt điều kiện dừng', text: 'Viết ra trước điều gì làm luận điểm sai: dự án ngừng phát triển, sự cố bảo mật nghiêm trọng, tỷ trọng vượt giới hạn. Khi điều kiện xảy ra, bạn ngừng mua, không cần đợi giá.' },
        { title: 'Ghi sổ và xem lại theo quý', text: 'Ghi mỗi lần mua: ngày, giá, số lượng, phí. Mỗi quý tính lại giá vốn. Không kiểm tra giá mỗi giờ.' }
      ] },
      { type: 'scenario', title: 'Giá giảm 20% trong tháng', setup: 'Bạn đã DCA 4 tháng. Tháng này thị trường giảm 20%, mạng xã hội tràn ngập tin xấu.', bad: 'Hoảng, bán hết để "cắt lỗ", tháng sau giá hồi lại thì FOMO mua vào với số tiền gấp 3 lần kế hoạch. Giá vốn cao hơn, tiền sinh hoạt bị động vào.', good: 'Kiểm tra lại điều kiện dừng đã viết: dự án vẫn hoạt động, tỷ trọng vẫn trong giới hạn. Mua đúng 2 triệu vào ngày 5 như lịch, ghi sổ. Không tăng tiền, không bỏ kỳ.' },
      { type: 'callout', tone: 'note', title: 'Nhắc về pháp lý', text: 'Theo Nghị quyết 05/2025/NQ-CP, giao dịch tài sản mã hóa trong khuôn khổ thí điểm phải thực hiện bằng Đồng Việt Nam qua tổ chức được Bộ Tài chính cấp phép. Kế hoạch DCA dài hạn nên tính đến việc bạn sẽ mua và lưu ký ở đâu một cách hợp pháp. Xem bài 1.6 và luôn kiểm tra văn bản mới nhất.' }
    ],
    keyPoints: [
      'DCA là mua một số tiền cố định theo lịch cố định, giúp giảm quyết định theo cảm xúc.',
      'Giá vốn trung bình = Tổng tiền ÷ Tổng số đơn vị, không phải trung bình cộng các mức giá.',
      'Với tiền có sẵn, mua một lần thường thắng DCA trên thị trường cổ phiếu (Vanguard: 61,6–73,7% số trường hợp), nhưng DCA giảm rủi ro mua đúng đỉnh.',
      'DCA không cứu được tài sản giảm về 0: giá vốn thấp không có nghĩa là có lãi.',
      'Kế hoạch DCA phải có số tiền, lịch, thời hạn và điều kiện dừng viết ra từ trước.'
    ],
    practice: [
      'Dùng công cụ DCA, nhập 6 mức giá giả định của riêng bạn và tự tính giá vốn trung bình bằng tay, so với kết quả công cụ.',
      'Viết kế hoạch DCA 1 trang: số tiền mỗi kỳ, ngày mua, thời hạn, và 3 điều kiện dừng.',
      'Tìm một altcoin từng nằm trong top 50 vốn hóa của chu kỳ trước và xem giá hiện tại so với đỉnh. Ghi lại: nếu DCA vào nó, kết quả ra sao?'
    ],
    quiz: [
      {
        q: 'Bạn DCA 3 lần, mỗi lần 300 USDT, ở giá 100, 50 và 150 (giả định). Giá vốn trung bình là bao nhiêu?',
        options: ['100', '75', 'Khoảng 91,7', 'Khoảng 81,8'],
        answer: 3,
        explain: 'Số đơn vị: 3 + 6 + 2 = 11. Giá vốn = 900 ÷ 11 ≈ 81,8. Đáp án 100 là trung bình cộng giá, chỉ đúng khi mua cùng số lượng. 75 và 91,7 là kết quả tính sai.'
      },
      {
        q: 'Một người DCA vào altcoin đã giảm 90% và nói: "Giá vốn của tôi giảm liên tục, sớm muộn sẽ lãi". Nhận định nào đúng?',
        options: ['Sai: giá vốn thấp chưa phải là lãi, giá có thể không bao giờ hồi', 'Đúng: kiên trì DCA đủ lâu thì chắc chắn sẽ có lãi trở lại', 'Đúng: giá vốn càng thấp thì khoản đầu tư càng an toàn hơn', 'Sai: DCA chỉ hiệu quả khi mua mỗi ngày thay vì mỗi tháng'],
        answer: 0,
        explain: 'DCA chỉ trung bình hóa giá mua. Nếu giá không quay lại trên giá vốn thì vẫn lỗ, thậm chí mất gần hết. Giá thị trường có thể giảm nhanh hơn giá vốn. Không có chiến lược nào "đảm bảo lãi", và tần suất mua hằng ngày không thay đổi bản chất vấn đề.'
      },
      {
        q: 'Theo nghiên cứu Vanguard trên cổ phiếu 1976–2022, điều nào đúng?',
        options: ['DCA thắng mua một lần trong gần như mọi giai đoạn', 'Mua một lần thắng trong khoảng 61,6–73,7% số trường hợp', 'Hai cách cho kết quả gần như giống hệt nhau', 'Kết quả này áp dụng y nguyên cho mọi altcoin'],
        answer: 1,
        explain: 'Mua một lần thắng phần lớn thời gian vì cổ phiếu có xu hướng tăng dài hạn; chia nhỏ chỉ giúp lỗ ít hơn ở các kịch bản xấu nhất. DCA không luôn thắng, hai cách không như nhau, và dữ liệu cổ phiếu không thể áp nguyên cho altcoin vốn không có xu hướng tăng dài hạn.'
      },
      {
        q: 'Điều nào KHÔNG nên có trong một kế hoạch DCA có điều kiện?',
        options: ['Số tiền cố định mỗi kỳ từ tiền nhàn rỗi', 'Điều kiện dừng viết ra từ trước', 'Tăng gấp đôi số tiền mỗi khi giá giảm mạnh để về bờ nhanh', 'Ghi sổ và xem lại theo quý'],
        answer: 2,
        explain: 'Tăng tiền theo cảm xúc khi giá giảm biến DCA thành bình quân giá cảm tính, dễ động vào tiền sinh hoạt. Ba lựa chọn còn lại đều là thành phần của một kế hoạch DCA kỷ luật.'
      }
    ],
    sources: [
      { title: 'What Is Dollar-Cost Averaging (DCA)?', url: 'https://www.binance.com/en/academy/articles/dollar-cost-averaging-dca-explained', note: 'Binance Academy, tiếng Anh' },
      { title: 'The truth about cost averaging', url: 'https://www.vanguard.co.uk/professional/vanguard-365/financial-planning/financial-well-being/cost-averaging', note: 'Vanguard UK, nghiên cứu 1976–2022, tiếng Anh' },
      { title: 'Why Stablecoins Fail: An Economist’s Post-Mortem on Terra', url: 'https://www.richmondfed.org/publications/research/economic_brief/2022/eb_22-24', note: 'Federal Reserve Bank of Richmond, 2022, tiếng Anh' },
      { title: 'Toàn văn Nghị quyết 05/2025/NQ-CP', url: 'https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-5-2025-nq-cp-ve-trien-khai-thi-diem-thi-truong-tai-san-ma-hoa-tai-viet-nam-119250909184045221.htm', note: 'Cổng thông tin Chính phủ, 2025, tiếng Việt' }
    ],
    updated: '2026-09'
  },

  'c4-b2': {
    duration: 9,
    level: 'Trung cấp',
    summary: 'Chiến lược swing spot theo xu hướng: mua pullback và breakout-retest với điều kiện cụ thể, dừng lỗ theo cấu trúc, chốt lời từng phần, kèm một lệnh mẫu bằng số.',
    goals: [
      'Nhận diện hai setup swing spot: mua pullback trong xu hướng tăng và breakout-retest',
      'Viết được điều kiện vào lệnh rõ ràng, kiểm tra được bằng mắt trên biểu đồ',
      'Tính một lệnh hoàn chỉnh: vùng vào, dừng lỗ, 2 mục tiêu, khối lượng theo rủi ro 1%'
    ],
    blocks: [
      { type: 'h', text: 'Swing trading spot là gì' },
      { type: 'p', text: 'Swing trading (giao dịch theo sóng) là giữ lệnh từ vài ngày đến vài tuần để ăn một nhịp giá. Trên spot, bạn mua tài sản thật, không đòn bẩy, không bị thanh lý. Rủi ro lớn nhất là bạn tự giữ lệnh lỗ quá lâu, nên mọi lệnh vẫn cần dừng lỗ (stop loss).' },
      { type: 'p', text: 'Ý tưởng cốt lõi rất đơn giản: <strong>chỉ mua khi xu hướng khung lớn đang tăng</strong>, và mua ở chỗ rủi ro thấp, tức gần điểm mà nếu giá đi qua thì bạn biết mình sai. Bạn không mua ở đỉnh sóng, bạn chờ giá lùi lại. Bài này dùng khung ngày (D1) để định hướng và khung 4 giờ (H4) để tìm điểm vào, như đã học ở bài 2.7.' },
      { type: 'figure', name: 'trend-structure', caption: 'Xu hướng tăng là chuỗi đỉnh cao hơn (HH) và đáy cao hơn (HL). Swing spot chỉ mua trong cấu trúc này.' },
      { type: 'callout', tone: 'warn', title: 'Spot không có nghĩa là an toàn', text: 'Không đòn bẩy nghĩa là không bị thanh lý, nhưng altcoin vẫn có thể giảm 50–90%. Một lệnh spot không dừng lỗ có thể biến thành "đầu tư dài hạn bất đắc dĩ" và khóa vốn của bạn nhiều năm.' },

      { type: 'h', text: 'Setup 1: mua pullback trong xu hướng tăng' },
      { type: 'p', text: 'Pullback (nhịp điều chỉnh) là đoạn giá lùi lại sau một sóng tăng, trước khi đi tiếp. Trong xu hướng tăng lành mạnh, đáy của pullback thường cao hơn đáy trước. Mục tiêu của bạn là mua gần đáy mới đó, với dừng lỗ ngay dưới nó.' },
      { type: 'checklist', title: 'Điều kiện vào lệnh pullback (phải đủ tất cả)', items: [
        'D1: có ít nhất 2 đỉnh cao hơn và 2 đáy cao hơn gần nhất; giá đóng cửa trên EMA 50',
        'Giá lùi về một vùng hỗ trợ rõ ràng: kháng cự cũ đã bị phá, hoặc vùng EMA 20–50, hoặc vùng Fibonacci 0.382–0.618 của sóng vừa rồi',
        'Nhịp lùi có volume giảm dần so với sóng tăng trước đó',
        'H4 xuất hiện tín hiệu giá quay lên tại vùng: nến búa, nến nhấn chìm tăng, hoặc phá đỉnh nhỏ của nhịp lùi',
        'Khoảng cách tới mục tiêu đầu tiên ít nhất gấp 2 lần khoảng cách tới dừng lỗ (R:R từ 1:2)',
        'Không mở lệnh trong khoảng 30 phút trước đến 30 phút sau tin vĩ mô lớn (CPI, FOMC, NFP) (xem bài 5.9). Lựa chọn chặt hơn bộ chuẩn cho lệnh swing: nếu có tin lớn trong 24 giờ tới thì giảm khối lượng hoặc chờ qua tin'
      ] },
      { type: 'p', text: 'Nếu thiếu một điều kiện, bạn không vào. Chính việc bỏ qua các lệnh "gần đủ" mới tạo ra sự khác biệt. Điều kiện 4 rất quan trọng: nó bắt bạn chờ giá chứng minh bên mua quay lại, thay vì "bắt dao rơi" ở giữa nhịp giảm.' },

      { type: 'h', text: 'Setup 2: phá vỡ và kiểm tra lại (breakout-retest)' },
      { type: 'p', text: 'Khi giá phá lên một vùng kháng cự quan trọng, vùng đó thường đổi vai thành hỗ trợ. StockCharts ChartSchool giải thích: kháng cự bị phá cho thấy cung cầu đã thay đổi, và khi giá quay lại, bên mua mới xuất hiện ở đó. Thay vì đuổi theo cây nến phá vỡ, bạn chờ giá quay lại kiểm tra (retest) vùng cũ rồi mới mua.' },
      { type: 'figure', name: 'breakout-retest', caption: 'Giá phá kháng cự, quay lại kiểm tra, vùng cũ giữ được và thành hỗ trợ. Điểm vào ở lần kiểm tra lại, dừng lỗ dưới đáy của nhịp retest.' },
      { type: 'list', ordered: true, items: [
        '<strong>Phá vỡ thật:</strong> nến D1 hoặc H4 đóng cửa trên vùng kháng cự, không chỉ có bóng nến chọc qua. Volume của nến phá vỡ cao hơn rõ rệt so với trung bình 20 nến (bài 2.4).',
        '<strong>Chờ retest:</strong> giá quay về vùng vừa phá, trong vòng khoảng 3–10 nến H4. Nếu giá chạy thẳng không quay lại, bạn bỏ lệnh. Không đuổi.',
        '<strong>Vùng giữ được:</strong> nến H4 đóng cửa lại trên vùng, xuất hiện tín hiệu quay lên.',
        '<strong>Vào lệnh:</strong> lệnh limit trong vùng retest hoặc lệnh mua khi giá phá đỉnh nhỏ của nhịp retest.',
        '<strong>Hủy kịch bản:</strong> nến H4 đóng cửa sâu dưới vùng cũ nghĩa là phá vỡ giả (bài 2.3). Không vào, hoặc thoát nếu đã vào.'
      ] },
      { type: 'scenario', title: 'ETH vừa phá kháng cự với nến tăng dài', setup: 'Giá phá vùng 2.900–2.950 (giả định), nến H4 tăng 5%, nhóm chat hô hào "lên 4.000".', bad: 'Mua market ngay ở đỉnh nến 3.080, không đặt dừng lỗ vì "phá vỡ rồi thì chỉ có lên". Giá quay về 2.900, hoảng bán lỗ, rồi nhìn giá đi lên lại.', good: 'Đánh dấu vùng 2.900–2.950, đặt cảnh báo giá. Chờ giá quay về vùng, thấy nến H4 đóng cửa lại trên vùng mới vào ở 2.980, dừng lỗ 2.840, khối lượng theo rủi ro 1%. Nếu giá không quay lại, bỏ qua, không tiếc.' },

      { type: 'h', text: 'Dừng lỗ theo cấu trúc và chốt lời từng phần' },
      { type: 'p', text: 'Dừng lỗ theo cấu trúc đặt ở nơi mà nếu giá tới đó, kịch bản của bạn không còn đúng. Với setup mua, đó là <strong>dưới đáy gần nhất</strong> của nhịp pullback hoặc nhịp retest, cộng thêm một vùng đệm nhỏ để tránh bị quét bởi nhiễu. Không đặt đúng số tròn, không đặt đúng đáy mà ai cũng thấy. Bài 4.3 sẽ so sánh chi tiết cách đặt theo cấu trúc, theo % và theo ATR.' },
      { type: 'p', text: 'Chốt lời từng phần giúp bạn vừa khóa được một phần lợi nhuận, vừa để phần còn lại chạy theo xu hướng. Một cách đơn giản:' },
      { type: 'list', items: [
        '<strong>Mục tiêu 1 (TP1):</strong> bán 50% ở khoảng 2R, hoặc ngay dưới đỉnh gần nhất (kháng cự tiếp theo), chọn mức nào gần hơn.',
        '<strong>Sau TP1:</strong> dời dừng lỗ của phần còn lại lên điểm hòa vốn (giá vào). Trong điều kiện bình thường, phần còn lại khó lỗ thêm ngoài phí. Nhưng đây không phải bảo đảm: nếu giá nhảy cóc (gap) hoặc sập rất nhanh qua mức dừng lỗ, lệnh có thể khớp thấp hơn giá vào, còn lệnh stop-limit thì có thể không khớp.',
        '<strong>Mục tiêu 2 (TP2):</strong> bán 50% còn lại ở 3R hoặc vùng kháng cự lớn hơn trên D1, hoặc dùng dừng lỗ kéo theo (trailing stop, bài 4.3).'
      ] },
      { type: 'callout', tone: 'tip', title: 'R là gì', text: 'R là số tiền bạn chấp nhận mất nếu dừng lỗ bị chạm. Lãi 2R nghĩa là lãi gấp đôi số tiền đã rủi ro. Quy mọi lệnh về R giúp bạn so sánh lệnh to và lệnh nhỏ trên cùng một thước đo.' },

      { type: 'h', text: 'Một lệnh swing spot hoàn chỉnh bằng số' },
      { type: 'example', title: 'Bối cảnh (tất cả là giả định)', text: 'Tài khoản 1.000 USDT. ETH trên D1 đang có đỉnh cao hơn và đáy cao hơn. Vùng kháng cự cũ 2.900–2.950 vừa bị phá bằng nến D1 đóng cửa 3.080 với volume gấp đôi trung bình. Ba ngày sau, giá quay về, đáy nhịp retest ở 2.870, nến H4 đóng cửa lại ở 2.975. Đỉnh gần nhất trên D1 ở vùng 3.280–3.300. Phí giao dịch giả định 0,1% mỗi chiều.' },
      { type: 'calc', title: 'Lệnh mua ETH theo setup breakout-retest', rows: [
        ['Vùng vào', '2.960–3.000; đặt lệnh limit mua ở 2.980'],
        ['Dừng lỗ theo cấu trúc', 'Dưới đáy retest 2.870 và dưới vùng 2.900, thêm vùng đệm: 2.840'],
        ['Rủi ro mỗi ETH', '2.980 − 2.840 = 140 USDT'],
        ['Số tiền rủi ro (1% tài khoản)', '1.000 × 1% = 10 USDT'],
        ['Khối lượng', '10 ÷ 140 ≈ 0,0714 ETH; làm tròn xuống 0,071 ETH'],
        ['Giá trị lệnh', '0,071 × 2.980 = 211,58 USDT (khoảng 21% tài khoản)'],
        ['Rủi ro thực tế', '0,071 × 140 = 9,94 USDT'],
        ['TP1 (2R), bán 0,0355 ETH', '2.980 + 2 × 140 = 3.260, ngay dưới vùng đỉnh 3.280–3.300; lãi 0,0355 × 280 = 9,94 USDT'],
        ['TP2 (3R), bán 0,0355 ETH', '2.980 + 3 × 140 = 3.400; lãi 0,0355 × 420 = 14,91 USDT'],
        ['Phí ước tính (0,1% mỗi chiều)', 'Mua ≈ 0,21; bán TP1 ≈ 0,12; bán TP2 ≈ 0,12; tổng ≈ 0,45 USDT']
      ], result: 'Ba kết cục: (1) Dừng lỗ trước TP1: lỗ ≈ 9,94 USDT, tức −1R, cộng phí. (2) Chạm TP1 rồi quay về hòa vốn: lãi ≈ 9,94 USDT, tức +1R. (3) Chạm cả hai mục tiêu: lãi 9,94 + 14,91 = 24,85 USDT, tức khoảng +2,5R. Trước phí ≈ 0,45 USDT.' },
      { type: 'p', text: 'Để ý: khối lượng được tính <em>từ</em> khoảng cách dừng lỗ, không phải từ cảm giác "mua 500 USDT cho đẹp". Dừng lỗ xa thì mua ít, dừng lỗ gần thì mua nhiều, nhưng số tiền rủi ro luôn là 10 USDT. Đây là nền tảng của quản trị vốn, bài 6.1 sẽ học sâu, còn bạn có thể dùng công cụ tính khối lượng ở bài 4.3.' },
      { type: 'callout', tone: 'risk', title: 'Đặt dừng lỗ ngay sau khi khớp', text: 'Trên spot, hãy đặt dừng lỗ lên sàn ngay khi lệnh mua khớp: lệnh stop-market, hoặc OCO (bài 1.4) nếu muốn đặt cùng lúc lệnh chốt lời. Lưu ý: trên Binance Spot, chân dừng lỗ của OCO là lệnh <strong>stop-limit</strong> (giá kích hoạt + giá limit), và stop-market của Spot cũng gửi lệnh có giới hạn trượt giá. Nếu giá lao qua mức limit, lệnh có thể không khớp và bạn vẫn ôm coin. Quy tắc gợi ý: đặt giá limit thấp hơn giá kích hoạt khoảng 0,5–1% với BTC/ETH (1–2% với altcoin thanh khoản mỏng), và tính khối lượng theo giá limit chứ không theo giá kích hoạt. Với lệnh mẫu ở trên: kích hoạt 2.840, limit 2.825 (thấp hơn khoảng 0,5%) thì rủi ro mỗi ETH là 2.980 − 2.825 = 155; giữ 0,071 ETH thì lỗ tối đa ≈ 11 USDT, hơi vượt 1R; muốn chặt chẽ thì mua 10 ÷ 155 ≈ 0,064 ETH. Không "giữ dừng lỗ trong đầu": khi giá lao nhanh lúc bạn đang ngủ, dừng lỗ trong đầu không bảo vệ được gì.' },
      { type: 'steps', items: [
        { title: 'Trước khi vào', text: 'Ghi setup, lý do, vùng vào, dừng lỗ, TP1, TP2, khối lượng vào sổ. Kiểm tra lịch tin.' },
        { title: 'Khi khớp', text: 'Đặt ngay dừng lỗ 2.840 và lệnh limit bán 50% ở 3.260.' },
        { title: 'Khi chạm TP1', text: 'Dời dừng lỗ phần còn lại lên 2.980. Đặt limit bán ở 3.400 hoặc chuyển sang trailing stop.' },
        { title: 'Sau khi đóng lệnh', text: 'Ghi kết quả bằng R, chụp biểu đồ, ghi một điều làm tốt và một điều cần sửa.' }
      ] }
    ],
    keyPoints: [
      'Swing spot chỉ mua khi D1 có cấu trúc tăng (HH/HL), mua ở pullback hoặc retest, không đuổi nến.',
      'Điều kiện vào lệnh phải cụ thể và đủ tất cả; thiếu một điều kiện là bỏ lệnh.',
      'Dừng lỗ theo cấu trúc đặt dưới đáy nhịp pullback/retest cộng vùng đệm, không đặt đúng số tròn.',
      'Chốt lời từng phần: 50% ở 2R hoặc dưới đỉnh gần nhất, dời dừng lỗ về hòa vốn, phần còn lại ở 3R hoặc trailing.',
      'Khối lượng = Số tiền rủi ro ÷ (Giá vào − Giá dừng lỗ); rủi ro 1% tài khoản mỗi lệnh.'
    ],
    practice: [
      'Mở biểu đồ D1 của BTC hoặc ETH, đánh dấu 3 đỉnh và 3 đáy gần nhất. Kết luận: xu hướng tăng, giảm hay đi ngang theo quy tắc HH/HL?',
      'Tìm lại trong lịch sử 2 lần breakout-retest và 2 lần phá vỡ giả. Ghi vùng vào, dừng lỗ và kết quả nếu làm theo 5 bước ở bài.',
      'Với tài khoản giả định 1.000 USDT, tự tính lại lệnh mẫu nếu dừng lỗ đặt ở 2.780 thay vì 2.840. Khối lượng và TP1, TP2 thay đổi thế nào?'
    ],
    quiz: [
      {
        q: 'Tài khoản 1.000 USDT, rủi ro 1%. Bạn mua ở 3.000, dừng lỗ 2.800 (giả định). Khối lượng đúng là bao nhiêu?',
        options: ['0,5 ETH', '0,1 ETH', '0,05 ETH', '0,33 ETH'],
        answer: 2,
        explain: 'Rủi ro 10 USDT, khoảng cách 200 USDT/ETH, khối lượng = 10 ÷ 200 = 0,05 ETH. 0,1 ETH là rủi ro 2%; 0,33 ETH là dùng toàn bộ tài khoản; 0,5 ETH vượt số dư.'
      },
      {
        q: 'Giá vừa phá kháng cự bằng một nến H4 tăng mạnh, bạn chưa có lệnh. Theo setup breakout-retest, bạn làm gì?',
        options: ['Đánh dấu vùng vừa phá, chờ giá quay lại kiểm tra và giữ được rồi mới vào; nếu không quay lại thì bỏ qua', 'Mua market ngay để không lỡ', 'Bán khống vì giá đã tăng quá nhiều', 'Mua và không đặt dừng lỗ vì phá vỡ đã xác nhận'],
        answer: 0,
        explain: 'Setup yêu cầu chờ retest để vào ở chỗ rủi ro thấp. Mua đuổi làm dừng lỗ xa và R:R xấu. Bán khống không phải spot và ngược xu hướng. Không đặt dừng lỗ là vi phạm quy tắc cơ bản.'
      },
      {
        q: 'Với lệnh mẫu trong bài (vào 2.980, dừng lỗ 2.840), giá chạm TP1 rồi quay về 2.980. Kết quả cả lệnh là gì (bỏ qua phí)?',
        options: ['Lỗ 1R', 'Hòa vốn', 'Lãi 2,5R', 'Lãi khoảng 1R'],
        answer: 3,
        explain: 'Nửa lệnh bán ở 2R cho lãi 0,0355 × 280 ≈ 9,94 USDT, nửa còn lại đóng ở hòa vốn. Tổng khoảng +1R so với rủi ro ban đầu 9,94 USDT. Lỗ 1R chỉ xảy ra khi dừng lỗ bị chạm trước TP1; 2,5R khi chạm cả hai mục tiêu.'
      },
      {
        q: 'Điều kiện nào sau đây KHÔNG thuộc setup mua pullback trong bài?',
        options: ['D1 có đỉnh cao hơn và đáy cao hơn', 'Giá đang giảm mạnh dưới EMA 50 trên D1 nên "rẻ", mua ngay', 'Nhịp lùi có volume giảm dần', 'H4 có tín hiệu quay lên tại vùng hỗ trợ'],
        answer: 1,
        explain: 'Giá dưới EMA 50 và giảm mạnh là dấu hiệu xu hướng yếu hoặc giảm, không phải pullback trong xu hướng tăng. "Rẻ" không phải điều kiện vào lệnh. Ba lựa chọn còn lại đều nằm trong checklist.'
      }
    ],
    sources: [
      { title: 'Support & Resistance', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/support-and-resistance', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'A Short Lesson on R and R-multiple', url: 'https://vantharp.com/wp-content/uploads/2018/06/A_Short_Lesson_on_R_and_R-multiple.pdf', note: 'Van Tharp Institute, tiếng Anh' },
      { title: 'How to Use Spot Trailing Stop Order?', url: 'https://www.binance.com/en/support/faq/how-to-use-spot-trailing-stop-order-339635f6260d43c5aefa4c3c921728ec', note: 'Binance Support, tiếng Anh' },
      { title: 'Different Order Types in Spot Trading', url: 'https://www.binance.com/en/support/faq/different-order-types-in-spot-trading-8a2973eef1de429dbfad38ab878aa3eb', note: 'Binance Support, tiếng Anh: OCO gồm một lệnh limit và một lệnh stop-limit' }
    ],
    updated: '2026-09'
  },

  'c4-b3': {
    duration: 9,
    level: 'Trung cấp',
    summary: 'Viết trading plan cho một lệnh trước khi bấm nút: điểm vô hiệu, dừng lỗ theo cấu trúc/%/ATR, mục tiêu theo vùng, trailing stop và quy tắc không dời dừng lỗ ra xa.',
    goals: [
      'Viết được kế hoạch một lệnh đầy đủ trước khi vào lệnh',
      'Xác định điểm vô hiệu (invalidation) và đặt dừng lỗ theo 3 cách: cấu trúc, %, ATR',
      'Quản lý lệnh đang chạy bằng trailing stop mà không bao giờ dời dừng lỗ ra xa'
    ],
    blocks: [
      { type: 'h', text: 'Vì sao phải viết kế hoạch trước khi vào lệnh' },
      { type: 'p', text: 'Trước khi vào lệnh, bạn còn tỉnh táo. Sau khi vào lệnh, mỗi nến đỏ đều kéo cảm xúc. Kế hoạch giao dịch (trading plan) cho một lệnh là bản cam kết bạn viết lúc còn tỉnh, để lúc bị cảm xúc kéo thì chỉ việc làm theo. Nếu không viết ra được, bạn chưa có lệnh, bạn chỉ có một cảm giác.' },
      { type: 'p', text: 'Một kế hoạch tốt trả lời 5 câu: <strong>Vì sao vào? Vào ở đâu? Sai ở đâu? Chốt ở đâu? Bao nhiêu tiền?</strong> Thứ tự quan trọng: bạn xác định chỗ sai (dừng lỗ) trước, rồi mới tính khối lượng. Không làm ngược lại.' },
      { type: 'figure', name: 'trade-plan', caption: 'Một kế hoạch lệnh: điểm vào, dừng lỗ ở điểm vô hiệu, các mục tiêu 1R/2R/3R.' },
      { type: 'steps', items: [
        { title: '1. Bối cảnh', text: 'Xu hướng D1 (HH/HL hay LH/LL), vùng giá quan trọng, lịch tin 48 giờ tới. Ví dụ: "D1 tăng, giá pullback về vùng hỗ trợ 79.500–80.500, không có CPI/FOMC trong 2 ngày".' },
        { title: '2. Setup và điều kiện vào', text: 'Tên setup (pullback / breakout-retest) và tín hiệu cụ thể trên H4. Ví dụ: "Nến H4 đóng cửa trên 80.000 sau nến búa tại vùng".' },
        { title: '3. Điểm vô hiệu và dừng lỗ', text: 'Giá nào chứng minh bạn sai. Dừng lỗ đặt ở đó cộng vùng đệm. Loại lệnh: stop-market, hoặc OCO. Trên Binance Spot, chân dừng lỗ của OCO là stop-limit: đặt giá limit thấp hơn giá kích hoạt khoảng 0,5–1% (altcoin mỏng 1–2%) và tính khối lượng theo giá limit (bài 4.2). Giá lao qua mức limit thì lệnh có thể không khớp.' },
        { title: '4. Mục tiêu', text: 'TP1, TP2 theo vùng kháng cự thật, kiểm tra R:R tối thiểu 1:2 tới TP1 hoặc TP2.' },
        { title: '5. Khối lượng', text: 'Số tiền rủi ro (ví dụ 1% tài khoản) ÷ khoảng cách dừng lỗ. Kiểm tra lại bằng công cụ.' },
        { title: '6. Quản lý lệnh', text: 'Khi nào dời dừng lỗ về hòa vốn, khi nào bật trailing, khi nào thoát theo thời gian (ví dụ 10 ngày không chạy thì thoát).' },
        { title: '7. Ghi sổ sau lệnh', text: 'Kết quả bằng R, có làm đúng kế hoạch không, ảnh chụp biểu đồ.' }
      ] },

      { type: 'h', text: 'Điểm vô hiệu: dừng lỗ bắt đầu từ câu hỏi "sai ở đâu"' },
      { type: 'p', text: 'Điểm vô hiệu (invalidation point) là mức giá mà khi đi tới đó, lý do vào lệnh của bạn không còn đúng. Với lệnh mua pullback, lý do là "đáy cao hơn đang hình thành". Nếu giá thủng đáy đó, cấu trúc HL bị phá, lý do biến mất. Vậy điểm vô hiệu là ngay dưới đáy đó.' },
      { type: 'p', text: 'Dừng lỗ không phải "mức lỗ tôi chịu được". Mức lỗ chịu được quyết định <em>khối lượng</em>. Còn vị trí dừng lỗ do <em>thị trường</em> quyết định. Nhầm hai thứ này là lỗi phổ biến: người ta đặt dừng lỗ gần chỉ vì muốn mua nhiều, rồi bị quét bởi nhiễu thông thường.' },
      { type: 'callout', tone: 'tip', title: 'Thêm vùng đệm', text: 'Các đáy rõ ràng và số tròn là nơi nhiều lệnh dừng lỗ tập trung, giá hay bị quét qua đó rồi quay lại. Đặt dừng lỗ dưới điểm vô hiệu thêm một vùng đệm, ví dụ 0,2–0,5 × ATR, và tránh đúng số tròn như 80.000 hay 3.000.' },

      { type: 'h', text: 'Ba cách đặt dừng lỗ: cấu trúc, phần trăm, ATR' },
      { type: 'p', text: 'ATR (Average True Range, biên độ thực trung bình) do J. Welles Wilder giới thiệu năm 1978, đo biên độ dao động trung bình mỗi nến, mặc định 14 kỳ. True Range là giá trị lớn nhất trong ba số: Cao − Thấp, |Cao − Đóng cửa trước|, |Thấp − Đóng cửa trước|. ATR chỉ đo biến động, <strong>không cho biết hướng</strong>.' },
      { type: 'formula', title: 'ATR (Wilder)', expr: 'ATR hiện tại = [(ATR trước × 13) + TR hiện tại] ÷ 14', vars: [['TR', 'True Range = lớn nhất của (Cao − Thấp), |Cao − Đóng cửa trước|, |Thấp − Đóng cửa trước|'], ['14', 'Số kỳ mặc định']], note: 'ATR là số tuyệt đối theo giá, nên không so sánh trực tiếp giữa BTC và một altcoin giá 0,5 USDT. Muốn so thì dùng ATR% = ATR ÷ Giá.' },
      { type: 'calc', title: 'So sánh 3 cách đặt dừng lỗ cho cùng một lệnh (giả định)', rows: [
        ['Bối cảnh', 'Tài khoản 1.000 USDT, rủi ro 1% = 10 USDT. Mua BTC ở 80.000. Đáy pullback gần nhất 77.600. ATR(14) trên D1 = 2.400.'],
        ['Theo cấu trúc', '77.600 − 0,3 × 2.400 = 76.880; rủi ro 3.120/BTC; khối lượng 10 ÷ 3.120 ≈ 0,003205 BTC ≈ 256,4 USDT'],
        ['Theo % (5%)', '80.000 × 0,95 = 76.000; rủi ro 4.000/BTC; khối lượng 0,0025 BTC = 200 USDT'],
        ['Theo % (2%)', '80.000 × 0,98 = 78.400; rủi ro 1.600/BTC; khối lượng 0,00625 BTC = 500 USDT'],
        ['Theo ATR (2 × ATR)', '80.000 − 2 × 2.400 = 75.200; rủi ro 4.800/BTC; khối lượng ≈ 0,002083 BTC ≈ 166,7 USDT']
      ], result: 'Cả bốn cách đều rủi ro đúng 10 USDT, nhưng khối lượng khác nhau. Dừng lỗ 2% ở 78.400 nằm TRÊN đáy 77.600, tức nằm trong vùng nhiễu: giá có thể chạm dừng lỗ mà cấu trúc tăng vẫn còn nguyên.' },
      { type: 'table', head: ['Cách đặt', 'Ưu điểm', 'Nhược điểm', 'Khi nào dùng'], rows: [
        ['Theo cấu trúc', 'Gắn với lý do vào lệnh; sai là biết ngay', 'Cần đọc biểu đồ; đáy rõ dễ bị quét nếu thiếu vùng đệm', 'Mặc định cho swing pullback và retest'],
        ['Theo % cố định', 'Đơn giản, nhanh', 'Không liên quan đến thị trường; dễ quá gần hoặc quá xa', 'Chỉ làm giới hạn tối đa, ví dụ "không bao giờ quá 8%"'],
        ['Theo ATR', 'Tự điều chỉnh theo biến động; hợp khi không có đáy rõ', 'Có thể không trùng điểm vô hiệu cấu trúc', 'Kiểm tra vùng đệm, trailing stop, thị trường biến động mạnh']
      ] },
      { type: 'p', text: 'Cách làm thực dụng: dùng cấu trúc làm chính, dùng ATR để thêm vùng đệm và kiểm tra dừng lỗ không quá gần (nhỏ hơn khoảng 1 × ATR thường là quá sát trên khung đó), dùng % làm giới hạn trên. Nếu dừng lỗ theo cấu trúc quá xa khiến R:R dưới 1:2, bỏ lệnh chứ không kéo dừng lỗ lại gần.' },
      { type: 'tool', name: 'position-size', note: 'Nhập tài khoản 1.000, rủi ro 1%, giá vào 80.000 và lần lượt 4 mức dừng lỗ ở trên để thấy khối lượng thay đổi.' },

      { type: 'h', text: 'Mục tiêu theo vùng và dừng lỗ kéo theo (trailing stop)' },
      { type: 'p', text: 'Mục tiêu chốt lời nên đặt theo <strong>vùng kháng cự thật</strong> trên biểu đồ: đỉnh cũ, vùng giá từng đảo chiều nhiều lần. Đặt lệnh bán hơi thấp hơn vùng một chút, vì nhiều người cũng bán ở đó và giá có thể không chạm tới mép trên. Sau đó kiểm tra R:R. Nếu vùng kháng cự gần nhất chỉ cho 1R, lệnh đó không đáng vào.' },
      { type: 'p', text: 'Khi lệnh đã lãi, dừng lỗ kéo theo giúp giữ lợi nhuận mà vẫn để lệnh chạy. Có hai cách phổ biến:' },
      { type: 'list', items: [
        '<strong>Kéo theo cấu trúc:</strong> mỗi khi H4 hoặc D1 tạo một đáy cao hơn mới, dời dừng lỗ lên dưới đáy đó. Chậm nhưng bám sát logic xu hướng.',
        '<strong>Chandelier Exit</strong> (Charles Le Beau): dừng lỗ lệnh mua = Đỉnh cao nhất 22 kỳ − 3 × ATR(22). Ví dụ giả định: đỉnh cao nhất 88.000, ATR 2.400 → 88.000 − 7.200 = 80.800.',
        '<strong>Trailing stop của sàn:</strong> Binance spot cho đặt trailing theo % (trailing delta 0,1% đến 20%) và giá kích hoạt. Tiện nhưng % cố định không theo biến động, nên chọn % dựa trên ATR% của tài sản.'
      ] },
      { type: 'callout', tone: 'note', title: 'Dời dừng lỗ lên chỉ theo quy tắc', text: 'Dời dừng lỗ về hòa vốn quá sớm cũng là một lỗi: lệnh bị quét ở giá vào rồi chạy tiếp. Chỉ dời khi quy tắc cho phép, ví dụ sau khi chạm TP1 hoặc sau khi có đáy cao hơn mới trên H4.' },

      { type: 'h', text: 'Quy tắc sắt: không bao giờ dời dừng lỗ ra xa' },
      { type: 'p', text: 'Dừng lỗ chỉ được đi một chiều: về phía có lợi cho bạn. Dời dừng lỗ ra xa khi giá sắp chạm là cách phổ biến nhất biến một lệnh lỗ nhỏ thành một lệnh lỗ lớn.' },
      { type: 'calc', title: 'Chi phí của việc dời dừng lỗ (giả định, tiếp ví dụ trên)', rows: [
        ['Kế hoạch ban đầu', 'Mua 0,003205 BTC ở 80.000, dừng lỗ 76.880, rủi ro ≈ 10 USDT = 1R'],
        ['Giá về 77.000, bạn dời dừng lỗ xuống 72.000', 'Rủi ro mới: 0,003205 × (80.000 − 72.000) ≈ 25,64 USDT'],
        ['Nếu dừng lỗ mới bị chạm', 'Lỗ ≈ 2,56R thay vì 1R']
      ], result: 'Một lần dời dừng lỗ biến lệnh 1R thành 2,56R. Làm vậy vài lần, một chuỗi thua bình thường trở thành mức sụt giảm tài khoản rất khó phục hồi.' },
      { type: 'callout', tone: 'risk', title: 'Dừng lỗ bị chạm là kế hoạch đang chạy đúng', text: 'Lệnh chạm dừng lỗ không có nghĩa bạn làm sai. Nó nghĩa là kịch bản bị vô hiệu và bạn mất đúng số tiền đã chấp nhận. Mất tiền thật sự bắt đầu khi bạn gỡ dừng lỗ, dời ra xa, hoặc mua thêm để bình quân giá.' },
      { type: 'scenario', title: 'Giá chỉ còn cách dừng lỗ 0,5%', setup: 'Lệnh mua BTC ở 80.000, dừng lỗ 76.880. Giá xuống 77.250 lúc 23 giờ.', bad: 'Nghĩ "chỉ là quét thanh khoản thôi", kéo dừng lỗ xuống 72.000, rồi gỡ hẳn. Sáng hôm sau giá 71.000, lỗ gần 3R, quyết định "giữ dài hạn".', good: 'Không đụng vào lệnh. Dừng lỗ khớp ở khoảng 76.850, lỗ ≈ 1R cộng trượt giá nhỏ. Ghi sổ, chờ setup tiếp theo. Nếu giá hồi lại và cấu trúc mới đủ điều kiện, lập kế hoạch lệnh mới từ đầu.' },
      { type: 'checklist', title: 'Kiểm tra trước khi bấm nút', items: [
        'Đã viết đủ 7 mục của kế hoạch',
        'Dừng lỗ đặt ở điểm vô hiệu cộng vùng đệm, không đúng số tròn',
        'R:R tới mục tiêu theo vùng ít nhất 1:2',
        'Khối lượng tính từ số tiền rủi ro, đã kiểm tra bằng công cụ',
        'Sẽ đặt lệnh dừng lỗ trên sàn ngay khi khớp',
        'Chấp nhận mất đúng 1R mà không cần "gỡ"'
      ] }
    ],
    keyPoints: [
      'Kế hoạch một lệnh trả lời: vì sao vào, vào ở đâu, sai ở đâu, chốt ở đâu, bao nhiêu tiền.',
      'Vị trí dừng lỗ do điểm vô hiệu của thị trường quyết định; số tiền chấp nhận mất quyết định khối lượng.',
      'Ưu tiên dừng lỗ theo cấu trúc, dùng ATR làm vùng đệm và kiểm tra, dùng % làm giới hạn trên.',
      'Mục tiêu đặt theo vùng kháng cự thật; R:R dưới 1:2 thì bỏ lệnh.',
      'Trailing stop theo cấu trúc hoặc Chandelier Exit (Đỉnh 22 kỳ − 3 × ATR); dừng lỗ chỉ được dời về phía có lợi.'
    ],
    practice: [
      'Chọn một biểu đồ D1 bất kỳ, viết đủ 7 mục kế hoạch cho một lệnh giả định, kể cả khi bạn không vào lệnh thật.',
      'Tra ATR(14) D1 của BTC hiện tại trên biểu đồ. Tính dừng lỗ theo cấu trúc (có vùng đệm 0,3 × ATR) và theo 2 × ATR, rồi dùng công cụ tính khối lượng với rủi ro 1%.',
      'Viết lên giấy và dán cạnh màn hình: "Dừng lỗ chỉ đi về phía có lợi". Mỗi lần muốn dời ra xa, ghi lại vào sổ lý do và kết quả.'
    ],
    quiz: [
      {
        q: 'Mua ở 3.000, đáy pullback gần nhất 2.880, ATR(14) = 100 (giả định). Dừng lỗ nào hợp lý nhất theo bài?',
        options: ['2.950, vì chỉ muốn lỗ ít', '3.000, hòa vốn ngay từ đầu', '2.700, càng xa càng an toàn', 'Khoảng 2.850, dưới đáy 2.880 thêm vùng đệm 0,3 × ATR'],
        answer: 3,
        explain: 'Điểm vô hiệu là dưới đáy 2.880; vùng đệm 0,3 × 100 = 30 cho khoảng 2.850. 2.950 nằm trên đáy, trong vùng nhiễu. 3.000 là giá vào, không có chỗ cho lệnh thở. 2.700 xa vô lý, làm khối lượng nhỏ và R:R xấu mà không gắn với cấu trúc.'
      },
      {
        q: 'Tài khoản 2.000 USDT, rủi ro 1%, mua ở 80.000, dừng lỗ 76.000 (giả định). Khối lượng là?',
        options: ['0,0025 BTC', '0,005 BTC', '0,01 BTC', '0,025 BTC'],
        answer: 1,
        explain: 'Rủi ro 20 USDT, khoảng cách 4.000, khối lượng = 20 ÷ 4.000 = 0,005 BTC (giá trị 400 USDT). 0,0025 là rủi ro 0,5%; 0,01 là rủi ro 2%; 0,025 là rủi ro 5%.'
      },
      {
        q: 'Đỉnh cao nhất 22 phiên là 3.600, ATR(22) = 90 (giả định). Mức Chandelier Exit cho lệnh mua là?',
        options: ['3.510', '3.420', '3.330', '3.870'],
        answer: 2,
        explain: 'Chandelier Exit lệnh mua = 3.600 − 3 × 90 = 3.330. 3.510 dùng 1 × ATR; 3.420 dùng 2 × ATR; 3.870 là công thức cho lệnh bán (cộng thay vì trừ, và lấy đáy thấp nhất).'
      },
      {
        q: 'Giá sắp chạm dừng lỗ. Hành động nào đúng với kế hoạch?',
        options: ['Để nguyên dừng lỗ; nếu bị chạm thì ghi sổ và chờ setup mới', 'Dời dừng lỗ ra xa hơn để "cho lệnh thở"', 'Gỡ dừng lỗ và mua thêm để hạ giá vốn', 'Đóng lệnh sớm rồi mở lại gấp đôi khối lượng'],
        answer: 0,
        explain: 'Dừng lỗ chỉ được dời về phía có lợi. Dời ra xa hoặc gỡ dừng lỗ làm rủi ro vượt 1R; mua thêm bình quân giá và gấp đôi khối lượng là hành vi gỡ gạc cảm tính.'
      }
    ],
    sources: [
      { title: 'Average True Range (ATR) and Average True Range Percent (ATRP)', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'Chandelier Exit', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit', note: 'StockCharts ChartSchool, tiếng Anh' },
      { title: 'How to Use Spot Trailing Stop Order?', url: 'https://www.binance.com/en/support/faq/how-to-use-spot-trailing-stop-order-339635f6260d43c5aefa4c3c921728ec', note: 'Binance Support, tiếng Anh' },
      { title: 'A Short Lesson on R and R-multiple', url: 'https://vantharp.com/wp-content/uploads/2018/06/A_Short_Lesson_on_R_and_R-multiple.pdf', note: 'Van Tharp Institute, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c4-b4': {
    duration: 8,
    level: 'Trung cấp',
    summary: 'Chia vốn giữa BTC, ETH, altcoin và stablecoin theo khẩu vị rủi ro, hiểu tương quan altcoin, tái cân bằng bằng số, rủi ro stablecoin và vì sao không dùng tiền vay.',
    goals: [
      'Xây một bảng phân bổ vốn có giới hạn rõ cho từng nhóm tài sản',
      'Tái cân bằng danh mục theo lịch hoặc theo ngưỡng, tính được lệnh cần làm',
      'Nhận diện rủi ro của stablecoin và nơi lưu ký, không dùng tiền vay hay tiền sinh hoạt'
    ],
    blocks: [
      { type: 'h', text: 'Bắt đầu từ số tiền được phép mất' },
      { type: 'p', text: 'Trước khi chia BTC bao nhiêu, altcoin bao nhiêu, câu hỏi đầu tiên là: <strong>tổng số tiền đưa vào crypto là bao nhiêu?</strong> Câu trả lời phải là số tiền mà nếu giảm 70–80%, cuộc sống của bạn vẫn bình thường: không trễ tiền nhà, không ảnh hưởng học phí con, không phải vay để bù.' },
      { type: 'list', ordered: true, items: [
        'Có quỹ dự phòng bằng tiền gửi, đủ chi tiêu ít nhất 3–6 tháng, nằm ngoài crypto.',
        'Trả xong các khoản nợ lãi cao (thẻ tín dụng, vay tiêu dùng) trước khi đầu tư.',
        'Chỉ phần tiền nhàn rỗi còn lại mới được cân nhắc cho crypto, và chỉ một phần của nó.'
      ] },
      { type: 'callout', tone: 'risk', title: 'Không dùng tiền vay, không dùng tiền sinh hoạt', text: 'Tiền vay có lãi và có hạn trả. Khi thị trường giảm, bạn bị buộc phải bán ở đáy để trả nợ, đúng lúc tệ nhất. Tiền sinh hoạt cũng vậy: khi cần tiền, bạn không chọn được giá. Crypto từng giảm hơn 70% từ đỉnh trong các chu kỳ trước. Vay để "all-in" là con đường nhanh nhất từ thua lỗ sang nợ nần.' },

      { type: 'h', text: 'Phân bổ theo nhóm tài sản và khẩu vị rủi ro' },
      { type: 'p', text: 'Chia danh mục crypto thành các nhóm theo mức rủi ro. Nhóm càng nhỏ, thanh khoản càng mỏng, biến động càng mạnh và xác suất về gần 0 càng cao. Tỷ trọng tối đa cho mỗi nhóm nên giảm dần theo mức rủi ro.' },
      { type: 'table', head: ['Nhóm', 'Thận trọng', 'Cân bằng', 'Chấp nhận rủi ro cao'], rows: [
        ['BTC', '50%', '45%', '35%'],
        ['ETH', '15%', '20%', '20%'],
        ['Altcoin vốn hóa lớn (top 20)', '0–5%', '10%', '20%'],
        ['Altcoin nhỏ, token mới', '0%', '0–5%', 'Tối đa 10%'],
        ['Stablecoin (tiền mặt chờ cơ hội)', '30–35%', '20–25%', '15%'],
        ['Tỷ trọng tối đa một altcoin', '2%', '3%', '5%']
      ] },
      { type: 'callout', tone: 'warn', title: 'Chỉ là minh họa, không phải khuyến nghị', text: 'Bảng trên chỉ minh họa cách tư duy theo nhóm và giới hạn. Nó không phải lời khuyên đầu tư, không phù hợp với mọi người, và không nói gì về việc tài sản nào sẽ tăng. Bạn tự quyết định dựa trên tài chính, kỳ hạn và khả năng chịu lỗ của mình.' },
      { type: 'p', text: '<strong>Stablecoin là một vị thế, không phải "tiền để không".</strong> Giữ 20–30% ở stablecoin cho bạn ba thứ: giảm biến động của cả danh mục, có sẵn vốn khi setup tốt xuất hiện (bài 4.2), và không phải bán tài sản khác ở giá xấu. Người luôn 100% coin thường không còn tiền đúng lúc thị trường giảm sâu, rồi bán tháo vì không chịu nổi.' },

      { type: 'h', text: 'Tương quan: 10 altcoin không phải là đa dạng hóa' },
      { type: 'p', text: 'Tương quan (correlation) đo mức các tài sản cùng lên cùng xuống. Phần lớn altcoin có tương quan cao với BTC và với nhau, nhất là khi thị trường giảm mạnh: lúc đó gần như mọi thứ cùng rơi, và altcoin thường rơi sâu hơn BTC. Mua 10 altcoin khác nhau thường chỉ là mua 10 lần cùng một rủi ro.' },
      { type: 'example', title: 'Hai danh mục cùng 1.000 USDT (giả định)', text: 'Danh mục A: 10 altcoin, mỗi đồng 100 USDT. Danh mục B: 45% BTC, 20% ETH, 10% chia cho 3 altcoin, 25% stablecoin. Giả sử một đợt giảm chung, BTC −30%, ETH −40%, altcoin trung bình −60%. A còn khoảng 400 USDT. B còn 450 × 0,7 + 200 × 0,6 + 100 × 0,4 + 250 = 315 + 120 + 40 + 250 = 725 USDT, và vẫn còn 250 USDT stablecoin để hành động theo kế hoạch.' },
      { type: 'list', items: [
        'Đếm rủi ro theo nhóm, không đếm theo số lượng coin.',
        'Các altcoin cùng "câu chuyện" (cùng hệ sinh thái, cùng lĩnh vực) được tính như một vị thế.',
        'Lệnh swing đang mở cũng là một phần danh mục: tổng rủi ro các lệnh mở không nên vượt khoảng 3–5% tài khoản (bài 6.1 học sâu).'
      ] },

      { type: 'h', text: 'Tái cân bằng danh mục' },
      { type: 'p', text: 'Theo thời gian, tài sản tăng mạnh sẽ chiếm tỷ trọng lớn hơn kế hoạch, làm rủi ro danh mục trôi đi mà bạn không để ý. Vanguard minh họa: một danh mục 60% cổ phiếu, 40% trái phiếu không tái cân bằng từ 2003 đến 2022 sẽ trôi lên khoảng 80% cổ phiếu. Tái cân bằng (rebalancing) là bán bớt phần vượt, mua bù phần thiếu để quay về tỷ trọng mục tiêu.' },
      { type: 'list', items: [
        '<strong>Theo lịch:</strong> kiểm tra và tái cân bằng định kỳ, ví dụ mỗi quý.',
        '<strong>Theo ngưỡng:</strong> chỉ tái cân bằng khi một nhóm lệch khỏi mục tiêu quá mức định sẵn, ví dụ ±5 điểm phần trăm.',
        '<strong>Kết hợp:</strong> kiểm tra theo lịch, nhưng chỉ làm khi vượt ngưỡng. Vanguard nhận thấy tái cân bằng quá dày thì tốn phí, quá thưa thì rủi ro trôi xa.'
      ] },
      { type: 'calc', title: 'Tái cân bằng sau một quý (giả định)', rows: [
        ['Mục tiêu', 'BTC 50%, ETH 20%, altcoin 10%, stablecoin 20% trên 1.000 USDT'],
        ['Ban đầu', 'BTC 500; ETH 200; altcoin 100; stablecoin 200'],
        ['Biến động trong quý', 'BTC +40%, ETH +20%, altcoin −30%, stablecoin 0%'],
        ['Giá trị mới', 'BTC 700; ETH 240; altcoin 70; stablecoin 200; tổng 1.210'],
        ['Tỷ trọng mới', 'BTC 57,9%; ETH 19,8%; altcoin 5,8%; stablecoin 16,5%'],
        ['Mục tiêu trên 1.210', 'BTC 605; ETH 242; altcoin 121; stablecoin 242'],
        ['Lệnh cần làm', 'Bán 95 USDT BTC; mua 51 USDT altcoin; chuyển 42 vào stablecoin; ETH lệch 2 USDT, bỏ qua'],
        ['Kiểm tra', '51 + 42 + 2 = 95; tổng vẫn 1.210']
      ], result: 'Với ngưỡng ±5 điểm, chỉ BTC (lệch +7,9 điểm) buộc phải điều chỉnh. Bạn có thể bán 95 USDT BTC và đưa hết vào stablecoin, còn altcoin (lệch −4,2 điểm) chỉ mua bù nếu luận điểm của nó còn nguyên.' },
      { type: 'callout', tone: 'warn', title: 'Tái cân bằng không phải bình quân giá vô điều kiện', text: 'Mua bù một altcoin vừa giảm 30% chỉ hợp lý khi lý do nắm giữ nó vẫn đúng. Nếu dự án đã hỏng (xem bài 3.1), hãy loại nó khỏi danh mục thay vì mua thêm. Mỗi lần bán cũng phát sinh phí và, khi giao dịch qua tổ chức được cấp phép tại Việt Nam, thuế TNCN 0,1% trên giá chuyển nhượng theo Thông tư 32/2026/TT-BTC.' },
      { type: 'scenario', title: 'BTC tăng mạnh, chiếm 65% danh mục', setup: 'Kế hoạch BTC 50%. Sau một sóng tăng, BTC chiếm 65%, mạng xã hội bàn chuyện đỉnh mới.', bad: 'Chuyển nốt stablecoin vào BTC vì "đang lên", danh mục thành 85% BTC. Một đợt điều chỉnh 25% làm cả danh mục giảm hơn 20%, không còn tiền mặt để hành động.', good: 'Tới ngày kiểm tra, thấy lệch +15 điểm, vượt ngưỡng 5 điểm. Bán phần vượt về 50%, đưa vào stablecoin. Không đoán đỉnh, chỉ làm theo quy tắc đã viết.' },

      { type: 'h', text: 'Rủi ro của stablecoin và nơi lưu ký' },
      { type: 'p', text: 'Stablecoin được thiết kế để giữ giá 1 USD, nhưng "ổn định" không có nghĩa là "không rủi ro". Có ba rủi ro chính:' },
      { type: 'list', items: [
        '<strong>Mất neo (depeg) vì thiết kế:</strong> UST của Terra là stablecoin thuật toán, không có tài sản dự trữ đầy đủ. Theo Fed Richmond, lúc đỉnh UST có khoảng 18 tỷ USD lưu hành; tháng 5/2022 UST mất neo từ ngày 7–8, xuống 0,60 USD ngày 9 và 0,22 USD ngày 12/5 (giá trên Binance), còn nguồn cung LUNA bị in thêm khoảng 80 lần, từ 0,4 tỷ lên 32 tỷ token chỉ trong 10–12/5.',
        '<strong>Rủi ro tài sản dự trữ và tổ chức phát hành:</strong> ngay cả stablecoin có dự trữ bằng tiền mặt cũng có thể mất neo tạm thời. Theo Chainalysis, rạng sáng 11/3/2023, USDC xuống khoảng 0,87 USD sau khi Circle cho biết có 3,3 tỷ USD, khoảng 8% dự trữ, gửi tại ngân hàng Silicon Valley Bank vừa sụp đổ.',
        '<strong>Rủi ro nơi lưu ký:</strong> stablecoin để trên sàn phụ thuộc vào sàn đó còn khả năng chi trả. FTX sụp đổ tháng 11/2022 cho thấy tài sản trên sàn có thể bị đóng băng bất kể đó là coin gì.'
      ] },
      { type: 'callout', tone: 'risk', title: 'Đừng dồn "tiền mặt" vào một chỗ', text: 'Không giữ toàn bộ phần stablecoin ở một loại stablecoin duy nhất hay một sàn duy nhất. Tránh stablecoin thuật toán hoặc stablecoin trả "lãi" cao bất thường; theo Fed Richmond, nền tảng Anchor từng hứa lãi 19,5%/năm cho người gửi UST, và đó chính là mồi thu hút tiền vào trước khi sụp. Phần tiền dự phòng cho cuộc sống nên giữ bằng tiền đồng trong ngân hàng, không phải stablecoin.' },
      { type: 'callout', tone: 'note', title: 'Pháp lý Việt Nam', text: 'Nghị quyết 05/2025/NQ-CP yêu cầu giao dịch tài sản mã hóa trong khuôn khổ thí điểm bằng Đồng Việt Nam qua tổ chức được cấp phép. Nghị định 284/2026/NĐ-CP quy định mức phạt với giao dịch không qua tổ chức được cấp phép, áp dụng sau 6 tháng kể từ khi tổ chức đầu tiên được cấp phép. Khi lập kế hoạch lưu ký dài hạn, hãy kiểm tra quy định mới nhất (bài 1.6).' },
      { type: 'checklist', title: 'Kiểm tra danh mục mỗi quý', items: [
        'Tổng tiền trong crypto vẫn là tiền được phép mất, không có tiền vay',
        'Quỹ dự phòng 3–6 tháng vẫn còn nguyên, ngoài crypto',
        'Không nhóm nào lệch quá ngưỡng tái cân bằng',
        'Không altcoin nào vượt tỷ trọng tối đa cho một đồng',
        'Stablecoin chia ít nhất 2 loại hoặc 2 nơi lưu ký',
        'Tổng rủi ro các lệnh swing đang mở không vượt giới hạn'
      ] }
    ],
    keyPoints: [
      'Chỉ đưa vào crypto số tiền giảm 70–80% vẫn sống bình thường; tuyệt đối không dùng tiền vay hay tiền sinh hoạt.',
      'Phân bổ theo nhóm rủi ro với tỷ trọng tối đa rõ ràng; bảng mẫu chỉ là minh họa, không phải khuyến nghị.',
      'Altcoin tương quan cao với BTC và với nhau, nhiều altcoin không phải là đa dạng hóa.',
      'Tái cân bằng theo lịch, theo ngưỡng, hoặc kết hợp để giữ rủi ro danh mục đúng kế hoạch.',
      'Stablecoin là một vị thế có rủi ro: mất neo (UST 5/2022, USDC 3/2023) và rủi ro nơi lưu ký (FTX 11/2022).'
    ],
    practice: [
      'Viết tỷ trọng mục tiêu cho danh mục của bạn theo 5 nhóm và tỷ trọng tối đa cho một altcoin.',
      'Liệt kê danh mục hiện tại (hoặc giả định), tính tỷ trọng từng nhóm và các lệnh cần làm để tái cân bằng với ngưỡng ±5 điểm.',
      'Kiểm tra phần stablecoin: bạn đang giữ loại nào, ở đâu, cơ chế dự trữ của nó ra sao. Ghi lại một phương án nếu nó mất neo.'
    ],
    quiz: [
      {
        q: 'Danh mục mục tiêu BTC 50%, stablecoin 50%, tổng 2.000 USDT. BTC tăng 50%, stablecoin giữ nguyên (giả định). Để về đúng mục tiêu, bạn cần làm gì?',
        options: ['Bán 250 USDT BTC, chuyển vào stablecoin', 'Mua thêm 500 USDT BTC', 'Bán 500 USDT BTC', 'Không làm gì vì BTC đang tăng'],
        answer: 0,
        explain: 'BTC từ 1.000 lên 1.500, tổng 2.500, mục tiêu mỗi phần 1.250. Bán 250 USDT BTC sang stablecoin. Mua thêm làm lệch nặng hơn; bán 500 là quá tay; không làm gì để rủi ro trôi lên 60%.'
      },
      {
        q: 'Vì sao mua 10 altcoin khác nhau thường KHÔNG giúp đa dạng hóa nhiều?',
        options: ['Vì altcoin không được niêm yết trên sàn lớn', 'Vì phí mua 10 đồng quá cao', 'Vì phần lớn altcoin tương quan cao với BTC và với nhau, nhất là khi thị trường giảm mạnh', 'Vì altcoin luôn giảm về 0'],
        answer: 2,
        explain: 'Vấn đề là tương quan: khi thị trường giảm, các altcoin thường cùng rơi. Phí có thể đáng kể nhưng không phải lý do chính. Nhiều altcoin có niêm yết ở sàn lớn, và không phải mọi altcoin đều về 0.'
      },
      {
        q: 'Sự kiện UST tháng 5/2022 cho thấy điều gì?',
        options: ['Mọi stablecoin đều an toàn vì neo 1 USD', 'Stablecoin thuật toán có thể mất neo và mất gần hết giá trị trong vài ngày', 'Chỉ stablecoin trên sàn nhỏ mới có rủi ro', 'Mất neo luôn chỉ là tạm thời'],
        answer: 1,
        explain: 'UST từ khoảng 1 USD xuống 0,22 USD chỉ trong khoảng 5 ngày và không hồi lại. Neo 1 USD không phải bảo đảm; rủi ro không chỉ ở sàn nhỏ; USDC 3/2023 hồi lại nhưng UST thì không.'
      },
      {
        q: 'Người nào sau đây đang vi phạm nguyên tắc của bài?',
        options: ['Giữ quỹ dự phòng 6 tháng bằng tiền gửi ngân hàng', 'Giữ 25% danh mục ở stablecoin, chia 2 loại', 'Tái cân bằng mỗi quý khi lệch quá 5 điểm', 'Vay tín chấp 100 triệu để mua altcoin vì "chu kỳ sắp tăng"'],
        answer: 3,
        explain: 'Vay tiền để mua altcoin vi phạm nguyên tắc chỉ dùng tiền nhàn rỗi, và buộc bạn phải bán ở đáy khi đến hạn trả nợ. Ba lựa chọn còn lại đều là thực hành đúng.'
      }
    ],
    sources: [
      { title: 'Why, how and when multi-asset investors should rebalance', url: 'https://www.nl.vanguard/professional/vanguard-365/when-multi-asset-investors-should-rebalance', note: 'Vanguard, tiếng Anh' },
      { title: 'Why Stablecoins Fail: An Economist’s Post-Mortem on Terra', url: 'https://www.richmondfed.org/publications/research/economic_brief/2022/eb_22-24', note: 'Federal Reserve Bank of Richmond, 2022, tiếng Anh' },
      { title: 'Crypto Market Reaction to Silicon Valley Bank and USDC Depeg', url: 'https://www.chainalysis.com/blog/crypto-market-usdc-silicon-valley-bank/', note: 'Chainalysis, 2023, tiếng Anh' },
      { title: 'Toàn văn Nghị quyết 05/2025/NQ-CP', url: 'https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-5-2025-nq-cp-ve-trien-khai-thi-diem-thi-truong-tai-san-ma-hoa-tai-viet-nam-119250909184045221.htm', note: 'Cổng thông tin Chính phủ, 2025, tiếng Việt' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
