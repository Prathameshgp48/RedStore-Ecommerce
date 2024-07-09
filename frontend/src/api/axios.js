import axios from "axios";
import { toast } from 'react-toastify'
import Cookies from "js-cookie"
import ServerUrl from "../constant";

const timeout = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay))
}

const api = axios.create({
    baseURL: ServerUrl
})

api.interceptors.request.use(async (req) => {
    const accessToken = Cookies.get("accessToken")
    // const refreshToken = Cookies.get("refreshToken")
    const authRequiredRoutes = [
        "/api/v1/users/addtocart",
        "/api/v1/users/viewcart",
        // "/api/v1/users/checkout"
    ]

    if (authRequiredRoutes.includes(req.url)) {
        if (accessToken) {
            req.headers.Authorization = `Bearer ${accessToken}`
        }
    }

    return req
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response?.status >= 400) {
            const refreshToken = Cookies.get("refreshToken")
            if (refreshToken) {
                try {
                    const response = await api.post("/api/v1/refreshtoken", refreshToken)
                    const newAccessToken = response.data.accesToken;
                    Cookies.set("accessToken", newAccessToken)
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`
                    return api(error.config)
                } catch (error) {
                    Cookies.remove("accesToken")
                    Cookies.remove("refreshToken")
                    toast.error("Please Login Again")
                    await timeout(2000);
                    window.location.href = "/login"
                }
            }
        }
        else {
            Cookies.remove("accessToken")
            toast.error("Please login Again! Session Expired!")
            await timeout(2000)
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

class Api {
    static async registerUser(data) {
        return await api.post("/api/v1/users/register", data)
    }

    static async loginUser(data) {
        return await api.post("/api/v1/users/login", data)
    }

    static async getAllProducts() {
        return await api.get("/api/v1/products")
    }

    static async addToCart(data) {
        return await api.post("/api/v1/users/addtocart", data)
    }
}

export default Api