const lessons = {
  'c5-b12': {
    duration: 19,
    level: 'Trung cấp',
    summary: 'Cách đánh futures với ký quỹ 10–20 USDT mỗi lệnh: đòn bẩy là kết quả, mức lệnh tối thiểu thật của Binance, phí theo R, quy trình 10 bước và 3 lệnh mẫu có số.',
    goals: [
      'Tính được rủi ro thật của một lệnh "10 USDT, 20x" và vốn tối thiểu tương ứng, thay vì đoán',
      'Chọn đúng cặp và khung thời gian cho vốn nhỏ dựa trên mức lệnh tối thiểu, phí và ATR thật',
      'Đánh một lệnh vốn nhỏ theo đúng 10 bước: từ R bằng USDT tới TP/SL và nhật ký',
      'Biết khi nào PHẢI bỏ lệnh vì dừng lỗ cấu trúc vượt giới hạn của mức tối thiểu',
      'Tính được kỳ vọng sau phí trong hai trường hợp (có và không có lợi thế), hiểu vì sao vốn nhỏ không tự nhiên có lãi, và lập kế hoạch tăng vốn không cần tăng rủi ro hay đòn bẩy'
    ],
    blocks: [
      { type: 'h', text: 'Hiểu lầm số 1: "lệnh nhỏ thì phải bẩy cao"' },
      { type: 'p', text: 'Câu hỏi hay gặp nhất: "Mình chỉ đánh 10–20 USDT mỗi lệnh, phải bẩy cao mới đủ số tối thiểu, vậy đánh sao cho khỏi cháy?". Câu hỏi này coi đòn bẩy là thứ chọn trước. Thật ra thứ quyết định bạn mất bao nhiêu khi sai là <strong>giá trị danh nghĩa</strong> (notional, tổng giá trị vị thế) và <strong>khoảng cách dừng lỗ</strong>.' },
      { type: 'formula', title: 'Rủi ro thật của một lệnh futures', expr: 'Rủi ro (USDT) = Ký quỹ × Đòn bẩy × % dừng lỗ = Giá trị danh nghĩa × % dừng lỗ', vars: [['Ký quỹ', 'Số USDT bạn khóa vào lệnh (10–20 USDT)'], ['Đòn bẩy', 'Con số trên thanh trượt của sàn'], ['% dừng lỗ', 'Khoảng cách từ giá vào tới dừng lỗ, theo % giá vào'], ['Giá trị danh nghĩa', 'Ký quỹ × Đòn bẩy = Khối lượng × Giá']], note: 'Đảo lại: Danh nghĩa = R ÷ % dừng lỗ, rồi Đòn bẩy = Danh nghĩa ÷ Ký quỹ muốn bỏ. Đòn bẩy là KẾT QUẢ, không phải đầu vào.' },
      { type: 'p', text: 'Hai người cùng vào danh nghĩa 200 USDT, cùng dừng lỗ 1%. A bỏ 20 USDT ký quỹ, 10x. B bỏ 10 USDT, 20x. Chạm dừng lỗ, cả hai mất đúng 2 USDT cộng phí. Đòn bẩy cao hơn của B chỉ kéo giá thanh lý lại gần, và nếu B không đặt dừng lỗ thì một cú giật nhỏ là mất trọn ký quỹ. Đòn bẩy cao nguy hiểm vì nó khiến người ta <em>quên</em> tính khối lượng.' },
      { type: 'table', head: ['Ký quỹ × đòn bẩy', 'Danh nghĩa', 'Dừng lỗ 0,5%', 'Dừng lỗ 1%', 'Dừng lỗ 2%'], rows: [
        ['10 USDT × 10x', '100 USDT', '0,5 USDT · vốn ≥ 50 / ≥ 100', '1 USDT · vốn ≥ 100 / ≥ 200', '2 USDT · vốn ≥ 200 / ≥ 400'],
        ['10 USDT × 20x', '200 USDT', '1 USDT · vốn ≥ 100 / ≥ 200', '2 USDT · vốn ≥ 200 / ≥ 400', '4 USDT · vốn ≥ 400 / ≥ 800'],
        ['10 USDT × 50x', '500 USDT', '2,5 USDT · vốn ≥ 250 / ≥ 500', '5 USDT · vốn ≥ 500 / ≥ 1.000', '10 USDT · vốn ≥ 1.000 / ≥ 2.000'],
        ['20 USDT × 10x', '200 USDT', '1 USDT · vốn ≥ 100 / ≥ 200', '2 USDT · vốn ≥ 200 / ≥ 400', '4 USDT · vốn ≥ 400 / ≥ 800'],
        ['20 USDT × 20x', '400 USDT', '2 USDT · vốn ≥ 200 / ≥ 400', '4 USDT · vốn ≥ 400 / ≥ 800', '8 USDT · vốn ≥ 800 / ≥ 1.600'],
        ['20 USDT × 50x', '1.000 USDT', '5 USDT · vốn ≥ 500 / ≥ 1.000', '10 USDT · vốn ≥ 1.000 / ≥ 2.000', '20 USDT · vốn ≥ 2.000 / ≥ 4.000']
      ] },
      { type: 'p', text: 'Cách đọc: "2 USDT · vốn ≥ 200 / ≥ 400" là lệnh mất 2 USDT khi chạm dừng lỗ (chưa phí); để khoản đó ≤ 1% vốn thì cần ít nhất 200 USDT, ≤ 0,5% thì ít nhất 400 USDT. Đây là khung 0,5–1% của bài 5.9. Lệnh quen thuộc "10 USDT, 50x, dừng lỗ 2%" là rủi ro 10 USDT, chỉ hợp chuẩn 1% với tài khoản 1.000 USDT.' },
      { type: 'callout', tone: 'warn', title: 'Câu hỏi đúng không phải "bẩy bao nhiêu"', text: 'Hỏi: "Nếu sai, mình chấp nhận mất bao nhiêu USDT?" rồi "Dừng lỗ cấu trúc cách bao nhiêu %?". Hai con số này cho ra danh nghĩa; ký quỹ muốn khóa cho ra đòn bẩy. Đi ngược thứ tự là con đường ngắn nhất tới cháy tài khoản (bài 5.10).' },

      { type: 'h', text: 'Mức lệnh tối thiểu của Binance quyết định bạn đánh được cặp nào' },
      { type: 'p', text: 'Theo exchangeInfo của Binance Futures ngày 27/09/2026, BTC ghi giá trị tối thiểu 50 USDT nhưng bước khối lượng nhỏ nhất là 0,001 BTC; ở giá khoảng 84.750 thì 0,001 BTC đã khoảng 85 USDT. Lệnh BTC nhỏ nhất thực tế vì vậy là khoảng 85 USDT danh nghĩa.' },
      { type: 'table', head: ['Hợp đồng', 'Lệnh nhỏ nhất thực tế', 'Bước khối lượng', 'Dừng lỗ tối đa khi R = 1 USDT', 'Khi R = 2 USDT'], rows: [
        ['BTCUSDT', '≈ 85 USDT (0,001 BTC)', '0,001 BTC', '≈ 1,18%', '≈ 2,35%'],
        ['ETHUSDT', '20 USDT', '0,001 ETH', '5%', '10%'],
        ['SOL, BNB, XRP, DOGE (USDT)', '5 USDT', '0,01 / 0,01 / 0,1 / 1', '20%', '40%']
      ] },
      { type: 'formula', title: 'Dừng lỗ tối đa cho phép', expr: 'Dừng lỗ tối đa (%) = R ÷ Giá trị lệnh tối thiểu', vars: [['R', 'Số USDT chấp nhận mất cho lệnh này'], ['Giá trị lệnh tối thiểu', 'Lệnh nhỏ nhất thực tế của cặp đó']], note: 'Dừng lỗ cấu trúc xa hơn con số này thì sàn buộc bạn vào lớn hơn R. Trừ thêm khoảng 0,07% phí khứ hồi. Quy tắc lệnh thay đổi theo thời gian, luôn xem Trading Rules trên sàn.' },
      { type: 'p', text: 'Với R khoảng 1–2 USDT, BTC chỉ đánh được khi dừng lỗ hẹp hơn khoảng 1,2–2,3%, trong khi ATR khung 4 giờ của BTC đã khoảng 1%. ETH và các cặp lớn mức 5 USDT cho bạn chỗ đặt dừng lỗ đúng cấu trúc. Nhưng coin nhỏ dù tối thiểu thấp vẫn có sổ lệnh mỏng, spread rộng, râu dài: ngày 27/09/2026 spread SOL khoảng 0,008%, DOGE khoảng 0,010%, altcoin nhỏ kém hơn nhiều bậc. Quy tắc của khóa học: vốn nhỏ chỉ đánh ETH và vài cặp lớn thanh khoản tốt; BTC chỉ khi dừng lỗ lọt dưới mức tối đa.' },

      { type: 'h', text: 'Phí: kẻ thù số 1 của lệnh nhỏ' },
      { type: 'p', text: 'Phí USDⓈ-M Futures cho người dùng thường: maker 0,02%, taker 0,05% trên danh nghĩa. Market luôn là taker, limit chờ trong sổ lệnh là maker, stop-market khi kích hoạt là taker. Phí tính theo danh nghĩa, còn R tính theo khoảng dừng lỗ: dừng lỗ càng hẹp, phí càng ăn nhiều phần trăm của R.' },
      { type: 'formula', title: 'Phí tính theo R và tỷ lệ thắng hoà vốn', expr: 'c = (Phí vào + Phí ra) ÷ % dừng lỗ;  Tỷ lệ thắng hoà vốn = (1 + c) ÷ (1 + k)', vars: [['c', 'Phí khứ hồi tính bằng phần của R'], ['Phí vào + ra', '0,10% nếu market hai chiều; 0,07% nếu vào limit, ra stop-market'], ['k', 'Tỷ lệ R:R, ví dụ 2 với R:R 1:2']], note: 'Không phí, R:R 1:2 cần thắng 33,3% để hoà. Có phí luôn cao hơn.' },
      { type: 'p', text: 'Bảng dùng ATR(14) trung vị thật của ETHUSDT đến 27/09/2026, dừng lỗ 1–1,5 ATR khung vào lệnh. Khung 5 phút do khóa học tự tính từ khoảng 1.500 nến (22–27/09/2026); trung vị ra khoảng 0,16–0,17% tùy cửa sổ đo, nên coi là con số gần đúng. Đây là ảnh chụp một giai đoạn.' },
      { type: 'table', head: ['Khung vào lệnh', 'ATR ETH', 'Dừng lỗ 1–1,5 ATR', 'Phí market-market (% R)', 'Phí limit vào (% R)', 'Tỷ lệ thắng hoà vốn R:R 1:2 (market / limit)'], rows: [
        ['5 phút', '≈ 0,17%', '0,17–0,26%', '39–58%', '27–41%', '46–53% / 42–47%'],
        ['15 phút', '0,33%', '0,33–0,50%', '20–30%', '14–21%', '40–43% / 38–40%'],
        ['1 giờ', '0,74%', '0,74–1,11%', '9–14%', '6–10%', '36–38% / 35–37%'],
        ['4 giờ', '1,41%', '1,41–2,11%', '5–7%', '3–5%', '35–36% / 34–35%']
      ] },
      { type: 'p', text: 'BTC còn tệ hơn: ATR 5 phút cùng giai đoạn chỉ khoảng 0,12–0,13%, dừng lỗ 1 ATR với market hai chiều thì phí chiếm khoảng 77–83% R, ở R:R 1:2 cần thắng khoảng 59–61% chỉ để hoà. Kết luận có số: <strong>scalp khung 1–5 phút bằng lệnh market gần như không thể có lãi bền</strong>.' },
      { type: 'p', text: 'Khung hợp lý cho người mới vốn nhỏ: <strong>H4 bối cảnh và vùng, H1 kích hoạt</strong> (khung 3 lớp ở bài 5.5). Được dùng M15 để kích hoạt khi dừng lỗ cấu trúc vẫn từ khoảng 0,7%: phí vào limit, ra stop-market khi đó chiếm 10% R, tỷ lệ thắng hoà vốn ở R:R 1:2 là 36,7%. Dừng lỗ M15 chỉ 0,3–0,4% thì bỏ qua.' },
      { type: 'callout', tone: 'risk', title: 'Scalp vốn nhỏ trả phí cho sàn trước khi trả cho bạn', text: 'Scalp ETH 5 phút, R = 2 USDT, dừng lỗ 0,26%: danh nghĩa khoảng 775 USDT, phí market hai chiều khoảng 0,78 USDT, gần 0,4R mỗi lệnh. 10 lệnh/ngày trong 30 ngày là khoảng 233 USDT phí, lớn hơn cả tài khoản 200 USDT.' },

      { type: 'h', text: 'Quy trình đánh lệnh vốn nhỏ: 10 bước' },
      { type: 'p', text: 'Làm trên giấy hoặc trong công cụ bên dưới trước khi mở phiếu lệnh. Dẫn chéo: bài 5.5 (setup), 5.6 (vào lệnh), 5.7 (dừng lỗ), 5.8 (quản lý), 5.9 (thao tác trên Binance).' },
      { type: 'steps', items: [
        { title: '1. Xác định R bằng USDT', text: 'R = 0,5–1% vốn như bài 5.9, kể cả khi vốn rất nhỏ. Không bao giờ nâng lên 2% vì vốn nhỏ. Nếu 1% vốn chỉ còn 0,5–1 USDT và mức tối thiểu khiến hầu hết lệnh đúng cấu trúc không đặt được, đó là tín hiệu vốn chưa đủ cho futures: luyện trên Demo Trading hoặc giao dịch spot không đòn bẩy cho tới khi vốn lớn hơn. Tính lại R mỗi đầu tuần theo số dư thật.' },
        { title: '2. Chọn cặp', text: 'ETH hoặc cặp lớn mức 5 USDT, thanh khoản tốt. Không coin nhỏ, coin mới niêm yết, coin đang bị bàn tán.' },
        { title: '3. Setup hạng A', text: 'Theo bài 5.5: bối cảnh H4 rõ, vùng hợp lệ, kích hoạt H1 đã đóng nến, R:R tới vùng cản gần nhất từ 2R. Không đạt thì dừng.' },
        { title: '4. Dừng lỗ theo cấu trúc + đệm', text: 'Dưới đáy (long) hoặc trên đỉnh (short) của nhịp kích hoạt, cộng 0,2–0,5 × ATR, tránh số tròn (bài 5.7).' },
        { title: '5. Kiểm tra dừng lỗ tối đa', text: 'Dừng lỗ ≤ R ÷ mức tối thiểu (trừ khoảng 0,07%), phí khứ hồi ≤ khoảng 15% R. Vượt thì đổi cặp hoặc bỏ.' },
        { title: '6. Tính khối lượng', text: 'Khối lượng = R ÷ (khoảng dừng lỗ + phí khứ hồi trên một coin), làm tròn XUỐNG. Đòn bẩy thật (danh nghĩa ÷ vốn) ≤ 3x.' },
        { title: '7. Chọn ký quỹ, ra đòn bẩy', text: 'Đòn bẩy = danh nghĩa ÷ ký quỹ muốn bỏ. Phải ≤ 1 ÷ (3 × % dừng lỗ + MMR) và không quá 10x (trần thanh trượt bài 5.9; thấp hơn càng tốt). Riêng Binance còn giới hạn 20x cho tài khoản futures chưa đủ 30 ngày (từ 07/12/2025). Nếu ký quỹ định bỏ đòi đòn bẩy cao hơn, bỏ thêm ký quỹ; khối lượng và rủi ro không đổi. Isolated, one-way.' },
        { title: '8. Vào bằng limit tại vùng', text: 'Sau khi nến kích hoạt đóng, đặt limit (maker) ở giá định trước. Không khớp thì thôi, không đuổi bằng market.' },
        { title: '9. TP/SL cùng lúc', text: 'SL stop-market, trigger Mark Price. TP1 tại 2R cho 50%, TP2 tại vùng cản kế tiếp. Kiểm tra tab Positions thấy đủ SL, TP.' },
        { title: '10. Quản lý và nhật ký', text: 'Chốt 50% tại 2R; dời SL về hoà vốn khi có cấu trúc mới, không dời vì sốt ruột (bài 5.8). Ghi lý do, giá, R, phí, ảnh biểu đồ, cảm xúc.' }
      ] },
      { type: 'tool', name: 'order-plan', note: 'Công cụ trừ phí vào R trước, rồi cho ra danh nghĩa, rủi ro thật, đòn bẩy cần, đòn bẩy an toàn, phí theo % R, tỷ lệ thắng hoà vốn và dừng lỗ tối đa cho phép.' },

      { type: 'h', text: 'Ba lệnh mẫu hoàn chỉnh (tài khoản 200 USDT, giá giả định)' },
      { type: 'p', text: 'Tài khoản giả định 200 USDT, R = 1% = 2 USDT, giá tròn giả định gần giá thật cuối 9/2026, MMR giả định 0,5%. Ví dụ để luyện tính, không phải tín hiệu.' },
      { type: 'figure', name: 'trade-plan', caption: 'Mỗi lệnh mẫu có đủ: điểm vào, dừng lỗ, TP1 tại 2R cho một nửa, TP2 tại vùng cản kế tiếp.' },
      { type: 'calc', title: 'Lệnh 1: long ETH, pullback H4, kích hoạt H1', rows: [
        ['Vùng, kích hoạt', 'H4 tăng; giá về hỗ trợ H4 2.640–2.670; nến H1 nhấn chìm tăng đã đóng, đáy nhịp 2.627'],
        ['Vào, dừng lỗ', 'Limit 2.660; ATR H1 ≈ 19,7, đệm 0,3 ATR ≈ 6 → SL 2.621 (cách 39 = 1,466%)'],
        ['Kiểm tra tối thiểu', '2 ÷ 20 = 10% tối đa → đạt'],
        ['Khối lượng', '2 ÷ (39 + phí ≈ 1,86) ≈ 0,0489 → 0,048 ETH; danh nghĩa 127,68 USDT (0,64x vốn)'],
        ['Ký quỹ, đòn bẩy', '10x → ký quỹ ≈ 12,77 USDT; an toàn tối đa 1 ÷ (3 × 1,466% + 0,5%) ≈ 20,4x'],
        ['Thanh lý gần đúng', '2.660 × (1 − 0,1 + 0,005) = 2.407,3, cách 9,5%'],
        ['Phí', 'Vào ≈ 0,026 + ra ở SL ≈ 0,063 USDT (≈ 4,8% R)'],
        ['TP1, TP2', '2.738 (2R) và 2.776 (≈ 3R, dưới kháng cự 2.780–2.800), mỗi mức 0,024 ETH'],
        ['Thua', '1,87 + 0,09 = −1,96 USDT'],
        ['Thắng cả hai', '1,872 + 2,784 − phí ≈ 0,05 = +4,60 USDT (≈ 2,3R); TP1 rồi hoà vốn ≈ +1,80']
      ], result: 'Ký quỹ 12,77 USDT, 10x, nhưng rủi ro khóa ở gần đúng 2 USDT. Khoảng dừng lỗ và khối lượng quyết định lỗ, không phải đòn bẩy.' },
      { type: 'calc', title: 'Lệnh 2: short SOL, phá hỗ trợ H4 rồi retest', rows: [
        ['Vùng, kích hoạt', 'SOL giảm từ khoảng 125, H4 đóng dưới hỗ trợ 121,0–121,6; retest từ dưới, nến H1 từ chối, đỉnh 122,42'],
        ['Vào, dừng lỗ', 'Limit bán 121,3; ATR H1 ≈ 1,10, đệm ≈ 0,33 → SL 122,75 (cách 1,45 = 1,195%)'],
        ['Khối lượng', '2 ÷ (1,45 + phí ≈ 0,085) ≈ 1,303 → 1,30 SOL; danh nghĩa 157,69 USDT'],
        ['Ký quỹ, đòn bẩy', '10x → ≈ 15,77 USDT; an toàn tối đa ≈ 24,5x'],
        ['Thanh lý gần đúng', '121,3 × (1 + 0,1 − 0,005) ≈ 132,82, cách 9,5%'],
        ['TP1, TP2', '118,4 (2R) và 117,0 (≈ 3R, trên hỗ trợ 116,5–117), mỗi mức 0,65 SOL'],
        ['Thua', '1,885 + phí ≈ 0,11 = −2,00 USDT'],
        ['Thắng cả hai', '1,885 + 2,795 − phí ≈ 0,06 = +4,62 USDT (≈ 2,3R); TP1 rồi hoà vốn ≈ +1,80']
      ], result: 'Short tính y như long. Funding giữ một kỳ với 158 USDT danh nghĩa ở 0,01% chỉ khoảng 0,016 USDT, nhưng vẫn ghi nhật ký.' },
      { type: 'calc', title: 'Lệnh 3: long BTC đẹp nhưng PHẢI BỎ', rows: [
        ['Setup', 'BTC 85.000, pullback H4, kích hoạt H1 đã đóng; đáy cấu trúc H4 82.100'],
        ['Dừng lỗ cấu trúc', 'Đệm 0,3 × ATR H4 (≈ 858) ≈ 257 → 82.100 − 257 = 81.843 (cách 3.157 = 3,71%)'],
        ['Khối lượng theo R', '2 ÷ (3.157 + 59,5) ≈ 0,00062 BTC < tối thiểu 0,001 BTC'],
        ['Dừng lỗ tối đa', '2 ÷ 85 ≈ 2,35% < 3,71%'],
        ['Cố vào 0,001 BTC', '3,16 + phí 0,06 ≈ 3,22 USDT ≈ 1,6R'],
        ['Kéo SL lên 83.000 cho vừa', 'Rủi ro 2 USDT nhưng SL nằm TRÊN đáy cấu trúc: ý tưởng chưa sai đã có thể bị quét']
      ], result: 'Bỏ lệnh BTC. Không tăng rủi ro vì mức tối thiểu (đó chính là "nâng R lên vì vốn nhỏ"), không bóp dừng lỗ vào trong cấu trúc; tìm setup trên ETH hoặc chờ. Bỏ lệnh đẹp là chi phí của vốn nhỏ, không phải thất bại.' },

      { type: 'h', text: 'Kỳ vọng thật, kế hoạch tăng vốn và những điều cấm' },
      { type: 'p', text: 'Nói thẳng: đánh đúng quy trình không làm vốn nhỏ tự có lãi. Quy trình chỉ khóa khoản lỗ mỗi lệnh ở 1R. Lãi hay lỗ về lâu dài phụ thuộc vào việc bạn có <strong>lợi thế thật</strong> (kỳ vọng dương đã kiểm chứng) hay không, và phần lớn người mới chưa có. Cái lợi của vốn nhỏ là học phí rẻ trong lúc bạn kiểm tra điều đó.' },
      { type: 'formula', title: 'Kỳ vọng mỗi lệnh sau phí', expr: 'Kỳ vọng (R) = WR × R thắng TB − (1 − WR) × R thua TB − c', vars: [['WR', 'Tỷ lệ thắng đo từ nhật ký hoặc backtest'], ['R thắng TB, R thua TB', 'Trung bình R của lệnh thắng và độ lớn R của lệnh thua'], ['c', 'Phí khứ hồi tính theo R, lệnh nào cũng trả']], note: 'Phí trừ vào mọi lệnh, thắng cũng như thua. Kỳ vọng trước phí bằng 0 thì sau phí chắc chắn âm.' },
      { type: 'calc', title: 'Trường hợp lạc quan: NẾU bạn có lợi thế thật (giả định)', rows: [
        ['Tài khoản, R', '200 USDT, R = 1% = 2 USDT'],
        ['Số lệnh, tỷ lệ thắng, R:R', '20 lệnh/tháng, thắng 40%, lệnh thắng trung bình +2R (giả định, chưa ai chứng minh cho bạn)'],
        ['Phí theo R', 'Dừng lỗ ≈ 1,47%, vào limit ra stop-market: c ≈ 0,07% ÷ 1,47% ≈ 0,048R'],
        ['Kỳ vọng mỗi lệnh', '0,4 × 2 − 0,6 × 1 − 0,048 ≈ +0,152R'],
        ['Cả tháng', '20 × 0,152 ≈ 3,05R ≈ 6,1 USDT ≈ +3% vốn; phí trả sàn ≈ 1,9 USDT']
      ], result: 'Khoảng +6 USDT một tháng, và chỉ khi mọi giả định đúng. Lệnh thắng trung bình +2R là con số đẹp: backtest của chính khóa học cho thắng trung bình chỉ +1,42R.' },
      { type: 'calc', title: 'Trường hợp thực tế hơn: chưa có lợi thế đã kiểm chứng', rows: [
        ['Hệ thống mẫu bài 7.1 (backtest 455 lệnh BTC/ETH)', 'Thắng 38%, thắng TB +1,42R, thua TB −0,85R → kỳ vọng đo được +0,016R/lệnh sau phí và funding; giai đoạn 2024–2026 là −0,119R/lệnh'],
        ['Người mới chưa chứng minh lợi thế', 'Kỳ vọng trước phí ≈ 0R'],
        ['Sau phí', '0 − 0,048 ≈ −0,048R mỗi lệnh'],
        ['Cả tháng, 20 lệnh, R = 2 USDT', '20 × (−0,048) ≈ −0,95R ≈ −1,9 USDT ≈ −1% vốn: đúng bằng số phí trả sàn']
      ], result: 'Đây là kịch bản thường gặp nhất. Quy trình đúng giữ khoản lỗ nhỏ và chậm, nhưng không biến kỳ vọng 0 thành dương. Muốn biết mình ở kịch bản nào, phải chứng minh lợi thế bằng backtest, forward test và giao dịch giấy (bài 7.2) trước khi tin vào bất kỳ con số lãi nào.' },
      { type: 'p', text: '<strong>Vì sao không nâng rủi ro khi vốn nhỏ?</strong> Nâng R từ 1% lên 2% không thay đổi kỳ vọng tính theo R, chỉ nhân đôi tốc độ thắng hoặc thua. Với kỳ vọng ≈ 0 hoặc âm, đó là nhân đôi tốc độ mất tiền và độ sâu của chuỗi thua (bài 6.3). Vốn quá nhỏ để đánh đúng R thì luyện demo hoặc spot, không phải tăng R.' },
      { type: 'calc', title: 'Cùng người đó scalp 5 phút, 10 lệnh/ngày (giả định)', rows: [
        ['Dừng lỗ', '1,5 × ATR 5m ETH ≈ 0,26%, R 2 USDT → danh nghĩa ≈ 775 USDT'],
        ['Phí theo R (market hai chiều)', 'c ≈ 0,10% ÷ 0,258% ≈ 0,39R'],
        ['Kỳ vọng, thắng 40%, R:R 1:2', '0,4 × 1,61 − 0,6 × 1,39 ≈ −0,19R'],
        ['300 lệnh/tháng', '≈ −56R ≈ −113 USDT'],
        ['Thắng được 45%', 'Vẫn ≈ −0,04R/lệnh; hoà vốn cần ≈ 46%']
      ], result: 'Ngay cả với giả định lạc quan (thắng 40% ở 2R), chỉ đổi khung và số lệnh: từ khoảng +3% thành khoảng −56% một tháng. Thứ thay đổi là phí và nhiễu, và đây còn là kịch bản có lợi thế.' },
      { type: 'p', text: '<strong>Kế hoạch tăng vốn:</strong> mỗi đầu tuần tính lại R = 0,5–1% số dư thật (250 USDT, R 1% thì R = 2,5; giảm còn 180 thì R = 1,8). Không tăng đòn bẩy để "lời nhanh", vì đòn bẩy không đổi được kỳ vọng. Không nạp thêm để gỡ. Chỉ nạp theo kế hoạch định sẵn (ví dụ một khoản cố định mỗi tháng từ thu nhập) khi 30 lệnh gần nhất có kỳ vọng dương và không phạm quy tắc. Để thấy quy mô: <em>giả sử</em> bạn có lợi thế thật và giữ được +3%/tháng như trường hợp lạc quan (không ai đảm bảo), 200 USDT sau 12 tháng thành khoảng 285 USDT; với kỳ vọng ≈ 0 trước phí (khoảng −1%/tháng), nó còn khoảng 178 USDT. Vốn tăng nhờ tiết kiệm, không nhờ đòn bẩy hay rủi ro cao.' },
      { type: 'list', items: [
        '<strong>Cấm đánh không dừng lỗ:</strong> 10 USDT ở 50x có giá thanh lý chỉ cách khoảng 1,5%, khoảng 2 ATR H1 của ETH.',
        '<strong>Cấm chọn đòn bẩy trước, tính rủi ro sau:</strong> rủi ro thành con số ngẫu nhiên.',
        '<strong>Cấm bóp dừng lỗ vào trong cấu trúc</strong> cho vừa mức tối thiểu.',
        '<strong>Cấm nâng R lên 2% vì vốn nhỏ:</strong> vốn chưa đủ thì luyện demo hoặc spot.',
        '<strong>Cấm scalp 1–5 phút bằng market:</strong> phí ăn khoảng 40–80% R.',
        '<strong>Cấm đánh coin nhỏ vì "tối thiểu chỉ 5 USDT":</strong> spread và trượt giá ăn hết lợi thế.',
        '<strong>Cấm Cross toàn ví, nạp thêm để gỡ, gấp đôi sau lệnh thua</strong> (martingale, bài 5.11).'
      ] },
      { type: 'scenario', title: 'Cùng 10 USDT, cùng một pullback ETH', setup: 'Tài khoản 200 USDT. ETH giả định 2.700 đang về vùng hỗ trợ H4. Cả hai muốn bỏ 10 USDT ký quỹ.', bad: 'Trader cảm tính kéo 50x, vào market (danh nghĩa 500 USDT), không dừng lỗ vì "cùng lắm mất 10 USDT". Giá thanh lý ≈ 2.700 × (1 − 0,02 + 0,005) = 2.659,5, chỉ cách 1,5%. Nến H1 kế tiếp quét xuống 2.655 rồi bật lên. Bị thanh lý, mất 10 USDT cộng phí (5% tài khoản), đúng lúc giá chạy theo hướng anh ta đoán. Anh ta vào lại 20 USDT để gỡ.', good: 'Trader có kế hoạch chờ nến H1 đóng, đặt limit 2.660, dừng lỗ 2.621. Khối lượng 0,048 ETH (127,68 USDT). Với 10 USDT ký quỹ sẽ cần khoảng 12,8x, vượt trần 10x của bài 5.9, nên cô ấy bỏ thêm ký quỹ: 10x, ký quỹ khoảng 12,8 USDT, dưới mức an toàn 20,4x, thanh lý khoảng 2.407,3, cách 9,5%. Cú quét 2.655 không chạm dừng lỗ. Nếu sai, cô ấy mất khoảng 1,96 USDT (1%).' },
      { type: 'callout', tone: 'risk', title: 'Vốn nhỏ không có nghĩa là rủi ro nhỏ', text: 'Futures có thể lấy hết ký quỹ trong vài phút. Chạy đủ 30 lệnh theo quy trình trên Binance Demo Trading trước khi dùng tiền thật, chỉ dùng tiền chấp nhận mất hết. Nghị quyết 05/2025/NQ-CP không nhắc tới phái sinh; kiểm tra văn bản pháp lý mới nhất trước khi hành động.' },
      { type: 'checklist', title: 'Checklist trước lệnh cho vốn nhỏ', items: [
        'R bằng USDT đã viết ra (0,5–1% vốn, không nâng lên vì vốn nhỏ)',
        'Cặp là ETH hoặc cặp lớn thanh khoản tốt; BTC chỉ khi dừng lỗ < R ÷ 85',
        'Setup hạng A, kích hoạt H1 (hoặc M15 với dừng lỗ ≥ 0,7%) đã đóng nến',
        'Dừng lỗ cấu trúc + đệm, ≤ dừng lỗ tối đa; phí ≤ khoảng 15% R',
        'Khối lượng đã trừ phí, làm tròn xuống; rủi ro thật ≤ R',
        'Đòn bẩy ≤ 1 ÷ (3 × % dừng lỗ + MMR) và ≤ 10x; Isolated, one-way',
        'Vào limit; TP/SL cùng lúc, SL stop-market Mark Price, đã thấy trong tab Positions',
        'Hôm nay chưa quá 3 lệnh, chưa chạm 2R lỗ, chưa thua 2 lệnh liên tiếp'
      ] }
    ],
    keyPoints: [
      'Rủi ro = ký quỹ × đòn bẩy × % dừng lỗ = danh nghĩa × % dừng lỗ; đòn bẩy là kết quả của danh nghĩa ÷ ký quỹ muốn bỏ',
      'Mức lệnh tối thiểu thật trên Binance: BTC ≈ 85 USDT, ETH 20 USDT, SOL/BNB/XRP/DOGE 5 USDT; dừng lỗ tối đa = R ÷ mức tối thiểu',
      'Phí tính theo danh nghĩa nên ăn khoảng 40–80% R khi scalp 5 phút; khung hợp lý cho vốn nhỏ là H4 bối cảnh, H1 kích hoạt, M15 chỉ khi dừng lỗ ≥ 0,7%',
      'Quy trình 10 bước: R → cặp → setup A → dừng lỗ cấu trúc → kiểm tra tối đa → khối lượng → đòn bẩy an toàn → limit → TP/SL → quản lý và nhật ký',
      'R giữ 0,5–1% kể cả khi vốn nhỏ; dừng lỗ cấu trúc vượt mức cho phép thì bỏ lệnh, không nâng R, không bóp dừng lỗ; vốn chưa đủ thì luyện demo hoặc spot',
      'Vốn nhỏ không tự có lãi: chưa có lợi thế đã kiểm chứng (bài 7.2) thì kỳ vọng ≈ 0 trước phí và âm sau phí; tăng vốn bằng tiết kiệm, không bằng đòn bẩy'
    ],
    practice: [
      'Với vốn của bạn, tính R theo bước 1 rồi tính dừng lỗ tối đa cho BTC, ETH và SOL. Ghi ba con số lên giấy dán cạnh màn hình.',
      'Mở biểu đồ ETH H4 và H1, tìm một setup pullback đã qua, làm lại đủ 10 bước bằng công cụ Lập lệnh theo vốn: ghi danh nghĩa, đòn bẩy cần, đòn bẩy an toàn, phí theo % R.',
      'Tìm một setup BTC H4 gần đây, đo dừng lỗ cấu trúc và kết luận: đánh được hay phải bỏ với vốn hiện tại của bạn?',
      'Trên Binance Demo Trading, đặt 3 lệnh theo quy trình (limit vào, TP/SL cùng lúc) và chụp tab Positions để kiểm tra SL, TP, giá thanh lý.'
    ],
    quiz: [
      { q: 'Tài khoản 150 USDT, R chuẩn 1% = 1,5 USDT. Bạn định vào lệnh ký quỹ 10 USDT, 20x, dừng lỗ 1,5%. Rủi ro thật và đánh giá đúng là gì?', options: ['0,15 USDT, tức 0,1% vốn: rất an toàn', '10 USDT, tức 6,7% vốn: bằng ký quỹ', '3 USDT, tức 2% vốn: gấp đôi R, phải giảm', '30 USDT, tức 20% vốn: vì 20x nhân với 1,5'], answer: 2, explain: 'Danh nghĩa = 10 × 20 = 200 USDT; rủi ro = 200 × 1,5% = 3 USDT = 2% của 150 USDT, gấp đôi R chuẩn. Không được nâng R lên 2% vì vốn nhỏ: giảm danh nghĩa còn 100 USDT (ví dụ 10 USDT ký quỹ ở 10x) hoặc bỏ lệnh; nếu vốn quá nhỏ cho lệnh đúng cấu trúc thì luyện demo hoặc spot. 0,15 USDT là lấy ký quỹ nhân % dừng lỗ, quên đòn bẩy. 10 USDT chỉ đúng khi không có dừng lỗ và bị thanh lý. 30 USDT là nhân sai.' },
      { q: 'R = 1 USDT. Dừng lỗ cấu trúc của setup BTC là 1,6%, của setup ETH là 2,2%. Theo mức tối thiểu thật (BTC ≈ 85, ETH 20 USDT), bạn làm gì?', options: ['Đánh cả hai, vì R của hai lệnh bằng nhau', 'Bỏ BTC (tối đa ≈ 1,18%), có thể đánh ETH', 'Đánh BTC, bỏ ETH vì dừng lỗ ETH rộng hơn, rủi ro hơn', 'Bỏ cả hai, vì vốn này quá nhỏ để đánh futures'], answer: 1, explain: 'Dừng lỗ tối đa BTC = 1 ÷ 85 ≈ 1,18% < 1,6% nên lệnh BTC buộc phải lớn hơn R. ETH = 1 ÷ 20 = 5% > 2,2% nên vừa, nếu setup đạt hạng A. Dừng lỗ rộng hơn không làm ETH tệ hơn, vì khối lượng đã tính theo nó. Bỏ cả hai là bỏ qua một lệnh hợp lệ.' },
      { q: 'Bạn vào ETH bằng market và thoát bằng market, dừng lỗ 0,25%, R:R 1:2. Tỷ lệ thắng tối thiểu để hoà vốn sau phí (taker 0,05% mỗi chiều) là khoảng bao nhiêu?', options: ['33,3%', '40%', '25%', '46,7%'], answer: 3, explain: 'c = 0,10% ÷ 0,25% = 0,4R. Tỷ lệ thắng hoà vốn = (1 + 0,4) ÷ (1 + 2) ≈ 46,7%. 33,3% là khi không có phí. 40% là lấy chính c làm đáp án. 25% không liên quan tới R:R 1:2.' },
      { q: 'Lệnh long SOL: dừng lỗ 1,2%, MMR giả định 0,5%, tài khoản futures mở được 10 ngày. Ký quỹ bạn muốn bỏ cần đòn bẩy 26x. Làm gì là đúng?', options: ['Thêm ký quỹ để về ≤ 10x, giữ khối lượng', 'Vào 26x, vì lệnh vẫn có dừng lỗ đặt sẵn', 'Bóp dừng lỗ còn 0,6% để giảm đòn bẩy cần', 'Tăng khối lượng để tận dụng hết đòn bẩy'], answer: 0, explain: 'Có ba giới hạn: mức an toàn 1 ÷ (3 × 1,2% + 0,5%) ≈ 24,4x, giới hạn 20x của Binance cho tài khoản dưới 30 ngày, và trần thanh trượt 10x của bài 5.9. Lấy mức chặt nhất: 10x. Bỏ thêm ký quỹ hạ đòn bẩy mà không đổi khối lượng và rủi ro. Vào 26x vi phạm cả ba. Bóp dừng lỗ là đặt dừng lỗ trong cấu trúc. Tăng khối lượng là tăng rủi ro.' }
    ],
    sources: [
      { title: 'Binance USDⓈ-M Futures exchangeInfo (MIN_NOTIONAL, LOT_SIZE)', url: 'https://fapi.binance.com/fapi/v1/exchangeInfo', note: 'Binance API công khai, truy vấn 27/09/2026' },
      { title: 'Futures Trading Rules (Perpetual)', url: 'https://www.binance.com/en/futures/trading-rules/perpetual', note: 'Binance, tiếng Anh' },
      { title: 'USDⓈ-M Futures Fee Rate', url: 'https://www.binance.com/en/fee/futureFee', note: 'Binance, biểu phí maker/taker, mở 27/09/2026, tiếng Anh' },
      { title: 'What Are Maker and Taker Fees on Binance Futures', url: 'https://www.binance.com/en/support/faq/detail/360033544231', note: 'Binance Support: market là taker, limit chờ là maker, tiếng Anh' },
      { title: 'Leverage and Margin of USDⓈ-M Futures', url: 'https://www.binance.com/en/support/faq/detail/360033162192', note: 'Binance Support: giới hạn 20x cho tài khoản dưới 30 ngày từ 07/12/2025, tiếng Anh' },
      { title: 'Types of Stop Orders on Binance Futures', url: 'https://www.binance.com/en/support/faq/detail/360036351051', note: 'Binance Support: stop-market, trigger Mark/Last, tiếng Anh' },
      { title: 'Average True Range (ATR) and Average True Range Percent (ATRP)', url: 'https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/average-true-range-atr-and-average-true-range-percent-atrp', note: 'StockCharts ChartSchool, tiếng Anh' }
    ],
    updated: '2026-09'
  },

  'c5-b13': {
    duration: 17,
    level: 'Nâng cao',
    summary: 'Lệnh từ vài trăm đến hàng chục nghìn USDT: rủi ro giảm theo quy mô, tổng rủi ro mở và tương quan, trượt giá đo thật, chia lệnh, bậc ký quỹ, ADL, rủi ro sàn.',
    goals: [
      'Áp dụng đúng mức rủi ro, số lệnh mở và tổng rủi ro mở cho từng cấp vốn',
      'Nhận ra khi nhiều lệnh thực chất là một lệnh vì tương quan, và giới hạn tổng rủi ro của nhóm',
      'Ước tính trượt giá từ độ sâu sổ lệnh và biết khi nào phải chia lệnh limit hoặc dùng TWAP',
      'Hiểu bậc ký quỹ, hàng đợi ADL và rủi ro đối tác khi vị thế lớn, và giữ vốn ngoài sàn đúng cách',
      'Giữ kỷ luật khi 1R đã là vài chục đến vài trăm USDT bằng cách đo mọi thứ bằng R'
    ],
    blocks: [
      { type: 'h', text: 'Cùng công thức, khác rủi ro: ba cấp quy mô' },
      { type: 'p', text: 'Công thức không đổi khi vốn lớn lên: Giá trị danh nghĩa = R ÷ % dừng lỗ, đòn bẩy vẫn là kết quả (xem bài 5.12). Cái thay đổi là những rủi ro mà lệnh nhỏ không gặp: nhiều lệnh cùng lúc kéo nhau, sổ lệnh không đủ dày, bậc ký quỹ, và việc một sàn có thể giữ số tiền đáng kể của bạn. Bảng dưới là khuyến nghị của khóa học, không phải quy định của sàn.' },
      { type: 'table', head: ['Cấp', 'Vốn futures', 'Rủi ro mỗi lệnh', 'Khung thời gian', 'Lệnh mở tối đa', 'Tổng rủi ro mở tối đa', 'Cách vào / ra'], rows: [
        ['Nhỏ', 'Dưới 1.000 USDT', '0,5–1% (không nâng lên 2% vì vốn nhỏ)', 'H4 bối cảnh, H1 kích hoạt', '2', '2R (1–2% vốn)', '1 lệnh limit; chốt 50% tại 2R'],
        ['Vừa', 'Từ 1.000 đến dưới 10.000 USDT, danh nghĩa vài trăm đến vài nghìn', '0,5–1%', 'D1/H4 bối cảnh, H4/H1 kích hoạt', '2', '2R (1–2% vốn); nhóm cùng chiều tương quan ≤ 1,5R', 'Chia 2 lệnh limit; chốt 2–3 phần'],
        ['Lớn', 'Từ 10.000 USDT trở lên, danh nghĩa ≥ 1.000 đến hàng chục nghìn', '0,25–0,5% (chặt hơn bộ chuẩn)', 'D1 bối cảnh, H4 kích hoạt là chính', '2', '2R (0,5–1% vốn); nhóm tương quan ≤ 1R', 'Chia 3+ mức limit hoặc TWAP; kiểm tra độ sâu trước mỗi lệnh']
      ] },
      { type: 'p', text: 'Số lệnh mở tối đa 2 và tổng rủi ro mở ≤ 2R là bộ chuẩn của bài 5.9, áp dụng cho mọi cấp. Vì R tính bằng % vốn, 2R ở cấp lớn chỉ còn 0,5–1% vốn.' },
      { type: 'p', text: '<strong>Vì sao % rủi ro giảm khi vốn lớn?</strong> Thứ nhất, số tiền tuyệt đối lớn hơn làm áp lực tâm lý tăng: mất 1% của 200 USDT là 2 USDT, mất 1% của 20.000 USDT là 200 USDT, và bộ não không phản ứng giống nhau. Thứ hai, vốn lớn khó gây dựng lại bằng tiền tiết kiệm: người vốn 200 USDT có thể nạp lại từ lương một tháng, người vốn 20.000 USDT thì không. Thứ ba, lệnh lớn gặp trượt giá và sự kiện cực đoan nhiều hơn, nên khoản lỗ thật có thể vượt 1R. Mục tiêu dịch dần từ "học và tăng trưởng" sang "bảo toàn và tăng đều".' },
      { type: 'calc', title: 'Chuỗi 10 lệnh thua ở từng mức rủi ro', rows: [
        ['Rủi ro 1% mỗi lệnh', '1 − 0,99<sup>10</sup> ≈ 9,6% vốn'],
        ['Rủi ro 0,5% mỗi lệnh', '1 − 0,995<sup>10</sup> ≈ 4,9% vốn'],
        ['Rủi ro 0,25% mỗi lệnh', '1 − 0,9975<sup>10</sup> ≈ 2,5% vốn'],
        ['Với tài khoản 20.000 USDT', '≈ 1.912 / 978 / 494 USDT']
      ], result: 'Ở cấp lớn, rủi ro 0,25–0,5% vẫn cho mỗi lệnh 50–100 USDT, đủ ý nghĩa, trong khi chuỗi thua tệ nhất chỉ để lại vết xước vài phần trăm.' },
      { type: 'figure', name: 'equity-curves', caption: 'Cùng một chuỗi lệnh, rủi ro mỗi lệnh quyết định đường vốn đi êm hay rơi sâu.' },

      { type: 'h', text: 'Lệnh trên 100 USDT: thêm tự do, và cái bẫy tên là tương quan' },
      { type: 'p', text: 'Khi R từ khoảng 10–20 USDT trở lên, mức lệnh tối thiểu gần như không còn ràng buộc: với R = 20 USDT, dừng lỗ tối đa cho BTC là 20 ÷ 85 ≈ 23,5%. Bạn được tự do đặt dừng lỗ theo cấu trúc D1, đánh BTC thoải mái, chia lệnh vào thành 2 phần mà mỗi phần vẫn trên mức tối thiểu, và chốt lời 2–3 phần. Phí theo R không đổi theo quy mô (nó phụ thuộc % dừng lỗ), nhưng khung lớn hơn giúp c nhỏ đi.' },
      { type: 'calc', title: 'Tài khoản 2.000 USDT: long BTC chia 2 lệnh limit (giá giả định)', rows: [
        ['R', '1% × 2.000 = 20 USDT'],
        ['Vùng H4 và dừng lỗ', 'Vùng hỗ trợ 84.000–84.700; dừng lỗ dưới đáy cấu trúc + đệm: 82.800'],
        ['Phần A, phần B', 'Limit 84.600 (cách SL 1.800) và limit 84.100 (cách SL 1.300)'],
        ['Khối lượng mỗi phần (bằng nhau)', '20 ÷ (1.800 + 1.300) ≈ 0,00645 → làm tròn xuống 0,006 BTC mỗi phần'],
        ['Nếu khớp cả hai', 'Giá vào trung bình 84.350; rủi ro 0,006 × 3.100 = 18,6 USDT + phí ≈ 0,7 → ≈ 19,3 USDT (≈ 0,97R)'],
        ['Nếu chỉ khớp phần A', 'Rủi ro ≈ 0,006 × 1.800 + phí ≈ 11,2 USDT (≈ 0,56R)'],
        ['Danh nghĩa, đòn bẩy thật', '≈ 1.012 USDT; 1.012 ÷ 2.000 ≈ 0,51x'],
        ['Đòn bẩy trên sàn', '10x → ký quỹ ≈ 101 USDT; an toàn tối đa 1 ÷ (3 × 1,84% + 0,5%) ≈ 16,6x; thanh lý ≈ 84.350 × (1 − 0,1 + 0,005) ≈ 76.337'],
        ['Mục tiêu', 'Vùng cản 88.000: (88.000 − 84.350) ÷ 1.550 ≈ 2,35R, lãi ≈ 43,8 USDT nếu khớp cả hai phần']
      ], result: 'Chia 2 phần làm giá vào trung bình tốt hơn khi giá đi sâu vào vùng, và làm lệnh nhỏ lại khi giá chỉ chạm mép vùng rồi chạy. Tổng rủi ro vẫn khóa dưới 1R.' },
      { type: 'p', text: '<strong>Tổng rủi ro mở</strong> là tổng R của mọi lệnh đang mở nếu tất cả cùng chạm dừng lỗ. Với tài khoản vừa, nhiều người mở 3 lệnh long BTC, ETH, SOL, mỗi lệnh 1R, và nghĩ mình đa dạng hóa. Thực tế các coin lớn thường đi cùng chiều, đặc biệt khi thị trường sập: ngày 10/10/2025, BTC giảm khoảng 14,5% và nhiều altcoin có lúc mất hơn 40%. Ba lệnh long cùng lúc gần như là <strong>một lệnh 3R</strong>, và khi sập mạnh, dừng lỗ còn trượt giá nên khoản lỗ thật có thể vượt 3R.' },
      { type: 'list', items: [
        'Coi các lệnh cùng chiều trên BTC, ETH và altcoin lớn là một nhóm tương quan.',
        'Mọi cấp: tối đa 2 lệnh mở, tổng rủi ro mở ≤ 2R (bài 5.9). Tài khoản vừa: hai lệnh cùng chiều tương quan tính chung, nhóm ≤ 1,5R (ví dụ 1R + 0,5R, hoặc 2 × 0,75R).',
        'Đã có 2 lệnh mở thì không mở lệnh thứ ba. Muốn vào setup mới thì chờ một lệnh đóng, hoặc chủ động đóng lệnh kém hơn.',
        'Long BTC và short một altcoin yếu không phải là 2R độc lập, nhưng cũng không phải 0R. Ghi riêng và theo dõi.'
      ] },
      { type: 'scenario', title: 'Tài khoản 2.000 USDT, thị trường tăng đẹp', setup: 'BTC, ETH, SOL đều đang pullback về vùng H4 trong xu hướng tăng. Cả ba đều có kích hoạt H1 đạt hạng A.', bad: 'Trader cảm tính vào cả ba, mỗi lệnh 1% (20 USDT), thêm một lệnh altcoin nhỏ "cho vui". Đêm đó có tin xấu, cả thị trường giảm mạnh. Bốn dừng lỗ kích hoạt gần như cùng lúc, altcoin trượt giá qua dừng lỗ. Mất khoảng 90 USDT (4,5%) trong một đêm, và sáng hôm sau muốn gỡ.', good: 'Trader có kế hoạch coi ba lệnh là một nhóm, chỉ chọn 2 setup đẹp nhất (BTC và ETH) vì tối đa 2 lệnh mở, chia R nhóm 1,5% thành 2 lệnh × 0,75% (15 USDT mỗi lệnh), bỏ SOL và không vào altcoin nhỏ. Cùng đêm đó, mất khoảng 30 USDT (1,5%) cộng chút trượt giá. Khi thị trường ổn định lại, cô ấy vẫn còn đủ vốn và đủ bình tĩnh để vào lệnh tiếp theo đúng quy trình.' },

      { type: 'h', text: 'Lệnh trên 1.000 USDT: sổ lệnh, trượt giá và cách chia lệnh' },
      { type: 'p', text: 'Trượt giá (slippage) là chênh lệch giữa giá bạn thấy và giá khớp trung bình khi lệnh market "ăn" qua nhiều mức giá của sổ lệnh. Khóa học đã chụp độ sâu sổ lệnh Binance Futures ngày 27/09/2026 lúc thị trường yên và tính trượt giá của một lệnh mua market:' },
      { type: 'table', head: ['Cặp', 'Spread', 'Thanh khoản bên bán trong 0,1%', 'Trượt giá mua 10.000 / 100.000 / 1.000.000 USDT', 'Chi phí trượt giá (USDT)'], rows: [
        ['BTCUSDT', '~0,0001%', '~18,6 triệu USDT', '~0,0001% / ~0,0001% / ~0,0001%', '≈ 0,01 / 0,1 / 1'],
        ['ETHUSDT', '~0,0004%', '~7,9 triệu USDT', '0,0002% / 0,0023% / 0,0164%', '≈ 0,02 / 2,3 / 164'],
        ['SOLUSDT', '~0,008%', '~1,24 triệu USDT', '0,004% / 0,0075% / 0,047%', '≈ 0,4 / 7,5 / 470'],
        ['DOGEUSDT', '~0,010%', '~0,46 triệu USDT', '0,005% / 0,018% / 0,098%', '≈ 0,5 / 18 / 980']
      ] },
      { type: 'p', text: 'Đọc bảng: với BTC và ETH, lệnh vài nghìn đến vài chục nghìn USDT gần như không trượt giá lúc bình thường; trượt giá nhỏ hơn phí taker (0,05%) hàng chục đến hàng trăm lần. Nhưng trượt giá tăng nhanh ở altcoin: lệnh 1 triệu USDT trên DOGE trượt gần 0,1%, gấp đôi phí taker. Và đây là số lúc yên. Khi có tin lớn như CPI hay ngày 10/10/2025, sổ lệnh mỏng đi rất nhiều và trượt giá tăng vọt; altcoin nhỏ hơn có thanh khoản kém hơn nhiều bậc.' },
      { type: 'callout', tone: 'tip', title: 'Quy tắc 5% thanh khoản (quy tắc của khóa học)', text: 'Một lệnh market (kể cả dừng lỗ stop-market) không nên vượt 5% thanh khoản phía đối diện trong phạm vi 0,1% quanh giá, đo lúc bình thường. Theo số ngày 27/09/2026: BTC ≈ 930.000 USDT, ETH ≈ 395.000, SOL ≈ 62.000, DOGE ≈ 23.000. Với một altcoin chỉ có 50.000 USDT trong 0,1% thì trần chỉ 2.500 USDT. Vượt trần: chia lệnh limit, giảm khối lượng, hoặc không đánh cặp đó. Quanh giờ tin lớn, coi trần này như giảm một nửa.' },
      { type: 'steps', items: [
        { title: '1. Đo độ sâu trước khi vào', text: 'Mở sổ lệnh (hoặc gộp mức giá 0,1%) và ước lượng tổng khối lượng phía đối diện trong 0,1%. So với danh nghĩa lệnh của bạn theo quy tắc 5%.' },
        { title: '2. Chia vào bằng limit nhiều mức', text: 'Chia danh nghĩa thành 2–3 lệnh limit trải trong vùng, khối lượng tính sao cho nếu khớp đủ thì tổng rủi ro vẫn ≤ 1R. Limit là maker (0,02%), không trượt giá.' },
        { title: '3. Dùng TWAP khi lệnh lớn hơn thanh khoản sẵn có', text: 'Binance có thuật toán TWAP cho người dùng API trên USDⓈ-M Futures: chia lệnh lớn thành lệnh nhỏ theo thời gian, tối thiểu tương đương 1.000 USDT, thời gian 5 phút đến 24 giờ, tối đa 50 triệu USDT với BTCUSDT, 25 triệu với ETHUSDT, 5 triệu với hợp đồng khác. Phần lớn người học chưa cần tới; chỉ nghĩ tới khi lệnh vượt trần 5% ở bước 1.' },
        { title: '4. Tính trước kịch bản trượt giá của dừng lỗ', text: 'Dừng lỗ stop-market sẽ khớp market đúng lúc thị trường xấu nhất. Tự hỏi: nếu dừng lỗ trượt thêm 0,5% (giả định kịch bản xấu) thì mất thêm bao nhiêu R? Nếu con số làm bạn khó chịu, giảm khối lượng.' },
        { title: '5. Thoát từng phần bằng limit', text: 'Chốt lời bằng các lệnh limit reduce-only tại vùng cản (bài 5.8), không bấm market đóng cả vị thế lớn cùng lúc.' }
      ] },
      { type: 'calc', title: 'Tài khoản 20.000 USDT: long ETH chia 3 mức (giá giả định)', rows: [
        ['R', '0,5% × 20.000 = 100 USDT'],
        ['Vùng D1/H4 và dừng lỗ', 'Vùng 2.640–2.700; dừng lỗ dưới cấu trúc + đệm: 2.590'],
        ['Ba mức limit', '2.700 / 2.670 / 2.640 (cách SL 110 / 80 / 50)'],
        ['Khối lượng mỗi mức', '100 ÷ (110 + 80 + 50 + phí ≈ 5,6) ≈ 0,407 ETH mỗi mức'],
        ['Nếu khớp cả ba', 'Giá trung bình 2.670, dừng lỗ cách 3,0%; rủi ro ≈ 97,7 + phí ≈ 2,2 → ≈ 99,9 USDT (1R)'],
        ['Nếu chỉ khớp mức đầu / hai mức đầu', '≈ 45,5 / ≈ 78,8 USDT'],
        ['Danh nghĩa, đòn bẩy thật', '≈ 3.260 USDT; ≈ 0,16x vốn'],
        ['Đòn bẩy trên sàn, thanh lý', '5x → ký quỹ ≈ 652 USDT; an toàn tối đa 1 ÷ (3 × 3% + 0,5%) ≈ 10,5x; thanh lý ≈ 2.670 × (1 − 0,2 + 0,005) ≈ 2.149'],
        ['Trượt giá', 'Mỗi phần ≈ 1.087 USDT là limit nên không trượt; nếu dừng lỗ khớp market 3.260 USDT, trượt giá lúc bình thường gần như bằng 0 (thanh khoản ETH trong 0,1% ≈ 7,9 triệu)'],
        ['So sánh: cùng R trên altcoin có 50.000 USDT trong 0,1% (giả định), dừng lỗ 2%', 'Danh nghĩa ≈ 100 ÷ 2,07% ≈ 4.831 USDT ≈ 9,7% thanh khoản → vượt trần 5%, phải chia nhỏ, giảm khối lượng hoặc bỏ']
      ], result: 'Lệnh danh nghĩa vài nghìn USDT trên BTC/ETH không có vấn đề thanh khoản lúc bình thường. Vấn đề bắt đầu ở altcoin và ở những phút thị trường hoảng loạn, đúng lúc dừng lỗ của bạn cần khớp.' },

      { type: 'h', text: 'Bậc ký quỹ, ADL và giá thanh lý khi vị thế lớn' },
      { type: 'p', text: '<strong>Bậc ký quỹ (margin tier):</strong> theo Binance, vị thế càng lớn thì đòn bẩy tối đa càng thấp và tỷ lệ ký quỹ duy trì (MMR) càng cao. Ký quỹ duy trì = Giá trị danh nghĩa × MMR của bậc − Số tiền duy trì của bậc. Ví dụ chính thức của Binance: 10 BTC × 26.000 = 260.000 USDT, bậc 3: 260.000 × 1% − 1.300 = 1.300 USDT. Hàm ý: công thức giá thanh lý với MMR 0,5% trong các ví dụ chỉ đúng ở bậc thấp; vị thế lớn có MMR cao hơn nên giá thanh lý gần hơn. Altcoin nhỏ có bậc thấp hơn nhiều so với BTC/ETH. Trước lệnh lớn, mở bảng Leverage & Margin của đúng hợp đồng để xem bậc của mình. Ở chế độ isolated đang có vị thế, bạn không giảm được đòn bẩy, nên đặt đúng từ đầu.' },
      { type: 'p', text: '<strong>Hàng đợi ADL (tự động giảm đòn bẩy):</strong> khi một vị thế bị thanh lý mà quỹ bảo hiểm không tiếp nhận được, Binance đóng bớt vị thế <em>đang lãi</em> của người khác ở phía đối diện, tại giá phá sản của lệnh bị thanh lý. Thứ tự ưu tiên = % lãi × đòn bẩy hiệu dụng, trong đó % lãi = lãi chưa chốt ÷ danh nghĩa vị thế, còn đòn bẩy hiệu dụng = danh nghĩa vị thế ÷ (số dư tài khoản + lãi chưa chốt). Binance ghi rõ phần mẫu số tính ở cấp tài khoản, nên đây không phải con số trên thanh trượt. Lãi nhiều và đòn bẩy hiệu dụng cao bị xếp trước. Nghĩa là trong ngày cực đoan, một vị thế lớn đang lãi đậm có thể bị đóng mất lúc bạn không muốn. Giữ đòn bẩy thật thấp (danh nghĩa nhỏ so với vốn) giúp hạ thứ hạng của bạn, nhưng không có mức nào bảo đảm thoát ADL: một vị thế lãi rất đậm vẫn có thể bị xếp cao. Đèn báo ADL hiển thị ngay trên vị thế; khi đèn đầy, cân nhắc chốt bớt chủ động.' },
      { type: 'figure', name: 'leverage-liquidation', caption: 'Ở vị thế lớn, bậc ký quỹ làm MMR tăng, nên giá thanh lý còn gần hơn so với hình này ở cùng đòn bẩy.' },
      { type: 'callout', tone: 'risk', title: 'Giá thanh lý hiển thị không phải lời hứa', text: 'Binance nêu rõ: khi biến động cực mạnh, mark price có thể nhảy vọt qua giá thanh lý và vị thế bị thanh lý ở giá tệ hơn. Vị thế lớn còn chịu thêm MMR cao của bậc và trượt giá khi dừng lỗ khớp. Với vốn lớn, giữ đòn bẩy thật thấp và dừng lỗ luôn đặt sẵn là hai lớp bảo vệ không thể thiếu.' },

      { type: 'h', text: 'Rủi ro đối tác: tiền trên sàn là tiền cho sàn giữ hộ' },
      { type: 'p', text: 'Rủi ro đối tác (counterparty risk) là rủi ro chính sàn giao dịch gặp sự cố: phá sản, bị đóng băng rút tiền, bị hack. Tháng 11/2022, sàn FTX sụp đổ. Theo đơn kiện của CFTC (Ủy ban Giao dịch Hàng hóa Tương lai Mỹ), tài sản khách hàng bị trộn lẫn và bị chiếm dụng; CFTC cáo buộc hành vi này gây mất hơn 8 tỷ USD tiền gửi của khách hàng FTX. Người có vị thế đúng hướng trên FTX vẫn mất tiền, vì vấn đề nằm ở sàn chứ không ở lệnh.' },
      { type: 'list', items: [
        '<strong>Không để toàn bộ vốn trên sàn.</strong> Vì đòn bẩy thật chỉ 0,2–1x, ví futures chỉ cần đủ ký quỹ cho các lệnh mở cộng một khoản đệm. Ví dụ tài khoản 20.000 USDT với 2 lệnh ký quỹ khoảng 650 USDT mỗi lệnh: để trên ví futures khoảng 5.000 USDT là dư; phần còn lại ở nơi khác (ví tự lưu ký hoặc chia nhiều nơi). Đây là quy tắc của khóa học, tỷ lệ cụ thể tùy bạn.',
        '<strong>Rút lợi nhuận định kỳ.</strong> Ví dụ cuối mỗi tháng, nếu ví futures vượt mức mục tiêu thì rút 50% phần lợi nhuận ra ngoài. Tiền đã rút là tiền thật; số dư trên sàn chỉ là con số.',
        '<strong>Không dùng ví futures làm nơi tiết kiệm.</strong> Tiền nằm trong ví cross còn có thể bị kéo vào một lệnh xấu.',
        '<strong>Bật bảo mật đầy đủ:</strong> xác thực hai lớp, danh sách địa chỉ rút tiền cho phép, không cấp quyền rút tiền cho API key giao dịch.'
      ] },
      { type: 'callout', tone: 'note', title: 'Pháp lý và thuế Việt Nam (nhắc ngắn cho vốn lớn)', text: 'Thông tư 32/2026/TT-BTC: cá nhân chuyển nhượng tài sản mã hóa qua tổ chức cung cấp dịch vụ được cấp phép nộp thuế TNCN 0,1% trên giá chuyển nhượng từng lần. Nghị quyết 05/2025/NQ-CP (thí điểm 5 năm) không nhắc tới phái sinh, hợp đồng tương lai. Nghị định 284/2026/NĐ-CP có mức phạt 30–50 triệu đồng với nhà đầu tư trong nước giao dịch không qua tổ chức được cấp phép, áp dụng sau 6 tháng kể từ khi sàn đầu tiên được cấp phép. Số tiền càng lớn, việc nắm rõ nguồn gốc tiền, chứng từ và quy định mới nhất càng quan trọng. Khóa học không phải tư vấn pháp lý hay thuế.' },

      { type: 'h', text: 'Tâm lý khi 1R là vài trăm USDT' },
      { type: 'p', text: 'Ở tài khoản 20.000 USDT với rủi ro 0,5%, một chuỗi 8 lệnh thua (xác suất gặp trong 100 lệnh không nhỏ, xem bài 5.9) làm mất khoảng 3,9% vốn, tức khoảng 786 USDT. Về toán, đó là vết xước. Về cảm giác, đó có thể là vài tháng lương. Chính khoảng cách giữa toán và cảm giác làm người vốn lớn phạm những lỗi mà lúc vốn nhỏ họ không phạm: rời dừng lỗ vì "lần này mất nhiều quá", đóng lệnh lãi quá sớm, hoặc tăng khối lượng để gỡ nhanh.' },
      { type: 'list', items: [
        '<strong>Đo bằng R, không đo bằng tiền.</strong> Nhật ký ghi +2,3R, −1R; ẩn cột PnL USDT trên màn hình nếu sàn cho phép, hoặc chỉ nhìn % vốn.',
        '<strong>Tăng khối lượng theo bậc, không theo cảm hứng.</strong> Mỗi lần vốn tăng một bậc (ví dụ gấp đôi), chạy 20 lệnh đầu ở mức rủi ro thấp hơn một nấc (ví dụ 0,5% → 0,25%) cho quen cảm giác con số mới.',
        '<strong>Giới hạn lỗ ngày/tuần tính bằng R</strong> như bài 5.9 (2R/ngày, 5R/tuần) vẫn giữ nguyên, bất kể 1R là bao nhiêu tiền.',
        '<strong>Không mở màn hình PnL giữa các nến.</strong> Chỉ xem lệnh ở giờ đóng nến khung kích hoạt (bài 5.8).'
      ] },
      { type: 'tool', name: 'position-size', note: 'Nhập vốn, % rủi ro theo cấp (0,5–1% cho vốn vừa, 0,25–0,5% cho vốn lớn), giá vào và dừng lỗ. Nếu chia lệnh nhiều mức, tính cho giá vào trung bình rồi chia đều khối lượng.' },
      { type: 'checklist', title: 'Checklist lệnh vừa và lớn', items: [
        'Rủi ro mỗi lệnh đúng cấp vốn: 0,5–1% (vừa) hoặc 0,25–0,5% (lớn)',
        'Sau lệnh này vẫn tối đa 2 lệnh mở, tổng rủi ro mở ≤ 2R (bài 5.9)',
        'Đã gộp các lệnh cùng chiều tương quan; nhóm không vượt 1,5R (vừa) hoặc 1R (lớn)',
        'Đã đo thanh khoản trong 0,1%: lệnh market và dừng lỗ không vượt 5% (một nửa quanh giờ tin)',
        'Vào bằng limit nhiều mức, tổng rủi ro khi khớp đủ ≤ 1R; TWAP chỉ khi vượt trần thanh khoản',
        'Đã xem bậc ký quỹ của hợp đồng; đòn bẩy thật thấp, giá thanh lý cách xa dừng lỗ nhiều lần',
        'Ví futures chỉ chứa phần vốn cần thiết; lịch rút lợi nhuận đã định',
        'Nhật ký ghi bằng R; giới hạn 2R/ngày và 5R/tuần vẫn áp dụng'
      ] }
    ],
    keyPoints: [
      'Công thức không đổi; % rủi ro giảm dần theo quy mô (khuyến nghị của khóa học: 1% → 0,5–1% → 0,25–0,5%) vì áp lực tâm lý, khó gây dựng lại và rủi ro sự kiện',
      'Lệnh cùng chiều trên BTC, ETH, altcoin lớn là một nhóm tương quan: giới hạn tổng rủi ro của nhóm, không chỉ từng lệnh',
      'Trượt giá với BTC/ETH gần như bằng 0 lúc bình thường nhưng tăng nhanh ở altcoin và khi biến động; lệnh market không nên vượt 5% thanh khoản trong 0,1%',
      'Chia vào bằng limit nhiều mức; TWAP của Binance qua API cho lệnh từ 1.000 USDT, 5 phút đến 24 giờ',
      'Vị thế lớn chịu MMR cao hơn theo bậc và xếp cao trong hàng đợi ADL nếu lãi lớn với đòn bẩy hiệu dụng cao; đòn bẩy thật thấp giúp hạ thứ hạng nhưng không miễn ADL',
      'Rủi ro đối tác là thật (FTX 11/2022): không để hết vốn trên sàn, rút lợi nhuận định kỳ, đo kết quả bằng R'
    ],
    practice: [
      'Viết bảng cấp vốn của riêng bạn: rủi ro mỗi lệnh, số lệnh mở tối đa, tổng rủi ro mở, giới hạn nhóm tương quan. Dán cạnh bộ quy tắc bài 5.9.',
      'Mở sổ lệnh BTCUSDT, ETHUSDT và một altcoin bạn hay xem, gộp mức giá 0,1%, ước lượng thanh khoản phía bán và tính trần 5% cho từng cặp.',
      'Với vốn của bạn, lập một lệnh chia 3 mức limit trong một vùng H4 đã qua: tính khối lượng mỗi mức để khớp đủ thì rủi ro đúng 1R, và rủi ro khi chỉ khớp mức đầu.',
      'Tính số dư cần thiết trên ví futures cho các lệnh bạn thường mở, và đặt lịch rút lợi nhuận hằng tháng.'
    ],
    quiz: [
      { q: 'Tài khoản 5.000 USDT, R = 1% = 50 USDT. Bạn đang long BTC 1R và muốn thêm long ETH và long SOL, mỗi lệnh 1R. Theo khuyến nghị của bài, làm gì?', options: ['Vào cả ETH và SOL 1R vì là coin khác nhau', 'Vào cả hai, mỗi lệnh 0,5R để tổng rủi ro mở chỉ 2R', 'Đóng BTC rồi vào ETH và SOL, mỗi lệnh 1R', 'Chỉ thêm ETH 0,5R: tối đa 2 lệnh, nhóm 1,5R'], answer: 3, explain: 'Bài 5.9 cho tối đa 2 lệnh mở, tổng rủi ro mở ≤ 2R; ba lệnh long coin lớn còn là một nhóm tương quan, cấp vừa giới hạn nhóm 1,5R. BTC 1R + ETH 0,5R = 1,5R là hợp lệ. Vào cả hai 1R là 3 lệnh, 3R dồn một hướng. Mỗi lệnh 0,5R thì tổng đúng 2R nhưng vẫn là 3 lệnh mở, và nhóm tương quan lên 2R, vượt 1,5R. Đóng BTC để vào hai lệnh 1R chỉ đổi coin, nhóm vẫn 2R tương quan.' },
      { q: 'Một altcoin có khoảng 40.000 USDT thanh khoản bên bán trong 0,1% lúc bình thường. Theo quy tắc 5% của khóa học, lệnh mua market lớn nhất nên là bao nhiêu, và quanh giờ CPI thì sao?', options: ['40.000 USDT; quanh giờ CPI 20.000', '20.000 USDT; giữ nguyên khi có tin', '2.000 USDT; quanh giờ CPI ≈ 1.000', '5% vốn của bạn; không đổi khi có tin'], answer: 2, explain: '5% × 40.000 = 2.000 USDT; quanh giờ tin lớn coi trần giảm một nửa, còn khoảng 1.000 USDT. 40.000 là toàn bộ thanh khoản, ăn hết sẽ trượt giá mạnh. Trần tính theo thanh khoản của cặp, không theo vốn. Sổ lệnh mỏng đi khi có tin, nên không thể giữ nguyên.' },
      { q: 'Vì sao vị thế lãi lớn với đòn bẩy cao dễ bị ADL hơn?', options: ['Vì hạng ADL = % lãi × đòn bẩy hiệu dụng', 'Vì Binance thu phí ADL cao hơn khi bẩy cao', 'Vì ADL chỉ đóng các vị thế đang lỗ nặng', 'Vì ADL xảy ra ở mọi lần có thanh lý'], answer: 0, explain: 'Theo Binance, ADL đóng vị thế đang lãi của phía đối diện, xếp hạng theo % lãi × đòn bẩy hiệu dụng (danh nghĩa ÷ (số dư + lãi chưa chốt)), và không tính phí giao dịch. Nó chỉ xảy ra khi quỹ bảo hiểm không tiếp nhận được vị thế phá sản, không phải mọi lần thanh lý. ADL không đóng vị thế đang lỗ.' },
      { q: 'Tài khoản 20.000 USDT, rủi ro 0,5%. Long ETH chia 2 mức limit 2.700 và 2.650, dừng lỗ chung 2.600, khối lượng bằng nhau. Bỏ qua phí, mỗi mức khoảng bao nhiêu ETH?', options: ['1 ETH', '0,67 ETH', '2 ETH', '0,33 ETH'], answer: 1, explain: 'R = 100 USDT. Khoảng cách tới SL là 100 và 50; tổng rủi ro trên mỗi ETH của cả hai mức = 150. Khối lượng mỗi mức = 100 ÷ 150 ≈ 0,67 ETH. 1 ETH mỗi mức cho rủi ro 150 USDT (1,5R). 2 ETH là 3R. 0,33 ETH chỉ là 0,5R.' }
    ],
    sources: [
      { title: 'Binance TWAP algorithm for USDⓈ-M Futures', url: 'https://www.binance.com/en/support/faq/detail/093927599fd54fd48857237f6ebec0b0', note: 'Binance Support: tối thiểu 1.000 USDT, 5 phút đến 24 giờ, tiếng Anh' },
      { title: 'Binance USDⓈ-M Futures exchangeInfo', url: 'https://fapi.binance.com/fapi/v1/exchangeInfo', note: 'Binance API công khai, truy vấn 27/09/2026' },
      { title: 'USDⓈ-M Futures Fee Rate', url: 'https://www.binance.com/en/fee/futureFee', note: 'Binance, mở 27/09/2026, tiếng Anh' },
      { title: 'Leverage and Margin of USDⓈ-M Futures', url: 'https://www.binance.com/en/support/faq/detail/360033162192', note: 'Binance Support: bậc ký quỹ, giới hạn đòn bẩy, tiếng Anh' },
      { title: 'How to Calculate Maintenance Margin', url: 'https://www.binance.com/en/support/faq/detail/b3c689c1f50a44cabb3a84e663b81d93', note: 'Binance Support: ví dụ bậc 3, tiếng Anh' },
      { title: 'What Is Auto-Deleveraging (ADL)', url: 'https://www.binance.com/en/support/faq/detail/360033525471', note: 'Binance Support: thứ tự ưu tiên ADL, tiếng Anh' },
      { title: 'CFTC Charges Sam Bankman-Fried, FTX Trading and Alameda with Fraud', url: 'https://www.cftc.gov/PressRoom/PressReleases/8638-22', note: 'CFTC, 12/2022, tiếng Anh' },
      { title: 'Cách tính thuế đối với tài sản mã hóa tại Việt Nam năm 2026', url: 'https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/chinh-sach-moi/109643/cach-tinh-thue-doi-voi-tai-san-ma-hoa-tai-viet-nam-nam-2026', note: 'Thư viện Pháp luật, Thông tư 32/2026/TT-BTC, tiếng Việt' }
    ],
    updated: '2026-09'
  }
};

export default lessons;
