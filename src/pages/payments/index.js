import React, { useState } from "react";
import { Avatar, Button, Grid } from "@mui/material";

// hook form
import { useForm } from "react-hook-form";

import ProfileSidebar from "../../components/profile-sidebar";
import CustomInput from "../../components/input";
import { makeStyles } from "@mui/styles";

import ProfileAvatar from "../../assets/images/profile-avatar.png";

const Payments = () => {
  const classes = useStyles();
  const [showInput, setShowInput] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    address: true,
  });

  const [showAddressInput, setShowAddressInput] = useState(false);

  // form structure
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInput = (key) => {
    if (!showInput[key]) {
      setShowInput((prev) => ({ ...prev, [key]: true }));
    } else {
      setShowInput((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12} md={2.5} className={classes.sidebar}>
        <ProfileSidebar />
      </Grid>

      <Grid item xs={12} md={9.5} className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <h1 className={classes.title}>Payments methods</h1>
          </Grid>

          <Grid item xs={12}>
            <Grid container className={classes.form}>
              <Grid item xs={12}>
                <p className={classes.paragraph}>You don’t have any address yet!</p>
              </Grid>

              <Grid item xs={12}>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    //   onClick={handleSubmit(onSubmit)}
                    onClick={() => {
                      if (showAddressInput) {
                        alert("saved");
                        setShowAddressInput(false);
                      } else {
                        setShowAddressInput(true);
                      }
                    }}
                  >
                    <span className={classes.buttonText}>
                      {showAddressInput ? "Save" : "Add"}
                    </span>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Payments;

const useStyles = makeStyles((theme) => ({
  grid:{
    height: "70vh",

  },
  container: {
    padding: 60,
    maxWidth: "1140px !important",
    [theme.breakpoints.down('md')]: {
      padding: "140px 36px !important",
    },

    "@media (max-width: 768px)": {
      margin: "0 auto !important",
    },
  },
  sidebar: {
    "@media (max-width: 1000px)": {
      display: "none",
    },
  },
  title: {
    font: "400 40px/28px Poiret One",
    marginTop: "0px",
    marginBottom: "35px",
    lineHeight: "20px",
    color: "black"
  },

  form: {
    "& .MuiGrid-root": {
      "@media (max-width: 768px)": {
        display: "flex",
        justifyContent: "center",
      },
    },
    "& .MuiFormLabel-root": {
      color: "#767676",
      fontSize: "14px",
      lineHeight: "16px",
      fontStyle: "normal" 
    },
  },
  inputWrapper: {
    maxWidth: 300,
    marginBottom: "15px !important"
  },
  button: {
    marginTop: "30px !important",
    marginLeft: "0 !important",
    marginRight: "0 !important",
    marginBottom: "0px !important",
    padding: "0px 16px !important",
    gap:"8px !important",
    width: "150px !important",
    height: "50px !important",
    background: "#C86B85 !important",
    borderRadius: "4px !important",
  },
  paragraph:{
    marginTop: "0px !important",
    marginBottom: "5px !important",
    font: "300 20px Open Sans",
    lineHeight: "20px",
    color: "black"
  },
  buttonText:{
    margin: 0,
    font: "400 24px Open Sans",
    lineHeight: "26px",
    color: "white"
  }
}));
