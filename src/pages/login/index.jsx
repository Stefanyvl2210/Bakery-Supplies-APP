import React from "react";

// api
import {
  getTokenFromAuthResponse,
  getUserFromAuthResponse,
  loginUser,
} from "../../helpers/api/auth";
import { getErrorMessage } from "../../helpers/api/response";
import { storeAuthToken } from "../../config/axios";

// hook form
import { useForm } from "react-hook-form";

// material ui components
import { Card, Grid, Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import CustomInput from "../../components/input";
import { useNavigate } from "react-router-dom";

import LogoSimple from "../../assets/images/logo-simple.svg";

import {
  sessionAuthenticated,
  userHasRole,
} from "../../features/auth/AuthSlice";
import { useDispatch } from "react-redux";
import SnackBar from "../../components/Snackbar";
import { LoadingButtonContent } from "../../components/Loader";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  // form structure
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const loginResponse = await loginUser(data);
      const token = getTokenFromAuthResponse(loginResponse);

      if (!token) {
        throw new Error("Authentication token was not returned");
      }

      storeAuthToken(token);
      const user = getUserFromAuthResponse(loginResponse);

      if (!user) {
        throw new Error("Authenticated user was not returned");
      }

      dispatch(sessionAuthenticated({ user, token }));
      navigate(userHasRole(user, "admin") ? "/admin" : "/");
    } catch (error) {
      storeAuthToken(null);
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to sign in. Please try again."),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Login</h2>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Card className={classes.card}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={12} className={classes.logoContainer}>
                  <img
                    src={LogoSimple}
                    width={104}
                    height={104}
                    alt="Bakery Supplies"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    register={register}
                    field="email"
                    fullWidth={true}
                    width="100%"
                    classname={classes.inputWrapper}
                    label="Email"
                    placeholder="jdoe@gmail.com"
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomInput
                    register={register}
                    field="password"
                    fullWidth={true}
                    width="100%"
                    classname={classes.inputWrapper}
                    label="Password"
                    placeholder="12345678"
                    type="password"
                  />

                  <p>
                    <a href="/forgot-password" className={classes.forgotPassText}>
                      Forgot your password?
                    </a>
                  </p>
                </Grid>
              </Grid>

              <Grid className={classes.buttonWrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingButtonContent label="Signing in…" />
                  ) : (
                    <span className={classes.buttonText}>Enter</span>
                  )}
                </Button>
              </Grid>
            </form>
          </Card>
        </Grid>

        <Grid item xs={16} display="flex" justifyContent="center">
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={16} className={classes.buttonWrapper}>
          <Button
            color="primary"
            type="submit"
            variant="text"
            className={classes.button}
            style={{ textTransform: "none", fontSize: "16px", padding: "0", lineHeight: "1.5rem", margin: 0 }}
            onClick={() => navigate("/register")}
            disabled={loading}
          >
            <span className={classes.buttonText}>Create Account</span>
          </Button>
        </Grid>
      </Grid>

      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
    </>
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
    [theme.breakpoints.down("sm")]: {
      padding: "0 36px !important",
    },
  },
  title: {
    textAlign: "center",
    fontFamily: "Poiret One",
    fontSize: "40px !important",
    lineHeight: "20px !important",
    marginTop: "0 !important",
    fontWeight: "300",
  },
  logoContainer: {
    textAlign: "center",
  },
  card: {
    backgroundColor: "#F5EEE6 !important",
    marginTop: 20,
    width: "100%",
    maxWidth: 500,
    padding: "35px 44px",
    borderRadius: "5px !important",
    boxShadow: "unset !important",
  },
  inputWrapper: {
    marginTop: "20px !important",
    [theme.breakpoints.down("md")]: {
      marginTop: "15px !important",
    },
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 14,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassText: {
    color: "#000",
    textDecoration: "none",
    marginTop: 5,
  },
  divider: {
    width: 288,
    margin: "0 auto",
    marginTop: "32px !important",
    marginBottom: "32px !important",
  },
}));

export default Login;
