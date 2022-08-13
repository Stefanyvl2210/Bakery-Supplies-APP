import React, { useState } from "react";
import { Avatar, Button, Grid } from "@mui/material";

// hook form
import { useForm } from "react-hook-form";
import { addAddress, allAddresses } from "../../features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const addresses = useSelector(allAddresses);

  console.log('addresses', addresses)

  const [showAddressInput, setShowAddressInput] = useState(false);

  // form structure user profile
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('data perfil',data)
  };

  const onSubmitAddress = (data, showAddressInput) => {
    if(showAddressInput == 'Save') {
      // dispatch(addAddress(data))
    }
  };

  // form structure user profile
  // const {
  //   register,
  //   handleSubmitAddress,
  //   formState: { errors },
  // } = useForm();

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
          <Grid item xs={4.7} className={classes.avatarWrapper}>
            <h1 className={classes.title}>Profile</h1>

            <Avatar
              sx={{ width: 100, height: 100 }}
              src={ProfileAvatar}
              alt="avatar"
              className={classes.avatar}
            />
          </Grid>

          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container className={classes.form}>
                <Grid item xs={12} sm={12} md={4.7}>
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

                <Grid item xs={12} sm={12} md={4.7}>
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

                <Grid item xs={12} sm={12} md={4.7}>
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

                <Grid item xs={12} sm={12} md={4.7}>
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

                <Grid item xs={12} sm={12} md={4.7}>
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

                <Grid item xs={12} sm={12} md={4.7}>
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
                      onClick={handleSubmit(onSubmit)}
                  >
                    <span className={classes.buttonText}>Save</span>
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Grid container className={classes.form}>
              <Grid item xs={12} className={classes.addressesContent}>
                <h2 className={classes.title}>Addresses</h2>
              </Grid>

              <form onSubmit={handleSubmit(onSubmitAddress)}>
                <Grid container>
                  {showAddressInput ? (
                    <>
                      <Grid item xs={8.7}>
                        <CustomInput
                          handleInput={handleInput}
                          register={register}
                          field="address"
                          width="100%"
                          fullWidth={true}
                          classname={classes.inputAddress}
                          label="Address *" />
                      </Grid>
                      <Grid item xs={4.7}>
                        <CustomInput
                          handleInput={handleInput}
                          register={register}
                          field="city"
                          width="100%"
                          fullWidth={true}
                          classname={classes.inputWrapper}
                          label="City *" />
                      </Grid>
                      <Grid item xs={4.7}>
                        <CustomInput
                          handleInput={handleInput}
                          register={register}
                          field="state"
                          width="100%"
                          fullWidth={true}
                          classname={classes.inputWrapper}
                          label="State/Province *" />
                      </Grid>
                    </>
                  ) : (
                      <p className={classes.paragraph}>You don’t have any address yet!</p>
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
                          // alert("saved");
                          handleSubmit(onSubmitAddress(showAddressInput))
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
              </form>
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
    marginBottom: "30px",
    lineHeight: "20px",
    color: "black"
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
    marginTop: "30px",

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
  inputAddress: {
    maxWidth: 705,
    marginBottom: "15px !important"

  },
  button: {
    marginTop: "20px !important",
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
  addressesContent: {
    marginTop: "50px !important",
  },
  paragraph:{
    marginTop: "3px !important",
    marginBottom: "5px !important",

  },
  buttonText:{
    margin: 0,
    font: "400 24px Open Sans",
    lineHeight: "26px",
    color: "white"
  }
}));
