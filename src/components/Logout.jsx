// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { updateUser } from '../globalState/login/loginSlice'

// const Logout = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const logout = async () => {
//       try {
//         await axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/user/logout`,{}, {
//           withCredentials: true,
//         })

//         // Update Redux login state
//         dispatch(updateUser(false))

//         // Redirect to login or homepage
//         navigate('/login')
//       } catch (err) {
//         console.error('Logout failed:', err)
//         navigate('/login') // Still redirect even if logout fails
//       }
//     }

//     logout()
//   }, [dispatch, navigate])

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <span className="loading loading-spinner loading-lg text-primary"></span>
//     </div>
//   )
// }

// export default Logout


import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../globalState/login/loginSlice'  // ✅ use the logout action

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/user/logout`, {}, {
          withCredentials: true,
        });

        dispatch(logout()); // ✅ reset Redux + localStorage

        navigate('/login'); // ✅ redirect after logout
      } catch (err) {
        console.error('Logout failed:', err);
        dispatch(logout()); // Even if server fails, clear client state
        navigate('/login');
      }
    };

    logoutUser();
  }, [dispatch, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};

export default Logout;
