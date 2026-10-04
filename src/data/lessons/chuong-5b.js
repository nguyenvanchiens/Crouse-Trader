const lessons = {
  'c5-b5': {
    duration: 15,
    level: 'Trung cấp',
    summary: 'Khung 3 lớp bối cảnh → vùng → kích hoạt, 3 setup có quy tắc rõ, thang điểm A/B/C và danh sách điều kiện cấm vào lệnh.',
    goals: [
      'Kiểm tra một biểu đồ theo đúng thứ tự 3 lớp: bối cảnh khung lớn, vùng giá, tín hiệu kích hoạt',
      'Nhận ra 3 setup chuẩn (pullback theo xu hướng, breakout-retest, đảo chiều tại vùng lớn) và biết dừng lỗ, mục tiêu của từng loại',
      'Chấm điểm một setup trên thang 10 và chỉ vào lệnh khi đạt hạng A',
      'Thuộc danh sách các tình huống KHÔNG được vào lệnh dù biểu đồ trông hấp dẫn'
    ],
    blocks: [
      { type: 'p', text: 'Phần lớn lệnh thua của người mới không đến từ việc đặt dừng lỗ sai, mà từ việc <strong>vào một lệnh không có lý do</strong>: thấy nến xanh dài thì mua, thấy người khác hô thì bán. Bài này biến "lý do vào lệnh" thành một bộ điều kiện viết sẵn. Nếu điều kiện chưa đủ, câu trả lời mặc định là: <strong>không làm gì</strong>. Đứng ngoài cũng là một vị thế, và là vị thế rẻ nhất.' },
      { type: 'callout', tone: 'risk', title: 'Setup đẹp vẫn có thể thua', text: 'Setup chỉ là tình huống có xác suất và tỷ lệ lời/lỗ nghiêng về phía bạn, không phải lời hứa. Setup hạng A vẫn thua nhiều lần liên tiếp. Vì vậy mọi setup trong bài này luôn đi kèm dừng lỗ cố định và rủi ro tối đa 0,5–1% tài khoản mỗi lệnh. Hãy luyện trên Binance Demo Trading (demo.binance.com) ít nhất vài chục lệnh trước khi dùng tiền thật.' },

      { type: 'h', text: 'Khung 3 lớp: bối cảnh → vùng → kích hoạt' },
      { type: 'p', text: 'Bạn dùng ba khung thời gian, mỗi khung trả lời đúng một câu hỏi. Ví dụ dùng xuyên suốt khóa học: <strong>D1 (nến ngày) cho bối cảnh, H4 (nến 4 giờ) cho vùng, H1 (nến 1 giờ) cho kích hoạt</strong>. Khung sau nhỏ hơn khung trước khoảng 4–6 lần. Người giao dịch nhanh hơn có thể dùng H4 → H1 → M15, nhưng giữ nguyên nguyên tắc: khung lớn quyết định hướng, khung nhỏ chỉ quyết định thời điểm.' },
      { type: 'figure', name: 'multi-timeframe', caption: 'D1 cho biết đi hướng nào, H4 cho biết đứng chờ ở đâu, H1 cho biết bóp cò lúc nào. Không bao giờ để H1 cãi lại D1.' },
      { type: 'steps', items: [
        { title: 'Lớp 1 - Bối cảnh (D1): chỉ được chọn một hướng', text: 'NẾU D1 tạo đỉnh sau cao hơn đỉnh trước và đáy sau cao hơn đáy trước (HH/HL) VÀ giá đóng cửa trên EMA 50 D1 THÌ chỉ tìm lệnh long. NẾU D1 tạo đỉnh thấp dần, đáy thấp dần (LH/LL) VÀ giá dưới EMA 50 D1 THÌ chỉ tìm lệnh short. NẾU không rõ (đi ngang, hai điều kiện mâu thuẫn) THÌ chỉ được dùng setup đảo chiều tại biên của vùng đi ngang, hoặc đứng ngoài.' },
        { title: 'Lớp 2 - Vùng (H4): chỉ chờ ở nơi có lý do', text: 'Vùng hợp lệ là một trong: (a) hỗ trợ/kháng cự đã được giá tôn trọng ít nhất 2 lần; (b) kháng cự cũ vừa bị phá, nay có thể thành hỗ trợ (hoặc ngược lại); (c) vùng tích lũy đi ngang dài trước một cú chạy mạnh. Vẽ vùng là một dải giá, không phải một đường mảnh. StockCharts nhắc rằng phân tích kỹ thuật không phải khoa học chính xác, giá có thể xuyên nhẹ qua hỗ trợ rồi quay lại, nên dùng vùng hợp lý hơn dùng một con số.' },
        { title: 'Lớp 3 - Kích hoạt (H1): chỉ vào khi giá chứng minh', text: 'Khi giá đã vào vùng H4, bạn chờ một trong hai tín hiệu trên H1: (a) nến xác nhận đóng cửa: nhấn chìm tăng, búa, hoặc nến có bóng dưới dài và thân đóng ở nửa trên (với long); (b) phá vỡ cấu trúc khung nhỏ (market structure break, MSB): trong nhịp điều chỉnh H1 đang tạo đỉnh thấp dần, một nến H1 đóng cửa trên đỉnh thấp gần nhất. Chưa có nến đóng cửa thì chưa có tín hiệu.' }
      ] },
      { type: 'p', text: 'Thứ tự là bắt buộc. Bạn không được bắt đầu từ lớp 3 ("thấy nến búa đẹp") rồi đi tìm lý do ở lớp 1. Richard Donchian, người được xem là cha đẻ của trường phái theo xu hướng, viết một nguyên tắc rất gần với khung này: khi giá ở trên đường xu hướng lớn đang đi lên, dùng các đường xu hướng nhỏ đi xuống để xác định nhịp điều chỉnh ngắn, và lấy việc giá phá lên các đường nhỏ đó làm tín hiệu mua.' },
      { type: 'figure', name: 'trend-structure', caption: 'Xu hướng tăng: đỉnh và đáy cao dần (HH/HL). Xu hướng giảm: đỉnh và đáy thấp dần (LH/LL). Đi ngang: không có chuỗi nào rõ.' },
      { type: 'callout', tone: 'tip', title: 'Định nghĩa MSB bằng một câu kiểm tra được', text: 'Với long: "Có một nến H1 đóng cửa cao hơn đỉnh gần nhất của nhịp điều chỉnh không?" Có thì MSB đã xảy ra. Râu nến vượt lên nhưng thân đóng dưới thì chưa tính. Với short thì ngược lại: nến H1 đóng cửa dưới đáy gần nhất của nhịp hồi.' },

      { type: 'h', text: 'Setup 1: pullback theo xu hướng (ưu tiên số 1)' },
      { type: 'p', text: 'Đây là setup dễ nhất vì bạn đi cùng dòng chảy lớn và mua ở chỗ giá đang "rẻ tạm thời" trong xu hướng. Theo Dow Theory mà StockCharts tóm tắt, trong một thị trường tăng, các nhịp giảm ngược chiều là điều chỉnh của xu hướng chính; bạn tìm điểm kết thúc của nhịp điều chỉnh đó.' },
      { type: 'table', head: ['Thành phần', 'Quy tắc (ví dụ cho long; short làm ngược lại)'], rows: [
        ['Điều kiện bắt buộc', 'D1 là HH/HL và giá trên EMA 50 D1. Trên H4 giá đã điều chỉnh về một vùng hợp lệ: hỗ trợ cũ, đáy HL gần nhất, hoặc vùng quanh EMA 20/50 H4. Nhịp điều chỉnh đi chậm hơn nhịp tăng trước đó (nến nhỏ hơn, volume thấp hơn).'],
        ['Tín hiệu kích hoạt', 'Trên H1: MSB (nến đóng trên đỉnh thấp gần nhất của nhịp điều chỉnh) hoặc nến nhấn chìm tăng/búa đóng cửa trong vùng.'],
        ['Dừng lỗ', 'Dưới đáy thấp nhất của nhịp điều chỉnh (đáy tạo ra trong vùng) cộng thêm vùng đệm khoảng 0,2–0,5 × ATR. Xem cách tính ở bài 5.7.'],
        ['Mục tiêu', 'Mục tiêu 1: đỉnh gần nhất của xu hướng trên H4. Mục tiêu 2: vùng kháng cự tiếp theo trên D1. Khoảng cách tới mục tiêu 1 phải từ 2R trở lên.'],
        ['Lỗi thường gặp', 'Mua khi giá đang rơi mạnh chưa có nến đóng xác nhận ("bắt dao rơi"). Nhầm một cú sập phá vỡ đáy HL trên D1 thành pullback: nếu D1 đóng cửa dưới đáy HL gần nhất, xu hướng tăng đã bị nghi ngờ, setup hủy.']
      ] },
      { type: 'example', title: 'Pullback long BTC (giá giả định)', text: 'D1: BTC tạo đáy 72.000 rồi đỉnh 84.000, đáy sau 76.000 cao hơn đáy trước; giá trên EMA 50 D1. H4: giá điều chỉnh từ 84.000 về vùng hỗ trợ cũ 79.600–80.400 (từng là kháng cự bị phá). H1: nhịp điều chỉnh có đỉnh thấp gần nhất 80.600; đáy nhịp là 79.700. Nến H1 đóng cửa ở 80.750, cao hơn 80.600: MSB xác nhận. Vào quanh 80.750, dừng lỗ dưới 79.700 cộng vùng đệm. Mục tiêu 1 là đỉnh 84.000.' },

      { type: 'h', text: 'Setup 2 và 3: breakout-retest và đảo chiều tại vùng lớn' },
      { type: 'p', text: '<strong>Breakout-retest (phá vỡ rồi kiểm tra lại)</strong> dựa trên hiện tượng mà StockCharts mô tả: khi một kháng cự bị phá, quan hệ cung cầu đã thay đổi, và kháng cự cũ có thể trở thành hỗ trợ. Bạn không mua lúc giá vừa phá vỡ (dễ dính phá vỡ giả), mà chờ giá quay lại chạm vùng vừa phá và chứng minh nó giữ được.' },
      { type: 'figure', name: 'breakout-retest', caption: 'Giá phá kháng cự, quay lại kiểm tra đúng vùng đó, kháng cự cũ đóng vai hỗ trợ. Điểm vào là lúc kiểm tra thành công, không phải lúc phá vỡ.' },
      { type: 'table', head: ['Thành phần', 'Breakout-retest (long)', 'Đảo chiều tại vùng lớn (short tại kháng cự D1)'], rows: [
        ['Điều kiện bắt buộc', 'Vùng kháng cự H4/D1 đã bị chặn ít nhất 2 lần. Nến H4 đóng cửa rõ ràng trên vùng (không chỉ râu), volume cao hơn trung bình. Bối cảnh D1 không ngược chiều.', 'Vùng kháng cự D1 lớn (đỉnh cũ, vùng phân phối) đã chặn giá nhiều lần. Giá tiến vào vùng với đà yếu dần: nến nhỏ dần hoặc phân kỳ giảm RSI trên H4. Đây là setup ngược xu hướng nên cần nhiều bằng chứng nhất.'],
        ['Tín hiệu kích hoạt', 'Giá quay lại vùng vừa phá, trên H1 xuất hiện nến từ chối (bóng dưới dài, đóng trên vùng) hoặc MSB đi lên.', 'Trên H4 giá thất bại tại vùng (nến sao băng, nhấn chìm giảm đóng cửa), SAU ĐÓ H1 phá vỡ cấu trúc đi xuống: nến đóng dưới đáy gần nhất. Cần cả hai.'],
        ['Dừng lỗ', 'Dưới đáy của nhịp kiểm tra lại, hoặc dưới mép dưới của vùng đã phá, cộng vùng đệm. Nếu giá đóng H4 quay lại hẳn dưới vùng thì phá vỡ đã thất bại.', 'Trên đỉnh cao nhất tạo ra trong vùng kháng cự cộng vùng đệm. Không đặt ngay mép trên của vùng, vì vùng lớn thường bị quét râu.'],
        ['Mục tiêu', 'Mục tiêu tối thiểu: đỉnh vừa tạo sau phá vỡ. Mục tiêu 2: vùng kháng cự tiếp theo.', 'Mục tiêu 1: hỗ trợ H4 gần nhất bên dưới. Chốt một phần sớm hơn setup thuận xu hướng (xem bài 5.8).'],
        ['Lỗi thường gặp', 'Đuổi mua ngay cây nến phá vỡ. Coi mọi lần xuyên qua vùng là phá vỡ thật. Chờ retest mãi dù giá đã chạy xa: không có retest thì bỏ lệnh.', 'Short chỉ vì "tăng nhiều quá rồi". Vào khi mới có tín hiệu H1 mà H4 chưa thất bại. Dùng khối lượng như lệnh thuận xu hướng: nên giảm còn một nửa rủi ro (0,5% thay vì 1%).']
      ] },
      { type: 'callout', tone: 'warn', title: 'Vì sao đảo chiều là setup khó nhất', text: 'Bạn đang đứng chắn trước một xu hướng đang chạy. Xu hướng thường đi xa hơn người ta nghĩ, và mỗi lần "bắt đỉnh" hụt là một khoản lỗ. Người mới nên làm thành thạo setup 1 và 2 trên Demo trước, chỉ thêm setup 3 khi nhật ký cho thấy bạn đã có kỷ luật. Short trong futures còn có rủi ro short squeeze và funding (xem bài 5.11).' },

      { type: 'callout', tone: 'warn', title: 'Setup là khung tư duy, chưa phải lợi thế đã chứng minh', text: 'Ba setup trong bài giúp bạn vào lệnh có lý do, có điểm sai rõ ràng và có dừng lỗ đúng chỗ. Nhưng chúng chưa được chứng minh là có kỳ vọng dương. Khóa học đã backtest một phiên bản cụ thể của setup pullback theo xu hướng (hệ thống mẫu bài 7.1) trên dữ liệu thật 2020–2026: kết quả gần hoà vốn sau phí và không hơn vào lệnh ngẫu nhiên (<a href="/bai-hoc/c7-b2">xem bài 7.2</a>). Vì vậy, trước khi dùng tiền thật, hãy tự viết quy tắc của bạn thành số, backtest và forward test.' },
      { type: 'h', text: 'Chấm điểm chất lượng setup: chỉ vào hạng A' },
      { type: 'p', text: 'Mắt người rất giỏi nhìn thấy điều mình muốn thấy. Thang điểm dưới đây buộc bạn trả lời từng câu có/không trước khi bấm nút. Chấm trên giấy hoặc trong nhật ký, không chấm trong đầu.' },
      { type: 'table', head: ['Tiêu chí', 'Điểm', 'Cách chấm'], rows: [
        ['1. Bối cảnh D1 rõ và cùng hướng lệnh', '0 hoặc 2', '2 nếu cấu trúc HH/HL (hoặc LH/LL) VÀ vị trí so với EMA 50 D1 cùng chiều lệnh. 0 nếu chỉ một điều kiện hoặc mâu thuẫn.'],
        ['2. Vùng H4 hợp lệ', '0, 1 hoặc 2', '2 nếu vùng được tôn trọng từ 2 lần trở lên hoặc là vùng vừa phá vỡ rõ ràng. 1 nếu chỉ chạm 1 lần. 0 nếu giá đang ở giữa hai vùng.'],
        ['3. Kích hoạt H1 đã đóng nến', '0 hoặc 2', '2 nếu có MSB hoặc nến xác nhận ĐÃ ĐÓNG. 0 nếu nến đang chạy hoặc chưa có tín hiệu.'],
        ['4. R:R tới vùng cản gần nhất', '0, 1 hoặc 2', '2 nếu từ 2R trở lên; 1 nếu 1,5–2R; 0 nếu dưới 1,5R.'],
        ['5. Lịch và dữ liệu phái sinh', '0 hoặc 1', '1 nếu thời điểm vào lệnh không nằm trong khoảng 30 phút trước đến 30 phút sau tin lớn (CPI, FOMC, NFP; xem bài 5.9) và funding không cực đoan. 0 nếu ngược lại (khi đó danh sách cấm bên dưới cũng phủ quyết lệnh).'],
        ['6. Trạng thái bản thân', '0 hoặc 1', '1 nếu chưa chạm giới hạn lỗ ngày, không vừa thua 2 lệnh liên tiếp, ngủ đủ, không đang giận. 0 nếu ngược lại.']
      ] },
      { type: 'list', items: [
        '<strong>Hạng A</strong>: từ 8 đến 10 điểm VÀ ba tiêu chí bắt buộc 1, 3, 4 đều đạt 2 điểm (bối cảnh rõ, nến kích hoạt đã đóng, R:R từ 2R). Được vào lệnh với rủi ro theo kế hoạch (ví dụ 1%).',
        '<strong>Hạng B</strong>: từ 6 điểm trở lên nhưng chưa đạt hạng A (6–7 điểm, hoặc từ 8 điểm mà một tiêu chí bắt buộc chưa đạt 2). Không vào. Ghi vào nhật ký và theo dõi xem nếu vào thì kết quả ra sao, để kiểm chứng bộ quy tắc.',
        '<strong>Hạng C</strong>: từ 5 điểm trở xuống, bất kể tiêu chí nào. Không vào, không cần theo dõi.'
      ] },
      { type: 'example', title: 'Chấm thử một lệnh short ETH (giả định)', text: 'D1 ETH có LH/LL nhưng giá vừa đóng trên EMA 50 D1: tiêu chí 1 = 0. Vùng kháng cự H4 3.080–3.120 đã chặn 3 lần: 2. H1 vừa đóng nến nhấn chìm giảm: 2. Hỗ trợ gần nhất 2.860, vào 3.050, dừng lỗ 3.140: lời 190, lỗ 90, R:R ≈ 2,1: 2. Không có tin lớn: 1. Trạng thái ổn: 1. Tổng 8 điểm nhưng tiêu chí 1 bằng 0 nên là hạng B. Không vào lệnh. Tổng điểm cao không cứu được một điều kiện bắt buộc bị thiếu.' },
      { type: 'checklist', title: 'Checklist trước khi gọi một setup là hạng A', items: [
        'Tôi đã xác định hướng trên D1 TRƯỚC khi nhìn H1',
        'Giá đang nằm trong một vùng H4 tôi đã vẽ sẵn từ trước, không vẽ thêm lúc này',
        'Nến kích hoạt trên H1 đã đóng cửa',
        'Tôi biết chính xác giá dừng lỗ và nó nằm ở nơi ý tưởng bị sai',
        'Mục tiêu đầu tiên cách điểm vào ít nhất 2R và không có vùng cản lớn chắn giữa',
        'Giờ hiện tại không nằm trong khoảng 30 phút trước đến 30 phút sau CPI/FOMC/NFP, funding không cực đoan',
        'Tôi chưa chạm giới hạn lỗ ngày và không vừa thua 2 lệnh liên tiếp',
        'Tổng điểm từ 8 trở lên, tiêu chí 1, 3, 4 đều đạt 2 điểm, và không dính dòng nào trong danh sách cấm'
      ] },

      { type: 'h', text: 'Danh sách điều kiện KHÔNG vào lệnh' },
      { type: 'p', text: 'Danh sách này có quyền phủ quyết. Chỉ cần một dòng đúng là bỏ lệnh, dù thang điểm có đẹp đến đâu.' },
      { type: 'list', ordered: true, items: [
        '<strong>Giá ở giữa biên độ</strong>: cách cả hỗ trợ lẫn kháng cự H4 gần nhất một khoảng lớn. Ở giữa, dừng lỗ hợp lý thì xa, mục tiêu thì gần, R:R luôn xấu.',
        '<strong>Trước tin lớn</strong>: không mở lệnh mới trong khoảng từ 30 phút trước đến 30 phút sau giờ công bố CPI Mỹ; với FOMC, từ 30 phút trước quyết định tới khi họp báo đã diễn ra ít nhất 30 phút (giờ Việt Nam cụ thể ở bài 5.6).',
        '<strong>Funding cực đoan</strong>: quy tắc gợi ý cho bản thân: nếu funding từ 0,05% mỗi 8 giờ trở lên (gấp 5 lần mức cơ sở 0,01%) thì không mở long mới; nếu từ −0,05% trở xuống thì không mở short mới. Đám đông đã dồn quá đông về một phía, rủi ro bị quét ngược tăng (xem bài 5.4).',
        '<strong>Vừa thua 2 lệnh liên tiếp</strong>: dừng giao dịch đến hết ngày. Lệnh thứ ba sau hai lệnh thua thường là lệnh "gỡ", không phải lệnh theo setup.',
        '<strong>Đã chạm giới hạn lỗ ngày/tuần</strong> (ví dụ 2R/ngày, 5R/tuần, xem bài 5.9).',
        '<strong>Không đặt được dừng lỗ hợp lý</strong>: điểm vô hiệu xa đến mức khối lượng tính ra quá nhỏ để có ý nghĩa, hoặc mục tiêu không đủ 2R. Đừng kéo dừng lỗ lại gần cho "vừa" R:R.',
        '<strong>Lý do vào lệnh đến từ người khác</strong>: nhóm chat, KOL, tín hiệu copy. Nếu bạn không tự chấm điểm được thì đó không phải setup của bạn.',
        '<strong>Thanh khoản mỏng</strong>: coin nhỏ, spread rộng, sổ lệnh thưa; dừng lỗ có thể trượt rất xa.'
      ] },
      { type: 'scenario', title: 'BTC vừa tăng 4% trong 2 giờ', setup: 'BTC tăng từ 80.000 lên 83.200 trong 2 giờ lúc 20:00 tối. Nhóm chat rộn ràng "phá đỉnh rồi, lên 90k". Bạn chưa có lệnh.', bad: 'Trader cảm tính mua market ngay ở 83.200 với đòn bẩy 20x, dừng lỗ "để sau". Không để ý 30 phút nữa có dữ liệu CPI. Giá đang ở giữa vùng: kháng cự D1 84.000 ở ngay trên, hỗ trợ gần nhất 80.400 ở xa phía dưới. CPI ra, giá giật xuống 81.500, anh ta hoảng và cắt lỗ bằng market, trượt thêm.', good: 'Trader có kế hoạch mở checklist: D1 tăng (2 điểm), nhưng giá đang ở giữa vùng (tiêu chí 2 = 0), chưa có kích hoạt ở vùng nào (0), R:R tới 84.000 dưới 1 (0), có CPI trong 30 phút (0). Tổng 3 điểm, hạng C, và dính 2 điều kiện cấm. Anh ta ghi vào nhật ký: "Chờ giá về vùng 80.400–81.000 hoặc phá 84.000 rồi retest". Tắt ứng dụng.' }
    ],
    keyPoints: [
      'Luôn đi theo thứ tự D1 bối cảnh → H4 vùng → H1 kích hoạt; khung nhỏ không được cãi khung lớn.',
      'Kích hoạt chỉ tính khi nến đã đóng cửa: nến xác nhận hoặc phá vỡ cấu trúc khung nhỏ (MSB).',
      'Ba setup: pullback theo xu hướng (dễ nhất), breakout-retest (chờ kiểm tra lại, không đuổi nến phá vỡ), đảo chiều tại vùng lớn (khó nhất, giảm rủi ro một nửa).',
      'Chấm điểm 10: chỉ vào hạng A (từ 8 điểm và tiêu chí bối cảnh, kích hoạt, R:R đều đạt 2 điểm); từ 5 điểm trở xuống là hạng C.',
      'Danh sách cấm có quyền phủ quyết: giữa biên độ, trước tin lớn, funding cực đoan, vừa thua 2 lệnh, không có dừng lỗ hợp lý.'
    ],
    practice: [
      'Mở biểu đồ BTC D1, H4, H1. Viết ra: hướng D1 là gì (kèm lý do HH/HL hay LH/LL và vị trí so với EMA 50), 2 vùng H4 gần nhất phía trên và phía dưới.',
      'Tìm lại trên lịch sử biểu đồ 5 lần giá phá vỡ một kháng cự H4. Đếm xem bao nhiêu lần có retest và bao nhiêu lần là phá vỡ giả. Ghi vào nhật ký.',
      'Chấm điểm 3 "cơ hội" bạn thấy trong tuần này bằng bảng 6 tiêu chí. Chỉ vào lệnh Demo với các cơ hội hạng A.',
      'In hoặc chép danh sách 8 điều kiện KHÔNG vào lệnh, dán cạnh màn hình.'
    ],
    quiz: [
      { q: 'D1 của ETH đang tạo đỉnh thấp dần, đáy thấp dần và giá nằm dưới EMA 50 D1. Trên H1 bạn thấy một nến búa đẹp tại hỗ trợ H4. Theo khung 3 lớp, bạn nên làm gì?', options: ['Không long; D1 chỉ cho phép tìm short, nến búa chỉ báo nhịp hồi', 'Long ngay vì nến búa tại hỗ trợ H4 là tín hiệu tăng rõ ràng', 'Long với đòn bẩy thấp hơn để bù cho rủi ro ngược xu hướng', 'Long nếu RSI H1 dưới 30, vì khi đó giá đã quá bán'], answer: 0, explain: 'Lớp 1 quyết định hướng: D1 là LH/LL và dưới EMA 50 thì chỉ tìm short. Tín hiệu H1 không được cãi D1. Giảm đòn bẩy không biến một lệnh ngược bối cảnh thành setup hợp lệ, và RSI dưới 30 cũng không thay đổi bối cảnh.' },
      { q: 'Bạn tự chấm một setup được 9 điểm, trong đó đã cho 2 điểm tiêu chí kích hoạt dù nến H1 chưa đóng cửa. Xếp hạng đúng là gì?', options: ['Hạng A, vì tổng điểm đã từ 8 trở lên', 'Hạng A, nếu chỉ còn dưới 10 phút là nến đóng', 'Hạng C, vì đã chấm sai một tiêu chí', 'Hạng B; chờ nến đóng rồi chấm lại từ đầu'], answer: 3, explain: 'Chấm đúng thì tiêu chí 3 bằng 0, tổng còn 7 điểm và thiếu điều kiện bắt buộc, nên là hạng B, không vào. Nến chưa đóng có thể đổi hình dạng hoàn toàn trong vài phút cuối. Hạng C chỉ dành cho tổng từ 5 điểm trở xuống, còn ở đây là 7; cách đúng là chờ nến đóng rồi chấm lại.' },
      { q: 'BTC vừa đóng nến H4 phá lên trên kháng cự 84.000 với volume lớn. Theo setup breakout-retest, điểm vào hợp lý là gì?', options: ['Mua market ngay khi nến H4 phá vỡ vừa đóng cửa để không lỡ', 'Chờ giá retest vùng 84.000, có nến từ chối hoặc MSB H1 rồi mới vào', 'Đặt lệnh short vì phá vỡ có volume lớn thường là giả', 'Đặt limit mua thấp hơn nhiều, ở 80.000, cho giá vốn tốt'], answer: 1, explain: 'Setup breakout-retest vào lệnh khi kiểm tra lại thành công, vì kháng cự cũ đóng vai hỗ trợ. Mua ngay nến phá vỡ dễ dính phá vỡ giả và có R:R xấu. Short ngược phá vỡ là không có cơ sở. Limit ở 80.000 không gắn với vùng vừa phá.' },
      { q: 'Tình huống nào sau đây KHÔNG thuộc danh sách cấm vào lệnh?', options: ['Còn 20 phút nữa là công bố CPI Mỹ', 'Bạn vừa thua 2 lệnh liên tiếp trong ngày', 'Giá ở vùng hỗ trợ H4 đã giữ 3 lần, D1 tăng, nến kích hoạt H1 đã đóng, không có tin lớn trong 30 phút trước hay sau', 'Funding đang +0,06% mỗi 8 giờ và bạn định mở long'], answer: 2, explain: 'Lựa chọn C mô tả một setup pullback có đủ 3 lớp và nằm ngoài khoảng cấm quanh tin, nên không bị cấm (vẫn phải chấm R:R). A rơi vào khung 30 phút trước CPI. B chạm quy tắc 2 lệnh thua. D là funding cực đoan ở chiều long theo quy tắc gợi ý.' }
    ],
    sources: [
      { title: 'Support & Resistance', url: 'https://chartschool.stockcharts.com/table-of-contents/chart-analysis/support-and-resistance', note: 'StockCharts ChartSchool, tiếng Anh: vùng hỗ trợ/kháng cự, hỗ trợ bị phá có thể thành kháng cự và ngược lại' },
      { title: 'Dow Theory', url: 'https://chartschool.stockcharts.com/table-of-contents/market-analysis/dow-theory', note: 'StockCharts ChartSchool, tiếng Anh: xu hướng chính, nhịp điều chỉnh, đỉnh/đáy phản ứng' },
      { title: 'Donchian Trading Guidelines', url: 'https://chartschool.stockcharts.com/table-of-contents/overview/donchian-trading-guidelines', note: 'StockCharts ChartSchool, tiếng Anh: đường xu hướng lớn/nhỏ, không đuổi giá, dùng lệnh limit khi mở vị thế' },
      { title: 'How to Calculate Position Size in Trading', url: 'https://www.binance.com/en/academy/articles/how-to-calculate-position-size-in-trading', note: 'Binance Academy, tiếng Anh: điểm vô hiệu của ý tưởng giao dịch' }
    ],
    updated: '2026-09'
  },

  'c5-b6': {
    duration: 13,
    level: 'Trung cấp',
    summary: 'Chờ nến đóng, chọn đúng loại lệnh (limit, stop-market, market), tránh giờ tin lớn theo giờ Việt Nam, chia lệnh 2 phần và quy tắc lỡ tàu thì bỏ.',
    goals: [
      'Chờ nến kích hoạt đóng cửa rồi mới hành động, không vào giữa nến',
      'Chọn đúng loại lệnh vào: limit tại vùng, stop-market khi phá vỡ, market khi cần; hiểu phí maker/taker',
      'Lập lịch giờ Việt Nam cho funding, CPI, FOMC, phiên Âu/Mỹ và áp dụng khoảng cấm trước/sau tin',
      'Vào lệnh chia 2 phần mà tổng rủi ro vẫn không vượt 1R, và biết khi nào phải bỏ lệnh vì giá đã chạy'
    ],
    blocks: [
      { type: 'p', text: 'Bài 5.5 trả lời câu hỏi "có nên vào không". Bài này trả lời "vào lúc nào và bằng loại lệnh gì". Cùng một setup, vào sớm 30 phút, vào bằng market lúc tin ra, hay đuổi theo khi giá đã chạy xa có thể biến một lệnh có R:R 1:3 thành 1:0,5. Thời điểm vào lệnh là nơi kỷ luật được thử thách nhiều nhất, vì lúc đó giá đang chuyển động và cảm giác sợ lỡ (FOMO) mạnh nhất.' },

      { type: 'h', text: 'Chờ nến đóng: vì sao và làm thế nào' },
      { type: 'p', text: 'Một nến H1 đang chạy có thể trông như nến nhấn chìm tăng ở phút 40 rồi đóng thành nến có bóng trên dài ở phút 60. Tín hiệu chỉ tồn tại khi nến đã đóng. Quy tắc: <strong>chỉ đánh giá tín hiệu kích hoạt tại thời điểm nến của khung kích hoạt đóng cửa</strong>. Với H1, đó là mỗi đầu giờ; với H4 trên Binance, nến đóng lúc 03:00, 07:00, 11:00, 15:00, 19:00, 23:00 giờ Việt Nam (nến tính theo UTC).' },
      { type: 'steps', items: [
        { title: 'Đặt cảnh báo thay vì ngồi canh', text: 'Khi giá còn cách vùng H4, đặt cảnh báo giá (price alert) ở mép vùng. Tắt biểu đồ. Không có cảnh báo thì không có lý do nhìn màn hình.' },
        { title: 'Khi cảnh báo kêu: chưa làm gì', text: 'Giá chạm vùng chỉ là điều kiện của lớp 2. Ghi lại giờ đóng của nến H1 kế tiếp.' },
        { title: 'Đúng giờ đóng nến: chấm lớp 3', text: 'Mở biểu đồ ngay sau khi nến H1 đóng. Có nến xác nhận hoặc MSB không? Không có: chờ nến tiếp theo, tối đa theo số nến bạn quy định (ví dụ 6 nến H1). Hết thời gian mà giá rời vùng thì hủy kế hoạch.' },
        { title: 'Có tín hiệu: chấm điểm, tính khối lượng, rồi mới đặt lệnh', text: 'Chấm thang 10 ở bài 5.5, tính khối lượng từ dừng lỗ (bài 5.7), kiểm tra lịch tin. Toàn bộ mất khoảng 5 phút. Nếu 5 phút làm bạn lỡ lệnh, lệnh đó không dành cho bạn.' }
      ] },

      { type: 'h', text: 'Ba cách khớp lệnh: limit, stop-market, market' },
      { type: 'p', text: 'Theo Binance, lệnh nằm lên sổ lệnh (ví dụ limit chưa khớp ngay) được tính là <strong>maker</strong> khi khớp; lệnh khớp ngay với lệnh có sẵn (market, hay lệnh stop-market khi kích hoạt gửi đi một lệnh market) là <strong>taker</strong>. Phí USDⓈ-M cho người dùng thường là <strong>0,02% maker và 0,05% taker</strong>, tính trên giá trị danh nghĩa (khối lượng × giá khớp). Phí có thể thay đổi theo cấp VIP và chính sách sàn, kiểm tra trang phí trước khi giao dịch.' },
      { type: 'table', head: ['Loại lệnh', 'Dùng khi nào', 'Ưu điểm', 'Nhược điểm'], rows: [
        ['Limit tại vùng', 'Setup pullback và retest: bạn muốn mua ở mép vùng H4 hoặc ngay sau nến kích hoạt ở mức giá định trước.', 'Kiểm soát giá, không trượt giá, phí maker thấp (0,02%).', 'Có thể không khớp nếu giá không quay về; có thể chỉ khớp một phần. Đặt limit chờ sẵn trước khi có kích hoạt là bỏ qua lớp 3, nên mặc định chỉ đặt limit SAU khi nến kích hoạt đã đóng (xem phần chia lệnh).'],
        ['Stop-market khi phá vỡ', 'Muốn vào khi giá phá lên trên một mức (ví dụ đỉnh của nến kích hoạt): lệnh mua stop đặt trên mức đó.', 'Chỉ vào khi giá chứng minh đi đúng hướng; không cần ngồi canh.', 'Phí taker 0,05%; có thể trượt giá khi phá vỡ nhanh; dễ khớp ở đúng cú phá vỡ giả.'],
        ['Market', 'Tín hiệu đã đóng nến, giá vẫn trong khoảng cho phép, cần vào ngay. Và luôn dùng để thoát khẩn cấp.', 'Chắc chắn khớp (nếu còn thanh khoản).', 'Phí taker, trượt giá khi biến động hoặc sổ lệnh mỏng; bấm market theo cảm xúc là thói quen tệ nhất.']
      ] },
      { type: 'calc', title: 'Chênh lệch phí và trượt giá trên một lệnh nhỏ (giả định)', rows: [
        ['Vị thế', 'Long 0,005 BTC ở giá 80.000 → giá trị danh nghĩa = 0,005 × 80.000 = 400 USDT'],
        ['Vào bằng limit (maker 0,02%)', '400 × 0,02% = 0,08 USDT'],
        ['Vào bằng market (taker 0,05%)', '400 × 0,05% = 0,2 USDT'],
        ['Trượt giá 0,1% khi vào market lúc biến động', '80.000 × 0,1% = 80 USDT mỗi BTC → 0,005 × 80 = 0,4 USDT'],
        ['So với rủi ro 1R = 10 USDT', 'Market + trượt giá: 0,2 + 0,4 = 0,6 USDT ≈ 0,06R chỉ để vào lệnh; limit: 0,08 USDT ≈ 0,008R']
      ], result: 'Một lệnh thì nhỏ, nhưng 200 lệnh một năm thì chi phí vào lệnh bằng market lúc biến động có thể ngốn hơn 10R. Mặc định: vào bằng limit khi được, thoát bằng market/stop-market khi cần.' },
      { type: 'quote', text: 'Use limit orders when initiating a position. Use market orders when closing a position.', cite: 'Donchian Trading Guidelines (bản diễn giải của StockCharts ChartSchool)' },
      { type: 'callout', tone: 'note', title: 'Trượt giá (slippage) là gì', text: 'Binance định nghĩa trượt giá là chênh lệch giữa giá bạn mong muốn và giá lệnh thực sự khớp. Nguyên nhân chính: thanh khoản thấp (lệnh ăn qua nhiều mức giá) và biến động cao (giá đổi trong vài giây). Cách giảm: dùng limit, giao dịch hợp đồng có thanh khoản cao, chia nhỏ lệnh lớn, tránh vào lệnh lúc tin ra.' },

      { type: 'h', text: 'Giờ nào nên và không nên vào lệnh (giờ Việt Nam)' },
      { type: 'p', text: 'Nghiên cứu của Eross, Urquhart và Wolfe (Finance Research Letters, 2019) trên dữ liệu bitcoin cho thấy khối lượng và biến động <strong>cao rõ rệt trong giờ giao dịch ban ngày của thị trường chứng khoán châu Âu và Mỹ</strong>, còn giờ mở cửa châu Á ảnh hưởng ít. Hàm ý thực tế: buổi chiều và tối giờ Việt Nam là lúc giá dễ chạy tới mục tiêu hơn, nhưng cũng là lúc dễ bị quét râu và trượt giá hơn. Buổi sáng giờ Việt Nam thường yên hơn, phá vỡ lúc này dễ thiếu lực.' },
      { type: 'table', head: ['Sự kiện', 'Giờ gốc', 'Giờ Việt Nam', 'Ảnh hưởng tới bạn'], rows: [
        ['Funding Binance', '00:00 / 08:00 / 16:00 UTC', '07:00 / 15:00 / 23:00', 'Chỉ trả/nhận nếu đang giữ vị thế đúng thời điểm đó. Kiểm tra funding trước khi mở lệnh giữ qua các mốc này.'],
        ['CPI Mỹ (BLS)', '8:30 sáng giờ miền Đông Mỹ', '19:30 (giờ mùa hè Mỹ, khoảng giữa tháng 3 đến đầu tháng 11) hoặc 20:30 (giờ mùa đông)', 'Biến động mạnh vài phút đầu. Lịch 2026 còn lại: 14/10, 10/11, 10/12.'],
        ['Quyết định lãi suất FOMC', '2:00 chiều giờ miền Đông, họp báo 30 phút sau', '01:00 sáng hôm sau (giờ mùa hè) hoặc 02:00 (giờ mùa đông); họp báo 01:30 hoặc 02:30', 'Hai đợt biến động: lúc ra quyết định và trong họp báo.'],
        ['Phiên châu Âu mở', 'Khoảng 8:00–9:00 sáng giờ châu Âu', 'Khoảng 14:00–15:00', 'Khối lượng bắt đầu tăng.'],
        ['Chứng khoán New York mở', '9:30 sáng giờ miền Đông', '20:30 (giờ mùa hè) hoặc 21:30 (giờ mùa đông)', 'Giai đoạn khối lượng và biến động cao trong ngày.']
      ] },
      { type: 'callout', tone: 'risk', title: 'Quy tắc khoảng cấm quanh tin lớn', text: '<strong>CPI</strong>: không mở lệnh mới từ 30 phút trước đến 30 phút sau giờ công bố (ví dụ CPI 19:30 thì cấm từ 19:00 đến 20:00). <strong>FOMC</strong>: cấm từ 30 phút trước quyết định đến 30 phút sau khi họp báo bắt đầu (ví dụ 00:30 đến 02:00 khi quyết định lúc 01:00). Lý do: trong vài phút quanh tin, sổ lệnh có thể mỏng đi, spread rộng ra, giá giật hai chiều; lệnh stop-market của bạn có thể khớp xa hơn dự kiến. Nếu đang giữ vị thế trước tin: dừng lỗ phải đang nằm trên sàn, và cân nhắc giảm một nửa khối lượng hoặc chốt trước tin. Đừng bao giờ gỡ dừng lỗ "vì sợ bị quét".' },
      { type: 'p', text: 'Sau khi hết khoảng cấm, không phải cứ thế mà vào. Chờ ít nhất một nến H1 đóng cửa hoàn toàn sau tin, rồi áp lại khung 3 lớp từ đầu: tin có thể đã phá hỏng vùng H4 bạn vẽ.' },

      { type: 'h', text: 'Vào lệnh chia 2 phần và quy tắc "lỡ tàu thì bỏ"' },
      { type: 'p', text: 'Khi vùng H4 khá rộng, bạn không biết giá sẽ quay đầu ở mép trên hay sâu hơn. Cách làm: sau khi nến kích hoạt H1 đã đóng trong vùng, phần 1 vào ngay quanh giá đóng nến, phần 2 đặt limit sâu hơn trong vùng để đón nhịp kiểm tra lại (nếu có). Chia lệnh làm 2 phần giúp có giá vào trung bình tốt hơn mà vẫn giữ tổng rủi ro trong 1R. Điều kiện: <strong>tính khối lượng sao cho nếu cả hai phần cùng khớp và dừng lỗ bị chạm thì tổng lỗ vẫn không vượt 1R</strong>. Hai phần dùng chung một giá dừng lỗ.' },
      { type: 'calc', title: 'Chia 2 phần: long ETH tại vùng hỗ trợ (giả định)', rows: [
        ['Tài khoản, rủi ro', '1.000 USDT × 1% = 10 USDT (1R)'],
        ['Vùng hỗ trợ H4', '2.960 – 3.020. Dừng lỗ chung: dưới đáy vùng 2.960 trừ vùng đệm 20 → 2.940'],
        ['Phần 1 (sau nến kích hoạt)', 'Mua ở 3.020, khoảng dừng lỗ = 3.020 − 2.940 = 80 USDT/ETH'],
        ['Phần 2 (limit chờ sẵn)', 'Mua ở 2.980, khoảng dừng lỗ = 2.980 − 2.940 = 40 USDT/ETH'],
        ['Phí cho mỗi 1 ETH của q (kịch bản xấu nhất)', 'Phần 1 vào taker: 3.020 × 0,05% = 1,51; phần 2 vào maker: 2.980 × 0,02% = 0,596; thoát cả 2q bằng stop-market (taker): 2 × 2.940 × 0,05% = 2,94; cộng lại 5,046 USDT'],
        ['Khối lượng mỗi phần q', 'q × (80 + 40) + q × 5,046 ≤ 10 → q ≤ 10 ÷ 125,046 ≈ 0,07997 → làm tròn xuống 0,079 ETH (bước khối lượng giả định 0,001)'],
        ['Chỉ phần 1 khớp rồi chạm dừng lỗ', '0,079 × 80 = 6,32 USDT + phí 0,079 × (3.020 + 2.940) × 0,05% ≈ 0,24 → ≈ 6,56 USDT'],
        ['Cả hai phần khớp rồi chạm dừng lỗ', '0,079 × 120 = 9,48 USDT + phí 0,079 × 5,046 ≈ 0,40 → ≈ 9,88 USDT ≤ 10 USDT'],
        ['Giá vào trung bình nếu khớp cả hai', '(3.020 + 2.980) ÷ 2 = 3.000']
      ], result: 'Mỗi phần 0,079 ETH, dừng lỗ chung 2.940. Tệ nhất mất khoảng 9,88 USDT kể cả phí, không vượt 1R. Nếu chỉ tính giá mà quên phí, bạn sẽ chọn 0,083 ETH và mất khoảng 9,96 + 0,42 ≈ 10,38 USDT, vượt 1R. Trượt giá của lệnh dừng lỗ còn có thể làm lỗ lớn hơn một chút.' },
      { type: 'callout', tone: 'warn', title: 'Chia phần khác với nhồi lệnh', text: 'Chia phần là kế hoạch viết TRƯỚC khi vào: hai mức giá, một dừng lỗ, tổng rủi ro cố định. Nhồi lệnh là thêm khối lượng SAU khi giá đi ngược, không có dừng lỗ mới, rủi ro phình to. Bài 5.8 có ví dụ số cho thấy sự khác biệt.' },
      { type: 'p', text: 'Quy tắc "lỡ tàu thì bỏ" được viết thành con số: <strong>nếu giá đã chạy quá 1R khỏi mức vào dự kiến theo hướng có lợi mà lệnh của bạn chưa khớp, hủy kế hoạch</strong>. Đuổi theo làm hỏng R:R vì dừng lỗ vẫn phải nằm ở điểm vô hiệu cũ, còn mục tiêu thì không xa thêm. Donchian cũng khuyên không đuổi theo một vị thế sau một nhịp chạy dài, mà chờ một nhịp điều chỉnh để cải thiện tỷ lệ lời/lỗ.' },
      { type: 'calc', title: 'Đuổi theo lệnh làm hỏng R:R như thế nào (giả định)', rows: [
        ['Kế hoạch gốc', 'Vào 80.000, dừng lỗ 78.160 → 1R = 1.840 USDT/BTC. Mục tiêu 83.680 (vùng kháng cự) → lời 3.680 = 2R'],
        ['Ngưỡng bỏ lệnh', '80.000 + 1R = 81.840. Giá đã lên 82.000 mà lệnh chưa khớp → vượt ngưỡng'],
        ['Nếu vẫn đuổi mua ở 82.000', 'Khoảng dừng lỗ = 82.000 − 78.160 = 3.840; khoảng tới mục tiêu = 83.680 − 82.000 = 1.680'],
        ['R:R mới', '1.680 ÷ 3.840 ≈ 0,44 thay vì 2'],
        ['Khối lượng cho 10 USDT rủi ro', '10 ÷ 3.840 ≈ 0,0026 BTC, chỉ còn khoảng một nửa so với kế hoạch']
      ], result: 'Đuổi theo biến một lệnh 2R thành lệnh cần thắng hơn 69% số lần mới hòa vốn (1 ÷ (1 + 0,44) ≈ 0,69). Bỏ lệnh, chờ setup tiếp theo.' },
      { type: 'callout', tone: 'risk', title: 'Vào bằng stop-market lúc phá vỡ: tính cả trượt giá vào rủi ro', text: 'Khi bạn dùng lệnh mua stop-market để vào lúc giá phá lên, lệnh thường khớp đúng lúc nhiều người khác cũng mua, nên giá khớp có thể cao hơn giá kích hoạt. Khoảng dừng lỗ thật vì thế dài hơn khoảng bạn tính. Cách phòng: tính khối lượng với giá vào giả định cao hơn giá kích hoạt một khoảng dự phòng (ví dụ 0,1% giá), và kiểm tra lại giá khớp thực tế ngay sau khi vào. Nếu trượt quá nhiều khiến R:R tới mục tiêu dưới 1,5R, đóng lệnh ngay với khoản lỗ nhỏ còn hơn giữ một lệnh không còn đạt chuẩn.' },
      { type: 'checklist', title: 'Kiểm tra 60 giây trước khi bấm nút vào lệnh', items: [
        'Nến kích hoạt của khung H1 đã đóng cửa (không phải nến đang chạy)',
        'Setup đã được chấm hạng A theo bảng 6 tiêu chí ở bài 5.5',
        'Giờ hiện tại không nằm trong khoảng cấm quanh CPI/FOMC; đã xem giờ funding kế tiếp',
        'Giá hiện tại chưa chạy quá 1R khỏi mức vào dự kiến',
        'Đã chọn loại lệnh: limit (ưu tiên), stop-market khi phá vỡ, hay market; biết phí maker/taker tương ứng',
        'Đã tính khối lượng từ khoảng dừng lỗ, làm tròn xuống, cộng dự phòng phí và trượt giá',
        'Nếu chia 2 phần: tổng rủi ro khi cả hai khớp vẫn không vượt 1R',
        'TP/SL sẽ được đặt ngay trong cùng phiếu lệnh (bài 5.7)'
      ] },
      { type: 'scenario', title: 'Lệnh limit không khớp, giá chạy thẳng', setup: 'Bạn đặt limit mua BTC ở 80.000 trong vùng hỗ trợ, dừng lỗ 78.160. Giá xuống 80.150 rồi bật mạnh lên 82.300 trong 3 giờ, lệnh không khớp.', bad: 'Trader cảm tính hủy limit, bấm market ở 82.300 "vì sợ lỡ sóng", giữ nguyên khối lượng 0,005 BTC và dời dừng lỗ lên 81.000 để "cho gọn". Dừng lỗ này không còn nằm ở điểm vô hiệu nào cả. Giá điều chỉnh bình thường về 80.900, chạm dừng lỗ, lỗ 0,005 × 1.300 = 6,5 USDT cộng phí, rồi giá lại chạy lên.', good: 'Trader có kế hoạch thấy giá đã vượt 81.840 (1R khỏi mức vào dự kiến). Hủy lệnh, ghi nhật ký "setup đúng, không khớp, bỏ theo quy tắc". Anh ta vẽ vùng mới: nếu giá tạo đáy cao hơn trên H4 và có kích hoạt H1 thì đó là một setup mới với dừng lỗ mới. Không có thì thôi. Mất một cơ hội, không mất tiền.' }
    ],
    keyPoints: [
      'Tín hiệu chỉ có giá trị khi nến khung kích hoạt đã đóng; dùng cảnh báo giá thay vì ngồi canh.',
      'Limit tại vùng: không trượt, phí maker 0,02%. Stop-market khi phá vỡ và market: phí taker 0,05%, có thể trượt giá.',
      'Không mở lệnh mới từ 30 phút trước đến 30 phút sau CPI (19:30/20:30 giờ VN); với FOMC (01:00/02:00) cấm đến 30 phút sau khi họp báo bắt đầu.',
      'Chia lệnh 2 phần với một dừng lỗ chung, khối lượng tính sao cho cả hai khớp vẫn không vượt 1R.',
      'Giá đã chạy quá 1R khỏi mức vào dự kiến mà chưa khớp: bỏ lệnh, không đuổi.'
    ],
    practice: [
      'Viết lịch tuần này theo giờ Việt Nam: 3 mốc funding mỗi ngày, ngày giờ CPI/FOMC gần nhất (tra lịch BLS và Fed), và khoảng cấm vào lệnh tương ứng.',
      'Trên Demo Trading, đặt một lệnh limit, một lệnh stop-market và một lệnh market cùng khối lượng. So sánh giá khớp và phí trong lịch sử giao dịch.',
      'Tính lại ví dụ chia 2 phần với vùng hỗ trợ ETH của riêng bạn: hai mức vào, một dừng lỗ, khối lượng mỗi phần để tổng rủi ro không vượt 1%.',
      'Với 5 lệnh gần nhất trong nhật ký, kiểm tra: có lệnh nào bạn vào khi giá đã chạy quá 1R khỏi mức dự kiến không? Kết quả của chúng ra sao?'
    ],
    quiz: [
      { q: 'Tháng 10/2026 (Mỹ vẫn theo giờ mùa hè), CPI công bố 8:30 sáng giờ miền Đông. Theo quy tắc của bài, khoảng thời gian cấm mở lệnh mới theo giờ Việt Nam là:', options: ['18:00 – 19:00', '20:00 – 21:00', '19:00 – 20:00', 'Không cần cấm, chỉ cần đặt dừng lỗ'], answer: 2, explain: 'Giờ mùa hè Mỹ (EDT, UTC−4) nên 8:30 ET là 19:30 giờ Việt Nam. Cấm 30 phút trước và sau → 19:00–20:00. 20:00–21:00 là lệch do dùng giờ mùa đông sai. 18:00–19:00 kết thúc trước giờ tin. Dừng lỗ không chống được trượt giá lúc tin ra.' },
      { q: 'Bạn muốn vào long khi giá phá lên trên đỉnh của nến kích hoạt ở 80.500. Loại lệnh phù hợp nhất là:', options: ['Lệnh limit mua ở 80.500 đặt ngay bây giờ khi giá đang ở 80.100', 'Lệnh stop-market mua kích hoạt ở trên 80.500', 'Lệnh market ngay bây giờ', 'Lệnh limit bán ở 80.500'], answer: 1, explain: 'Stop-market mua chỉ kích hoạt khi giá đi lên chạm mức đã chọn, đúng với ý "vào khi phá vỡ". Limit mua ở 80.500 khi giá đang 80.100 thực chất sẽ khớp ngay như taker vì giá thị trường thấp hơn giá bạn sẵn sàng mua. Market ngay là vào trước khi giá chứng minh. Limit bán là lệnh ngược chiều.' },
      { q: 'Kế hoạch: vào 3.000, dừng lỗ 2.940 (1R = 60). Lệnh limit chưa khớp, giá đã lên 3.070. Bạn nên làm gì?', options: ['Hủy kế hoạch vì giá đã chạy quá 1R khỏi mức vào dự kiến (3.060)', 'Mua market ở 3.070, giữ dừng lỗ 2.940', 'Mua market ở 3.070 và dời dừng lỗ lên 3.040 cho R:R đẹp hơn', 'Tăng gấp đôi khối lượng để bù phần lãi đã lỡ'], answer: 0, explain: 'Ngưỡng bỏ lệnh là 3.000 + 60 = 3.060; giá 3.070 đã vượt. Mua ở 3.070 với dừng lỗ cũ làm R:R xấu đi. Dời dừng lỗ lên 3.040 để "đẹp R:R" là đặt dừng lỗ theo mong muốn, không theo điểm vô hiệu. Tăng khối lượng là tăng rủi ro vì cảm xúc.' },
      { q: 'Chia lệnh 2 phần: phần 1 vào 80.200, phần 2 vào 79.600, dừng lỗ chung 78.800, rủi ro tối đa 10 USDT (câu này tạm bỏ qua phí), bước khối lượng 0,001 BTC. Khối lượng mỗi phần (bằng nhau) đúng là:', options: ['0,005 BTC', '0,0125 BTC', '0,007 BTC', '0,004 BTC'], answer: 3, explain: 'Khoảng dừng lỗ: 80.200 − 78.800 = 1.400 và 79.600 − 78.800 = 800, tổng 2.200. q = 10 ÷ 2.200 ≈ 0,00455, làm tròn XUỐNG theo bước 0,001 được 0,004 (tệ nhất mất 0,004 × 2.200 = 8,8 USDT). 0,005 × 2.200 = 11 USDT vượt giới hạn vì làm tròn lên. 0,0125 là chỉ tính khoảng 800 của phần 2; 0,007 là chỉ tính khoảng 1.400 của phần 1.' }
    ],
    sources: [
      { title: 'Binance Futures Fee Structure & Fee Calculations', url: 'https://www.binance.com/en/support/faq/detail/360033544231', note: 'Binance FAQ, tiếng Anh: maker 0,02%, taker 0,05% cho người dùng thường; phí = giá trị danh nghĩa × tỷ lệ phí' },
      { title: 'What Is Slippage?', url: 'https://www.binance.com/en/support/faq/what-is-slippage-01f6dd67d54e4dca902914700818e739', note: 'Binance FAQ, tiếng Anh: định nghĩa, nguyên nhân và cách giảm trượt giá' },
      { title: 'Time-of-day periodicities of trading volume and volatility in Bitcoin exchange', url: 'https://www.sciencedirect.com/science/article/pii/S1544612319301904', note: 'Eross, Urquhart, Wolfe, Finance Research Letters, 2019, tiếng Anh' },
      { title: 'Schedule of Releases for the Consumer Price Index', url: 'https://www.bls.gov/schedule/news_release/cpi.htm', note: 'U.S. Bureau of Labor Statistics, tiếng Anh: lịch công bố CPI 2026' },
      { title: 'Meeting calendars and information (FOMC)', url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm', note: 'Federal Reserve, tiếng Anh' },
      { title: 'Donchian Trading Guidelines', url: 'https://chartschool.stockcharts.com/table-of-contents/overview/donchian-trading-guidelines', note: 'StockCharts ChartSchool, tiếng Anh: dùng limit khi mở, market khi đóng; không đuổi giá' }
    ],
    updated: '2026-09'
  },

  'c5-b7': {
    duration: 14,
    level: 'Trung cấp',
    summary: 'Dừng lỗ đặt ở điểm ý tưởng sai, cộng vùng đệm chống râu nến; chọn Stop-Market, hiểu Mark/Last và Price Protection; rồi mới tính khối lượng.',
    goals: [
      'Đặt dừng lỗ theo cấu trúc, theo ATR và theo vùng, cho cả lệnh long và short',
      'Thêm vùng đệm chống râu nến và tránh số tròn',
      'Chọn đúng Stop-Market, loại giá kích hoạt Mark/Last và hiểu rủi ro của Price Protection trên Binance Futures',
      'Tính khối lượng, giá trị danh nghĩa, đòn bẩy và kiểm tra giá thanh lý từ khoảng cách dừng lỗ'
    ],
    blocks: [
      { type: 'p', text: 'Câu hỏi sai mà người mới hay tự hỏi là: "Mình chịu mất bao nhiêu tiền, vậy đặt dừng lỗ ở đâu?" Câu hỏi đúng là: <strong>"Giá phải đi tới đâu thì lý do vào lệnh của mình không còn đúng nữa?"</strong> Đó là điểm vô hiệu (invalidation point). Dừng lỗ nằm ở đó. Sau đó, và chỉ sau đó, bạn tính khối lượng sao cho nếu dừng lỗ bị chạm thì chỉ mất đúng số tiền rủi ro đã định. Binance Academy mô tả dừng lỗ là mức giá mà tại đó thị trường đã chứng minh giả thuyết ban đầu của bạn sai.' },
      { type: 'formula', title: 'Thứ tự bắt buộc: dừng lỗ trước, khối lượng sau', expr: 'Khối lượng = Số tiền rủi ro ÷ |Giá vào − Giá dừng lỗ|', vars: [['Số tiền rủi ro', 'Tài khoản × % rủi ro mỗi lệnh (ví dụ 1.000 × 1% = 10 USDT)'], ['Giá dừng lỗ', 'Điểm vô hiệu của ý tưởng cộng vùng đệm'], ['Khối lượng', 'Số coin (ví dụ BTC) của vị thế, làm tròn XUỐNG theo bước khối lượng của hợp đồng']], note: 'Dừng lỗ xa thì khối lượng nhỏ, dừng lỗ gần thì khối lượng lớn; số tiền mất khi sai vẫn như nhau. Đòn bẩy không nằm trong công thức này.' },
      { type: 'callout', tone: 'risk', title: 'Hai cách đặt dừng lỗ làm cháy tài khoản', text: '(1) Đặt theo số tiền muốn mất: "mình vào 0,05 BTC, chỉ chịu mất 20 USDT nên dừng lỗ cách 400 USDT". Dừng lỗ này nằm giữa nhiễu của thị trường, bị quét liên tục. (2) Đặt theo % tùy hứng: "luôn cắt ở −2%". Với BTC trên H4 có lúc 2% là nhiễu, có lúc 2% là cả một xu hướng. Cả hai đều bắt thị trường phải chiều theo túi tiền của bạn. Thị trường không biết bạn là ai.' },

      { type: 'h', text: 'Ba phương pháp tìm điểm vô hiệu' },
      { type: 'p', text: '<strong>1. Theo cấu trúc</strong>: với long, dưới đáy gần nhất tạo ra ngay trước khi kích hoạt (đáy của nhịp điều chỉnh, đáy của nhịp retest). Với short, trên đỉnh gần nhất. Logic: nếu giá phá đáy đó, cấu trúc đáy cao dần mà bạn dựa vào đã hỏng. Đây là phương pháp mặc định cho 3 setup ở bài 5.5.' },
      { type: 'p', text: '<strong>2. Theo ATR</strong>: ATR (Average True Range, biên độ thực trung bình) do J. Welles Wilder giới thiệu năm 1978, đo mức dao động bình thường của giá. True Range là số lớn nhất trong ba giá trị: (Cao − Thấp), |Cao − Đóng cửa trước|, |Thấp − Đóng cửa trước|. Mặc định 14 kỳ. Dừng lỗ cách giá vào 1–2 × ATR của khung kích hoạt hoặc khung vùng giúp bạn đứng ngoài vùng nhiễu. ATR chỉ đo độ biến động, không cho biết hướng.' },
      { type: 'formula', title: 'ATR theo cách làm mượt của Wilder', expr: 'ATR hiện tại = [(ATR trước × 13) + TR hiện tại] ÷ 14', vars: [['TR', 'True Range của nến hiện tại'], ['14', 'Số kỳ mặc định']], note: 'Ví dụ giả định: ATR trước = 800, TR nến mới = 1.080 → (800 × 13 + 1.080) ÷ 14 = 11.480 ÷ 14 = 820. Bạn không cần tự tính, biểu đồ có sẵn chỉ báo ATR; nhưng cần hiểu nó phản ứng chậm với một nến đột biến.' },
      { type: 'p', text: '<strong>3. Theo vùng</strong>: khi bạn vào lệnh tại một vùng hỗ trợ/kháng cự H4 (thường bằng limit), điểm vô hiệu là mép xa của vùng. Nếu giá đóng cửa xuyên hẳn qua cả vùng thì vùng đã thất bại. Dừng lỗ đặt ngoài mép xa đó cộng vùng đệm.' },
      { type: 'table', head: ['Phương pháp', 'Long (giả định)', 'Short (giả định)', 'Khi nào dùng'], rows: [
        ['Cấu trúc', 'BTC vào 80.000, đáy nhịp điều chỉnh 78.400; đệm 240 → dừng lỗ 78.160 (khoảng 1.840)', 'ETH vào 3.000, đỉnh nhịp hồi 3.080; đệm 12 → dừng lỗ 3.092 (khoảng 92)', 'Mặc định khi có đáy/đỉnh rõ ngay trước điểm vào'],
        ['ATR', 'BTC vào 80.000, ATR(14) H4 = 800; 1,5 × ATR = 1.200 → dừng lỗ 78.800', 'ETH vào 3.000, ATR(14) H4 = 40; 1,5 × ATR = 60 → dừng lỗ 3.060', 'Khi cấu trúc không rõ, hoặc để kiểm tra dừng lỗ cấu trúc có quá gần không (dưới 1 ATR là quá gần)'],
        ['Vùng', 'Vùng hỗ trợ 78.500–79.000, limit mua 79.100; dừng lỗ dưới mép 78.500 trừ đệm 200 → 78.300 (khoảng 800)', 'Vùng kháng cự 3.150–3.180, limit bán 3.140; dừng lỗ trên mép 3.180 cộng đệm 10 → 3.190 (khoảng 50)', 'Khi vào bằng limit tại vùng, trước khi có cấu trúc khung nhỏ']
      ] },
      { type: 'calc', title: 'Khối lượng cho từng ví dụ với 1R = 10 USDT (giả định)', rows: [
        ['Cấu trúc, long BTC', '10 ÷ 1.840 ≈ 0,00543 → 0,005 BTC; lỗ nếu chạm = 0,005 × 1.840 = 9,2 USDT'],
        ['Cấu trúc, short ETH', '10 ÷ 92 ≈ 0,1087 → 0,108 ETH; lỗ nếu chạm = 0,108 × 92 ≈ 9,94 USDT'],
        ['ATR, long BTC', '10 ÷ 1.200 ≈ 0,00833 → 0,008 BTC; lỗ = 0,008 × 1.200 = 9,6 USDT; danh nghĩa 640 USDT'],
        ['ATR, short ETH', '10 ÷ 60 ≈ 0,1667 → 0,166 ETH; lỗ = 0,166 × 60 = 9,96 USDT; danh nghĩa 498 USDT'],
        ['Vùng, long BTC', '10 ÷ 800 = 0,0125 BTC; lỗ = 10 USDT; danh nghĩa = 0,0125 × 79.100 = 988,75 USDT'],
        ['Vùng, short ETH', '10 ÷ 50 = 0,2 ETH; lỗ = 10 USDT; danh nghĩa = 0,2 × 3.140 = 628 USDT']
      ], result: 'Sáu vị thế có giá trị danh nghĩa từ khoảng 324 đến gần 989 USDT, nhưng nếu sai, mỗi lệnh chỉ mất tối đa khoảng 10 USDT (chưa tính phí và trượt giá). Kích thước vị thế đến từ khoảng cách dừng lỗ, không đến từ cảm giác tự tin.' },

      { type: 'h', text: 'Vùng đệm, râu nến và số tròn' },
      { type: 'p', text: 'Đáy rõ ràng, đỉnh rõ ràng và số tròn (78.000, 80.000, 3.000) là nơi rất nhiều người đặt dừng lỗ. Trong futures có đòn bẩy, đó cũng là nơi tập trung giá thanh lý. Giá thường bị kéo qua những chỗ này để kích hoạt hàng loạt lệnh rồi quay lại, hiện tượng hay gọi là săn dừng lỗ (stop hunting). Không phải lúc nào cũng có ai cố tình thao túng; phần nhiều đơn giản là thanh khoản tập trung ở đó.' },
      { type: 'list', items: [
        '<strong>Đệm 0,2–0,5 × ATR</strong> ra ngoài đáy/đỉnh cấu trúc. Ví dụ ATR H4 = 800 thì đệm 160–400 USDT với BTC. Bài dùng 0,3 × 800 = 240.',
        '<strong>Không đặt đúng số tròn hoặc ngay sát nó</strong>. Nếu đáy cấu trúc là 78.050, đừng đặt ở 78.000 hay 77.990; đặt hẳn qua vùng số tròn cộng đệm, và giảm khối lượng tương ứng.',
        '<strong>Không đặt ngay mép vùng</strong>. StockCharts lưu ý giá có thể xuyên nhẹ qua hỗ trợ rồi quay lại, vì thế người ta dùng vùng thay cho một đường.',
        '<strong>Muốn dừng lỗ xa hơn thì giảm khối lượng</strong>, không tăng số tiền rủi ro. Dừng lỗ xa gấp đôi, khối lượng còn một nửa, tiền mất khi sai giữ nguyên.'
      ] },
      { type: 'callout', tone: 'warn', title: 'Dừng lỗ bị quét rồi giá chạy đúng hướng thì sao?', text: 'Sẽ có. Đó là chi phí của việc có dừng lỗ, giống phí bảo hiểm. Nếu nhật ký cho thấy hơn một nửa số lần dừng lỗ bị quét sát đáy rồi giá quay lại, hãy tăng vùng đệm (ví dụ từ 0,3 lên 0,5 × ATR) và giảm khối lượng. Đừng phản ứng bằng cách bỏ dừng lỗ.' },

      { type: 'h', text: 'Cài dừng lỗ trên Binance Futures: Stop-Market, Mark/Last, Price Protection' },
      { type: 'table', head: ['Lựa chọn', 'Cách hoạt động (theo tài liệu Binance)', 'Khuyến nghị cho dừng lỗ'], rows: [
        ['Stop-Limit', 'Khi giá chạm giá kích hoạt, một lệnh limit được đặt vào sổ lệnh. Nếu giá lao qua giá limit, lệnh không khớp và vị thế vẫn mở.', 'Không dùng cho dừng lỗ. Đúng lúc bạn cần thoát nhất (giá sập nhanh) lại là lúc nó dễ không khớp nhất.'],
        ['Stop-Market', 'Khi chạm giá kích hoạt, gửi lệnh market. Luôn khớp nếu còn thanh khoản, có thể trượt giá khi biến động mạnh.', 'Dùng cho mọi dừng lỗ. Chấp nhận trượt giá nhỏ để chắc chắn ra khỏi lệnh.'],
        ['Kích hoạt theo Mark Price', 'Mark price là giá hợp lý ước tính từ chỉ số giá nhiều sàn, dùng để tính thanh lý. Ít bị giật bởi một cú râu nến trên riêng sổ lệnh Binance. Mặc định của Stop-Market.', 'Khuyến nghị cho người mới: tránh bị kích hoạt bởi một cú giật cục bộ, và cùng loại giá với cơ chế thanh lý.'],
        ['Kích hoạt theo Last Price', 'Giá khớp gần nhất của hợp đồng, chính là giá bạn thấy trên biểu đồ. Mặc định của Stop-Limit.', 'Khớp đúng với biểu đồ bạn vẽ, nhưng dễ bị râu nến quét hơn. Nếu dùng, cần vùng đệm rộng hơn.']
      ] },
      { type: 'callout', tone: 'risk', title: 'Price Protection có thể chặn cả dừng lỗ của bạn', text: 'Binance cho bật Price Protection theo từng lệnh TP/SL. Khi chênh lệch giữa Last price và Mark price vượt ngưỡng (ví dụ 5% trong tài liệu, ngưỡng cụ thể theo từng hợp đồng trong Trading Rules), lệnh TP/SL <strong>không được kích hoạt</strong> cho tới khi điều kiện bình thường trở lại. Binance tự nêu nhược điểm: trong biến động thật, tính năng này có thể ngăn cả lệnh thoát để quản trị rủi ro. Hiểu rõ đánh đổi này trước khi bật, và không bao giờ coi dừng lỗ là bảo đảm tuyệt đối: giá có thể nhảy qua mức dừng lỗ.' },
      { type: 'steps', items: [
        { title: 'Đặt TP/SL ngay trong phiếu lệnh mở', text: 'Trên giao diện Binance Futures, tick TP/SL khi đặt lệnh vào, nhập giá dừng lỗ đã tính, chọn Mark Price. Binance Academy khuyên xác định TP/SL trước khi vào và đặt ngay khi mở lệnh. Không có "đặt sau vài phút".' },
        { title: 'Kiểm tra lệnh dừng lỗ đã nằm trong tab lệnh chờ', text: 'Sau khi khớp, mở tab Open Orders hoặc TP/SL của vị thế và xác nhận có lệnh Stop-Market đúng giá, đúng khối lượng, đóng toàn bộ vị thế.' },
        { title: 'Kiểm tra giá thanh lý', text: 'Giá thanh lý hiển thị phải nằm xa hơn dừng lỗ rất nhiều. Quy tắc của khóa (bài 5.3, 5.9): khoảng từ giá vào tới giá thanh lý ít nhất gấp 3 lần khoảng từ giá vào tới dừng lỗ, tức đòn bẩy thanh trượt ≤ 1 ÷ (3 × d + MMR), với d là % khoảng dừng lỗ; và thanh trượt không quá 5x–10x. Nếu không thỏa, giảm đòn bẩy trên thanh trượt (tăng ký quỹ isolated).' }
      ] },

      { type: 'h', text: 'Ví dụ hoàn chỉnh: từ đáy cấu trúc tới giá thanh lý' },
      { type: 'figure', name: 'trade-plan', caption: 'Kế hoạch lệnh: điểm vào, dừng lỗ ở điểm vô hiệu, các mục tiêu 1R/2R/3R. Mọi con số được xác định trước khi bấm lệnh.' },
      { type: 'calc', title: 'Long BTC: tài khoản 1.000 USDT, rủi ro 1% (giá giả định)', rows: [
        ['Số tiền rủi ro (1R)', '1.000 × 1% = 10 USDT'],
        ['Điểm vô hiệu', 'Đáy nhịp điều chỉnh H1 = 78.400'],
        ['Vùng đệm', 'ATR(14) H4 giả định = 800; đệm 0,3 × 800 = 240 → dừng lỗ = 78.400 − 240 = 78.160'],
        ['Khoảng dừng lỗ', '80.000 − 78.160 = 1.840 USDT/BTC (khoảng 2,3%)'],
        ['Khối lượng lý thuyết', '10 ÷ 1.840 ≈ 0,00543 BTC → làm tròn xuống 0,005 BTC (bước giả định 0,001)'],
        ['Lỗ nếu chạm dừng lỗ (chưa phí)', '0,005 × 1.840 = 9,2 USDT'],
        ['Phí taker vào + ra (0,05% mỗi chiều)', '0,005 × 80.000 × 0,05% + 0,005 × 78.160 × 0,05% = 0,2 + 0,1954 ≈ 0,40 USDT → tổng lỗ ≈ 9,60 USDT < 10'],
        ['Giá trị danh nghĩa', '0,005 × 80.000 = 400 USDT'],
        ['Đòn bẩy thật so với tài khoản', '400 ÷ 1.000 = 0,4x. Đòn bẩy tối thiểu cần: 1x là đủ vì 400 USDT nhỏ hơn số dư'],
        ['Chọn 2x isolated', 'Ký quỹ = 400 ÷ 2 = 200 USDT. Giá thanh lý ≈ 80.000 × (1 − 1/2 + 0,4%) = 40.320'],
        ['Đòn bẩy tối đa theo quy tắc gấp 3 lần', '1 ÷ (3 × 2,3% + 0,4%) = 1 ÷ 0,073 ≈ 13,7x; bộ chuẩn bài 5.9 còn giới hạn thanh trượt 5x–10x, nên chọn tối đa 10x'],
        ['Nếu chọn 10x isolated', 'Ký quỹ 40 USDT. Giá thanh lý ≈ 80.000 × (1 − 0,1 + 0,004) = 72.320; cách giá vào 7.680 ≈ 4,2 lần khoảng dừng lỗ: đạt'],
        ['Nếu chọn 20x isolated', 'Ký quỹ 20 USDT. Giá thanh lý ≈ 80.000 × (1 − 0,05 + 0,004) = 76.320; cách giá vào 3.680 = chỉ 2 lần khoảng dừng lỗ: VI PHẠM quy tắc 3 lần'],
        ['Nếu chọn 40x isolated', 'Ký quỹ 10 USDT. Giá thanh lý ≈ 80.000 × (1 − 0,025 + 0,004) = 78.320, CAO HƠN dừng lỗ 78.160 → bị thanh lý trước khi dừng lỗ kịp chạy']
      ], result: 'Khối lượng 0,005 BTC, danh nghĩa 400 USDT, rủi ro khoảng 9,6 USDT kể cả phí. Chọn 2x–5x isolated, giá thanh lý nằm rất xa dừng lỗ; tối đa 10x. Công thức giá thanh lý là gần đúng (MMR giả định 0,4%, bỏ qua phí); luôn đọc giá thanh lý thật trên phiếu lệnh.' },
      { type: 'tool', name: 'position-size', note: 'Nhập tài khoản 1.000, rủi ro 1%, giá vào 80.000, dừng lỗ 78.160 để kiểm tra lại ví dụ trên, rồi thử với lệnh của bạn.' },

      { type: 'h', text: 'Dời dừng lỗ: một chiều duy nhất' },
      { type: 'p', text: 'Quy tắc tuyệt đối: <strong>dừng lỗ chỉ được dời theo hướng giảm rủi ro, không bao giờ dời xa hơn</strong>. Dời dừng lỗ xa hơn khi giá tiến lại gần là tăng số tiền rủi ro đúng lúc bằng chứng cho thấy bạn sai. Lệnh 1R biến thành 2R, 3R, rồi thành lệnh gồng lỗ.' },
      { type: 'p', text: 'Dời về hòa vốn (breakeven) cũng có quy tắc. Dời quá sớm, dừng lỗ nằm ngay trong vùng nhiễu, bị quét rồi giá chạy tiếp. Điều kiện gợi ý: <strong>chỉ dời về hòa vốn khi (a) giá đã đạt ít nhất 1R lợi nhuận VÀ (b) trên khung kích hoạt đã hình thành một đáy mới cao hơn giá vào (với long)</strong>. Khi đó dời dừng lỗ lên một trong hai mức: dưới đáy mới đó trừ vùng đệm, hoặc giá vào cộng phí; chọn mức nào cao hơn (với long).' },
      { type: 'example', title: 'Dời về hòa vốn đúng thời điểm (giả định)', text: 'Long 0,005 BTC ở 80.000, dừng lỗ 78.160, 1R = 1.840. Giá lên 81.900 (vượt 81.840 = 1R) nhưng chưa có đáy mới: giữ nguyên dừng lỗ. Giá điều chỉnh về 80.700 rồi bật lên, H1 xác nhận đáy mới 80.700 > 80.000. Hai mức để so: (1) dưới đáy mới trừ vùng đệm 0,3 × ATR = 0,3 × 800 = 240 → 80.700 − 240 = 80.460; (2) giá vào cộng phí taker hai chiều: 80.000 + 80.000 × 0,05% × 2 = 80.080. Mức (1) cao hơn, nên dời dừng lỗ lên 80.460. Từ đây, nếu bị chạm, lệnh vẫn lãi 0,005 × 460 = 2,3 USDT trước phí, khoảng 1,9 USDT sau phí (chưa tính trượt giá).' },
      { type: 'scenario', title: 'Giá tiến sát dừng lỗ', setup: 'Long 0,005 BTC ở 80.000, dừng lỗ Stop-Market 78.160 theo Mark price. Giá rơi về 78.400, đúng đáy cấu trúc, và đang dao động quanh đó.', bad: 'Trader cảm tính nghĩ "chắc là quét râu thôi", kéo dừng lỗ xuống 76.500, rồi hủy luôn. Không có dừng lỗ, giá xuống 75.000. Anh ta nhồi thêm để "hạ giá vốn". Lệnh 1R ban đầu thành khoản lỗ vài chục USDT, và đòn bẩy thật tăng dần theo mỗi lần nhồi.', good: 'Trader có kế hoạch không chạm vào dừng lỗ. Giá chạm 78.160, lệnh khớp ở 78.120 do trượt nhẹ. Lỗ 0,005 × 1.880 = 9,4 USDT cộng phí. Anh ta ghi nhật ký: setup, điểm vô hiệu, trượt giá bao nhiêu. Tính lại lỗ trong ngày: 1 lệnh thua, còn được phép 1 lệnh nữa theo quy tắc. Không có lệnh "gỡ".' }
    ],
    keyPoints: [
      'Dừng lỗ đặt ở điểm vô hiệu của ý tưởng; khối lượng tính sau, bằng Số tiền rủi ro ÷ khoảng dừng lỗ.',
      'Ba phương pháp: cấu trúc (mặc định), ATR 1–2 lần, vùng (mép xa của vùng); luôn cộng vùng đệm 0,2–0,5 × ATR và tránh số tròn.',
      'Trên Binance Futures dùng Stop-Market cho dừng lỗ; Stop-Limit có thể không khớp khi giá lao qua.',
      'Mark price ít bị râu nến cục bộ kích hoạt hơn Last price; Price Protection có thể chặn cả lệnh dừng lỗ.',
      'Đặt TP/SL ngay khi mở lệnh, kiểm tra giá thanh lý cách xa ít nhất 3 lần khoảng dừng lỗ (đòn bẩy ≤ 1 ÷ (3 × d + MMR), tối đa 10x), không bao giờ dời dừng lỗ xa hơn.',
      'Chỉ dời về hòa vốn khi đạt từ 1R và đã có đáy (đỉnh) mới xác nhận; khi dời, chọn mức cao hơn giữa "dưới đáy mới trừ đệm" và "giá vào cộng phí".'
    ],
    practice: [
      'Chọn 3 lệnh gần nhất (thật hoặc Demo). Với mỗi lệnh, viết lại: điểm vô hiệu là gì, dừng lỗ đã đặt ở đâu, hai con số có khớp nhau không.',
      'Bật chỉ báo ATR(14) trên H4 của BTC và ETH. Ghi giá trị ATR và tính vùng đệm 0,3 × ATR cho mỗi đồng.',
      'Trên Demo Trading, mở một lệnh nhỏ với TP/SL đặt ngay trong phiếu lệnh, chọn Stop-Market kích hoạt theo Mark price. Kiểm tra tab lệnh chờ và giá thanh lý.',
      'Dùng công cụ position-size cho một setup của bạn, rồi tính giá thanh lý với đòn bẩy 2x, 10x, 40x. Ghi đòn bẩy cao nhất mà giá thanh lý vẫn cách xa ít nhất 3 lần khoảng dừng lỗ, rồi đối chiếu với công thức 1 ÷ (3 × d + MMR) và giới hạn 10x.'
    ],
    quiz: [
      { q: 'Tài khoản 1.000 USDT, rủi ro 1%. Short ETH ở 3.000, đỉnh nhịp hồi 3.080, vùng đệm 12. Khối lượng đúng (làm tròn xuống bước 0,001) là:', options: ['0,125 ETH', '0,333 ETH', '0,1087 ETH', '0,108 ETH'], answer: 3, explain: 'Dừng lỗ = 3.080 + 12 = 3.092, khoảng = 92. Khối lượng = 10 ÷ 92 ≈ 0,1087 → làm tròn xuống 0,108. 0,1087 sai bước khối lượng và làm tròn lên thì vượt rủi ro. 0,125 là tính với khoảng 80 (bỏ đệm). 0,333 là tính với khoảng 30, không gắn với cấu trúc nào.' },
      { q: 'Vì sao nên dùng Stop-Market thay vì Stop-Limit cho dừng lỗ vị thế futures?', options: ['Vì lệnh Stop-Market hoàn toàn không mất phí giao dịch', 'Vì Stop-Limit có thể không khớp khi giá lao qua giá limit', 'Vì Stop-Market luôn khớp đúng giá kích hoạt, không trượt', 'Vì Binance không cho phép dùng Stop-Limit làm dừng lỗ'], answer: 1, explain: 'Theo Binance, Stop-Limit đặt một lệnh limit sau khi kích hoạt; nếu thị trường lao qua giá limit thì lệnh không khớp. Stop-Market gửi lệnh market nên chắc chắn khớp nếu còn thanh khoản, nhưng CÓ THỂ trượt giá và vẫn trả phí taker. Binance vẫn cho phép Stop-Limit, chỉ là không phù hợp để thoát khẩn cấp.' },
      { q: 'Long BTC ở 80.000, dừng lỗ 78.160, vị thế 0,005 BTC, isolated, MMR giả định 0,4%. Với đòn bẩy nào thì giá thanh lý gần đúng nằm TRÊN dừng lỗ (tức bị thanh lý trước)?', options: ['40x', '10x', '2x', '5x'], answer: 0, explain: 'Giá thanh lý ≈ 80.000 × (1 − 1/L + 0,004). 40x: 78.320 > 78.160, thanh lý xảy ra trước dừng lỗ. 10x: 72.320; 5x: 64.320; 2x: 40.320, đều nằm xa dưới dừng lỗ.' },
      { q: 'Long vào 80.000, dừng lỗ 78.160 (1R = 1.840). Giá lên 82.000, chưa có đáy mới nào trên H1. Theo quy tắc của bài, bạn nên:', options: ['Dời dừng lỗ về 80.000 ngay vì lãi đã vượt 1R', 'Dời dừng lỗ xuống 77.000 cho lệnh có chỗ thở', 'Giữ 78.160, chờ đáy mới cao hơn giá vào rồi mới dời', 'Chốt toàn bộ vị thế ngay vì đã có lãi trên 1R'], answer: 2, explain: 'Điều kiện dời về hòa vốn gồm hai phần: đạt từ 1R VÀ có đáy mới xác nhận. Mới có điều kiện đầu, dời ngay dễ bị nhịp điều chỉnh bình thường quét. Dời xuống 77.000 là dời xa hơn, vi phạm quy tắc tuyệt đối. Chốt toàn bộ ở 1,1R không theo kế hoạch mục tiêu (xem bài 5.8).' }
    ],
    sources: [
      { title: 'What Are Stop-Limit and Stop-Market Orders on Binance Futures', url: 'https://www.binance.com/en/support/faq/detail/360036351051', note: 'Binance FAQ, tiếng Anh: Stop-Limit vs Stop-Market, giá kích hoạt Last/Mark và giá trị mặc định' },
      { title: 'What Is Price Protection', url: 'https://www.binance.com/en/support/faq/detail/2b9dc811ce7340469357867122b975dc', note: 'Binance FAQ, tiếng Anh: Price Protection chặn TP/SL khi Last và Mark lệch quá ngưỡng' },
      { title: 'Liquidation Protocols', url: 'https://www.binance.com/en/support/faq/detail/360033525271', note: 'Binance FAQ, tiếng Anh: điều kiện và quy trình thanh lý' },
      { title: 'Average True Range (ATR) and Average True Range Percent (ATRP)', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp', note: 'StockCharts ChartSchool, tiếng Anh: True Range, công thức làm mượt Wilder' },
      { title: 'How to Calculate Position Size in Trading', url: 'https://www.binance.com/en/academy/articles/how-to-calculate-position-size-in-trading', note: 'Binance Academy, tiếng Anh: điểm vô hiệu và công thức khối lượng' },
      { title: 'What Are Stop-Loss and Take-Profit Levels and How to Calculate Them', url: 'https://www.binance.com/en/academy/articles/what-are-stop-loss-and-take-profit-levels-and-how-to-calculate-them', note: 'Binance Academy, tiếng Anh: đặt SL/TP trước khi vào lệnh' }
    ],
    updated: '2026-09'
  },

  'c5-b8': {
    duration: 12,
    level: 'Trung cấp',
    summary: 'Đặt mục tiêu theo vùng và theo R, chốt 50% tại 2R, trailing theo cấu trúc/EMA/Chandelier, pyramiding không tăng rủi ro, reduce-only và khi nào đóng sớm.',
    goals: [
      'Đặt mục tiêu chốt lời theo vùng cản tiếp theo và kiểm tra bằng bội số R',
      'Chốt từng phần và kéo dừng lỗ theo cấu trúc, EMA hoặc Chandelier Exit',
      'Thêm vị thế (pyramiding) sao cho rủi ro tổng không tăng, và nhận ra vì sao nhồi lệnh thua làm rủi ro phình to',
      'Dùng lệnh reduce-only và biết khi nào đóng lệnh sớm vì ý tưởng đã bị vô hiệu'
    ],
    blocks: [
      { type: 'p', text: 'Khi lệnh đã khớp và dừng lỗ đã nằm trên sàn, phần khó nhất bắt đầu: không làm gì sai. Người mới thường chốt lời quá sớm vì sợ mất phần lãi, và giữ lệnh lỗ quá lâu vì hy vọng. Kết quả là lãi nhỏ, lỗ lớn: kỳ vọng âm dù tỷ lệ thắng cao. Van Tharp gọi rủi ro ban đầu của lệnh là R và đo mọi kết quả bằng bội số của R; điều quan trọng là kỳ vọng R dương, không phải tỷ lệ thắng. Bài này đưa ra quy tắc để phần lãi được chạy mà rủi ro vẫn nằm trong khuôn.' },
      { type: 'quote', text: 'Let your profits run and cut your losses short.', cite: 'Richard Donchian, nguyên tắc số 3 trong Donchian Trading Guidelines (StockCharts ChartSchool)' },

      { type: 'h', text: 'Đặt mục tiêu: theo vùng trước, kiểm tra bằng R sau' },
      { type: 'p', text: 'Mục tiêu hợp lý là nơi thị trường có lý do để dừng lại: <strong>vùng kháng cự tiếp theo (với long) hoặc hỗ trợ tiếp theo (với short) trên H4/D1</strong>. Bạn đặt chốt lời ngay trước vùng đó một chút, vì nhiều người khác cũng chờ bán ở đó. Sau đó quy đổi ra R. Nếu vùng cản gần nhất cho dưới 2R, setup không đạt hạng A (bài 5.5) và không nên vào ngay từ đầu.' },
      { type: 'figure', name: 'trade-plan', caption: 'Các mốc 1R, 2R, 3R tính từ khoảng dừng lỗ. Mốc R cho biết lệnh đáng giá bao nhiêu; vùng cản trên biểu đồ cho biết giá có khả năng dừng ở đâu.' },
      { type: 'table', head: ['Mốc (long BTC vào 80.000, dừng lỗ 78.160, 1R = 1.840)', 'Giá', 'Việc cần làm'], rows: [
        ['1R', '81.840', 'Không chốt. Theo dõi điều kiện dời về hòa vốn (cần thêm đáy mới, bài 5.7).'],
        ['2R', '83.680', 'Chốt 50% vị thế bằng lệnh limit reduce-only đặt sẵn. Nếu vùng kháng cự H4 nằm ở 83.500 thì đặt ở 83.450, ngay trước vùng.'],
        ['3R hoặc vùng D1 tiếp theo', '85.520 / vùng 86.000', 'Phần còn lại chạy theo trailing stop; có thể chốt thêm tại vùng D1.']
      ] },

      { type: 'h', text: 'Chốt từng phần: 50% tại 2R, phần còn lại trailing' },
      { type: 'p', text: 'Chốt một phần giải quyết mâu thuẫn tâm lý: một nửa khóa được lãi chắc chắn, một nửa cho cơ hội bắt trọn xu hướng. Quy tắc mẫu: <strong>chốt 50% tại 2R (hoặc ngay trước vùng cản đầu tiên nếu vùng đó nằm trong khoảng 1,5–2R), đồng thời kéo dừng lỗ phần còn lại lên ít nhất mức hòa vốn</strong>. Với setup đảo chiều (ngược xu hướng), chốt 50% sớm hơn, tại 1,5R.' },
      { type: 'calc', title: 'Chốt 50% tại 2R rồi trailing (giả định)', rows: [
        ['Vị thế', 'Long 0,005 BTC ở 80.000, dừng lỗ 78.160 → 1R = 0,005 × 1.840 = 9,2 USDT'],
        ['Chốt 50% tại 2R = 83.680', '0,0025 × (83.680 − 80.000) = 0,0025 × 3.680 = 9,2 USDT (= 1R đã khóa)'],
        ['Dời dừng lỗ phần còn lại lên 81.840 (dưới đáy mới H4)', 'Nếu bị chạm: 0,0025 × 1.840 = 4,6 USDT → tổng lệnh = 9,2 + 4,6 = 13,8 USDT = 1,5R'],
        ['Nếu phần còn lại chạy tới vùng D1 86.000', '0,0025 × 6.000 = 15 USDT → tổng lệnh = 9,2 + 15 = 24,2 USDT ≈ 2,63R'],
        ['So với chốt toàn bộ tại 2R', '0,005 × 3.680 = 18,4 USDT = 2R']
      ], result: 'Chốt từng phần cho kết quả từ 1,5R (xấu nhất sau khi đạt 2R) đến khoảng 2,63R, so với 2R cố định. Không có cách nào luôn tốt hơn; quan trọng là quy tắc được viết trước và làm giống nhau mọi lần để nhật ký đo được. Các số trên chưa trừ phí.' },
      { type: 'p', text: 'Trên Binance Futures, lệnh chốt một phần nên là lệnh limit có tick <strong>Reduce-Only</strong> (chỉ giảm vị thế). Theo Binance, lệnh reduce-only chỉ làm giảm và không bao giờ làm tăng hay đảo chiều vị thế đang mở. Nó bị từ chối nếu cùng chiều với vị thế; khi khối lượng lớn hơn vị thế, sàn có thể từ chối lệnh, và khi vị thế nhỏ đi (ví dụ đã đóng một phần) các lệnh reduce-only ưu tiên thấp hơn có thể bị hủy. Chi tiết xử lý có thể khác theo loại lệnh, nhưng kết quả luôn là vị thế không bị lật sang chiều ngược lại. Nhờ vậy, nếu vị thế đã đóng bởi dừng lỗ, lệnh chốt lời treo trên sàn không thể vô tình mở một vị thế ngược chiều mới.' },

      { type: 'h', text: 'Trailing stop: kéo dừng lỗ theo cấu trúc, EMA hoặc Chandelier' },
      { type: 'p', text: 'Trailing stop (dừng lỗ kéo theo) chỉ di chuyển theo hướng có lợi. StockCharts mô tả nguyên tắc chung của ATR trailing stop: với long, dừng lỗ chỉ được nâng lên khi giá tạo đỉnh mới, không bao giờ hạ xuống. Chọn MỘT phương pháp và ghi vào kế hoạch lệnh trước khi vào.' },
      { type: 'table', head: ['Phương pháp', 'Quy tắc cho long (short làm ngược lại)', 'Phù hợp với'], rows: [
        ['Theo cấu trúc', 'Mỗi khi H4 xác nhận một đáy mới cao hơn (HL), dời dừng lỗ xuống dưới đáy đó cộng vùng đệm 0,2–0,5 × ATR.', 'Mặc định, dễ hiểu nhất, khớp với cách đặt dừng lỗ ban đầu.'],
        ['Theo EMA', 'Đóng phần còn lại khi một nến H4 ĐÓNG CỬA dưới EMA 20 H4 (dùng lệnh market reduce-only hoặc stop-market ngay dưới EMA, cập nhật mỗi nến).', 'Xu hướng mạnh, giá bám EMA; dễ bị quét khi thị trường đi ngang.'],
        ['Chandelier Exit', 'Dừng lỗ = Đỉnh cao nhất 22 kỳ − 3 × ATR(22). Chỉ nâng lên, không hạ xuống.', 'Giữ lệnh theo xu hướng dài; tài sản biến động mạnh có thể cần hệ số lớn hơn 3.']
      ] },
      { type: 'formula', title: 'Chandelier Exit (Charles Le Beau)', expr: 'Long: Dừng lỗ = Đỉnh cao nhất 22 kỳ − 3 × ATR(22). Short: Dừng lỗ = Đáy thấp nhất 22 kỳ + 3 × ATR(22)', vars: [['22 kỳ', 'Khoảng một tháng giao dịch trên nến ngày; trên H4 là 22 nến H4'], ['3', 'Hệ số mặc định; tài sản biến động mạnh thường cần hệ số lớn hơn']], note: 'Ví dụ giả định trên H4: đỉnh cao nhất 22 nến = 86.500, ATR(22) = 900 → 86.500 − 2.700 = 83.800. Nếu dừng lỗ hiện tại đang thấp hơn 83.800 thì nâng lên 83.800; nếu cao hơn thì giữ nguyên.' },
      { type: 'callout', tone: 'warn', title: 'Không nhìn PnL từng phút', text: 'Khi đã có dừng lỗ, chốt lời một phần và quy tắc trailing đặt sẵn trên sàn, việc nhìn con số PnL chưa chốt nhảy lên xuống không cho bạn thêm thông tin nào, chỉ làm tăng khả năng bạn can thiệp trái kế hoạch. Quy tắc: chỉ mở vị thế ra xem vào giờ đóng nến của khung quản lý (ví dụ mỗi nến H4), cập nhật trailing nếu cần, rồi đóng ứng dụng. Tắt thông báo PnL; chỉ giữ cảnh báo giá tại các mức trong kế hoạch.' },

      { type: 'h', text: 'Thêm vị thế đúng cách (pyramiding) và nhồi lệnh thua' },
      { type: 'p', text: 'Pyramiding (thêm vị thế theo hình kim tự tháp) là cộng thêm khối lượng vào lệnh ĐANG LÃI khi xu hướng cho một setup mới. Làm đúng thì rủi ro tổng không tăng. Ba điều kiện bắt buộc: <strong>(1) lệnh gốc đã có dừng lỗ dời lên ít nhất hòa vốn; (2) lần thêm là một setup hợp lệ mới (pullback + kích hoạt), có dừng lỗ theo cấu trúc mới; (3) nếu dừng lỗ chung bị chạm, tổng kết quả của cả vị thế không âm hơn 1R ban đầu</strong>, tốt nhất là không âm. Khối lượng lần thêm nhỏ hơn hoặc bằng lần trước.' },
      { type: 'calc', title: 'Pyramiding: rủi ro tổng không tăng (giả định)', rows: [
        ['Lần 1', 'Long 0,005 BTC ở 80.000, dừng lỗ 78.160, rủi ro 9,2 USDT'],
        ['Giá chạy', 'Giá lên 83.000, H4 xác nhận đáy mới 81.500, H1 cho kích hoạt mới'],
        ['Dời dừng lỗ lần 1', 'Dời lên 81.300 (dưới đáy 81.500, đệm 200) → lần 1 đã khóa lãi 0,005 × 1.300 = 6,5 USDT'],
        ['Lần 2 (nhỏ hơn)', 'Thêm 0,003 BTC ở 83.000, dừng lỗ chung 81.300 → rủi ro riêng = 0,003 × 1.700 = 5,1 USDT'],
        ['Giá vào trung bình', '(0,005 × 80.000 + 0,003 × 83.000) ÷ 0,008 = 649 ÷ 0,008 = 81.125 < dừng lỗ 81.300'],
        ['Nếu dừng lỗ chung bị chạm', '+6,5 − 5,1 = +1,4 USDT (chưa trừ phí): cả vị thế vẫn không lỗ']
      ], result: 'Vị thế lớn hơn (0,008 BTC), nhưng kịch bản xấu nhất vẫn quanh hòa vốn. Rủi ro tổng đã giảm từ 9,2 USDT xuống 0, dù khối lượng tăng. Đó là pyramiding đúng.' },
      { type: 'calc', title: 'Nhồi lệnh thua (average down): rủi ro phình to (giả định)', rows: [
        ['Lần 1', 'Long 0,005 BTC ở 80.000, kế hoạch dừng lỗ 78.160 (rủi ro 9,2 USDT)'],
        ['Giá xuống 78.500', 'Trader hủy dừng lỗ, mua thêm 0,01 BTC "để hạ giá vốn"'],
        ['Giá xuống 77.000', 'Mua thêm 0,02 BTC'],
        ['Tổng vị thế', '0,035 BTC; vốn bỏ ra = 400 + 785 + 1.540 = 2.725 USDT; giá vốn trung bình = 2.725 ÷ 0,035 ≈ 77.857'],
        ['Giá xuống 75.000', 'Lỗ = 2.725 − 0,035 × 75.000 = 2.725 − 2.625 = 100 USDT'],
        ['Quy ra R', '100 ÷ 9,2 ≈ 10,9R = 10% tài khoản; đòn bẩy thật tăng từ 0,4x lên khoảng 2,7x (2.725 ÷ 1.000)']
      ], result: 'Cùng một ý tưởng sai, người giữ dừng lỗ mất 1R; người nhồi lệnh mất gần 11R và vị thế còn đang lớn nhất đúng lúc giá xấu nhất. Nếu giá xuống tiếp, con số tiếp tục phình ra. Nhồi lệnh thua là một trong những con đường cháy tài khoản nhanh nhất (bài 5.10).' },
      { type: 'callout', tone: 'risk', title: 'Ranh giới không được vượt', text: 'Chỉ thêm vào lệnh đang lãi, có dừng lỗ mới, có setup mới. Không bao giờ thêm vào lệnh đang lỗ, không bao giờ thêm khi đã hủy hoặc dời xa dừng lỗ. Người mới nên luyện pyramiding trên Demo ít nhất một tháng trước khi dùng tiền thật.' },

      { type: 'h', text: 'Khi nào đóng lệnh sớm và thói quen quản lý mỗi nến' },
      { type: 'steps', items: [
        { title: 'Chỉ xem lệnh vào giờ đóng nến H4', text: 'Giờ Việt Nam: 03:00, 07:00, 11:00, 15:00, 19:00, 23:00. Bạn không cần xem tất cả; chọn những mốc bạn thức và rảnh, còn lại để lệnh trên sàn tự làm việc.' },
        { title: 'Trả lời 4 câu hỏi theo thứ tự', text: '(1) Bối cảnh D1 còn nguyên không? (2) H4 có đáy (với long) hoặc đỉnh (với short) mới được xác nhận không, nếu có thì dời trailing theo quy tắc. (3) Lệnh chốt 50% reduce-only còn đúng giá, đúng khối lượng không? (4) Có tin lớn trong 4 giờ tới không, nếu có thì dừng lỗ đã nằm trên sàn chưa.' },
        { title: 'Ghi một dòng vào nhật ký', text: 'Ví dụ: "23:00, lệnh +1,3R, D1 nguyên, dời SL lên 81.650 theo đáy H4 81.900". Một dòng mỗi lần xem giúp bạn thấy mình có đang can thiệp ngoài kế hoạch không.' },
        { title: 'Đóng ứng dụng', text: 'Không có câu hỏi nào đòi hành động thì không làm gì. Đó là kết quả bình thường của phần lớn các lần kiểm tra.' }
      ] },
      { type: 'example', title: 'Trailing cho lệnh short (giả định)', text: 'Short 0,1 ETH ở 3.000, dừng lỗ 3.092 (1R = 9,2 USDT). Giá giảm về 2.880 rồi hồi lên 2.940 và quay xuống: H4 xác nhận một đỉnh mới 2.940, thấp hơn giá vào. Lệnh đã lãi hơn 1R (3.000 − 92 = 2.908 đã bị vượt) và có đỉnh mới, nên dời dừng lỗ xuống 2.952 (trên đỉnh 2.940, đệm 12). Nếu bị chạm: 0,1 × (3.000 − 2.952) = +4,8 USDT. Giá tiếp tục giảm tới 2.816 (2R), chốt 0,05 ETH: 0,05 × 184 = 9,2 USDT; phần còn lại tiếp tục trailing trên mỗi đỉnh thấp hơn mới.' },
      { type: 'p', text: 'Dừng lỗ là điểm vô hiệu cuối cùng, nhưng đôi khi ý tưởng đã bị vô hiệu trước khi giá chạm dừng lỗ. Đóng sớm là hợp lệ khi có lý do nằm trong kế hoạch, không phải vì cảm giác lo.' },
      { type: 'list', items: [
        '<strong>Bối cảnh D1 đổi</strong>: nến D1 đóng cửa dưới đáy HL gần nhất (với long). Lý do lớp 1 không còn.',
        '<strong>Vùng thất bại</strong>: nến H4 đóng cửa xuyên hẳn qua vùng bạn dựa vào, dù dừng lỗ (có đệm) chưa bị chạm.',
        '<strong>Hết thời gian</strong>: quy tắc gợi ý, sau 12 nến H4 (2 ngày) mà giá chưa đạt 1R và cứ đi ngang, đóng lệnh. Tiền nằm im có chi phí funding và chiếm chỗ cho setup khác.',
        '<strong>Sự kiện bất thường</strong>: tin lớn ngoài lịch, sàn gặp sự cố, funding tăng cực đoan ngược chiều bạn. Giảm hoặc đóng, không gỡ dừng lỗ.',
        '<strong>Không phải lý do để đóng</strong>: "thấy lãi giảm từ 1,8R xuống 1,2R", "sợ", "người trong nhóm bảo đóng". Những điều đó đã được xử lý bằng quy tắc chốt từng phần và trailing.'
      ] },
      { type: 'scenario', title: 'Lệnh đã lãi 1,8R rồi quay đầu', setup: 'Long 0,005 BTC ở 80.000, dừng lỗ 78.160. Giá lên 83.300 (khoảng 1,8R), chưa tới mức chốt 50% ở 83.680, rồi điều chỉnh về 81.900. H4 vẫn đang tạo đáy cao hơn.', bad: 'Trader cảm tính nhìn PnL từ +16,5 USDT xuống +9,5 USDT trong 3 giờ, hoảng và đóng toàn bộ bằng market, trượt giá. Hôm sau giá lên 86.000. Anh ta tiếc, mở lệnh mới ở 86.000 không có setup, đòn bẩy cao hơn "để bù". Lệnh này dính đỉnh.', good: 'Trader có kế hoạch đã đặt sẵn limit reduce-only 50% ở 83.680 và quy tắc trailing theo cấu trúc H4. Nhịp về 81.900 tạo đáy mới 81.900 > 80.000 và lệnh đã từng đạt trên 1R, nên anh ta dời dừng lỗ lên 81.650 (dưới đáy, đệm 250). Anh ta chỉ xem lại vào giờ đóng nến H4. Giá lên 83.680, 50% được chốt tự động; phần còn lại theo trailing tới khi bị chạm. Mọi quyết định đã được viết từ trước.' }
    ],
    keyPoints: [
      'Mục tiêu đặt ngay trước vùng cản tiếp theo, rồi quy ra R; vùng gần nhất dưới 2R thì setup không đạt.',
      'Quy tắc mẫu: chốt 50% tại 2R bằng limit reduce-only, phần còn lại trailing theo cấu trúc, EMA 20 H4 hoặc Chandelier Exit (đỉnh 22 kỳ − 3 × ATR).',
      'Trailing và dừng lỗ chỉ đi một chiều: về phía giảm rủi ro.',
      'Pyramiding chỉ khi lệnh gốc đã hòa vốn, có setup mới và dừng lỗ chung giữ tổng kết quả xấu nhất không âm; nhồi lệnh thua làm rủi ro phình từ 1R lên hàng chục R.',
      'Đóng sớm khi ý tưởng bị vô hiệu (D1 đổi, vùng thất bại, hết thời gian), không vì PnL dao động; chỉ xem lệnh vào giờ đóng nến.'
    ],
    practice: [
      'Viết mẫu "kế hoạch quản lý lệnh" gồm: mục tiêu theo vùng, mức chốt 50%, phương pháp trailing đã chọn, điều kiện đóng sớm, giờ xem lệnh. Dán vào nhật ký, dùng cho mọi lệnh.',
      'Tính lại bảng pyramiding với số của bạn: lần 1, lần 2, dừng lỗ chung; kiểm tra kết quả xấu nhất có âm không.',
      'Bật chỉ báo Chandelier Exit (hoặc tính tay đỉnh 22 kỳ − 3 × ATR) trên H4 của BTC và so sánh với dừng lỗ theo cấu trúc tại cùng thời điểm.',
      'Trên Demo, đặt một lệnh limit reduce-only chốt 50%. Sau đó thử nhập khối lượng lớn hơn vị thế và ghi lại sàn xử lý thế nào (từ chối hay hủy); kiểm tra rằng trong mọi trường hợp vị thế không bị mở sang chiều ngược lại.'
    ],
    quiz: [
      { q: 'Long 0,01 BTC ở 80.000, dừng lỗ 78.000 (1R = 20 USDT). Bạn chốt 50% tại 2R, dời dừng lỗ phần còn lại lên 82.000 và bị chạm ở đó. Tổng kết quả (chưa phí) là:', options: ['+40 USDT (2R)', '+20 USDT (1R)', '+30 USDT (1,5R)', '+10 USDT (0,5R)'], answer: 2, explain: '2R = 84.000. Chốt 0,005 × 4.000 = 20 USDT. Phần còn lại 0,005 × (82.000 − 80.000) = 10 USDT. Tổng 30 USDT = 1,5R. 40 USDT là nếu chốt toàn bộ tại 2R. 20 và 10 USDT bỏ sót một trong hai phần.' },
      { q: 'H4: đỉnh cao nhất 22 nến = 3.400, ATR(22) = 30. Dừng lỗ hiện tại của lệnh long ETH đang ở 3.330. Theo Chandelier Exit hệ số 3, bạn nên:', options: ['Hạ dừng lỗ xuống 3.310', 'Giữ nguyên 3.330 vì Chandelier (3.310) thấp hơn dừng lỗ hiện tại', 'Đóng lệnh ngay vì giá dưới đỉnh', 'Nâng dừng lỗ lên 3.370'], answer: 1, explain: 'Chandelier = 3.400 − 3 × 30 = 3.310, thấp hơn 3.330. Trailing chỉ đi một chiều, nên giữ 3.330, không hạ xuống 3.310. 3.370 là dùng hệ số 1. Giá dưới đỉnh không phải tín hiệu đóng lệnh.' },
      { q: 'Lần 1: long 0,004 BTC ở 80.000, đã dời dừng lỗ lên 81.000. Bạn thêm 0,002 BTC ở 83.000 với dừng lỗ chung 81.000. Nếu dừng lỗ bị chạm, kết quả (chưa phí) là:', options: ['−4 USDT', '+4 USDT', '−8 USDT', '0 USDT'], answer: 3, explain: 'Lần 1: 0,004 × (81.000 − 80.000) = +4. Lần 2: 0,002 × (81.000 − 83.000) = −4. Tổng 0: kịch bản xấu nhất là hòa vốn, rủi ro tổng không tăng. −4 là chỉ tính lần 2; +4 là chỉ tính lần 1; −8 là nhầm dấu.' },
      { q: 'Tình huống nào là lý do HỢP LỆ để đóng lệnh long sớm, trước khi chạm dừng lỗ?', options: ['Nến D1 đóng cửa dưới đáy HL gần nhất, lý do bối cảnh không còn', 'PnL giảm từ +1,8R xuống +1,2R trong 2 giờ', 'Một thành viên trong nhóm chat nói sắp sập', 'Bạn thấy lo và mất ngủ'], answer: 0, explain: 'Bối cảnh D1 đổi là ý tưởng đã bị vô hiệu, nằm trong kế hoạch. PnL dao động đã được xử lý bằng chốt từng phần và trailing. Tin đồn nhóm chat không phải dữ kiện của kế hoạch. Nếu lo đến mất ngủ thì đó là dấu hiệu khối lượng quá lớn, cần sửa ở lệnh sau, không phải lý do đóng theo cảm xúc (dù giảm khối lượng để an toàn là chấp nhận được).' }
    ],
    sources: [
      { title: 'Chandelier Exit', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-overlays/chandelier-exit', note: 'StockCharts ChartSchool, tiếng Anh: công thức 22 kỳ, 3 × ATR' },
      { title: 'ATR Trailing Stops', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/atr-trailing-stops', note: 'StockCharts ChartSchool, tiếng Anh: trailing stop chỉ đi theo hướng xu hướng' },
      { title: 'Summary of Failed Orders in Binance Futures', url: 'https://www.binance.com/en/support/faq/detail/360039707291', note: 'Binance FAQ, tiếng Anh: quy tắc lệnh reduce-only và lý do bị từ chối' },
      { title: 'A Short Lesson on R and R-multiple', url: 'https://vantharp.com/wp-content/uploads/2018/06/A_Short_Lesson_on_R_and_R-multiple.pdf', note: 'Van Tharp Institute, tiếng Anh: R, R-multiple và kỳ vọng' },
      { title: 'Donchian Trading Guidelines', url: 'https://chartschool.stockcharts.com/table-of-contents/overview/donchian-trading-guidelines', note: 'StockCharts ChartSchool, tiếng Anh: để lãi chạy, cắt lỗ sớm' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
