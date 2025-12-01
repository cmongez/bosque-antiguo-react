import axios from "axios";

export const URL_AUTH = "http://100.31.23.11:8082/api/v1"
const authApi = axios.create({
    baseURL: URL_AUTH,
});
export default authApi;