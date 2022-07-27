import React, { useEffect, useState } from "react";

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
      <Grid container className={classes.container} justifyContent="space-between">
        <Grid item xs={12} > 
          <h2 className={classes.title}>{location.state.title}</h2>
        </Grid>

        <Grid
          item
          xs={6}
          className={classnames(classes.inputContent, classes.mleft)}
        >
          <TextField
            field="search"
            width="100%"
            label="Search"
            onChange={setSearch}
            fullWidth
            className={classes.input}
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
          item
          xs={6}
          className={classnames(classes.inputContent, classes.mleft)}
        >
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Subcategory 1</MenuItem>
              <MenuItem value={20}>Subcategory 2</MenuItem>
              <MenuItem value={30}>Subcategory 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Product />
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    fontFamily: 'Poiret One',
    fontSize: '40px !important',
    lineHeight: '20px !important',
    margin: "0 !important"
  },
  container: {
    maxWidth: 1280,
    margin: "60px auto !important",
  },
  inputContent: {
    marginTop: "57px !important",
  },
  mleft: {
    // paddingLeft: "70px !important",
  },
  total: {
    maxWidth: 600,
    margin: "0 auto",
    marginTop: 30,
    fontSize: 18,
  },
  input: {
    maxWidth: 500,
  },
}));

export default Products;
