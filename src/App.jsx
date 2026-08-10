import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Infra from './pages/infrastructure_visibilty/Infra';
import AppPortofolioMain from './pages/app_portofolio/App_Portofolio_Main';
import AppProfile from './pages/app_portofolio/App_Profile';
import Architecture from './pages/app_portofolio/Architecture';
import ComplianceSecurity from './pages/app_portofolio/Compliance_Security';
import TechInfo from './pages/app_portofolio/Tech_Info';
import AppView from './pages/app_portofolio/App_View';
import Compare from './pages/app_portofolio/Compare';
import UserAccessMain from './pages/user_access/User_Access_Main';
import UserAccessRegis from './pages/user_access/User_Access_Regis';
import AppRegis from './pages/request/App_Regis';
import UseCaseRegis from './pages/request/Use_Case_Regis';
import BotRegis from './pages/feedback/Bot_Regis';
import Result from './pages/feedback/Result';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Security from './pages/security/Security';
import TSAInformation from './pages/tsa/TSA_Information';
import OSSData from './pages/oss/OSS_Data';
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
        <Route path="/infrastructure" element={<Infra />} />

        <Route path="/applications" element={<AppPortofolioMain />} />
        <Route path="/applications/compare" element={<Compare />} />
        <Route path="/applications/:id" element={<AppProfile />} />
        <Route path="/applications/:id/architecture" element={<Architecture />} />
        <Route path="/applications/:id/compliance-security" element={<ComplianceSecurity />} />
        <Route path="/applications/:id/tech-info" element={<TechInfo />} />
        <Route path="/applications/:id/app-view" element={<AppView />} />

        <Route path="/user-access" element={<UserAccessMain />} />
        <Route path="/user-access/register" element={<UserAccessRegis />} />

        <Route path="/request/app-registration" element={<AppRegis />} />
        <Route path="/request/use-case" element={<UseCaseRegis />} />

        <Route path="/feedback/result" element={<Result />} />
        <Route path="/feedback/bot-registration" element={<BotRegis />} />
        <Route path="/security-assessment" element={<Security />} />
        <Route path="/tsa-information" element={<TSAInformation />} />
        <Route path="/oss-data" element={<OSSData />} />

        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
