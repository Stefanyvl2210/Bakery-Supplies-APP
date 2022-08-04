import React from "react";

// material ui components
import { Grid, Button, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import { useNavigate } from "react-router-dom";

// images
import CheckCirle from "../../assets/images/check-circle.svg";

const OrderCompleted = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Grid container className={classes.container} justifyContent="center">
        <Grid item xs={12}>
          <h2 className={classes.title}>Your order has been placed!</h2>
        </Grid>
        <Grid item xs={12} className={classes.content}>
            <Typography className={classes.text}>
                Thank you for ordering with us, we have sent you an email with all the details.
            </Typography>
            <img src={CheckCirle} width={200} height={200} alt="Order Completed" />
            <Button
                color="primary"
                type="submit"
                variant="contained"
                className={classes.button}
                onClick={() => navigate("/order-detail")}
            >
                <span className={classes.buttonText}>Next</span>
            </Button>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1280,
    margin: "60px auto !important",
  },
  title: {
    textAlign: "center",
    fontFamily: 'Poiret One',
    fontSize: '40px !important',
    lineHeight: '20px !important',
    marginTop: "0 !important",
    fontWeight: "300"
  },
  text: {
    fontSize: "20px !important",
    lineHeight: "26px !important",
    fontWeight: "300 !important",
    marginBottom: "30px !important"
  },
  buttonWrapper: {
    marginTop: 37,
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
