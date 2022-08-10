import ProfileSidebar from "../../components/profile-sidebar";

import React, { useState } from "react";

// components
import Table from "../../components/table";

// material ui components
import {
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

function createData(order, status, dateoforder, total) {
  return { order, status, dateoforder, total };
}

const columns = [
  {
    name: "# Order",
    key: "order",
  },
  {
    name: "Status",
    key: "status",
  },
  {
    name: "Date of Order",
    key: "dateoforder",
  },
  {
    name: "Total",
    key: "total",
  },
];

const rows = [
  createData(1, "Completed", "08-05-2022", "$"+100),
  createData(2, "Completed", "08-05-2022", "$"+100),
  createData(3, "Completed", "08-05-2022", "$"+100),
  createData(4, "Completed", "08-05-2022", "$"+100),
];

const Orders = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={2} className={classes.sidebar}>
        <ProfileSidebar />
      </Grid>

      <Grid item xs={10} className={classes.container}>
        <Grid container>
          <Grid item xs={4.7} className={classes.avatarWrapper}>
            <h1 className={classes.title}>Orders</h1>
          </Grid>

          
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            className={classes.table}
          >
            <Table rows={rows} columns={columns} maxWidth={1038} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Orders;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 60,
    maxWidth: "1140px !important",
    [theme.breakpoints.down('md')]: {
      padding: "140px 36px !important",
    },

    "@media (max-width: 768px)": {
      margin: "0 auto !important",
    },
  },
  sidebar: {
    "@media (max-width: 1000px)": {
      display: "none",
    },
  },
  title: {
    font: "400 40px/28px Poiret One",
    marginTop: "0px",
    marginBottom: "35px",
    lineHeight: "20px",
    color: "black"
  },

  form: {
    "& .MuiGrid-root": {
      "@media (max-width: 768px)": {
        display: "flex",
        justifyContent: "center",
      },
    },
    "& .MuiFormLabel-root": {
      color: "#767676",
      fontSize: "14px",
      lineHeight: "16px",
      fontStyle: "normal" 
    },
  },
  inputWrapper: {
    maxWidth: 300,
    marginBottom: "15px !important"
  },
  button: {
    marginTop: "30px !important",
    marginLeft: "0 !important",
    marginRight: "0 !important",
    marginBottom: "0px !important",
    padding: "0px 16px !important",
    gap:"8px !important",
    width: "150px !important",
    height: "50px !important",
    background: "#C86B85 !important",
    borderRadius: "4px !important",
  },
  paragraph:{
    marginTop: "0px !important",
    marginBottom: "5px !important",
    font: "300 20px Open Sans",
    lineHeight: "20px",
    color: "black"
  },
  buttonText:{
    margin: 0,
    font: "400 24px Open Sans",
    lineHeight: "26px",
    color: "white"
  },
  table: {
    marginTop: "45px !important",
    borderRadius: "4px !important",
    "& thead": {
      "& th": {
        backgroundColor: "#F5EEE6",
        borderBottom: "1px solid #AAAAAA !important",
      },
    },
    "& tbody": {
      "& th": {
        backgroundColor: "#F5EEE6",
        borderBottom: "none !important",
      },
    },
  },
  
}));
