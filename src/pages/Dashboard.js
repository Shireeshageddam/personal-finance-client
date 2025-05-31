
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import SummaryCard from "../components/SummaryCard";
import CategoryPieChart from "../components/Charts/CategoryPieChart";
import MonthlyBarChart from "../components/Charts/MonthlyBarChart";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;


export default function Dashboard() {
  const { token, logout,user } = useContext(AuthContext);
    const navigate = useNavigate();
  
   const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");

  const handleLogout = () => {
    logout();          // Clears token
    navigate("/login"); // Redirects user
  };

  useEffect(() => {
    if (!token) return;



    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${API_URL}/api/transactions`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch transactions");

        const data = await res.json();
        setTransactions(data);
        setError("");
      } catch (err) {
        toast.error(err.message);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;


  return (
    <div className="p-4 space-y-8">
       {loading ? (
        <p className="text-center text-gray-500">⏳ Loading your dashboard...</p>
      ) : (
        <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold mb-1">Welcome back,{user?.name || "User"}!</h1>
          <p className="text-sm text-gray-600">Here's your financial overview</p>
        </div>
      </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <SummaryCard title="Income" amount={totalIncome} color="border-green-500" />
        <SummaryCard title="Expenses" amount={totalExpense} color="border-red-500" />
        <SummaryCard title="Balance" amount={balance} color="border-blue-500" />
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-md font-semibold mb-2">Spending by Category</h3>
          <CategoryPieChart data={transactions} />
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="text-md font-semibold mb-2">Monthly Trends</h3>
          <MonthlyBarChart data={transactions} />
        </div>
      </div>
      </>
      )}
    </div>
  );
}
