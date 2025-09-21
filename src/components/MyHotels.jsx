import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import FoodList from './FoodList';

const MyHotels = () => {
      const navigate = useNavigate();
   const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHotels = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_DOMAIN}/api/hotel/my-hotels`, {
        withCredentials: true,
      });
      setHotels(res.data.hotelList);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // if (loading) {
  //   return <div className="text-center mt-10 loading loading-bars loading-lg text-primary"></div>;
  // }

  if (loading) {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <span className="loading loading-bars loading-lg text-primary"></span>
    </div>
  );
}

  if (error) {
    return <div className="alert alert-error mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">My Hotels</h1>
      {hotels.length === 0 ? (

        <div className="text-center text-gray-500">
          No Hotel added</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={hotel.hotel_image}
                  alt={hotel.hotel_name}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{hotel.hotel_name}</h2>
                <p><strong>Location:</strong> {hotel.location}</p>
                <p><strong>Timing:</strong> {hotel.timing}</p>
                {/* <p><strong>Contact:</strong> {hotel.contact_details}</p> */}
                <div className="card-actions justify-end">
                  <button className="btn btn-sm btn-outline btn-primary">Edit</button>
                  <button className="btn btn-sm btn-outline btn-error">Delete</button>
                   <button className="btn btn-sm btn-outline btn-primary"
                    onClick={() => navigate(`/add-food/${hotel._id}`)}>
                    Add Food
                  </button>
                      <button
  className="btn btn-sm btn-outline btn-secondary"
  onClick={() => navigate(`/food-list/${hotel._id}`)}
>
  View Food Items
</button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
       <div className="text-center my-6">
  <Link 
    to="/add" 
    className="btn btn-primary btn-lg rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
  >
    Add Hotel
  </Link>
</div>
    </div>
  );
};

export default MyHotels;
