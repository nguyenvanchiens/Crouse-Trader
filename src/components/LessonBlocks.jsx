// Hiển thị các block nội dung bài học (định dạng: src/data/SCHEMA.md)
import { useState } from 'react';
import { Html } from './Visuals.jsx';
import Figure from './Figures.jsx';
import { ToolBlock } from './Tools.jsx';
import { checks } from '../lib/store.js';
import { ICalc, ICheck, IDoc, IFormula, IInfo, IRisk, ITip, IWarn } from './Icons.jsx';

const TONE = {
  tip: { Icon: ITip, title: 'Mẹo' },
  warn: { Icon: IWarn, title: 'Cẩn thận' },
  note: { Icon: IInfo, title: 'Ghi chú' },
  risk: { Icon: IRisk, title: 'Cảnh báo rủi ro' }
};

function Checklist({ b, storeKey }) {
  const [state, setState] = useState(() => checks.get(storeKey));
  const items = b.items || [];
  const done = items.filter((_, i) => state[i]).length;
  function toggle(i) {
    const next = items.map((_, k) => (k === i ? !state[k] : !!state[k]));
    setState(next);
    checks.set(storeKey, next);
  }
  return (
    <div className="box checklist">
      <div className="box-title"><ICheck />{b.title || 'Checklist'}<span className="count">{done}/{items.length}</span></div>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            <label className={state[i] ? 'on' : ''}>
              <input type="checkbox" checked={!!state[i]} onChange={() => toggle(i)} />
              <Html html={it} />
            </label>
          </li>
        ))}
      </ul>
      {done === items.length && items.length > 0 && <p className="check-done">Đủ điều kiện theo checklist. Vẫn chỉ vào lệnh với khối lượng đã tính.</p>}
      {done < items.length && done > 0 && <p className="check-wait">Còn {items.length - done} mục chưa đạt. Một mục chưa đạt là đủ lý do để không vào lệnh.</p>}
    </div>
  );
}

function Block({ b, num, hIndex, storeKey }) {
  switch (b.type) {
    case 'h':
      return <h2 id={`muc-${hIndex}`}><span className="hn" aria-hidden="true">{num}.{hIndex}</span><Html html={b.text} /></h2>;
    case 'p':
      return <Html as="p" html={b.text} />;
    case 'list': {
      const Tag = b.ordered ? 'ol' : 'ul';
      return <Tag>{(b.items || []).map((it, i) => <Html as="li" key={i} html={it} />)}</Tag>;
    }
    case 'callout': {
      const tone = TONE[b.tone] ? b.tone : 'note';
      const { Icon, title } = TONE[tone];
      return <div className={`box callout ${tone}`}><div className="box-title"><Icon />{b.title || title}</div><Html as="div" html={b.text} /></div>;
    }
    case 'example':
      return <div className="box example"><div className="box-title"><IDoc />{b.title || 'Ví dụ'}</div><Html as="div" html={b.text} /></div>;
    case 'analogy':
      return <Html as="div" className="box analogy" html={b.text} />;
    case 'quote':
      return <blockquote className="quote"><Html as="p" html={b.text} />{b.cite && <Html as="cite" html={b.cite} />}</blockquote>;
    case 'table':
      return (
        <div className="table-wrap"><table>
          <thead><tr>{(b.head || []).map((h, i) => <Html as="th" scope="col" key={i} html={h} />)}</tr></thead>
          <tbody>{(b.rows || []).map((r, i) => <tr key={i}>{r.map((c, j) => <Html as="td" key={j} html={String(c)} />)}</tr>)}</tbody>
        </table></div>
      );
    case 'steps':
      return <ol className="steps">{(b.items || []).map((s, i) => <li key={i}><Html as="strong" html={s.title} /><Html html={s.text} /></li>)}</ol>;
    case 'formula':
      return (
        <div className="box formula">
          <div className="box-title"><IFormula />{b.title || 'Công thức'}</div>
          <Html as="div" className="expr" html={b.expr} />
          {b.vars && b.vars.length > 0 && (
            <dl className="vars">{b.vars.map(([k, d], i) => <div key={i}><Html as="dt" html={k} /><Html as="dd" html={d} /></div>)}</dl>
          )}
          {b.note && <Html as="p" className="f-note" html={b.note} />}
        </div>
      );
    case 'calc':
      return (
        <div className="box calc">
          <div className="box-title"><ICalc />{b.title || 'Tính thử'}</div>
          <table className="calc-t"><tbody>
            {(b.rows || []).map((r, i) => <tr key={i}><Html as="th" scope="row" html={String(r[0])} /><Html as="td" html={String(r[1] ?? '')} /></tr>)}
          </tbody></table>
          {b.result && <Html as="p" className="calc-r" html={b.result} />}
        </div>
      );
    case 'scenario':
      return (
        <div className="scenario">
          <div className="sc-head"><strong><Html html={b.title || 'Tình huống'} /></strong>{b.setup && <Html as="p" html={b.setup} />}</div>
          <div className="sc-cols">
            <div className="sc bad"><div className="sc-label">Trader cảm tính</div><Html as="div" html={b.bad} /></div>
            <div className="sc good"><div className="sc-label">Trader có kế hoạch</div><Html as="div" html={b.good} /></div>
          </div>
        </div>
      );
    case 'figure':
      return <Figure name={b.name} caption={b.caption} />;
    case 'tool':
      return <ToolBlock name={b.name} note={b.note} />;
    case 'checklist':
      return <Checklist b={b} storeKey={storeKey} />;
    default:
      return b.text ? <Html as="p" html={b.text} /> : null;
  }
}

export default function LessonBlocks({ blocks, num, lessonId }) {
  let h = 0;
  return (
    <div className="prose">
      {blocks.map((b, i) => <Block key={i} b={b} num={num} hIndex={b.type === 'h' ? ++h : h} storeKey={`${lessonId}:${i}`} />)}
    </div>
  );
}
