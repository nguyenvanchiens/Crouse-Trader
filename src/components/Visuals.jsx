// Logo, vòng tiến độ và HTML inline

// Logo: một cây nến với vạch kế hoạch cắt ngang (dừng lỗ bên dưới, mục tiêu bên trên)
export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="7" fill="currentColor" />
      <path d="M16 6.5v19" stroke="var(--brand-bg)" strokeWidth="2" strokeLinecap="round" />
      <rect x="11.5" y="10.5" width="9" height="10" rx="1.5" fill="var(--plan)" />
      <path d="M6 23.5h20" stroke="var(--brand-bg)" strokeWidth="1.6" strokeDasharray="2.2 2" />
    </svg>
  );
}

export function Ring({ pct, size = 40, stroke = 4 }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, h = size / 2;
  return (
    <svg className="ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={h} cy={h} r={r} fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth={stroke} />
      <circle cx={h} cy={h} r={r} fill="none" stroke="var(--ring, var(--plan))" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform={`rotate(-90 ${h} ${h})`} />
    </svg>
  );
}

// HTML inline đã được biên soạn sẵn trong dữ liệu bài học (strong, em, code, a)
export function Html({ as: Tag = 'span', html, ...rest }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}
