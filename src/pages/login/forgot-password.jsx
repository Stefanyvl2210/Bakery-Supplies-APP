import React from "react";
import { Button, Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/input";
import SnackBar from "../../components/Snackbar";
import { forgotPassword } from "../../helpers/api/auth";
import { getErrorMessage } from "../../helpers/api/response";
import { LoadingButtonContent } from "../../components/Loader";

const ForgotPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const { register, handleSubmit } = useForm({ defaultValues: { email: "" } });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await forgotPassword(data);
      setOpenSnack({
        open: true,
        message: "If the account exists, a reset link has been sent.",
        severity: "success",
      });
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error),
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
        <h2 className={classes.title}>Forgot password</h2>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Card className={classes.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              register={register}
              field="email"
              fullWidth
              width="100%"
              label="Email"
              type="email"
              placeholder=" "
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              disabled={loading}
            >
              {loading ? (
                <LoadingButtonContent label="Sending…" />
              ) : (
                "Send reset link"
              )}
            </Button>
            <p className={classes.link} onClick={() => navigate("/login")}>
              Back to login
            </p>
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
  link: {
    cursor: "pointer",
    marginTop: 20,
  },
}));

export default ForgotPassword;
