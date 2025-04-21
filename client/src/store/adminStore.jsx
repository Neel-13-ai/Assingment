import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../store/authStore";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { authorizationToken } = useAuth();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/auth/user-list", {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch admins");

      const data = await response.json();
      setAdmins(data.admins);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authorizationToken) {
      fetchAdmins();
    }
  }, [authorizationToken]);

  return (
    <AdminContext.Provider value={{ admins, fetchAdmins, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
