import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cart from "../components/Cart";
import { loadStripe } from "@stripe/stripe-js";

const HotelDetail = () => {
  const { hotelId } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState({}); // foodId -> { quantity, couponCode }

  useEffect(() => {
    if (!hotelId) return;

    setLoading(true);
    setError("");

    axios
      .get(`${import.meta.env.VITE_API_DOMAIN}/api/hotel/food-list/${hotelId}`, { withCredentials: true })
      .then((res) => setFoodItems(res.data.foodItems || []))
      .catch((err) => {
        console.error("Error fetching food items", err);
        setError("Failed to fetch food items.");
      })
      .finally(() => setLoading(false));
  }, [hotelId]);

  const handleQuantityChange = (foodId, value) => {
    setCart((prev) => ({
      ...prev,
      [foodId]: {
        ...prev[foodId],
        quantity: Number(value),
      },
    }));
  };

  const handleCouponChange = (foodId, value) => {
    setCart((prev) => ({
      ...prev,
      [foodId]: {
        ...prev[foodId],
        couponCode: value,
      },
    }));
  };

  const handleAddToCart = (foodId) => {
    setCart((prev) => ({
      ...prev,
      [foodId]: {
        quantity: prev[foodId]?.quantity || 1,
        couponCode: prev[foodId]?.couponCode || "",
      },
    }));
  };

  const getDiscountedPrice = (food, couponCode) => {
    if (
      food.offer &&
      couponCode &&
      food.offer.code === couponCode &&
      food.offer.status === "active" &&
      new Date(food.offer.validity) >= new Date()
      
    ) {
      return Math.round(food.price * (1 - food.offer.discount / 100));

      // food.offer.discountType === "percentage"
      //   ? Math.round(food.price * (1 - food.offer.discount / 100))
      //   : Math.max(food.price - food.offer.discount, 0);
    }
    return food.price;
  };

  const grandTotal = Object.keys(cart).reduce((acc, foodId) => {
    const food = foodItems.find((f) => f._id === foodId);
    if (!food) return acc;
    const { quantity, couponCode } = cart[foodId];
    return acc + getDiscountedPrice(food, couponCode) * quantity;
  }, 0);

  

  const handlePlaceOrder = async () => {
  const items = Object.keys(cart).map((foodId) => ({
    foodItem: foodId,
    quantity: cart[foodId].quantity,
    couponCode: cart[foodId].couponCode || "",
  }));

  if (items.length === 0) {
    alert("Please select at least one food item");
    return;
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_DOMAIN}/api/user/order`,
      { hotelID: hotelId, items },
      { withCredentials: true }
    );

    // Redirect to Stripe checkout
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    window.location.href = res.data.url;
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "❌ Failed to place order");
  }
};

  if (loading) return (
    <div className="flex justify-center mt-20">
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  );

  if (error) return (
    <div className="alert alert-error shadow-lg w-fit mx-auto mt-10">
      <span>{error}</span>
    </div>
  );

  if (foodItems.length === 0) return (
    <div className="hero mt-10 bg-base-200 rounded-lg">
      <div className="hero-content text-center">
        <h2 className="text-2xl font-bold text-gray-700">No food items found</h2>
        <p className="py-2 text-gray-500">Try adding some items to this hotel.</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>

      <div className="space-y-6">
        {foodItems.map((food) => {
          const cartItem = cart[food._id] || {};
          const quantity = cartItem.quantity || 0;
          const discountedPrice = getDiscountedPrice(food, cartItem.couponCode);

          return (
            <div key={food._id} className="flex justify-between items-start gap-4 border-b pb-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{food.food_name}</h3>
                <p className="text-sm text-gray-500">{food.food_description}</p>
                {discountedPrice < food.price && (
                  <p className="text-gray-500 line-through">₹{food.price}</p>
                )}
                <p className={`mt-1 font-medium ${discountedPrice < food.price ? "text-green-600" : ""}`}>
                  ₹{discountedPrice} 
                </p>


                <p className="text-sm text-green-600 mt-1">
  {food.offer ? `${food.offer.title} - ${food.offer.discount}% off` : "No active offers"}
</p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity || 1}
                    onChange={(e) => handleQuantityChange(food._id, e.target.value)}
                    className="input input-bordered input-sm w-20"
                  />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={cartItem.couponCode || ""}
                    onChange={(e) => handleCouponChange(food._id, e.target.value)}
                    className="input input-bordered input-sm w-32"
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAddToCart(food._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="w-32 h-28 flex-shrink-0">
                <img
                  src={food.image}
                  alt={food.food_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          );
        })}
      </div>

     
      <Cart
  cart={cart}
  foodItems={foodItems}
  getDiscountedPrice={getDiscountedPrice}
  handlePlaceOrder={handlePlaceOrder}
/>

    </div>
  );
};

export default HotelDetail;


