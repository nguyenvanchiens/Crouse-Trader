// Bộ icon SVG nét mảnh dùng trong toàn site
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

const make = (paths, extra = {}) => function Icon(props) {
  return <svg {...base} {...extra} {...props}>{paths}</svg>;
};

export const IMoon = make(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />, { className: 'i-moon' });
export const ISun = make(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>, { className: 'i-sun' });
export const IPlay = props => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z" /></svg>;
export const IDoc = make(<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></>);
export const ICheck = make(<path d="M5 12.5l4.5 4.5L19 7.5" />, { strokeWidth: 3 });
export const IChev = make(<path d="M6 9l6 6 6-6" />, { strokeWidth: 2.4 });
export const IClock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IQuiz = make(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.3M12 17h.01" /></>);
export const IAward = make(<><circle cx="12" cy="9" r="6" /><path d="M8.5 14 7 22l5-3 5 3-1.5-8" /></>);
export const ICode = make(<path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />);
export const IGlobe = make(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>);
export const IPhone = make(<><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M11 18h2" /></>);
export const IRefresh = make(<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" />);
export const INote = make(<><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="M13.5 6.5l4 4" /></>);
export const ILink = make(<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />);
export const IMenu = make(<path d="M4 7h16M4 12h16M4 17h16" />, { strokeWidth: 2.2 });
export const IClose = make(<path d="M6 6l12 12M18 6 6 18" />, { strokeWidth: 2.2 });
export const ILeft = make(<path d="M15 6l-6 6 6 6" />, { strokeWidth: 2.4 });
export const IRight = make(<path d="M9 6l6 6-6 6" />, { strokeWidth: 2.4 });
export const ITip = make(<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />, { strokeWidth: 2.2 });
export const IWarn = make(<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />, { strokeWidth: 2.2 });
export const IInfo = make(<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>, { strokeWidth: 2.2 });
export const IRisk = make(<><path d="M12 3l9.5 16.5h-19z" /><path d="M12 10v4M12 17.5v.01" /></>);
export const ICalc = make(<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h2M12 11h2M8 15h2M12 15h2M16 11v4" /></>);
export const IBook = make(<><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5M8 7h7" /></>);
export const IJournal = make(<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 3v18M11 8h6M11 12h6M11 16h4" /></>);
export const IChart = make(<><path d="M4 20V4M4 20h16" /><path d="M8 15v-3M12 15V8M16 15v-5" /></>);
export const IFormula = make(<><path d="M5 7h6M8 4v6M14 17h5M4 20l6-6M4 14l6 6" /><path d="M14 8.5h5" /></>);
export const IPlus = make(<path d="M12 5v14M5 12h14" />);
export const ITrash = make(<><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></>);
export const IDownload = make(<><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></>);
