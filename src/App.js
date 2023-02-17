import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Test from "./pages/Test";
import "./index.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </>
  );
}
