"use client";

import React from "react";
import BaseRegister from "../../components/molecules/BaseRegister";
import RegisterForm from "../../components/molecules/Register";
import GroupsPage from "../../components/organisms/Groups";
import "../page.scss";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/bg_img.jpg";

export default function Page() {
  return (
    <div className="form">
      <div className="container">
        <div className="row register-box">
          <GroupsPage/>
          {/* <BaseRegister />
          <RegisterForm /> */}
        </div>
      </div>
    </div>
  );
}
