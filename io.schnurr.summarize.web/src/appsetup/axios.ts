import axios from "axios"

const initializeAxios = () => {
    axios.defaults.baseURL = process.env.API_URL
    axios.defaults.headers.post["Content-Type"] = "application/json"

    if (process.env.NODE_ENV === "production") {
        // Currently only set inline - extract to separate key vault
        axios.defaults.headers.common["code"] = "<function_key>"
    }
}

export default initializeAxios
