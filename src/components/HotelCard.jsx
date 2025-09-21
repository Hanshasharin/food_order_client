
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
    // console.log('HotelCard received props:', hotel); // ✅ Debug log

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to hotel detail or profile etc, e.g. `/hotel/${hotel._id}`
    navigate(`hotelDetail/${hotel._id}`);

  };

  

  return (
   
    <div 
  className="card w-full bg-base-100 shadow-xl hover:shadow-2xl cursor-pointer transition-shadow" 
  onClick={handleClick}
>
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
    <p><strong>Contact:</strong> {hotel.contact_details}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-sm btn-primary">View</button>
    </div>
  </div>
</div>

  );
};



export default HotelCard;
