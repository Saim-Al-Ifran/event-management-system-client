import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../layout/Dashboard';
import AllUsers from '../pages/Dashboard/User/AllUsers';
import AddUser from '../pages/Dashboard/User/AddUser';
import EditUser from '../pages/Dashboard/User/EditUser';
import AllCategories from '../pages/Dashboard/Category/AllCategories';
import AddCategory from '../pages/Dashboard/Category/AddCategory';
import EditCategory from '../pages/Dashboard/Category/EditCategory';
import AllEvents from '../pages/Dashboard/Event/AllEvents';
import AddEvent from '../pages/Dashboard/Event/AddEvent';
import EditEvent from '../pages/Dashboard/Event/EditEvent';
import AllBookings from '../pages/Dashboard/Bookings/AllBookings';
import FeedBack from '../pages/Dashboard/Feedback/FeedBack';
import Settings from '../pages/Dashboard/Settings/Settings';
 
const AppRouter = () => {
  return (
    <>
       <Router>
          <Routes>
               <Route path="dashboard" element={<Dashboard/>}>
                        <Route path="users/add" element={<AddUser/>}/>
                        <Route path="users/edit/:id" element={<EditUser/>}/>
                        <Route path="users/" element={<AllUsers/>}/>
                        <Route path="bookings" element={<AllBookings/>}/>
                        <Route path="feedback" element={<FeedBack/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="category/add" element={<AddCategory/>}/>
                        <Route path="categories" element={<AllCategories/>}/>
                        <Route path="category/edit/:id" element={<EditCategory/>}/>
                        <Route path="events" element={<AllEvents/>}/>
                        <Route path="event/add" element={<AddEvent/>}/>
                        <Route path="event/edit/:id" element={<EditEvent/>}/>
               </Route>
          </Routes>
       </Router>
    </>
  )
}

export default AppRouter