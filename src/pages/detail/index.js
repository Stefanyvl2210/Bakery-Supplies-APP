import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
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

  return (
    <div className={classes.container}>
      <Grid container>
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

        <Grid item xs={12} sm={12} md={6}>
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
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "60px 0 10px 0",

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
  },
  productImage: {
    width: "100%",
    "@media (max-width: 600px)": {
      width: "90%",
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
    "@media (max-width: 600px)": {
      textAlign: "center",
      fontSize: 18,
    },
  },
  description: {
    margin: "0 auto",
    fontWeight: "300 !important",

    "@media (max-width: 600px)": {
      textAlign: "center",
      padding: "0 20px",
    },
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
      justifyContent: "center",
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
    minWidth: "0 !important",
    width: "70px !important",
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
