import axios from "../../config/axios";
import { ApiUrl } from "../url";

export const createProduct = async (data) =>
  await axios.post(`${ApiUrl}/product`, data);
