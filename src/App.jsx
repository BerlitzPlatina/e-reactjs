import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, redirect } from "react-router-dom";

import RtlLayout from "./layouts/rtl";
import AdminLayout from "./layouts/admin";
import { AuthLayout } from "./layouts/auth/index";
function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return tokenString ? JSON.parse(tokenString) : ''
}
const App = () => {
  const [token, setToken] = useState(getToken());
  const handleToken = (num) => {
    console.log('num', num);
    return setToken(num);
  }

  if(!token) {
  
    return <AuthLayout handleToken2={handleToken} />
  } else {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  console.log('token-212', token);

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