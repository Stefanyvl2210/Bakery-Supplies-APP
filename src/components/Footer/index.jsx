import * as React from "react";


import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import Logo from "../../assets/images/footer-logo.svg";
import LogoFB from "../../assets/images/facebook-logo.svg";
import LogoIG from "../../assets/images/instagram-logo.svg";

import { Grid} from '@mui/material';

export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{fontFamily: "Open Sans"}}
    >
        
        <Grid
            container
            direction={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "center", sm: "space-between" }}
            alignItems="center"
            className={classes.footerContainer}
        >
            <Grid 
                container
                direction="column"
                alignItems="flex-start"
                item
                xs={12} sm={6}
            >
                <Grid item sx={{paddingLeft: '8px'}}>
                    <img src={Logo} alt="logo" />
                </Grid>
                <Button
                    color="inherit"
                    variant="text"
                    className={classes.menuItem}
                    onClick={() => navigate("/")}
                >
                Home
                </Button>

                <Button
                    color="inherit"
                    className={classes.menuItem}
                    onClick={() =>
                        navigate("/products", {
                          state: {
                            category: "dessert",
                            title: "Desserts",
                          },
                        })
                      }
                    >
                    Desserts
                </Button>

                <Button
                    color="inherit"
                    className={classes.menuItem}
                    onClick={() =>
                        navigate("/products", {
                          state: {
                            category: "utensils-and-ingredients",
                            title: "Utensils and Ingredients",
                          },
                        })
                      }
                    >
                    Utensils & ingredients
                </Button>
            </Grid>
            <Grid 
                container
                item
                direction="column"
                alignContent={{ xs: "flex-start", sm: "flex-end" }}
                xs={12} sm={6}
                sx={{ marginTop: { xs: "30px", sm: "0"}, padding: { xs: "0 8px"}}}
            >
                <Grid
                item 
                sx={{marginBottom:'40px'}}
                >
                    <Grid item sx={{marginBottom:'5px',
                                    fontWeight: 'bold'}}>Contact</Grid>
                    <Grid item sx={{marginBottom:'5px'}}>+58 414 1234 567</Grid>
                    <Grid item >bakerysupplies@contact.com</Grid>
                </Grid>
                
                <Grid
                item
                >
                    <Grid item sx={{marginBottom:'5px',
                                    fontWeight: 'bold'}}>
                        Follow Us
                    </Grid>
                    <Grid
                        container
                        item
                        direction="row"
                        
                    >
                        <Grid item sx={{marginRight:'10px'}}>
                            <img src={LogoFB} alt="logo" />
                        </Grid>
                        <Grid item>
                            <img src={LogoIG} alt="logo" />
                        </Grid> 
                    </Grid>
                </Grid>
            </Grid>
        </Grid> 

        <Grid
            container
            direction="row"
            justifyContent="center"
            sx={{ backgroundColor: '#E6A4B4' ,
            padding: '10px',
            }}
        >
            <p className={classes.subFooter}>
                ©2022 Bakery Supplies, LLC. All Rights Reserved.
            </p>
        </Grid>
    </Grid>
    
  );
}

const useStyles = makeStyles((theme) => ({
    subFooter: {
        margin: "0px",
        color: '#4E4E4E',
        fontWeight: '600'
    },
    menuItem: {
        fontWeight: '400 !important',
        lineHeight: '20px !important',
        justifyContent: "start !important",
        textTransform: "capitalize !important",
        fontSize: '16px !important'
    },
    footerContainer: {
        backgroundColor: '#C86B85',
        padding: "30px 100px !important",
        [theme.breakpoints.down('md')]: {
            padding: "30px 42px !important",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "30px 28px !important",
        },
    }
}));
