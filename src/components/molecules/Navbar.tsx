"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Image from "next/image";
import "../../app/page.scss";

export default function Navbar({ user }: { user: any }) {
  return (
    <Disclosure as="nav" className="bs bk shadow-sm mb-8">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-bold">
            <div className="flex h-14 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <p className="text-lg">{user?.name}</p>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="absolute ml-3 bk">
                  <div>
                    <Menu.Button className="flex rounded-full bk text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full bs"
                        src={user?.image || "https://i.pravatar.cc/"}
                        height={40}
                        width={40}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bk py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <div className="text-center px-4 py-1 text-sm text-gray-700 mt-2">
                          {user?.email}
                        </div>
                      </Menu.Item>
                      <br />
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className=" px-16 py-1 text-rose-700 font-bold mb-2"
                            onClick={() =>
                              signOut({
                                callbackUrl: `${window.location.origin}`,
                              })
                            }
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="border-t border-gray-200 pt-4 pb-3 font-bold">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={user?.image || "https://i.pravatar.cc/"}
                    height={40}
                    width={40}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 font-bold">
                    {user?.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500 font-bold">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() =>
                    signOut({
                      callbackUrl: `${window.location.origin}`,
                    })
                  }
                  className="block font-bold px-4 py-2 text-base font-medium text-rose-700 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
