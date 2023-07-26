"use client";

import "./page.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useSession } from "next-auth/react";
import Navbar from "../components/molecules/Navbar";
import { redirect } from "next/navigation";
import Admin from "../components/organisms/admin";
import EventsList from "../components/organisms/EventsList";
import Map from "../components/molecules/Map";
import MapSearch from "../components/molecules/MapSearch";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/getEvents");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  if (status === "loading") return <h1 className="loading">Loading ...</h1>;

  return (
    <main>
      <Navbar user={session?.user} />
      {events.length > 0 && <Map events={events} />}
      {/* <MapSearch /> */}

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
