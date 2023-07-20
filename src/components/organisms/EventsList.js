"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
export default function EventsList() {
  const [eventList, setEventList] = useState([]);
  let [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    // Fetch the array of objects from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/ge");
        const data = await response.json();
        setEventList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div>
        <div className="container">
          <h2 className="title">Events</h2>
          <ul className="list">
            {eventList.map((event, index) => (
              <li>
                <div key={event._id}>
                  <h2 className="name">
                    {index + 1}. {event.name}
                  </h2>

                  <div className="form-group">
                    <button
                      type="button"
                      onClick={openModal}
                      className="btn-primary"
                    >
                      View Details
                    </button>
                  </div>
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Details:
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  <div className="content">
                                    <p>Date: {event.date}</p>
                                    <p>Description: {event.description}</p>
                                    <p>Location: {event.location}</p>
                                  </div>
                                </p>
                              </div>

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeModal}
                                >
                                  Got it, thanks!
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </div>
              </li>
            ))}
          </ul>
          <div className="imgContainer">
            <Image
              className="img"
              fill={true}
              src="https://img.freepik.com/premium-vector/barista-making-giving-takeaway-coffee-customers_179970-3103.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
