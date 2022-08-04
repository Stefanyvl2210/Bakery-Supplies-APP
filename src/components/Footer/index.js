import * as React from "react";


import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import Logo from "../../assets/images/footer-logo.svg";
import LogoFB from "../../assets/images/facebook-logo.svg";
import LogoIG from "../../assets/images/instagram-logo.svg";

import {Box, Grid} from '@mui/material';

export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
    >
        
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ backgroundColor: '#C86B85' ,
                    paddingTop: '20px',
                    paddingRight: '80px',
                    paddingLeft: '80px',
                    paddingBottom: '20px'}}
        >
            <Grid 
                container
                direction="column"
                alignItems="flex-start"
                item
                xs={6}
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
                alignContent="flex-end"
                xs={6}
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
        fontSize: '14px !important',
        lineHeight: '20px !important',
        justifyContent: "start !important"
    }
}));
