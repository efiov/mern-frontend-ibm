"use client";

import "./page.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useSession } from "next-auth/react";
import Navbar from "../components/molecules/Navbar";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import Admin from "../components/organisms/admin";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  if (status === "loading") return <h1 className="loading">Loading ...</h1>;

  return (
    <main>
      <Navbar user={session?.user} />
      <div className="dashboard">
        {session?.user.role === "ADMIN" ? <Admin /> : <h1>My Events</h1>}
      </div>
    </main>
  );
}
