import axios from "axios"

const initializeAxios = () => {
    axios.defaults.baseURL = process.env.API_URL
    axios.defaults.headers.post["Content-Type"] = "application/json"
}

export default initializeAxios
