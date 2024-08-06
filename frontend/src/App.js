import './style/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from './layout/Siderbar';
import '@fontsource/inter'
import '@fontsource/quicksand'
import '@fontsource/quantico'
import MainLayout from './layout/MainLayout';
import Home from './pages/Home'
import Mint from './pages/Mint'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

function App() {
  return (
    <div className='flex min-h-screen border-skin-border bg-skin-bg'>
      {/* <Sidebar /> */}
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout />} >
              {/* <Route index element={<Home />} />
              <Route path="mint" element={<Mint />} /> */}
              <Route index element={<Mint />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Home />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
