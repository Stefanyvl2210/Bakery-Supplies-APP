import React from "react";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAdminStats } from "../../../helpers/api/adminStats";
import { getErrorMessage, getResourceData } from "../../../helpers/api/response";
import { formatMoney } from "../../../helpers/formatters";
import Loader from "../../../components/Loader";

const AdminHome = () => {
  const classes = useStyles();
  const [stats, setStats] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getAdminStats();
        setStats(getResourceData(response));
      } catch (error) {
        setMessage(getErrorMessage(error, "Unable to load admin stats."));
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const ordersByStatus = stats.orders_by_status ?? {};
  const ordersTotal = Object.values(ordersByStatus).reduce(
    (total, count) => total + (Number(count) || 0),
    0
  );
  const revenue = stats.revenue ?? stats.revenue_this_month_usd ?? 0;

  const cards = [
    ["Orders", stats.orders_count ?? stats.orders ?? ordersTotal],
    [
      "Pending orders",
      stats.pending_orders_count ??
        stats.pending_orders ??
        ordersByStatus.pending_confirmation ??
        0,
    ],
    ["Products", stats.products_count ?? stats.products ?? stats.active_products ?? 0],
    ["Customers", stats.customers_count ?? stats.customers ?? 0],
    ["Revenue", formatMoney(revenue)],
  ];

  return (
    <div className={classes.container}>
      <h1>Dashboard</h1>
      {!loading && message && <p>{message}</p>}
      {loading ? (
        <Loader tone="admin" label="Loading dashboard…" minHeight={260} />
      ) : (
      <Grid container>
        <Grid container spacing={3}>
          {cards.map(([label, value]) => (
            <Grid item xs={12} md={4} key={label}>
              <Paper className={classes.card}>
                <h2>{value}</h2>
                <p>{label}</p>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    margin: "0 auto",
    "& h1": {
      font: "400 36px/20px Open Sans",
      marginBottom: 32,
    },
  },
  card: {
    backgroundColor: "#F5EEE6 !important",
    padding: "30px",
    boxShadow: "unset !important",
    "& h2": {
      font: "400 36px/36px Poiret One",
      margin: 0,
    },
    "& p": {
      margin: "10px 0 0",
      font: "300 18px Open Sans",
    },
  },
}));

export default AdminHome;
