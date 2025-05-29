import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavigationBar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight">
          💸 FinTrack
        </div>
        <div className="flex items-center space-x-6">
        {token && (
          <>
            <Link to="/" className="hover:bg-blue-700 px-3 py-1 rounded transition">Home</Link>
            <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-1 rounded transition">Dashboard</Link>
            <Link to="/transactions" className="hover:bg-blue-700 px-3 py-1 rounded transition">Transactions</Link>
          </>
        )}
      </div>
      <div className="space-x-4" >
        {!token ? (
          <>
            <Link to="/login" className="bg-white text-blue-600 font-semibold px-4 py-1 rounded hover:bg-blue-100 transition">Login</Link>
            <Link to="/register" className="bg-white text-blue-600 font-semibold px-4 py-1 rounded hover:bg-blue-100 transition">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition">
            Logout
          </button>
        )}
      </div>
      </div>
    </nav>
  );
}
