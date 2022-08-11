import React, { useEffect, useState } from "react";

// components
import Table from "../../components/table";
import ResumeTable from "../../components/ResumeTable";

/*
* Shopping Cart
*/
import shoppingCart from "../../utils/shoppingCart";

// material ui components
import { 
  Grid, 
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";

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

const formatDate = (date) => {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();

  return mm + '-' + dd + '-' + yyyy;
}

const OrderDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [products, setProducts] = useState(shoppingCart().listCart());
  const [orderInfo, setOrderInfo] = useState({});

  const handleResetCart = () => {
    sessionStorage.removeItem("shoppingCart")
    navigate('/')
  }

  useEffect(() => {
    state.orderInfo.stringDate = formatDate(state.orderInfo.deliveryTime);
    state.orderInfo.stringCreatedDate = formatDate(state.orderInfo.createdDate);
    
    const formatProducts = products.map(item => {
      let subtotal = parseInt(item.price) * parseInt(item.qty);
      return createData(item.name, item.price, item.qty, parseInt(subtotal));
    });
    setProducts(formatProducts)
    setOrderInfo(state.orderInfo);

  }, []);

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Order detail</h2>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center" sx={{marginTop: "5px !important"}}>
          <Grid container justifyContent="space-between" maxWidth={600}>
            <Grid item xs={12} md={6}>
              <Typography sx={{fontSize: "20px !important", fontWeight: "300 !important"}}>Order #{orderInfo.id}</Typography>
            </Grid>
            <Grid item xs={12} md={6} display="flex" justifyContent="flex-end" >
              <Typography sx={{fontSize: "20px !important", fontWeight: "300 !important"}}>Order Date: {orderInfo.stringCreatedDate}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          className={classes.table}
          sx={{marginTop: "15px !important"}}
        >
          <ResumeTable orderDetails={orderInfo} maxWidth={600} />
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
            onClick={() => handleResetCart()}
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
    marginTop: "45px !important",
    borderRadius: "4px !important",
    "& table": {
      minWidth: "485px",
    },
    "& thead": {
      "& th": {
        backgroundColor: "#F5EEE6",
        borderBottom: "1px solid #AAAAAA !important",
        fontSize: "16px",
        fontWeight: "400",
        padding: "10px 25px"
      },
    },
    "& tbody": {
      "& th": {
        backgroundColor: "#F5EEE6",
        borderBottom: "none !important",
        fontSize: "14px",
        fontWeight: "300",
        padding: "10px 25px"
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

export default OrderDetail;
