"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUsers");
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-10 mx-auto lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-4">
        
       {users.map((user) => (
        <div key={user._id} className="flex flex-col items-center">
          <Image
            className="object-cover w-20 h-20 mb-2 rounded-full shadow"
           // src={user?.}
            alt="Person"
            width={50} height={50}
          />
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold">{user.name}</p>
            <p className="text-sm text-gray-800">{user.email}</p>
          </div>
        </div>
       ))}

        



      </div>
    </div>
  );
}
