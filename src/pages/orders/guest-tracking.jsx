import React from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getGuestOrder } from "../../helpers/api/orders";
import { getErrorMessage, getResourceData } from "../../helpers/api/response";
import SnackBar from "../../components/Snackbar";
import { LoadingButtonContent } from "../../components/Loader";

const GuestOrderTracking = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = React.useState(searchParams.get("token") || "");
  const [loading, setLoading] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await getGuestOrder(token);
      navigate("/order-detail", {
        state: { order: getResourceData(response), trackingToken: token },
      });
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to find guest order."),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnack = (_, reason) => {
    if (reason !== "clickaway") setOpenSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <h2 className={classes.title}>Track guest order</h2>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Card className={classes.card}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Tracking token"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              disabled={loading}
            >
              {loading ? (
                <LoadingButtonContent label="Searching…" />
              ) : (
                "Track order"
              )}
            </Button>
          </form>
        </Card>
      </Grid>
      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1140,
    margin: "60px auto !important",
    [theme.breakpoints.down("md")]: {
      margin: "140px auto !important",
      padding: "0 50px !important",
    },
  },
  title: {
    textAlign: "center",
    fontFamily: "Poiret One",
    fontSize: "40px !important",
    fontWeight: "300",
  },
  card: {
    backgroundColor: "#F5EEE6 !important",
    width: "100%",
    maxWidth: 500,
    padding: "35px 44px",
    boxShadow: "unset !important",
  },
  button: {
    margin: "30px 0 0 0 !important",
  },
}));

export default GuestOrderTracking;
