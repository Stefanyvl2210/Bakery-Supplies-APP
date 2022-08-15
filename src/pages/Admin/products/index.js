import React from "react";

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";
import { Button } from "@mui/material";
import { deleteProduct, getProducts } from "../../../helpers/api/product";
import SnackBar from "../../../components/Snackbar";

function createData({
  id,
  name,
  description,
  price,
  quantity_available,
  created_at,
}) {
  return {
    id,
    name,
    description,
    price,
    quantity_available,
    created_at,
  };
}

const columns = [
  {
    key: "id",
    name: "ID",
  },
  {
    key: "name",
    name: "Name",
  },
  {
    key: "description",
    name: "Description",
  },
  {
    key: "price",
    name: "Price",
  },
  {
    key: "quantity_available",
    name: "Quantity available",
  },
  {
    key: "created_at",
    name: "Created at",
  },
  {
    key: "actions",
    name: "Actions",
  },
];

const Products = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const [rows, setRows] = React.useState([]);

  const productList = async () => {
    try {
      const { data } = await getProducts();

      if (data.length > 0) {
        setRows(
          data.map((product) =>
            createData({
              ...product,
              created_at: new Date(product.created_at).toLocaleDateString(),
            })
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    productList();
  }, []);

  const onEdit = (id) => {
    navigate(`/admin/product/${id}`);
  };

  const onDelete = async (id) => {
    try {
      await deleteProduct(id);

      setOpenSnack({
        open: true,
        message: "Successfully deleted",
        severity: "success",
      });

      productList();
    } catch (error) {
      setOpenSnack({
        open: true,
        message: "An error has ocurred",
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
        <h1>Products</h1>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => navigate("/admin/new-product")}
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
    margin: "30px auto 630px auto",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 56,

    "& h1": {
      font: "400 36px/20px Open Sans",
    },
  },
  button: {
    backgroundColor: "#0978DE !important",
    marginLeft: "20px !important",
  },
}));

export default Products;
