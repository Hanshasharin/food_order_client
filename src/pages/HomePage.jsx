import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is imported
import MainCarousal from '../components/MainCarousal';
import HotelCard from '../components/HotelCard';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  const getHotel = () => {
    axios.get(`${import.meta.env.VITE_API_DOMAIN}/api/user/hotels`)
      .then((res) => {
        console.log("Hotel API response:", res.data);  // Debug
        setHotels(res.data);
      })
      .catch((err) => {
        console.error("Hotel API error:", err);
      });
  };

  useEffect(() => {
    getHotel();
  }, []);

  useEffect(() => {
    console.log("Hotels state updated:", hotels);  // Debug state updates
  }, [hotels]);

  return (
    <>
    
      <div className="max-w-7xl mx-auto px-4">
  <div className="my-8">
    <MainCarousal />
  </div>
  <h1 className="text-3xl font-bold text-center mb-6">Hotels Nearby</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
    {hotels.length > 0 ? (
      hotels.map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-full">No hotels found</p>
    )}
  </div>
</div>

    </>
  );
};

export default HomePage;
