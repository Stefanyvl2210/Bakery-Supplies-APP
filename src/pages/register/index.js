import React, { useState } from "react";

// hook form
import { useForm } from "react-hook-form";

// api
import { registerUser } from "../../helpers/api/auth";

// material ui components
import { Card, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import CustomInput from "../../components/input";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import SnackBar from "../../components/Snackbar";

const validationSchema = yup.object({
  first_name: yup.string().required("Required"),
  last_name: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  phone_number: yup.string().required("Required"),
  password: yup.string().required("Required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { state } = useLocation();
  const emailToRegister = state && state.email;

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
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: emailToRegister || "",
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("register", data);
    setLoading(true);

    try {
      const response = await registerUser(data);

      console.log(response);

      setOpenSnack({
        open: true,
        message: "Successfully registered",
        severity: "success",
      });
      setLoading(false);

      setTimeout(() => {
        navigate(`/verify-email/${response.data.token}`);
      }, 2000);
    } catch (error) {
      console.log(error);
      // setOpenSnack({
      //   open: true,
      //   message: error,
      //   severity: "error",
      // });
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
          <h2 className={classes.title}>Register</h2>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Card className={classes.card}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container className={classes.formContainer}>
                <Grid item xs={12} md={6}>
                  <CustomInput
                    register={register}
                    field="first_name"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(classes.shortInput)}
                    label="First Name"
                    placeholder=" "
                    error={errors?.first_name?.message}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    marginTop: { xs: "15px !important", md: "0 !important" },
                  }}
                >
                  <CustomInput
                    register={register}
                    field="last_name"
                    fullWidth={true}
                    width="100%"
                    label="Last Name"
                    placeholder=" "
                    error={errors?.last_name?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomInput
                    register={register}
                    field="email"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(
                      classes.inputWrapper,
                      classes.fullWidth
                    )}
                    label="Email"
                    placeholder=" "
                    type="email"
                    error={errors?.email?.message}
                    // value={emailToRegister ? emailToRegister : ''}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomInput
                    register={register}
                    field="phone_number"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(
                      classes.inputWrapper,
                      classes.fullWidth
                    )}
                    label="Phone number"
                    placeholder=" "
                    error={errors?.phone_number?.message}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomInput
                    register={register}
                    field="password"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(
                      classes.inputWrapper,
                      classes.shortInput
                    )}
                    label="Password"
                    type="password"
                    placeholder=" "
                    error={errors?.password?.message}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomInput
                    register={register}
                    field="password_confirmation"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(classes.inputWrapper)}
                    label="Confirm Password"
                    type="password"
                    placeholder=" "
                    error={errors?.password_confirmation?.message}
                  />
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>

        <Grid item xs={16} display="flex" justifyContent="center">
          <p
            className={classes.hasAccountText}
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </p>
        </Grid>

        <Grid item xs={16} className={classes.buttonWrapper}>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            className={classes.button}
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <span className={classes.buttonText}>
              {loading ? "Loading" : "Register"}
            </span>
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
  card: {
    backgroundColor: "#F5EEE6 !important",
    marginTop: 20,
    width: "100%",
    maxWidth: 600,
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
  shortInput: {
    "& input": {
      marginRight: "15px !important",
      [theme.breakpoints.down("md")]: {
        marginRight: "0px !important",
      },
    },
  },
  fullWidth: {
    maxWidth: "100% !important",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 37,
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
  hasAccountText: {
    margin: "20px 0 30px 0",
    fontSize: 18,
    fontWeight: "500",
    cursor: "pointer",
  },
  formContainer: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column !important",
    },
  },
}));

export default Register;
