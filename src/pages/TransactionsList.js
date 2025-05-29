import { useState, useEffect, useContext,useCallback} from "react";
import { AuthContext } from "../context/AuthContext";
import TransactionItem from "../components/TransactionItem";
import AddTransaction from "./AddTransaction";


export default function TransactionsList() {
  const { token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = useCallback(async () => {
    try{
    const res = await fetch("http://localhost:8080/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok)
        throw new Error("Failed to fetch transactions");
    const data = await res.json();
    setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  },[token]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/transactions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      
       

      <ul>
        {transactions.map(t => (
         <TransactionItem key={t.id} transaction={t} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}
