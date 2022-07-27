import React from "react";

import { makeStyles } from "@mui/styles";
import { Button, Divider, Grid, Typography } from "@mui/material";

// images
import Homepage from "../../assets/images/homepage.png";
import Dessert from "../../assets/images/home-desserts.png";
import Utensil from "../../assets/images/home-utensils.png";
import step1 from "../../assets/images/shopping-bag.svg";
import step2 from "../../assets/images/shopping-cart.svg";
import step3 from "../../assets/images/truck.svg";
import { useNavigate, useLocation } from "react-router-dom";

const dessert = {
  name: "Desserts",
  description:
    "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
};

const utensil = {
  name: "Utensils and Ingredients",
  description:
    "Aliquyam clita sed lorem diam. Sanctus feugait rebum sea dolor te elitr cum clita augue veniam takimata feugiat vero dolore amet dolore. Autem nulla dolore dolore vulputate et justo ea ut labore accumsan at et nulla nostrud. Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. Takimata sit ut rebum nisl diam ea amet labore ut elitr.",
};

const Home = () => {
  const navigate = useNavigate();
  
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <img src={Homepage} width={570} height={352} alt="dessert" />
        </Grid>
        <Grid item xs={12}>
          <h4 className={classes.title}>How it works?</h4>
          
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={12} md={6} className={classes.imageWrapper}>
          <img src={Dessert} width={570} height={352} alt="dessert" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <h4 className={classes.title}>{dessert.name}</h4>

          <Typography gutterBottom className={classes.description}>
            {dessert.description}
          </Typography>

          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => navigate('/products', {state: {
                category: 'dessert'
              }})}
            >
              See More
            </Button>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={6}>
          <h4 className={classes.title}>{utensil.name}</h4>

          <Typography gutterBottom className={classes.description}>
            {utensil.description}
          </Typography>

          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => navigate('/products', {state: {
                category: 'utensils-and-ingredients'
              }})}
            >
              See More
            </Button>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.imageWrapper}>
          <img src={Utensil} width={570} height={352} alt="utensil" />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <h4 className={classes.title}>About Us</h4>
          <Typography className={classes.aboutDescription}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, Dolor sea sed euismod amet dolores tempor elitr. Feugiat est justo. 
          Takimata sit ut rebum nisl diam ea amet labore ut elitr
          </Typography>
        </Grid>

      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1280,
    margin: "80px auto !important",
  },
  title: {
    fontFamily: 'Poiret One',
    margin: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "400",
    marginBottom: "30px !important",
  },
  // divider: {
  //   // margin: "50px 0 !important",
  // },
  aboutDescription: {
    maxWidth: 800,
    width: "100%",
    margin: "0 auto !important",
    fontWeight: "300 !important",
    fontSize: "20px !important",
    lineHeight: "24px !important",
    textAlign: "center"
  },
  description: {
    maxWidth: 500,
    width: "100%",
    margin: "0 auto !important",
    fontWeight: "300 !important",
    fontSize: "20px !important",
    lineHeight: "24px !important",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    color: "#fff",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default Home;
