import React, { useEffect } from "react";

// hook form
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CustomInput from "../../../components/input";
import { editCategory, getCategoryById } from "../../../helpers/api/category";
import SnackBar from "../../../components/Snackbar";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  slug: yup.string().required("Required"),
});

const EditCategory = () => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const [categoryId, setCategoryId] = React.useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const category = async () => {
    try {
      const { data } = await getCategoryById(params?.id);

      console.log(data);
      setCategoryId(data.id);
      setValue("name", data.name);
      setValue("slug", data.slug);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!params?.id) navigate("/admin/categories");
    category();
  }, []);

  const onSubmit = async (values) => {
    try {
      const response = await editCategory(values, categoryId);

      setOpenSnack({
        open: true,
        message: "Category edited successfully",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/admin/categories");
      }, 1000);
    } catch (error) {
      setOpenSnack({
        open: true,
        message: "There has been an error",
        severity: "error",
      });
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
        <h1 className={classes.title}>Edit category</h1>

        <Divider />

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
                label="Slug"
                placeholder=" "
                error={errors?.slug?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                disabled={loading}
              >
                Edit
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
    maxWidth: "1038px",
    paddingLeft: 60,
    marginTop: 50,
    marginBottom: 400,
  },

  title: {
    font: "400 36px/20px Open Sans",
  },
  input: {
    margin: "20px 0 !important",

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
  inputFile: {},
}));

export default EditCategory;
