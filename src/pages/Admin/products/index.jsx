import React from "react";

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";
import { Button } from "@mui/material";
import { deleteProduct, getProducts } from "../../../helpers/api/product";
import SnackBar from "../../../components/Snackbar";
import { getErrorMessage, getResourceCollection } from "../../../helpers/api/response";
import Loader from "../../../components/Loader";

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
  const [loading, setLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState(null);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const [rows, setRows] = React.useState([]);

  const productList = async (showLoader = true) => {
    if (showLoader) setLoading(true);

    try {
      const response = await getProducts();
      const data = getResourceCollection(response);

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
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load products."),
        severity: "error",
      });
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  React.useEffect(() => {
    productList();
  }, []);

  const onEdit = (id) => {
    navigate(`/admin/product/${id}`);
  };

  const onDelete = async (id) => {
    setDeletingId(id);

    try {
      await deleteProduct(id);

      setOpenSnack({
        open: true,
        message: "Successfully deleted",
        severity: "success",
      });

      await productList(false);
    } catch (error) {
      setOpenSnack({
        open: true,
        message: "An error has occurred",
        severity: "error",
      });
    } finally {
      setDeletingId(null);
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

      {loading ? (
        <Loader tone="admin" label="Loading products…" minHeight={260} />
      ) : (
        <Table
          rows={rows}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
          deletingId={deletingId}
        />
      )}

      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
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

export default Products;
