import React from "react";

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";
import { Button } from "@mui/material";
import { deleteCategory, getCategoryTree } from "../../../helpers/api/category";
import SnackBar from "../../../components/Snackbar";
import { getErrorMessage, getResourceCollection } from "../../../helpers/api/response";
import Loader from "../../../components/Loader";
import { flattenCategoryTree, isCatalogRoot } from "../../../helpers/categories";

function createData({ id, name, slug, created_at }) {
  return { id, name, slug, created_at };
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
    key: "slug",
    name: "Slug",
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

const Categories = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState(null);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const categoryList = async (showLoader = true) => {
    if (showLoader) setLoading(true);

    try {
      const response = await getCategoryTree();
      const data = flattenCategoryTree(getResourceCollection(response)).filter(
        (category) => !isCatalogRoot(category)
      );

      if (data.length > 0) {
        setRows(
          data.map((category) =>
            createData({
              id: category.id,
              name: category.name,
              slug: category.slug,
              created_at: new Date(category.created_at).toLocaleDateString(),
            })
          )
        );
      } else {
        setRows([]);
      }
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load categories."),
        severity: "error",
      });
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  React.useEffect(() => {
    categoryList();
  }, []);

  const onEdit = (id) => {
    navigate(`/admin/category/${id}`);
  };

  const onDelete = async (id) => {
    setDeletingId(id);

    try {
      await deleteCategory(id);

      setOpenSnack({
        open: true,
        message: "Successfully deleted",
        severity: "success",
      });

      await categoryList(false);
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "An error has occurred"),
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
        <h1>Categories</h1>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => navigate("/admin/new-category")}
        >
          Add new
        </Button>
      </div>

      {loading ? (
        <Loader tone="admin" label="Loading categories…" minHeight={260} />
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
    marginBottom: "32px",

    "& h1": {
      font: "400 36px/20px Open Sans",
    },
  },
  button: {
    backgroundColor: "#0978DE !important",
    marginRight: "0px !important",
  },
}));

export default Categories;
