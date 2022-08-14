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

const validationSchema = yup.object({
  product_image: yup.string().required("Required"),
  name: yup.string().required("Required"),
  description: yup.string().required("Required"),
  price: yup.number().required("Required"),
  category: yup.string().required("Required"),
});

const ProductForm = () => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: validationSchema,
  });
  console.log(watch());

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.title}>Add new product</h1>

        <Divider />

        <div>
          <img src={EmptyImage} alt="empty" />

          <Box
            sx={{
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <label className={classes.uploadButton}>
              <input type="file" {...register("product_image")} />
              Custom Upload
            </label>
          </Box>
        </div>

        <Grid container maxWidth={550}>
          <Grid item xs={12} className={classes.input}>
            <CustomInput
              register={register}
              field="name"
              fullWidth={true}
              width="100%"
              label="Name"
              placeholder=" "
            />
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <CustomInput
              register={register}
              field="description"
              fullWidth={true}
              width="100%"
              label="description"
              placeholder=" "
            />
          </Grid>

          <Grid item xs={6} className={classNames(classes.input)}>
            <CustomInput
              register={register}
              field="price"
              fullWidth={true}
              width="225px"
              label="Price"
              placeholder=" "
            />
          </Grid>

          <Grid
            item
            xs={6}
            className={classNames(classes.select)}
            display="flex"
            justifyContent="flex-end"
          >
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
                name="category"
                {...register("category")}
                defaultValue=""
              >
                <MenuItem
                  value=""
                  sx={{
                    fontSize: "18px !important",
                    lineHeight: "20px !important",
                  }}
                >
                  <em>None</em>
                </MenuItem>
                <MenuItem
                  value={10}
                  sx={{
                    fontSize: "18px !important",
                    lineHeight: "20px !important",
                  }}
                >
                  Subcategory 1
                </MenuItem>
                <MenuItem
                  value={20}
                  sx={{
                    fontSize: "18px !important",
                    lineHeight: "20px !important",
                  }}
                >
                  Subcategory 2
                </MenuItem>
                <MenuItem
                  value={30}
                  sx={{
                    fontSize: "18px !important",
                    lineHeight: "20px !important",
                  }}
                >
                  Subcategory 3
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" className={classes.button}>
              Save
            </Button>
          </Grid>
        </Grid>
      </div>
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
