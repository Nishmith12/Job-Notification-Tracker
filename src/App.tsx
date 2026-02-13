import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import Digest from './pages/Digest';
import Settings from './pages/Settings';
import Proof from './pages/Proof';

import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/digest" element={<Digest />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/proof" element={<Proof />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
