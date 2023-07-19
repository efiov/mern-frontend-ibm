"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
export default function Home() {
  const { data: session, status, update } = useSession();
  return (
    <>
      <h1>{session?.user.name}</h1>
      <button
        onClick={() =>
          signOut({
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        Sign out
      </button>
    </>
  );
}
