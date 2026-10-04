import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { C, flat, LESSONS, BRAND, lessonUrl, trackMinutes, totalMinutes, totalQuiz, totalSources, fmtMin, duration } from '../lib/course.js';
import { progress, learner, useStore } from '../lib/store.js';
import { useUI } from '../lib/ui.jsx';
import { TradePlanChart } from '../components/Figures.jsx';
import { PositionSize } from '../components/Tools.jsx';
import { fmt } from '../components/Chart.jsx';
import { ICheck, IChev } from '../components/Icons.jsx';

const FACTS = [
  { n: '74–89%', t: 'tài khoản nhà đầu tư nhỏ lẻ giao dịch CFD có đòn bẩy tại EU thường thua lỗ, theo phân tích của các cơ quan quản lý.', s: 'ESMA, 2018', u: 'https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors' },
  { n: '97%', t: 'người day trade hợp đồng tương lai ở Brazil kiên trì trên 300 ngày bị lỗ. Chỉ khoảng 1% kiếm hơn mức lương tối thiểu.', s: 'Chague, De-Losso, Giovannetti, 2019', u: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3423101' },
  { n: '<1%', t: 'day trader Đài Loan giai đoạn 1992–2006 có lợi nhuận vượt trội ổn định, lặp lại được sau phí.', s: 'Barber, Lee, Liu, Odean, 2014', u: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=529063' },
  { n: '~19 tỷ USD', t: 'vị thế đòn bẩy bị thanh lý trong 24 giờ ngày 10/10/2025, đợt lớn nhất lịch sử crypto, hơn 1,6 triệu tài khoản.', s: 'CoinGecko', u: 'https://www.coingecko.com/learn/october-10-crypto-crash-explained' }
];

const RULES = [
  { t: 'Dừng lỗ có trước, khối lượng có sau.', d: 'Điểm dừng lỗ nằm ở nơi ý tưởng giao dịch sai. Khối lượng được tính từ khoảng cách đó, không phải từ số tiền bạn muốn kiếm.' },
  { t: 'Mỗi lệnh chỉ mất tối đa 0,5–1% tài khoản.', d: 'Mười lệnh thua liên tiếp vẫn còn hơn 90% vốn. Bạn sống sót để hệ thống có cơ hội chứng minh mình.' },
  { t: 'Đòn bẩy là công cụ ký quỹ, không phải bàn đạp lợi nhuận.', d: 'Đòn bẩy thật bằng giá trị vị thế chia cho vốn. Con số trên thanh trượt chỉ quyết định ký quỹ và giá thanh lý.' },
  { t: 'Không có setup trong kế hoạch thì không có lệnh.', d: 'Đứng ngoài cũng là một vị thế. Lỡ tàu thì bỏ, không đuổi giá.' },
  { t: 'Ghi lại mọi lệnh, kể cả lệnh thua.', d: 'Nhật ký biến cảm giác thành dữ liệu. Không đo được thì không cải thiện được.' }
];

const FAQ = [
  { q: 'Tôi chưa biết gì về crypto, học được không?', a: 'Được. Chương 1 bắt đầu từ cách giá được tạo ra, sàn và sổ lệnh vận hành ra sao. Bạn chỉ cần biết cộng trừ nhân chia; các công cụ tính trên trang sẽ làm phần còn lại.' },
  { q: 'Khóa học có gọi kèo hay khuyên mua coin nào không?', a: 'Không. Mọi ví dụ giá là giả định để minh hoạ phép tính. Mục tiêu là bạn tự ra quyết định theo quy trình của mình, không phụ thuộc vào ai.' },
  { q: 'Tôi có nên giao dịch futures ngay không?', a: 'Không nên. Khóa học đề nghị học xong chương 5 và 6, luyện trên tài khoản demo tối thiểu vài tuần, rồi mới dùng tiền thật với khối lượng rất nhỏ. Lộ trình ở chương 7 (tối thiểu 90 ngày, chuyển giai đoạn theo số lệnh) có tiêu chí cụ thể cho từng bước.' },
  { q: 'Học xong lộ trình thì có chắc giao dịch có lời không?', a: 'Không. Khóa học dạy bạn giao dịch đúng quy trình để không cháy tài khoản, và cách tự kiểm chứng một hệ thống. Chúng tôi đã backtest hệ thống mẫu của bài 7.1 trên dữ liệu thật BTC, ETH 2020–2026: gần hoà vốn sau phí, không hơn vào lệnh ngẫu nhiên. Cũng chính lần kiểm tra đó cho thấy rủi ro 1% mỗi lệnh giữ tài khoản gần nguyên vẹn, còn rủi ro 10% với cùng các lệnh làm mất 96% vốn. Lợi nhuận chỉ đến khi bạn tìm được và kiểm chứng được một lợi thế thật (bài 7.2).' },
  { q: 'Tôi chỉ đánh lệnh 10–20 USDT ký quỹ, phải dùng đòn bẩy cao mới đủ lệnh tối thiểu. Có ổn không?', a: 'Có thể ổn, nếu bạn hiểu rủi ro thật = ký quỹ × đòn bẩy × % dừng lỗ. Đòn bẩy chỉ là kết quả của việc bạn muốn bỏ ít ký quỹ; thứ quyết định bạn mất bao nhiêu là khoảng dừng lỗ và giá trị lệnh. Kẻ thù lớn nhất của lệnh nhỏ là phí: đánh khung quá nhỏ với lệnh market, phí có thể ăn 20–40% số tiền rủi ro. Bài 5.12 có quy trình từng bước và ba lệnh mẫu; bài 5.13 dành cho lệnh trên 100 và trên 1.000 USDT.' },
  { q: 'Giao dịch crypto ở Việt Nam có hợp pháp không?', a: 'Việt Nam đang thí điểm thị trường tài sản mã hóa theo Nghị quyết 05/2025/NQ-CP, có Nghị định xử phạt 284/2026 và thuế 0,1% mỗi lần chuyển nhượng. Bài 1.6 tóm tắt các văn bản này tính đến 27/09/2026. Khóa học không phải tư vấn pháp lý.' },
  { q: 'Dữ liệu học của tôi lưu ở đâu?', a: 'Trên trình duyệt bạn đang dùng (localStorage). Không có tài khoản, không gửi đi đâu. Đổi máy hoặc xoá dữ liệu trình duyệt thì tiến độ sẽ mất; trang Nhật ký lệnh có nút xuất CSV để bạn tự lưu.' }
];

// Vé lệnh cạnh biểu đồ hero: cùng một setup, đọc bằng con số
function Ticket() {
  const acc = 1000, risk = 0.01, entry = 80000, stop = 78400;
  const R = acc * risk, size = R / (entry - stop), notional = size * entry;
  return (
    <dl className="ticket">
      <div><dt>Cặp</dt><dd>BTCUSDT perpetual, giả định</dd></div>
      <div><dt>Vốn</dt><dd>{fmt(acc)} USDT</dd></div>
      <div><dt>Rủi ro 1R</dt><dd className="t-stop">{fmt(R)} USDT (1%)</dd></div>
      <div><dt>Khoảng dừng lỗ</dt><dd>{fmt(entry - stop)} ({fmt((entry - stop) / entry * 100, 1)}%)</dd></div>
      <div><dt>Khối lượng</dt><dd>{fmt(size, 5)} BTC</dd></div>
      <div><dt>Đòn bẩy thật</dt><dd>{fmt(notional / acc, 1)}x</dd></div>
    </dl>
  );
}

export default function Home() {
  useStore();
  const { enroll } = useUI();
  const total = progress.total();
  const nxt = progress.next();
  const started = total > 0 || learner.isEnrolled();

  useEffect(() => { document.title = `${BRAND} | Khóa học giao dịch crypto Spot và Futures có kỷ luật`; }, []);

  const primary = !nxt
    ? <Link className="btn btn-brand btn-lg" to="/chung-nhan">Xem chứng nhận</Link>
    : started
      ? <Link className="btn btn-brand btn-lg" to={lessonUrl(nxt.id)}>Học tiếp bài {nxt.track.no}.{nxt.index + 1}</Link>
      : <button className="btn btn-brand btn-lg" type="button" onClick={enroll}>Bắt đầu học miễn phí</button>;

  const hours = Math.round(totalMinutes() / 60);

  return (
    <main id="main">
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Khóa học giao dịch crypto Spot và Futures bằng tiếng Việt</p>
            <h1>Mỗi lệnh là một kế hoạch trước khi là một cú bấm.</h1>
            <p className="lede">Đi từ cách giá được tạo ra đến cách đặt dừng lỗ, tính khối lượng và giữ kỷ luật với đòn bẩy. Không có kèo, chỉ có quy trình, con số và nguồn kiểm chứng.</p>
            <div className="hero-cta">
              {primary}
              <Link className="btn btn-ghost btn-lg" to="/lo-trinh-futures">Lộ trình vào lệnh Futures</Link>
            </div>
            <ul className="hero-stats" aria-label="Khóa học gồm">
              <li><strong>{C.length}</strong> chương</li>
              <li><strong>{flat.length}</strong> bài</li>
              <li><strong>{hours}</strong> giờ đọc</li>
              <li><strong>{totalQuiz}</strong> câu kiểm tra</li>
              <li><strong>8</strong> công cụ tính</li>
            </ul>
          </div>
          <div className="hero-plan" aria-label="Ví dụ một kế hoạch lệnh">
            <div className="plan-card">
              <div className="plan-head"><span>Kế hoạch lệnh</span><span className="pill-long">Long</span></div>
              <TradePlanChart animate />
              <Ticket />
            </div>
          </div>
        </div>
      </section>

      <section className="facts" aria-labelledby="facts-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="facts-h">Sự thật trước khi bạn nạp tiền</h2>
            <p>Đa số người giao dịch nhỏ lẻ thua lỗ, và đòn bẩy làm tốc độ thua nhanh hơn. Khóa học này bắt đầu từ các con số đó, không né tránh.</p>
          </div>
          <ol className="ledger">
            {FACTS.map(f => (
              <li key={f.n}>
                <span className="ledger-n">{f.n}</span>
                <span className="ledger-t">{f.t}</span>
                <a className="ledger-s" href={f.u} target="_blank" rel="noopener">{f.s}</a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="curriculum" id="chuong-trinh" aria-labelledby="cur-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="cur-h">Chương trình học</h2>
            <p>{C.length} chương theo đúng thứ tự nên học. Chương 5 về futures là phần dài nhất: cơ chế, cách nhận diện setup, thời điểm vào, đặt dừng lỗ và bộ quy tắc kỷ luật. {fmtMin(totalMinutes())} đọc, {totalSources} nguồn tham khảo.</p>
          </div>
          <ol className="route">
            {C.map(t => {
              const done = progress.count(t.lessons.map(l => l.id));
              const core = t.id === 'c5';
              return (
                <li key={t.id} id={t.id} className={`stop${core ? ' core' : ''}`} style={{ '--c': t.tone }}>
                  <div className="stop-no" aria-hidden="true">{t.no}</div>
                  <details open={core}>
                    <summary>
                      <span className="stop-main">
                        <span className="stop-name">{t.name}{core && <em className="tag-core">Trọng tâm</em>}</span>
                        <span className="stop-title">{t.title}</span>
                        <span className="stop-desc">{t.desc}</span>
                      </span>
                      <span className="stop-meta">
                        <span>{t.lessons.length} bài</span>
                        <span>{fmtMin(trackMinutes(t))}</span>
                        {done > 0 && <span className="done">{done}/{t.lessons.length} xong</span>}
                        <IChev />
                      </span>
                    </summary>
                    <p className="stop-outcome"><strong>Học xong chương này:</strong> {t.outcome}{core && <> Muốn biết học bài nào trước để vào lệnh đầu tiên, xem <Link className="text-link" to="/lo-trinh-futures">lộ trình 8 chặng</Link>.</>}</p>
                    <ul className="stop-lessons">
                      {t.lessons.map((l, i) => {
                        const d = LESSONS[l.id];
                        const ok = progress.isDone(l.id);
                        return (
                          <li key={l.id} className={ok ? 'ok' : ''}>
                            <Link to={lessonUrl(l.id)}>
                              <span className="ln">{t.no}.{i + 1}</span>
                              <span className="lt">{l.title}</span>
                              <span className="lm">{ok ? <ICheck /> : d ? `${duration(l.id)} phút` : 'Đang biên soạn'}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="try" aria-labelledby="try-h">
        <div className="wrap try-grid">
          <div className="sec-head">
            <h2 id="try-h">Thử ngay: bạn nên vào lệnh bao nhiêu?</h2>
            <p>Đây là phép tính quan trọng nhất của khóa học. Nhập vốn, mức rủi ro và điểm dừng lỗ của một lệnh bạn đang nghĩ tới. Nếu con số làm bạn bất ngờ, bạn đang ở đúng chỗ.</p>
            <p><Link className="text-link" to="/cong-cu">Mở cả 8 công cụ tính</Link></p>
          </div>
          <PositionSize />
        </div>
      </section>

      <section className="rules" aria-labelledby="rules-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="rules-h">Năm nguyên tắc không thương lượng</h2>
            <p>Cả khóa học xoay quanh năm câu này. Bạn sẽ gặp lại chúng trong từng bài, dưới dạng công thức, ví dụ số và checklist.</p>
          </div>
          <ul className="rule-list">
            {RULES.map(r => <li key={r.t}><strong>{r.t}</strong><span>{r.d}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="legal" aria-labelledby="legal-h">
        <div className="wrap legal-box">
          <h2 id="legal-h">Pháp lý tại Việt Nam, tính đến 27/09/2026</h2>
          <ul>
            <li><strong>Nghị quyết 05/2025/NQ-CP</strong> thí điểm thị trường tài sản mã hóa 5 năm; giao dịch qua tổ chức được Bộ Tài chính cấp phép, bằng đồng Việt Nam.</li>
            <li><strong>Nghị định 284/2026/NĐ-CP</strong> có hiệu lực từ 01/09/2026: phạt 30–50 triệu đồng nếu nhà đầu tư trong nước giao dịch ngoài tổ chức được cấp phép. Chế tài áp dụng sau 6 tháng kể từ khi sàn đầu tiên được cấp phép; đến cuối tháng 9/2026 chưa có sàn nào được cấp phép chính thức.</li>
            <li><strong>Thông tư 32/2026/TT-BTC</strong>: thuế thu nhập cá nhân 0,1% trên giá chuyển nhượng từng lần qua tổ chức cung cấp dịch vụ.</li>
          </ul>
          <p>Nghị quyết 05 không đề cập giao dịch phái sinh. Đọc kỹ <Link className="text-link" to={lessonUrl('c1-b6')}>bài 1.6</Link> trước khi quyết định giao dịch futures.</p>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-h">
        <div className="wrap faq-grid">
          <h2 id="faq-h">Câu hỏi thường gặp</h2>
          <div>
            {FAQ.map(f => (
              <details key={f.q}>
                <summary>{f.q}<IChev /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap final-in">
          <h2>Bắt đầu từ bài 1.1: vì sao đa số thua.</h2>
          <p>Mất khoảng 15 phút. Không cần tài khoản, không cần nạp tiền.</p>
          {primary}
        </div>
      </section>
    </main>
  );
}
