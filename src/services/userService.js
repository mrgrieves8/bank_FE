import axios from "axios";

export async function getUserProfile(token) {
    const response = await axios.get("/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function updateUserProfile(token, userData) {
    const response = await axios.put("/users/me", userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
