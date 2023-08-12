import axios from "axios"
import Cookies from "js-cookie"

const JWT_TOKEN = Cookies.get("invoice-app-auth")

export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`,
    "Content-Type": "application/json",
  },
})
