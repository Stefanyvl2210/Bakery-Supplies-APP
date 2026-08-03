import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCirle from "../../assets/images/check-circle.svg";

const OrderCompleted = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;
  const trackingToken = state?.trackingToken;

  return (
    <Grid container className={classes.container} justifyContent="center">
      <Grid item xs={12}>
        <h2 className={classes.title}>Your order has been placed!</h2>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <Typography className={classes.text}>
          Thank you for ordering with us. Your order is now registered in the backend.
        </Typography>
        {order?.id && (
          <Typography className={classes.text}>Order #{order.id}</Typography>
        )}
        {trackingToken && (
          <Typography className={classes.token}>
            Guest tracking token: {trackingToken}
          </Typography>
        )}
        <img src={CheckCirle} width={200} height={200} alt="Order Completed" />
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={() => navigate("/order-detail", { state: { order, trackingToken } })}
        >
          <span className={classes.buttonText}>View order</span>
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
    lineHeight: '42px !important',
    marginTop: "0 !important",
    fontWeight: "300",
  },
  text: {
    fontSize: "20px !important",
    lineHeight: "26px !important",
    fontWeight: "300 !important",
    marginBottom: "15px !important"
  },
  token: {
    fontSize: "15px !important",
    wordBreak: "break-all",
    marginBottom: "20px !important",
  },
  button: {
    margin: '30px 0 0 0 !important'
  },
  content: {
    maxWidth: "500px !important",
    display: "flex",
    flexDirection: "column !important",
    alignItems: "center",
    textAlign: "center",
  }
}));

export default OrderCompleted;
