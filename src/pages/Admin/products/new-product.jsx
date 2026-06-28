import React from "react";

// hook form
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import EmptyImage from "../../../assets/images/empty-image.png";
import CustomInput from "../../../components/input";

import classNames from "classnames";
import { getCategories } from "../../../helpers/api/category";
import { createProduct } from "../../../helpers/api/product";
import SnackBar from "../../../components/Snackbar";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  description: yup.string().required("Required"),
  price: yup.number().min(1).required("Required"),
  quantity_available: yup.number().min(1).required("Required"),
  categories: yup.number().required("Required"),
});

const ProductForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [productImage, setProductImage] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity_available: 1,
      price: 1,
      categories: 0,
    },
  });

  const categoryList = async () => {
    try {
      const { data } = await getCategories();

      if (data.length > 0) {
        setCategories(data);

        setValue("categories", data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    categoryList();
  }, []);

  const onSubmit = async (values) => {
    const formData = new FormData();

    if (file) formData.append("image", file);

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity_available", values.quantity_available);
    formData.append("categories", `[${values.categories}]`);

    try {
      const response = await createProduct(formData);

      setOpenSnack({
        open: true,
        message: "The product has been created",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (error) {
      console.log(error);

      setOpenSnack({
        open: true,
        message: "There has been an error",
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
    <>
      <div className={classes.container}>
        <h1 className={classes.title}>Add new product</h1>

        <Divider />

        <div>
          {!productImage ? (
            <img src={EmptyImage} alt="empty" />
          ) : (
            <img src={productImage} alt="product" width={255} height={255} />
          )}

          <Box
            sx={{
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <label className={classes.uploadButton}>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                      setProductImage(e.target.result);
                    };
                    setFile(e.target.files[0]);
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
              Upload Image
            </label>
          </Box>
        </div>
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
                field="description"
                fullWidth={true}
                width="100%"
                label="Description"
                placeholder=" "
                error={errors?.description?.message}
              />
            </Grid>

            <Grid item xs={12} className={classes.input}>
              <CustomInput
                register={register}
                field="quantity_available"
                fullWidth={true}
                width="100%"
                type="number"
                label="Quantity"
                placeholder=" "
                error={errors?.quantity_available?.message}
              />
            </Grid>

            <Grid item xs={6} className={classNames(classes.input)}>
              <CustomInput
                register={register}
                field="price"
                fullWidth={true}
                width="225px"
                label="Price"
                type="number"
                placeholder=" "
                error={errors?.price?.message}
              />
            </Grid>

            <Grid
              item
              xs={6}
              className={classNames(classes.select)}
              display="flex"
              justifyContent="flex-end"
            >
              {categories.length > 0 && (
                <FormControl style={{ minWidth: 300 }}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ fontSize: "18px !important" }}
                  >
                    Category
                  </InputLabel>

                  <Select
                    placeholder="Select"
                    variant="outlined"
                    fullWidth
                    name="categories"
                    {...register("categories")}
                    defaultValue={categories[0]?.id}
                  >
                    {categories.map((category, i) => (
                      <MenuItem
                        value={category.id}
                        sx={{
                          fontSize: "18px !important",
                          lineHeight: "20px !important",
                        }}
                        key={i}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors?.categories?.message && (
                    <small>{errors?.categories?.message}</small>
                  )}
                </FormControl>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                className={classes.button}
                disabled={loading}
              >
                Save
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

export default ProductForm;
