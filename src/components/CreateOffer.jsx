// src/components/CreateOffer.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateOffer = () => {
  const { foodId } = useParams(); // foodID from URL
  console.log("All route params:", foodId)
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    code: '',
    discount: '',
    validity: '',
    status: 'active',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  console.log("🔔 Form submitted!");
  console.log("Food ID from URL:", foodId);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/api/hotel/offer`,
        {
          ...form,
          foodID: foodId,
        },
        { withCredentials: true }
      );
console.log(`${import.meta.env.VITE_API_DOMAIN}/api/hotel/offer`);
console.log("foodId from URL:", foodId);
console.log("foodId from params:", foodId);

      setSuccess('Offer created successfully!');
      setTimeout(() => {
        navigate("/my-hotels"); 
        // 👈 back to previous page (FoodList)
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || 'Failed to create offer. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-base-100 shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Offer</h2>

      {error && (
        <div className="alert alert-error shadow-lg mb-4">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success shadow-lg mb-4">
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            className="input input-bordered"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Code</span>
          </label>
          <input
            type="text"
            name="code"
            className="input input-bordered"
            value={form.code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Discount (%)</span>
          </label>
          <input
            type="number"
            name="discount"
            className="input input-bordered"
            value={form.discount}
            onChange={handleChange}
            required
            min={1}
            max={100}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Validity Date</span>
          </label>
          <input
            type="date"
            name="validity"
            className="input input-bordered"
            value={form.validity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            name="status"
            className="select select-bordered"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Creating...
              </>
            ) : (
              'Create Offer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOffer;
