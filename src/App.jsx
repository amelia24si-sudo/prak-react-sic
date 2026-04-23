import { useState } from 'react'

import { createRoot } from "react-dom/client";
import './assets/tailwind.css';
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import NotFound from './pages/NotFound';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <Sidebar />
      <div id="main-content" className="flex-1 p-4">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
