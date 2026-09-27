// Trạng thái người học lưu trong localStorage.
// useStore() đăng ký component để render lại mỗi khi dữ liệu thay đổi (kể cả từ tab khác).
import { useSyncExternalStore } from 'react';
import { flat } from './course.js';

const listeners = new Set();
let version = 0;
function emit() { version++; listeners.forEach(l => l()); }

function get(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) ?? fallback : fallback; }
  catch { return fallback; }
}
function set(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* bỏ qua: chế độ riêng tư */ }
  emit();
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', e => { if (e.key && e.key.startsWith('solenh.')) emit(); });
}

export function useStore() {
  return useSyncExternalStore(
    cb => { listeners.add(cb); return () => listeners.delete(cb); },
    () => version
  );
}

export const learner = {
  get: () => get('solenh.learner', null),
  isEnrolled: () => !!get('solenh.learner', null),
  enroll(name) {
    const cur = this.get();
    set('solenh.learner', { name: (name || '').trim() || (cur && cur.name) || '', since: (cur && cur.since) || Date.now() });
  },
  setName(name) {
    const cur = this.get() || {};
    set('solenh.learner', { name: name.trim(), since: cur.since || Date.now() });
  }
};

export const progress = {
  all: () => get('solenh.done', {}),
  isDone: id => !!get('solenh.done', {})[id],
  set(id, done) {
    const p = this.all();
    if (done) p[id] = Date.now(); else delete p[id];
    try { localStorage.setItem('solenh.last', JSON.stringify(id)); } catch { /* bỏ qua */ }
    if (!learner.isEnrolled()) learner.enroll('');
    set('solenh.done', p);
  },
  count(ids) { const p = this.all(); return ids.filter(id => p[id]).length; },
  total() { return this.count(flat.map(l => l.id)); },
  pct() { return Math.round(this.total() / flat.length * 100); },
  next() { const p = this.all(); return flat.find(l => !p[l.id]) || null; },
  last: () => get('solenh.last', null),
  touch(id) { try { localStorage.setItem('solenh.last', JSON.stringify(id)); } catch { /* bỏ qua */ } },
  completedAt() {
    const p = this.all();
    if (this.total() < flat.length) return null;
    return Math.max(...flat.map(l => p[l.id]));
  },
  quiz: () => get('solenh.quiz', {}),
  setQuiz(id, score, total) { const q = this.quiz(); q[id] = { score, total }; set('solenh.quiz', q); },
  reset() {
    ['solenh.done', 'solenh.quiz', 'solenh.last', 'solenh.notes', 'solenh.checks'].forEach(k => { try { localStorage.removeItem(k); } catch { /* bỏ qua */ } });
    emit();
  }
};

export const notes = {
  all: () => get('solenh.notes', {}),
  get: id => get('solenh.notes', {})[id] || '',
  set(id, text) {
    const n = this.all();
    if (text && text.trim()) n[id] = text; else delete n[id];
    set('solenh.notes', n);
  }
};

// ---------- Theme ----------
export const theme = {
  current() {
    return document.documentElement.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  },
  toggle() {
    const next = this.current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    set('solenh.theme', next);
  }
};

// ---------- Nhật ký giao dịch ----------
// Mỗi lệnh: { id, date, pair, side, setup, entry, stop, exit, fee, emotion, followed, note }
export const journal = {
  all: () => get('solenh.journal', []),
  add(t) { set('solenh.journal', [{ ...t, id: Date.now().toString(36) }, ...this.all()]); },
  update(id, patch) { set('solenh.journal', this.all().map(t => (t.id === id ? { ...t, ...patch } : t))); },
  remove(id) { set('solenh.journal', this.all().filter(t => t.id !== id)); },
  replace(list) { set('solenh.journal', list); }
};

// Checklist trong bài học: { [lessonId:blockIndex]: [true,false,...] }
export const checks = {
  get: key => get('solenh.checks', {})[key] || [],
  set(key, arr) { const c = get('solenh.checks', {}); c[key] = arr; set('solenh.checks', c); }
};

// Giá trị nhập gần nhất của công cụ tính (để mở lại không phải gõ lại)
export const toolPrefs = {
  get: (name, fallback) => ({ ...fallback, ...(get('solenh.tools', {})[name] || {}) }),
  set(name, v) {
    const all = get('solenh.tools', {});
    all[name] = v;
    try { localStorage.setItem('solenh.tools', JSON.stringify(all)); } catch { /* bỏ qua */ }
  }
};
