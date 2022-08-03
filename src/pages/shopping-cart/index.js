import React, { useState } from "react";

// components
import Table from "../../components/table";

// material ui components
import { 
  Grid, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";

function createData(product, unitPrice, cant, subtotal) {
  return { product, unitPrice, cant, subtotal };
}

const rows = [
  createData("Item 1", 0, 0, 0, 0),
  createData("Item 2", 0, 0, 0, 0),
  createData("Item 3", 0, 0, 0, 0),
  createData("Item 4", 0, 0, 0, 0),
  createData("Item 5", 0, 0, 0, 0),
];

const columns = [
  {
    name: "Product",
    key: "product",
  },
  {
    name: "Unit price",
    key: "unitPrice",
  },
  {
    name: "Cant",
    key: "cant",
  },
  {
    name: "Subtotal",
    key: "subtotal",
  },
];

const ShoppingCart = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState(10);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Shopping Cart</h2>
        </Grid>

        <Grid
          item
          xs={16}
          display="flex"
          justifyContent="center"
          className={classes.table}
        >
          <Table rows={rows} columns={columns} maxWidth={600} />
        </Grid>

        <Grid item xs={12}>
          <div className={classes.total}>
            <p>Total: 0</p>
          </div>

          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={12}>
          <div className={classes.total}>
            <p>Choose a payment method</p>
          </div>

          <FormControl fullWidth className={classes.paymentSelect}>
            <InputLabel id="demo-simple-select-label">Payment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="filter"
              onChange={handleChange}
              fullWidth
              className={classNames(classes.input)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1280,
    margin: "60px auto !important",
  },
  title: {
    textAlign: "center",
    fontFamily: 'Poiret One',
    fontSize: '40px !important',
    lineHeight: '20px !important',
    marginTop: "0 !important",
    fontWeight: "300"
  },
  table: {
    marginTop: "45px !important",
  },
  table: {
    "& tbody": {
      "& th": {
        backgroundColor: "#D9D9D9",
      },
    },
  },
  total: {
    maxWidth: 600,
    margin: "0 auto",
    marginTop: 30,
    fontSize: 18,
  },
  divider: {
    maxWidth: 600,
    margin: "27px auto 17px auto !important",
  },
  paymentMethodText: {
    fontSize: 18,
  },
  paymentSelect: {
    display: "flex !important",
    justifyContent: "center !important",
    maxWidth: 600,
    margin: "10px auto 0 auto !important",
  },
}));

export default ShoppingCart;
