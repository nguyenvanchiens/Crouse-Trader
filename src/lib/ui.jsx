// Ngữ cảnh giao diện dùng chung: thông báo nhanh (toast) và hộp thoại ghi danh
import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flat, lessonUrl } from './course.js';
import { learner, progress } from './store.js';
import { IClose } from '../components/Icons.jsx';

const UICtx = createContext(null);
export const useUI = () => useContext(UICtx);

export function UIProvider({ children }) {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  const timer = useRef();
  const dialog = useRef(null);
  const [name, setName] = useState('');
  const [ack, setAck] = useState(false);
  const navigate = useNavigate();

  const toast = useCallback(text => {
    setMsg(text);
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2400);
  }, []);

  const goNext = useCallback(() => {
    const nxt = progress.next();
    navigate(nxt ? lessonUrl(nxt.id) : '/hoc-cua-toi');
  }, [navigate]);

  // Chưa ghi danh: mở hộp thoại. Đã ghi danh: vào thẳng bài chưa học.
  const enroll = useCallback(() => {
    if (learner.isEnrolled()) { goNext(); return; }
    setName(''); setAck(false);
    if (dialog.current && dialog.current.showModal) dialog.current.showModal();
    else { learner.enroll(''); navigate(lessonUrl(flat[0].id)); }
  }, [goNext, navigate]);

  function submit(e) {
    e.preventDefault();
    if (!ack) return;
    learner.enroll(name);
    dialog.current.close();
    goNext();
  }

  return (
    <UICtx.Provider value={{ toast, enroll }}>
      {children}
      <div className={`toast${show ? ' show' : ''}`} role="status" aria-live="polite">{msg}</div>
      <dialog className="modal" ref={dialog} aria-labelledby="enroll-title">
        <form className="modal-card" onSubmit={submit}>
          <button className="icon-btn modal-close" type="button" aria-label="Đóng" onClick={() => dialog.current.close()}><IClose /></button>
          <h2 id="enroll-title">Bắt đầu khóa học</h2>
          <p>Miễn phí, không cần tài khoản. Tiến độ, ghi chú và nhật ký giao dịch được lưu ngay trên trình duyệt này.</p>
          <label htmlFor="enroll-name">Tên hiển thị trên chứng nhận</label>
          <input id="enroll-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="Ví dụ: Nguyễn Minh Anh" maxLength={60} />
          <label className="ack">
            <input type="checkbox" checked={ack} onChange={e => setAck(e.target.checked)} required />
            <span>Tôi hiểu đây là khóa học giáo dục, không phải lời khuyên đầu tư. Giao dịch crypto, nhất là futures có đòn bẩy, có thể làm mất toàn bộ số tiền đã bỏ vào.</span>
          </label>
          <div className="modal-actions"><button className="btn btn-brand" type="submit" disabled={!ack}>Vào bài đầu tiên</button></div>
        </form>
      </dialog>
    </UICtx.Provider>
  );
}
