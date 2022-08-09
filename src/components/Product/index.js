import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Muffin from "../../assets/images/muffin.png";
import Cheesecake from "../../assets/images/cheesecake.png";
import FrenchToast from "../../assets/images/frenchToast.png";
import BakingSheet from "../../assets/images/baking-sheet.png";
import Strainer from "../../assets/images/strainer.png";
import CakeTable from "../../assets/images/cake-table.png";
import CustomDialog from "../productModal";
import { Link, useLocation, useNavigate } from "react-router-dom";

const productList = [
  {
    name: "Baking sheet",
    image: BakingSheet,
    alt: "BakingSheet",
    price: 7,
    category: "utensils-and-ingredients",
    description:
      "Specially designed to bake all your ideas, created with a thin copper layer that allows an excellent heat distribution. Our baking sheet allows your entire recipe to bake evenly.",
  },
  {
    name: "Cake table",
    image: CakeTable,
    alt: "table",
    price: 5,
    category: "utensils-and-ingredients",
    description:
      "Excellent design, weighing to address a good amount of weight, allows you to hold cakes of any size, the materials with which it is made make its strength and durability are superior to any other you can find.",
  },
  {
    name: "Strainer",
    image: Strainer,
    alt: "strainer",
    price: 3,
    category: "utensils-and-ingredients",
    description:
      "With a layer of aluminum and metal this strainer will allow you to separate those big things from your small ingredients, durability assured, stainless and strong. Its size is regular.",
  },
  {
    name: "Cupcake",
    image: Muffin,
    alt: "Cupcake",
    price: 2,
    category: "dessert",
    description:
      "Introducing our passion cupcake, soft, fluffy and delicious, this cupcake is created with the finest ingredients that allow an incredible texture and flavor, plus, a whipped cream with a balanced flavor but that does not go unnoticed, not to mention, our special touch, the secret ingredient that we sprinkle on top to complement incredible flavor.",
  },
  {
    name: "Cheesecake",
    image: Cheesecake,
    alt: "Cheesecake",
    price: 8,
    category: "dessert",
    description:
      "This is our cheesecake, after so many attempts we managed to get a unique texture, delicious flavor, bathed in our also special homemade jelly and finally we found that complement above that visually general a disturbing temptation to eat it and in turn a chocolate flavor that contrasts perfectly everything else.",
  },
  {
    name: "French Toast",
    image: FrenchToast,
    alt: "French toast",
    price: 7,
    category: "dessert",
    description:
      "Dessert brought from France, we took all the incredible that this dessert already included and gave it our personal touch, three layers of flavor, citric and sweet, here you will find a great combination that will make your palate fall in love.",
  },
];

const Product = () => {
  const classes = useStyles();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const navigate = useNavigate();

  const handleDetail = (product) => {

    let relatedProducts = [];
    productList.map((elem) => {
      if(elem.category == product.category && elem.name != product.name) {
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
