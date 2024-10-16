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
import AdminLogin from '../pages/Auth/AdminLogin';
import UserLogin from '../pages/Auth/UserLogin';
import UserRegister from '../pages/Auth/UserRegister';
import Main from '../layout/Main';
import Home from '../pages/Home/Home';
import Events from '../pages/Events/Events';
import ContactUs from '../pages/ContactUs/ContactUs';
import Categories from '../pages/Categories/Categories';
import AboutUs from '../pages/AboutUs/AboutUs';
import AdminOrSuperAdmin from './AdminOrSuperAdmin';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import EventDetailsPage from '../pages/Events/EventDetailsPage';
import ProfileForm from '../components/Profile/ProfileForm';
import PrivateRoutes from './PrivateRoutes';
import ChangePasswordForm from '../components/Profile/ChangePasswordForm';
import MyBookings from '../pages/MyBookings/MyBookings';
 
const AppRouter = () => {
  return (
    <>
       <Router>
        
        <Routes>
         
             <Route path='/' element={<Main/>}>
                      <Route index element={<Home/>} />
                      <Route path='/events' element={<Events/>} />
                      <Route path='/events/:id' element={<EventDetailsPage/>} />
                      <Route path='/categories' element={<Categories/>}/>
                      <Route path='/about' element={<AboutUs/>}/>
                      <Route path='/contact' element={<ContactUs/>} />
                      <Route path='/profile' element={
                        <PrivateRoutes>
                          <ProfileForm/>
                        </PrivateRoutes>
                         
                       } />
                      <Route path='/change-password' element={
                        <PrivateRoutes>
                           <ChangePasswordForm/>
                        </PrivateRoutes>
                         
                       } />
                      <Route path='/my_bookings' element={
                        <PrivateRoutes>
                             <MyBookings/>
                        </PrivateRoutes>
                         
                       } />

             </Route>
        </Routes>
          <Routes>
               <Route path="dashboard" element={
                    <AdminOrSuperAdmin>
                        <Dashboard/>
                    </AdminOrSuperAdmin>
                     
                }>
                        <Route index element={<DashboardHome/>} />
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
               <Route path='/admin/login' element={<AdminLogin/>}/>
               <Route path='/login' element={<UserLogin/>}/>
               <Route path='/register' element={<UserRegister/>}/>
               
          </Routes>
       </Router>
    </>
  )
}

export default AppRouter