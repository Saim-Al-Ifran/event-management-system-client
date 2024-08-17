import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
const App = () => {
  return (
    <>
       <Router>
          <Routes>
               <Route path="dashboard" element={<Dashboard/>}>
                        <Route path="random" element={<h1>Chin tapak dam dam</h1>}/>
                        <Route path="users/add" element={<h1>User dam dam</h1>}/>
                        <Route path="users/retrieve" element={<h1>retrieve</h1>}/>
                        <Route path="bookings" element={<h1>bookings</h1>}/>
                        <Route path="feedback" element={<h1>All feedback</h1>}/>
                        <Route path="settings" element={<h1>All feedback</h1>}/>
               </Route>
          </Routes>
       </Router>
    </>
  )
}

export default App
