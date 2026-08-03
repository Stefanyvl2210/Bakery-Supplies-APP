import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  authStatus,
  isAdmin,
  userLogged,
} from "../features/auth/AuthSlice";

const SessionLoading = () => (
  <Box
    sx={{
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      minHeight: 160,
    }}
  >
    <CircularProgress aria-label="Loading session" />
  </Box>
);

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const status = useSelector(authStatus);
  const user = useSelector(userLogged);

  if (status === "idle" || status === "loading") {
    return <SessionLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export const RequireCustomer = ({ children }) => {
  const location = useLocation();
  const status = useSelector(authStatus);
  const user = useSelector(userLogged);
  const userIsAdmin = useSelector(isAdmin);

  if (status === "idle" || status === "loading") {
    return <SessionLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (userIsAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export const RedirectAdmin = ({ children }) => {
  const status = useSelector(authStatus);
  const userIsAdmin = useSelector(isAdmin);

  if (status === "idle" || status === "loading") {
    return <SessionLoading />;
  }

  if (userIsAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const status = useSelector(authStatus);
  const user = useSelector(userLogged);
  const userIsAdmin = useSelector(isAdmin);

  if (status === "idle" || status === "loading") {
    return <SessionLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!userIsAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
