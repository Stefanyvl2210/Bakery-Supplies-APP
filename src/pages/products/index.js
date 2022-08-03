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
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid 
            item xs={12} sm={6} md={6}
            className={classnames(classes.inputContent)} 
          > 
            <TextField
              field="search"
              width="300px !important"
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
            item xs={12} sm={6} md={6}
            className={classnames(classes.inputContent, classes.filter)}
          >
            <FormControl size="small" style={{minWidth: 300}}>
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
      </Grid>
      <Grid container className={classes.container}>
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
    maxWidth: 1280,
    margin: "60px auto !important",
  },
  inputContent: {
    marginTop: "60px !important",
  },
  filter: {
    display:"flex",
    justifyContent: "flex-end",
    minWidth: 300,
  },
  total: {
    maxWidth: 600,
    margin: "0 auto",
    marginTop: 30,
    fontSize: 18,
  },
  input: {
    justifyContent: 'flex-end',
    maxWidth: '300px',
    width: '100%'
  },
}));

export default Products;
