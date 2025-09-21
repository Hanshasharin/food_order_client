import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_DOMAIN}/api/user/profile`,
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

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

  if (!user) {
    return (
      <div className="alert alert-warning shadow-lg w-fit mx-auto mt-6">
        <span>User data not available.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl mx-auto mt-10">
        <div className="card-body">
          <h2 className="card-title">User Profile</h2>

          {/* Basic Info */}
          <div className="space-y-2">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.status}</p>
          </div>

          {/* Personal Details */}
          {user.personal_details ? (
            <>
              <div className="divider">Personal Details</div>
              <div className="space-y-2">
                <p><strong>Full Name:</strong> {user.personal_details.fullName}</p>
                <p><strong>Address:</strong> {user.personal_details.address}</p>
                {user.personal_details.alternateAddress && (
                  <p><strong>Alternate Address:</strong> {user.personal_details.alternateAddress}</p>
                )}
                {user.personal_details.specialInstructions && (
                  <p><strong>Special Instructions:</strong> {user.personal_details.specialInstructions}</p>
                )}
              </div>
            </>
          ) : (
        
        <button className="btn btn-warning">
  <Link to="/peronalDetails" className="w-full h-full block">Add Personal Details</Link>
</button>
          
          )}

        
              <Link to="/my-order" className="btn btn-primary btn-sm mt-3">
                View All Orders
              </Link>
            
          <div className="mt-6">
            <button className="btn btn-error btn-sm">
              <Link to="/logout">Logout</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
