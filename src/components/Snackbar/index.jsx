import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackBar = ({ openSnack, handleCloseSnack }) => {
  return (
    <Snackbar
      open={openSnack.open}
      autoHideDuration={2000}
      onClose={handleCloseSnack}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleCloseSnack}
        severity={openSnack.severity}
        sx={{
          width: "100%",
          alignItems: "center",
          color: "#fff !important",
          background: openSnack.severity === "success" ? "#3eac43" : "#db4e4e",
          "& svg": {
            color: "#fff",
          },
        }}
      >
        {openSnack.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
