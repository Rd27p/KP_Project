import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AppPortofolioMain from './pages/app_portofolio/App_Portofolio_Main';
import AppProfile from './pages/app_portofolio/App_Profile';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<AppPortofolioMain />} />
        <Route path="/applications/:id" element={<AppProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
