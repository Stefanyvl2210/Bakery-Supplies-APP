import React from "react";

// hook form
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Divider, Grid, MenuItem, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CustomInput from "../../../components/input";
import { createCategory, getCategoryTree } from "../../../helpers/api/category";
import SnackBar from "../../../components/Snackbar";
import { useNavigate } from "react-router-dom";
import { getErrorMessage, getResourceCollection } from "../../../helpers/api/response";
import Loader, { LoadingButtonContent } from "../../../components/Loader";
import { getCatalogRootCategories } from "../../../helpers/categories";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  slug: yup.string(),
  parent_id: yup.string().required("Required"),
});

const Category = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [parentCategories, setParentCategories] = React.useState([]);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      slug: "",
      parent_id: "",
    },
  });

  const categoryList = async () => {
    try {
      const response = await getCategoryTree();
      const parents = getCatalogRootCategories(
        getResourceCollection(response)
      );

      setParentCategories(parents);
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load parent categories."),
        severity: "error",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  React.useEffect(() => {
    categoryList();
  }, []);

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await createCategory({
        ...values,
        slug: values.slug || undefined,
      });

      setOpenSnack({
        open: true,
        message: "The category has been created",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/admin/categories");
      }, 1000);
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.title}>Add new category</h1>

        <Divider className={classes.divider} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container maxWidth={550}>
            <Grid item xs={12} className={classes.input}>
              <CustomInput
                register={register}
                field="name"
                fullWidth={true}
                width="100%"
                label="Name"
                placeholder=" "
                error={errors?.name?.message}
              />
            </Grid>

            <Grid item xs={12} className={classes.input}>
              <CustomInput
                register={register}
                field="slug"
                fullWidth={true}
                width="100%"
                label="Slug (optional)"
                placeholder=" "
                error={errors?.slug?.message}
              />
            </Grid>

            <Grid item xs={12} className={classes.input}>
              {initialLoading ? (
                <Loader tone="admin" label="Loading parent categories…" minHeight={100} />
              ) : (
              <TextField
                select
                label="Parent category"
                fullWidth
                required
                defaultValue=""
                {...register("parent_id")}
                error={Boolean(errors?.parent_id?.message)}
                helperText={errors?.parent_id?.message}
              >
                {parentCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                disabled={loading}
              >
                {loading ? <LoadingButtonContent label="Saving…" /> : "Save"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>

      {openSnack.open && (
        <SnackBar openSnack={openSnack} handleCloseSnack={handleCloseSnack} />
      )}
    </>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    margin: "0 auto",
  },

  title: {
    font: "400 36px/20px Open Sans",
    lineHeight: "1",
    margin: 0,
  },
  input: {
    '&:not(:first-child)': {
      marginTop: "20px !important",
    },
    marginBottom: "20px !important",
    "& input": {
      height: 33,
    },
  },
  shortInput: {
    maxWidth: "225px !important",
  },
  select: {
    marginTop: "15px !important",
    display: "flex",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0978DE !important",
    margin: "20px 0 30px 0 !important",
  },
  uploadButton: {
    "& input[type='file']": {
      display: "none",
    },

    padding: "14px 21px",
    backgroundColor: "#0978DE !important",
    fontFamily: "Open Sans",
    color: "#fff",
  },
  divider: {
    margin: "32px 0 !important",
  },
}));

export default Category;
