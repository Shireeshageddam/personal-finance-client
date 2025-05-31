import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const API_URL = process.env.REACT_APP_API_URL;

export default function AddTransaction({ onSuccess }) {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !amount || !date || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, amount: parseFloat(amount), type, date, category }),
      });

      if (!res.ok) throw new Error("Failed to add transaction");

      toast.success("Transaction added!");

      setTitle("");
      setAmount("");
      setType("income");
      setDate("");
      setCategory("");

      onSuccess?.();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="p-4 bg-gray-100 rounded-md mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
        <input className="border p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="border p-2" placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <input className="border p-2" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <select className="border p-2" value={type} onChange={e => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input className="border p-2" placeholder="Category (e.g., Food, Salary)" value={category} onChange={e => setCategory(e.target.value)} />
      </div>
      <button
        className="bg-blue-500 text-white px-3 py-2 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}