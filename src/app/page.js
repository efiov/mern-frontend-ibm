"use client";

import React from "react";
import Page from "./login/page";
import NewEveniment from "@/components/organisms/new_eveniment";
import EvenimentList from "@/components/organisms/eveniment_list";

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
