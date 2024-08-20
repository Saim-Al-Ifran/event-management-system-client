import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../layout/Dashboard';
import AllUsers from '../pages/Dashboard/User/AllUsers';
import AddUser from '../pages/Dashboard/User/AddUser';
import EditUser from '../pages/Dashboard/User/EditUser';
import AllCategories from '../pages/Dashboard/Category/AllCategories';
 
const AppRouter = () => {
  return (
    <>
       <Router>
          <Routes>
               <Route path="dashboard" element={<Dashboard/>}>
                        <Route path="users/add" element={<AddUser/>}/>
                        <Route path="users/edit/:id" element={<EditUser/>}/>
                        <Route path="users/" element={<AllUsers/>}/>
                        <Route path="bookings" element={<h1>bookings</h1>}/>
                        <Route path="feedback" element={<h1>All feedback</h1>}/>
                        <Route path="settings" element={<h1>All feedback</h1>}/>
                        <Route path="categories/add" element={<h1>Add Category</h1>}/>
                        <Route path="categories" element={<AllCategories/>}/>
                        <Route path="events" element={<h1>All events</h1>}/>
                        <Route path="events/add" element={<h1>Add events</h1>}/>
               </Route>
          </Routes>
       </Router>
    </>
  )
}

export default AppRouter