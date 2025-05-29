export default function TransactionItem({ transaction, onDelete }) {
  const isExpense = transaction.type === "expense";
  
  return (
    <li className="flex justify-between items-center border-b py-3 px-2 bg-white hover:bg-gray-50 rounded transition">
      <div className="flex flex-col">
         <div className="flex items-center gap-2">
        <span className="font-semibold text-lg text-gray-800">{transaction.title}</span> - {transaction.amount} ({transaction.type})
        <span className={`text-sm px-2 py-0.5 rounded-full ${
              isExpense ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{transaction.date}</span>
      </div>
       <span className="text-gray-600 text-sm">₹{transaction.amount}</span>
        <span className="text-xs text-gray-400 mt-0.5">{transaction.date}</span>
        {transaction.category && (
          <span className="text-xs text-indigo-500 mt-0.5">Category: {transaction.category}</span>
        )}
      </div>
      <button
        className="text-red-500 hover:text-red-700 text-sm font-medium transition"
        onClick={() => onDelete(transaction.id)}
      >
        Delete
      </button>
    </li>
  );
}
