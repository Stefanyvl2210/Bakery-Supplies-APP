import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Alert, Button, Divider, Grid, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../features/counter/counterSlice";

// carousel
import RelatedProducts from "../../components/ProductCarousel";
import { useLocation } from "react-router-dom";

export default function CustomDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [quantity, setQuantity] = React.useState(1);
  const [openSnack, setOpenSnack] = React.useState(false);

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
            src={state.product.image}
            alt="detail"
            className={classes.productImage}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} >
          <div className={classes.productContent}>
            <h4 className={classes.productName}>{state.product.name}</h4>

            <Typography fontSize={16} className={classes.description}>
              {state.product.description}
            </Typography>

            <div>
              <p className={classes.price}>Price: ${state.product.price}</p>

              <div className={classes.quantityWrapper}>
                <span>Quantity:</span>

                <div className={classes.counter}>
                  <span
                    onClick={() =>
                      setQuantity((prev) => {
                        if (prev > 1) return (prev -= 1);
                        return 1;
                      })
                    }
                  >
                    -
                  </span>
                  <TextField
                    className={classes.quantityInput}
                    variant="outlined"
                    value={quantity}
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <span onClick={() => setQuantity((prev) => (prev += 1))}>
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
                onClick={() => {
                  dispatch(
                    addCartProduct({
                      name: state.product.name,
                      price: state.product.price,
                      qty: quantity,
                    })
                  )
                  handleClick()
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Divider></Divider>
        </Grid>

        <Grid item xs={12}>
          <h3 className={classes.relatedProductsTitle}>Related Products</h3>
          <RelatedProducts products={state.relatedProducts} />
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
    marginBottom: "4px",
    "@media (max-width: 600px)": {
      // textAlign: "center",
      fontSize: 18,
    },
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
    width: 150,
    height: 50,
  },
}));
