import React from "react";

import { useParams } from "react-router-dom";

// hook form
import { useForm } from "react-hook-form";

// material ui components
import { Grid, Button, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/input";
import { verifyEmail } from "../../helpers/api/auth";
import SnackBar from "../../components/Snackbar";
import axios from "axios";

const validationSchema = yup.object({
  code: yup.string().required("Required"),
});

const VerifyEmail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
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
      code: "",
    },
  });

  if (!params?.id) navigate("/login");

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await verifyEmail(data, params?.id);
      setOpenSnack({
        open: true,
        message: "Successfully verified",
        severity: "success",
      });
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setOpenSnack({
        open: true,
        message: "There has been an error",
        severity: "error",
      });
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
      <Grid container className={classes.container} justifyContent="center">
        <Grid item xs={12}>
          <h2 className={classes.title}>Mail verification</h2>
        </Grid>
        <Grid item xs={12} md={6} className={classes.content}>
          <Typography className={classes.text}>
            Please enter the 6-digit verification code sent by test@gmail.com.
            The code will be active for 30 minutes.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.codeInput}>
              <CustomInput
                register={register}
                field="code"
                fullWidth={true}
                width="100%"
                label="Email verification code"
                placeholder=" "
                error={errors?.code?.message}
              />
            </div>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              className={classes.button}
              disabled={loading}
            >
              <span className={classes.buttonText}>Send</span>
            </Button>
            <p className={classes.codeText}>Did you not receive the code?</p>
          </form>
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
    margin: "100px auto 300px auto !important",
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
  text: {
    fontSize: "18px",
    lineHeight: "20px",
  },
  buttonWrapper: {
    marginTop: 37,
  },
  button: {
    margin: "0 !important",
  },
  codeText: {
    margin: "20px 0 30px 0",
    fontSize: 18,
    fontWeight: "500",
    cursor: "pointer",
  },
  codeInput: {
    margin: "30px 0",
  },
  textInput: {
    margin: "4px 0px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#767676",
  },
}));

export default VerifyEmail;
