import React from "react";

// hook form
import { useForm } from "react-hook-form";

// material ui components
import { Card, Grid, Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import CustomInput from "../../components/input";
import classNames from "classnames";

const Register = () => {
  const classes = useStyles();

  // form structure
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <h2 className={classes.title}>Register</h2>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Card className={classes.card}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={6}>
                  <CustomInput
                    register={register}
                    field="firstName"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(
                      classes.inputWrapper,
                      classes.shortInput
                    )}
                    label="First Name"
                    placeholder="jhon"
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    register={register}
                    field="lastName"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(classes.inputWrapper)}
                    label="Last Name"
                    placeholder="Doe"
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
                    placeholder="jdoe@gmail.com"
                    type="email"
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
                    placeholder="12345678"
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    register={register}
                    field="password"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(
                      classes.inputWrapper,
                      classes.shortInput
                    )}
                    label="password"
                    placeholder="12345678"
                    type="password"
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    register={register}
                    field="confirmPassword"
                    fullWidth={true}
                    width="100%"
                    classname={classNames(classes.inputWrapper)}
                    label="Confirm Password"
                    placeholder="12345678"
                    type="password"
                  />
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>

        <Grid item xs={16} display="flex" justifyContent="center">
          <p className={classes.hasAccountText}>
            Already have an account? Login
          </p>
        </Grid>

        <Grid item xs={16} className={classes.buttonWrapper}>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            className={classes.button}
          >
            <span className={classes.buttonText}>Register</span>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 32,
  },
  card: {
    backgroundColor: "#D9D9D9 !important",
    marginTop: 20,
    width: "100%",
    maxWidth: 600,
    padding: "35px 44px 100px 44px",
    borderRadius: "5px !important",
    boxShadow: "unset !important",
  },
  inputWrapper: {
    marginTop: "27px !important",
  },
  shortInput: {
    "& input": {
      marginRight: "15px !important",
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
    width: 215,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff !important",
    fontSize: 20,
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
  },
}));

export default Register;
