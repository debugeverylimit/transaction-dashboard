import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function CategoryExpenseChart({ transactions }) {
  // Only consider debit transactions
  const expenseData = transactions
    .filter((tx) => tx.type === "debit")
    .reduce((acc, tx) => {
      const existing = acc.find((item) => item.category === tx.category);

      if (existing) {
        existing.amount += Math.abs(tx.amount);
      } else {
        acc.push({
          category: tx.category,
          amount: Math.abs(tx.amount)
        });
      }

      return acc;
    }, []).sort((a, b) => b.amount - a.amount);

  if (expenseData.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: "24px", height: "300px" }}>
      <h3 style={{ marginBottom: "8px" }}>Expenses by Category</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={expenseData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#475569" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryExpenseChart;
