function SummaryCards({ transactions }) {
  const totalIncome = transactions
    .filter((tx) => tx.type === "credit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === "debit")
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginTop: "16px",
        flexWrap: "wrap"
      }}
    >
      <Card title="Income" value={totalIncome} color="green" />
      <Card title="Expenses" value={totalExpenses} color="red" />
      <Card title="Net Balance" value={netBalance} color="#333" />
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        padding: "16px",
        minWidth: "160px",
        border: "1px solid #ddd",
        borderRadius: "6px"
      }}
    >
      <p style={{ margin: 0, fontSize: "14px" }}>{title}</p>
      <h3 style={{ margin: "8px 0", color }}>{value}</h3>
    </div>
  );
}

export default SummaryCards;
