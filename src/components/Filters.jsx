function Filters({
  categories,
  selectedCategory,
  selectedType,
  onCategoryChange,
  onTypeChange
}) {
  return (
    <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
      <div>
        <label style={{ fontSize: "14px", color: "#374151" }}>
          Category
        </label>

        <br />
        <select value={selectedCategory} onChange={onCategoryChange}>
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ fontSize: "14px", color: "#374151" }}>Type</label>
        <br />
        <select value={selectedType} onChange={onTypeChange}>
          <option value="all">All</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
