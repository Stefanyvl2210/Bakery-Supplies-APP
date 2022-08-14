import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { EditOutlined } from "@mui/icons-material";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "&.MuiFormControl-root": {
    width: "100% !important",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function CustomizedInputs(props) {
  const {
    register,
    field,
    fullWidth,
    width,
    classname,
    placeholder,
    type = "text",
    label = "label",
    icon,
    showValue = false,
    handleInput,
    value,
    error,
  } = props;

  return (
    <FormControl
      variant="standard"
      className={classname}
      style={{ width: width }}
    >
      {showValue ? (
        <>
          <div style={{ textAlign: "end" }}>
            <InputLabel shrink>
              {label}

              {icon && (
                <span onClick={() => handleInput(field)}>
                  <EditOutlined
                    fontSize="12"
                    style={{ marginLeft: 20, cursor: "pointer" }}
                  />
                </span>
              )}
            </InputLabel>
          </div>
          <p
            style={{
              marginTop: 30,
              marginBottom: 15,
              fontFamily: "Open Sans",
              fontSize: "16px",
              lineHeight: "16px",
              fontWeight: "400",
              color: "black",
            }}
          >
            text
          </p>
        </>
      ) : (
        <>
          <InputLabel shrink>
            {label}

            {icon && (
              <span onClick={() => handleInput(field)}>
                <EditOutlined
                  fontSize="12"
                  style={{ marginLeft: 20, cursor: "pointer" }}
                />
              </span>
            )}
          </InputLabel>
          <BootstrapInput
            {...register(field)}
            fullWidth={fullWidth}
            type={type}
            placeholder={placeholder || ""}
            error={Boolean(error)}
          />

          {error && <small style={{ color: "red" }}>{error}</small>}
        </>
      )}
    </FormControl>
  );
}
