import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: `"Open Sans"`,
    fontSize: 14,
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
            maxWidth: 160,
            width: '100%',
            height: 50,
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
    }
  }
});
