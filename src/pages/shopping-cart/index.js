import React, { useEffect, useState } from "react";

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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { allProducts } from "../../features/counter/counterSlice";
import { useSelector } from "react-redux";
import { token } from "../../features/auth/AuthSlice";
import { getAddressUser } from "../../helpers/api/auth";

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
  const userIsLogged = useSelector(token);
  const [payment, setPayment] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState(0);
  const [totalBeforeTaxes, setTotalBeforeTaxes] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [products, setProducts] = useState(useSelector(allProducts));
  const [allAddresses, setAllAddresses] = useState([]);

  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleChangeDelivery = (event) => {
    setDelivery(parseFloat(event.target.value));
  };

  const getAddresses = async () => {
    try {
      const newAddresses = await getAddressUser(userIsLogged);
      let addressFormat = newAddresses.data.map((item) => {
        let addressJson = {
          id: item.id,
          address: JSON.parse(item.address)
        }
        return addressJson
      })
      setAllAddresses(addressFormat)
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleOrderInfo = () => {
    let expectedDelivery = '';
    let today = new Date();
    if(delivery === 3) {
      expectedDelivery = new Date(today.setDate(today.getDate() + 2))
    } else {
      expectedDelivery = new Date(today.setHours(today.getHours() + 12));
    }

    let orderInfo = {
      shippingAddress: address,
      paymentMethod: payment,
      deliveryValue: delivery,
      deliveryType: delivery === 3 ? 'standard' : "express",
      totalBeforeTaxes: totalBeforeTaxes,
      totalOrder: totalOrder,
      status: "In progress",
      deliveryTime: expectedDelivery,
    }

    if(address !== "" && payment !== "" && products.length > 0 && delivery !== 0) {
      navigate('/order-completed', {state: {orderInfo}});
    }
  }

  useEffect(() => {
    getAddresses();
    const formatProducts = products.map(item => {
      let subtotal = parseInt(item.price) * parseInt(item.qty);
      return createData(item.name, item.price, item.qty, parseInt(subtotal));
    });
    setProducts(formatProducts)
  }, []);

  useEffect(() => { 
    let totalbeftax = 0;
    let totOrder = 0;
    products.map(item => {
      totalbeftax += parseFloat(item.subtotal);
    });
    totOrder = (totalbeftax * 0.05) + totalbeftax + delivery;
    setTotalBeforeTaxes(totalbeftax);
    setTotalOrder(totOrder);
  }, [delivery]);

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
          <Table rows={products} columns={columns} maxWidth={600} minWidth={485} />
        </Grid>

        <Grid item xs={12}>
          <div className={classes.total}>
            <p>Delivery: ${delivery}</p>
            <p>Total before taxes: ${totalBeforeTaxes}</p>
            <p>Total: ${totalOrder}</p>
          </div>

          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={12}>
          <p className={classes.total}>Choose a payment method</p>

          <FormControl fullWidth className={classes.paymentSelect}>
            <InputLabel id="payment-select-label" className={classes.selectLabel} >Payment</InputLabel>
            <Select
              labelId="payment-select"
              id="payment-select"
              value={payment}
              label="filter"
              onChange={handleChangePayment}
              fullWidth
              className={classNames(classes.input)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              {/* <MenuItem value={20}>Option 2</MenuItem> */}
              {/* <MenuItem value={30}>Option 3</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <p className={classes.total}>Choose a shipping address</p>

          <FormControl fullWidth className={classes.paymentSelect}>
            <InputLabel id="address-select-label" className={classes.selectLabel}>Address</InputLabel>
            <Select
              labelId="address-select"
              id="address-select"
              value={address}
              label="filter"
              onChange={handleChangeAddress}
              fullWidth
              className={classNames(classes.input)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allAddresses &&
                allAddresses.map((item, i) => {
                  let addressString = `${item.address.address}, ${item.address.city}, ${item.address.state}`;
                  return <MenuItem key={i} value={item.id}>{addressString}</MenuItem>
                })
              }
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
              <FormControlLabel value={3} control={<Radio size="small" />} label={<Typography className={classes.formControlLabel}>Standard <span className={classes.grayText}>(1-2 working days)</span></Typography>} />
              <FormControlLabel value={5} control={<Radio size="small" />} label={<Typography className={classes.formControlLabel}>Express <span className={classes.grayText}>(12 hours, extra charge) </span></Typography>} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => handleOrderInfo()}
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
  paymentMethodText: {
    fontSize: 18,
  },
  paymentSelect: {
    display: "flex !important",
    justifyContent: "center !important",
    maxWidth: 600,
    margin: "10px auto 0 auto !important",
  },
  selectLabel: {
    fontSize: "16px !important"
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
  },
}));

export default ShoppingCart;
