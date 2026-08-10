import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import EditOutlined from "@mui/icons-material/EditOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";

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
  const [showPassword, setShowPassword] = React.useState(false);
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
    onChange,
    multiline = false,
    minRows,
    required = false,
  } = props;
  const isPassword = type === "password";
  const registration = register ? register(field) : {};

  const handlePasswordVisibility = () => {
    setShowPassword((isVisible) => !isVisible);
  };

  const preventPasswordButtonMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      variant="standard"
      className={classname}
      style={{ width: width }}
      required={required}
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
          <p style={{ marginTop: 30, marginBottom: 15, fontFamily: "Open Sans", fontSize: "16px", lineHeight: "16px", fontWeight: "400", color: "black" }}>{value}</p>
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
            {...registration}
            {...(onChange ? { value, onChange } : {})}
            fullWidth={fullWidth}
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder || ""}
            error={Boolean(error)}
            multiline={multiline}
            minRows={minRows}
            required={required}
            inputProps={isPassword ? { style: { paddingRight: 48 } } : undefined}
            endAdornment={
              isPassword ? (
                <InputAdornment
                  position="end"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 6,
                    height: 32,
                    maxHeight: "none",
                    margin: 0,
                    transform: "translateY(-50%)",
                  }}
                >
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={handlePasswordVisibility}
                    onMouseDown={preventPasswordButtonMouseDown}
                    size="small"
                    sx={{
                      width: 32,
                      height: 32,
                      padding: 0,
                      color: "text.secondary",
                      backgroundColor: "transparent",
                      "&:hover": {
                        color: "text.primary",
                        backgroundColor: "action.hover",
                      },
                      "&:focus-visible": {
                        outline: "2px solid",
                        outlineColor: "primary.main",
                        outlineOffset: 1,
                      },
                    }}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlined sx={{ fontSize: 20 }} />
                    ) : (
                      <VisibilityOutlined sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
          />

          {error && <small style={{ color: "red" }}>{error}</small>}
        </>
      )}
    </FormControl>
  );
}
