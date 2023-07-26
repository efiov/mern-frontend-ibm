"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MenuItem } from "@mui/material";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const { data: session, status, update } = useSession();
  let [isOpen, setIsOpen] = useState(false);
  const email = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const [newName, setNewName] = useState(session?.user.name);
  const [newEmail, setNewEmail] = useState(session?.user.email);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleUpdate() {
    if (!email(newEmail) || newName === "") {
      toast.error("Invalid!");
    } else {
      update({ name: newName, email: newEmail });
    }
  }

  return (
    <>
      <Disclosure as="nav" className="bg-stone-100 bs">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex"></div>

                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={session?.user.image || "https://i.pravatar.cc/"}
                          height={32}
                          width={32}
                          alt={`${session?.user.name || "placeholder"} avatar`}
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-stone-100 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>{session?.user.name}</MenuItem>
                        <MenuItem>
                          <hr />
                          <button onClick={openModal}>Settings</button>
                        </MenuItem>
                        <MenuItem>
                          <hr />
                          <button
                            className="  text-rose-700 text-lg"
                            onClick={() =>
                              signOut({
                                callbackUrl: `${window.location.origin}/login`,
                              })
                            }
                          >
                            Sign out
                          </button>
                        </MenuItem>
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
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={session?.user.image || "https://i.pravatar.cc/"}
                      height={32}
                      width={32}
                      alt={`${session?.user.name} avatar`}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {session?.user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {session?.user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}/login`,
                      })
                    }
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-stone-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-center text-gray-900"
                  >
                    My account
                  </Dialog.Title>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={session?.user.image || "https://i.pravatar.cc/"}
                        height={32}
                        width={32}
                        alt={`${session?.user.name} avatar`}
                      />
                    </div>
                  </div>
                  <div className="mt-4 bg-stone-100">
                    <div className="isolate bg-stone-100 px-6 lg:px-8">
                      <form action="#" method="POST" className="">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="name"
                              className="block text-lg font-bold leading-6 text-gray-900"
                            >
                              Name:
                            </label>
                            <div className="mt-2.5">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="block font-bold w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="email"
                              className="block text-lg font-bold leading-6 text-gray-900"
                            >
                              Email:
                            </label>
                            <div className="mt-2.5">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="block w-full font-bold rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-10">
                          <button
                            type="submit"
                            onClick={handleUpdate}
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
