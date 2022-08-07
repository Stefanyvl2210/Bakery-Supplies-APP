import React, { useState } from "react";
import { Avatar, Button, Grid } from "@mui/material";

// hook form
import { useForm } from "react-hook-form";

import ProfileSidebar from "../../components/profile-sidebar";
import CustomInput from "../../components/input";
import { makeStyles } from "@mui/styles";

import ProfileAvatar from "../../assets/images/profile-avatar.png";

const MyAccount = () => {
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

  const onSubmit = (data) => {};

  const handleInput = (key) => {
    if (!showInput[key]) {
      setShowInput((prev) => ({ ...prev, [key]: true }));
    } else {
      setShowInput((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={2} className={classes.sidebar}>
        <ProfileSidebar />
      </Grid>

      <Grid item xs={10} className={classes.container}>
        <Grid container>
          <Grid item xs={12} className={classes.avatarWrapper}>
            <h1 className={classes.title}>Profile</h1>

            <Avatar
              sx={{ width: 100, height: 100 }}
              src={ProfileAvatar}
              alt="avatar"
              className={classes.avatar}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container className={classes.form}>
              <Grid item xs={12} sm={12} md={6}>
                <CustomInput
                  handleInput={handleInput}
                  register={register}
                  field="firstName"
                  width="100%"
                  fullWidth={true}
                  classname={classes.inputWrapper}
                  label="First Name"
                  icon
                  showValue={showInput.firstName}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <CustomInput
                  handleInput={handleInput}
                  register={register}
                  field="lastName"
                  width="100%"
                  fullWidth={true}
                  classname={classes.inputWrapper}
                  label="Last Name"
                  icon
                  showValue={showInput.lastName}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <CustomInput
                  handleInput={handleInput}
                  register={register}
                  field="email"
                  width="100%"
                  fullWidth={true}
                  classname={classes.inputWrapper}
                  label="Email"
                  icon
                  showValue={showInput.email}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <CustomInput
                  handleInput={handleInput}
                  register={register}
                  field="phoneNumber"
                  width="100%"
                  fullWidth={true}
                  classname={classes.inputWrapper}
                  label="Phone Number"
                  icon
                  showValue={showInput.phoneNumber}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <CustomInput
                  handleInput={handleInput}
                  register={register}
                  field="oldPassword"
                  width="100%"
                  fullWidth={true}
                  classname={classes.inputWrapper}
                  label="Old Password"
                  type="password"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <CustomInput
                  handleInput={handleInput}
                  register={register}
                  field="newPassword"
                  width="100%"
                  fullWidth={true}
                  classname={classes.inputWrapper}
                  label="New Password"
                  type="password"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  //   onClick={handleSubmit(onSubmit)}
                >
                  <span className={classes.buttonText}>Save</span>
                </Button>
              </Grid>

              <Grid item xs={12} className={classes.addressesContent}>
                <h2 className={classes.title}>Addresses</h2>
              </Grid>

              <Grid item xs={12}>
                {showAddressInput ? (
                  <CustomInput
                    handleInput={handleInput}
                    register={register}
                    field="address"
                    width="100%"
                    fullWidth={true}
                    classname={classes.inputWrapper}
                    label="Address"
                  />
                ) : (
                  <p>You don’t have any address yet!</p>
                )}
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

export default MyAccount;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 60,
    maxWidth: "1000px !important",

    "@media (max-width: 768px)": {
      margin: "0 auto !important",
      padding: "60px 0px",
    },
  },
  sidebar: {
    "@media (max-width: 1000px)": {
      display: "none",
    },
  },
  title: {
    font: "400 40px/28px Poiret One",
  },

  avatarWrapper: {
    "@media (max-width: 768px)": {
      display: "flex",
      justifyContent: "center !important",
      flexDirection: "column !important",
      alignItems: "center !important",
    },
  },
  avatar: {
    border: "1px solid #EEEEEE",
  },
  form: {
    marginTop: 29,

    "& .MuiGrid-root": {
      "@media (max-width: 768px)": {
        display: "flex",
        justifyContent: "center",
      },
    },
  },
  inputWrapper: {
    maxWidth: 330,
    marginTop: "29px !important",
  },
  button: {
    marginTop: "34px !important",
    marginLeft: "0 !important",
  },
  addressesContent: {
    marginTop: "60px !important",
  },
}));
