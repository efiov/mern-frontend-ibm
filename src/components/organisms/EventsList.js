"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
export default function EventsList({ email }) {
  const [eventList, setEventList] = useState([]);
  const [modalData, setModalData] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/my", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Request failed.");
        }

        const data = await response.json();
        setEventList(data.events);
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const toDate = (jsonDate) => {
    const dateObject = new Date(jsonDate);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const formattedDate = `${day.toString().padStart(2, "0")} ${months[
      month
    ].padStart(2, "0")} ${year}`;
    return formattedDate;
  };

  return (
    <div className="events-flex">
      <div className="events-box">
        <ul className="list">
          {eventList.map((event) => (
            <li key={event._id}>
              <h2 className="name">{event.name}</h2>
              <p className="">{toDate(event.date)}</p>

              <div className="form-group">
                <button
                  type="button"
                  onClick={() => {
                    setModalData(event);
                    openModal();
                  }}
                  className="btn-primary">
                  Details
                </button>
              </div>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
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
                        leaveTo="opacity-0 scale-95">
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900">
                            Details:
                          </Dialog.Title>
                          <div className="mt-2">
                            <div className="text-sm text-gray-500">
                              <div className="content">
                                {/* <p>Date: {toDate(modalData.date)}</p> */}
                                <p>Type: {modalData.type}</p>
                                <p>Location: {modalData.location}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-50 px-4 py-2 text-sm font-bold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModal}>
                              Got it, thanks!
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="cal-box">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        
        weekends={true}
        events={[
          { title: "event 1", date: "2023-07-25" },
          { title: "event 2", date: "2023-07-26" },
        ]}
      />
      </div> */}
    </div>
  );
}
