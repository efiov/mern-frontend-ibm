"use client";
import React from "react";
import BaseRegister from "../../components/organisms/BaseRegister";
import LoginForm from "../../components/organisms/Login";
import "../page.scss";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/bg_img.jpg";

export default function Page() {
  return (
    <div className="form">
      <div className="container">
        <div className="row register-box">
          <BaseRegister />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}