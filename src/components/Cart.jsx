import React from "react";

const Cart = ({ cart, foodItems, getDiscountedPrice, handlePlaceOrder }) => {
  const grandTotal = Object.keys(cart).reduce((acc, foodId) => {
    const food = foodItems.find(f => f._id === foodId);
    if (!food) return acc;
    const { quantity, couponCode } = cart[foodId];
    return acc + getDiscountedPrice(food, couponCode) * quantity;
  }, 0);

  return (
    <div className="mt-6 p-4 bg-base-200 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Your Cart</h3>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-2">
            {Object.keys(cart).map(foodId => {
              const food = foodItems.find(f => f._id === foodId);
              const { quantity, couponCode } = cart[foodId];
              const discountedPrice = getDiscountedPrice(food, couponCode);

              return (
                <div key={foodId} className="flex justify-between">
                  <span>
                    {food.food_name} x {quantity} {couponCode && `(Code: ${couponCode})`}
                  </span>
                  <span>₹{discountedPrice * quantity}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Grand Total:</span>
            <span>₹{grandTotal}</span>
          </div>

          <button
            className="btn btn-lg btn-primary mt-4 w-full"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
