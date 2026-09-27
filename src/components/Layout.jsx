import { Link, NavLink, Outlet } from 'react-router-dom';
import { BRAND, C, lessonUrl } from '../lib/course.js';
import { progress, learner, theme, useStore } from '../lib/store.js';
import { useUI } from '../lib/ui.jsx';
import { BrandMark, Ring } from './Visuals.jsx';
import { IMoon, ISun } from './Icons.jsx';

export function ThemeToggle({ className = '' }) {
  useStore();
  return (
    <button className={`icon-btn theme-toggle ${className}`} type="button" aria-label="Đổi giao diện sáng/tối" onClick={() => theme.toggle()}>
      <IMoon /><ISun />
    </button>
  );
}

export function Brand() {
  return <Link className="brand" to="/" aria-label={`${BRAND}, trang chủ`}><BrandMark /><span>{BRAND}</span></Link>;
}

export function Header() {
  useStore();
  const { enroll } = useUI();
  const total = progress.total();
  const pct = progress.pct();
  const nxt = progress.next();
  const navCls = ({ isActive }) => (isActive ? 'active' : undefined);

  let cta;
  if (!nxt) cta = <Link className="btn btn-brand btn-sm header-cta" to="/chung-nhan">Xem chứng nhận</Link>;
  else if (total || learner.isEnrolled()) cta = <Link className="btn btn-brand btn-sm header-cta" to={lessonUrl(nxt.id)}>Học tiếp</Link>;
  else cta = <button className="btn btn-brand btn-sm header-cta" type="button" onClick={enroll}>Bắt đầu học</button>;

  return (
    <>
      <a className="skip-link" href="#main">Bỏ qua, tới nội dung chính</a>
      <header className="site-header">
        <div className="wrap">
          <Brand />
          <nav className="nav" aria-label="Điều hướng chính">
            <NavLink to="/" end className={navCls}>Khóa học</NavLink>
            <NavLink to="/lo-trinh-futures" className={navCls}>Lộ trình Futures</NavLink>
            <NavLink to="/cong-cu" className={navCls}>Công cụ</NavLink>
            <NavLink to="/nhat-ky" className={navCls}>Nhật ký lệnh</NavLink>
            <NavLink to="/thuat-ngu" className={navCls}>Thuật ngữ</NavLink>
            <NavLink to="/hoc-cua-toi" className={navCls}>Học của tôi</NavLink>
          </nav>
          <div className="header-tools">
            {total > 0 && (
              <Link className="header-progress" to="/hoc-cua-toi" title="Tiến độ khóa học"><Ring pct={pct} size={30} /><span>{pct}%</span></Link>
            )}
            <ThemeToggle />
            {cta}
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-brand">
          <Brand />
          <p>Khóa học giao dịch crypto bằng tiếng Việt, đặt quản trị rủi ro lên trước dự đoán. Nội dung cập nhật tháng 9/2026.</p>
        </div>
        <div>
          <h3>Chương trình</h3>
          <ul>{C.map(t => <li key={t.id}><Link to={`/#${t.id}`}>{t.no}. {t.name}</Link></li>)}</ul>
        </div>
        <div>
          <h3>Thực hành</h3>
          <ul>
            <li><Link to="/lo-trinh-futures">Lộ trình vào lệnh Futures</Link></li>
            <li><Link to="/cong-cu">Công cụ tính</Link></li>
            <li><Link to="/nhat-ky">Nhật ký lệnh</Link></li>
            <li><Link to="/thuat-ngu">Thuật ngữ</Link></li>
            <li><Link to="/hoc-cua-toi">Học của tôi</Link></li>
          </ul>
        </div>
        <div>
          <h3>Nguồn gốc</h3>
          <ul>
            <li><a href="https://www.binance.com/en/support/faq/detail/360033525271" target="_blank" rel="noopener">Binance: quy trình thanh lý</a></li>
            <li><a href="https://www.bis.org/publ/bisbull69.pdf" target="_blank" rel="noopener">BIS Bulletin 69</a></li>
            <li><a href="https://chartschool.stockcharts.com/" target="_blank" rel="noopener">StockCharts ChartSchool</a></li>
            <li><a href="https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-5-2025-nq-cp-ve-trien-khai-thi-diem-thi-truong-tai-san-ma-hoa-tai-viet-nam-119250909184045221.htm" target="_blank" rel="noopener">Nghị quyết 05/2025/NQ-CP</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap disclaimer">
        <p><strong>Tuyên bố miễn trừ.</strong> Nội dung chỉ nhằm mục đích giáo dục, không phải tư vấn đầu tư, pháp lý hay thuế. Mọi ví dụ giá là giả định. Giao dịch tài sản mã hóa và hợp đồng tương lai có rủi ro cao, bạn có thể mất toàn bộ vốn. Khung pháp lý tại Việt Nam đang thay đổi; hãy kiểm tra văn bản mới nhất trước khi giao dịch.</p>
      </div>
    </footer>
  );
}

// Khung trang thường: header + nội dung + footer
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
