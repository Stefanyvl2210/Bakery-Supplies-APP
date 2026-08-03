import React from "react";

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";
import { Button } from "@mui/material";
import {
  deletePaymentMethod,
  getAdminPaymentMethods,
} from "../../../helpers/api/paymentMethods";
import { getErrorMessage, getResourceCollection } from "../../../helpers/api/response";
import SnackBar from "../../../components/Snackbar";

function createData({ id, name, type, currency, is_active }) {
  return {
    id,
    name,
    type,
    currency,
    is_active: is_active ? "Yes" : "No",
  };
}

const columns = [
  { key: "id", name: "ID" },
  { key: "name", name: "Name" },
  { key: "type", name: "Type" },
  { key: "currency", name: "Currency" },
  { key: "is_active", name: "Active" },
  { key: "actions", name: "Actions" },
];

const AdminPaymentMethods = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const loadPaymentMethods = async () => {
    try {
      const response = await getAdminPaymentMethods();
      const methods = getResourceCollection(response);

      setRows(methods.map((method) => createData(method)));
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load payment methods."),
        severity: "error",
      });
    }
  };

  React.useEffect(() => {
    loadPaymentMethods();
  }, []);

  const onEdit = (id) => {
    navigate(`/admin/payment-method/${id}`);
  };

  const onDelete = async (id) => {
    try {
      await deletePaymentMethod(id);

      setOpenSnack({
        open: true,
        message: "Payment method deleted",
        severity: "success",
      });

      loadPaymentMethods();
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "An error has occurred"),
        severity: "error",
      });
    }
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <h1>Payment methods</h1>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => navigate("/admin/new-payment-method")}
        >
          Add new
        </Button>
      </div>

      <Table
        rows={rows}
        columns={columns}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "1068px",
    margin: "0 auto",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,

    "& h1": {
      font: "400 36px/20px Open Sans",
    },
  },
  button: {
    backgroundColor: "#0978DE !important",
    marginRight: "0px !important",
  },
}));

export default AdminPaymentMethods;
