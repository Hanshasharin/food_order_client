import React, { useState } from 'react'
import axios from 'axios'

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    alternateAddress: '',
    specialInstructions: ''
  })

  const [success, setSuccess] = useState('')
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess('')

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/api/user/personalDetails`,
        formData,
        { withCredentials: true }
      )

      setSuccess(response.data.message)
      setFormData({
        fullName: '',
        address: '',
        alternateAddress: '',
        specialInstructions: ''
      })
    } catch (err) {
      console.error('Submission error:', err)
      const message = err.response?.data?.message || 'Something went wrong'
      setError(message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        />

        <textarea
          name="alternateAddress"
          placeholder="Alternate Address (Optional)"
          value={formData.alternateAddress}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <textarea
          name="specialInstructions"
          placeholder="Special Instructions (Optional)"
          value={formData.specialInstructions}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        {success && <p className="text-green-600">{success}</p>}

        {error && (
          typeof error === 'string' ? (
            <p className="text-red-500">{error}</p>
          ) : typeof error === 'object' ? (
            Object.values(error).map((msg, i) => (
              <p key={i} className="text-red-500">{msg}</p>
            ))
          ) : null
        )}

        <button className="btn btn-primary w-full" type="submit">Save Details</button>
      </form>
    </div>
  )
}

export default PersonalDetails
