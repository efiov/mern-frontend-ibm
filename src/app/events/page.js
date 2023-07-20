"use client";

import React from "react";

import "../page.scss";
import "bootstrap/dist/css/bootstrap.css";
import EventsList from "../../components/organisms/EventsList";
import Navbar from "../../components/molecules/Navbar";

export default function Page() {
  return (
    <div className="form">
      <div className="container">
        <div className="row register-box"></div>
        <Navbar />
        <EventsList />
      </div>
    </div>
  );
}
