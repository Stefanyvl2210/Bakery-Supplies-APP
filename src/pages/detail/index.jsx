import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Alert, Button, Divider, Grid, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCartProduct, allProducts } from "../../features/counter/counterSlice";

// carousel
import RelatedProducts from "../../components/ProductCarousel";
import { useLocation } from "react-router-dom";
import { getImageUrl } from "../../helpers/formatters";
import {
  clampQuantity,
  getAvailableStock,
  getRemainingStock,
} from "../../helpers/stock";

export default function CustomDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const product = state?.product;
  const relatedProducts = state?.relatedProducts || [];
  const cartProducts = useSelector(allProducts);
  const availableStock = getAvailableStock(product);
  const remainingStock = getRemainingStock(product, cartProducts);
  const isOutOfStock = availableStock === 0;
  const isMaximumInCart = !isOutOfStock && remainingStock === 0;

  const [quantity, setQuantity] = React.useState(() =>
    remainingStock > 0 ? 1 : 0
  );
  const [openSnack, setOpenSnack] = React.useState(false);

  React.useEffect(() => {
    setQuantity((currentQuantity) =>
      clampQuantity(currentQuantity, remainingStock)
    );
  }, [product?.id, remainingStock]);

  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <div className={classes.container}>
      <Grid 
        container 
        columnSpacing={{ xs: 0, md: 3 }} 
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={getImageUrl(product?.image)}
            alt="detail"
            className={classes.productImage}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} >
          <div className={classes.productContent}>
            <h4 className={classes.productName}>{product?.name}</h4>

            <Typography fontSize={16} className={classes.description}>
              {product?.description}
            </Typography>

            <div>
              <p className={classes.stock}>Available: {remainingStock}</p>
              <p className={classes.price}>Price: ${product?.price}</p>

              <div className={classes.quantityWrapper}>
                <span>Quantity:</span>

                <div className={classes.counter}>
                  <span
                    aria-disabled={quantity <= 1 || remainingStock === 0}
                    className={
                      quantity <= 1 || remainingStock === 0
                        ? classes.disabledControl
                        : ""
                    }
                    onClick={() =>
                      setQuantity((current) =>
                        clampQuantity(current - 1, remainingStock)
                      )
                    }
                  >
                    -
                  </span>
                  <TextField
                    className={classes.quantityInput}
                    variant="outlined"
                    value={quantity}
                    type="number"
                    disabled={remainingStock === 0}
                    inputProps={{ min: 1, max: remainingStock, step: 1 }}
                    onChange={(event) =>
                      setQuantity(
                        clampQuantity(event.target.value, remainingStock)
                      )
                    }
                  />
                  <span
                    aria-disabled={
                      quantity >= remainingStock || remainingStock === 0
                    }
                    className={
                      quantity >= remainingStock || remainingStock === 0
                        ? classes.disabledControl
                        : ""
                    }
                    onClick={() =>
                      setQuantity((current) =>
                        clampQuantity(current + 1, remainingStock)
                      )
                    }
                  >
                    +
                  </span>
                </div>
              </div>
            </div>

            <div className={classes.buttonWrapper}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                disabled={!product || remainingStock === 0}
                onClick={() => {
                  dispatch(
                    addCartProduct({
                      id: product?.id,
                      name: product?.name,
                      price: product?.price,
                      image: product?.image,
                      quantity_available: availableStock,
                      qty: quantity,
                    })
                  )
                  handleClick()
                }}
              >
                {isOutOfStock
                  ? "Out of stock"
                  : isMaximumInCart
                    ? "Maximum in cart"
                    : "Add to Cart"}
              </Button>
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={12}>
          <h3 className={classes.relatedProductsTitle}>Related Products</h3>
          <RelatedProducts products={relatedProducts} />
        </Grid>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar 
            open={openSnack} 
            autoHideDuration={2000} 
            onClose={handleCloseSnack} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={handleCloseSnack} 
              severity="success" 
              sx={{ 
                width: '100%', 
                alignItems: "center", 
                color: "#fff !important", 
                background: "#3eac43",
                "& svg": {
                  color: "#fff"
                }
              }}
            >
              Product added to cart!
            </Alert>
          </Snackbar>
        </Stack>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1140,
    margin: "60px auto 24px !important",
    [theme.breakpoints.up('md')]: {
      padding: "0 50px !important",
    },
    [theme.breakpoints.down('md')]: {
      margin: "140px auto 24px !important",
      padding: "0 50px !important",
    },
    [theme.breakpoints.down('sm')]: {
      margin: "140px auto 24px !important",
      padding: "0 36px !important",
    },

    "& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },

    "input[type=number]": {
      MozAppearance: "textfield",
    },
  },
  title: {
    margin: "20px 0 !important",
  },
  productContent: {
    width: "100%",
    maxWidth: "474px",
    margin: "0 auto",
    [theme.breakpoints.down('sm')]: {
      maxWidth: "100%",
    },
  },
  productImage: {
    width: "100%",
    maxHeight: 420,
    objectFit: "contain",
    [theme.breakpoints.down('md')]: {
      marginBottom: 30,
    },
  },
  productName: {
    margin: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "400",
    marginBottom: "30px !important",
    fontFamily: "Poiret One",
  },
  price: {
    marginBottom: "8px",
    "@media (max-width: 600px)": {
      // textAlign: "center",
      fontSize: 18,
    },
  },
  stock: {
    margin: "16px 0 0",
    fontWeight: 600,
  },
  description: {
    margin: "0 auto",
    fontWeight: "300 !important",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 30,
  },
  quantityWrapper: {
    display: "flex",
    alignItems: "center",

    "@media (max-width: 600px)": {
      marginTop: 20,
    },
  },
  counter: {
    marginLeft: 20,
    display: "flex",
    alignItems: "center",
    border: "1px solid #000",
    borderRadius: 10,
    padding: "0 10px",

    "& span": {
      fontSize: 20,
      cursor: "pointer",
      paddingBottom: 5,
    },
  },
  disabledControl: {
    cursor: "not-allowed !important",
    opacity: 0.35,
    pointerEvents: "none",
  },
  quantityInput: {
    minWidth: "40px !important",
    width: "100% !important",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff !important",
      },
      borderWidth: "0px !important",
      width: "70px !important",
    },
  },
  relatedProductsTitle: {
    font: "400 40px/20px Poiret One",
    textAlign: "center",
    marginBottom: 66,
  },
  button: {
    width: "auto",
    minWidth: 150,
    height: 50,
    padding: "0 24px !important",
    whiteSpace: "nowrap",
  },
  divider: {
    margin: "32px 0 !important",
  },
}));
