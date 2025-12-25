import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { Home } from './pages/Home'
import { UserProfiles } from './components/UserProfile/UserProfiles'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
