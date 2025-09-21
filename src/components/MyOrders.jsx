import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" }); // ✅ toast state

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_DOMAIN}/api/user/my-order`,
        { withCredentials: true }
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Failed to fetch orders", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/api/user/cancel/${orderId}`,
        {},
        { withCredentials: true }
      );
      setToast({ message: "Order canceled successfully!", type: "success" });
      fetchOrders();
    } catch (err) {
      setToast({ message: err.response?.data?.message || "Cancel failed", type: "error" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {/* Toast */}
      {toast.message && (
        <div className={`toast toast-top toast-end z-50`}>
          <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-lg`}>
            <span>{toast.message}</span>
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => setToast({ message: "", type: "" })}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : orders.length === 0 ? (
        <div className="alert alert-info mt-4">
          <span>No orders found.</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Placed On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-6)}</td>
                  <td>
                    <ul className="text-sm">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.foodItem?.food_name || "Unknown"} × {item.quantity}
                          {item.couponCode ? ` (Coupon: ${item.couponCode})` : ""}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{order.total}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "pending"
                          ? "badge-warning"
                          : order.status === "success"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
