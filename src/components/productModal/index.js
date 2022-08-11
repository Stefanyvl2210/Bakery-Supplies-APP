import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Alert, Button, Grid, IconButton, Snackbar, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../features/counter/counterSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    marginTop: "65px",
    marginBottom: "65px",
    marginLeft: "55px",
    marginRight: "55px",
    padding: "0px",
  },
  "& .MuiDialogActions-root": {},
  "& .MuiDialog-paper": {
    maxWidth: "1050px !important",
    height: 530,
    backgroundColor: "#F5EEE6 !important",
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
            color: "black",
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, handleClose, selectedProduct } = props;
  
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.modal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent className={classes.modalContainer}>
          <Grid
            container
            direction={{ xs: "column", md: "row"}}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              display="flex"
              alignItems="center"
              justifyContent="center"
              xs
              sx={{ marginRight: { xs: "0px", md: "40px" }}}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.alt}
                className={classes.productImage}
              />
            </Grid>

            <Grid item xs>
              <h4 className={classes.productName}>{selectedProduct.name}</h4>

              <Typography
                gutterBottom
                className={classes.description}
                sx={{ fontWeight: "light" }}
              >
                {selectedProduct.description}
              </Typography>

              <p className={classes.productPrice}>
                Price: ${selectedProduct.price}
              </p>

              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => {
                    dispatch(
                      addCartProduct({
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        qty: 1,
                      })
                    );
                    handleClick()
                  }}
                  sx={{ bgcolor: "#C86B85 !important" }}
                >
                  Add to Cart
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar 
            open={openSnack} 
            autoHideDuration={2000} 
            onClose={handleCloseSnack} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={handleCloseSnack} 
              severity="success" 
              sx={{ 
                width: '100%', 
                alignItems: "center", 
                color: "#fff !important", 
                background: "#3eac43",
                "& svg": {
                  color: "#fff"
                }
              }}
            >
              Product added to cart!
            </Alert>
          </Snackbar>
        </Stack>
      </BootstrapDialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "0px 0 !important",
    padding: "0px !important",
  },
  productName: {
    margin: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "normal",
    marginBottom: "40px !important",
    fontFamily: "Poiret One",
  },
  productImage: {
    maxWidth: "550px",
    width: "100%",
    objectFit: "contain",
    [theme.breakpoints.down('md')]: {
      marginBottom: "30px !important",
    }
  },
  description: {
    margin: "0 auto",
    fontSize: "20px !important",
    fontFamily: "Open Sans",
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
    alignItems: "center",
  },
  productPrice: {
    margin: 0,
    marginTop: "20px",
    fontFamily: "Open Sans",
    fontSize: 20,
  },
  modalContainer: {
    display: "flex",
  },
  modal: {
    [theme.breakpoints.down('md')]: {
      "& .MuiDialog-paper":{
        maxWidth: "600px !important",
        flexWrap: "nowrap !important",
        height: "fit-content !important",
        maxHeight: "calc(100% - 110px) !important",
        marginTop: "115px !important"
      }
    },
  }
}));
