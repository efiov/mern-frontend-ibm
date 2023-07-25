"use client";

import React from "react";
import Page from "./login/page";
import NewEveniment from "@/components/organisms/NewEveniment";
import EvenimentList from "@/components/organisms/EvenimentList";
// import SearchableMap from "@/components/atoms/SearchableMap";

export default function Home() {
  return (
    <main>
      <div>
        {/* <Page /> */}
        <NewEveniment />
        {/* <EvenimentList /> */}
      </div>
    </main>
  );
}
