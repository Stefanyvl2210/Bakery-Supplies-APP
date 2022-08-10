import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
  const { rows, columns = [], maxWidth = 650 } = props;
  return (
    <TableContainer component={Paper} sx={{ maxWidth: maxWidth }}>
      <Table sx={{ maxWidth: maxWidth }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell key={i}>{column.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              
              {columns.map((column, i) => (
                <TableCell component="th" scope="row" key={i}>
                  {column.key === "unitPrice" || column.key === "subtotal" ? `$${row[column.key]}`: row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
