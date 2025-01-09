import axios from "axios";

export async function fetchTransactions(token, queryParams = {}) {
    const { startDate, endDate, limit, offset } = queryParams;
    const params = { startDate, endDate, limit, offset };
    const response = await axios.get("/users/me/transactions", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    });
    return response.data.transactions;
}

export async function createTransaction(token, transactionData) {
    const response = await axios.post("/users/me/transactions", transactionData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
