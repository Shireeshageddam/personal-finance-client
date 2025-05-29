import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();

  const handleLogin = async () => {
    try{
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

     const contentType = res.headers.get("content-type");

     if (res.ok) {
      const data = await res.json();
      console.log("Token received:", data.token); 
      login(data.token); // Store token in context or localStorage
       navigate("/dashboard");
    } else {
      let errorMessage = "Login failed";
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        errorMessage = errorData.error || JSON.stringify(errorData);
      } else {
        errorMessage = await res.text(); // handle plain text fallback
      }
      alert(errorMessage);
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
       placeholder="Email" className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
       
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className= "border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />

      <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>

      <p className="text-sm text-center mt-4 text-gray-600">
  Don't have an account? {" "}<Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
</p>
    </div>
    </div>

    

  );
}
