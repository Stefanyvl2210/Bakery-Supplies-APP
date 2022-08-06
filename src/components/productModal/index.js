import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Button, Grid, IconButton } from "@mui/material";
import shoppingCart from "../../utils/shoppingCart";



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    marginTop: "65px",
    marginBottom: "65px",
    marginLeft: "55px",
    marginRight: "55px",
    padding: "0px",
  },
  "& .MuiDialogActions-root": {
  },
  "& .MuiDialog-paper": {
    maxWidth: "1050px !important",
    height: 530,
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  const classes = useStyles();

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} className={classes.title}>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomDialog(props) {
  const { open, handleClose, selectedProduct } = props;

  const classes = useStyles();
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
        </BootstrapDialogTitle>
        <DialogContent>
          <Grid container 
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid
              item
              display="flex"
              alignItems="center"
              justifyContent="center"
              xs
              sx={{marginRight: "40px"}}
            >
              <img src={selectedProduct.image} alt={selectedProduct.alt} width = "550" height = "400" />
            </Grid>

            <Grid item xs >
              <h4 className={classes.productName}>{selectedProduct.name}</h4>

              <Typography gutterBottom className={classes.description}>
                {selectedProduct.description}
              </Typography>

              <p className={classes.productPrice}>Price: {selectedProduct.price}</p>

              <div className={classes.buttonWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={() => { shoppingCart().addItemToCart(selectedProduct.name, selectedProduct.price, 1) }}
                >
                  Add to Cart
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "0px 0 !important",
    padding: "0px !important"
  },
  productName: {
    margin: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "400",
    marginBottom: "40px !important",
  },
  description: {
    margin: "0 auto",
    fontSize: 20,

  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: "#767676 !important",
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  productPrice: {
    margin: 0
  }
}));
