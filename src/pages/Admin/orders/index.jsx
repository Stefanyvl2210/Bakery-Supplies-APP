import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";
import {
  approvePayment,
  confirmCash,
  getOrders,
  markCashPaid,
  rejectPayment,
  updateOrder,
} from "../../../helpers/api/orders";
import { getErrorMessage, getResourceCollection } from "../../../helpers/api/response";
import { formatDate, formatMoney, formatStatus } from "../../../helpers/formatters";
import SnackBar from "../../../components/Snackbar";
import Loader, { LoadingButtonContent } from "../../../components/Loader";

const columns = [
  { key: "id", name: "ID" },
  { key: "customer", name: "Customer" },
  { key: "order_status", name: "Order status" },
  { key: "payment_method", name: "Payment method" },
  { key: "payment_reference", name: "Reference" },
  { key: "payment_status", name: "Payment status" },
  { key: "total", name: "Total" },
  { key: "created_at", name: "Created at" },
  { key: "workflow", name: "Actions" },
];

const toDateTimeLocalValue = (date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

const getMinimumEstimatedDelivery = () =>
  toDateTimeLocalValue(new Date(Date.now() + 60000));

const AdminOrders = () => {
  const classes = useStyles();
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [actionLoading, setActionLoading] = React.useState(null);
  const [rejectingOrderId, setRejectingOrderId] = React.useState(null);
  const [rejectionReason, setRejectionReason] = React.useState("");
  const [shippingOrderId, setShippingOrderId] = React.useState(null);
  const [estimatedDelivery, setEstimatedDelivery] = React.useState("");
  const [estimatedDeliveryError, setEstimatedDeliveryError] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const loadOrders = React.useCallback(async (showLoader = true) => {
    if (showLoader) setLoading(true);

    try {
      const response = await getOrders();
      setOrders(getResourceCollection(response));
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load orders."),
        severity: "error",
      });
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  const handleAction = async (action, successMessage, actionKey) => {
    if (actionLoading) return;

    setActionLoading(actionKey);

    try {
      await action();
      setOpenSnack({ open: true, message: successMessage, severity: "success" });
      await loadOrders(false);
      return true;
    } catch (error) {
      setOpenSnack({ open: true, message: getErrorMessage(error), severity: "error" });
      return false;
    } finally {
      setActionLoading(null);
    }
  };

  const handleOpenRejectDialog = (orderId) => {
    setRejectingOrderId(orderId);
    setRejectionReason("");
  };

  const handleCloseRejectDialog = () => {
    if (actionLoading) return;

    setRejectingOrderId(null);
    setRejectionReason("");
  };

  const handleRejectPayment = async () => {
    const trimmedReason = rejectionReason.trim();

    if (rejectingOrderId === null || !trimmedReason) return;

    const succeeded = await handleAction(
      () => rejectPayment(rejectingOrderId, trimmedReason),
      "Payment rejected",
      `${rejectingOrderId}:reject`
    );

    if (succeeded) {
      setRejectingOrderId(null);
      setRejectionReason("");
    }
  };

  const handleOpenShippingDialog = (orderId) => {
    setShippingOrderId(orderId);
    setEstimatedDelivery("");
    setEstimatedDeliveryError("");
  };

  const handleCloseShippingDialog = () => {
    if (actionLoading) return;

    setShippingOrderId(null);
    setEstimatedDelivery("");
    setEstimatedDeliveryError("");
  };

  const handleShipOrder = async () => {
    const estimatedDate = new Date(estimatedDelivery);

    if (
      !estimatedDelivery ||
      Number.isNaN(estimatedDate.getTime()) ||
      estimatedDate.getTime() <= Date.now()
    ) {
      setEstimatedDeliveryError("Select a future date and time.");
      return;
    }

    setEstimatedDeliveryError("");
    const succeeded = await handleAction(
      () =>
        updateOrder(shippingOrderId, {
          status: "shipped",
          estimate_delivery: estimatedDate.toISOString(),
        }),
      "Order marked as shipped",
      `${shippingOrderId}:shipped`
    );

    if (succeeded) {
      setShippingOrderId(null);
      setEstimatedDelivery("");
    }
  };

  React.useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleCloseSnack = (_, reason) => {
    if (reason !== "clickaway") setOpenSnack((prev) => ({ ...prev, open: false }));
  };

  const rows = orders.map((order) => {
    const paymentType = order.payment?.method?.type;
    const paymentStatus = order.payment?.status;
    const isPendingConfirmation = order.status === "pending_confirmation";
    const canReviewTransfer =
      paymentType === "transfer" &&
      paymentStatus === "pending_review" &&
      isPendingConfirmation;
    const canReviewCash =
      paymentType === "cash" &&
      paymentStatus === "pending_cash" &&
      isPendingConfirmation;
    const canMarkCashPaid =
      paymentType === "cash" &&
      paymentStatus === "pending_cash" &&
      ["processing", "shipped", "ready_for_pickup", "delivered"].includes(
        order.status
      );
    const canMarkShipped =
      order.status === "processing" && order.delivery_type === "delivery";
    const canMarkReadyForPickup =
      order.status === "processing" && order.delivery_type === "pickup";
    const canMarkDelivered =
      ["shipped", "ready_for_pickup"].includes(order.status) &&
      paymentStatus === "paid";
    const customer = order.user
      ? `${order.user.first_name || ""} ${order.user.last_name || ""}`.trim()
      : order.guest?.name || "Guest";
    const orderStatus = formatStatus(order.status);
    const paymentMethod = order.payment?.method?.name || "-";
    const paymentReference = order.payment?.reference || "-";
    const paymentStatusLabel = formatStatus(paymentStatus);
    const total = formatMoney(order.total);
    const createdAt = formatDate(order.created_at);

    return {
      id: order.id,
      customer,
      order_status: orderStatus,
      payment_method: paymentMethod,
      payment_reference: paymentReference,
      payment_status: paymentStatusLabel,
      total,
      created_at: createdAt,
      _search: [
        order.id,
        customer,
        orderStatus,
        paymentMethod,
        paymentReference,
        paymentStatusLabel,
        total,
        createdAt,
      ]
        .join(" ")
        .toLowerCase(),
      workflow: (
        <div className={classes.workflow}>
          {canReviewTransfer && (
            <>
              <Button size="small" disabled={Boolean(actionLoading)} onClick={() => handleAction(() => approvePayment(order.id), "Payment approved", `${order.id}:approve`)}>{actionLoading === `${order.id}:approve` ? <LoadingButtonContent label="Approving…" /> : "Approve"}</Button>
              <Button size="small" color="error" className="reject-button" disabled={Boolean(actionLoading)} onClick={() => handleOpenRejectDialog(order.id)}>{actionLoading === `${order.id}:reject` ? <LoadingButtonContent label="Rejecting…" /> : "Reject"}</Button>
            </>
          )}
          {canReviewCash && (
            <>
              <Button size="small" disabled={Boolean(actionLoading)} onClick={() => handleAction(() => confirmCash(order.id), "Cash order approved", `${order.id}:approve`)}>{actionLoading === `${order.id}:approve` ? <LoadingButtonContent label="Approving…" /> : "Approve"}</Button>
              <Button size="small" color="error" className="reject-button" disabled={Boolean(actionLoading)} onClick={() => handleOpenRejectDialog(order.id)}>{actionLoading === `${order.id}:reject` ? <LoadingButtonContent label="Rejecting…" /> : "Reject"}</Button>
            </>
          )}
          {canMarkCashPaid && (
            <Button size="small" disabled={Boolean(actionLoading)} onClick={() => handleAction(() => markCashPaid(order.id), "Cash marked as paid", `${order.id}:paid`)}>{actionLoading === `${order.id}:paid` ? <LoadingButtonContent label="Saving…" /> : "Mark as paid"}</Button>
          )}
          {canMarkShipped && (
            <Button size="small" disabled={Boolean(actionLoading)} onClick={() => handleOpenShippingDialog(order.id)}>{actionLoading === `${order.id}:shipped` ? <LoadingButtonContent label="Saving…" /> : "Mark as shipped"}</Button>
          )}
          {canMarkReadyForPickup && (
            <Button size="small" disabled={Boolean(actionLoading)} onClick={() => handleAction(() => updateOrder(order.id, { status: "ready_for_pickup" }), "Order ready for pickup", `${order.id}:ready`)}>{actionLoading === `${order.id}:ready` ? <LoadingButtonContent label="Saving…" /> : "Ready for pickup"}</Button>
          )}
          {canMarkDelivered && (
            <Button size="small" disabled={Boolean(actionLoading)} onClick={() => handleAction(() => updateOrder(order.id, { status: "delivered" }), "Order marked as delivered", `${order.id}:delivered`)}>{actionLoading === `${order.id}:delivered` ? <LoadingButtonContent label="Saving…" /> : "Mark as delivered"}</Button>
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
      {loading ? (
        <Loader tone="admin" label="Loading orders…" minHeight={260} />
      ) : (
        <Table rows={filteredRows} columns={columns} />
      )}
      <Dialog
        open={rejectingOrderId !== null}
        onClose={handleCloseRejectDialog}
        aria-labelledby="reject-payment-title"
        className={classes.rejectDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="reject-payment-title"
          className={classes.rejectDialogTitle}
        >
          Reject payment
        </DialogTitle>
        <DialogContent className={classes.rejectDialogContent}>
          <label
            htmlFor="rejection-reason"
            className={classes.rejectReasonLabel}
          >
            Rejection reason <span aria-hidden="true">*</span>
          </label>
          <TextField
            id="rejection-reason"
            autoFocus
            fullWidth
            multiline
            minRows={3}
            required
            placeholder="Enter the rejection reason"
            value={rejectionReason}
            onChange={(event) => setRejectionReason(event.target.value)}
            helperText="A rejection reason is required."
            disabled={Boolean(actionLoading)}
            className={classes.rejectReasonField}
          />
        </DialogContent>
        <DialogActions className={classes.rejectDialogActions}>
          <Button
            size="small"
            onClick={handleCloseRejectDialog}
            disabled={Boolean(actionLoading)}
            className={classes.rejectDialogButton}
          >
            Cancel
          </Button>
          <Button
            size="small"
            onClick={handleRejectPayment}
            disabled={!rejectionReason.trim() || Boolean(actionLoading)}
            color="error"
            variant="contained"
            className={classes.rejectDialogButton}
          >
            {actionLoading === `${rejectingOrderId}:reject` ? (
              <LoadingButtonContent label="Rejecting…" />
            ) : (
              "Reject payment"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={shippingOrderId !== null}
        onClose={handleCloseShippingDialog}
        aria-labelledby="shipping-estimate-title"
      >
        <DialogTitle id="shipping-estimate-title">Estimated delivery</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="datetime-local"
            label="Estimated delivery"
            value={estimatedDelivery}
            onChange={(event) => {
              setEstimatedDelivery(event.target.value);
              if (estimatedDeliveryError) setEstimatedDeliveryError("");
            }}
            error={Boolean(estimatedDeliveryError)}
            helperText={estimatedDeliveryError || "Select a future date and time."}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: getMinimumEstimatedDelivery() }}
            sx={{ marginTop: 1, minWidth: 300 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShippingDialog} disabled={Boolean(actionLoading)}>
            Cancel
          </Button>
          <Button
            onClick={handleShipOrder}
            disabled={Boolean(actionLoading)}
            variant="contained"
          >
            {actionLoading === `${shippingOrderId}:shipped` ? (
              <LoadingButtonContent label="Saving…" />
            ) : (
              "Confirm shipment"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
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
  rejectDialog: {
    "& .MuiDialog-paper": {
      width: "calc(100% - 32px)",
      maxWidth: 480,
      margin: 16,
      borderRadius: 8,
    },
  },
  rejectDialogTitle: {
    padding: "20px 24px 8px !important",
    font: "600 20px/28px Open Sans !important",
  },
  rejectDialogContent: {
    padding: "12px 24px 8px !important",
    overflowY: "visible",
  },
  rejectReasonLabel: {
    display: "block",
    marginBottom: 6,
    color: "#333",
    font: "400 14px/20px Open Sans",
    "& span": {
      color: "#D32F2F",
    },
  },
  rejectReasonField: {
    width: "100% !important",
    minWidth: "0 !important",
    "& .MuiOutlinedInput-root": {
      width: "100% !important",
      maxWidth: "none !important",
      minHeight: 96,
      height: "auto !important",
      padding: "12px 14px !important",
      alignItems: "flex-start",
    },
    "& .MuiInputBase-inputMultiline": {
      padding: "0 !important",
      fontSize: "15px",
      lineHeight: "22px",
    },
    "& .MuiFormHelperText-root": {
      margin: "6px 0 0",
      fontSize: "13px",
      lineHeight: "18px",
    },
  },
  rejectDialogActions: {
    gap: 8,
    padding: "12px 24px 20px !important",
  },
  rejectDialogButton: {
    minWidth: "0 !important",
    height: "36px !important",
    margin: "0 !important",
    padding: "6px 14px !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
    textTransform: "none !important",
    boxShadow: "none !important",
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
      fontSize: "14px !important",
      lineHeight: "18px !important",
    },
    "& button.reject-button": {
      backgroundColor: "#D32F2F !important",
      "&:hover": {
        backgroundColor: "#B71C1C !important",
      },
    },
  },
}));

export default AdminOrders;
