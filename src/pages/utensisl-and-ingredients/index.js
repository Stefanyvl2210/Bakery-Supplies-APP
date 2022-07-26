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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import Product from "../../components/Product";

const ShoppingCart = () => {
  const classes = useStyles();
  const [search, setSeatch] = useState("");
  const [filter, setFilter] = useState(10);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Utensils & Ingredients</h2>
        </Grid>

        <Grid
          item
          xs={6}
          className={classnames(classes.inputContent, classes.mleft)}
        >
          <TextField
            field="email"
            width="100%"
            label="Email"
            placeholder="jdoe@gmail.com"
            onChange={setSeatch}
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="filter"
              onChange={handleChange}
              fullWidth
              className={classnames(classes.input)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Product />
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: 50,
  },
  container: {
    padding: "0 70px",
    maxWidth: "1440px !important",
    width: "100%",
    margin: "0 auto !important",
  },
  inputContent: {
    marginTop: "57px !important",
  },
  mleft: {
    paddingLeft: "70px !important",
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

export default ShoppingCart;
