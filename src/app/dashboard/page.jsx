"use client";

import { useSession, signOut } from "next-auth/react";
import Navbar from "../../components/molecules/Navbar";
import Image from "next/image";
import "../page.scss"
export default function Home() {
  const { data: session, status, update } = useSession();
  return (
    <>
      <Navbar user={session?.user}/>
<h1>d</h1>
    </>
  );
}
