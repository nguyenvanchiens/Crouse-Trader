const lessons = {
  'c1-b1': {
    duration: 8,
    level: 'Cơ bản',
    summary: 'Số liệu thật về tỷ lệ thua lỗ của trader nhỏ lẻ, cơ chế khiến đa số mất tiền, và vì sao khóa học chọn quy trình thay cho dự đoán.',
    goals: [
      'Nắm được các thống kê đáng tin cậy về tỷ lệ thua lỗ của nhà giao dịch nhỏ lẻ',
      'Giải thích được bốn cơ chế chính khiến đa số thua: phí, đòn bẩy, thiếu lợi thế, cảm xúc',
      'Phân biệt rõ đầu tư, giao dịch và đánh bạc bằng tiêu chí cụ thể',
      'Hiểu cam kết của khóa học: không có kèo, chỉ có quy trình và quản trị rủi ro'
    ],
    blocks: [
      { type: 'p', text: 'Trước khi học cách đặt lệnh, bạn cần biết mình đang bước vào một cuộc chơi như thế nào. Bài này không nhằm dọa bạn. Nó giúp bạn nhìn thẳng vào dữ liệu, để mỗi quyết định sau này dựa trên thực tế chứ không dựa trên ảnh chụp lợi nhuận trên mạng xã hội.' },

      { type: 'h', text: 'Dữ liệu nói gì về trader nhỏ lẻ' },
      { type: 'p', text: 'Các con số dưới đây đến từ cơ quan quản lý và nghiên cứu học thuật, không phải từ quảng cáo. Chúng đo trên những thị trường khác nhau, thời kỳ khác nhau, nhưng cùng chỉ về một hướng.' },
      { type: 'table', head: ['Nguồn', 'Thị trường, thời gian', 'Kết quả chính'], rows: [
        ['ESMA (Cơ quan Chứng khoán và Thị trường châu Âu), 2018', 'CFD (hợp đồng chênh lệch) của nhà đầu tư nhỏ lẻ ở EU', '<strong>74–89%</strong> tài khoản thường thua lỗ; lỗ trung bình mỗi khách từ 1.600 đến 29.000 euro'],
        ['Chague, De-Losso, Giovannetti, 2019', 'Day trade hợp đồng tương lai chỉ số chứng khoán Brazil, 2013–2015', '<strong>97%</strong> người kiên trì hơn 300 ngày bị lỗ; chỉ khoảng 1% kiếm hơn mức lương tối thiểu'],
        ['Barber, Lee, Liu, Odean, 2014', 'Day trader Đài Loan, 1992–2006', '<strong>Dưới 1%</strong> kiếm được lợi nhuận vượt trội ổn định, dự đoán được, sau phí'],
        ['BIS Bulletin số 69, 2/2023', 'Người dùng ứng dụng giao dịch crypto, 8/2015–12/2022', 'Phần lớn người dùng ở gần như mọi nền kinh tế <strong>bị lỗ</strong> với bitcoin nắm giữ; người mới thường vào khi giá đang tăng']
      ] },
      { type: 'p', text: 'Nghiên cứu Brazil đáng chú ý nhất vì nó theo dõi <em>toàn bộ</em> những người bắt đầu day trade, không chỉ một mẫu nhỏ. Người càng kiên trì lâu không có nghĩa là càng giỏi lên. Ở Đài Loan, với dữ liệu hơn 14 năm, số người thắng ổn định sau phí còn chưa tới 1 trên 100.' },
      { type: 'p', text: 'Nghiên cứu của BIS (Ngân hàng Thanh toán Quốc tế) chạm đúng thị trường bạn sắp tham gia. Người mới thường tải ứng dụng khi bitcoin đang lên và báo chí đang nói nhiều về nó. Mua lúc đám đông hào hứng nhất rồi hoảng sợ khi giá giảm là con đường thua lỗ phổ biến nhất.' },
      { type: 'callout', tone: 'warn', title: 'Đừng đọc sai con số', text: 'Các thống kê này không nói rằng không ai kiếm được tiền. Chúng nói rằng <strong>mặc định là thua</strong>. Nếu bạn làm giống số đông, kết quả kỳ vọng của bạn giống số đông. Muốn khác, bạn phải làm khác một cách có hệ thống.' },

      { type: 'h', text: 'Bốn cơ chế khiến đa số thua' },
      { type: 'p', text: 'Thua lỗ hiếm khi do xui. Nó đến từ vài cơ chế lặp đi lặp lại. Hiểu cơ chế thì bạn mới chặn được nó.' },
      { type: 'list', ordered: true, items: [
        '<strong>Phí và chi phí ẩn.</strong> Mỗi lần mua và bán bạn trả phí giao dịch, thêm chênh lệch giá mua bán (spread) và trượt giá (slippage). Lệnh càng nhiều, phí cộng dồn càng lớn. Phí là khoản lỗ chắc chắn, còn lợi nhuận thì không chắc.',
        '<strong>Đòn bẩy (leverage).</strong> Đòn bẩy phóng to cả lãi lẫn lỗ. Chỉ một biến động nhỏ ngược chiều cũng có thể xóa sạch ký quỹ. Ngày 10/10/2025, khoảng 19 tỷ USD vị thế đòn bẩy bị thanh lý trong 24 giờ, hơn 1,6 triệu tài khoản bị ảnh hưởng.',
        '<strong>Không có lợi thế (edge).</strong> Lợi thế là một cách vào lệnh mà qua nhiều lệnh cho kết quả trung bình dương sau phí. Phần lớn người mới giao dịch theo tin đồn, theo cảm giác "sắp tăng", hoặc theo nhóm kèo. Những thứ đó không phải lợi thế.',
        '<strong>Cảm xúc.</strong> Nghiên cứu về lý thuyết triển vọng (prospect theory) của Kahneman và Tversky (1979) cho thấy con người cảm thấy nỗi đau mất mát mạnh hơn niềm vui với khoản lãi tương đương. Hệ quả trong giao dịch: chốt lời quá sớm, gồng lỗ quá lâu, và "gỡ" bằng cách vào lệnh to hơn.'
      ] },
      { type: 'calc', title: 'Phí ăn tài khoản như thế nào (giả định)', rows: [
        ['Tài khoản', '1.000 USDT'],
        ['Mỗi vòng mua rồi bán', 'Giá trị lệnh 1.000 USDT, phí 0,1% mỗi chiều (giả định)'],
        ['Phí một vòng', '1.000 × 0,1% × 2 = 2 USDT'],
        ['Số vòng mỗi tháng', '5 vòng/ngày × 20 ngày = 100 vòng'],
        ['Tổng phí một tháng', '100 × 2 = 200 USDT']
      ], result: 'Chỉ riêng phí đã bằng 20% tài khoản mỗi tháng. Bạn phải lãi hơn 20% trước phí mới hòa vốn, chưa tính spread và trượt giá.' },
      { type: 'figure', name: 'emotion-cycle', caption: 'Vòng cảm xúc theo giá: hào hứng và tham lam gần đỉnh, sợ hãi và đầu hàng gần đáy. Người mua theo cảm xúc thường mua cao, bán thấp.' },

      { type: 'h', text: 'Đầu tư, giao dịch và đánh bạc khác nhau ở đâu' },
      { type: 'p', text: 'Ba hoạt động này có thể dùng cùng một ứng dụng, cùng một đồng coin. Khác biệt nằm ở cách bạn ra quyết định và kiểm soát rủi ro, không nằm ở tài sản.' },
      { type: 'table', head: ['Tiêu chí', 'Đầu tư', 'Giao dịch có kỷ luật', 'Đánh bạc'], rows: [
        ['Khung thời gian', 'Nhiều tháng đến nhiều năm', 'Vài giờ đến vài tuần', 'Bất kỳ, thường rất ngắn'],
        ['Lý do vào lệnh', 'Giá trị, luận điểm dài hạn', 'Quy tắc viết sẵn, kiểm chứng được', 'Cảm giác, tin đồn, "kèo"'],
        ['Kiểm soát rủi ro', 'Phân bổ vốn, không dùng tiền cần tiêu', 'Dừng lỗ đặt trước, rủi ro cố định mỗi lệnh', 'Không có, hoặc dời dừng lỗ khi bị chạm'],
        ['Ghi chép', 'Theo dõi danh mục', 'Nhật ký mọi lệnh, thống kê kết quả', 'Chỉ nhớ lệnh thắng'],
        ['Khi thua', 'Xem lại luận điểm', 'Chấp nhận, lỗ đúng mức đã tính', 'Gỡ bằng lệnh to hơn']
      ] },
      { type: 'analogy', text: 'Giao dịch có kỷ luật giống một cửa hàng nhỏ: có giá vốn, có chi phí, có sổ sách, biết món nào lời món nào lỗ. Đánh bạc giống việc mỗi sáng mở cửa hàng rồi đoán hôm nay nên bán gì, không ghi sổ, lỗ thì nhập thêm hàng cho "gỡ".' },
      { type: 'callout', tone: 'risk', title: 'Dấu hiệu bạn đang đánh bạc', text: 'Bạn vào lệnh mà không biết trước sẽ thoát ở đâu nếu sai. Bạn tăng khối lượng sau một lệnh thua. Bạn dùng tiền đi vay hoặc tiền sinh hoạt. Chỉ cần một dấu hiệu, hãy dừng giao dịch tiền thật và quay lại học trên tài khoản thử.' },

      { type: 'h', text: 'Rủi ro mỗi lệnh quyết định bạn sống được bao lâu' },
      { type: 'p', text: 'Không ai thắng mọi lệnh. Kể cả một phương pháp tốt cũng có chuỗi thua liên tiếp. Điều quyết định bạn còn ở lại thị trường hay không là số tiền bạn chấp nhận mất trong <em>mỗi</em> lệnh.' },
      { type: 'calc', title: 'Sau 10 lệnh thua liên tiếp (giả định tài khoản 1.000 USDT)', rows: [
        ['Rủi ro 1% mỗi lệnh', '1.000 × 0,99<sup>10</sup> ≈ 904,38 USDT (mất khoảng 9,6%)'],
        ['Rủi ro 5% mỗi lệnh', '1.000 × 0,95<sup>10</sup> ≈ 598,74 USDT (mất khoảng 40,1%)'],
        ['Rủi ro 20% mỗi lệnh', '1.000 × 0,80<sup>10</sup> ≈ 107,37 USDT (mất khoảng 89,3%)']
      ], result: 'Cùng một chuỗi thua, người rủi ro 1% vẫn còn hơn 90% vốn để tiếp tục. Người rủi ro 20% gần như mất trắng.' },
      { type: 'figure', name: 'equity-curves', caption: 'Cùng một chuỗi lệnh thắng thua, đường vốn khác hẳn nhau khi rủi ro 1%, 5% hay 20% mỗi lệnh.' },
      { type: 'scenario', title: 'Sau ba lệnh thua liên tiếp', setup: 'Hai người cùng có 1.000 USDT, cùng thua ba lệnh liền trong một buổi tối khi thị trường giật mạnh.',
        bad: 'Anh A thấy tài khoản còn 700 USDT, bực bội và muốn gỡ ngay. Anh mở lệnh thứ tư với toàn bộ số tiền còn lại, không đặt dừng lỗ vì "lần này chắc chắn". Giá tiếp tục đi ngược, tài khoản còn 400 USDT sau một đêm.',
        good: 'Chị B rủi ro 1% mỗi lệnh, ba lệnh thua mất khoảng 30 USDT. Chị có quy tắc: thua ba lệnh trong ngày thì dừng. Chị ghi nhật ký, tắt ứng dụng, hôm sau xem lại xem ba lệnh có đúng quy tắc không. Tài khoản còn khoảng 970 USDT.' },

      { type: 'h', text: 'Lời hứa của khóa học này' },
      { type: 'p', text: 'Khóa học không bán kèo, không hứa lợi nhuận, không khuyên bạn mua đồng coin nào. Không ai dự đoán đúng thị trường mọi lúc, kể cả người dạy bạn. Thứ chúng ta xây dựng là một quy trình mà khi bạn sai, bạn sai nhỏ; khi bạn đúng, bạn giữ được phần thưởng.' },
      { type: 'steps', items: [
        { title: 'Hiểu thị trường và công cụ', text: 'Sàn, sổ lệnh, loại lệnh, phí, bảo mật, pháp lý (chương 1).' },
        { title: 'Đọc biểu đồ có quy tắc', text: 'Nến, xu hướng, vùng giá, khối lượng, chỉ báo; mỗi thứ có điều kiện dùng rõ ràng.' },
        { title: 'Quản trị rủi ro trước khi tìm điểm vào', text: 'Rủi ro cố định mỗi lệnh, khối lượng tính từ dừng lỗ, giới hạn lỗ ngày và tuần.' },
        { title: 'Kế hoạch lệnh viết sẵn', text: 'Điểm vào, dừng lỗ, chốt lời, lý do; không có kế hoạch thì không vào lệnh.' },
        { title: 'Nhật ký và thống kê', text: 'Đo tỷ lệ thắng, R trung bình, kỳ vọng; chỉ tăng vốn khi dữ liệu cho thấy lợi thế.' }
      ] },
      { type: 'callout', tone: 'tip', title: 'Bắt đầu bằng tài khoản thử', text: 'Mọi kỹ năng trong khóa này nên được luyện trên chế độ giao dịch thử (demo) hoặc với số tiền rất nhỏ bạn chấp nhận mất hết. Futures (hợp đồng tương lai) chỉ nên chạm vào sau khi đã luyện trên Demo Trading.' },
      { type: 'callout', tone: 'note', title: 'Bối cảnh Việt Nam', text: 'Khung pháp lý cho tài sản mã hóa ở Việt Nam đang thay đổi nhanh trong năm 2025–2026. Xem bài 1.6 trước khi nạp tiền thật lên bất kỳ sàn nào.' }
    ],
    keyPoints: [
      'ESMA: 74–89% tài khoản CFD nhỏ lẻ thua; Brazil: 97% day trader kiên trì hơn 300 ngày lỗ; Đài Loan: dưới 1% thắng ổn định sau phí; BIS: phần lớn người dùng ứng dụng crypto lỗ.',
      'Bốn cơ chế thua: phí cộng dồn, đòn bẩy, không có lợi thế, quyết định theo cảm xúc.',
      'Đầu tư, giao dịch, đánh bạc khác nhau ở quy tắc ra quyết định và kiểm soát rủi ro, không ở tài sản.',
      'Rủi ro nhỏ và cố định mỗi lệnh (ví dụ 1%) giúp bạn sống sót qua chuỗi thua không tránh khỏi.',
      'Khóa học dạy quy trình và quản trị rủi ro, không dạy dự đoán, không gọi kèo.'
    ],
    practice: [
      'Viết ra ba lệnh gần nhất bạn từng vào (nếu có): lý do vào, dừng lỗ ở đâu, thua hay thắng bao nhiêu. Đánh dấu lệnh nào là đánh bạc theo bảng trong bài.',
      'Tính tổng phí bạn sẽ trả trong một tháng nếu giao dịch theo thói quen hiện tại (số lệnh × giá trị × phí × 2).',
      'Viết một câu cam kết: "Mỗi lệnh tôi chỉ chấp nhận mất tối đa ...% tài khoản" và dán cạnh màn hình.',
      'Mở tài khoản giao dịch thử (demo) trên sàn bạn định dùng, chưa cần đặt lệnh.'
    ],
    quiz: [
      { q: 'Theo nghiên cứu về day trader hợp đồng tương lai ở Brazil (2013–2015), điều nào đúng?', options: ['Khoảng một nửa người kiên trì có lãi', '97% người kiên trì hơn 300 ngày bị lỗ', 'Người giao dịch lâu hơn thì thắng nhiều hơn rõ rệt', 'Chỉ người dùng đòn bẩy mới lỗ'], answer: 1, explain: 'Nghiên cứu của Chague và cộng sự cho thấy 97% người kiên trì hơn 300 ngày bị lỗ, chỉ khoảng 1% kiếm hơn lương tối thiểu. Không có bằng chứng "kiên trì là thắng", cũng không phải chỉ người dùng đòn bẩy mới lỗ; một nửa có lãi là sai hoàn toàn với dữ liệu.' },
      { q: 'Tài khoản 1.000 USDT, mỗi tháng 100 vòng mua bán, mỗi vòng giá trị 1.000 USDT, phí 0,1% mỗi chiều. Tổng phí một tháng là bao nhiêu?', options: ['100 USDT', '10 USDT', '1.000 USDT', '200 USDT'], answer: 3, explain: 'Mỗi vòng có 2 chiều: 1.000 × 0,1% × 2 = 2 USDT. 100 vòng là 200 USDT. 100 USDT là quên nhân 2 chiều; 10 USDT sai hàng chục lần; 1.000 USDT là nhầm phí thành 1%.' },
      { q: 'Hai trader cùng thua 10 lệnh liên tiếp từ 1.000 USDT. Người A rủi ro 1% mỗi lệnh, người B 20% mỗi lệnh. Kết quả gần đúng?', options: ['A còn khoảng 904 USDT, B còn khoảng 107 USDT', 'A còn 900 USDT, B còn 0 USDT', 'A còn 990 USDT, B còn 800 USDT', 'Cả hai còn như nhau vì cùng số lệnh'], answer: 0, explain: '1.000 × 0,99^10 ≈ 904,38 và 1.000 × 0,8^10 ≈ 107,37. B không về 0 vì mỗi lần mất 20% của số còn lại, không phải 20% vốn ban đầu. 990/800 là số sau 1 lệnh, không phải 10 lệnh. Kết quả rõ ràng khác nhau vì mức rủi ro khác nhau.' },
      { q: 'Hành vi nào cho thấy một người đang đánh bạc chứ không phải giao dịch có kỷ luật?', options: ['Đặt dừng lỗ trước khi vào lệnh', 'Ghi nhật ký cả lệnh thắng và thua', 'Tăng gấp đôi khối lượng ngay sau một lệnh thua để gỡ', 'Dừng giao dịch sau khi chạm giới hạn lỗ ngày'], answer: 2, explain: 'Tăng khối lượng để gỡ là dấu hiệu điển hình của đánh bạc, do cảm xúc né tránh mất mát chi phối. Ba lựa chọn còn lại đều là thói quen của giao dịch có kỷ luật: xác định rủi ro trước, ghi chép trung thực, tôn trọng giới hạn lỗ.' }
    ],
    sources: [
      { title: 'ESMA agrees to prohibit binary options and restrict CFDs to protect retail investors', url: 'https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors', note: 'ESMA, 2018, tiếng Anh' },
      { title: 'Day Trading for a Living?', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3423101', note: 'Chague, De-Losso, Giovannetti, SSRN 2019, tiếng Anh' },
      { title: 'The Cross-Section of Speculator Skill: Evidence from Day Trading', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=529063', note: 'Barber, Lee, Liu, Odean, Journal of Financial Markets 2014, tiếng Anh' },
      { title: 'BIS Bulletin No 69: Crypto shocks and retail losses', url: 'https://www.bis.org/publ/bisbull69.pdf', note: 'Ngân hàng Thanh toán Quốc tế, 2/2023, tiếng Anh' },
      { title: 'October 10 crypto crash explained', url: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained', note: 'CoinGecko, 2025, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c1-b2': {
    duration: 8,
    level: 'Cơ bản',
    summary: 'Bitcoin, Ethereum, altcoin, stablecoin ở mức trader cần biết; giá hình thành thế nào; vốn hóa, FDV, thanh khoản và vì sao crypto biến động mạnh.',
    goals: [
      'Phân biệt được Bitcoin, Ethereum, altcoin và stablecoin theo góc nhìn rủi ro của trader',
      'Hiểu giá là nơi người mua và người bán gặp nhau, không phải con số ai đó quyết định',
      'Tự tính vốn hóa, FDV và nhận ra rủi ro mở khóa token',
      'Giải thích được bốn lý do khiến crypto biến động mạnh hơn cổ phiếu'
    ],
    blocks: [
      { type: 'p', text: 'Bạn không cần hiểu mật mã học để giao dịch. Nhưng bạn cần biết mình đang mua cái gì, ai đang bán cho bạn, và vì sao giá có thể đi 10% trong một buổi tối. Bài này dừng ở mức đủ dùng.' },

      { type: 'h', text: 'Blockchain, Bitcoin và Ethereum ở mức đủ dùng' },
      { type: 'p', text: '<strong>Blockchain</strong> là một cuốn sổ cái chung. Mọi giao dịch được ghi thành từng khối, nối tiếp nhau, và được nhiều máy tính trên thế giới cùng lưu giữ. Không ai sửa được một mình. Điều này khác với tài khoản ngân hàng, nơi chỉ ngân hàng giữ sổ.' },
      { type: 'p', text: '<strong>Bitcoin (BTC)</strong> là tài sản mã hóa đầu tiên. Cung tối đa 21 triệu BTC, hiện khoảng 20,09 triệu đã lưu hành. Cứ mỗi 210.000 khối (khoảng 4 năm) phần thưởng cho thợ đào giảm một nửa, gọi là halving. Lần gần nhất diễn ra ngày 19–20/04/2024 tại khối 840.000, phần thưởng giảm từ 6,25 xuống 3,125 BTC.' },
      { type: 'p', text: '<strong>Ethereum (ETH)</strong> là một nền tảng cho phép chạy hợp đồng thông minh (smart contract), tức các đoạn mã tự thực thi. Rất nhiều token khác, sàn phi tập trung và ứng dụng tài chính được xây trên Ethereum.' },
      { type: 'table', head: ['Nhóm', 'Ví dụ', 'Đặc điểm với trader', 'Rủi ro nổi bật'], rows: [
        ['Bitcoin', 'BTC', 'Thanh khoản lớn nhất, spread hẹp, là "nhiệt kế" của cả thị trường', 'Vẫn có thể giảm vài chục phần trăm'],
        ['Ethereum', 'ETH', 'Thanh khoản lớn thứ hai, thường biến động mạnh hơn BTC', 'Phụ thuộc hệ sinh thái ứng dụng'],
        ['Altcoin', 'Hàng nghìn token khác', 'Biến động rất mạnh, nhiều đồng thanh khoản mỏng', 'Mở khóa token, bị bỏ rơi, thao túng giá'],
        ['Stablecoin', 'USDT, USDC', 'Neo giá theo 1 USD, dùng làm "tiền mặt" trên sàn', 'Mất neo nếu tổ chức phát hành hoặc cơ chế có vấn đề']
      ] },
      { type: 'callout', tone: 'risk', title: 'Stablecoin không phải tiền gửi ngân hàng', text: 'Tháng 5/2022, stablecoin thuật toán UST và đồng LUNA của hệ Terra sụp đổ, người nắm giữ mất gần hết. "Stable" chỉ là mục tiêu thiết kế, không phải cam kết an toàn. Đừng giữ toàn bộ vốn vào một stablecoin duy nhất mà không biết cơ chế bảo chứng của nó.' },

      { type: 'h', text: 'Giá được hình thành thế nào' },
      { type: 'p', text: 'Không ai "đặt" giá Bitcoin. Giá bạn thấy trên sàn là giá của giao dịch khớp gần nhất: một người sẵn sàng mua ở mức đó gặp một người sẵn sàng bán ở mức đó. Khi người mua sốt ruột hơn người bán, họ chấp nhận trả cao hơn, giá đi lên. Khi người bán sốt ruột hơn, giá đi xuống.' },
      { type: 'example', title: 'Một phiên khớp lệnh thu nhỏ (giả định)', text: 'Người bán rẻ nhất đang chào 80.000 USDT cho 0,5 BTC. Người mua cao nhất đang trả 79.990 USDT. Chưa có giao dịch nào vì hai bên chưa gặp nhau. Một người muốn mua ngay 0,5 BTC, chấp nhận giá 80.000. Lệnh khớp, giá hiện tại thành 80.000. Nếu người đó muốn mua 1 BTC, phần 0,5 BTC còn lại phải khớp với người bán kế tiếp, ví dụ ở 80.010, và giá nhích lên 80.010. Giá tăng không vì tin tốt, mà vì có người chủ động mua hết lượng chào bán ở mức thấp.' },
      { type: 'p', text: 'Cơ chế chi tiết của sổ lệnh (order book), spread và trượt giá sẽ được học ở bài 1.3. Điều cần nhớ lúc này: <strong>tin tức chỉ tác động đến giá thông qua hành động mua bán thật</strong>. Tin tốt mà không ai mua thêm thì giá không tăng.' },

      { type: 'h', text: 'Vốn hóa, cung lưu hành và FDV' },
      { type: 'formula', title: 'Hai thước đo quy mô', expr: 'Vốn hóa = Giá × Cung lưu hành;   FDV = Giá × Cung tối đa', vars: [['Cung lưu hành', 'Số token đang có trên thị trường'], ['Cung tối đa', 'Tổng số token sẽ tồn tại khi phát hành hết'], ['FDV', 'Fully Diluted Valuation, định giá pha loãng hoàn toàn']], note: 'Khoảng cách lớn giữa vốn hóa và FDV nghĩa là còn nhiều token chưa được đưa ra thị trường.' },
      { type: 'calc', title: 'Token X và Bitcoin (giá giả định)', rows: [
        ['Token X: giá', '2 USDT'],
        ['Token X: cung lưu hành', '500 triệu token'],
        ['Token X: cung tối đa', '5 tỷ token'],
        ['Vốn hóa token X', '2 × 500 triệu = 1 tỷ USD'],
        ['FDV token X', '2 × 5 tỷ = 10 tỷ USD'],
        ['Tỷ lệ đang lưu hành', '500 triệu ÷ 5 tỷ = 10%'],
        ['Bitcoin: vốn hóa', '84.000 × 20,09 triệu ≈ 1.687,56 tỷ USD']
      ], result: 'Token X mới lưu hành 10% nguồn cung. 90% còn lại sẽ lần lượt được mở khóa. Nếu nhu cầu không tăng tương ứng, áp lực bán có thể kéo giá xuống.' },
      { type: 'callout', tone: 'warn', title: 'Giá thấp không có nghĩa là rẻ', text: 'Một token giá 0,001 USDT không "rẻ" hơn một token giá 100 USDT. Thứ quyết định là vốn hóa và FDV. Câu "coin này mới vài xu, lên 1 đô là giàu" thường bỏ qua việc nó có hàng trăm tỷ token.' },

      { type: 'h', text: 'Thanh khoản: thứ quyết định bạn thoát được hay không' },
      { type: 'p', text: '<strong>Thanh khoản (liquidity)</strong> là khả năng mua bán một lượng lớn mà giá không bị xê dịch nhiều. BTC và ETH trên sàn lớn có thanh khoản dày. Nhiều altcoin nhỏ thì ngược lại: chỉ cần một lệnh vài nghìn USDT là giá đã nhảy vài phần trăm.' },
      { type: 'list', items: [
        'Khối lượng giao dịch 24 giờ lớn và spread hẹp thường là dấu hiệu thanh khoản tốt, nhưng khối lượng có thể bị làm giả ở sàn nhỏ (xem bài 1.3).',
        'Thanh khoản thay đổi theo giờ: dày hơn khi phiên chứng khoán châu Âu và Mỹ hoạt động, mỏng hơn vào đêm khuya và cuối tuần.',
        'Khi hoảng loạn, người mua rút lệnh, thanh khoản biến mất đúng lúc bạn cần thoát nhất.'
      ] },
      { type: 'p', text: 'Một quy tắc thực dụng cho người mới: <strong>chỉ giao dịch những cặp mà lệnh của bạn nhỏ hơn rất nhiều so với lượng lệnh chờ quanh giá</strong>. Nếu lệnh 500 USDT của bạn đã bằng một phần đáng kể tổng lượng chờ trong phạm vi 1% quanh giá, cặp đó quá mỏng với bạn. Bạn sẽ trả thêm chi phí lúc vào, và càng trả nhiều hơn lúc ra.' },
      { type: 'scenario', title: 'Chọn coin vì "giá rẻ"', setup: 'Hai người có cùng 10 triệu đồng, cùng thấy một altcoin mới giá 0,002 USDT đang được bàn tán nhiều.',
        bad: 'Anh M nghĩ "chỉ cần lên 0,02 là gấp 10", mua ngay bằng lệnh market mà không xem cung tối đa. Coin có 100 tỷ token, mới lưu hành 8%. Hai tuần sau một đợt mở khóa lớn diễn ra, giá giảm 40%. Anh muốn bán nhưng sổ lệnh phía mua rất mỏng, lệnh bán làm giá tụt thêm vài phần trăm.',
        good: 'Chị N tra cứu trước: vốn hóa, FDV, tỷ lệ lưu hành, lịch mở khóa, độ sâu sổ lệnh. Thấy FDV gấp hơn 12 lần vốn hóa và sổ lệnh mỏng, chị bỏ qua. Chị chỉ luyện tập trên BTC và ETH, nơi thanh khoản đủ dày để dừng lỗ khớp gần giá dự tính.' },

      { type: 'h', text: 'Vì sao crypto biến động mạnh' },
      { type: 'list', ordered: true, items: [
        '<strong>Giao dịch 24/7.</strong> Không có giờ đóng cửa, không có ngày nghỉ. Tin xấu lúc 3 giờ sáng được phản ánh ngay lúc 3 giờ sáng, khi bạn đang ngủ.',
        '<strong>Đòn bẩy phổ biến.</strong> Futures cho phép đòn bẩy cao. Khi giá giảm, lệnh thanh lý bắt buộc bán ra, đẩy giá giảm thêm, kích hoạt thanh lý tiếp. Đợt 10/10/2025 là ví dụ: khoảng 19 tỷ USD vị thế bị thanh lý trong 24 giờ.',
        '<strong>Thanh khoản mỏng ở altcoin.</strong> Ít người đặt lệnh chờ, một vài lệnh lớn đủ làm giá dịch chuyển mạnh.',
        '<strong>Không có dòng tiền nền tảng rõ ràng.</strong> Phần lớn token không có lợi nhuận hay cổ tức để neo định giá, nên giá dao động theo kỳ vọng và tâm lý nhiều hơn.'
      ] },
      { type: 'example', title: 'Bitcoin cũng không miễn nhiễm', text: 'Theo CoinGecko, BTC đạt đỉnh khoảng 126.080 USD vào tháng 10/2025. Cuối 9/2026 giá quanh 84.000 USD. Mức giảm: 84.000 ÷ 126.080 ≈ 0,666, tức thấp hơn đỉnh khoảng 33%. Để quay lại đỉnh, giá phải tăng 126.080 ÷ 84.000 − 1 ≈ 50%. Giảm 33% cần tăng 50% mới hòa, và với altcoin mức giảm thường sâu hơn nhiều.' },
      { type: 'figure', name: 'drawdown-recovery', caption: 'Mức giảm càng sâu, mức tăng cần để hòa vốn càng lớn: giảm 33% cần tăng khoảng 50%, giảm 50% cần tăng 100%.' },
      { type: 'callout', tone: 'risk', title: 'Hệ quả trực tiếp cho bạn', text: 'Vì biến động mạnh, dừng lỗ phải đặt theo biến động thật của từng đồng, và khối lượng lệnh phải nhỏ hơn bạn nghĩ. Với altcoin thanh khoản mỏng, dừng lỗ có thể khớp tệ hơn nhiều so với giá bạn đặt.' }
    ],
    keyPoints: [
      'Blockchain là sổ cái chung; BTC có cung tối đa 21 triệu, halving mỗi 210.000 khối.',
      'Giá là nơi người mua và người bán gặp nhau; tin tức chỉ tác động qua hành động mua bán thật.',
      'Vốn hóa = Giá × Cung lưu hành; FDV = Giá × Cung tối đa; chênh lệch lớn báo hiệu áp lực mở khóa token.',
      'Thanh khoản quyết định bạn vào ra dễ hay khó; nó có thể biến mất đúng lúc hoảng loạn.',
      'Crypto biến động mạnh vì 24/7, đòn bẩy, thanh khoản mỏng và thiếu dòng tiền nền tảng.'
    ],
    practice: [
      'Chọn ba đồng coin trên một trang dữ liệu (như CoinGecko). Ghi giá, cung lưu hành, cung tối đa rồi tự tính vốn hóa, FDV và tỷ lệ đang lưu hành.',
      'So sánh khối lượng 24 giờ và spread của BTC/USDT với một altcoin nhỏ trên cùng sàn. Ghi lại chênh lệch.',
      'Tìm hiểu stablecoin bạn đang dùng được bảo chứng bằng gì (tiền mặt, trái phiếu, tài sản mã hóa hay thuật toán) và ghi một câu tóm tắt.'
    ],
    quiz: [
      { q: 'Token Y giá 0,5 USDT, cung lưu hành 200 triệu, cung tối đa 1 tỷ. Vốn hóa và FDV là bao nhiêu?', options: ['Vốn hóa 500 triệu USD, FDV 100 triệu USD', 'Vốn hóa 200 triệu USD, FDV 1 tỷ USD', 'Vốn hóa 100 triệu USD, FDV 500 triệu USD', 'Vốn hóa và FDV đều 100 triệu USD'], answer: 2, explain: 'Vốn hóa = 0,5 × 200 triệu = 100 triệu USD. FDV = 0,5 × 1 tỷ = 500 triệu USD. Lựa chọn A đảo ngược và tính sai; B lấy số token làm USD mà quên nhân giá; D bỏ qua 800 triệu token chưa lưu hành.' },
      { q: 'Vì sao một altcoin có vốn hóa nhỏ hơn FDV rất nhiều lại đáng cảnh giác?', options: ['Vì còn nhiều token chưa lưu hành, khi mở khóa có thể tạo áp lực bán', 'Vì FDV cao chứng tỏ dự án chắc chắn tốt', 'Vì vốn hóa nhỏ nghĩa là giá sắp tăng mạnh', 'Vì không liên quan gì, chỉ cần nhìn giá'], answer: 0, explain: 'Chênh lệch lớn nghĩa là phần lớn nguồn cung chưa ra thị trường. Khi được mở khóa, nếu nhu cầu không tăng tương ứng, giá dễ bị kéo xuống. FDV cao không chứng minh dự án tốt; vốn hóa nhỏ không phải tín hiệu tăng; chỉ nhìn giá là bỏ qua nguồn cung.' },
      { q: 'BTC giảm từ 126.080 xuống 84.000 USD. Cần tăng khoảng bao nhiêu phần trăm từ 84.000 để quay về đỉnh cũ?', options: ['33%', '42%', '100%', '50%'], answer: 3, explain: '126.080 ÷ 84.000 − 1 ≈ 0,50, tức khoảng 50%. 33% là mức đã giảm, không phải mức cần tăng; hai con số khác nhau vì phần trăm tính trên nền khác nhau. 42% và 100% không khớp với phép tính.' },
      { q: 'Lý do nào KHÔNG giải thích việc crypto biến động mạnh hơn cổ phiếu lớn?', options: ['Thị trường giao dịch 24/7', 'Thanh lý đòn bẩy dây chuyền', 'Blockchain giúp giá luôn ổn định', 'Nhiều altcoin có thanh khoản mỏng'], answer: 2, explain: 'Blockchain là sổ cái ghi giao dịch, không có chức năng giữ giá ổn định. Ba lựa chọn còn lại đều là nguyên nhân thật: giao dịch liên tục, thanh lý bắt buộc đẩy giá thêm, và sổ lệnh mỏng khiến lệnh nhỏ cũng làm giá dịch chuyển.' }
    ],
    sources: [
      { title: 'Bitcoin Halving', url: 'https://bitcoin.org/en/halving', note: 'Bitcoin.org, tiếng Anh' },
      { title: 'Bitcoin price and market data', url: 'https://www.coingecko.com/en/coins/bitcoin', note: 'CoinGecko, truy cập 9/2026, tiếng Anh' },
      { title: 'Fully Diluted Valuation (FDV)', url: 'https://www.binance.com/en/academy/glossary/fully-diluted-valuation-fdv', note: 'Binance Academy, tiếng Anh' },
      { title: 'October 10 crypto crash explained', url: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained', note: 'CoinGecko, 2025, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c1-b3': {
    duration: 7,
    level: 'Cơ bản',
    summary: 'CEX và DEX, cách đọc sổ lệnh, spread, độ sâu, trượt giá, maker và taker, khối lượng giả, và bộ tiêu chí chọn sàn an toàn sau bài học FTX.',
    goals: [
      'Đọc được sổ lệnh: bid, ask, spread và độ sâu',
      'Tự tính giá khớp trung bình và trượt giá của một lệnh market',
      'Phân biệt maker và taker',
      'Chọn sàn bằng tiêu chí an toàn, hiểu giới hạn của proof of reserves'
    ],
    blocks: [
      { type: 'p', text: 'Sàn giao dịch là nơi lệnh của bạn gặp lệnh của người khác. Hiểu cách nơi đó vận hành giúp bạn trả ít chi phí hơn, tránh bị khớp giá tệ, và tránh gửi tiền vào một nơi có thể sụp đổ.' },

      { type: 'h', text: 'CEX và DEX' },
      { type: 'table', head: ['Tiêu chí', 'CEX (sàn tập trung)', 'DEX (sàn phi tập trung)'], rows: [
        ['Ai giữ tài sản', 'Sàn giữ hộ (lưu ký)', 'Bạn tự giữ trong ví của mình'],
        ['Cách khớp lệnh', 'Sổ lệnh do sàn vận hành', 'Thường là hợp đồng thông minh, nhiều nơi dùng AMM (bể thanh khoản) thay cho sổ lệnh'],
        ['Tài khoản', 'Đăng ký, xác minh danh tính (KYC)', 'Kết nối ví, thường không cần KYC'],
        ['Rủi ro chính', 'Sàn phá sản, bị hack, đóng băng rút tiền', 'Lỗi hợp đồng thông minh, token giả, ký nhầm quyền (xem bài 1.5)'],
        ['Phù hợp với người mới', 'Dễ dùng hơn, có hỗ trợ', 'Đòi hỏi hiểu ví và bảo mật']
      ] },
      { type: 'p', text: 'Phần lớn nội dung khóa học dùng sổ lệnh của CEX làm ví dụ vì đó là nơi đa số trader Việt bắt đầu. Với DEX dùng AMM, giá được tính bằng công thức theo lượng token trong bể. Nhiều DEX cho bạn đặt mức trượt giá chấp nhận được (slippage tolerance); đặt quá cao khiến bạn dễ bị người khác chạy trước lệnh (front-running).' },

      { type: 'h', text: 'Đọc sổ lệnh: bid, ask, spread, độ sâu' },
      { type: 'p', text: '<strong>Sổ lệnh (order book)</strong> là danh sách các lệnh chờ. Bên mua gọi là <strong>bid</strong>, xếp từ giá cao xuống thấp. Bên bán gọi là <strong>ask</strong>, xếp từ giá thấp lên cao. Khoảng cách giữa bid cao nhất và ask thấp nhất là <strong>spread</strong>. Tổng khối lượng chờ ở các mức giá gần giá hiện tại gọi là <strong>độ sâu (depth)</strong>.' },
      { type: 'figure', name: 'order-book', caption: 'Sổ lệnh: bên mua (bid) phía dưới, bên bán (ask) phía trên, spread ở giữa. Cột khối lượng dài nghĩa là sổ lệnh sâu ở mức giá đó.' },
      { type: 'example', title: 'Spread của BTC/USDT (giả định)', text: 'Bid cao nhất 79.990, ask thấp nhất 80.000. Spread = 80.000 − 79.990 = 10 USDT, tương đương 10 ÷ 80.000 = 0,0125%. Nếu bạn mua bằng lệnh market rồi bán ngay, bạn mất khoảng 10 USDT mỗi BTC chỉ vì spread, chưa tính phí.' },
      { type: 'callout', tone: 'tip', title: 'Xem độ sâu trước khi vào lệnh', text: 'Trên giao diện sàn thường có chế độ biểu đồ độ sâu (depth chart). Trước khi giao dịch một đồng lạ, hãy xem trong phạm vi 1–2% quanh giá hiện tại có bao nhiêu USDT đang chờ. Nếu tổng chỉ vài nghìn USDT, lệnh của bạn sẽ làm giá xê dịch.' },

      { type: 'h', text: 'Trượt giá: khi lệnh ăn qua nhiều mức giá' },
      { type: 'p', text: '<strong>Trượt giá (slippage)</strong> xảy ra khi giá khớp thực tế khác giá bạn kỳ vọng. Lệnh market lớn sẽ "ăn" hết khối lượng ở mức giá tốt nhất rồi tiếp tục sang mức kém hơn.' },
      { type: 'calc', title: 'Mua market 2 BTC trên sổ lệnh sâu (giả định)', rows: [
        ['Ask 80.000: khớp 0,5 BTC', '0,5 × 80.000 = 40.000 USDT'],
        ['Ask 80.010: khớp 0,5 BTC', '0,5 × 80.010 = 40.005 USDT'],
        ['Ask 80.030: khớp 0,7 BTC', '0,7 × 80.030 = 56.021 USDT'],
        ['Ask 80.060: khớp 0,3 BTC', '0,3 × 80.060 = 24.018 USDT'],
        ['Tổng', '160.044 USDT cho 2 BTC'],
        ['Giá trung bình', '160.044 ÷ 2 = 80.022 USDT'],
        ['Trượt giá so với ask tốt nhất', '(80.022 − 80.000) ÷ 80.000 = 0,0275%']
      ], result: 'Sổ lệnh sâu nên trượt giá rất nhỏ, khoảng 0,03%.' },
      { type: 'calc', title: 'Mua market 5.000 USDT một altcoin thanh khoản mỏng (giả định)', rows: [
        ['Ask 1,000: 1.000 token', '1.000 × 1,000 = 1.000 USDT'],
        ['Ask 1,010: 1.500 token', '1.500 × 1,010 = 1.515 USDT (cộng dồn 2.515)'],
        ['Ask 1,030: 2.000 token', '2.000 × 1,030 = 2.060 USDT (cộng dồn 4.575)'],
        ['Ask 1,060: phần còn lại', '425 ÷ 1,060 ≈ 400,94 token'],
        ['Tổng token nhận được', '1.000 + 1.500 + 2.000 + 400,94 ≈ 4.900,94 token'],
        ['Giá trung bình', '5.000 ÷ 4.900,94 ≈ 1,0202 USDT'],
        ['Trượt giá', '≈ 2,02% so với ask tốt nhất 1,000']
      ], result: 'Cùng một lệnh market, altcoin mỏng làm bạn mất khoảng 2% ngay khi vào, gấp khoảng 70 lần so với ví dụ BTC. Khi bán ra lúc hoảng loạn, trượt giá có thể còn tệ hơn.' },

      { type: 'h', text: 'Maker, taker và khối lượng giả' },
      { type: 'p', text: '<strong>Maker</strong> là người đặt lệnh chờ vào sổ, "tạo" thanh khoản. <strong>Taker</strong> là người khớp ngay với lệnh đang chờ, "lấy" thanh khoản. Lệnh market luôn là taker. Lệnh limit nằm chờ trong sổ là maker. Nhiều sàn thu phí maker thấp hơn hoặc bằng phí taker; chi tiết cách tính phí ở bài 1.4.' },
      { type: 'p', text: '<strong>Wash trading (giao dịch rửa)</strong> là việc tự mua tự bán để tạo khối lượng ảo. Nghiên cứu "Crypto Wash Trading" (Cong, Li, Tang, Yang, NBER, xuất bản trên Management Science 2023) khảo sát 29 sàn tập trung và ước tính khối lượng giả ở mỗi sàn không được quản lý trung bình <strong>hơn 70%</strong> khối lượng báo cáo. Khối lượng giả giúp sàn leo hạng trên các bảng xếp hạng.' },
      { type: 'example', title: 'Maker hay taker trong cùng một ý định mua (giả định)', text: 'BTC đang có bid 79.990, ask 80.000. Nếu bạn đặt lệnh limit mua ở 79.990 và chờ, lệnh nằm trong sổ, khi có người bán xuống khớp với bạn thì bạn là maker. Nếu bạn đặt limit mua ở 80.050, cao hơn ask hiện tại, lệnh khớp ngay với người đang chào bán ở 80.000, và bạn là taker dù dùng lệnh limit. Maker hay taker phụ thuộc lệnh có khớp ngay hay không, không phụ thuộc tên loại lệnh.' },
      { type: 'callout', tone: 'warn', title: 'Khối lượng lớn chưa chắc là thật', text: 'Đừng chọn sàn hay chọn coin chỉ vì con số khối lượng 24 giờ. Kiểm tra thêm độ sâu sổ lệnh và spread. Khối lượng thật thường đi kèm sổ lệnh dày và spread hẹp; khối lượng giả thì không.' },

      { type: 'h', text: 'Chọn sàn: an toàn trước, phí sau' },
      { type: 'p', text: 'Tháng 11/2022, sàn FTX sụp đổ. Theo cáo buộc của SEC Mỹ (13/12/2022), tiền của khách hàng FTX bị chuyển sang quỹ Alameda Research mà không được công bố, và Alameda được hưởng hạn mức tín dụng gần như không giới hạn bằng tiền của khách. Nhiều người không rút được tiền. Bài học: sàn giữ hộ tài sản thì rủi ro của sàn là rủi ro của bạn.' },
      { type: 'p', text: 'Sau FTX, nhiều sàn công bố <strong>proof of reserves (bằng chứng dự trữ)</strong>: cho thấy sàn giữ đủ tài sản để trả khách theo tỷ lệ 1:1. Đây là bước tiến, nhưng có giới hạn: nó là ảnh chụp tại một thời điểm, không đảm bảo liên tục; chất lượng phụ thuộc bên kiểm tra; và nếu không đối chiếu đầy đủ nợ phải trả thì không chứng minh được sàn có khả năng thanh toán.' },
      { type: 'checklist', title: 'Tiêu chí chọn sàn', items: [
        'Sàn có hoạt động lâu năm, có lịch sử xử lý sự cố minh bạch',
        'Có công bố proof of reserves định kỳ và bạn hiểu nó chỉ là ảnh chụp tại một thời điểm',
        'Sổ lệnh cặp bạn giao dịch đủ sâu, spread hẹp',
        'Hỗ trợ 2FA, whitelist địa chỉ rút tiền, cảnh báo đăng nhập (xem bài 1.5)',
        'Bạn đã kiểm tra tình trạng pháp lý của việc dùng sàn đó tại Việt Nam (xem bài 1.6)',
        'Không giữ trên sàn nhiều hơn số tiền bạn cần để giao dịch'
      ] },
      { type: 'scenario', title: 'Chọn nơi gửi 20 triệu đồng', setup: 'Hai người mới muốn bắt đầu giao dịch với 20 triệu đồng.',
        bad: 'Anh C thấy quảng cáo một sàn mới "khối lượng top 10, tặng 50% tiền nạp". Anh nạp toàn bộ, mua một altcoin đang được nhóm chat hô hào. Khi muốn bán, sổ lệnh chỉ có vài trăm USDT phía mua, anh bán lỗ gần 8% do trượt giá. Vài tháng sau sàn tạm dừng rút tiền.',
        good: 'Chị D đọc bài 1.6 về pháp lý trước, sau đó đối chiếu tiêu chí: thời gian hoạt động, proof of reserves, độ sâu sổ lệnh BTC/USDT. Chị bật 2FA và whitelist rút tiền, chỉ nạp phần đủ để luyện tập, giữ phần còn lại ngoài sàn.' },
      { type: 'p', text: 'Một nguyên tắc đơn giản sau FTX: coi số dư trên sàn là <strong>tiền đang cho sàn giữ hộ</strong>, không phải tiền trong két của bạn. Chỉ để trên sàn phần vốn dùng để giao dịch trong vài tuần tới. Phần còn lại, nếu giữ dài hạn, cân nhắc ví tự lưu ký sau khi đã học bài 1.5, hoặc giữ ngoài crypto.' },
      { type: 'callout', tone: 'risk', title: 'Không có sàn nào an toàn tuyệt đối', text: 'Bất kỳ sàn tập trung nào cũng có thể bị hack, bị đóng băng hay phá sản. Chia nhỏ rủi ro, đừng để khoản tiền bạn không thể mất trên sàn.' }
    ],
    keyPoints: [
      'CEX giữ hộ tài sản và dùng sổ lệnh; DEX để bạn tự giữ, thường dùng AMM.',
      'Spread = Ask thấp nhất − Bid cao nhất; độ sâu là lượng lệnh chờ quanh giá hiện tại.',
      'Lệnh market lớn ăn qua nhiều mức giá, gây trượt giá; sổ lệnh càng mỏng trượt càng nhiều.',
      'Maker đặt lệnh chờ tạo thanh khoản, taker khớp ngay lấy thanh khoản.',
      'Khối lượng có thể bị làm giả; proof of reserves là ảnh chụp tại một thời điểm, không phải bảo đảm.'
    ],
    practice: [
      'Mở sổ lệnh BTC/USDT trên một sàn, ghi bid cao nhất, ask thấp nhất, tính spread bằng USDT và bằng %.',
      'Chọn một altcoin nhỏ, cộng dồn khối lượng phía ask trong phạm vi 2% trên giá hiện tại. Ước tính trượt giá nếu bạn mua market 1.000 USDT.',
      'Chấm điểm sàn bạn đang dùng theo checklist trong bài, ghi rõ mục nào chưa đạt.'
    ],
    quiz: [
      { q: 'Bid cao nhất 2.998 USDT, ask thấp nhất 3.000 USDT (ETH, giả định). Spread tính theo % gần đúng là bao nhiêu?', options: ['0,2%', '2%', '0,067%', '0,0067%'], answer: 2, explain: 'Spread = 3.000 − 2.998 = 2 USDT; 2 ÷ 3.000 ≈ 0,067%. 0,2% và 2% lớn gấp 3 và 30 lần; 0,0067% nhỏ đi 10 lần do đặt sai dấu phẩy.' },
      { q: 'Vì sao lệnh market lớn trên altcoin thanh khoản mỏng thường khớp giá tệ?', options: ['Vì lệnh phải ăn qua nhiều mức ask ngày càng cao', 'Vì sàn cố tình tăng giá với người mua lớn', 'Vì lệnh market luôn khớp ở giá bid', 'Vì phí maker cao hơn phí taker'], answer: 0, explain: 'Sổ lệnh mỏng có ít khối lượng ở mỗi mức giá, nên lệnh lớn phải khớp dần lên các mức kém hơn, tạo trượt giá. Sàn không tự tăng giá; lệnh mua market khớp phía ask chứ không phải bid; phí maker/taker không liên quan đến giá khớp.' },
      { q: 'Nhận định nào đúng về proof of reserves?', options: ['Nó đảm bảo sàn không bao giờ phá sản', 'Nó là ảnh chụp tài sản tại một thời điểm và có giới hạn', 'Nó chỉ cần thiết với DEX', 'Nó thay thế cho việc bật 2FA'], answer: 1, explain: 'Proof of reserves cho thấy tài sản sàn giữ tại thời điểm kiểm tra; giữa các lần kiểm tra có thể thay đổi, và kết quả phụ thuộc bên kiểm tra. Nó không đảm bảo sàn không phá sản, không áp dụng cho DEX (bạn tự giữ tài sản), và không liên quan đến bảo mật tài khoản cá nhân.' },
      { q: 'Một sàn nhỏ báo khối lượng 24 giờ rất lớn nhưng sổ lệnh mỏng, spread rộng. Bạn nên kết luận gì?', options: ['Sàn rất uy tín vì khối lượng lớn', 'Spread rộng nghĩa là phí thấp', 'Nên nạp tiền ngay trước khi sàn nổi tiếng', 'Có dấu hiệu khối lượng bị làm giả, cần thận trọng'], answer: 3, explain: 'Khối lượng thật thường đi kèm sổ lệnh sâu và spread hẹp. Mâu thuẫn này là dấu hiệu wash trading, hiện tượng nghiên cứu của Cong và cộng sự cho thấy phổ biến ở sàn không được quản lý. Spread rộng là chi phí cao hơn chứ không phải phí thấp; vội nạp tiền là hành vi rủi ro.' }
    ],
    sources: [
      { title: 'Bid-Ask Spread and Slippage Explained', url: 'https://www.binance.com/en/academy/articles/bid-ask-spread-and-slippage-explained', note: 'Binance Academy, tiếng Anh' },
      { title: 'Crypto Wash Trading (NBER Working Paper 30783)', url: 'https://www.nber.org/papers/w30783', note: 'Cong, Li, Tang, Yang; NBER, sau đăng trên Management Science 2023, tiếng Anh' },
      { title: 'Proof of Reserves (PoR)', url: 'https://www.binance.com/en/academy/glossary/proof-of-reserves-por', note: 'Binance Academy, tiếng Anh' },
      { title: 'SEC Charges Samuel Bankman-Fried with Defrauding Investors in Crypto Asset Trading Platform FTX', url: 'https://www.sec.gov/newsroom/press-releases/2022-219', note: 'SEC Mỹ, 13/12/2022, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c1-b4': {
    duration: 7,
    level: 'Cơ bản',
    summary: 'Market, limit, stop-market, stop-limit, OCO, trailing stop, post-only, reduce-only: dùng khi nào, rủi ro gì, và phí maker/taker ăn vào lợi nhuận ra sao.',
    goals: [
      'Chọn đúng loại lệnh cho từng mục đích: vào lệnh, dừng lỗ, chốt lời',
      'Hiểu vì sao lệnh stop-limit có thể không khớp và khi nào nên dùng stop-market',
      'Tính được tổng phí và ảnh hưởng của phí đến kỳ vọng mỗi lệnh',
      'Biết dùng post-only và reduce-only để tránh lỗi thao tác'
    ],
    blocks: [
      { type: 'p', text: 'Loại lệnh là công cụ để biến kế hoạch thành hành động. Chọn sai loại lệnh có thể khiến bạn không thoát được khi giá lao xuống, hoặc trả phí gấp đôi mà không biết.' },

      { type: 'h', text: 'Lệnh market và lệnh limit' },
      { type: 'p', text: '<strong>Lệnh thị trường (market)</strong> khớp ngay với giá tốt nhất đang có. Bạn chắc chắn có hàng, nhưng không chắc giá, và có thể bị trượt giá (xem bài 1.3). Lệnh market luôn là taker.' },
      { type: 'p', text: '<strong>Lệnh giới hạn (limit)</strong> chỉ khớp ở giá bạn đặt hoặc tốt hơn: mua ở giá đó hoặc thấp hơn, bán ở giá đó hoặc cao hơn. Bạn chắc chắn về giá, nhưng không chắc sẽ khớp. Lệnh limit có thêm tùy chọn thời hạn hiệu lực: GTC (còn hiệu lực đến khi khớp hoặc bạn hủy), IOC (khớp ngay phần nào được, phần còn lại hủy), FOK (phải khớp toàn bộ ngay, không thì hủy).' },
      { type: 'callout', tone: 'tip', title: 'Post-only: chắc chắn là maker', text: 'Khi tích chọn Post Only cho lệnh limit, lệnh sẽ không khớp ngay mà nằm trong sổ như lệnh maker. Nếu nó sắp khớp ngay với lệnh có sẵn, sàn sẽ hủy lệnh. Dùng khi bạn muốn chắc chắn trả phí maker.' },

      { type: 'h', text: 'Lệnh dừng: stop-market và stop-limit' },
      { type: 'p', text: 'Lệnh dừng có một <strong>giá kích hoạt (stop price)</strong>. Khi giá thị trường chạm mức này, sàn mới gửi lệnh thật vào sổ.' },
      { type: 'list', items: [
        '<strong>Stop-market:</strong> chạm giá kích hoạt thì gửi lệnh market. Gần như chắc chắn khớp nếu còn thanh khoản, nhưng có thể trượt giá khi biến động mạnh.',
        '<strong>Stop-limit:</strong> chạm giá kích hoạt thì đặt một lệnh limit ở giá bạn chọn. Kiểm soát được giá, nhưng nếu thị trường lao qua giá limit, lệnh <strong>không khớp</strong> và vị thế vẫn mở.'
      ] },
      { type: 'scenario', title: 'Đêm giá lao xuống', setup: 'Hai người cùng giữ 0,01 BTC mua ở 80.000 USDT (giả định), cùng muốn dừng lỗ quanh 76.000. Lúc 2 giờ sáng có tin xấu, giá rơi thẳng từ 76.500 xuống 75.000 trong vài giây rồi tiếp tục về 72.000.',
        bad: 'Anh E dùng stop-limit: kích hoạt 76.000, giá limit 75.800 để "không bán rẻ". Giá lao qua 75.800 mà không có người mua ở đó. Lệnh limit nằm treo trong sổ, không khớp. Sáng dậy, giá 72.000, anh lỗ 0,01 × 8.000 = 80 USDT thay vì khoảng 40 USDT như kế hoạch, và vẫn đang giữ vị thế.',
        good: 'Chị F dùng stop-market kích hoạt 76.000. Lệnh khớp trung bình khoảng 75.700 do trượt giá. Chị lỗ 0,01 × 4.300 = 43 USDT, hơi nhiều hơn dự tính 40 USDT nhưng đã thoát. Chị chấp nhận trượt giá nhỏ để chắc chắn ra khỏi lệnh.' },
      { type: 'callout', tone: 'risk', title: 'Dừng lỗ khẩn cấp: ưu tiên chắc chắn thoát', text: 'Với dừng lỗ, mục tiêu là thoát chứ không phải tối ưu vài chục USDT. Nếu dùng stop-limit, hãy đặt giá limit cách giá kích hoạt đủ xa để tăng khả năng khớp. Với futures, dừng lỗ nên là stop-market; tài liệu chính thức của Binance nêu rõ stop-limit có thể không khớp khi giá lao qua giá limit.' },

      { type: 'h', text: 'OCO, trailing stop, reduce-only' },
      { type: 'p', text: '<strong>OCO (One Cancels the Other, lệnh này hủy lệnh kia)</strong> ghép một lệnh limit chốt lời với một lệnh stop-limit dừng lỗ. Khi một lệnh khớp (toàn bộ hoặc một phần), lệnh còn lại tự hủy. Bạn đặt xong kế hoạch rồi không cần ngồi canh.' },
      { type: 'p', text: '<strong>Trailing stop (dừng lỗ kéo theo)</strong> có giá kích hoạt đi theo giá khi giá chạy đúng hướng, và đứng yên khi giá đi ngược. Khoảng cách được đặt theo phần trăm (Binance futures gọi là callback rate).' },
      { type: 'example', title: 'Trailing stop 3% (giả định)', text: 'Bạn giữ BTC, đặt trailing stop bán với khoảng lùi 3%. Giá tăng lên đỉnh 88.000 rồi quay đầu. Lệnh kích hoạt khi giá giảm 3% từ đỉnh: 88.000 × 0,97 = 85.360. Nếu giá chỉ lên 82.000 rồi giảm, lệnh kích hoạt ở 82.000 × 0,97 = 79.540.' },
      { type: 'p', text: '<strong>Reduce-only (chỉ giảm vị thế)</strong> dùng trong futures: lệnh chỉ được phép giảm hoặc đóng vị thế đang có, không bao giờ mở thêm hoặc mở vị thế ngược chiều. Nó chặn lỗi phổ biến: định đóng lệnh long nhưng bấm nhầm khối lượng lớn hơn, vô tình mở thêm một lệnh short.' },
      { type: 'table', head: ['Loại lệnh', 'Chắc khớp?', 'Chắc giá?', 'Dùng khi'], rows: [
        ['Market', 'Có (nếu còn thanh khoản)', 'Không, có trượt giá', 'Cần vào hoặc ra ngay, cặp thanh khoản tốt'],
        ['Limit', 'Không', 'Có', 'Vào lệnh ở vùng giá đã lên kế hoạch; chốt lời'],
        ['Stop-market', 'Có (khi đã kích hoạt)', 'Không', 'Dừng lỗ, nhất là futures'],
        ['Stop-limit', 'Không', 'Có', 'Vào lệnh khi phá vỡ, thị trường không quá nhanh'],
        ['OCO', 'Tùy lệnh con', 'Tùy lệnh con', 'Đặt sẵn cả chốt lời và dừng lỗ cho lệnh spot'],
        ['Trailing stop', 'Tùy dạng lệnh gửi đi', 'Không', 'Bảo vệ lãi khi giá chạy xa'],
        ['Post-only', 'Không', 'Có', 'Muốn chắc chắn là maker'],
        ['Reduce-only', 'Tùy lệnh', 'Tùy lệnh', 'Đóng hoặc giảm vị thế futures, tránh mở nhầm']
      ] },

      { type: 'h', text: 'Phí maker/taker: con số thật và cách tính' },
      { type: 'p', text: 'Tại thời điểm biên soạn (27/09/2026), trang biểu phí chính thức của Binance ghi phí spot cho người dùng thường (VIP 0) là <strong>0,1% maker / 0,1% taker</strong>, và <strong>0,075% / 0,075%</strong> nếu trả phí bằng BNB (giảm 25%). Ở cấp này maker và taker bằng nhau. Ở cấp VIP cao hơn và ở thị trường futures, maker thường rẻ hơn taker. Biểu phí có thể thay đổi, hãy kiểm tra trang phí của sàn bạn dùng.' },
      { type: 'formula', title: 'Phí một lệnh', expr: 'Phí = Giá trị lệnh × Tỷ lệ phí', vars: [['Giá trị lệnh', 'Giá × Khối lượng'], ['Tỷ lệ phí', 'Maker hoặc taker tùy lệnh của bạn khớp theo cách nào']], note: 'Một vòng giao dịch có 2 lần phí: lúc vào và lúc ra.' },
      { type: 'calc', title: 'Phí một tháng khi giao dịch nhiều', rows: [
        ['Giả định', '100 vòng mua bán/tháng, mỗi chiều 1.000 USDT'],
        ['Spot Binance VIP 0 (0,1%)', '100 × 2 × 1.000 × 0,1% = 200 USDT'],
        ['Spot Binance VIP 0 trả bằng BNB (0,075%)', '100 × 2 × 1.000 × 0,075% = 150 USDT'],
        ['Ví dụ giả định: sàn thu taker 0,05%, toàn lệnh taker', '100 × 2 × 1.000 × 0,05% = 100 USDT'],
        ['Ví dụ giả định: sàn thu maker 0,02%, toàn lệnh maker', '100 × 2 × 1.000 × 0,02% = 40 USDT']
      ], result: 'Với tài khoản 1.000 USDT, phí có thể tốn từ 4% đến 20% tài khoản mỗi tháng tùy mức phí và cách đặt lệnh. Giao dịch ít hơn là cách giảm phí hiệu quả nhất.' },
      { type: 'calc', title: 'Phí biến lệnh hòa thành lệnh lỗ', rows: [
        ['Giả định', 'Tỷ lệ thắng 50%, lệnh thắng +1%, lệnh thua −1% (trước phí)'],
        ['Kỳ vọng trước phí', '0,5 × 1% − 0,5 × 1% = 0%'],
        ['Phí khứ hồi', '0,1% × 2 = 0,2% mỗi lệnh'],
        ['Lệnh thắng sau phí', '1% − 0,2% = 0,8%'],
        ['Lệnh thua sau phí', '−1% − 0,2% = −1,2%'],
        ['Kỳ vọng sau phí', '0,5 × 0,8% − 0,5 × 1,2% = −0,2% mỗi lệnh']
      ], result: 'Một cách giao dịch "hòa vốn" trước phí sẽ lỗ đều đặn sau phí. Mục tiêu lợi nhuận càng nhỏ so với phí, bạn càng cần tỷ lệ thắng cao hơn.' },
      { type: 'p', text: 'Hãy so phí với mục tiêu lợi nhuận của bạn. Nếu bạn lướt để kiếm 0,5% mỗi lệnh và trả 0,2% phí khứ hồi, phí đã ăn 0,2 ÷ 0,5 = 40% lợi nhuận gộp. Nếu mục tiêu là 3% mỗi lệnh, cùng mức phí chỉ chiếm khoảng 6,7%. Đây là lý do khóa học ưu tiên ít lệnh hơn, mỗi lệnh có mục tiêu đủ xa so với chi phí, thay vì lướt dày đặc.' },
      { type: 'tool', name: 'expectancy', note: 'Nhập tỷ lệ thắng và R thắng, R thua đã trừ phí để xem kỳ vọng thật của cách giao dịch của bạn.' },

      { type: 'h', text: 'Quy tắc chọn lệnh cho người mới' },
      { type: 'steps', items: [
        { title: 'Vào lệnh bằng limit ở vùng giá đã lên kế hoạch', text: 'Không đuổi giá bằng market khi nến đang chạy mạnh.' },
        { title: 'Đặt dừng lỗ ngay sau khi khớp', text: 'Spot: OCO hoặc stop đặt riêng; futures: stop-market kèm reduce-only.' },
        { title: 'Đặt chốt lời bằng limit', text: 'Có thể chia 2–3 phần theo kế hoạch.' },
        { title: 'Kiểm tra lại trên màn hình lệnh chờ', text: 'Đủ lệnh dừng lỗ, đúng khối lượng, đúng chiều.' },
        { title: 'Không sửa dừng lỗ theo hướng xa hơn', text: 'Chỉ được dời dừng lỗ theo hướng giảm rủi ro (ví dụ về hòa vốn khi giá đã chạy đúng), không bao giờ nới ra để "cho lệnh thêm cơ hội".' }
      ] },
      { type: 'callout', tone: 'risk', title: 'Lỗi thao tác cũng mất tiền thật', text: 'Gõ thừa một số 0 ở khối lượng hay chọn nhầm chiều mua/bán có thể gây lỗ lớn trong vài giây. Luyện đặt từng loại lệnh trên Demo Trading trước khi dùng tiền thật.' }
    ],
    keyPoints: [
      'Market chắc khớp nhưng không chắc giá; limit chắc giá nhưng không chắc khớp.',
      'Stop-limit có thể không khớp khi giá lao qua; dừng lỗ khẩn cấp nên dùng stop-market.',
      'OCO ghép chốt lời và dừng lỗ; trailing stop kéo theo giá; reduce-only chặn mở nhầm vị thế.',
      'Binance spot VIP 0 hiện thu 0,1%/0,1% (0,075% nếu trả bằng BNB), kiểm tra lại vì có thể thay đổi.',
      'Phí khứ hồi có thể biến kỳ vọng 0% thành âm; giao dịch ít hơn là cách giảm phí tốt nhất.'
    ],
    practice: [
      'Trên Demo Trading, đặt thử mỗi loại lệnh: limit, stop-market, stop-limit, OCO, trailing stop. Chụp màn hình lệnh chờ và ghi lại mỗi lệnh sẽ khớp khi nào.',
      'Mở trang biểu phí của sàn bạn dùng, ghi phí maker và taker ở cấp của bạn, rồi tính phí một tháng theo thói quen giao dịch hiện tại.',
      'Với mục tiêu lợi nhuận thường dùng của bạn (ví dụ 0,5% mỗi lệnh), tính xem phí khứ hồi chiếm bao nhiêu phần trăm lợi nhuận.'
    ],
    quiz: [
      { q: 'Bạn giữ ETH mua ở 3.000 USDT, muốn chắc chắn thoát nếu giá thủng 2.850 kể cả khi thị trường sập nhanh. Lệnh nào phù hợp nhất?', options: ['Stop-market kích hoạt 2.850', 'Stop-limit kích hoạt 2.850, giá limit 2.849', 'Limit bán 2.850 đặt ngay bây giờ', 'Post-only bán 2.850'], answer: 0, explain: 'Stop-market gửi lệnh market khi chạm 2.850 nên gần như chắc khớp, chấp nhận trượt giá. Stop-limit với giá limit sát 2.849 dễ bị bỏ qua khi giá lao nhanh. Limit bán 2.850 đặt lúc giá đang ở trên sẽ khớp ngay như bán luôn chứ không phải dừng lỗ. Post-only cũng là lệnh limit, sẽ bị hủy nếu khớp ngay.' },
      { q: 'Mỗi tháng 50 vòng mua bán, mỗi chiều 2.000 USDT, phí 0,1% mỗi chiều. Tổng phí tháng là bao nhiêu?', options: ['100 USDT', '50 USDT', '200 USDT', '1.000 USDT'], answer: 2, explain: '50 × 2 × 2.000 × 0,1% = 200 USDT. 100 USDT là quên nhân 2 chiều; 50 USDT sai cả chiều lẫn giá trị; 1.000 USDT nhầm phí thành 0,5%.' },
      { q: 'Trailing stop bán khoảng lùi 5%. Giá lên đỉnh 3.400 rồi giảm. Lệnh kích hoạt ở đâu?', options: ['3.400', '3.570', '3.300', '3.230'], answer: 3, explain: '3.400 × 0,95 = 3.230. 3.400 là đỉnh, chưa giảm; 3.570 là cộng 5% chứ không phải trừ; 3.300 là trừ một số tiền cố định 100, không phải 5%.' },
      { q: 'Trong futures, bạn muốn đóng lệnh long 0,1 BTC nhưng sợ bấm nhầm khối lượng thành 1 BTC và mở thêm lệnh short. Tùy chọn nào ngăn lỗi này?', options: ['Post-only', 'Reduce-only', 'IOC', 'GTC'], answer: 1, explain: 'Reduce-only chỉ cho phép lệnh giảm hoặc đóng vị thế hiện có, không mở vị thế ngược chiều. Post-only chỉ đảm bảo lệnh là maker. IOC và GTC là thời hạn hiệu lực của lệnh limit, không kiểm soát chiều vị thế.' }
    ],
    sources: [
      { title: 'Binance Trading Fee Rate', url: 'https://www.binance.com/en/fee/trading', note: 'Binance, biểu phí chính thức, truy cập 27/09/2026, tiếng Anh' },
      { title: 'Understanding the Different Order Types', url: 'https://www.binance.com/en/academy/articles/understanding-the-different-order-types', note: 'Binance Academy, tiếng Anh' },
      { title: 'What Is an OCO Order?', url: 'https://www.binance.com/en/academy/articles/what-is-an-oco-order', note: 'Binance Academy, tiếng Anh' },
      { title: 'What Are Maker (Post Only) Order, Time in Force Order, and Iceberg Order?', url: 'https://www.binance.com/en/support/faq/what-are-maker-post-only-order-time-in-force-order-and-iceberg-order-5d3fa5e5709f47e0b5f186b350da1655', note: 'Binance Support, tiếng Anh' },
      { title: 'Types of Order on Binance Futures', url: 'https://www.binance.com/en/support/faq/types-of-order-on-binance-futures-360033779452', note: 'Binance Support, tiếng Anh' },
      { title: 'What Is Stop Order? (Binance Futures)', url: 'https://www.binance.com/en/support/faq/detail/360036351051', note: 'Binance Support, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c1-b5': {
    duration: 8,
    level: 'Cơ bản',
    summary: 'Ví lưu ký và tự lưu ký, seed phrase, 2FA, whitelist rút tiền, và cách nhận diện phishing, approve độc hại, pig butchering, nhóm kèo, pump and dump.',
    goals: [
      'Phân biệt ví lưu ký và ví tự lưu ký, biết ai chịu trách nhiệm tài sản',
      'Thiết lập được bộ bảo mật tối thiểu: 2FA, whitelist rút tiền, lưu seed phrase đúng cách',
      'Nhận diện các chiêu lừa đảo phổ biến qua dấu hiệu cụ thể',
      'Biết phải làm gì ngay khi nghi ngờ bị lừa hoặc lộ thông tin'
    ],
    blocks: [
      { type: 'p', text: 'Bạn có thể mất tiền vì giao dịch sai. Nhưng bạn cũng có thể mất sạch mà chưa hề đặt lệnh nào: một đường link giả, một cú ký nhầm, một "chuyên gia" thân thiện. Trong crypto, giao dịch đã chuyển đi gần như không thể đảo ngược.' },

      { type: 'h', text: 'Ví lưu ký, ví tự lưu ký và seed phrase' },
      { type: 'table', head: ['Tiêu chí', 'Lưu ký (tài khoản trên sàn)', 'Tự lưu ký (ví của bạn)'], rows: [
        ['Ai giữ khóa', 'Sàn', 'Bạn'],
        ['Quên mật khẩu', 'Có thể khôi phục qua sàn', 'Chỉ khôi phục được bằng seed phrase'],
        ['Rủi ro chính', 'Sàn phá sản, bị hack, đóng băng tài khoản', 'Lộ hoặc mất seed phrase, ký nhầm giao dịch'],
        ['Phù hợp', 'Tiền đang dùng để giao dịch', 'Tài sản giữ dài hạn, khi bạn đã hiểu cách bảo quản']
      ] },
      { type: 'p', text: '<strong>Seed phrase (cụm từ khôi phục)</strong> thường gồm 12 hoặc 24 từ tiếng Anh. Ai có cụm từ này là có toàn quyền với ví, không cần mật khẩu, không cần điện thoại của bạn.' },
      { type: 'callout', tone: 'risk', title: 'Quy tắc tuyệt đối với seed phrase', text: 'Không bao giờ nhập seed phrase vào bất kỳ trang web, form, bot hay tin nhắn nào. Không chụp ảnh, không lưu trên đám mây, không gửi cho "hỗ trợ viên". Không có sàn hay ví chính thống nào hỏi seed phrase của bạn. Ai hỏi là kẻ lừa đảo.' },
      { type: 'list', items: [
        'Chép seed phrase ra giấy (hoặc tấm kim loại), cất ở nơi an toàn, có thể giữ hai bản ở hai nơi khác nhau.',
        'Kiểm tra lại từng từ và thứ tự ngay sau khi chép.',
        'Tách ví: một ví "nóng" ít tiền để kết nối ứng dụng, một ví riêng giữ tài sản chính, không kết nối lung tung.'
      ] },

      { type: 'h', text: 'Bảo mật tài khoản sàn' },
      { type: 'checklist', title: 'Bộ bảo mật tối thiểu', items: [
        'Email riêng chỉ dùng cho sàn, mật khẩu mạnh và không dùng lại ở nơi khác',
        '2FA (xác thực hai lớp) bằng ứng dụng tạo mã hoặc khóa bảo mật, hạn chế dùng SMS',
        'Bật whitelist địa chỉ rút tiền: chỉ rút được về các địa chỉ đã duyệt',
        'Bật giới hạn rút về địa chỉ mới thêm (Binance cho chọn 24, 48 hoặc 72 giờ)',
        'Bật mã chống lừa đảo (anti-phishing code) trong email nếu sàn hỗ trợ',
        'Truy cập sàn bằng dấu trang (bookmark) đã lưu, không bấm link trong tin nhắn hay quảng cáo'
      ] },
      { type: 'callout', tone: 'warn', title: 'Vì sao hạn chế 2FA qua SMS', text: 'Kẻ gian có thể giả danh bạn để xin cấp lại SIM (tấn công đổi SIM), rồi nhận mã SMS thay bạn. Ứng dụng tạo mã hoặc khóa bảo mật vật lý gắn với thiết bị của bạn nên khó chiếm hơn. Nhớ lưu mã khôi phục 2FA ở nơi an toàn, tách biệt với điện thoại.' },
      { type: 'p', text: 'Whitelist kèm thời gian chờ cho địa chỉ mới giúp bạn có một khoảng đệm. Nếu kẻ gian vào được tài khoản và thêm địa chỉ của chúng, tiền chưa thể rút ngay, bạn có thời gian phát hiện và khóa tài khoản.' },

      { type: 'h', text: 'Phishing và approve độc hại' },
      { type: 'p', text: '<strong>Phishing</strong> là giả mạo để lấy thông tin: trang web giống hệt sàn, email "tài khoản của bạn bị khóa", tin nhắn "nhận airdrop miễn phí". Tên miền chỉ khác một chữ cái là đủ đánh lừa khi bạn vội.' },
      { type: 'p', text: 'Trên ví tự lưu ký có một kiểu nguy hiểm hơn: <strong>approve độc hại</strong>. Khi dùng ứng dụng phi tập trung, bạn ký một quyền (token approval) cho hợp đồng thông minh được chuyển token của bạn. Trang giả mạo lừa bạn ký quyền không giới hạn, sau đó rút sạch token. Quyền này không tự hết hạn khi bạn đóng trình duyệt; nó còn hiệu lực đến khi bạn thu hồi.' },
      { type: 'list', items: [
        'Đọc kỹ màn hình ký trong ví: nếu là "approve" hoặc "set approval for all" với trang bạn không chắc, dừng lại.',
        'Chỉ cấp quyền đúng số lượng cần dùng, tránh "không giới hạn".',
        'Định kỳ kiểm tra và thu hồi (revoke) các quyền không còn dùng bằng công cụ quản lý quyền trong ví hoặc công cụ thu hồi uy tín.'
      ] },

      { type: 'h', text: 'Pig butchering, nhóm kèo và pump and dump' },
      { type: 'p', text: '<strong>Pig butchering ("nuôi heo rồi giết")</strong> là lừa đảo đầu tư dựa trên lòng tin. Kẻ gian làm quen qua mạng, xây dựng quan hệ hàng tuần, rồi giới thiệu một "nền tảng đầu tư" có vẻ sinh lời rất cao. Nạn nhân được khuyến khích nạp ngày càng nhiều và cuối cùng không rút được tiền. Theo báo cáo IC3 năm 2024 của FBI, loại lừa đảo đầu tư crypto này ghi nhận 41.557 đơn trình báo với <strong>5,8 tỷ USD</strong> thiệt hại chỉ riêng ở Mỹ; tổng thiệt hại liên quan đến crypto là 9,3 tỷ USD.' },
      { type: 'calc', title: 'Kịch bản nền tảng giả điển hình (giả định)', rows: [
        ['Nạp lần đầu', '2.000 USDT'],
        ['Ứng dụng giả hiển thị lãi', 'Số dư "tăng" lên 6.000 USDT sau vài tuần'],
        ['Yêu cầu khi rút', 'Nộp "thuế" hoặc "phí mở khóa" 20% số dư: 6.000 × 20% = 1.200 USDT'],
        ['Tổng tiền thật đã chuyển', '2.000 + 1.200 = 3.200 USDT'],
        ['Tiền rút về được', '0 USDT']
      ], result: 'Số dư 6.000 USDT chỉ là con số trên màn hình do kẻ gian kiểm soát. Mỗi khoản "phí để rút" là một lần mất thêm. Thiệt hại trung bình mỗi đơn trình báo trong báo cáo FBI: 5,8 tỷ ÷ 41.557 ≈ 139.567 USD.' },
      { type: 'p', text: '<strong>Nhóm kèo và "chuyên gia" gọi vốn</strong>: nhóm Telegram, Zalo, Facebook khoe ảnh lãi, có "trợ lý" nhắn riêng, mời vào gói VIP hoặc nhận ủy thác vốn với cam kết lợi nhuận hàng tháng. Ảnh lãi dễ làm giả; lệnh thua thì không bao giờ được đăng.' },
      { type: 'p', text: '<strong>Pump and dump (thổi giá rồi xả)</strong>: một nhóm gom một altcoin thanh khoản mỏng, sau đó hô hào để người khác mua đuổi, đẩy giá lên, rồi bán ra cho chính những người vào sau. Giá sụp, người mua cuối chịu lỗ.' },
      { type: 'figure', name: 'market-cycle', caption: 'Pump and dump là một chu kỳ tích lũy, tăng giá, phân phối, giảm giá bị nén lại trong vài giờ hoặc vài ngày. Người hô hào đã gom ở giai đoạn tích lũy và bán ở giai đoạn phân phối.' },
      { type: 'example', title: 'Bài học Việt Nam: iFan và Pincoin', text: 'Năm 2018, Công ty Modern Tech (TP.HCM) liên quan đến hai dự án tiền ảo iFan và Pincoin bị tố chiếm đoạt khoảng 15.000 tỷ đồng của khoảng 32.000 người; Bộ Công an vào cuộc điều tra. Mô hình quen thuộc: cam kết lợi nhuận cố định hàng tháng, trả lãi ban đầu để tạo niềm tin, thưởng cho người giới thiệu thêm thành viên.' },
      { type: 'scenario', title: 'Tin nhắn từ "chuyên gia"', setup: 'Một tài khoản lạ nhắn qua mạng xã hội, rất lịch sự, gửi ảnh lãi 300% trong tháng và mời vào nhóm kèo VIP, "vốn nhỏ cũng được, có người hỗ trợ đặt lệnh".',
        bad: 'Anh G tham gia, thấy vài kèo đầu có lãi nhỏ. Trợ lý gợi ý nạp vào một ứng dụng "sàn đối tác" để được "hỗ trợ tốt hơn". Anh nạp 50 triệu, số dư tăng đẹp, đến khi rút thì bị yêu cầu nộp phí. Anh vay thêm để nộp và mất cả hai khoản.',
        good: 'Chị H áp dụng quy tắc: cam kết lợi nhuận, thúc giục, yêu cầu nạp vào nền tảng lạ là ba cờ đỏ. Chị không trả lời, chặn tài khoản, báo cáo trên nền tảng. Chị chỉ giao dịch trên nền tảng tự kiểm tra, theo kế hoạch của mình.' },

      { type: 'h', text: 'Cờ đỏ và việc cần làm khi nghi ngờ' },
      { type: 'list', items: [
        'Cam kết lợi nhuận cố định hoặc "không thể thua"',
        'Thúc giục: "chỉ còn hôm nay", "slot VIP có hạn"',
        'Yêu cầu nạp vào ứng dụng hoặc đường link lạ thay vì sàn bạn tự tìm',
        'Đòi phí, thuế, tiền "xác minh" trước khi cho rút',
        'Hỏi seed phrase, mã 2FA, hoặc yêu cầu cài phần mềm điều khiển máy từ xa',
        'Thưởng lớn cho việc kéo thêm người tham gia'
      ] },
      { type: 'steps', items: [
        { title: 'Dừng chuyển tiền ngay', text: 'Không nộp thêm bất kỳ khoản "phí rút" nào.' },
        { title: 'Khóa và đổi bảo mật', text: 'Đổi mật khẩu, thu hồi phiên đăng nhập, dùng chức năng khóa tài khoản của sàn nếu nghi bị xâm nhập; chuyển tài sản còn lại sang ví mới nếu seed phrase bị lộ.' },
        { title: 'Lưu bằng chứng', text: 'Chụp tin nhắn, địa chỉ ví, mã giao dịch (TxID), tên miền.' },
        { title: 'Báo cáo', text: 'Liên hệ bộ phận hỗ trợ chính thức của sàn và trình báo cơ quan công an nơi cư trú.' },
        { title: 'Cảnh giác lừa đảo lần hai', text: 'Những người hứa "lấy lại tiền" sau khi bạn bị lừa thường cũng là lừa đảo.' }
      ] }
    ],
    keyPoints: [
      'Ai giữ khóa người đó giữ tài sản; seed phrase không bao giờ được nhập hay gửi cho ai.',
      'Bộ tối thiểu: email riêng, 2FA bằng ứng dụng, whitelist rút tiền kèm thời gian chờ địa chỉ mới.',
      'Approve độc hại cho phép rút sạch token; chỉ cấp quyền cần thiết và định kỳ thu hồi.',
      'Pig butchering gây 5,8 tỷ USD thiệt hại tại Mỹ năm 2024 theo FBI; dấu hiệu chính là đòi phí để rút.',
      'Cam kết lợi nhuận, thúc giục, nền tảng lạ, kéo người tham gia là cờ đỏ; vụ iFan/Pincoin là ví dụ tại Việt Nam.'
    ],
    practice: [
      'Kiểm tra tài khoản sàn của bạn theo checklist trong bài; bật 2FA bằng ứng dụng và whitelist rút tiền nếu chưa có.',
      'Lưu dấu trang (bookmark) địa chỉ chính thức của sàn và từ nay chỉ truy cập qua dấu trang.',
      'Nếu có ví tự lưu ký, mở công cụ quản lý quyền, liệt kê các quyền đã cấp và thu hồi quyền không còn dùng.',
      'Rời hoặc tắt thông báo mọi nhóm kèo đang cam kết lợi nhuận hoặc kêu gọi ủy thác vốn.'
    ],
    quiz: [
      { q: 'Một nhóm chat hô hào mua gấp một altcoin nhỏ "sắp x10", giá đã tăng 60% trong 2 giờ. Đây nhiều khả năng là gì?', options: ['Tín hiệu mua an toàn vì nhiều người cùng mua', 'Airdrop miễn phí', 'Proof of reserves', 'Dấu hiệu pump and dump: người hô đã gom trước và cần người mua sau để xả'], answer: 3, explain: 'Hô hào gấp trên coin thanh khoản mỏng sau khi giá đã tăng mạnh là mô hình pump and dump. Đám đông mua không làm lệnh an toàn hơn, mà thường là thanh khoản cho người xả. Airdrop và proof of reserves là khái niệm không liên quan.' },
      { q: 'Nền tảng đầu tư báo số dư của bạn là 10.000 USDT (đã nạp 3.000) và yêu cầu nộp "thuế" 15% trước khi rút. Nếu nộp, tổng tiền thật bạn đã chuyển là bao nhiêu và điều gì nhiều khả năng xảy ra?', options: ['4.500 USDT, và bạn vẫn không rút được', '1.500 USDT, và bạn nhận 10.000 USDT', '3.000 USDT, vì thuế được trừ vào số dư', '13.000 USDT, và nền tảng hoàn thuế sau'], answer: 0, explain: 'Thuế đòi nộp: 10.000 × 15% = 1.500; tổng đã chuyển 3.000 + 1.500 = 4.500 USDT. Đây là dấu hiệu điển hình của pig butchering: số dư chỉ là con số trên màn hình và yêu cầu phí sẽ tiếp tục. Các lựa chọn khác tính sai hoặc tin vào lời hứa của nền tảng.' },
      { q: 'Một "nhân viên hỗ trợ" nhắn tin nói ví của bạn bị lỗi đồng bộ và cần seed phrase để sửa. Bạn nên làm gì?', options: ['Gửi seed phrase vì họ có logo chính thức', 'Chỉ gửi 12 từ đầu của cụm 24 từ', 'Từ chối, chặn và báo cáo; không ai chính thống hỏi seed phrase', 'Gửi qua email thay vì tin nhắn cho an toàn'], answer: 2, explain: 'Seed phrase cho toàn quyền với ví, không tổ chức chính thống nào hỏi nó. Logo dễ giả mạo; gửi một nửa vẫn làm giảm mạnh độ an toàn và cho thấy bạn là mục tiêu dễ; đổi kênh gửi không thay đổi việc bạn đang giao chìa khóa cho kẻ lạ.' },
      { q: 'Tính năng nào giúp bạn có thời gian phản ứng nếu kẻ gian vào được tài khoản sàn và thêm địa chỉ rút tiền của chúng?', options: ['Lệnh OCO', 'Whitelist rút tiền kèm giới hạn thời gian cho địa chỉ mới', 'Chế độ tối (dark mode)', 'Tăng đòn bẩy'], answer: 1, explain: 'Whitelist chỉ cho rút về địa chỉ đã duyệt, và thời gian chờ 24–72 giờ với địa chỉ mới khiến tiền chưa thể bị rút ngay. OCO là loại lệnh giao dịch; dark mode là giao diện; đòn bẩy không liên quan đến bảo mật và còn tăng rủi ro.' }
    ],
    sources: [
      { title: 'FBI Internet Crime Complaint Center 2024 IC3 Annual Report', url: 'https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf', note: 'FBI, 2025, tiếng Anh' },
      { title: 'Web3 Wallet Security: The Risks of Approving Smart Contract Transactions', url: 'https://www.binance.com/en/blog/security/web3-wallet-security-the-risks-of-approving-smart-contract-transactions-4317275693972329667', note: 'Binance Blog, tiếng Anh' },
      { title: 'How to Enable Withdrawal Whitelist on Binance', url: 'https://www.binance.com/en/support/faq/how-to-enable-withdrawal-whitelist-on-binance-1d08944f103b4fc78d3519913b600086', note: 'Binance Support, tiếng Anh' },
      { title: 'Nhà đầu tư vào tiền ảo iFan kêu bị lừa 15.000 tỷ đồng', url: 'https://vnexpress.net/nha-dau-tu-vao-tien-ao-ifan-keu-bi-lua-15-000-ty-dong-3734520.html', note: 'VnExpress, 2018, tiếng Việt' }
    ],
    updated: '2026-09'
  },

  'c1-b6': {
    duration: 8,
    level: 'Cơ bản',
    summary: 'Khung pháp lý và thuế tài sản mã hóa tại Việt Nam tính đến 27/09/2026: Luật 71/2025, Nghị quyết 05/2025, Nghị định 284/2026, Thông tư 32/2026, và vị trí của futures.',
    goals: [
      'Nắm được bốn văn bản chính, số hiệu, ngày hiệu lực và nội dung cốt lõi',
      'Hiểu điều kiện "6 tháng sau khi tổ chức đầu tiên được cấp phép" và mức phạt',
      'Tính được thuế TNCN 0,1% trên từng lần chuyển nhượng',
      'Biết futures trên sàn nước ngoài nằm ngoài khung thí điểm và rủi ro pháp lý đi kèm'
    ],
    blocks: [
      { type: 'callout', tone: 'note', title: 'Trạng thái tính đến 27/09/2026, không phải tư vấn pháp lý', text: 'Bài này tóm tắt văn bản đã công bố và thông tin báo chí chính thống tính đến ngày 27/09/2026. Khung pháp lý đang thay đổi nhanh. Trước khi hành động, hãy kiểm tra văn bản mới nhất trên cổng thông tin Chính phủ và Ủy ban Chứng khoán Nhà nước, và hỏi luật sư nếu tình huống của bạn phức tạp.' },

      { type: 'h', text: 'Bốn văn bản bạn cần biết' },
      { type: 'table', head: ['Văn bản', 'Ngày', 'Nội dung chính'], rows: [
        ['Luật Công nghiệp công nghệ số số 71/2025/QH15', 'Hiệu lực 01/01/2026', 'Lần đầu định nghĩa "tài sản số", "tài sản mã hóa" trong luật'],
        ['Nghị quyết 05/2025/NQ-CP', 'Ban hành 09/09/2025, hiệu lực ngay', 'Thí điểm 5 năm thị trường tài sản mã hóa; giao dịch bằng Đồng Việt Nam; chỉ tổ chức được Bộ Tài chính cấp phép mới được cung cấp dịch vụ'],
        ['Thông tư 32/2026/TT-BTC', 'Ngày 27/03/2026', 'Thuế TNCN 0,1% trên giá chuyển nhượng từng lần qua tổ chức cung cấp dịch vụ; không chịu thuế GTGT'],
        ['Nghị định 284/2026/NĐ-CP', 'Ban hành 7/2026, hiệu lực 01/09/2026', 'Mức phạt hành chính: nhà đầu tư trong nước giao dịch không qua tổ chức được cấp phép bị phạt 30–50 triệu đồng']
      ] },
      { type: 'p', text: 'Luật 71/2025/QH15 tạo nền tảng khái niệm: tài sản mã hóa được luật gọi tên. Nghị quyết 05 là khung vận hành cho giai đoạn thí điểm. Thông tư 32 xử lý thuế. Nghị định 284 là chế tài. Bốn mảnh này ghép lại thành bức tranh hiện tại.' },

      { type: 'h', text: 'Nghị quyết 05/2025/NQ-CP: thị trường thí điểm vận hành thế nào' },
      { type: 'list', items: [
        'Thời gian thí điểm: <strong>5 năm</strong>.',
        'Chào bán, phát hành, giao dịch, thanh toán tài sản mã hóa phải bằng <strong>Đồng Việt Nam</strong>.',
        'Chỉ tổ chức được <strong>Bộ Tài chính cấp phép</strong> mới được cung cấp dịch vụ và quảng cáo, tiếp thị tài sản mã hóa.',
        'Sàn phải có vốn điều lệ tối thiểu <strong>10.000 tỷ đồng</strong>, tối thiểu 65% vốn do tổ chức góp, sở hữu nước ngoài tối đa 49%.',
        'Nhà đầu tư trong nước đang có tài sản mã hóa và nhà đầu tư nước ngoài được mở tài khoản tại tổ chức được cấp phép để lưu ký, mua, bán.',
        'Dịch vụ được phép: tổ chức thị trường giao dịch, tự doanh, lưu ký, nền tảng phát hành.',
        '<strong>Sau 6 tháng kể từ khi tổ chức đầu tiên được cấp phép</strong>, nhà đầu tư trong nước giao dịch không qua tổ chức được cấp phép sẽ bị xử phạt hành chính hoặc truy cứu trách nhiệm hình sự tùy mức độ.',
        'Thuế áp dụng như chứng khoán cho đến khi có chính sách riêng.'
      ] },

      { type: 'h', text: 'Nghị định 284/2026/NĐ-CP: mức phạt và điều kiện 6 tháng' },
      { type: 'table', head: ['Hành vi', 'Mức phạt'], rows: [
        ['Nhà đầu tư trong nước giao dịch không qua tổ chức được Bộ Tài chính cấp phép', '30–50 triệu đồng'],
        ['Giao dịch tài sản mã hóa chỉ dành cho nhà đầu tư nước ngoài', '70–100 triệu đồng'],
        ['Cung cấp dịch vụ hoặc quảng cáo tài sản mã hóa khi chưa được cấp phép', '180–200 triệu đồng (mức cho tổ chức; cá nhân bằng 1/2)']
      ] },
      { type: 'p', text: 'Nghị định có hiệu lực từ 01/09/2026, nhưng mức phạt với nhà đầu tư gắn với điều kiện của Nghị quyết 05. Theo Báo Thanh Niên ngày 01/09/2026, ông Tô Trần Hòa (Ủy ban Chứng khoán Nhà nước) cho biết khi Việt Nam <strong>chưa có sàn được cấp phép chính thức</strong> thì nhà đầu tư chưa bị xử phạt; mức phạt chỉ áp dụng sau 6 tháng kể từ khi sàn đầu tiên được cấp phép.' },
      { type: 'p', text: 'Về tình trạng cấp phép: tháng 5/2026, Bộ Tài chính xác nhận 5 hồ sơ hợp lệ vòng 1 (VIX, Dịch vụ Tài sản số Việt Nam, Việt Nam Thịnh Vượng, Lộc Phát Việt Nam, Techcom). Tính đến ngày biên soạn, các nguồn chúng tôi kiểm tra chưa ghi nhận tổ chức nào được cấp phép chính thức. Ngày cấp phép đầu tiên là mốc bạn cần theo dõi, vì đồng hồ 6 tháng bắt đầu chạy từ đó.' },
      { type: 'example', title: 'Đếm mốc thời gian (giả định)', text: 'Giả sử tổ chức đầu tiên được cấp phép ngày 15/11/2026. Sáu tháng sau là 15/05/2027. Từ sau mốc đó, nếu bạn là nhà đầu tư trong nước và vẫn giao dịch qua nền tảng không được cấp phép, bạn có thể bị phạt 30–50 triệu đồng. Ngày 15/11/2026 chỉ là ví dụ; hãy theo dõi thông báo chính thức để biết mốc thật.' },
      { type: 'callout', tone: 'risk', title: 'Mức phạt so với tài khoản nhỏ', text: 'Với tài khoản 20 triệu đồng, chỉ riêng mức phạt tối thiểu 30 triệu đồng đã bằng 150% số vốn. Rủi ro pháp lý có thể lớn hơn rủi ro giá.' },

      { type: 'h', text: 'Thuế: 0,1% trên từng lần chuyển nhượng' },
      { type: 'p', text: 'Theo Thông tư 32/2026/TT-BTC, cá nhân (cư trú hay không cư trú) chuyển nhượng tài sản mã hóa qua tổ chức cung cấp dịch vụ nộp thuế TNCN <strong>0,1% trên giá chuyển nhượng từng lần</strong>. Thuế tính trên giá trị bán, không phải trên lãi, nên bán lỗ vẫn phải nộp. Chuyển nhượng tài sản mã hóa không chịu thuế GTGT. Tổ chức Việt Nam nộp thuế TNDN 20% trên thu nhập.' },
      { type: 'calc', title: 'Thuế TNCN theo tần suất giao dịch (giả định)', rows: [
        ['Một lần bán trị giá 50 triệu đồng', '50.000.000 × 0,1% = 50.000 đồng'],
        ['Mua 20 triệu, bán lỗ còn 18 triệu', '18.000.000 × 0,1% = 18.000 đồng (vẫn nộp dù lỗ)'],
        ['20 lần bán/tháng, mỗi lần 20 triệu', '20 × 20.000.000 = 400.000.000 đồng giá trị bán'],
        ['Thuế tháng đó', '400.000.000 × 0,1% = 400.000 đồng']
      ], result: 'Thuế 0,1% cộng với phí giao dịch của sàn làm chi phí mỗi vòng tăng lên. Giao dịch càng dày, chi phí càng lớn, giống bài học về phí ở bài 1.4.' },

      { type: 'h', text: 'Futures trên sàn nước ngoài nằm ở đâu' },
      { type: 'p', text: 'Nói thẳng: <strong>Nghị quyết 05/2025/NQ-CP không đề cập giao dịch phái sinh hay hợp đồng tương lai</strong>. Các dịch vụ được phép chỉ gồm tổ chức thị trường giao dịch, tự doanh, lưu ký và nền tảng phát hành. Vì vậy, futures crypto trên sàn nước ngoài <strong>nằm ngoài khung thí điểm</strong>.' },
      { type: 'p', text: 'Hệ quả: khi chế tài có hiệu lực thực tế (sau 6 tháng kể từ khi tổ chức đầu tiên được cấp phép), nhà đầu tư trong nước giao dịch ngoài các tổ chức được cấp phép, kể cả futures trên sàn nước ngoài, <strong>có thể bị xử phạt</strong> theo Nghị định 284. Trước mốc đó, theo phát biểu của đại diện Ủy ban Chứng khoán Nhà nước, nhà đầu tư chưa bị phạt, nhưng điều đó không có nghĩa là hoạt động này được pháp luật công nhận hay bảo vệ.' },
      { type: 'list', items: [
        'Bạn không được cơ quan Việt Nam bảo vệ nếu sàn nước ngoài đóng băng tài khoản, phá sản hay có tranh chấp.',
        'Nạp và rút tiền qua kênh trung gian (P2P) có thêm rủi ro lừa đảo và rủi ro tài khoản ngân hàng bị phong tỏa.',
        'Futures có đòn bẩy nên rủi ro mất toàn bộ ký quỹ đã cao sẵn, cộng thêm rủi ro pháp lý.'
      ] },
      { type: 'figure', name: 'leverage-liquidation', caption: 'Đòn bẩy càng cao, khoảng cách tới giá thanh lý càng ngắn. Futures vừa có rủi ro thanh lý, vừa nằm ngoài khung thí điểm của Nghị quyết 05.' },
      { type: 'scenario', title: 'Khi nghe tin "từ 1/9 chơi sàn nước ngoài bị phạt"', setup: 'Hai người đang giao dịch futures trên một sàn nước ngoài, cùng đọc tin về Nghị định 284.',
        bad: 'Anh K đọc tiêu đề trên mạng, hoảng hốt đóng hết vị thế giữa lúc thua lỗ, chuyển tiền qua một người bán P2P lạ để "rút cho nhanh" và bị lừa một phần. Vài tuần sau lại nghe "chưa phạt đâu", anh quay lại tăng đòn bẩy để gỡ.',
        good: 'Chị L đọc văn bản gốc và nguồn chính thống, ghi lại ba điều: chế tài gắn với mốc 6 tháng sau khi tổ chức đầu tiên được cấp phép; futures không nằm trong khung thí điểm; chưa có sàn được cấp phép tính đến thời điểm đọc. Chị giảm quy mô, chỉ luyện futures trên Demo Trading, đặt lịch kiểm tra tin cấp phép mỗi tháng và lên kế hoạch chuyển sang nền tảng được cấp phép khi có.' },
      { type: 'checklist', title: 'Việc cần làm hàng tháng', items: [
        'Kiểm tra cổng thông tin Chính phủ, Bộ Tài chính, Ủy ban Chứng khoán Nhà nước về danh sách tổ chức được cấp phép',
        'Ghi lại ngày cấp phép đầu tiên (nếu có) và tính mốc 6 tháng',
        'Rà soát nơi bạn đang giữ tài sản và giao dịch có còn phù hợp quy định',
        'Lưu lịch sử giao dịch để phục vụ nghĩa vụ thuế khi cần'
      ] }
    ],
    keyPoints: [
      'Luật 71/2025/QH15 (hiệu lực 01/01/2026) định nghĩa tài sản mã hóa; Nghị quyết 05/2025/NQ-CP (09/09/2025) thí điểm 5 năm, giao dịch bằng VND qua tổ chức được cấp phép.',
      'Nghị định 284/2026/NĐ-CP (hiệu lực 01/09/2026): phạt 30–50 triệu đồng nếu giao dịch không qua tổ chức được cấp phép, áp dụng sau 6 tháng kể từ khi tổ chức đầu tiên được cấp phép.',
      'Thông tư 32/2026/TT-BTC: thuế TNCN 0,1% trên giá chuyển nhượng từng lần, kể cả khi bán lỗ.',
      'Nghị quyết 05 không đề cập phái sinh: futures trên sàn nước ngoài nằm ngoài khung thí điểm và có thể bị phạt khi chế tài có hiệu lực.',
      'Tính đến 27/09/2026 chưa ghi nhận sàn được cấp phép chính thức; đây không phải tư vấn pháp lý, hãy tự kiểm tra cập nhật.'
    ],
    practice: [
      'Mở toàn văn Nghị quyết 05/2025/NQ-CP trên cổng Chính phủ, tìm và đánh dấu đoạn quy định về 6 tháng và các dịch vụ được phép.',
      'Tính thuế TNCN bạn sẽ nộp trong một tháng nếu giao dịch theo thói quen hiện tại qua tổ chức được cấp phép (tổng giá trị bán × 0,1%).',
      'Liệt kê mọi nơi bạn đang giữ tài sản mã hóa, đánh dấu nơi nào nằm ngoài khung thí điểm.',
      'Đặt lịch nhắc hàng tháng kiểm tra thông tin cấp phép sàn.'
    ],
    quiz: [
      { q: 'Nhận định nào đúng về futures crypto trên sàn nước ngoài theo khung hiện tại?', options: ['Được Nghị quyết 05 cho phép rõ ràng', 'Nghị quyết 05 không đề cập phái sinh, nên futures nằm ngoài khung thí điểm', 'Chỉ bị cấm với nhà đầu tư nước ngoài', 'Được miễn thuế và miễn phạt vĩnh viễn'], answer: 1, explain: 'Nghị quyết 05 chỉ liệt kê tổ chức thị trường giao dịch, tự doanh, lưu ký, nền tảng phát hành, không nhắc phái sinh. Vì vậy futures không thuộc khung thí điểm. Không có quy định cho phép rõ ràng, không có quy định chỉ cấm người nước ngoài, và không có miễn trừ vĩnh viễn.' },
      { q: 'Hành vi nào có mức phạt cao nhất theo Nghị định 284/2026/NĐ-CP (mức cho tổ chức)?', options: ['Nhà đầu tư trong nước giao dịch không qua tổ chức được cấp phép', 'Giao dịch tài sản mã hóa chỉ dành cho nhà đầu tư nước ngoài', 'Không lưu lịch sử giao dịch', 'Cung cấp dịch vụ hoặc quảng cáo tài sản mã hóa khi chưa được cấp phép'], answer: 3, explain: 'Cung cấp dịch vụ hoặc quảng cáo khi chưa được cấp phép bị phạt 180–200 triệu đồng (mức cho tổ chức). Giao dịch không qua tổ chức được cấp phép là 30–50 triệu; giao dịch tài sản chỉ dành cho nhà đầu tư nước ngoài là 70–100 triệu. "Không lưu lịch sử giao dịch" không phải mức phạt được nêu trong bài.' },
      { q: 'Theo Nghị quyết 05/2025/NQ-CP, khi nào nhà đầu tư trong nước giao dịch không qua tổ chức được cấp phép bắt đầu bị xử phạt?', options: ['Ngay từ 09/09/2025', 'Từ 01/01/2026 khi Luật 71 có hiệu lực', 'Sau 6 tháng kể từ khi tổ chức đầu tiên được cấp phép', 'Không bao giờ bị xử phạt'], answer: 2, explain: 'Nghị quyết 05 quy định mốc 6 tháng kể từ khi tổ chức đầu tiên được cấp phép; đại diện UBCKNN cũng xác nhận điều này. 09/09/2025 là ngày ban hành nghị quyết; 01/01/2026 là ngày Luật 71 có hiệu lực, không phải mốc chế tài; "không bao giờ" sai vì đã có Nghị định 284 quy định mức phạt.' },
      { q: 'Bạn bán tài sản mã hóa qua tổ chức được cấp phép 3 lần trong tháng, lần lượt 10 triệu, 25 triệu và 15 triệu đồng. Thuế TNCN theo Thông tư 32/2026/TT-BTC là bao nhiêu?', options: ['50.000 đồng', '500.000 đồng', '5.000 đồng', 'Chỉ nộp nếu tổng có lãi'], answer: 0, explain: 'Tổng giá trị chuyển nhượng 50 triệu × 0,1% = 50.000 đồng. 500.000 đồng là nhầm thành 1%; 5.000 đồng là nhầm thành 0,01%. Thuế tính trên giá chuyển nhượng từng lần, không phụ thuộc lãi hay lỗ.' }
    ],
    sources: [
      { title: 'Luật Công nghiệp công nghệ số 2025 số 71/2025/QH15', url: 'https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Luat-Cong-nghiep-cong-nghe-so-2025-so-71-2025-QH15-621341.aspx', note: 'Thư viện Pháp luật, tiếng Việt' },
      { title: 'Toàn văn Nghị quyết số 05/2025/NQ-CP về triển khai thí điểm thị trường tài sản mã hóa tại Việt Nam', url: 'https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-5-2025-nq-cp-ve-trien-khai-thi-diem-thi-truong-tai-san-ma-hoa-tai-viet-nam-119250909184045221.htm', note: 'Cổng Thông tin điện tử Chính phủ, 09/09/2025, tiếng Việt' },
      { title: 'Cách tính thuế đối với tài sản mã hóa tại Việt Nam năm 2026', url: 'https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/chinh-sach-moi/109643/cach-tinh-thue-doi-voi-tai-san-ma-hoa-tai-viet-nam-nam-2026', note: 'Thư viện Pháp luật, về Thông tư 32/2026/TT-BTC, tiếng Việt' },
      { title: 'Cung cấp dịch vụ liên quan đến tài sản mã hóa khi chưa được cấp phép bị phạt tới 200 triệu đồng', url: 'https://baochinhphu.vn/cung-cap-dich-vu-lien-quan-den-tai-san-ma-hoa-khi-chua-duoc-cap-phep-bi-phat-toi-200-trieu-dong-10226071715275345.htm', note: 'Báo Điện tử Chính phủ, 7/2026, về Nghị định 284/2026/NĐ-CP, tiếng Việt' },
      { title: 'Từ 1.9, nhà đầu tư cá nhân giao dịch tài sản mã hóa sẽ bị xử phạt?', url: 'https://thanhnien.vn/tu-19-nha-dau-tu-ca-nhan-giao-dich-tai-san-ma-hoa-se-bi-xu-phat-185260901090323003.htm', note: 'Báo Thanh Niên, 01/09/2026, tiếng Việt' },
      { title: 'Bộ Tài chính thông tin về 5 hồ sơ cấp phép sàn giao dịch tài sản mã hóa', url: 'https://vneconomy.vn/bo-tai-chinh-thong-tin-ve-5-ho-so-cap-phep-san-giao-dich-tai-san-ma-hoa.htm', note: 'VnEconomy, 5/2026, tiếng Việt' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
