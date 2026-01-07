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
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "32px"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "24px",
          borderRadius: "10px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
        }}
      >
        <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ margin: 0, fontSize: "24px" }}>
              Financial Activity Dashboard
            </h1>
            <p style={{ marginTop: "4px", color: "#6b7280" }}>
              Overview of transactions and spending patterns
            </p>
          </div>

          {loading && <p>Loading transactions...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <>
              <div style={{ marginBottom: "24px" }}>
                <SummaryCards transactions={filteredTransactions} />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <CategoryExpenseChart transactions={filteredTransactions} />

              </div>
              <div style={{ marginBottom: "24px" }}>

                <Filters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  selectedType={selectedType}
                  onCategoryChange={(e) => setSelectedCategory(e.target.value)}
                  onTypeChange={(e) => setSelectedType(e.target.value)}
                />
              </div>

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
      </div>
    </div>
  );
}

export default App;
