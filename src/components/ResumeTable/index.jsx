import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatDateTime, formatMoney, formatStatus, parseAddressValue } from "../../helpers/formatters";

const detailCellStyles = {
  fontSize: "14px !important",
  fontWeight: "300 !important",
  verticalAlign: "top",
};

const informationListStyles = {
  display: "grid",
  gap: "8px",
};

const sectionHeaderStyles = {
  borderBottom: "1px solid #AAAAAA !important",
  fontSize: "16px !important",
  fontWeight: "400 !important",
};

const summaryRowStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "12px 24px",
};

const summaryLabelStyles = {
  display: "block",
  marginBottom: "4px",
};

export default function ResumeTable(props) {
  const { orderDetails = {}, maxWidth = 650 } = props;
  const deliveryType = String(
    orderDetails.delivery_type || orderDetails.deliveryType || ""
  ).toLowerCase();
  const isDelivery = deliveryType === "delivery";
  const isPickup = deliveryType === "pickup";
  const paymentMethod = orderDetails.payment?.method?.name || orderDetails.paymentMethod;
  const paymentReference =
    orderDetails.payment?.reference || orderDetails.paymentReference;
  const address =
    parseAddressValue(orderDetails.address?.address) ||
    parseAddressValue(orderDetails.guest_address) ||
    parseAddressValue(orderDetails.shippingAddress) ||
    "Address unavailable";
  const deliveredAt = orderDetails.delivery_time || orderDetails.deliveryTime;
  const estimatedDelivery = orderDetails.estimate_delivery;
  const deliveryTiming = deliveredAt
    ? { label: "Delivered at", value: deliveredAt }
    : estimatedDelivery
      ? { label: "Estimated delivery", value: estimatedDelivery }
      : null;
  const informationTitle = isDelivery
    ? "Delivery information"
    : isPickup
      ? "Pickup information"
      : "Order information";
  
  return (
    <TableContainer component={Paper} sx={{ maxWidth: maxWidth }}>
      <Table sx={{ maxWidth: maxWidth }} aria-label="order summary table">
        <TableHead>
          <TableRow sx={{ borderBottom: "1px solid #AAAAAA" }}>
            <TableCell colSpan={4}>{informationTitle}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ borderBottom: "1px solid #AAAAAA" }}>
            <TableCell
              component="th"
              scope="row"
              colSpan={2}
              sx={{
                ...detailCellStyles,
                borderRight: "1px solid #AAAAAA !important",
              }}
            >
              <div style={informationListStyles}>
                <div><strong>Type:</strong> {formatStatus(deliveryType)}</div>
                {isDelivery ? <div><strong>Address:</strong> {address}</div> : null}
                <div><strong>Payment:</strong> {paymentMethod || "-"}</div>
                {paymentReference ? (
                  <div><strong>Reference:</strong> {paymentReference}</div>
                ) : null}
              </div>
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              colSpan={2}
              sx={detailCellStyles}
            >
              <div style={informationListStyles}>
                <div><strong>Status:</strong> {formatStatus(orderDetails.status)}</div>
                {isDelivery && deliveryTiming ? (
                  <div>
                    <strong>{deliveryTiming.label}:</strong>{" "}
                    {formatDateTime(deliveryTiming.value)}
                  </div>
                ) : null}
              </div>
            </TableCell>
          </TableRow>
          <TableRow sx={{ borderBottom: "1px solid #AAAAAA" }}>
            <TableCell
              component="th"
              scope="row"
              colSpan={4}
              sx={sectionHeaderStyles}
            >
              Order summary
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row" colSpan={4}>
              <div style={summaryRowStyles}>
                <div>
                  <span style={summaryLabelStyles}>Subtotal</span>
                  {formatMoney(orderDetails.subtotal ?? orderDetails.totalBeforeTaxes)}
                </div>
                <div>
                  <span style={summaryLabelStyles}>Taxes</span>
                  {formatMoney(orderDetails.taxes)}
                </div>
                <div>
                  <span style={summaryLabelStyles}>Total</span>
                  <strong>{formatMoney(orderDetails.total ?? orderDetails.totalOrder)}</strong>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
