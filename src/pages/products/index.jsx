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
import { getProducts } from "../../helpers/api/product";
import { getCategories } from "../../helpers/api/category";
import { getResourceCollection, getErrorMessage } from "../../helpers/api/response";

const Products = () => {
  const location = useLocation();
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [message, setMessage] = useState("");
  const requestedCategory = location.state?.category || "";
  const pageTitle = location.state?.title || "Products";

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const applyFilters = React.useCallback(() => {
    let nextProducts = allProducts;

    if (filter) {
      const selectedCategoryIds = filterCategories
        .filter(
          (category) =>
            String(category.id) === String(filter) ||
            String(category.parent_id) === String(filter)
        )
        .map((category) => String(category.id));

      nextProducts = nextProducts.filter((product) =>
        product.categories?.some((category) =>
          selectedCategoryIds.includes(String(category.id))
        )
      );
    }

    if (search) {
      nextProducts = nextProducts.filter((product) => {
        const name = product.name ? product.name.toLowerCase() : "";
        return name.includes(search.toLowerCase());
      });
    }

    setProducts(nextProducts);
  }, [allProducts, filter, filterCategories, search]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const categoriesResponse = await getCategories();
        const categoryData = getResourceCollection(categoriesResponse);
        const parentCategory = requestedCategory
          ? categoryData.find((category) => {
              const slug = String(category.slug || "").toLowerCase();
              const name = String(category.name || "").toLowerCase();
              const target = String(requestedCategory).toLowerCase();

              return slug === target || name === target;
            })
          : null;
        const scopedCategories = parentCategory
          ? categoryData.filter(
              (category) =>
                category.id === parentCategory.id ||
                category.parent_id === parentCategory.id
            )
          : categoryData;
        const productsResponse = await getProducts(
          parentCategory ? { category_id: parentCategory.id } : {}
        );
        const productData = getResourceCollection(productsResponse);

        setAllProducts(productData);
        setFilterCategories(scopedCategories);
        setMessage(productData.length ? "" : "No products available.");
      } catch (error) {
        setMessage(getErrorMessage(error, "Unable to load products."));
      }
    };

    loadProducts();
  }, [requestedCategory]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);
  
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} > 
          <h2 className={classes.title}>{pageTitle}</h2>
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
              onChange={handleChangeSearch}
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
                {filterCategories.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    sx={{fontSize: "18px !important", lineHeight: "20px !important"}}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.containerProduct}>
        {message && <Grid item xs={12} className={classes.total}>{message}</Grid>}
        <Product productList={products} />
        <Grid item xs={12} sx={{textAlign: 'center'}}>
          {search === "" && products.length > 0 ?
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            disabled
          >
            {products.length} products
          </Button> : ""}
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
    padding: "0 25px",
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
