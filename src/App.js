import React from "react";
import { RenderRoutes } from "./routing/index";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
  DateRangePicker,
  DateRangeDelimiter,
  LocalizationProvider
} from "@mui/x-date-pickers";

function App({ children }) {
  return (
    <div className="App">
      <RenderRoutes />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {children}
    </LocalizationProvider>
    </div>

    
  );
}

export default App;
