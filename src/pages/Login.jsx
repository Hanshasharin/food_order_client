import axios from 'axios'
import React, { useState } from 'react'
import { updateUser } from '../globalState/login/loginSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error , setError]= useState("")
  const [data,setData]=useState({
      email:"",
      password:""
  })

  const submitHandler = (event)=>{
       event.preventDefault()
       axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/user/login`,data, {withCredentials:true})
       .then(res=>{
          console.log(res);
          dispatch(updateUser(res.data.user));
          localStorage.setItem('user', JSON.stringify(res.data.user))

          console.log("User role:", res.data.user.role);

          if (res.data.user.role === 'hotel_owner') {
            navigate('/my-hotels');
          } else if (res.data.user.role === 'admin') {
            navigate('/userList');
          } else {
            navigate('/');
          }
       })
       .catch(err=>{
          setError(err.response.data.message);
       })
  }

  const changeHandler =(event)=>{
    const tempData = {...data}
    tempData[event.target.name]=event.target.value
    setData(tempData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input 
              type="email" 
              className="input input-bordered w-full" 
              placeholder="Type here" 
              name='email' 
              onChange={changeHandler} 
              value={data.email}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input 
              type="password" 
              className="input input-bordered w-full" 
              placeholder="Type here" 
              name='password' 
              onChange={changeHandler} 
              value={data.password} 
            />
          </fieldset>
          {error && <p className='text-red-500 text-center'>{error}</p>}
          <button className="btn btn-success btn-block" type='submit'>Submit</button>
        </form>
        <div className="text-center mt-4">
  <p>
    Don't have an account?{' '}
    <span
      className="text-blue-500 cursor-pointer hover:underline"
      onClick={() => navigate('/signup')}
    >
      Sign up
    </span>
  </p>
</div>
      </div>
    </div>
  )
}

export default Login
