import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AppPortofolioMain from './pages/app_portofolio/App_Portofolio_Main';
import AppProfile from './pages/app_portofolio/App_Profile';
import UserAccessMain from './pages/user_access/User_Access_Main';
import UserAccessRegis from './pages/user_access/User_Access_Regis';
import RequestMain from './pages/request/Request_Main';
import AppRegis from './pages/request/App_Regis';
import UseCaseRegis from './pages/request/Use_Case_Regis';
import BotRegis from './pages/feedback/Bot_Regis';
import Result from './pages/feedback/Result';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/applications" element={<AppPortofolioMain />} />
        <Route path="/applications/:id" element={<AppProfile />} />
        <Route path="/user-access" element={<UserAccessMain />} />
        <Route path="/user-access/register" element={<UserAccessRegis />} />
        <Route path="/request" element={<RequestMain />} />
        <Route path="/request/app-registration" element={<AppRegis />} />
        <Route path="/request/use-case" element={<UseCaseRegis />} />
        <Route path="/feedback/result" element={<Result />} />
        <Route path="/feedback/bot-registration" element={<BotRegis />} />

        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
