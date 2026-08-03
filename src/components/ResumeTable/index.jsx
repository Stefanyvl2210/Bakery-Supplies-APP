import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatDateTime, formatMoney, formatStatus, parseAddressValue } from "../../helpers/formatters";

export default function ResumeTable(props) {
  const { orderDetails = {}, maxWidth = 650 } = props;
  const paymentMethod = orderDetails.payment?.method?.name || orderDetails.paymentMethod;
  const address =
    parseAddressValue(orderDetails.address?.address) ||
    parseAddressValue(orderDetails.guest_address) ||
    orderDetails.shippingAddress ||
    "Pickup";
  
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
                {address}
                </TableCell>
              <TableCell 
                colSpan={2}
                sx={{fontSize: "14px !important", fontWeight: "300 !important" }}
              >
                {paymentMethod || "-"}
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
                    Delivery type: {formatStatus(orderDetails.delivery_type || orderDetails.deliveryType)}
                </TableCell>
                <TableCell component="th" scope="row" colSpan={1}>
                    {formatStatus(orderDetails.status)}
                </TableCell>
                <TableCell component="th" scope="row" colSpan={1}>
                    {formatDateTime(orderDetails.delivery_time || orderDetails.estimate_delivery || orderDetails.deliveryTime)}
                </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell component="th" scope="row" colSpan={2} sx={{borderRight: "1px solid #AAAAAA !important"}}>
                    Total before taxes: {formatMoney(orderDetails.subtotal ?? orderDetails.totalBeforeTaxes)}
                </TableCell>
                <TableCell component="th" scope="row" colSpan={2}></TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell component="th" scope="row" colSpan={2} sx={{borderRight: "1px solid #AAAAAA !important"}}>
                    Total: {formatMoney(orderDetails.total ?? orderDetails.totalOrder)}
                </TableCell>
                <TableCell component="th" scope="row" colSpan={2}></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
