"use client";

import React from "react";
import BaseRegister from "../../components/molecules/BaseRegister";
import RegisterForm from "../../components/molecules/Register";
import "../page.scss";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/bg_img.jpg";

export default function Page() {
  return (
    <div className="fullBack">
      <div className="form">
        <div className="container">
          <div className="row register-box">
            <BaseRegister />
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}