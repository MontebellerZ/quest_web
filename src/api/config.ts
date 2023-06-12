import { getDotenv } from "../config/dotenv";
import axios from "axios";

const VITE_BACKEND_URL = getDotenv("VITE_BACKEND_URL");
axios.defaults.baseURL = VITE_BACKEND_URL;

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
