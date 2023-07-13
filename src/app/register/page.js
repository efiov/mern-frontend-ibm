"use client";
import React from "react";
import BaseRegister from "../../components/organisms/BaseRegister";
import RegisterForm from "../../components/organisms/register";
import "bootstrap/dist/css/bootstrap.css";

export default function Page() {
  return (
    <div className="form">
      <div className="container">
        <div className="row register-box">
          <BaseRegister />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
