import React, { useState } from "react";

import classnames from "classnames";

// material ui components
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Product from "../../components/Product";
import { useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} > 
          <h2 className={classes.title}>{location.state.title}</h2>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems="flex-end"
          sx={{maxWidth: 1440}}
        >
          <Grid 
            className={classnames(classes.inputContent)} 
          > 
            <TextField
              field="search"
              width="300px !important"
              label="Search"
              onChange={setSearch}
              fullWidth
              className={classes.input}
              sx={{fontSize: "18px !important", lineHeight: "20px !important"}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            className={classnames(classes.inputContent, classes.filter)}
          >
            <FormControl size="small" style={{minWidth: 300}}>
              <InputLabel id="demo-simple-select-label" sx={{fontSize: "18px !important"}}>Filter by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="filter by"
                placeholder="filter by..."
                onChange={handleChange}
                fullWidth
                className={classnames(classes.input)}
              >
                <MenuItem value="" sx={{fontSize: "18px !important", lineHeight: "20px !important"}}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10} sx={{fontSize: "18px !important", lineHeight: "20px !important"}}>Subcategory 1</MenuItem>
                <MenuItem value={20} sx={{fontSize: "18px !important", lineHeight: "20px !important"}}>Subcategory 2</MenuItem>
                <MenuItem value={30} sx={{fontSize: "18px !important", lineHeight: "20px !important"}}>Subcategory 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.containerProduct}>
        <Product />
        <Grid item xs={12} sx={{textAlign: 'center'}}>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => console.log('load more')}
          >
            Load More
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    fontFamily: 'Poiret One',
    fontSize: '40px !important',
    margin: "0 !important",
    fontWeight: "300"
  },
  container: {
    maxWidth: 1140,
    margin: "60px auto 30px !important",
    [theme.breakpoints.down('md')]: {
      margin: "140px auto 30px !important",
      padding: "0 50px !important",
    },
    [theme.breakpoints.down('sm')]: {
      padding: "0 36px !important",
    },
  },
  containerProduct: {
    maxWidth: 1140,
    margin: "0 auto !important",
    marginTop: "30px !important",
    marginBottom: "60px !important",
    [theme.breakpoints.down('md')]: {
      padding: "0 50px !important",
    },
    [theme.breakpoints.down('sm')]: {
      padding: "0 36px !important",
    },
  },
  button:{
    margin: "0px !important",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    paddingRight: "37.5px !important",
    paddingLeft: "37.5px !important"
  },
  inputContent: {
    marginTop: "60px !important",
    fontSize: "18px !important",
    [theme.breakpoints.up('md')]: {
      padding: "0 25px !important",
    },
    [theme.breakpoints.down('md')]: {
      marginTop: "15px !important",
      "&:first-child": {
        marginTop: "30px !important",
      },
    }
  },
  filter: {
    "& .MuiInputBase-root":{
      fontSize: "18px !important",
      minHeight: "50px"
    },
    "& label": {
      top: "5px !important",
      color: "#AAAAAA !important"
    },
    display:"flex",
    justifyContent: "flex-end",
    minWidth: 330,
    minHeight: "50px !important"
  },
  total: {
    maxWidth: 600,
    margin: "0 auto",
    marginTop: 30,
    fontSize: 18,
  },
  input: {
    "& .MuiInputBase-root":{
      fontSize: "18px !important"
    },
    "& label": {
      color: "#AAAAAA !important"
    },
    justifyContent: 'flex-end',
    width: '100%',
    minWidth: "330px !important",
    "& fieldset": {
      border: "1px solid #AAAAAA !important",
    },
    "& .MuiOutlinedInput-root": {
      maxWidth: "330px !important"
    }
  },
}));

export default Products;
