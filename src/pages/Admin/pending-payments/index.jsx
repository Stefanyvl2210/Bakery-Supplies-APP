import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";
import {
  approvePayment,
  confirmCash,
  getOrders,
  rejectPayment,
} from "../../../helpers/api/orders";
import { getErrorMessage, getResourceCollection } from "../../../helpers/api/response";
import {
  formatDateTime,
  formatMoney,
  formatStatus,
} from "../../../helpers/formatters";
import SnackBar from "../../../components/Snackbar";

const columns = [
  { key: "id", name: "Order" },
  { key: "customer", name: "Customer" },
  { key: "method", name: "Method" },
  { key: "status", name: "Payment status" },
  { key: "amount", name: "Amount" },
  { key: "expires_at", name: "Expires at" },
  { key: "workflow", name: "Actions" },
];

const PendingPayments = () => {
  const classes = useStyles();
  const [orders, setOrders] = React.useState([]);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const loadPendingPayments = React.useCallback(async () => {
    try {
      const response = await getOrders({ status: "pending_confirmation" });
      const data = getResourceCollection(response);

      setOrders(
        data.filter((order) =>
          ["pending_review", "pending_cash"].includes(order.payment?.status)
        )
      );
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load pending payments."),
        severity: "error",
      });
    }
  }, []);

  React.useEffect(() => {
    loadPendingPayments();
  }, [loadPendingPayments]);

  const handleAction = async (action, successMessage) => {
    try {
      await action();
      setOpenSnack({ open: true, message: successMessage, severity: "success" });
      await loadPendingPayments();
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

  const rows = orders.map((order) => {
    const payment = order.payment || {};
    const method = payment.method || {};
    const customer = order.user
      ? `${order.user.first_name || ""} ${order.user.last_name || ""}`.trim()
      : order.guest?.name || "Guest";

    return {
      id: order.id,
      customer,
      method: method.name || "-",
      status: formatStatus(payment.status),
      amount: formatMoney(payment.expected_amount, payment.currency || "USD"),
      expires_at: formatDateTime(order.reservation_expires_at),
      workflow: (
        <div className={classes.workflow}>
          {method.type === "transfer" && (
            <>
              <Button size="small" onClick={() => handleAction(() => approvePayment(order.id), "Payment approved")}>Approve</Button>
              <Button size="small" color="error" onClick={() => handleRejectPayment(order.id)}>Reject</Button>
            </>
          )}
          {method.type === "cash" && (
            <Button size="small" onClick={() => handleAction(() => confirmCash(order.id), "Cash confirmed")}>Confirm</Button>
          )}
        </div>
      ),
    };
  });

  const handleCloseSnack = (_, reason) => {
    if (reason !== "clickaway") setOpenSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <h1>Pending payments</h1>
      </div>

      <Table rows={rows} columns={columns} />

      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 32,

    "& h1": {
      font: "400 36px/20px Open Sans",
    },
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

export default PendingPayments;
