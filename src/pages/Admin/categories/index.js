import React from "react";

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Table from "../../../components/Admin/Table";
import { Button } from "@mui/material";
import { getCategories } from "../../../helpers/api/category";

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
];

const Categories = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);

  const categoryList = async () => {
    try {
      const { data } = await getCategories();

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    categoryList();
  }, []);

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

      <Table rows={rows} columns={columns} />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "1068px",
    margin: "30px auto 500px auto",
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

export default Categories;
