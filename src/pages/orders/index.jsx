import ProfileSidebar from "../../components/profile-sidebar";

import React, { useEffect, useMemo, useState } from 'react';

// components
import Table from "../../components/table";

// material ui components
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from "react-redux";
import { userLogged } from "../../features/auth/AuthSlice";
import { getOrdersByUser } from "../../helpers/api/orders";
import { getErrorMessage, getResourceCollection } from "../../helpers/api/response";
import { formatDate, formatMoney, formatStatus } from "../../helpers/formatters";

function createData(order, status, dateoforder, total) {
  return { order, status, dateoforder, total };
}

const columns = [
  { name: "Order #", key: "order" },
  { name: "Status", key: "status" },
  { name: "Order date", key: "dateoforder" },
  { name: "Total", key: "total" },
];

const Orders = () => {
  const classes = useStyles();
  const user = useSelector(userLogged);
  const [date, setDate] = useState(null);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?.id) return;

      try {
        const response = await getOrdersByUser(user.id);
        const orderData = getResourceCollection(response);
        setOrders(orderData);
        setMessage(orderData.length ? "" : "You do not have orders yet.");
      } catch (error) {
        setMessage(getErrorMessage(error, "Unable to load orders."));
      }
    };

    loadOrders();
  }, [user?.id]);

  const filteredOrders = useMemo(() => {
    if (!date) return orders;
    const selectedDate = formatDate(date);
    return orders.filter((order) => formatDate(order.created_at) === selectedDate);
  }, [date, orders]);

  const rows = filteredOrders.map((order) =>
    createData(
      order.id,
      formatStatus(order.status),
      formatDate(order.created_at),
      formatMoney(order.total)
    )
  );

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" className={classes.father}>
      <Grid item className={classes.sidebar} xs={12} md={2.5}>
        <ProfileSidebar />
      </Grid>

      <Grid item container className={classes.container} xs={12} md={9.5} direction="column">
        <Grid item xs>
          <h1 className={classes.title}>Orders</h1>
          {message && <p className={classes.paragraph}>{message}</p>}
        </Grid>
        <Grid container item direction="row" justifyContent="flex-start" alignItems="center" xs>
          <Grid item xs="auto">
            <p className={classes.datePickerLabel}>Filter By Date:</p>
          </Grid>
          <Grid item xs className={classes.inputDatePicker}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} />}
                className={classes.dateFilter}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid item display="flex" className={classes.table} xs={12}>
          <Table rows={rows} columns={columns} maxWidth={"100%"} viewOrders={true} orderData={filteredOrders} />
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
  dateFilter: {},
  father: {
    height: "70vh",
    [theme.breakpoints.down('md')]: {
      height: "100%",
    },
  },
  sidebar: {
    "@media (max-width: 1000px)": {
      display: "none",
    },
    height: "100%"
  },
  datePickerLabel:{
    marginRight: "15px",
    font: "300 18px Open Sans",
    lineHeight: "20px"
  },
  title: {
    font: "400 40px/28px Poiret One",
    marginTop: "0px",
    marginBottom: "50px",
    lineHeight: "20px",
    color: "black"
  },
  inputDatePicker: {
    "& .MuiFormLabel-root": {
      font: "400 16px Open Sans !important",
      lineHeight: "20px",
      color: "#AAAAAA"
    },
  },
  paragraph:{
    marginTop: "0px !important",
    marginBottom: "20px !important",
    font: "300 20px Open Sans",
    lineHeight: "24px",
    color: "black"
  },
  table: {
    marginTop: "15px !important",
    borderRadius: "4px !important",
    width: "100%",
    "& table": {
      minWidth: "600px !important",
    },
    "& thead th": {
      backgroundColor: "#F5EEE6",
      borderBottom: "1px solid #AAAAAA !important",
    },
    "& tbody th": {
      backgroundColor: "#F5EEE6",
      borderBottom: "none !important",
    },
  },
}));
