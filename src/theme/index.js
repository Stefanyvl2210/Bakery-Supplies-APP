import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: `"Open Sans"`,
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
            height: 55,
            margin: '5px 10px',
            color: '#fff'
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
            fontSize: '16px',
            lineHeight: '20px',
            color: "#4E4E4E",
          },
          "& .MuiOutlinedInput-root": {
            height: 55,
            maxWidth: 280,
            width: '100%',
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C86B85",
              borderWidth: 2
            }
          }
        }
      }
    }
  }
});
