import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const MainCarousel = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_DOMAIN}/api/hotel/active-offers`,
          { withCredentials: true }
        );
        setFoods(res.data.foods);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch active offers");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const settings = {
    dots: true,
    fade: true,              // Enable fade transition
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,          // Autoplay enabled
    autoplaySpeed: 4500,     // 3 seconds per slide
    pauseOnHover: true,
    waitForAnimate: false,
    cssEase: "ease-in-out"  
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg w-fit mx-auto mt-6">
        <span>{error}</span>
      </div>
    );
  }

  if (foods.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No active offers available
      </div>
    );
  }

  return (
    <div className="slider-container w-full rounded-lg overflow-hidden">

    {/* <div className="mb-10 max-w-4xl mx-auto relative"> */}
      <Slider {...settings}>
        {foods.map((food) => (
          <div key={food._id} className="relative">
            <img
              src={food.image}
              alt={food.food_name}
              className="w-full h-64 object-cover rounded-lg"
            />
            {food.offer && (
              <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded">
                <h3 className="font-bold text-lg">{food.offer.title}</h3>
                <p className="text-sm">{food.offer.discount}% off</p>
                <p className="text-xs">
                  Valid till: {new Date(food.offer.validity).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainCarousel;
