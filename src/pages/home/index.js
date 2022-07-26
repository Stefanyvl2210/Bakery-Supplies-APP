import React from "react";

import { makeStyles } from "@mui/styles";
import { Button, Divider, Grid, Typography } from "@mui/material";

// images
import Dessert from "../../assets/images/home-desserts.png";
import Utensil from "../../assets/images/home-utensils.png";
import { Link, useHistory } from "react-router-dom";

const dessert = {
  name: "Desserts",
  description:
    "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
};

const utensil = {
  name: "Utensils & ingredients",
  description:
    "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
};

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={12} md={6} className={classes.imageWrapper}>
          <img src={Dessert} width={450} height={278} alt="dessert" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <h4 className={classes.productName}>{dessert.name}</h4>

          <Typography gutterBottom className={classes.description}>
            {dessert.description}
          </Typography>

          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => history.push('/products')}
            >
              See more
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} className={classes.divider}>
          <Divider />
        </Grid>

        <Grid item xs={6}>
          <h4 className={classes.productName}>{utensil.name}</h4>

          <Typography gutterBottom className={classes.description}>
            {utensil.description}
          </Typography>

          <div className={classes.buttonWrapper}>
            <Link to={"/products"}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
              >
                See more
              </Button>
            </Link>
            
          </div>
        </Grid>
        <Grid item xs={6} className={classes.imageWrapper}>
          <img src={Utensil} width={450} height={278} alt="utensil" />
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1360,
    margin: "80px auto !important",
  },
  title: {
    margin: "20px 0 !important",
  },
  productName: {
    margin: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "400",
    marginBottom: "30px !important",
  },
  divider: {
    margin: "50px 0 !important",
  },
  description: {
    maxWidth: 400,
    margin: "0 auto !important",
    textAlign: "center",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 40,
    textTransform: "none !important",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default Home;
