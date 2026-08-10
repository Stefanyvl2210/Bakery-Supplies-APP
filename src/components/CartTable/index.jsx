import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { formatMoney } from "../../helpers/formatters";
import { getAvailableStock } from "../../helpers/stock";

const CartTable = ({ products, onDecrease, onIncrease, onRemove }) => {
  const classes = useStyles();

  if (!products.length) {
    return (
      <Paper elevation={0} className={classes.emptyState}>
        <ShoppingCartOutlinedIcon className={classes.emptyIcon} />
        <Typography component="p" className={classes.emptyTitle}>
          Your cart is empty
        </Typography>
        <Typography component="p" className={classes.emptyText}>
          Add a product to start your order.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0} className={classes.container}>
      <Table className={classes.table} aria-label="Shopping cart products">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Unit price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell align="right">
              <span className={classes.visuallyHidden}>Actions</span>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className={classes.tableBody}>
          {products.map((product) => {
            const quantity = Math.max(1, Number(product.qty) || 1);
            const unitPrice = Number(product.price || 0);
            const availableStock = getAvailableStock(product);
            const productKey = product.id ?? product.name;

            return (
              <TableRow key={productKey} className={classes.row}>
                <TableCell component="th" scope="row" className={classes.productCell}>
                  {product.name}
                </TableCell>
                <TableCell data-label="Unit price" className={classes.dataCell}>
                  {formatMoney(unitPrice)}
                </TableCell>
                <TableCell data-label="Quantity" align="center" className={classes.quantityCell}>
                  <div className={classes.quantityControl}>
                    <Tooltip title="Decrease quantity">
                      <span>
                        <IconButton
                          size="small"
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => onDecrease(product)}
                          disabled={quantity <= 1}
                          className={classes.quantityButton}
                        >
                          <RemoveRoundedIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <span className={classes.quantityValue} aria-live="polite">
                      {quantity}
                    </span>
                    <Tooltip
                      title={
                        quantity >= availableStock
                          ? "Maximum available stock reached"
                          : "Increase quantity"
                      }
                    >
                      <span>
                        <IconButton
                          size="small"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => onIncrease(product)}
                          disabled={availableStock === 0 || quantity >= availableStock}
                          className={classes.quantityButton}
                        >
                          <AddRoundedIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell data-label="Subtotal" className={classes.subtotalCell}>
                  {formatMoney(unitPrice * quantity)}
                </TableCell>
                <TableCell align="right" className={classes.actionCell}>
                  <Tooltip title="Remove product">
                    <IconButton
                      aria-label={`Remove ${product.name} from cart`}
                      onClick={() => onRemove(product)}
                      className={classes.removeButton}
                    >
                      <DeleteOutlineRoundedIcon className={classes.removeIcon} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: "14px !important",
    maxWidth: 800,
    overflow: "hidden",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "transparent !important",
      border: "none",
      borderRadius: "0 !important",
      overflow: "visible",
    },
  },
  table: {
    tableLayout: "fixed",
    width: "100%",
    "& th:first-child, & td:first-child": {
      width: "30%",
    },
    "& th:nth-child(2), & td:nth-child(2)": {
      width: 70,
    },
    "& th:nth-child(3), & td:nth-child(3)": {
      width: 90,
    },
    "& th:nth-child(4), & td:nth-child(4)": {
      width: 50,
    },
    "& th:last-child, & td:last-child": {
      width: 80,
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
      "& tbody": {
        display: "block",
      },
    },
  },
  tableHead: {
    backgroundColor: "#F5EEE6",
    "& th": {
      borderBottom: "1px solid #E8DDD4",
      color: "#4D423C",
      fontSize: 15,
      fontWeight: 600,
      padding: "18px 20px",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tableBody: {
    "& tr:last-child td, & tr:last-child th": {
      borderBottom: "none",
    },
  },
  row: {
    backgroundColor: "#F5EEE6",
    transition: "background-color 160ms ease",
    "&:hover": {
      backgroundColor: "#F1E6DC",
    },
    "& td, & th": {
      borderBottom: "1px solid #E5D8CD",
      color: "#211B18",
      fontSize: 16,
      padding: "16px 20px",
    },
    [theme.breakpoints.down("sm")]: {
      border: "1px solid #E5D8CD",
      borderRadius: 14,
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      marginBottom: 14,
      overflow: "hidden",
      padding: "14px 16px",
      "& td, & th": {
        borderBottom: "none",
        boxSizing: "border-box",
        display: "flex",
        padding: "8px 0",
      },
    },
  },
  productCell: {
    overflowWrap: "anywhere",
    [theme.breakpoints.down("sm")]: {
      borderBottom: "1px solid #E5D8CD !important",
      gridColumn: "1 / -1",
      marginBottom: 6,
      paddingBottom: "12px !important",
    },
  },
  dataCell: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      flexDirection: "column",
      gap: 4,
      "&::before": {
        color: "#74675F",
        content: "attr(data-label)",
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
      },
    },
  },
  quantityCell: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      flexDirection: "column",
      gap: 6,
      "&::before": {
        color: "#74675F",
        content: "attr(data-label)",
        fontSize: 12,
        textTransform: "uppercase",
      },
    },
  },
  subtotalCell: {
    fontWeight: "600 !important",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      flexDirection: "column",
      gap: 4,
      "&::before": {
        color: "#74675F",
        content: "attr(data-label)",
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
      },
    },
  },
  quantityControl: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    border: "1px solid #D8C7BA",
    borderRadius: 10,
    display: "inline-flex",
    height: 40,
    justifyContent: "center",
    overflow: "hidden",
  },
  quantityButton: {
    borderRadius: "0 !important",
    color: "#8F4D5C !important",
    height: "38px !important",
    width: "38px !important",
    "&:hover": {
      backgroundColor: "#FBEFF2 !important",
    },
    "&.Mui-disabled": {
      color: "#C8BBB5 !important",
    },
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 600,
    minWidth: 32,
    textAlign: "center",
  },
  actionCell: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-end",
      gridColumn: "2",
      gridRow: "3",
      justifyContent: "flex-end",
    },
  },
  removeButton: {
    color: "#B5445A !important",
    transition: "background-color 160ms ease, transform 160ms ease !important",
    "&:hover": {
      backgroundColor: "#FBE9ED !important",
      transform: "translateY(-1px)",
    },
  },
  removeIcon: {
    fontSize: "24px !important",
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: "#FFFDFC !important",
    border: "1px dashed #D9C8BA",
    borderRadius: "14px !important",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    maxWidth: 820,
    padding: "42px 24px",
    textAlign: "center",
    width: "100%",
  },
  emptyIcon: {
    color: "#C77B8D",
    fontSize: "42px !important",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: "20px !important",
    fontWeight: "600 !important",
    marginBottom: "4px !important",
  },
  emptyText: {
    color: "#74675F",
    fontSize: "15px !important",
  },
  visuallyHidden: {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
}));

export default CartTable;
