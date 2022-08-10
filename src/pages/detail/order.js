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
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
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
  const [products, setProducts] = useState(shoppingCart().listCart());

  useEffect(() => {
    const formatProducts = products.map(item => {
      let subtotal = parseInt(item.price) * parseInt(item.qty);
      return createData(item.name, item.price, item.qty, parseInt(subtotal));
    });
    setProducts(formatProducts)
  }, []);

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Order detail</h2>
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

        <Grid item xs={12} container justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => navigate('/')}
          >
            Home
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
        backgroundColor: "#F5EEE6",
        borderBottom: "1px solid #AAAAAA !important",
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
