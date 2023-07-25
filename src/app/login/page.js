"use client";
import React from "react";
import BaseRegister from "../../components/molecules/BaseRegister";
import LoginForm from "../../components/molecules/Login";
import "../page.scss";
import "bootstrap/dist/css/bootstrap.css";
import "../../app/assets/bg_img.jpg";

export default function Page() {
  return (
    <div className="fullBack">
      <div className="form">
        <div className="container">
          <div className="row register-box">
            <BaseRegister />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
