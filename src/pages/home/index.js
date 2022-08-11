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
import { useNavigate } from "react-router-dom";

const dessert = {
  name: "Desserts",
  description:
    "Our specialty, desserts, here you can find all our extensive catalog of desserts along with each and every one of its details such as ingredients, flavors and nutritional information. Enter the wonderful world of sweets and all its delicacies, we are waiting for you!",
};

const utensil = {
  name: "Utensils and Ingredients",
  description:
    "Do you want to prepare your own incredible recipes? Here you can find everything you need, from a spoon to that jelly you like so much, come in and discover all our store of products prepared and specifically designed for the elaboration of your favorite recipes.",
};

const Home = () => {
  const navigate = useNavigate();
  const userIsLogged = localStorage.getItem('userLogged');
  
  const [values, setValues] = React.useState({
    email: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.bannerContainer}>
        <Grid container className={classes.container}>
          <Grid item xs={12} className={classes.banner}>
            <img src={Homepage} className={classes.image} alt="Bakery Supplies" />
            <Typography className={classes.mainTitle}>
              Prepare your favorite recipe or buy your favorite dessert without leaving home!
            </Typography>
            {!userIsLogged && (
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
            )}
          </Grid>
        </Grid>
      </Paper>
      <div className={classes.container}>
        <Grid 
          container 
          justifyContent="space-evenly" 
          sx={{ flexDirection: { xs: "column", md: "row"}, alignItems: { xs: "center", md: "flex-start"} }}
          columnSpacing={{ xs: 1 }} 
          rowSpacing={{ xs: 4, md: 0}}>
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

          <Grid item xs={12} sm={4} md={4} className={classes.steps} sx={{ margin: { xs: "40px 0", md: "0"}}}>
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
        <Divider />
        <Grid container columnSpacing={{ xs: 0, md: 6 }} rowSpacing={{ xs: 4, sm: 4}}>
          <Grid item xs={12} sm={12} md={6} className={classes.imageWrapper}>
            <img className={classes.image} src={Dessert} alt="dessert" />
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
                onClick={() =>
                  navigate("/products", {
                    state: {
                      category: "dessert",
                      title: "Desserts",
                    },
                  })
                }
              >
                See More
              </Button>
            </div>
          </Grid>
        </Grid>
        <Divider />
        <Grid container columnSpacing={{ xs: 0, md: 6 }} rowSpacing={{ xs: 4, sm: 4}} className={classes.utensilSection}>
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
                onClick={() =>
                  navigate("/products", {
                    state: {
                      category: "utensils-and-ingredients",
                      title: "Utensils and Ingredients",
                    },
                  })
                }
              >
                See More
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.imageWrapper}>
            <img src={Utensil} className={classes.image} alt="utensil" />
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={12}>
            <h4 className={classes.title}>About Us</h4>
            <Typography xs={12} className={classes.aboutDescription}>
            Bakery Supplies was born from a dream, we are a family that loves that incredible flavor that takes you to another universe, the sweet. With love and dedication we refine the classic recipes of your favorite desserts getting our magic touch. We offer you a great variety of desserts specially created with our famous recipe and at the same time we have at your disposal all the utensils you need so that you can make magic yourself and turn your favorite recipes into reality.

            </Typography>
          </Grid>

        </Grid>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1140,
    margin: "60px auto !important",
    [theme.breakpoints.down('lg')]: {
      padding: "0 50px !important",
    },
    [theme.breakpoints.down('md')]: {
      padding: "0 50px !important",
    },
    [theme.breakpoints.down('sm')]: {
      padding: "0 36px !important",
    },
  },
  image: {
    maxWidth: "570px",
    width: "100%",
    height: "100%",
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
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: "140px !important",
    },
  },
  registerInput: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      marginTop: "5px",
      "& button": {
        marginTop: "20px",
      }
    }
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
    [theme.breakpoints.up('md')]: {
      top: "80px !important",
      right: "-23%",
      transform: "rotate(0) !important"
    },
    [theme.breakpoints.up('xs')]: {
      top: "110%",
      transform: "rotate(90deg)"
    },
  },
  textSteps: {
    lineHeight: "22px !important",
    fontWeight: "300 !important",
    fontSize: "20px !important",
    marginTop: "25px !important",
    textAlign: "center"
  },
  aboutDescription: {
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
  utensilSection: {
    [theme.breakpoints.down('md')]: {
      flexDirection: "column-reverse !important",
      "& h4": {
        marginTop: "68px !important",
      }
    },
  }
}));

export default Home;
