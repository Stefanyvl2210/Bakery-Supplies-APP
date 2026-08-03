import React from "react";
import { Button, Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomInput from "../../components/input";
import SnackBar from "../../components/Snackbar";
import { resetPassword } from "../../helpers/api/auth";
import { getErrorMessage } from "../../helpers/api/response";

const ResetPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      token: searchParams.get("token") || "",
      email: searchParams.get("email") || "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await resetPassword(data);
      setOpenSnack({
        open: true,
        message: "Password reset. You can sign in now.",
        severity: "success",
      });
      setTimeout(() => navigate("/login"), 1000);
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
        <h2 className={classes.title}>Reset password</h2>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Card className={classes.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput register={register} field="token" fullWidth width="100%" label="Token" />
            <CustomInput register={register} field="email" fullWidth width="100%" label="Email" type="email" />
            <CustomInput register={register} field="password" fullWidth width="100%" label="Password" type="password" />
            <CustomInput register={register} field="password_confirmation" fullWidth width="100%" label="Confirm password" type="password" />
            <Button type="submit" variant="contained" className={classes.button} disabled={loading}>
              {loading ? "Saving..." : "Reset password"}
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
    "& .MuiFormControl-root": {
      marginTop: "20px !important",
    },
  },
  button: {
    margin: "30px 0 0 0 !important",
  },
}));

export default ResetPassword;
