import axios from "../../config/axios";

export const getAdminStats = async () => await axios.get("/admin/stats");
