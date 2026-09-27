// Dữ liệu khóa học đã gộp sẵn và các hàm tra cứu dùng chung.
import CURRICULUM from '../data/curriculum.js';

// Mỗi chương một hoặc nhiều file (chuong-5a.js, chuong-5b.js...), gộp tự động
const files = import.meta.glob('../data/lessons/*.js', { eager: true, import: 'default' });

export const C = CURRICULUM;
export const LESSONS = Object.assign({}, ...Object.values(files));

export const BRAND = 'Sổ Lệnh';
export const COURSE_TITLE = 'Giao dịch crypto có kỷ luật: Spot và Futures';

// Danh sách phẳng: mỗi bài kèm chương và vị trí trong chương
export const flat = [];
C.forEach(t => t.lessons.forEach((l, i) => flat.push({ ...l, track: t, index: i })));

export const lessonInfo = id => flat.find(l => l.id === id) || null;
export const lessonUrl = (id, tab) => `/bai-hoc/${encodeURIComponent(id)}${tab ? `?tab=${tab}` : ''}`;
export const lessonNum = l => `${l.track.no}.${l.index + 1}`;
export const duration = id => (LESSONS[id] && LESSONS[id].duration) || 12;
export const trackMinutes = t => t.lessons.reduce((s, l) => s + duration(l.id), 0);
export const totalMinutes = () => C.reduce((s, t) => s + trackMinutes(t), 0);
export const totalQuiz = Object.values(LESSONS).reduce((s, d) => s + (d.quiz ? d.quiz.length : 0), 0);
export const totalSources = new Set(Object.values(LESSONS).flatMap(d => (d.sources || []).map(s => s.url))).size;

export function fmtMin(m) {
  const h = Math.floor(m / 60), r = m % 60;
  return h ? `${h} giờ${r ? ` ${r} phút` : ''}` : `${m} phút`;
}

export const ytThumb = id => `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
export const ytEmbed = id => `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&cc_load_policy=1`;
export const ytWatch = id => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
