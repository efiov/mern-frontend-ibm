"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";

export default function BaseRegister() {
  return (
    <div className="col-sm-5 bg-img align-self-center">
      <div className="info">
        <div className="logo clearfix"></div>
        <div className="btn-section clearfix">
          <Link
            href="/login"
            className="nav-link link-btn btn-primary default-bg"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="nav-link link-btn btn-primary default-bg"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}