import axios from "../../config/axios";
import { ApiUrl } from "../url";

export const getLogs = async () => await axios.get(`${ApiUrl}/logs`);
