"use client";

import { Disclosure } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import "../../app/page.scss";

export default function Navbar({ user }: { user: any }) {
  return (
    <Disclosure as="nav" className="bs bk shadow-sm mb-8">
      {() => (
        <>
          <div className="mx-auto font-bold">
            <div className="flex h-14 justify-between">
              <Image
                className="h-8 w-8 rounded-full bs fixed top-3 left-3"
                src={user?.image || "https://i.pravatar.cc/"}
                height={40}
                width={40}
                alt=""
              />
              <div className="fixed top-3 left-20 top-3 text-lg">
                {user?.name}
              </div>
              <button
                className="  text-rose-700 mb-2 fixed top-3 right-5 text-lg"
                onClick={() =>
                  signOut({
                    callbackUrl: `${window.location.origin}/login`,
                  })
                }
              >
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
