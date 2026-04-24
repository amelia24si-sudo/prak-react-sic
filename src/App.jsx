import { useState } from 'react'

import { createRoot } from "react-dom/client";
import './assets/tailwind.css';
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from 'react-router-dom';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import NotFound, { BadRequest, Forbidden, Unauthorized } from './pages/NotFound';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="app-container" className="bg-gray-100 flex h-screen overflow-hidden">
      <Sidebar />
      <div id="main-content" className="flex-1 p-4 h-full overflow-y-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<NotFound />} />
          <Route path="400" element={<BadRequest />} />
          <Route path="401" element={<Unauthorized />} />
          <Route path="403" element={<Forbidden />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
