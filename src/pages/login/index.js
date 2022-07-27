import React from "react";

// hook form
import { useForm } from "react-hook-form";

// material ui components
import { Card, Grid, Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import CustomInput from "../../components/input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // form structure
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
                <Grid item xs={16}>
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

                <Grid item xs={16}>
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
                    <a href="/" className={classes.forgotPassText}>
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
                >
                  <span className={classes.buttonText}>Enter</span>
                </Button>
              </Grid>
            </form>
          </Card>
        </Grid>

        <Grid item xs={16} display="flex" justifyContent="center">
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={16} className={classes.buttonWrapper}>
          <Button type="submit" variant="contained" className={classes.button} onClick={() => navigate("/register")}>
            <span className={classes.buttonText}>Create Account</span>
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
    marginTop: "0 !important"
  },
  card: {
    backgroundColor: "#D9D9D9 !important",
    marginTop: 20,
    width: "100%",
    maxWidth: 500,
    padding: "126px 44px 35px 44px",
    borderRadius: "5px !important",
    boxShadow: "unset !important",
  },
  inputWrapper: {
    marginTop: "27px !important",
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
    backgroundColor: "#fff !important",
  },
  buttonText: {
    color: "#000 !important",
  },
  forgotPassText: {
    color: "#000",
    textDecoration: "none",
    marginTop: 5,
  },
  divider: {
    width: 288,
    margin: "0 auto",
    marginTop: "45px !important",
    marginBottom: "37px !important",
  },
}));

export default Login;
