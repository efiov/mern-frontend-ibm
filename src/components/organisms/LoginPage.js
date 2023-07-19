"use client";
import React from "react";
import BaseRegister from "../molecules/BaseRegister";
import LoginForm from "../molecules/Login";
import "../../app/page.scss";
import "bootstrap/dist/css/bootstrap.css";
import "../../app/assets/bg_img.jpg";

export default function Page() {
  return (
    <>
      <div className="form">
        <div className="container">
          <div className="row register-box">
            <BaseRegister />
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
