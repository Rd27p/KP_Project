import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css'
import AppPortofolioMain from './pages/app_portofolio/App_Portofolio_Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<AppPortofolioMain />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
