"use client";

import "./page.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useSession } from "next-auth/react";
import Navbar from "../components/molecules/Navbar";
import { redirect } from "next/navigation";
import Admin from "../components/organisms/admin";
import EventsList from "../components/organisms/EventsList";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  if (status === "loading") return <h1 className="loading">Loading ...</h1>;
  console.log(session.user);
  return (
    <main>
      <Navbar user={session?.user} />

      <div className="dashboard">
        {session?.user.role === "ADMIN" ? (
          <Admin />
        ) : (
          <EventsList email={session.user.email} />
        )}
      </div>
    </main>
  );
}
