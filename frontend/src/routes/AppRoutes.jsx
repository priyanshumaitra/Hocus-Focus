import React from 'react'
import { Route, BrowserRouter , Routes} from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Analytics from '../pages/Analytics.jsx'
import EyeTracking from '../pages/EyeTracking.jsx'
import Settings from '../pages/Settings.jsx'
import BlockedSitesPage from '../pages/BlockSites.jsx'
import Sessions from '../pages/Sessions.jsx'
import SignUp from '../pages/SignUp.jsx'


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path='/eye-tracking' element={<EyeTracking/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/block" element={<BlockedSitesPage/>} />
            <Route path="/sessions" element={<Sessions/>} />
            <Route path="/signup" element={<SignUp/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes