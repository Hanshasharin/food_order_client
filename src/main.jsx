import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './styles/global.css'
import UserLayout from './layout/UserLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import { store } from './globalState/store'
import { Provider } from 'react-redux'
import Register from './pages/Register';
import PersonalDetails from './pages/PersonalDetails';
import Profile from './pages/Profile';
import Logout from './components/Logout';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AddHotel from './pages/AddHotel';
import MyHotels from './components/MyHotels';
import CreateFood from './components/CreateFood';
import FoodList from './components/FoodList';
import CreateOffer from './components/CreateOffer';
import UserList from './components/UserList';
import HotelDetail from './pages/HotelDetail';
import Cart from './components/Cart';
import OrderSuccess from './components/OrderSucces';
import MyOrders from './components/MyOrders';
const router = createBrowserRouter([
  {
    path:'',
    element:<UserLayout/>,
   children:[{ 
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
{
    path: "/signup",
    element: <Register/>,
  },
{
    path: "/peronalDetails",
    element: <PersonalDetails/>,
  },
{
    path: "/profile",
    element: <Profile/>,
  },
{
    path: "/logout",
    element: <Logout/>,
  },
  {
    path: "/add",
    element: <AddHotel/>,
  },
  
  {
  path:"/add-food/:hotelId" ,
  element:<CreateFood /> },

  {
    path: "/food-list/:hotelId",
    element: <FoodList/>,
  },
  // {
  //   path: "/hotelPage/:hotelId",
  //   element: <HotelPage/>,
  // },
  {
    path: "/my-hotels",
    element: <MyHotels/>,
  },
  {
  path: "/create-offer/:foodId",
  element: <CreateOffer/>
},
{
  path: "/userList",
  element: <UserList/>
},
{
    path: "/hotelDetail/:hotelId",
    element: <HotelDetail/>,
  },
  {
    path:'/cart',
    element:<Cart/>,
  },
   {
    path:'/order-success',
    element:<OrderSuccess/>,
  },
   {
    path:'/my-order',
    element:<MyOrders/>,
  },
]
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    
              <RouterProvider router={router} />

    </Provider>,
  </StrictMode>,
)
