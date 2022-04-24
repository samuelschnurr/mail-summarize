import axios from "axios"

const initializeAxios = () => {
    axios.defaults.baseURL = process.env.API_URL
    axios.defaults.headers.post["Content-Type"] = "application/json"

    if (process.env.NODE_ENV === "production") {
        // Accessing key vault is not available from clientside in the browser.
        // Also CORS is not available in key vault from client side.
        // So the function key is set here directly.
        axios.defaults.headers.common["code"] = "<function_key>"
    }
}

export default initializeAxios
