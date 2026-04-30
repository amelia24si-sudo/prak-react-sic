import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/tailwind.css';
import React from 'react';

// 1. Layouts (Disarankan tetap import statis agar kerangka UI langsung muncul)
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from './components/Loading';

// 2. Lazy Load untuk Halaman Utama & Auth (Default Exports)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));

// 3. Lazy Load untuk Halaman Error
// NotFound menggunakan default export
const NotFound = React.lazy(() => import("./pages/NotFound"));

// BadRequest, Unauthorized, dan Forbidden menggunakan named exports, 
// sehingga butuh penyesuaian dengan .then() agar React.lazy bisa membacanya.
const BadRequest = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.BadRequest })));
const Unauthorized = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.Unauthorized })));
const Forbidden = React.lazy(() => import("./pages/NotFound").then(module => ({ default: module.Forbidden })));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<NotFound />} />
          <Route path="400" element={<BadRequest />} />
          <Route path="401" element={<Unauthorized />} />
          <Route path="403" element={<Forbidden />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}