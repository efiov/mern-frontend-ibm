"use client";

import React from "react";
import "../page.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useSession } from "next-auth/react";
import Navbar from "../../components/molecules/Navbar";
import Link from "next/link";
import { redirect } from "next/navigation";
import GroupsPage from "../../components/organisms/Groups";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  if (status === "loading") return <h1>Loading ...</h1>;
  if (session?.user.role === "USER") redirect("/denied");
  return (
    <main>
      <Navbar user={session?.user} />
      <div className="dashboard">
        <h1>Groups</h1>
        <Link href="/" className="link-admin">
          Return to Home Page...
        </Link>
        <GroupsPage />
      </div>
    </main>
  );
}
