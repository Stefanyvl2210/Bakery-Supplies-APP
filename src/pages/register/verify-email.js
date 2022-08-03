import React from "react";

// hook form
import { useForm } from "react-hook-form";

// material ui components
import { Card, Grid, Button, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import CustomInput from "../../components/input";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Grid container className={classes.container} justifyContent="center">
        <Grid item xs={12}>
          <h2 className={classes.title}>Mail verification</h2>
        </Grid>
        <Grid item xs={6} className={classes.content}>
            <Typography className={classes.text}>
                Please enter the 6-digit verification code sent by test@gmail.com. The code will be active for 30 minutes.
            </Typography>
            <div className={classes.codeInput}>
              <TextField 
                id="verification-code" 
                label="Email verification code" 
                variant="outlined" 
                // value={values.email}
                // onChange={handleChange('email')}
              />
            </div>
            <Button
                color="primary"
                type="submit"
                variant="contained"
                className={classes.button}
                onClick={() => navigate("/login")}
            >
                <span className={classes.buttonText}>Send</span>
            </Button>
            <p className={classes.codeText}>
                Did you not receive the code?
            </p>
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
    fontSize: "18px",
    lineHeight: "20px",
  },
  buttonWrapper: {
    marginTop: 37,
  },
  button: {
    margin: '0 !important'
  },
  codeText: {
    margin: "20px 0 30px 0",
    fontSize: 18,
    fontWeight: "500",
    cursor: "pointer",
  },
  codeInput: {
    margin: "30px 0"
  }
}));

export default VerifyEmail;
