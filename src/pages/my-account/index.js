import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Grid, IconButton } from "@mui/material";

// hook form
import { useForm } from "react-hook-form";
import { addAddress, allAddresses, deleteAddress, token, userLogged } from "../../features/auth/AuthSlice";
import ProfileSidebar from "../../components/profile-sidebar";
import CustomInput from "../../components/input";
import { makeStyles } from "@mui/styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
  const navigate = useNavigate();
  const addresses = useSelector(allAddresses);
  const userIsLogged = useSelector(token);
  const user = useSelector(userLogged);
  const [showAddressInput, setShowAddressInput] = useState(false);

  useEffect(() => {
    if(!userIsLogged) {
      navigate('/');
    }
  }, []);

  // form structure user profile
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phoneNumber: user.phone_number,
      address: "",
      city: "",
      state: ""
    }
  });

  const onSubmit = (data) => {
    console.log('data perfil',data)
    // resetField("password");
    // resetField("");
  };

  const onSubmitAddress = (data) => {
    if(!showAddressInput && data.address !== "" && data.city !== "" && data.state !== "" ) {
      dispatch(addAddress({address: data.address, city: data.city, state: data.state}))
      resetField("address");
      resetField("city");
      resetField("state");
    }
  };

  const handleInput = (key) => {
    if (!showInput[key]) {
      setShowInput((prev) => ({ ...prev, [key]: true }));
    } else {
      setShowInput((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleDeleteAddress = (index) => {
    dispatch(deleteAddress({index: index}));
  }

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12} md={2.5} className={classes.sidebar}>
        <ProfileSidebar />
      </Grid>

      <Grid item xs={12} md={9.5} className={classes.container}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container className={classes.form} columnSpacing={2}>
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
                    value={user.first_name}
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
                    value={user.last_name}
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
                    value={user.email}
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
                    value={user.phone_number}
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
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    sx={{marginLeft: "0 !important"}}
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
                <Grid item xs={12} container columnSpacing={2}>
                  {showAddressInput ? (
                    <>
                      <Grid item xs={12} sm={5.7} md={9.4}>
                        <CustomInput
                          handleInput={handleInput}
                          register={register}
                          field="address"
                          width="100%"
                          fullWidth={true}
                          classname={classes.inputAddress}
                          label="Address *" />
                      </Grid>
                      <Grid item xs={12} md={4.7}>
                        <CustomInput
                          handleInput={handleInput}
                          register={register}
                          field="city"
                          width="100%"
                          fullWidth={true}
                          classname={classes.inputWrapper}
                          label="City *" />
                      </Grid>
                      <Grid item xs={12} md={4.7}>
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
                    addresses.length > 0 ?
                      addresses.map((address, i) => (
                        <Grid item xs={12} key={i} className={classes.addresses}>
                          <p className={classes.paragraph}>
                            {address.address}, {address.city}, {address.state} 
                            <IconButton
                              size="small"
                              edge="start"
                              color="error"
                              aria-label="open drawer"
                              sx={{
                                margin: "0 10px 0 0 !important",
                                "& svg": {
                                  width: "24px !important",
                                  height: "24px !important"
                                }
                              }}
                              onClick={() => handleDeleteAddress(i)}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </p>
                        </Grid>
                      ))
                      :
                      <Grid item xs={12}>
                        <p className={classes.paragraph}>You don’t have any address yet!</p>
                      </Grid>
                  )}
                </Grid>

                <Grid item xs={12} sx={{marginTop: "20px"}}>
                  <div>
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                      onClick={() => {
                        if (showAddressInput) {
                          handleSubmit(onSubmitAddress)
                          setShowAddressInput(false);
                        } else {
                          setShowAddressInput(true);
                        }
                      }}
                      sx={{marginLeft: "0 !important"}}
                    >
                      {showAddressInput ? "Save" : "Add"}
                    </Button>
                    {showAddressInput &&
                      <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        onClick={() => {
                            setShowAddressInput(false);
                        }}
                      >
                        Cancel
                      </Button>}
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
  addresses: {
    flexDirection: "column !important",
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
    "@media (max-width: 768px)": {
      justifyContent: "center !important",
    },
    "& .MuiGrid-root": {
      "@media (max-width: 768px)": {
        display: "flex",
        justifyContent: "center !important",
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
  addressesContent: {
    marginTop: "50px !important",
  },
  paragraph:{
    marginTop: "3px !important",
    marginBottom: "5px !important",
    display: "flex",
    alignItems: "center"
  },
  buttonText:{
    margin: 0,
    font: "400 24px Open Sans",
    lineHeight: "26px",
    color: "white"
  }
}));
