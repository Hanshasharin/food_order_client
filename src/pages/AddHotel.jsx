import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddHotel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hotel_name: '',
    location: '',
    timing: '',
    contact_details: '',
  });
  const [hotelImage, setHotelImage] = useState(null); // 🔥 for image file
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setHotelImage(e.target.files[0]); // 💾 store file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('hotel_name', formData.hotel_name);
      data.append('location', formData.location);
      data.append('timing', formData.timing);
      data.append('contact_details', formData.contact_details);
      if (hotelImage) {
        data.append('hotel_image', hotelImage); // 📸 important
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/api/hotel/create`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      setSuccess(res.data.message);
      // Optional: redirect to home page
      navigate('/my-hotels');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6">Create a Hotel</h2>

      {error && <div className="alert alert-error mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="label" htmlFor="hotel_name">Hotel Name *</label>
          <input
            type="text"
            id="hotel_name"
            name="hotel_name"
            value={formData.hotel_name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="hotel_image">Hotel Image *</label>
          <input
            type="file"
            id="hotel_image"
            name="hotel_image"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            accept="image/*"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="timing">Timing *</label>
          <input
            type="text"
            id="timing"
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="contact_details">Contact Details *</label>
          <input
            type="text"
            id="contact_details"
            name="contact_details"
            value={formData.contact_details}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Create Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
