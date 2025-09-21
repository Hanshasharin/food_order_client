import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
}
  const [file, setFile] = useState(null);
  const [error, setError] = useState("")
  const [data, setData] = useState({
    email: "",
    password: "",
    phone: "",
  })

  

  const submitHandler = (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('phone', data.phone);
  
  if (file) {
    formData.append('profile_pic', file);
  }

  axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/user/register`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(res => {
    console.log(res.data);
    alert("Registration successful");
    navigate('/login');
  })
  .catch(err => {
    setError(err.response?.data?.message || "Something went wrong");
  });
};

  const changeHandler = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={submitHandler} className="space-y-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            className="input w-full"
            placeholder="Enter email"
            name="email"
            value={data.email}
            onChange={changeHandler}
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input w-full"
            placeholder="Enter password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Phone</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter phone number"
            name="phone"
            value={data.phone}
            onChange={changeHandler}
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Profile Picture URL</legend>
          <input
            // type="text"
            className="input w-full"
            placeholder="Paste image URL"
            name="profile_pic"
             type="file"
          //  name="profile_pic"
            accept="image/*"
            value={data.profile_pic}
            onChange={handleFileChange}
          />
          {file && <p>Selected file: {file.name}</p>}

        </fieldset>

        {/* {error && <p className="text-red-500">{error}</p>} */}
        {error && (
  typeof error === 'string' ? (
    <p className='text-red-500'>{error}</p>
  ) : typeof error === 'object' ? (
    Object.values(error).map((msg, i) => (
      <p key={i} className='text-red-500'>{msg}</p>
    ))
  ) : null
)}

        <button type="submit" className="btn btn-wide btn-primary">Register</button>
      </form>
    </div>
  )
}

export default Register


