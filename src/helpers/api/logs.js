import axios from "../../config/axios";

export const getLogs = async () => await axios.get("/logs");
