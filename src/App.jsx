import React, { useState } from "react";
import { Routes, Route, Navigate, redirect } from "react-router-dom";

import RtlLayout from "./layouts/rtl";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth/index";
const App = () => {
  const [token, setToken] = useState();
  if (1) {
    return <AuthLayout setToken={setToken} />
  }
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
