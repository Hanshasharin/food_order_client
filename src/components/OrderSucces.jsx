// import React from "react";
// import { useSearchParams, Link } from "react-router-dom";

// const OrderSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
//       <div className="bg-white shadow-lg rounded-lg p-8 text-center">
//         <h1 className="text-3xl font-bold text-green-600 mb-4">
//           🎉 Payment Successful!
//         </h1>
//         <p className="text-gray-700 mb-2">
//           Thank you for your order.
//         </p>
//         {sessionId && (
//           <p className="text-sm text-gray-500 mb-4">
//             Stripe Session ID: <span className="font-mono">{sessionId}</span>
//           </p>
//         )}

//         <Link to="/profile" className="btn btn-primary">
//           Go to Profile / Orders
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found.");
      setLoading(false);
      return;
    }

console.log("sessionId from URL:", sessionId);

    const finalizeOrder = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}/api/user/complete`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to finalize order");
        }

        setOrder(data.order);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to finalize order");
      } finally {
        setLoading(false);
        // Redirect after 5 seconds
        setTimeout(() => navigate("/profile"), 5000);
      }
    };

    finalizeOrder();
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4">Finalizing your order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="alert alert-error shadow-lg">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your order. You will be redirected to your profile shortly.
        </p>

        {order && (
          <div className="text-left">
            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Hotel:</strong> {order.hotel?.name || "Unknown"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  order.status === "pending" ? "badge-warning" : "badge-success"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>
            <div className="mt-2">
              <p className="font-semibold">Items:</p>
              <ul className="list-disc ml-6">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.foodItem?.food_name || "Unknown Food"} x {item.quantity}{" "}
                    {item.couponCode ? `(Coupon: ${item.couponCode})` : ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
