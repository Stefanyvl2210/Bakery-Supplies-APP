import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: `"Open Sans", "Poiret One"`,
    fontSize: 20,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#C86B85",
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E5E5E5",
          margin: '50px 0px'
        }        
      }
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            textTransform: 'none',
            minWidth: '150px',
            maxWidth: '100%',
            height: 50,
            margin: '5px 10px',
            color: '#fff',
            boxShadow: 'none !important',
            fontWeight: '400'
          },
        },
        {
          props: { color: 'secondary' },
          style: {
            border: `4px dashed #000`,
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          minWidth: '280px',
          width: '100%',
          label : {
            fontWeight: '400',
            fontSize: '18px',
            lineHeight: '20px',
            color: "#4E4E4E",
          },
          "& .MuiOutlinedInput-root": {
            height: 50,
            maxWidth: 280,
            width: '100%',
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2
            }
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '20px'
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: "3px 9px"
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "16px"
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          // maxHeight: "50px"
        }
      }
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          "& .PrivatePickersFadeTransitionGroup-root": {
            fontSize: "18px",
          },
          "& .MuiPickersArrowSwitcher-spacer": {
            width: "0"
          }
        }
      }
    },
    
  }
});
