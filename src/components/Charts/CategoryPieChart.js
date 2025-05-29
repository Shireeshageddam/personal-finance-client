import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#4B4453"];

export default function CategoryPieChart({ data }) {
  const categoryData = Object.values(
    data.reduce((acc, curr) => {
      if (curr.type === "expense") {
         const categoryName = curr.category && curr.category.trim() !== "" ? curr.category : "Uncategorized";
        acc[categoryName] = acc[categoryName] || { name: categoryName, value: 0 };
        acc[categoryName].value += curr.amount;
      }
      return acc;
    }, {})
  );

  console.log("categoryData:", categoryData);


  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {categoryData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
