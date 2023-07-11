import styles from "./page.module.css";
import "./page.scss";
import "./assets/bg_img.jpg";
import React from "react";

import BaseRegister from "../components/organisms/BaseRegister";
import LoginForm from "@/components/organisms/Login";
import RegisterForm from "@/components/organisms/Register";

import "bootstrap/dist/css/bootstrap.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="form">
        <div className="container">
          <div className="row register-box">
            <BaseRegister />
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="form">
        <div className="container">
          <div className="row register-box">
            <BaseRegister />
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
