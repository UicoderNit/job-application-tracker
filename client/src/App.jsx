import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import JobDetail from './pages/JobDetail.jsx';
import JobFormPage from './pages/JobFormPage.jsx';
import Jobs from './pages/Jobs.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/new" element={<JobFormPage />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/jobs/:id/edit" element={<JobFormPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
