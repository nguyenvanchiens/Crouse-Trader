import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND, LESSONS, lessonInfo, lessonUrl, lessonNum, fmtMin } from '../lib/course.js';
import { progress, checks, useStore } from '../lib/store.js';
import { OrderPlan } from '../components/Tools.jsx';
import { PreTrade } from './ToolsPage.jsx';
import { ICheck } from '../components/Icons.jsx';

// Lộ trình từ con số 0 tới lệnh futures thật đầu tiên.
// must: bài bắt buộc để qua chặng; bài còn lại là nên đọc.
const STAGES = [
  {
    t: 'Hiểu luật chơi',
    why: 'Biết mình đang giao dịch cái gì, ở đâu, tốn phí bao nhiêu và pháp lý Việt Nam nói gì, trước khi nạp đồng nào.',
    lessons: [['c1-b1', 1], ['c1-b3', 1], ['c1-b4', 1], ['c1-b6', 1], ['c1-b5', 0]],
    gate: ['Giải thích được vì sao đa số trader nhỏ lẻ thua, bằng ít nhất hai con số có nguồn', 'Phân biệt được lệnh market, limit, stop-market, stop-limit và phí maker/taker', 'Biết tình trạng pháp lý và thuế crypto tại Việt Nam hiện tại']
  },
  {
    t: 'Đọc biểu đồ ở mức đủ dùng',
    why: 'Không cần 20 chỉ báo. Cần đọc được xu hướng, vùng giá và nhìn đúng khung thời gian.',
    lessons: [['c2-b1', 1], ['c2-b2', 1], ['c2-b3', 1], ['c2-b7', 1], ['c2-b5', 0], ['c2-b4', 0], ['c2-b6', 0]],
    gate: ['Trên biểu đồ ETH khung H4, xác định được xu hướng theo quy tắc đỉnh/đáy', 'Đánh dấu được 2 vùng hỗ trợ và 2 vùng kháng cự quan trọng nhất', 'Nói được khung nào để định hướng, khung nào để vào lệnh']
  },
  {
    t: 'Cơ chế futures',
    why: 'Hiểu đòn bẩy thật, ký quỹ, giá đánh dấu, thanh lý và funding. Phần lớn tài khoản cháy vì không hiểu chỗ này.',
    lessons: [['c5-b1', 1], ['c5-b2', 1], ['c5-b3', 1], ['c5-b4', 1]],
    tools: ['liquidation', 'funding'],
    gate: ['Tự tính được giá thanh lý gần đúng của một lệnh 10x', 'Biết vì sao nên dùng isolated và trigger theo mark price', 'Tính được chi phí funding nếu giữ lệnh 3 ngày']
  },
  {
    t: 'Quản trị rủi ro',
    why: 'Phép tính quan trọng nhất của khóa học: rủi ro mỗi lệnh bằng tiền, khối lượng từ khoảng dừng lỗ, kỳ vọng dương.',
    lessons: [['c6-b1', 1], ['c6-b2', 1], ['c6-b3', 1]],
    tools: ['position-size', 'expectancy'],
    gate: ['Tính khối lượng một lệnh trong dưới 1 phút từ vốn, % rủi ro và giá dừng lỗ', 'Biết tỷ lệ thắng hoà vốn của lệnh R:R 1:2 khi có phí', 'Chấp nhận trước rằng chuỗi 5 lệnh thua liên tiếp là chuyện bình thường']
  },
  {
    t: 'Setup, điểm vào, dừng lỗ, quản lý lệnh',
    why: 'Trái tim của khóa học: khi nào có lý do vào, vào lúc nào, dừng lỗ đặt ở đâu, và làm gì khi giá chạy.',
    lessons: [['c5-b5', 1], ['c5-b6', 1], ['c5-b7', 1], ['c5-b8', 1]],
    tools: ['rr'],
    gate: ['Viết được đủ 3 lớp (bối cảnh, vùng, kích hoạt) cho một setup trên biểu đồ thật', 'Đặt dừng lỗ ở điểm vô hiệu có vùng đệm, không đặt theo số tiền muốn mất', 'Viết ra giấy kế hoạch một lệnh: vào, dừng lỗ, 2 mục tiêu, khi nào dời về hoà vốn']
  },
  {
    t: 'Kỷ luật và quy mô vốn của bạn',
    why: 'Biến kiến thức thành bộ quy tắc cá nhân, và chọn cách đánh hợp với số vốn thật bạn có.',
    lessons: [['c5-b9', 1], ['c5-b10', 1], ['c5-b12', 1], ['c6-b4', 1], ['c5-b13', 0], ['c5-b11', 0]],
    tools: ['order-plan'],
    gate: ['Viết xong bộ quy tắc cá nhân: rủi ro mỗi lệnh, lỗ tối đa ngày/tuần, số lệnh tối đa, đòn bẩy tối đa', 'Kiểm tra được lệnh của mình có đạt mức tối thiểu của sàn và phí dưới 15% R không', 'Biết mình dễ mắc lỗi tâm lý nào nhất và quy tắc tạm dừng tương ứng']
  },
  {
    t: 'Tập dượt bằng tài khoản demo',
    why: 'Cùng giao diện, cùng quy trình, tiền ảo. Mục tiêu không phải lãi, mà là làm đúng quy trình mọi lần.',
    lessons: [['c7-b3', 1], ['c6-b5', 1], ['c7-b2', 1], ['c7-b1', 0], ['c7-b4', 0]],
    gate: ['Mở tài khoản Binance Demo Trading (hoặc demo của sàn bạn dùng)', 'Đã vào ít nhất 30 lệnh demo (bài 7.4), lệnh nào cũng có dừng lỗ ngay khi mở', 'Ghi đủ 30 lệnh vào Nhật ký lệnh, tỷ lệ làm đúng quy tắc từ 90% trở lên', 'Đã xem lại nhật ký và sửa ít nhất một quy tắc dựa trên dữ liệu']
  }
];

const FIRST_TRADE = [
  'Rủi ro 0,5% vốn cho lệnh thật đầu tiên, thấp hơn mức bình thường một nửa.',
  'Chỉ vào setup hạng A đúng như đã tập trên demo. Không có thì không vào.',
  'Isolated, one-way, đòn bẩy tính ra từ ký quỹ, không vượt đòn bẩy an toàn.',
  'Đặt TP và SL ngay khi mở lệnh. SL là stop-market, trigger theo mark price.',
  'Không mở lệnh trong 30 phút quanh tin CPI, FOMC.',
  'Sau lệnh, dù thắng hay thua, ghi nhật ký rồi nghỉ đến hết ngày.'
];

function StageGate({ k, items }) {
  const key = `roadmap:${k}`;
  const state = checks.get(key);
  const toggle = i => checks.set(key, items.map((_, j) => (j === i ? !state[j] : !!state[j])));
  return (
    <ul className="gate">
      {items.map((g, i) => (
        <li key={i}><label className={state[i] ? 'on' : ''}><input type="checkbox" checked={!!state[i]} onChange={() => toggle(i)} /><span>{g}</span></label></li>
      ))}
    </ul>
  );
}

export default function Roadmap() {
  useStore();
  useEffect(() => { document.title = `Lộ trình vào lệnh Futures đầu tiên | ${BRAND}`; }, []);

  const status = STAGES.map((s, k) => {
    const must = s.lessons.filter(([, m]) => m).map(([id]) => id);
    const done = progress.count(must);
    const g = checks.get(`roadmap:${k}`);
    const gates = s.gate.filter((_, i) => g[i]).length;
    return { must, done, gates, ok: done === must.length && gates === s.gate.length };
  });
  const cur = status.findIndex(x => !x.ok);
  const allOk = cur === -1;
  const mustAll = STAGES.flatMap(s => s.lessons.filter(([, m]) => m).map(([id]) => id));
  const mustMin = mustAll.reduce((a, id) => a + ((LESSONS[id] && LESSONS[id].duration) || 12), 0);

  return (
    <main id="main" className="page roadmap">
      <div className="wrap">
        <header className="page-head">
          <h1>Lộ trình vào lệnh Futures đầu tiên</h1>
          <p>Học theo đúng thứ tự dưới đây. Mỗi chặng có bài bắt buộc, công cụ để luyện và một cổng kiểm tra. Chỉ sang chặng sau khi qua cổng. Tổng cộng {mustAll.length} bài bắt buộc, khoảng {fmtMin(mustMin)} đọc, cộng thời gian tập demo.</p>
        </header>

        <ol className="rm-bar" aria-label="Tiến độ các chặng">
          {STAGES.map((s, k) => (
            <li key={k} className={status[k].ok ? 'ok' : k === cur ? 'cur' : ''}>
              <a href={`#chang-${k + 1}`}><span className="n">{status[k].ok ? <ICheck /> : k + 1}</span><span className="t">{s.t}</span></a>
            </li>
          ))}
          <li className={allOk ? 'cur' : ''}><a href="#lenh-dau-tien"><span className="n">8</span><span className="t">Lệnh thật đầu tiên</span></a></li>
        </ol>

        <div className="rm-stages">
          {STAGES.map((s, k) => {
            const st = status[k];
            const mins = s.lessons.filter(([, m]) => m).reduce((a, [id]) => a + ((LESSONS[id] && LESSONS[id].duration) || 12), 0);
            return (
              <section key={k} id={`chang-${k + 1}`} className={`rm-stage${st.ok ? ' ok' : k === cur ? ' cur' : ''}`} aria-labelledby={`rm-h-${k}`}>
                <div className="rm-no" aria-hidden="true">{st.ok ? <ICheck /> : k + 1}</div>
                <div className="rm-body">
                  <div className="rm-head">
                    <h2 id={`rm-h-${k}`}>Chặng {k + 1}: {s.t}</h2>
                    <span className="rm-meta">{st.done}/{st.must.length} bài bắt buộc, {st.gates}/{s.gate.length} cổng, khoảng {fmtMin(mins)}</span>
                  </div>
                  <p className="rm-why">{s.why}</p>
                  <div className="rm-cols">
                    <div>
                      <h3>Học</h3>
                      <ul className="rm-lessons">
                        {s.lessons.map(([id, must]) => {
                          const info = lessonInfo(id);
                          const done = progress.isDone(id);
                          return (
                            <li key={id} className={done ? 'done' : ''}>
                              <Link to={lessonUrl(id)}>
                                <span className="ln">{done ? <ICheck /> : lessonNum(info)}</span>
                                <span className="lt">{info.title}</span>
                                <span className={`tag ${must ? 'must' : 'opt'}`}>{must ? 'Bắt buộc' : 'Nên đọc'}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      {s.tools && (
                        <p className="rm-tools">Luyện với: {s.tools.map((t, i) => <span key={t}>{i > 0 && ', '}<Link className="text-link" to={`/cong-cu?c=${t}`}>{TOOL_NAMES[t]}</Link></span>)}</p>
                      )}
                    </div>
                    <div>
                      <h3>Cổng qua chặng</h3>
                      <StageGate k={k} items={s.gate} />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

          <section id="lenh-dau-tien" className={`rm-stage rm-final${allOk ? ' cur' : ''}`} aria-labelledby="rm-h-final">
            <div className="rm-no" aria-hidden="true">8</div>
            <div className="rm-body">
              <div className="rm-head">
                <h2 id="rm-h-final">Chặng 8: Lệnh thật đầu tiên</h2>
                <span className="rm-meta">{allOk ? 'Bạn đã qua cả 7 cổng' : `Còn ${STAGES.length - status.filter(x => x.ok).length} chặng chưa qua`}</span>
              </div>
              <p className="rm-why">Tiền thật, khối lượng nhỏ nhất có thể. Mục tiêu của lệnh này là chứng minh bạn làm đúng quy trình khi có tiền thật, không phải kiếm tiền.</p>
              {!allOk && <p className="rm-lock">Chưa nên vào lệnh thật. Hoàn thành chặng {cur + 1} trước: <a className="text-link" href={`#chang-${cur + 1}`}>{STAGES[cur].t}</a>.</p>}
              <h3>Sáu quy tắc cho lệnh thật đầu tiên</h3>
              <ol className="rm-rules">{FIRST_TRADE.map(r => <li key={r}>{r}</li>)}</ol>
              <h3>Bước 1: lập lệnh bằng con số</h3>
              <OrderPlan />
              <h3>Bước 2: đi qua checklist, thiếu một mục là không vào</h3>
              <PreTrade />
              <p className="rm-after">Bước 3: vào lệnh theo <Link className="text-link" to={lessonUrl('c5-b9')}>quy trình 10 bước ở bài 5.9</Link>, rồi ghi vào <Link className="text-link" to="/nhat-ky">Nhật ký lệnh</Link>. Từ lệnh thứ hai trở đi, bạn đang ở giai đoạn tiền nhỏ của <Link className="text-link" to={lessonUrl('c7-b4')}>lộ trình kiểm chứng ở bài 7.4</Link> (rủi ro 0,25–0,5%, thường 3–4 tháng).</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const TOOL_NAMES = {
  liquidation: 'giá thanh lý', funding: 'chi phí funding', 'position-size': 'khối lượng lệnh', expectancy: 'kỳ vọng',
  rr: 'R:R và hoà vốn', 'order-plan': 'lập lệnh theo vốn'
};
