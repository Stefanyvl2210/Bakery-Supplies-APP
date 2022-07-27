import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Muffin from "../../assets/images/muffin.png";
import CustomDialog from "../productModal";

const productList = [
  {
    name: "Baking sheet",
    image: Muffin,
    alt: "muffin",
    price: "$5",
    description:
      "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
  },
  {
    name: "Cake table",
    image: Muffin,
    alt: "table",
    price: "$5",
    description:
      "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
  },
  {
    name: "Strainer",
    image: Muffin,
    alt: "strainer",
    price: "$5",
    description:
      "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
  },
];

const Product = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  
  return (
    <>
      {productList.map((product, i) => (
        <Grid item xs={12} sm={12} md={4} key={i} display="flex" justifyContent="center">
          <div className={classes.container}>
            <img src={product.image} alt={product.alt} />

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
    marginTop: 67,
  },
  productName: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "400",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default Product;
