import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Muffin from "../../assets/images/muffin.png";
// import Muffin from "../../assets/images/muffin.png";
// import Muffin from "../../assets/images/muffin.png";
import BakingSheet from "../../assets/images/baking-sheet.png";
import Strainer from "../../assets/images/strainer.png";
import CakeTable from "../../assets/images/cake-table.png";
import CustomDialog from "../productModal";
import { Link, useLocation } from "react-router-dom";

const productList = [
  {
    name: "Baking sheet",
    image: BakingSheet,
    alt: "BakingSheet",
    price: "$7",
    category: "utensils-and-ingredients",
    description:
      "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
  },
  {
    name: "Cake table",
    image: CakeTable,
    alt: "table",
    price: "$5",
    category: "utensils-and-ingredients",
    description:
      "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
  },
  {
    name: "Strainer",
    image: Strainer,
    alt: "strainer",
    price: "$3",
    category: "utensils-and-ingredients",
    description:
      "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
  },
  {
    name: "Cupcake",
    image: Muffin,
    alt: "Cupcake",
    price: "$2",
    category: "dessert",
    description:
      "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
  },
];

const Product = () => {
  const classes = useStyles();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  return (
    <>
      {productList.map((product, i) =>
        product.category == location.state.category ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            key={i}
            display="flex"
            justifyContent="center"
          >
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

                <Link to="/detail">
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                  >
                    Details
                  </Button>
                </Link>
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
    textAlign: "center",

    "& a": {
      textDecoration: "none",
    },
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
