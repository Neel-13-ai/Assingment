import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { FaUser } from "react-icons/fa";
import { ArrowRight, LockKeyhole, Mail, MoveRight, Sparkles, Split, User } from "lucide-react";

const AddAdmin = () => {
  const navigate = useNavigate();
  const { authorizationToken, user } = useAuth();

  // Redirect inside useEffect instead of returning inside render
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
  });

  const branches = [
    "COMPUTER_SCIENCE",
    "INFORMATION_TECHNOLOGY",
    "ELECTRICAL",
    "MECHANICAL",
    "CIVIL",
    "CHEMICAL",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit run...");

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/add-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("form data ", formData);

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
          branch: "",
        });
        navigate("/admin-list");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Failed to add admin");
    }
  };

  return (
    <>
      <p className="text-white h2 mb-5 text-center">
       Add Admin
      </p>

      <div className="a-container pb-3 ">
        <form onSubmit={handleSubmit} className="auth-form ">
        <div className="text-center h3 text-warning">Create New Admin</div>
          <div className="i-group ">
            <label htmlFor="name" className="text-white mb-2 ">
              <User size={20} className="ms-1" />
              <span className="ms-1">Name:</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Admin Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-secondary rounded-2    text-white"
            />
          </div>

          <div className="i-group">
            <label htmlFor="email" className="text-white mb-2">
              <Mail size={20} className="ms-1" />{" "}
              <span className="ms-1">Email:</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-secondary rounded-2   text-white"
            />
          </div>

          <div className="i-group">
            <label htmlFor="password" className="text-white mb-2">
              <LockKeyhole className="ms-1" size={20} />{" "}
              <span className="ms-1">Password:</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-secondary rounded-2    text-white"
            />
          </div>

          <div className="i-group">
            <label htmlFor="branch" className="text-white mb-2">
              <Split size={20} className="ms-1" />{" "}
              <span className="ms-1">Branch</span> :
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="border border-secondary rounded-2  text-white"
            >
              <option value="" disabled className="text-warning">
                Select Branch
              </option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div className="btn-div  text-center px-4">
            <button
              type="submit"
              className="b-tn p-2 fs-5 text-white w-100  rounded-3"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>

      <div className="rounded   tips ">
        <div className="d-flex ms-3 mt-3">
          {" "}
          <Sparkles className="text-warning mt-1" />{" "}
          <p className="ms-2 text-white fs-5">Tips</p>
        </div>
        <p className="text-white  px-3">
          <span><MoveRight size={20} className="m-2 text-warning"/></span>Please fill the details in the form to add a new admin. <br />
          <span><MoveRight size={20} className="m-2 text-warning"/></span>The admin will receive an email containing their login credentials{" "}
          <span className="text-warning "> (email and password) </span> to access
          the system.
        </p>
      </div>
    </>
  );
};

export default AddAdmin;
