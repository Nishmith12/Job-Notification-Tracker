import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import Digest from './pages/Digest';
import Settings from './pages/Settings';
import Proof from './pages/Proof';

import TestPage from './pages/TestPage';
import ShipPage from './pages/ShipPage';

import NotFound from './pages/NotFound';

import { JobProvider } from './context/JobContext';

function App() {
  return (
    <JobProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/proof" element={<Proof />} />
            <Route path="/jt/07-test" element={<TestPage />} />
            <Route path="/jt/08-ship" element={<ShipPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </JobProvider>
  );
}

export default App;
