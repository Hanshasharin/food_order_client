import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [updatingRoleId, setUpdatingRoleId] = useState(null);
  const [roleUpdates, setRoleUpdates] = useState({});

  const fetchUsers = async (role = "") => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `${import.meta.env.VITE_API_DOMAIN}/api/admin/user-list`,
        { withCredentials: true }
      );
      setUsers(res.data.users);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(roleFilter);
  }, [roleFilter]);

  const handleToggleStatus = async (userId) => {
    try {
      setUpdatingStatus(userId);
    //   await axios.get(
    //     `${import.meta.env.VITE_API_DOMAIN}/api/admin/update-status`,{},
    //     { withCredentials: true }
    //   );
      await axios.put(
  `${import.meta.env.VITE_API_DOMAIN}/api/admin/update-status`,
  { userID: userId },
  { withCredentials: true }
);

      fetchUsers(roleFilter);
    } catch (err) {
      console.error("Error toggling status:", err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setRoleUpdates({ ...roleUpdates, [userId]: newRole });
  };

  const handleSaveRole = async (userId) => {
    try {
      setUpdatingRoleId(userId);
      await axios.put(
        `${import.meta.env.VITE_API_DOMAIN}/api/admin/update-role`,
        {
          userID: userId,
          userRole: roleUpdates[userId],
        },
        { withCredentials: true }
      );
      fetchUsers(roleFilter);
    } catch (err) {
      console.error("Error updating role:", err);
    } finally {
      setUpdatingRoleId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      {/* Role Filter */}
      <div className="mb-4 flex justify-end">
        <select
          className="select select-bordered w-52"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="hotel_owner">Hotel Owner</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isUpdatingRole = updatingRoleId === user._id;
                return (
                  <tr key={user._id}>
                    <td>
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={user.profile_pic} alt="Profile" />
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <select
                          className="select select-sm select-bordered"
                          value={roleUpdates[user._id] || user.role}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                        >
                          <option value="admin">Admin</option>
                          <option value="hotel_owner">Hotel Owner</option>
                          <option value="user">User</option>
                        </select>
                        <button
                          onClick={() => handleSaveRole(user._id)}
                          className="btn btn-sm btn-outline btn-success"
                          disabled={isUpdatingRole}
                        >
                          {isUpdatingRole ? (
                            <span className="loading loading-spinner loading-sm" />
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(user._id)}
                        className="btn btn-sm btn-outline"
                        disabled={updatingStatus === user._id}
                      >
                        {updatingStatus === user._id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          user.status === "active" ? "Deactivate" : "Activate"
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
