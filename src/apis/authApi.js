import axios from "axios";

export const URL_AUTH = "http://localhost:8080/api/v1"
const authApi = axios.create({
    baseURL: URL_AUTH,
});
export default authApi;