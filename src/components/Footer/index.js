import * as React from "react";


import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import Logo from "../../assets/images/footer-logo.svg";
import LogoFB from "../../assets/images/facebook-logo.svg";
import LogoIG from "../../assets/images/instagram-logo.svg";
import LoginIcon from "@mui/icons-material/Login";

import {Box, Grid} from '@mui/material';

export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
    >
        
        <Grid
            container
            item
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
                item
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                xs={6}
                
                //className={classes.links}
            >
                <Grid item sx={{paddingLeft: '10px'}}>
                    <img src={Logo} alt="logo" />
                </Grid>
                <Button
                    color="inherit"
                    variant="text"
                    className={location.pathname === "/cart" ? classes.underlined : ""}
                    onClick={() => navigate("/")}
                >
                Home
                </Button>

                <Button
                    color="inherit"
                    className={location.pathname === "/products" && location.state.category == "dessert" ? classes.underlined : ""}
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
                    className={location.pathname === "/" ? classes.underlined : ""}
                    onClick={() => navigate("/")}
                    >
                    Utensils & ingredients
                </Button>
            </Grid>
            <Grid 
                container
                item
                direction="column"
                justifyContent="space-between"
                alignContent="flex-end"
                xs={6}
                //className={classes.contact}
            >
                <Grid
                item
                direction="column"
                sx={{marginBottom:'40px'}}
                >
                    <Grid item sx={{marginBottom:'5px',
                                    fontWeight: 'bold'}}>Contact</Grid>
                    <Grid item sx={{marginBottom:'5px'}}>+58 414 1234 567</Grid>
                    <Grid item >bakerysupplies@contact.com</Grid>
                </Grid>
                
                <Grid
                item
                direction="column"
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
            alignItems="center"
            sx={{ backgroundColor: '#E6A4B4' ,
            padding: '10px',
            color: '#4E4E4E'}}
        >
            <Box>
                ©2022 Bakery Supplies, LLC. All Rights Reserved.
            </Box>
        </Grid>
    </Grid>
    
  );
}

const useStyles = makeStyles((theme) => ({
    links: {
        display: "flex !important",
        flexDirection: "column !important"
         
    },
    titles:{

    }
}));
