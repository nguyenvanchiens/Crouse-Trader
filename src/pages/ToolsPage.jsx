import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BRAND, lessonUrl } from '../lib/course.js';
import { TOOLS } from '../components/Tools.jsx';
import { checks, useStore } from '../lib/store.js';
import { Html } from '../components/Visuals.jsx';

// Checklist trước lệnh dùng chung, lưu trạng thái trên trình duyệt
const PRE_TRADE = [
  'Setup này có trong kế hoạch giao dịch đã viết sẵn của tôi.',
  'Xu hướng khung lớn cùng chiều với lệnh, hoặc tôi đang dùng đúng setup đảo chiều đã quy định.',
  'Giá đang ở vùng giá đã đánh dấu từ trước, không phải giữa biên độ.',
  'Tín hiệu kích hoạt đã xuất hiện trên nến ĐÃ ĐÓNG.',
  'Điểm dừng lỗ nằm ở nơi ý tưởng sai, có vùng đệm, không đặt đúng số tròn.',
  'Khối lượng được tính từ khoảng dừng lỗ, rủi ro không quá 1% tài khoản.',
  'R:R tới mục tiêu hợp lý đầu tiên từ 1:2 trở lên.',
  'Giá thanh lý cách xa dừng lỗ ít nhất 2–3 lần khoảng dừng lỗ (futures).',
  'Không có tin vĩ mô lớn (CPI, FOMC) trong 30 phút tới.',
  'Tôi chưa chạm giới hạn lỗ ngày, và không vừa thua 2 lệnh liên tiếp.',
  'Tôi không vào lệnh để gỡ lỗ, vì sợ lỡ cơ hội hay vì chán.',
  'Lệnh dừng lỗ và chốt lời sẽ được đặt ngay khi mở vị thế.'
];

export function PreTrade() {
  useStore();
  const key = 'tools:pretrade';
  const state = checks.get(key);
  const done = PRE_TRADE.filter((_, i) => state[i]).length;
  const toggle = i => checks.set(key, PRE_TRADE.map((_, k) => (k === i ? !state[k] : !!state[k])));
  return (
    <div className="box checklist big">
      <div className="box-title">Checklist trước khi bấm lệnh<span className="count">{done}/{PRE_TRADE.length}</span></div>
      <ul>
        {PRE_TRADE.map((it, i) => (
          <li key={i}><label className={state[i] ? 'on' : ''}><input type="checkbox" checked={!!state[i]} onChange={() => toggle(i)} /><Html html={it} /></label></li>
        ))}
      </ul>
      <div className="check-foot">
        {done === PRE_TRADE.length
          ? <p className="check-done">Đủ 12/12. Vào lệnh đúng khối lượng đã tính, rồi ghi vào nhật ký.</p>
          : <p className="check-wait">Chỉ cần một mục chưa đạt là đủ lý do để không vào lệnh.</p>}
        <button type="button" className="link-btn" onClick={() => checks.set(key, [])}>Bỏ chọn tất cả</button>
      </div>
    </div>
  );
}

const ORDER = ['position-size', 'order-plan', 'liquidation', 'rr', 'expectancy', 'drawdown', 'funding', 'dca'];
const LINKS = { 'position-size': 'c6-b1', 'order-plan': 'c5-b12', liquidation: 'c5-b3', rr: 'c6-b2', expectancy: 'c6-b2', drawdown: 'c6-b3', funding: 'c5-b4', dca: 'c4-b1' };

export default function ToolsPage() {
  const [params, setParams] = useSearchParams();
  const cur = ORDER.includes(params.get('c')) ? params.get('c') : 'position-size';
  const [show, setShow] = useState(cur);
  useEffect(() => { setShow(cur); }, [cur]);
  useEffect(() => { document.title = `Công cụ tính | ${BRAND}`; }, []);
  const T = TOOLS[show];

  return (
    <main id="main" className="page">
      <div className="wrap">
        <header className="page-head">
          <h1>Công cụ tính</h1>
          <p>Tính trước khi bấm. Các giá trị bạn nhập được nhớ trên trình duyệt này, không gửi đi đâu. Kết quả là ước tính để lập kế hoạch; giá thanh lý và phí cuối cùng luôn theo con số sàn hiển thị.</p>
        </header>
        <div className="tools-layout">
          <nav className="tool-nav" aria-label="Chọn công cụ">
            {ORDER.map(k => (
              <button key={k} type="button" aria-pressed={show === k} className={show === k ? 'on' : ''} onClick={() => setParams({ c: k }, { replace: true })}>
                <strong>{TOOLS[k].title}</strong><span>{TOOLS[k].desc}</span>
              </button>
            ))}
          </nav>
          <section className="tool-main" aria-live="polite">
            <T.C key={show} />
            <p className="tool-learn">Học cách dùng con số này trong <Link className="text-link" to={lessonUrl(LINKS[show])}>bài {LINKS[show].replace('c', '').replace('-b', '.')}</Link>.</p>
          </section>
        </div>
        <section className="pretrade" aria-label="Checklist trước lệnh">
          <PreTrade />
        </section>
      </div>
    </main>
  );
}
