import * as React from "react";
import { useEffect, useState } from "react";
import ButtonAtom from "../atoms/Button";
import TableList from "./TableList";

export default function EvenimentList() {
  const [eventList, setEventList] = useState([]);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getEvents");
        const data = await response.json();
        setEventList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSortType = (type) => {
    setSortType(type);
  };

  const sortedEvents = eventList.slice().sort((a, b) => {
    if (sortType === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    } else if (sortType === "alphabetic") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div>
        <ButtonAtom
          onClick={() => handleSortType("date")}
          label="Sort by Date"
        />
        <ButtonAtom
          onClick={() => handleSortType("alphabetic")}
          label="Sort Alphabetically"
        />
        <ButtonAtom
          onClick={() => handleSortType("newest")}
          label="Sort by Newest"
        />
      </div>
      <TableList rows={sortedEvents} />
    </div>
  );
}
