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
// import { store } from './globalState/store'
// import { Provider } from 'react-redux'

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
  },]
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> */}
              <RouterProvider router={router} />

    {/* </Provider>, */}
  </StrictMode>,
)
