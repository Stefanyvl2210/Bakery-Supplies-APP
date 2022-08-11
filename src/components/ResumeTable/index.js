import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ResumeTable(props) {
  const { orderDetails = {}, maxWidth = 650 } = props;
  
  return (
    <TableContainer component={Paper} sx={{ maxWidth: maxWidth }}>
      <Table sx={{ maxWidth: maxWidth }} aria-label="resume table">
        <TableHead>
          <TableRow>
              <TableCell colSpan={2}>Shipping address</TableCell>
              <TableCell colSpan={2}>Method of payment</TableCell>
          </TableRow>
          <TableRow>
              <TableCell 
                colSpan={2}
                sx={{fontSize: "14px !important", fontWeight: "300 !important" }}
              >
                {orderDetails.shippingAddress}
                </TableCell>
              <TableCell 
                colSpan={2}
                sx={{fontSize: "14px !important", fontWeight: "300 !important" }}
              >
                {orderDetails.paymentMethod}
              </TableCell>
          </TableRow>
          <TableRow>
              <TableCell colSpan={2} sx={{borderRight: "1px solid #AAAAAA !important"}}>Resume</TableCell>
              <TableCell colSpan={1}>Status</TableCell>
              <TableCell colSpan={1}>Delivery time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell component="th" scope="row" colSpan={2} sx={{borderRight: "1px solid #AAAAAA !important"}}>
                    Shipping and handling: ${orderDetails.deliveryValue}
                </TableCell>
                <TableCell component="th" scope="row" colSpan={1}>
                    {orderDetails.status}
                </TableCell>
                <TableCell component="th" scope="row" colSpan={1}>
                    {orderDetails.stringDate}
                </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell component="th" scope="row" colSpan={2} sx={{borderRight: "1px solid #AAAAAA !important"}}>
                    Total before taxes: ${orderDetails.totalBeforeTaxes}
                </TableCell>
                <TableCell component="th" scope="row" colSpan={2}></TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell component="th" scope="row" colSpan={2} sx={{borderRight: "1px solid #AAAAAA !important"}}>
                    Total: ${orderDetails.totalOrder}
                </TableCell>
                <TableCell component="th" scope="row" colSpan={2}></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
