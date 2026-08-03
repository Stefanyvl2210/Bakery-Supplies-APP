import React, { useEffect, useMemo, useState } from "react";

// components
import Table from "../../components/table";

// material ui components
import {
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { allProducts, deleteAllProducts } from "../../features/counter/counterSlice";
import { isAuthenticated, userLogged } from "../../features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAddressUser } from "../../helpers/api/auth";
import { createGuestOrder, createOrder } from "../../helpers/api/orders";
import { getPaymentMethods } from "../../helpers/api/paymentMethods";
import { getErrorMessage, getResourceCollection, getResourceData } from "../../helpers/api/response";
import { formatAccountDetails, formatMoney, parseAddressValue } from "../../helpers/formatters";
import SnackBar from "../../components/Snackbar";

function createData(product, unitPrice, quantity, subtotal) {
  return { product, unitPrice, quantity, subtotal };
}

const columns = [
  { name: "Product", key: "product" },
  { name: "Unit price", key: "unitPrice" },
  { name: "Quantity", key: "quantity" },
  { name: "Subtotal", key: "subtotal" },
];

const isTransferMethod = (paymentMethod) =>
  String(paymentMethod?.type || "").toLowerCase() === "transfer";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartProducts = useSelector(allProducts);
  const authenticated = useSelector(isAuthenticated);
  const user = useSelector(userLogged);

  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [addressId, setAddressId] = useState("");
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [reference, setReference] = useState("");
  const [reportedAmount, setReportedAmount] = useState("");
  const [proof, setProof] = useState(null);
  const [guest, setGuest] = useState({ name: "", phone: "", email: "" });
  const [guestAddress, setGuestAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const selectedPaymentMethod = paymentMethods.find(
    (method) => String(method.id) === String(paymentMethodId)
  );
  const usesTransfer = isTransferMethod(selectedPaymentMethod);
  const accountDetails = formatAccountDetails(selectedPaymentMethod?.account_details);

  const rows = useMemo(
    () =>
      cartProducts.map((item) => {
        const quantity = Number(item.qty || 1);
        const price = Number(item.price || 0);
        return createData(item.name, price, quantity, price * quantity);
      }),
    [cartProducts]
  );

  const totalBeforeTaxes = useMemo(
    () => rows.reduce((total, item) => total + Number(item.subtotal || 0), 0),
    [rows]
  );
  const estimatedTaxes = totalBeforeTaxes * 0.16;
  const estimatedTotal = totalBeforeTaxes + estimatedTaxes;

  useEffect(() => {
    const loadCheckoutData = async () => {
      try {
        const paymentResponse = await getPaymentMethods();
        setPaymentMethods(getResourceCollection(paymentResponse));

        if (authenticated) {
          const addressResponse = await getAddressUser();
          setAddresses(getResourceCollection(addressResponse));
        }
      } catch (error) {
        setOpenSnack({
          open: true,
          message: getErrorMessage(error, "Unable to load checkout data."),
          severity: "error",
        });
      }
    };

    loadCheckoutData();
  }, [authenticated]);

  const buildProductsPayload = () =>
    cartProducts.map((item) => ({
      id: item.id,
      quantity: Number(item.qty || 1),
    }));

  const validateOrder = () => {
    if (!cartProducts.length) return "Your cart is empty.";
    if (cartProducts.some((item) => !item.id)) {
      return "One or more cart products are missing an API product id.";
    }
    if (!paymentMethodId) return "Choose a payment method.";
    if (deliveryType === "delivery" && authenticated && !addressId) {
      return "Choose a shipping address.";
    }
    if (deliveryType === "delivery" && !authenticated && !guestAddress) {
      return "Enter a shipping address.";
    }
    if (!authenticated && (!guest.name || !guest.phone)) {
      return "Enter guest name and phone.";
    }
    if (usesTransfer && !reference) {
      return "Enter the transfer reference.";
    }

    return null;
  };

  const handleOrder = async () => {
    const validationMessage = validateOrder();

    if (validationMessage) {
      setOpenSnack({
        open: true,
        message: validationMessage,
        severity: "error",
      });
      return;
    }

    setLoading(true);

    const payload = {
      delivery_type: deliveryType,
      payment_method_id: paymentMethodId,
      reference,
      reported_amount: reportedAmount,
      proof,
      products: buildProductsPayload(),
    };

    try {
      const response = authenticated
        ? await createOrder({
            ...payload,
            address_id: deliveryType === "delivery" ? addressId : undefined,
          })
        : await createGuestOrder({
            ...payload,
            guest,
            guest_address: deliveryType === "delivery" ? guestAddress : undefined,
          });

      const responseData = getResourceData(response);
      const order = responseData?.order ?? responseData;
      const trackingToken = responseData?.tracking_token ?? null;

      dispatch(deleteAllProducts());
      navigate("/order-completed", {
        state: { order, trackingToken },
      });
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to create order."),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnack = (_, reason) => {
    if (reason !== "clickaway") setOpenSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Shopping Cart</h2>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center" className={classes.table}>
          <Table rows={rows} columns={columns} maxWidth={600} minWidth={485} />
        </Grid>

        <Grid item xs={12}>
          <div className={classes.total}>
            <p>Total before taxes: {formatMoney(totalBeforeTaxes)}</p>
            <p>Estimated taxes: {formatMoney(estimatedTaxes)}</p>
            <p>Estimated total: {formatMoney(estimatedTotal)}</p>
          </div>

          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth className={classes.paymentSelect}>
            <FormLabel className={classes.subtitle}>Choose a delivery option</FormLabel>
            <RadioGroup
              name="delivery_type"
              value={deliveryType}
              onChange={(event) => setDeliveryType(event.target.value)}
            >
              <FormControlLabel value="delivery" control={<Radio size="small" />} label={<Typography className={classes.formControlLabel}>Delivery</Typography>} />
              <FormControlLabel value="pickup" control={<Radio size="small" />} label={<Typography className={classes.formControlLabel}>Pickup</Typography>} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <p className={classes.total}>Choose a payment method</p>

          <FormControl fullWidth className={classes.paymentSelect}>
            <InputLabel id="payment-select-label" className={classes.selectLabel}>Payment</InputLabel>
            <Select
              labelId="payment-select"
              value={paymentMethodId}
              label="Payment"
              onChange={(event) => setPaymentMethodId(event.target.value)}
              fullWidth
              className={classNames(classes.input)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {paymentMethods.map((method) => (
                <MenuItem key={method.id} value={method.id}>
                  {method.name} ({method.type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {selectedPaymentMethod && (
          <Grid item xs={12} className={classes.paymentSelect}>
            {selectedPaymentMethod.instructions && (
              <div className={classes.paymentInfo}>
                <strong>Instructions</strong>
                <p>{selectedPaymentMethod.instructions}</p>
              </div>
            )}
            {accountDetails && (
              <div className={classes.paymentInfo}>
                <strong>Account details</strong>
                <p>{accountDetails}</p>
              </div>
            )}
            <div className={classes.paymentInfo}>
              <strong>Amount to pay</strong>
              <p>{formatMoney(estimatedTotal * Number(selectedPaymentMethod.exchange_rate || 1), selectedPaymentMethod.currency || "USD")}</p>
            </div>
          </Grid>
        )}

        {usesTransfer && (
          <Grid item xs={12} className={classes.paymentSelect}>
            <TextField
              label="Transfer reference"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              fullWidth
              className={classes.input}
            />
            <TextField
              label="Reported amount"
              value={reportedAmount}
              onChange={(event) => setReportedAmount(event.target.value)}
              fullWidth
              className={classes.input}
              sx={{ marginTop: "15px !important" }}
            />
            <label className={classes.uploadButton}>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => setProof(event.target.files?.[0] || null)}
              />
              {proof ? proof.name : "Upload payment proof"}
            </label>
          </Grid>
        )}

        {deliveryType === "delivery" && authenticated && (
          <Grid item xs={12}>
            <p className={classes.total}>Choose a shipping address</p>

            <FormControl fullWidth className={classes.paymentSelect}>
              <InputLabel id="address-select-label" className={classes.selectLabel}>Address</InputLabel>
              <Select
                labelId="address-select"
                value={addressId}
                label="Address"
                onChange={(event) => setAddressId(event.target.value)}
                fullWidth
                className={classNames(classes.input)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {addresses.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {parseAddressValue(item.address)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        {!authenticated && (
          <Grid item xs={12}>
            <p className={classes.total}>User information</p>
            <Grid item xs={12} alignContent={"center"} className={classes.userInfo}>
              <TextField label="Name" value={guest.name} onChange={(event) => setGuest((prev) => ({ ...prev, name: event.target.value }))} fullWidth className={classes.input} />
              <TextField label="Phone" value={guest.phone} onChange={(event) => setGuest((prev) => ({ ...prev, phone: event.target.value }))} fullWidth className={classes.input} sx={{ marginTop: "15px !important" }} />
              <TextField label="Email" value={guest.email} onChange={(event) => setGuest((prev) => ({ ...prev, email: event.target.value }))} fullWidth className={classes.input} sx={{ marginTop: "15px !important" }} />
              {deliveryType === "delivery" && (
                <TextField label="Shipping address" value={guestAddress} onChange={(event) => setGuestAddress(event.target.value)} fullWidth className={classes.input} sx={{ marginTop: "15px !important" }} />
              )}
            </Grid>
          </Grid>
        )}

        {authenticated && user && (
          <Grid item xs={12}>
            <p className={classes.total}>Ordering as {user.first_name} {user.last_name}</p>
          </Grid>
        )}

        <Grid item xs={12} container justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Ordering..." : "Order"}
          </Button>
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
    fontWeight: "300"
  },
  table: {
    marginTop: "10px !important",
    borderRadius: "4px !important",
    "& thead th": {
      borderBottom: "none !important",
    },
    "& tbody th": {
      backgroundColor: "#F5EEE6",
      borderBottom: "none !important",
    },
  },
  subtitle: {
    color: "#000000 !important",
    fontSize: "18px !important",
    lineHeight: "20px !important",
    margin: "20px 0 15px"
  },
  total: {
    maxWidth: 600,
    margin: "0 auto",
    marginTop: 30,
    marginBottom: 15,
    fontSize: 18,
    fontFamily: 'Open Sans',
    "& p": {
      marginTop: "10px !important",
      marginBottom: "0 !important",
    }
  },
  divider: {
    maxWidth: 600,
    margin: "30px auto 0px auto !important",
  },
  paymentSelect: {
    display: "flex !important",
    flexDirection: "column !important",
    justifyContent: "center !important",
    maxWidth: 600,
    margin: "10px auto 0 auto !important",
  },
  userInfo: {
    maxWidth: 600,
  },
  selectLabel: {
    fontSize: "16px !important"
  },
  formControlLabel: {
    fontSize: "16px !important",
  },
  input: {
    "& .MuiInputBase-root": {
      fontSize: "16px !important",
    },
  },
  paymentInfo: {
    backgroundColor: "#F5EEE6",
    border: "1px solid #E6A4B4",
    borderRadius: 4,
    marginTop: 12,
    padding: "12px 14px",
    whiteSpace: "pre-line",
    "& strong": {
      display: "block",
      fontSize: 15,
      marginBottom: 4,
    },
    "& p": {
      margin: "0 !important",
      fontSize: 15,
      lineHeight: "22px",
    },
  },
  uploadButton: {
    marginTop: "15px",
    padding: "14px 21px",
    backgroundColor: "#C86B85",
    color: "#fff",
    fontFamily: "Open Sans",
    cursor: "pointer",
    "& input[type='file']": {
      display: "none",
    },
  },
  button: {
    margin: "60px auto 0px !important"
  },
}));

export default ShoppingCart;
