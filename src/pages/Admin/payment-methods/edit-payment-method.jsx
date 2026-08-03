import React, { useEffect } from "react";

import { Button, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SnackBar from "../../../components/Snackbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAdminPaymentMethods,
  updatePaymentMethod,
} from "../../../helpers/api/paymentMethods";
import { getErrorMessage, getResourceCollection } from "../../../helpers/api/response";

const emptyForm = {
  name: "",
  type: "cash",
  currency: "USD",
  exchange_rate: 1,
  instructions: "",
  account_details: "",
  is_active: true,
};

const currencyOptions = [
  { value: "USD", label: "USD - Dollars" },
  { value: "VES", label: "VES - Bolivares" },
  { value: "COP", label: "COP - Pesos" },
];

const stringifyAccountDetails = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join("\n");
  if (typeof value === "object") {
    if (typeof value.details === "string") return value.details;

    return Object.entries(value)
      .map(([key, entryValue]) => `${key}: ${entryValue}`)
      .join("\n");
  }

  return String(value);
};

const buildAccountDetails = (value) => {
  const details = value.trim();

  return details ? { details } : null;
};

const EditPaymentMethod = () => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = React.useState(emptyForm);
  const [loading, setLoading] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const loadPaymentMethod = async () => {
    try {
      const response = await getAdminPaymentMethods();
      const methods = getResourceCollection(response);
      const paymentMethod = methods.find(
        (method) => String(method.id) === String(params?.id)
      );

      if (!paymentMethod) {
        navigate("/admin/payment-methods");
        return;
      }

      setForm({
        name: paymentMethod.name || "",
        type: paymentMethod.type || "cash",
        currency: paymentMethod.currency || "USD",
        exchange_rate: paymentMethod.exchange_rate || 1,
        instructions: paymentMethod.instructions || "",
        account_details: stringifyAccountDetails(paymentMethod.account_details),
        is_active: Boolean(paymentMethod.is_active),
      });
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load payment method."),
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (!params?.id) navigate("/admin/payment-methods");
    loadPaymentMethod();
  }, []);

  const handleChange = (field) => (event) => {
    const value =
      field === "is_active" ? event.target.value === "true" : event.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await updatePaymentMethod(params.id, {
        name: form.name,
        type: form.type,
        currency: form.currency,
        exchange_rate: Number(form.exchange_rate || 1),
        instructions: form.instructions.trim() || null,
        account_details: buildAccountDetails(form.account_details),
        is_active: Boolean(form.is_active),
      });

      setOpenSnack({
        open: true,
        message: "Payment method edited successfully",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/admin/payment-methods");
      }, 1000);
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error),
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
      <div className={classes.container}>
        <h1 className={classes.title}>Edit payment method</h1>

        <Divider />

        <form onSubmit={onSubmit}>
          <Grid container maxWidth={550}>
            <Grid item xs={12} className={classes.input}>
              <TextField
                label="Name"
                value={form.name}
                onChange={handleChange("name")}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} className={classes.input}>
              <TextField
                select
                label="Type"
                value={form.type}
                onChange={handleChange("type")}
                fullWidth
                required
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="transfer">Transfer</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} className={classes.input}>
              <TextField
                select
                label="Currency"
                value={form.currency}
                onChange={handleChange("currency")}
                fullWidth
                required
              >
                {currencyOptions.map((currency) => (
                  <MenuItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} className={classes.input}>
              <TextField
                label="Exchange rate"
                type="number"
                value={form.exchange_rate}
                onChange={handleChange("exchange_rate")}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} className={classes.input}>
              <TextField
                select
                label="Active"
                value={String(form.is_active)}
                onChange={handleChange("is_active")}
                fullWidth
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} className={classes.multilineInput}>
              <TextField
                label="Instructions"
                value={form.instructions}
                onChange={handleChange("instructions")}
                fullWidth
                multiline
                minRows={4}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} className={classes.multilineInput}>
              <TextField
                label="Account details"
                value={form.account_details}
                onChange={handleChange("account_details")}
                fullWidth
                multiline
                minRows={4}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                disabled={loading}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>

      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
    </>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "1038px",
    margin: "0 auto",
  },

  title: {
    font: "400 36px/20px Open Sans",
  },
  input: {
    margin: "20px 0 !important",
  },
  multilineInput: {
    margin: "28px 0 20px !important",
    "& .MuiInputBase-root": {
      alignItems: "flex-start",
      minHeight: 120,
    },
    "& textarea": {
      fontSize: "16px !important",
      lineHeight: "22px !important",
    },
  },
  button: {
    backgroundColor: "#0978DE !important",
    margin: "20px 0 30px 0 !important",
  },
}));

export default EditPaymentMethod;
