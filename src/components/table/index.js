import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";

export default function BasicTable(props) {
  const { rows, columns = [], maxWidth = 650, viewOrders = false } = props;
  return (
    <TableContainer component={Paper} sx={{ maxWidth: maxWidth }}>
      <Table sx={{ maxWidth: maxWidth }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell key={`column-${i}`}>{column.name}</TableCell>
            ))}
            {viewOrders && 
            <TableCell key="additional"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`row-${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              
              {columns.map((column, i) => (
                <React.Fragment key={i}>
                  <TableCell component="th" scope="row" key={column.key}>
                    {column.key === "unitPrice" || column.key === "subtotal" ? `$${row[column.key]}`: row[column.key]}
                  </TableCell>
                  {i+1 == columns.length && viewOrders &&
                    <TableCell component="th" scope="row" key={i+1}>
                      <Button
                        variant="contained"
                        sx={{ 
                          margin: "0 !important", 
                          minWidth: "50px !important",
                          height: "40px !important",
                          background: "#FFFFFF !important",
                          borderRadius: "7px !important",
                          border: "1px solid #767676 !important"
                        }}
                      >
                        <SearchIcon sx={{color: "black",}}/>
                      </Button>
                    </TableCell>
                  }
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
