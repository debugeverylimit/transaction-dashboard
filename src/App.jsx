import { useEffect, useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Filters from "./components/Filters";
import SummaryCards from "./components/SummaryCards";
import CategoryExpenseChart from "./components/CategoryExpenseChart";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const activeFilters = [];

  if (selectedCategory !== "all") {
    activeFilters.push(`Category: ${selectedCategory}`);
  }

  if (selectedType !== "all") {
    activeFilters.push(`Type: ${selectedType}`);
  }

  const categories = [...new Set(transactions.map((tx) => tx.category))];

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/transactions.json");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const categoryMatch =
      selectedCategory === "all" || tx.category === selectedCategory;

    const typeMatch =
      selectedType === "all" || tx.type === selectedType;

    return categoryMatch && typeMatch;
  });

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>Financial Activity Dashboard</h1>

      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <SummaryCards transactions={filteredTransactions} />
          <CategoryExpenseChart transactions={filteredTransactions} />

          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            onCategoryChange={(e) => setSelectedCategory(e.target.value)}
            onTypeChange={(e) => setSelectedType(e.target.value)}
          />

          {activeFilters.length > 0 && (
            <div style={{ marginTop: "12px", color: "#555", fontSize: "14px" }}>
              <strong>Filters:</strong> {activeFilters.join(" · ")}
            </div>
          )}

          {filteredTransactions.length === 0 ? (
            <p style={{ marginTop: "16px", color: "#666" }}>
              No transactions match the selected filters.
            </p>
          ) : (
            <TransactionsTable transactions={filteredTransactions} />
          )}
        </>
      )}


    </div>
  );
}

export default App;
