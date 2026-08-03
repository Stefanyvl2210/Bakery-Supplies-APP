import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";
import {
  approvePayment,
  confirmCash,
  getOrders,
  markCashPaid,
  rejectPayment,
} from "../../../helpers/api/orders";
import { getErrorMessage, getResourceCollection } from "../../../helpers/api/response";
import { formatDate, formatMoney, formatStatus } from "../../../helpers/formatters";
import SnackBar from "../../../components/Snackbar";

const columns = [
  { key: "id", name: "ID" },
  { key: "customer", name: "Customer" },
  { key: "status", name: "Status" },
  { key: "payment", name: "Payment" },
  { key: "total", name: "Total" },
  { key: "created_at", name: "Created at" },
  { key: "workflow", name: "Workflow" },
];

const AdminOrders = () => {
  const classes = useStyles();
  const [orders, setOrders] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const loadOrders = React.useCallback(async () => {
    try {
      const response = await getOrders();
      setOrders(getResourceCollection(response));
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load orders."),
        severity: "error",
      });
    }
  }, []);

  const handleAction = async (action, successMessage) => {
    try {
      await action();
      setOpenSnack({ open: true, message: successMessage, severity: "success" });
      await loadOrders();
    } catch (error) {
      setOpenSnack({ open: true, message: getErrorMessage(error), severity: "error" });
    }
  };

  const handleRejectPayment = async (orderId) => {
    const reason = window.prompt("Reject reason");
    const trimmedReason = reason?.trim();

    if (!trimmedReason) return;

    await handleAction(() => rejectPayment(orderId, trimmedReason), "Payment rejected");
  };

  React.useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleCloseSnack = (_, reason) => {
    if (reason !== "clickaway") setOpenSnack((prev) => ({ ...prev, open: false }));
  };

  const rows = orders.map((order) => {
    const customer = order.user
      ? `${order.user.first_name || ""} ${order.user.last_name || ""}`.trim()
      : order.guest?.name || "Guest";
    const status = formatStatus(order.status);
    const payment = `${order.payment?.method?.name || "-"} / ${formatStatus(order.payment?.status)}`;
    const total = formatMoney(order.total);
    const createdAt = formatDate(order.created_at);

    return {
      id: order.id,
      customer,
      status,
      payment,
      total,
      created_at: createdAt,
      _search: [order.id, customer, status, payment, total, createdAt]
        .join(" ")
        .toLowerCase(),
      workflow: (
        <div className={classes.workflow}>
          {order.payment?.method?.type === "transfer" && (
            <>
              <Button size="small" onClick={() => handleAction(() => approvePayment(order.id), "Payment approved")}>Approve</Button>
              <Button size="small" color="error" onClick={() => handleRejectPayment(order.id)}>Reject</Button>
            </>
          )}
          {order.payment?.method?.type === "cash" && (
            <>
              <Button size="small" onClick={() => handleAction(() => confirmCash(order.id), "Cash confirmed")}>Confirm cash</Button>
              <Button size="small" onClick={() => handleAction(() => markCashPaid(order.id), "Cash marked as paid")}>Paid</Button>
            </>
          )}
        </div>
      ),
    };
  });
  const filteredRows = search.trim()
    ? rows.filter((row) => row._search.includes(search.trim().toLowerCase()))
    : rows;

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.subContainer}>
        <div className={classes.titleWrapper}>
          <h1>Orders</h1>
        </div>
        <div>
          <TextField
            label="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            fullWidth
          />
        </div>
      </Grid>
      <Table rows={filteredRows} columns={columns} />
      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "1068px",
    margin: "0 auto",
  },
  titleWrapper: {
    "& h1": {
      font: "400 36px/20px Open Sans",
    },
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "32px",
  },
  workflow: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    flexWrap: "wrap",
    "& button": {
      margin: "0 !important",
      minWidth: "auto !important",
      height: "32px !important",
      backgroundColor: "#0978DE !important",
      color: "#fff !important",
    },
  },
}));

export default AdminOrders;
