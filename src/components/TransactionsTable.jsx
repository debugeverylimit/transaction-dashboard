function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


function TransactionsTable({ transactions }) {
    return (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "16px"
            }}
        >
            <thead>
                <tr>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Description</th>
                    <th style={thStyle}>Category</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Amount</th>
                </tr>
            </thead>

            <tbody>
                {transactions.map((tx) => (
                    <tr key={tx.id}>
                        <td style={tdStyle}>{formatDate(tx.date)}</td>
                        <td style={tdStyle}>{tx.description}</td>
                        <td style={tdStyle}>{tx.category}</td>
                        <td
                            style={{
                                ...tdStyle,
                                color: tx.type === "credit" ? "green" : "red",
                                fontWeight: 500,
                                textAlign: "right"
                            }}
                        >
                            {formatCurrency(tx.amount)}
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const thStyle = {
    textAlign: "left",
    padding: "8px",
    borderBottom: "1px solid #ddd"
};

const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #eee"
};

export default TransactionsTable;
