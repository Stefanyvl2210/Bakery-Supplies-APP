import React from "react";

// hook form
import { useForm } from "react-hook-form";

// material ui components
import { Card, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import CustomInput from "../../components/input";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { state } = useLocation();
  const emailToRegister = state && state.email;

  // form structure
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: emailToRegister || ''
    }
  });
  
  const onSubmit = (data) => {
    console.log('register',data)
    navigate("/verify-email");
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
                    field="firstName"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(
                      classes.shortInput
                    )}
                    label="First Name"
                    placeholder=" "
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ marginTop: { xs: "15px !important", md: "0 !important"}}}>
                  <CustomInput
                    register={register}
                    field="lastName"
                    fullWidth={true}
                    width="100%"
                    label="Last Name"
                    placeholder=" "
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
                    // value={emailToRegister ? emailToRegister : ''}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomInput
                    register={register}
                    field="phone"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(
                      classes.inputWrapper,
                      classes.fullWidth
                    )}
                    label="Phone number"
                    placeholder=" "
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
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomInput
                    register={register}
                    field="confirmPassword"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(classes.inputWrapper)}
                    label="Confirm Password"
                    type="password"
                    placeholder=" "
                  />
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>

        <Grid item xs={16} display="flex" justifyContent="center">
          <p className={classes.hasAccountText} onClick={() => navigate("/login")}>
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
          >
            <span className={classes.buttonText}>Register</span>
          </Button>
        </Grid>
      </Grid>
    </>
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
    [theme.breakpoints.down('md')]: {
      marginTop: "15px !important",
    },
  },
  shortInput: {
    "& input": {
      marginRight: "15px !important",
      [theme.breakpoints.down('md')]: {
        marginRight: "0px !important",
      }
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
    [theme.breakpoints.down('md')]: {
      flexDirection: "column !important",
    },
  }
}));

export default Register;
