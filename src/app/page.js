"use client";

import React from "react";
import "./page.scss";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/bg_img.jpg";
import EventsList from "../components/organisms/EventsList";

export default function Home() {
  return (
    <main>
      <EventsList />
    </main>
  );
}
