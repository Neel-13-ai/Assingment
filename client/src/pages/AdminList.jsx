import React, { useState } from "react";
import { useAdmin } from "../store/adminStore";
import { useAuth } from "../store/authStore";
import { Delete, DeleteIcon, Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminList = () => {
  const { admins, loading, error, deleteAdmin, updateAdmin } = useAdmin();
  const { userState } = useAuth();

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", branch: "" });
  const [showForm, setShowForm] = useState(false);

  const navigate =  useNavigate();

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setFormData({ ...admin });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAdmin) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/update-admin/${selectedAdmin.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            role: selectedAdmin.role,
            user: userState,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to update admin");

      alert("Admin updated successfully!");
      
      setShowForm(false);
      setSelectedAdmin(null);
    } catch (error) {
      console.error("Update failed:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedAdmin(null);
  };

  if (loading) return <p>Loading admin data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="admin-container">
      <h1 className="ti">Admins List</h1>
      <div className="bg-primary border border-black rounded-2 mb-3 ms-2 btn" onClick={() =>navigate("/add-admin")}><span className="text-white"><Plus className="me-1"/>Add Admin</span></div>
    
      <table className="table-dark table-hover">
        <thead>
          <tr>
            <th className="text-center">Sr No</th>
            <th className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Branch</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td className="text-white">{index + 1}</td>
              <td className="text-white">{admin.name}</td>
              <td className="text-white">{admin.email}</td>
              <td className="text-white">{admin.branch || "N/A"}</td>
              <td id="action" className="d-flex justify-content-center">
                <button className="bg-transparent" onClick={() => handleEditClick(admin)}><Edit className="text-info" size={20}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Admin Update Form */}
      {selectedAdmin && (
        <div className="change-password-container">
          <h2 className="heading">Update Admin</h2>
          <div className="in-grp">
            <input
              type="text"
              name="name"
              placeholder="Admin Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="branch"
              placeholder="Admin Branch"
              value={formData.branch}
              onChange={handleInputChange}
            />
          </div>
          <div className="up-pass">
            <button onClick={handleCancel} className="update-btn">
              Cancel
            </button>
            <button onClick={handleUpdateSubmit} className="update-btn">
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
