export default function SummaryCard({ title, amount, color }) {
  return (
    <div className={`p-4 rounded-xl shadow-md bg-white border-l-4 ${color}`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <h2 className="text-xl font-bold text-gray-800">
        ₹{amount.toLocaleString()}
      </h2>
    </div>
  );
}
