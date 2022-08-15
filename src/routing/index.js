import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

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
import Register from "../pages/register/index";
import VerifyEmail from "../pages/register/verify-email";
import Cart from "../pages/shopping-cart/index";
import Completed from "../pages/shopping-cart/completed";
import Products from "../pages/products";
import ProductDetail from "../pages/detail/index";
import OrderDetail from "../pages/detail/order";
import MyAccount from "../pages/my-account";
import Payments from "../pages/payments";
import Orders from "../pages/orders";

// Admin
import AdminProducts from "../pages/Admin/products";
import Sidebar from "../components/Admin/Sidebar";
import ProductForm from "../pages/Admin/products/new-product";
import Category from "../pages/Admin/categories/new-category";
import Categories from "../pages/Admin/categories";
import EditCategory from "../pages/Admin/categories/edit-category";
import EditProduct from "../pages/Admin/products/edit-product";

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes() {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes("/admin") ? (
        <>
          <Grid container>
            <Sidebar />
            <Grid item xs={10}>
              <AdminNavBar />
              <Routes>
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/new-product" element={<ProductForm />} />
                <Route path="/admin/product/:id" element={<EditProduct />} />
                <Route path="/admin/categories" element={<Categories />} />
                <Route path="/admin/new-category" element={<Category />} />
                <Route path="/admin/category/:id" element={<EditCategory />} />
                <Route path="*" element={<h1>404 Not Found!</h1>} />
              </Routes>
            </Grid>
          </Grid>

          <AdminFooter />
        </>
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:id" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/detail" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-completed" element={<Completed />} />
            <Route path="/order-detail" element={<OrderDetail />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="*" element={<h1>404 Not Found!</h1>} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}
