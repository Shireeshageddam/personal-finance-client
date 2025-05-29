import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.text();
    if (res.ok) {
      alert("Registered successfully. Please login.");
    } else {
      alert(data);
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>

      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className= "border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400" />

      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400" />

      <button onClick={handleRegister} className= "w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Register</button>

      <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
        </div>
    </div>
  );
}
