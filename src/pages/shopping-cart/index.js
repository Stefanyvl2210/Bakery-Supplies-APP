import React from "react";

// components
import Table from "../../components/table";

// material ui components
import { Card, Grid, Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

  return (
    <>
      <Grid container>
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
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: 50,
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
}));

export default ShoppingCart;
