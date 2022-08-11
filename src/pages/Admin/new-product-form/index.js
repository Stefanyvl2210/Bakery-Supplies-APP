import React from "react";

import { makeStyles } from "@mui/styles";
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

import EmptyImage from "../../../assets/images/empty-image.png";
import CustomInput from "../../../components/input";

// hook form
import { useForm } from "react-hook-form";
import classNames from "classnames";

const ProductForm = () => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.title}>Add new product</h1>

        <Divider />

        <div>
          <img src={EmptyImage} alt="empty" />

          <div>
            <Button variant="contained" className={classes.button}>
              Upload image
            </Button>
          </div>
        </div>

        <Grid container maxWidth={550}>
          <Grid item xs={12} className={classes.input}>
            <CustomInput
              register={register}
              field="firstName"
              fullWidth={true}
              width="100%"
              label="First Name"
              placeholder=" "
            />
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <CustomInput
              register={register}
              field="firstName"
              fullWidth={true}
              width="100%"
              label="First Name"
              placeholder=" "
            />
          </Grid>

          <Grid item xs={6} className={classNames(classes.input)}>
            <CustomInput
              register={register}
              field="firstName"
              fullWidth={true}
              width="225px"
              label="First Name"
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
              <Select placeholder="Select" variant="outlined" fullWidth>
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
}));

export default ProductForm;
