import * as React from "react";
import { useEffect, useState } from "react";
import ButtonAtom from "../atoms/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import InputAtom from "../atoms/Input";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function EvenimentList() {
  const [eventList, setEventList] = useState([]);
  const [sortType, setSortType] = useState("");
  const [openEvents, setOpenEvents] = useState({});
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    date: new Date(),
    description: "",
    location: "",
  });

  const handleCloseEditDialog = (eventId) => {
    setOpenEvents((prevOpenEvents) => ({
      ...prevOpenEvents,
      [eventId]: false,
    }));
  };

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

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3001/deleteEvent/${eventId}`, {
          method: "DELETE",
        });
        setEventList((prevEventList) =>
          prevEventList.filter((event) => event._id !== eventId)
        );
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
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

  const typesOfEveniment = [
    "Movie",
    "Theater",
    "Concert",
    "Festival",
    "Party",
    "Other",
  ];

  const handleEdit = (eventId) => {
    setEditingEventId(eventId);
    const eventToEdit = eventList.find((event) => event._id === eventId);
    setEditedEvent({
      name: eventToEdit.name,
      date: eventToEdit.date,
      description: eventToEdit.description,
      location: eventToEdit.location,
    });
    setOpenEvents((prevOpenEvents) => ({
      ...prevOpenEvents,
      [eventId]: true,
    }));
  };

  const handleConfirmChanges = async () => {
    try {
      await fetch(`http://localhost:3001/editEvent/${editingEventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedEvent.name,
          date: editedEvent.date,
          description: editedEvent.description,
          location: editedEvent.location,
        }),
      });
      console.log("Edited event: ", editedEvent);

      setEditingEventId(null);
      setOpenEvents((prevOpenEvents) => ({
        ...prevOpenEvents,
        [editingEventId]: false,
      }));
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  return (
    <div>
      <h1>Evenimente</h1>
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
      {sortedEvents.map((event, index) => (
        <div key={event._id}>
          <h3>
            {index + 1}. {event.name}
          </h3>
          <div>
            <p>Date: {event.date}</p>
            <p>Description: {event.description}</p>
            <p>Location: {event.location}</p>
            <ButtonAtom onClick={() => handleEdit(event._id)} label="Edit" />
            <ButtonAtom
              onClick={() => handleDelete(event._id)}
              label="Delete"
            />
          </div>

          <Dialog
            open={openEvents[event._id]}
            onClose={() => handleCloseEditDialog(event._id)}
            fullWidth>
            <div className="col-sm-7 bg-color align-self-center">
              <DialogTitle>Edit Eveniment</DialogTitle>
              <div className="form-group form-box">
                <DialogContent>
                  <DialogContentText>
                    Edit the name of the eveniment.
                  </DialogContentText>
                  <InputAtom
                    type="text"
                    value={editedEvent.name}
                    onChange={(e) =>
                      setEditedEvent({ ...editedEvent, name: e })
                    }
                  />
                </DialogContent>

                <DialogContent>
                  <DialogContentText>
                    Edit the date of the eveniment.
                  </DialogContentText>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      dateFormat="MMMM d, yyyy h:mmaa"
                      value={dayjs(editedEvent.date)}
                      onChange={(e) =>
                        setEditedEvent({
                          ...editedEvent,
                          date: dayjs(e),
                        })
                      }
                    />
                  </LocalizationProvider>
                </DialogContent>

                <DialogContent>
                  <DialogContentText>
                    Edit the description of the eveniment.
                  </DialogContentText>
                  <InputAtom
                    type="text"
                    value={editedEvent.description}
                    onChange={(e) =>
                      setEditedEvent({
                        ...editedEvent,
                        description: e,
                      })
                    }
                  />
                </DialogContent>

                <DialogContent>
                  <DialogContentText>
                    Edit the location of the eveniment.
                  </DialogContentText>
                  <InputAtom
                    type="text"
                    value={editedEvent.location}
                    onChange={(e) =>
                      setEditedEvent({ ...editedEvent, location: e })
                    }
                  />
                </DialogContent>
                <DialogContent>
                  <DialogContentText>
                    Select all grups to invite
                  </DialogContentText>
                  <Chip
                    label="Grup 1"
                    // onClick={handleClick}
                    // onDelete={handleDelete}
                  />
                </DialogContent>
              </div>
              <ButtonAtom
                label="Cancel"
                type={"cancel"}
                onClick={() => handleCloseEditDialog(event._id)}
              />
              <ButtonAtom
                onClick={handleConfirmChanges}
                label="Confirm Changes"
              />
            </div>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
