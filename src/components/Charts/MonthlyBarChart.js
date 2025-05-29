import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const months = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString("default", { month: "short" })
);

export default function MonthlyBarChart({ data }) {
  const monthlyData = months.map((month, i) => {
    const income = data
      .filter((t) => t.type === "income" && new Date(t.date).getMonth() === i)
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = data
      .filter((t) => t.type === "expense" && new Date(t.date).getMonth() === i)
      .reduce((sum, t) => sum + t.amount, 0);

    return { month, income, expense };
  });

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" />
          <Bar dataKey="expense" fill="#ff686b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
