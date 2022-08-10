import React from "react";
import { Route, Routes } from "react-router-dom";

// components
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-completed" element={<Completed />} />
        <Route path="/order-detail" element={<OrderDetail />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<h1>404 Not Found!</h1>} />
      </Routes>
      <Footer />
    </>
  );
}
