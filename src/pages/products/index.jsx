import React, { useEffect, useRef, useState } from "react";
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
import { getCategoryTree } from "../../helpers/api/category";
import {
  getErrorMessage,
  getPaginationMeta,
  getResourceCollection,
} from "../../helpers/api/response";
import Loader from "../../components/Loader";
import {
  CATALOG_SECTIONS,
  findCatalogRoot,
  flattenCategoryChildren,
  flattenCategoryTree,
  isCatalogRoot,
} from "../../helpers/categories";

const PRODUCTS_PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 350;

const Products = () => {
  const location = useLocation();
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [categoryScope, setCategoryScope] = useState({
    ready: false,
    id: null,
  });
  const [pagination, setPagination] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const productRequestId = useRef(0);
  const requestedCategory =
    new URLSearchParams(location.search).get("category") ||
    location.state?.category ||
    "";
  const pageTitle =
    CATALOG_SECTIONS[requestedCategory]?.title ||
    location.state?.title ||
    "Products";

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      productRequestId.current += 1;
      setLoading(true);
      setLoadingMore(false);
      setCategoryScope({ ready: false, id: null });
      setPagination(null);
      setProducts([]);
      setMessage("");

      try {
        const categoriesResponse = await getCategoryTree();
        if (cancelled) return;

        const categoryTree = getResourceCollection(categoriesResponse);
        const parentCategory = requestedCategory
          ? findCatalogRoot(categoryTree, requestedCategory)
          : null;

        if (requestedCategory && !parentCategory) {
          setFilterCategories([]);
          setMessage("This product section is unavailable.");
          setLoading(false);
          return;
        }

        const scopedCategories = parentCategory
          ? flattenCategoryChildren(parentCategory)
          : flattenCategoryTree(categoryTree).filter(
              (category) => !isCatalogRoot(category)
            );

        setFilter("");
        setFilterCategories(scopedCategories);
        setCategoryScope({
          ready: true,
          id: parentCategory?.id ?? null,
        });
      } catch (error) {
        if (cancelled) return;

        setFilterCategories([]);
        setMessage(getErrorMessage(error, "Unable to load products."));
        setLoading(false);
      }
    };

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, [requestedCategory]);

  useEffect(() => {
    if (!categoryScope.ready) return;

    const requestId = ++productRequestId.current;

    const loadFirstPage = async () => {
      setLoading(true);
      setLoadingMore(false);
      setPagination(null);
      setMessage("");

      try {
        const productsResponse = await getProducts({
          page: 1,
          per_page: PRODUCTS_PER_PAGE,
          ...(filter || categoryScope.id
            ? { category_id: filter || categoryScope.id }
            : {}),
          ...(debouncedSearch ? { search: debouncedSearch } : {}),
        });

        if (requestId !== productRequestId.current) return;

        const productData = getResourceCollection(productsResponse);

        setProducts(productData);
        setPagination(getPaginationMeta(productsResponse));
        setMessage(productData.length ? "" : "No products available.");
      } catch (error) {
        if (requestId !== productRequestId.current) return;

        setProducts([]);
        setMessage(getErrorMessage(error, "Unable to load products."));
      } finally {
        if (requestId === productRequestId.current) {
          setLoading(false);
        }
      }
    };

    loadFirstPage();
  }, [categoryScope, debouncedSearch, filter]);

  const hasMoreProducts =
    Number(pagination?.current_page || 0) <
    Number(pagination?.last_page || 0);

  const handleLoadMore = async () => {
    if (!hasMoreProducts || loadingMore) return;

    const requestId = ++productRequestId.current;
    const nextPage = Number(pagination.current_page) + 1;

    setLoadingMore(true);
    setMessage("");

    try {
      const productsResponse = await getProducts({
        page: nextPage,
        per_page: PRODUCTS_PER_PAGE,
        ...(filter || categoryScope.id
          ? { category_id: filter || categoryScope.id }
          : {}),
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      });

      if (requestId !== productRequestId.current) return;

      const productData = getResourceCollection(productsResponse);

      setProducts((currentProducts) => [...currentProducts, ...productData]);
      setPagination(getPaginationMeta(productsResponse));
    } catch (error) {
      if (requestId !== productRequestId.current) return;

      setMessage(getErrorMessage(error, "Unable to load more products."));
    } finally {
      if (requestId === productRequestId.current) {
        setLoadingMore(false);
      }
    }
  };

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
              value={search}
              onChange={handleChangeSearch}
              disabled={loading}
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
                disabled={loading}
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
        {loading ? (
          <Loader label="Loading products…" minHeight={300} />
        ) : (
          <>
            {message && <Grid item xs={12} className={classes.total}>{message}</Grid>}
            <Product productList={products} />
            {hasMoreProducts ? (
              <Grid item xs={12} sx={{textAlign: "center"}}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  disabled={loadingMore}
                  onClick={handleLoadMore}
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </Button>
              </Grid>
            ) : null}
          </>
        )}
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
