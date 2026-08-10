import React from "react";

import { Button, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SnackBar from "../../../components/Snackbar";
import { useNavigate } from "react-router-dom";
import { createPaymentMethod } from "../../../helpers/api/paymentMethods";
import { getErrorMessage } from "../../../helpers/api/response";
import { LoadingButtonContent } from "../../../components/Loader";
import CustomInput from "../../../components/input";

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

const buildAccountDetails = (value) => {
  const details = value.trim();

  return details ? { details } : null;
};

const NewPaymentMethod = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [form, setForm] = React.useState(emptyForm);
  const [loading, setLoading] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleChange = (field) => (event) => {
    const value =
      field === "is_active" ? event.target.value === "true" : event.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createPaymentMethod({
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
        message: "Payment method created",
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
    } finally {
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
        <h1 className={classes.title}>Add new payment method</h1>

        <Divider className={classes.divider} />

        <form onSubmit={onSubmit}>
          <Grid container maxWidth={580}>
            <Grid item xs={12} className={classes.input}>
              <CustomInput
                field="name"
                label="Name"
                value={form.name}
                onChange={handleChange("name")}
                fullWidth
                width="100%"
                required
              />
            </Grid>

            <Grid item xs={12} className={classes.fieldsContainer}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.fieldsContainer}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6} className={classes.fieldEnd}>
                  <CustomInput
                    field="exchange_rate"
                    label="Exchange rate"
                    type="number"
                    value={form.exchange_rate}
                    onChange={handleChange("exchange_rate")}
                    fullWidth
                    width="100%"
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6} className={classes.fieldEnd}>
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
              </Grid>
            </Grid>


            <Grid item xs={12} className={classes.multilineInput}>
              <CustomInput
                field="instructions"
                label="Instructions"
                value={form.instructions}
                onChange={handleChange("instructions")}
                fullWidth
                width="100%"
                multiline
                minRows={4}
              />
            </Grid>

            <Grid item xs={12} className={classes.multilineInput}>
              <CustomInput
                field="account_details"
                label="Account details"
                value={form.account_details}
                onChange={handleChange("account_details")}
                fullWidth
                width="100%"
                multiline
                minRows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                disabled={loading}
              >
                {loading ? <LoadingButtonContent label="Saving…" /> : "Save"}
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
    margin: "0 auto",
  },

  title: {
    font: "400 36px/20px Open Sans",
    lineHeight: "1",
    margin: 0,
  },
  fieldsContainer: {
    margin: "20px 0 !important",
  },
  fieldEnd: {
    display: "flex",
    alignItems: "flex-end",
  },
  input: {
    '&:not(:first-child)': {
      marginTop: "20px !important",
    },
    marginBottom: "20px !important",
  },
  multilineInput: {
    margin: "20px 0 20px !important",
    "& .MuiInputBase-root": {
      alignItems: "flex-start",
      minHeight: 100,
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
  divider: {
    margin: "32px 0 !important",
  },
}));

export default NewPaymentMethod;
