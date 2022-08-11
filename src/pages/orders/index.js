import ProfileSidebar from "../../components/profile-sidebar";

import * as React from 'react';

// components
import Table from "../../components/table";

// material ui components
import {
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";


import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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
  {

  }
];

const rows = [
  createData(1, "Completed", "08-05-2022", "$"+100),
  createData(2, "Completed", "08-05-2022", "$"+100),
  createData(3, "Completed", "08-05-2022", "$"+100),
  createData(4, "Completed", "08-05-2022", "$"+100),
];

const Orders = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);

  return (
    <Grid 
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      className={classes.father}
      >
      <Grid 
        item 
        className={classes.sidebar} 
        xs="auto"
        >
        <ProfileSidebar />
      </Grid>

      <Grid 
        item
        container 
        className={classes.container}
        xs
        direction="column"
      >
        <Grid item xs>
          <h1 className={classes.title}>Orders</h1>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          xs
        >
          <Grid item xs="auto" >
            <p className={classes.datePickerLabel}>Filter By Date:</p>
          </Grid>
          <Grid item xs className={classes.inputDatePicker}>
            <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DatePicker
              
              label="Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </Grid>
        </Grid>
        
        <Grid
          item
          display="flex"
          className={classes.table}
          xs={12}
        >
          <Table rows={rows} columns={columns} maxWidth={"100%"} viewOrders={true}/>
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
  father: {
    height: "70vh",
    
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
  inputWrapper: {
    maxWidth: 300,
    marginBottom: "15px !important"
  },
  paragraph:{
    marginTop: "0px !important",
    marginBottom: "5px !important",
    font: "300 20px Open Sans",
    lineHeight: "20px",
    color: "black"
  },
  table: {
    marginTop: "15px !important",
    borderRadius: "4px !important",
    width: "100%",
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
