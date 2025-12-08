import Navbar from "./typeScript/E-commerceMini/components/Navbar.js";
import Cart from "./typeScript/E-commerceMini/pages/Cart.js";
import Home from "./typeScript/E-commerceMini/pages/Home.js";
import Login from "./typeScript/E-commerceMini/pages/Login.js";
import ProductDetails from "./typeScript/E-commerceMini/pages/ProductDetails.js";
import Products from "./typeScript/E-commerceMini/pages/Products.js";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from './typeScript/E-commerceMini/components/ProtectedRoutes.js'
import { Toaster } from 'react-hot-toast'
import UserPanelLayout from "./typeScript/E-commerceMini/pages/account/UserPanelLayout.js";
import Orders from "./typeScript/E-commerceMini/pages/account/Orders.js";
import Wishlist from "./typeScript/E-commerceMini/pages/account/WishLists.js";
import Settings from "./typeScript/E-commerceMini/pages/account/Settings.js";
import AdminRoute from "./typeScript/E-commerceMini/components/AdminRoute.js";
import AdminDashboard from "./typeScript/E-commerceMini/pages/admin/AdminDashboard.js";
import AdminLayout from "./typeScript/E-commerceMini/pages/admin/AdminLayout.js";
import AdminProducts from "./typeScript/E-commerceMini/pages/admin/products/AdminProducts.js";
import AdminProductCreate from "./typeScript/E-commerceMini/pages/admin/products/AdminProductCreate.js";
import AdminProductEdit from "./typeScript/E-commerceMini/pages/admin/products/AdminProductEdit.js";
import AdminOrders from "./typeScript/E-commerceMini/pages/admin/orders/AdminOrders.js";
import AdminReports from "./typeScript/E-commerceMini/pages/admin/reports/AdminReports.js";


export default function App() {
  return (
    <div className="mt-[3.5rem]">
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <UserPanelLayout />
            </ProtectedRoute>
          }
        >
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>} >
          <Route index={true} element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="/admin/products/new" element={<AdminProductCreate />} />
          <Route path="/admin/products/edit/:id" element={<AdminProductEdit />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>

  )
}
