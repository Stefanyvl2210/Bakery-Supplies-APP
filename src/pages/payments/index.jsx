import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import ProfileSidebar from "../../components/profile-sidebar";
import { makeStyles } from "@mui/styles";
import { getPaymentMethods } from "../../helpers/api/paymentMethods";
import { getErrorMessage, getResourceCollection } from "../../helpers/api/response";
import { formatMoney } from "../../helpers/formatters";
import Loader from "../../components/Loader";

const Payments = () => {
  const classes = useStyles();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const response = await getPaymentMethods();
        const methods = getResourceCollection(response);
        setPaymentMethods(methods);
        setMessage(methods.length ? "" : "No payment methods available.");
      } catch (error) {
        setMessage(getErrorMessage(error, "Unable to load payment methods."));
      } finally {
        setLoading(false);
      }
    };

    loadPaymentMethods();
  }, []);

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12} md={2.5} className={classes.sidebar}>
        <ProfileSidebar />
      </Grid>

      <Grid item xs={12} md={9.5} className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <h1 className={classes.title}>Payment methods</h1>
          </Grid>

          <Grid item xs={12}>
            <Grid container className={classes.form}>
              {loading ? (
                <Grid item xs={12}>
                  <Loader label="Loading payment methods…" minHeight={220} />
                </Grid>
              ) : null}

              {!loading && message && (
                <Grid item xs={12}>
                  <p className={classes.paragraph}>{message}</p>
                </Grid>
              )}

              {!loading && paymentMethods.map((method) => (
                <Grid item xs={12} key={method.id} className={classes.card}>
                  <h2>{method.name}</h2>
                  <p>Type: {method.type}</p>
                  <p>Currency: {method.currency}</p>
                  <p>Exchange rate: {formatMoney(method.exchange_rate, method.currency || "USD")}</p>
                  {method.instructions && <p>{method.instructions}</p>}
                  {method.account_details && <p>{method.account_details}</p>}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Payments;

const useStyles = makeStyles((theme) => ({
  grid:{
    minHeight: "70vh",
  },
  container: {
    padding: 60,
    maxWidth: "1140px !important",
    [theme.breakpoints.down('md')]: {
      padding: "140px 36px !important",
    },
    "@media (max-width: 768px)": {
      margin: "0 auto !important",
    },
  },
  sidebar: {
    "@media (max-width: 1000px)": {
      display: "none",
    },
  },
  title: {
    font: "400 40px/28px Poiret One",
    marginTop: "0px",
    marginBottom: "35px",
    lineHeight: "20px",
    color: "black"
  },
  form: {
    "& .MuiGrid-root": {
      "@media (max-width: 768px)": {
        display: "flex",
        justifyContent: "center",
      },
    },
  },
  card: {
    background: "#F5EEE6",
    borderRadius: 5,
    marginBottom: "20px !important",
    padding: "24px !important",
    "& h2": {
      font: "400 30px/28px Poiret One",
      margin: "0 0 15px 0",
    },
    "& p": {
      margin: "5px 0",
      font: "300 18px Open Sans",
    },
  },
  paragraph:{
    marginTop: "0px !important",
    marginBottom: "5px !important",
    font: "300 20px Open Sans",
    lineHeight: "20px",
    color: "black"
  },
}));
