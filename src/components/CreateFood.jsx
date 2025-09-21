
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    food_name: '',
    food_description: '',
    Quantity: '',
    price: '',
    category: 'veg',
    image: null,
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!hotelId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">
          Missing hotel ID. Please go back and select a hotel first.
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('food_name', formData.food_name);
      data.append('food_description', formData.food_description);
      data.append('Quantity', formData.Quantity);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('image', formData.image);
      data.append('hotelID', hotelId);

      const res = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/api/hotel/foodItem`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      setSuccess(res.data.message);
      setFormData({
        food_name: '',
        food_description: '',
        Quantity: '',
        price: '',
        category: 'veg',
        image: null,
      });

      // Optional navigation after adding food
    navigate('/my-hotels');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="p-6 border rounded bg-white shadow-md max-w-lg w-full">
        <h2 className="text-xl font-bold mb-6 text-center">Add Food Item</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="food_name"
            placeholder="Food Name"
            value={formData.food_name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="food_description"
            placeholder="Description"
            value={formData.food_description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
          <input
            type="number"
            name="Quantity"
            placeholder="Quantity"
            value={formData.Quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
            required
          />

          <button type="submit" className="btn btn-primary w-full">
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
