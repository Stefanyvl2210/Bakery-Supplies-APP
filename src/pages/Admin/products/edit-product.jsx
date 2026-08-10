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

import { getCategoryTree } from "../../../helpers/api/category";
import {
  createProduct,
  editProduct,
  getProductById,
} from "../../../helpers/api/product";
import SnackBar from "../../../components/Snackbar";
import { useNavigate, useParams } from "react-router-dom";
import { getErrorMessage, getResourceCollection, getResourceData } from "../../../helpers/api/response";
import { getImageUrl } from "../../../helpers/formatters";
import Loader, { LoadingButtonContent } from "../../../components/Loader";
import { flattenCategoryTree } from "../../../helpers/categories";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  description: yup.string().required("Required"),
  price: yup.number().min(1).required("Required"),
  quantity_available: yup.number().min(1).required("Required"),
  categories: yup.number().required("Required"),
});

const EditProduct = () => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(null);
  const [productImage, setProductImage] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);
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
      const response = await getCategoryTree();
      const data = flattenCategoryTree(getResourceCollection(response));

      if (data.length > 0) {
        setCategories(data);

        setValue("categories", data[0].id);
      }
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load categories."),
        severity: "error",
      });
    }
  };

  const getProduct = async () => {
    try {
      const response = await getProductById(params?.id);
      const data = getResourceData(response);

      setValue("name", data.name);
      setValue("description", data.description);
      setValue("quantity_available", data.quantity_available);
      setValue("price", data.price);
      const productCategoryId = data.categories?.[0]?.id;
      setCategoryId(productCategoryId);
      if (productCategoryId) setValue("categories", productCategoryId);

      if (data.image) {
        setImage(data.image);
      }
    } catch (error) {
      setOpenSnack({
        open: true,
        message: getErrorMessage(error, "Unable to load product."),
        severity: "error",
      });
    }
  };

  React.useEffect(() => {
    if (!params?.id) navigate("/admin/products");
    Promise.all([categoryList(), getProduct()]).finally(() => {
      setInitialLoading(false);
    });
  }, []);

  const onSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();

    if (file) formData.append("image", file);

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity_available", values.quantity_available);
    formData.append("categories[]", values.categories);

    try {
      const response = await editProduct(formData, params.id);

      setOpenSnack({
        open: true,
        message: "The product has been edited",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/admin/products");
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
        <h1 className={classes.title}>Add new product</h1>

        <Divider className={classes.divider} />

        {initialLoading ? (
          <Loader tone="admin" label="Loading product…" minHeight={260} />
        ) : (
        <>
        <div>
          {!productImage ? (
            <img
              src={image ? getImageUrl(image) : EmptyImage}
              alt="empty"
              width={255}
              height={255}
            />
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
              Update Image
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

            <Grid item xs={12} className={classes.fieldGroup}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <CustomInput
                    register={register}
                    field="price"
                    fullWidth={true}
                    width="100%"
                    label="Price"
                    type="number"
                    placeholder=" "
                    error={errors?.price?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6} className={classes.select}>
                  {categories.length > 0 && categoryId && (
                    <FormControl fullWidth>
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
                        defaultValue={categoryId}
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

                  {categories.length > 0 && !categoryId && !params?.id && (
                    <FormControl fullWidth>
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
                        defaultValue={categories[0].id}
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
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                className={classes.button}
                disabled={loading}
              >
                {loading ? <LoadingButtonContent label="Saving…" /> : "Save"}
              </Button>
            </Grid>
          </Grid>
        </form>
        </>
        )}
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
    margin: "20px 0 !important",

    "& input": {
      height: 33,
    },
  },
  shortInput: {
    maxWidth: "225px !important",
  },
  fieldGroup: {
    margin: "20px 0 !important",
  },
  select: {
    display: "flex",
    alignItems: "flex-end",
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
  divider: {
    margin: "32px 0 !important",
  },
}));

export default EditProduct;
