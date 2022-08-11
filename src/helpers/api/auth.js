import axios from "../../config/axios";
import { ApiUrl } from "../url";

export const loginUser = async (data) => await axios.post(`${ApiUrl}/login`, data);
