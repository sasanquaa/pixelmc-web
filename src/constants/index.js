const urljoin = require("urljoin");

export const TOKEN = "token";
export const LANGUAGE = "language";
export const REQUEST_TIMEOUT = 10000;
export const isDev = process.env.NODE_ENV === "production";
export const API_URL = "https://pixelmc.vn/api";
export const API_PATHS = {
    TRANSACTION: urljoin(API_URL, "transactions"),
    CHARGE: urljoin("https://pixelmc.vn", "napthe", "submit")
};