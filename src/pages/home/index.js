import React from "react";

import { makeStyles } from "@mui/styles";
import { Button, Divider, Grid, Typography, TextField, Paper } from "@mui/material";

// images
import Homepage from "../../assets/images/homepage.svg";
import Dessert from "../../assets/images/home-desserts.png";
import Utensil from "../../assets/images/home-utensils.png";
import step1 from "../../assets/images/shopping-bag.svg";
import step2 from "../../assets/images/shopping-cart.svg";
import step3 from "../../assets/images/truck.svg";
import EastIcon from '@mui/icons-material/East';
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
  const userIsLogged = localStorage.getItem('userLogged');

  const [values, setValues] = React.useState({
    email: '',
  });

  console.log('userLogged?', userIsLogged)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.bannerContainer}>
        <Grid container className={classes.container}>
          <Grid item xs={12} className={classes.banner}>
            <img src={Homepage} width={570} height={352} alt="Bakery Supplies" />
            <Typography className={classes.mainTitle}>
              Prepare your favorite recipe or buy your favorite dessert without leaving home!
            </Typography>
            <div className={classes.registerInput}>
              <TextField 
                id="email-register" 
                label="Email" 
                variant="outlined" 
                value={values.email}
                onChange={handleChange('email')}
              />
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={() => navigate('/register', {state: {
                  email: values.email
                }})}
              >
                Start
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
      
      <Grid container className={classes.container} justifyContent="space-evenly">
        <Grid item xs={12} className={classes.process}>
          <h4 className={classes.title}>How it works?</h4>
        </Grid>

        <Grid item xs={12} sm={4} md={4} className={classes.steps}>
          <img src={step1} width={60} height={60} alt="Step 1" />
          <EastIcon className={classes.iconSteps} />
          <Typography className={classes.textSteps}>
            Search our website for your favorite dessert or any ingredient you need for your recipe.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4} md={4} className={classes.steps}>
          <img src={step2} width={60} height={60} alt="Step 2" />
          <EastIcon className={classes.iconSteps} />
          <Typography className={classes.textSteps}>
            Add to shopping cart
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4} md={4} className={classes.steps}>
          <img src={step3} width={60} height={60} alt="Step 3" />
          <Typography className={classes.textSteps}>
            We deliver to your door
          </Typography>
        </Grid>

      </Grid>

      <Grid container className={classes.container}>
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

        <Grid item xs={12} sm={12} md={6}>
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
        <Grid item xs={12} sm={12} md={6} className={classes.imageWrapper}>
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
    margin: "60px auto !important",
  },
  mainTitle: {
    textAlign: "center",
    fontSize: "32px !important",
    fontWeight: "300 !important",
    lineHeight: "36px !important",
    margin: "25px auto !important",
    maxWidth: "576px",
    width: "100%"
  },
  title: {
    fontFamily: 'Poiret One',
    margin: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "400",
    marginBottom: "30px !important",
  },
  banner: {
    display: 'flex',
    flexDirection: 'column !important',
    alignItems: 'center',
    paddingBottom: "60px !important",
  },
  bannerContainer: {
    background: "#F5EEE6 !important",
    paddingTop: "60px !important",
    borderRadius: "0 !important",
    boxShadow: "none !important",
    "& .MuiGrid-container": {
      margin: "0 auto !important"
    }
  },
  registerInput: {
    display: "flex",
    alignItems: "center"
  },
  process: {
    marginTop: "60px",
  },
  steps: {
    maxWidth: "250px !important",
    width: "100%",
    display: "flex",
    flexDirection: "column !important",
    alignItems: "center",
    position: "relative"
  },
  iconSteps: {
    color: "#C86B85",
    position: "absolute",
    top: "40px",
    right: "-40%",
  },
  textSteps: {
    lineHeight: "22px !important",
    fontWeight: "300 !important",
    fontSize: "20px !important",
    marginTop: "25px !important",
    textAlign: "center"
  },
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
