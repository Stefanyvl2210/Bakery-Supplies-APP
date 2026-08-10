import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Grid, IconButton } from "@mui/material";

// hook form
import { useForm } from "react-hook-form";
import { sessionAuthenticated, userLogged } from "../../features/auth/AuthSlice";
import ProfileSidebar from "../../components/profile-sidebar";
import CustomInput from "../../components/input";
import { makeStyles } from "@mui/styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ProfileAvatar from "../../assets/images/profile-avatar.png";
import { addAddressUser, deleteAddressUser, getAddressUser, updateUser } from "../../helpers/api/auth";
import SnackBar from "../../components/Snackbar";
import { getErrorMessage, getResourceCollection, getResourceData } from "../../helpers/api/response";
import { parseAddressValue } from "../../helpers/formatters";
import Loader, { LoadingButtonContent } from "../../components/Loader";

const MyAccount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    address: true,
  });
  const user = useSelector(userLogged);
  const [addresses, setAddresses] = useState([]);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [profileSaving, setProfileSaving] = React.useState(false);
  const [addressSaving, setAddressSaving] = React.useState(false);
  const [addressesLoading, setAddressesLoading] = React.useState(true);
  const [deletingAddressId, setDeletingAddressId] = React.useState(null);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async ({ showLoader = true, showError = true } = {}) => {
    if (showLoader) setAddressesLoading(true);

    try {
      const newAddresses = await getAddressUser();
      setAddresses(getResourceCollection(newAddresses));
      return true;
    } catch (error) {
      if (showError) {
        setOpenSnack({
          open: true,
          message: getErrorMessage(error, "Unable to load addresses."),
          severity: "error",
        });
      }

      return false;
    } finally {
      if (showLoader) setAddressesLoading(false);
    }
  }

  // form structure user profile
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user ? user.first_name : '',
      lastName: user ? user.last_name : '',
      email: user ? user.email : '',
      phoneNumber: user ? user.phone_number : '',
      address: "",
      city: "",
      state: ""
    }
  });

  const onSubmit = async (data) => {
    setProfileSaving(true);

    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phoneNumber,
      };

      if (data.newPassword) {
        payload.password = data.newPassword;
        payload.password_confirmation = data.newPassword;
      }

      const response = await updateUser(user.id, payload);
      dispatch(sessionAuthenticated(getResourceData(response)));
      setOpenSnack({
        open: true,
        message: "Profile updated",
        severity: "success",
      });
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to update profile."),
        severity: "error",
      });
    } finally {
      setProfileSaving(false);
    }
  };

  const onSubmitAddress = async (data) => {
    if(showAddressInput && data.address !== "" && data.city !== "" && data.state !== "" ) {
      setAddressSaving(true);
      let addressString = JSON.stringify({address: data.address, city: data.city, state: data.state});
      try {
        const response = await addAddressUser({address: addressString});
          if(response.status === 200 || response.status === 201) {
          const addressesRefreshed = await getAddresses({ showLoader: false, showError: false });

          resetField("address");
          resetField("city");
          resetField("state");
          setShowAddressInput(false);
          setOpenSnack({
            open: true,
            message: addressesRefreshed
              ? "New Address Added"
              : "Address added, but the list could not be refreshed.",
            severity: addressesRefreshed ? "success" : "warning",
          });
        }
      } catch (error) {
        setOpenSnack({
          open: true,
          message: getErrorMessage(error),
          severity: "error",
        });
      } finally {
        setAddressSaving(false);
      }
    }
  };

  const handleInput = (key) => {
    if (!showInput[key]) {
      setShowInput((prev) => ({ ...prev, [key]: true }));
    } else {
      setShowInput((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleDeleteAddress = async (index) => {
    setDeletingAddressId(index);

    try {
      await deleteAddressUser(index);
      await getAddresses();
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to delete address."),
        severity: "error",
      });
    } finally {
      setDeletingAddressId(null);
    }
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

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
                    value={user ? user.first_name : ''}
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
                    value={user ? user.last_name : ''}
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
                    value={user ? user.email : ''}
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
                    value={user ? user.phone_number : ''}
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
                    disabled={profileSaving}
                    sx={{marginLeft: "0 !important"}}
                  >
                    {profileSaving ? (
                      <LoadingButtonContent label="Saving…" />
                    ) : (
                      <span className={classes.buttonText}>Save</span>
                    )}
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
                  {addressesLoading ? (
                    <Grid item xs={12}>
                      <Loader label="Loading addresses…" minHeight={120} />
                    </Grid>
                  ) : showAddressInput ? (
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
                      addresses.map((item, i) => (
                        <Grid item xs={12} key={i} className={classes.addresses}>
                          <p className={classes.paragraph}>
                            {parseAddressValue(item.address)}
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
                              onClick={() => handleDeleteAddress(item.id)}
                              disabled={deletingAddressId !== null}
                            >
                              {deletingAddressId === item.id ? (
                                <Loader tone="public" label="Deleting address…" size={20} inline />
                              ) : (
                                <DeleteOutlineIcon />
                              )}
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
                      type={showAddressInput ? "submit" : "button"}
                      variant="contained"
                      onClick={showAddressInput ? undefined : () => setShowAddressInput(true)}
                      sx={{marginLeft: "0 !important"}}
                      disabled={addressSaving || addressesLoading}
                    >
                      {addressSaving ? (
                        <LoadingButtonContent label="Saving…" />
                      ) : showAddressInput ? "Save" : "Add"}
                    </Button>
                    {showAddressInput &&
                      <Button
                        color="primary"
                        type="button"
                        variant="contained"
                        disabled={addressSaving}
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
      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
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
