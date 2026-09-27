import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { UIProvider } from './lib/ui.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Learn from './pages/Learn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Certificate from './pages/Certificate.jsx';
import Glossary from './pages/Glossary.jsx';
import ToolsPage from './pages/ToolsPage.jsx';
import Journal from './pages/Journal.jsx';
import NotFound from './pages/NotFound.jsx';
import Roadmap from './pages/Roadmap.jsx';

// Cuộn lên đầu khi đổi trang; cuộn tới mục khi URL có #hash
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView();
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <UIProvider>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lo-trinh-futures" element={<Roadmap />} />
          <Route path="cong-cu" element={<ToolsPage />} />
          <Route path="nhat-ky" element={<Journal />} />
          <Route path="hoc-cua-toi" element={<Dashboard />} />
          <Route path="chung-nhan" element={<Certificate />} />
          <Route path="thuat-ngu" element={<Glossary />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="bai-hoc" element={<Navigate to="/bai-hoc/c1-b1" replace />} />
        <Route path="bai-hoc/:id" element={<Learn />} />
      </Routes>
    </UIProvider>
  );
}
