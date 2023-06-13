import { getDotenv } from "./dotenv";

export const ERROR_UNKNOWN: string = getDotenv("VITE_ERROR_UNKNOWN");
export const ERROR_LOGIN_REQUIRED: string = getDotenv("VITE_ERROR_LOGIN_REQUIRED");
export const ERROR_REGISTER_REQUIRED: string = getDotenv("VITE_ERROR_REGISTER_REQUIRED");
export const ERROR_PASSWORD_EQUAL: string = getDotenv("VITE_ERROR_PASSWORD_EQUAL");
