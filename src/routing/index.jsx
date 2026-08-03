import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { RedirectAdmin, RequireAdmin, RequireCustomer } from "./guards";

// components
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Grid } from "@mui/material";

// admin components
import AdminNavBar from "../components/Admin/NavBar";
import AdminFooter from "../components/Admin/Footer";

// pages
import Home from "../pages/home";
import Login from "../pages/login";
import ForgotPassword from "../pages/login/forgot-password";
import ResetPassword from "../pages/login/reset-password";
import Register from "../pages/register/index";
import VerifyEmail from "../pages/register/verify-email";
import Cart from "../pages/shopping-cart/index";
import Completed from "../pages/shopping-cart/completed";
import Products from "../pages/products";
import ProductDetail from "../pages/detail/index";
import OrderDetail from "../pages/detail/order";
import MyAccount from "../pages/my-account";
import Orders from "../pages/orders";
import GuestOrderTracking from "../pages/orders/guest-tracking";

// Admin
import AdminProducts from "../pages/Admin/products";
import Sidebar from "../components/Admin/Sidebar";
import ProductForm from "../pages/Admin/products/new-product";
import Category from "../pages/Admin/categories/new-category";
import Categories from "../pages/Admin/categories";
import EditCategory from "../pages/Admin/categories/edit-category";
import EditProduct from "../pages/Admin/products/edit-product";
import Logs from "../pages/Admin/logs";
import AdminHome from "../pages/Admin/home";
import AdminOrders from "../pages/Admin/orders";
import AdminPaymentMethods from "../pages/Admin/payment-methods";
import NewPaymentMethod from "../pages/Admin/payment-methods/new-payment-method";
import EditPaymentMethod from "../pages/Admin/payment-methods/edit-payment-method";
import PendingPayments from "../pages/Admin/pending-payments";

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");

  return (
    <>
      {isAdminRoute ? (
        <RequireAdmin>
          <div className="admin-layout">
            <Grid container wrap="nowrap" className="admin-shell">
              <Sidebar />
              <Grid
                item
                className="admin-content"
                sx={{
                  display: "flex",
                  flex: "1 1 auto",
                  flexDirection: "column",
                  minWidth: 0,
                  width: { md: "calc(100% - 238px)", xs: "100%" },
                }}
              >
                <AdminNavBar />
                <main className="admin-main">
                  <Routes>
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/new-product" element={<ProductForm />} />
                    <Route path="/admin/product/:id" element={<EditProduct />} />
                    <Route path="/admin/categories" element={<Categories />} />
                    <Route path="/admin/new-category" element={<Category />} />
                    <Route path="/admin/category/:id" element={<EditCategory />} />

                    <Route path="/admin/logs" element={<Logs />} />
                    <Route path="/admin/pending-payments" element={<PendingPayments />} />
                    <Route path="/admin/payment-methods" element={<AdminPaymentMethods />} />
                    <Route path="/admin/new-payment-method" element={<NewPaymentMethod />} />
                    <Route path="/admin/payment-method/:id" element={<EditPaymentMethod />} />

                    <Route path="*" element={<h1>404 Not Found!</h1>} />
                  </Routes>
                </main>
                <AdminFooter />
              </Grid>
            </Grid>
          </div>
        </RequireAdmin>
      ) : (
        <RedirectAdmin>
          <div className="public-layout">
            <NavBar />
            <main className="public-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email/:id" element={<VerifyEmail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/products" element={<Products />} />
                <Route path="/detail" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-completed" element={<Completed />} />
                <Route path="/order-detail" element={<OrderDetail />} />
                <Route path="/guest-order" element={<GuestOrderTracking />} />
                <Route
                  path="/my-account"
                  element={
                    <RequireCustomer>
                      <MyAccount />
                    </RequireCustomer>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <RequireCustomer>
                      <Orders />
                    </RequireCustomer>
                  }
                />
                <Route path="*" element={<h1>404 Not Found!</h1>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </RedirectAdmin>
      )}
    </>
  );
}
