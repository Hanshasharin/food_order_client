import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FoodList = () => {
  const { hotelId } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
const navigate = useNavigate();



  useEffect(() => {
    if (!hotelId) return;

    setLoading(true);
    setError('');
    

    axios.get(`${import.meta.env.VITE_API_DOMAIN}/api/hotel/food-list/${hotelId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFoodItems(res.data.foodItems);
      })
      
      .catch((err) => {
        console.error("Error fetching food items", err);
        setError('Failed to fetch food items.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hotelId]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg w-fit mx-auto mt-10">
        <span>{error}</span>
      </div>
    );
  }

  if (foodItems.length === 0) {
    return (
      <div className="hero mt-10 bg-base-200 rounded-lg">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-gray-700">No food items found</h2>
            <p className="py-2 text-gray-500">Try adding some items to this hotel.</p>
          </div>
        </div>
      </div>
    );
  }
const handleDelete = async (foodID) => {
  const confirmed = window.confirm("Are you sure you want to delete this food item?");
  if (!confirmed) return;

  try {
    await axios.delete(`${import.meta.env.VITE_API_DOMAIN}/api/hotel/delete/${foodID}`, {
      withCredentials: true,
    });

    // Refresh the list after deletion
    setFoodItems((prev) => prev.filter((item) => item._id !== foodID));
  } catch (error) {
    console.error("Failed to delete food item:", error);
    alert("Error deleting food item.");
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Food Items</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {foodItems.map((food) => (
          <div key={food._id} className="card bg-base-100 shadow-md">
            <figure className="h-48 w-full">
              <img
                src={food.image }
                alt={food.food_name}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg">{food.food_name}</h2>
              <p className="text-sm text-gray-600">{food.food_description}</p>
              <div className="text-sm mt-2">
                <span className="font-semibold">Price:</span> ₹{food.price}<br />
                <span className="font-semibold">Category:</span> {food.category}<br />
                <span className="font-semibold">Quantity:</span> {food.Quantity}
              </div>
            
              {food.offer ? (
  <div className="mt-2 p-2 bg-green-100 rounded text-sm">
    <strong>{food.offer.title}</strong> - {food.offer.discount}% off<br />
    Valid till: {new Date(food.offer.validity).toLocaleDateString()}
  </div>
) : (
  <p className="text-sm text-gray-400">No active offers</p>
)}
              <button
  className="btn btn-sm btn-outline btn-accent mt-2"
  onClick={() => navigate(`/create-offer/${food._id}`)}
>
  Add Offer
</button>
 <button
    className="btn btn-sm btn-outline btn-error"
    onClick={() => handleDelete(food._id)}
  >Delete</button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default FoodList;
