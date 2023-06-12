import { getDotenv } from "./dotenv";

export const ERROR_UNKNOWN: string = getDotenv("VITE_ERROR_UNKNOWN");
export const ERROR_LOGIN_REQUIRED: string = getDotenv("VITE_ERROR_LOGIN_REQUIRED");
