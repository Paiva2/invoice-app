import axios from "axios"
import Cookies from "js-cookie"

const JWT_TOKEN = Cookies.get("invoice-app-auth")

export const api = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `${JWT_TOKEN}`,
    "Content-Type": "application/json",
  },
})
