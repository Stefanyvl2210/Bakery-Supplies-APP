import React from "react";

// components
import Table from "../../components/table";
import ResumeTable from "../../components/ResumeTable";

// material ui components
import { Grid, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrder, getGuestOrder } from "../../helpers/api/orders";
import { getErrorMessage, getResourceData } from "../../helpers/api/response";
import { formatDate } from "../../helpers/formatters";

const columns = [
  { name: "Product", key: "product" },
  { name: "Unit price", key: "unitPrice" },
  { name: "Quantity", key: "quantity" },
  { name: "Subtotal", key: "subtotal" },
];

const productsToRows = (products = []) =>
  products.map((product) => ({
    product: product.name,
    unitPrice: product.ordered_unit_price ?? product.unit_price ?? product.price,
    quantity: product.ordered_quantity ?? product.pivot?.quantity ?? product.quantity,
    subtotal:
      Number(product.ordered_unit_price ?? product.unit_price ?? product.price ?? 0) *
      Number(product.ordered_quantity ?? product.pivot?.quantity ?? product.quantity ?? 0),
  }));

const OrderDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [order, setOrder] = React.useState(state?.order || null);
  const [message, setMessage] = React.useState("");
  const trackingToken = state?.trackingToken;

  React.useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!order?.id && !trackingToken) return;

        const response = trackingToken
          ? await getGuestOrder(trackingToken)
          : await getOrder(order.id);

        setOrder(getResourceData(response));
      } catch (error) {
        setMessage(getErrorMessage(error, "Unable to load order detail."));
      }
    };

    loadOrder();
  }, [order?.id, trackingToken]);

  const rows = productsToRows(order?.products || []);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <h2 className={classes.title}>Order detail</h2>
        {message && <p className={classes.orderMeta}>{message}</p>}
      </Grid>

      <Grid item xs={12} display="flex" justifyContent="center" sx={{marginTop: "5px !important"}}>
        <Grid container justifyContent="space-between" maxWidth={620} sx={{ margin: "0 auto" }}>
          <Grid item xs={12} md={6}>
            <Typography sx={{fontSize: "20px !important", fontWeight: "300 !important"}}>Order #{order?.id || "-"}</Typography>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
            <Typography sx={{fontSize: "20px !important", fontWeight: "300 !important"}}>Order Date: {formatDate(order?.created_at)}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} display="flex" justifyContent="center" className={classes.table} sx={{marginTop: "15px !important"}}>
        <ResumeTable orderDetails={order || {}} maxWidth={600} />
      </Grid>

      <Grid item xs={12} display="flex" justifyContent="center" className={classes.table}>
        <Table rows={rows} columns={columns} maxWidth={600} />
      </Grid>

      {trackingToken && (
        <Grid item xs={12}>
          <div className={classes.orderMeta}>
            <p>Tracking token: {trackingToken}</p>
          </div>
        </Grid>
      )}

      <Grid item xs={12} container justifyContent="center">
        {state?.ordersView && (
          <Button color="primary" variant="contained" className={classes.button} onClick={() => navigate('/orders')}>
            Back
          </Button>
        )}
        <Button color="primary" variant="contained" className={classes.button} onClick={() => navigate('/')}>
          Home
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1140,
    margin: "60px auto !important",
    [theme.breakpoints.down('md')]: {
      margin: "140px auto !important",
      padding: "0 50px !important",
    },
    [theme.breakpoints.down('sm')]: {
      padding: "0 36px !important",
    },
  },
  title: {
    textAlign: "center",
    fontFamily: 'Poiret One',
    fontSize: '40px !important',
    lineHeight: '20px !important',
    marginTop: "0 !important",
    fontWeight: "300"
  },
  table: {
    marginTop: "45px !important",
    borderRadius: "4px !important",
    minWidth: 0,
    "& table": {
      minWidth: 0,
      tableLayout: "fixed",
      width: "100%",
    },
    "& th, & td": {
      overflowWrap: "anywhere",
      wordBreak: "break-word",
      whiteSpace: "normal",
    },
    "& thead th": {
      backgroundColor: "#F5EEE6",
      borderBottom: "1px solid #AAAAAA !important",
      fontSize: "16px",
      fontWeight: "400",
      padding: "10px 25px"
    },
    "& tbody th": {
      backgroundColor: "#F5EEE6",
      borderBottom: "none !important",
      fontSize: "14px",
      fontWeight: "300",
      padding: "10px 25px"
    },
  },
  orderMeta: {
    maxWidth: 600,
    minWidth: 0,
    margin: "30px auto 0",
    fontSize: 18,
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  },
  button: {
    margin: "60px auto 0px !important"
  }
}));

export default OrderDetail;
