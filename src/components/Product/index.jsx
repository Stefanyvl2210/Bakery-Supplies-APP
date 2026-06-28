import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomDialog from "../productModal";
import { useLocation, useNavigate } from "react-router-dom";

const Product = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const navigate = useNavigate();

  const handleDetail = (product) => {

    let relatedProducts = [];
    props.productList.map((elem) => {
      if(elem.category === product.category && elem.name !== product.name) {
        relatedProducts.push(elem);
      }
    })
    navigate("/detail", {
      state: {
        product: product,
        relatedProducts: relatedProducts,
      },
    })
  }

  return (
    <>
      {props.productList.map((product, i) =>
        product.category === location.state.category ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            key={i}
            display="flex"
            justifyContent="center"
          >
            <div className={classes.container}>
              <img src={product.image} alt={product.alt} width = "330" height = "220" />

              <p className={classes.productName}>{product.name}</p>

              <div className={classes.buttonWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{marginRight: '15px !important'}}
                  className={classes.button}
                  onClick={() => {
                    setOpenDialog(true);
                    setSelectedProduct(product);
                  }}
                >
                  Preview
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  sx={{marginLeft: '15px !important'}}
                  className={classes.button}
                  onClick={() => handleDetail(product)}
                >
                  Details
                </Button>
              </div>
            </div>
          </Grid>
        ) : (
          ""
        )
      )}

      {openDialog && (
        <CustomDialog
          open={openDialog}
          selectedProduct={selectedProduct}
          handleClose={() => {
            setOpenDialog(false);
            setSelectedProduct({});
          }}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 60,
    marginTop: 0,
    textAlign: "center",

    "& a": {
      textDecoration: "none",
    },
  },
  productName: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "400",
    marginTop: "30px !important",
    fontFamily: "Poiret One",
    marginBottom: "30px !important",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    margin:"0px !important",
    padding:"0px !important",
  }
}));

export default Product;
