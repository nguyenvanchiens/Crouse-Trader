import { useState } from 'react';
import { Html } from './Visuals.jsx';

// Bài kiểm tra: chọn đáp án là chấm ngay, hiện giải thích; làm xong lưu điểm
export default function Quiz({ quiz, onFinish, extraActions }) {
  const [picks, setPicks] = useState({});
  const [round, setRound] = useState(0);
  const answered = Object.keys(picks).length;
  const correct = quiz.filter((q, i) => picks[i] === q.answer).length;
  const finished = answered === quiz.length;

  function pick(qi, oi) {
    if (picks[qi] !== undefined) return;
    const next = { ...picks, [qi]: oi };
    setPicks(next);
    if (Object.keys(next).length === quiz.length) {
      onFinish(quiz.filter((q, i) => next[i] === q.answer).length, quiz.length);
    }
  }

  return (
    <div key={round}>
      {quiz.map((q, qi) => {
        const p = picks[qi];
        const done = p !== undefined;
        return (
          <div className={`q${done ? ' answered' : ''}`} key={qi}>
            <fieldset>
              <legend><span className="qn">Câu {qi + 1}.</span><Html html={q.q} /></legend>
              {q.options.map((o, oi) => (
                <label key={oi} className={`opt${done && oi === q.answer ? ' correct' : ''}${done && oi === p && p !== q.answer ? ' wrong' : ''}`}>
                  <input type="radio" name={`q${round}-${qi}`} checked={p === oi} disabled={done} onChange={() => pick(qi, oi)} />
                  <Html html={o} />
                </label>
              ))}
            </fieldset>
            {done && (
              <p className="q-explain" aria-live="polite">
                <strong>{p === q.answer ? 'Chính xác.' : <>Chưa đúng. Đáp án là: <Html html={q.options[q.answer]} />.</>}</strong>{' '}
                <Html html={q.explain || ''} />
              </p>
            )}
          </div>
        );
      })}
      {finished && (
        <div className="quiz-result" aria-live="polite">
          <div>
            <strong>{correct}/{quiz.length} câu đúng</strong>
            <div style={{ color: 'var(--ink-2)', fontSize: '.95rem' }}>
              {correct === quiz.length ? 'Bạn đã nắm vững bài này.' : 'Xem lại giải thích ở câu sai, hoặc đọc lại phần bài học liên quan.'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn btn-ghost btn-sm" type="button" onClick={() => { setPicks({}); setRound(r => r + 1); }}>Làm lại</button>
            {extraActions}
          </div>
        </div>
      )}
    </div>
  );
}
