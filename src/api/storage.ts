import { User } from "../types";

const STOREKEY_USER = "userLogin";
const STOREKEY_TOKEN = "userToken";
const STOREKEY_EXPIRATION = "userTokenExpiration";

export function SaveToken(token: string, expiration: string) {
    localStorage.setItem(STOREKEY_TOKEN, token);
    localStorage.setItem(STOREKEY_EXPIRATION, expiration);
}

export function SaveUser(user: User) {
    localStorage.setItem(STOREKEY_USER, JSON.stringify(user));
}

export function GetUser() {
    const user = localStorage.getItem(STOREKEY_USER);
    if (!user) throw "User not found!";
    return JSON.parse(user);
}
