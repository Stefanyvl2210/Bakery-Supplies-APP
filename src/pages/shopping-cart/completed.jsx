import React, { useEffect, useState } from "react";

// material ui components
import { Grid, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import { useLocation, useNavigate } from "react-router-dom";

// images
import CheckCirle from "../../assets/images/check-circle.svg";
import { addOrder, allOrders } from "../../features/order/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, deleteAllProducts } from "../../features/counter/counterSlice";

const formatDate = (date) => {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();

  return mm + '-' + dd + '-' + yyyy;
}

function createData(product, unitPrice, quantity, subtotal) {
  return { product, unitPrice, quantity, subtotal };
}

const OrderCompleted = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const orders = useSelector(allOrders);

  const [products, setProducts] = useState(useSelector(allProducts));
  const [orderInfo, setOrderInfo] = useState({});

  const handleOrder = () => {
    //guardar orden y enviar data
    dispatch( addOrder({orderInfo: orderInfo, orderProducts: products}) );
    dispatch( deleteAllProducts() );
    navigate("/order-detail", { state: { orderInfo: orderInfo, products: products } })
  }

  useEffect(() => {
    state.orderInfo.id = (orders.length + 1);
    state.orderInfo.createdDate = new Date();
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
      <Grid container className={classes.container} justifyContent="center">
        <Grid item xs={12}>
          <h2 className={classes.title}>Your order has been placed!</h2>
        </Grid>
        <Grid item xs={12} className={classes.content}>
            <Typography className={classes.text}>
                Thank you for ordering with us, we have sent you an email with all the details.
            </Typography>
            <img src={CheckCirle} width={200} height={200} alt="Order Completed" />
            <Button
                color="primary"
                type="submit"
                variant="contained"
                className={classes.button}
                onClick={() => handleOrder()}
            >
                <span className={classes.buttonText}>Next</span>
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
    fontWeight: "300",
    [theme.breakpoints.down('sm')]: {
      lineHeight: '42px !important',
    },
  },
  text: {
    fontSize: "20px !important",
    lineHeight: "26px !important",
    fontWeight: "300 !important",
    marginBottom: "30px !important"
  },
  buttonWrapper: {
    marginTop: 37,
  },
  button: {
    margin: '30px 0 0 0 !important'
  },
  content: {
    maxWidth: "500px !important",
    display: "flex",
    flexDirection: "column !important",
    alignItems: "center",
    textAlign: "center",
  }
}));

export default OrderCompleted;
