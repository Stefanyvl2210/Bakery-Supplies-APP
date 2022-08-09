import React, { useEffect, useState } from "react";

// components
import Table from "../../components/table";

/*
* Shopping Cart
*/
import shoppingCart from "../../utils/shoppingCart";

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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function createData(product, unitPrice, quantity, subtotal) {
  return { product, unitPrice, quantity, subtotal };
}


const columns = [
  {
    name: "Product",
    key: "product",
  },
  {
    name: "Unit price",
    key: "unitPrice",
  },
  {
    name: "Quantity",
    key: "quantity",
  },
  {
    name: "Subtotal",
    key: "subtotal",
  },
];

const ShoppingCart = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [filter, setFilter] = useState(10);
  const [delivery, setDelivery] = useState('');
  const [products, setProducts] = useState(shoppingCart().listCart());

  useEffect(() => {
    const formatProducts = products.map(item => {
      let subtotal = item.price*item.qty;
      return createData(item.name, item.price, item.qty, subtotal);
    });
    setProducts(formatProducts)
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const handleChangeDelivery = (event) => {
    setDelivery(event.target.value);
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Shopping Cart</h2>
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          className={classes.table}
        >
          <Table rows={products} columns={columns} maxWidth={600} />
        </Grid>

        <Grid item xs={12}>
          <div className={classes.total}>
            <p>Delivery: $3</p>
            <p>Total before taxes: $0</p>
            <p>Total: $0</p>
          </div>

          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={12}>
          <p className={classes.total}>Choose a payment method</p>

          <FormControl fullWidth className={classes.paymentSelect}>
            <InputLabel id="payment-select-label">Payment</InputLabel>
            <Select
              labelId="payment-select"
              id="payment-select"
              value={filter}
              label="filter"
              onChange={handleChange}
              fullWidth
              className={classNames(classes.input)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
              <MenuItem value={30}>Option 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <p className={classes.total}>Choose a shipping address</p>

          <FormControl fullWidth className={classes.paymentSelect}>
            <InputLabel id="address-select-label">Address</InputLabel>
            <Select
              labelId="address-select"
              id="address-select"
              value={filter}
              label="filter"
              onChange={handleChange}
              fullWidth
              className={classNames(classes.input)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
              <MenuItem value={30}>Option 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth className={classes.paymentSelect}>
            <FormLabel id="demo-controlled-radio-buttons-group" className={classes.subtitle}>Choose a delivery option</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={delivery}
              onChange={handleChangeDelivery}
            >
              <FormControlLabel value="standard" control={<Radio size="small" />} label={<Typography className={classes.formControlLabel}>Standard <span className={classes.grayText}>(1-2 working days)</span></Typography>} />
              <FormControlLabel value="express" control={<Radio size="small" />} label={<Typography className={classes.formControlLabel}>Express <span className={classes.grayText}>(12 hours, extra charge) </span></Typography>} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => navigate('/order-completed')}
          >
            Order
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1280,
    margin: "60px auto !important",
    [theme.breakpoints.down('md')]: {
      margin: "140px auto !important",
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
    marginTop: "45px !important",
    borderRadius: "4px !important",
    "& thead": {
      "& th": {
        borderBottom: "none !important",
      },
    },
    "& tbody": {
      "& th": {
        backgroundColor: "#F5EEE6",
        borderBottom: "none !important",
      },
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
  },
  divider: {
    maxWidth: 600,
    margin: "30px auto 0px auto !important",
  },
  paymentMethodText: {
    fontSize: 18,
  },
  paymentSelect: {
    display: "flex !important",
    justifyContent: "center !important",
    maxWidth: 600,
    margin: "10px auto 0 auto !important",
  },
  formControlLabel: {
    fontSize: "16px !important",
  },
  grayText: {
    fontSize: "14px !important",
    lineHeight: "20px !important",
    color: "#767676",
  },
  button: {
    margin: "60px auto 0px !important"
  }
}));

export default ShoppingCart;
