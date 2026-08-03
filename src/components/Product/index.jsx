import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomDialog from "../productModal";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../helpers/formatters";

const Product = (props) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const navigate = useNavigate();

  const handleDetail = (product) => {

    let relatedProducts = [];
    props.productList.map((elem) => {
      if(elem.id !== product.id && elem.name !== product.name) {
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
      {props.productList.map((product, i) => (
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
              <div className={classes.imageWrapper}>
                <img src={getImageUrl(product.image)} alt={product.name} />
              </div>

              <p className={classes.productName}>{product.name}</p>

              <div className={classes.buttonWrapper}>
                <Button
                  color="primary"
                  variant="contained"
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
                  className={classes.button}
                  onClick={() => handleDetail(product)}
                >
                  Details
                </Button>
              </div>
            </div>
          </Grid>
      ))}

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
    width: "100%",
    maxWidth: 330,
    minHeight: 390,
    display: "flex",
    flexDirection: "column",

    "& a": {
      textDecoration: "none",
    },
  },
  imageWrapper: {
    width: "100%",
    height: 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  productName: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: "34px",
    fontWeight: "400",
    marginTop: "30px !important",
    fontFamily: "Poiret One",
    marginBottom: "30px !important",
    minHeight: 68,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    marginTop: "auto",
  },
  button: {
    margin:"0px !important",
    padding:"0px !important",
    minWidth: "150px !important",
    height: "50px !important",
  }
}));

export default Product;
