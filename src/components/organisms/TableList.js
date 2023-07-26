import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import InputAtom from "../atoms/Input";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import ButtonAtom from "../atoms/Button";
import "bootstrap/dist/css/bootstrap.css";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function BasicTable({ rows }) {
  const [openEvents, setOpenEvents] = useState({});
  const [editingEventId, setEditingEventId] = useState(null);
  const [row, setrows] = useState();
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    date: new Date(),
    type: "",
    location: "",
  });

  const handleCloseEditDialog = (eventId) => {
    setOpenEvents((prevOpenEvents) => ({
      ...prevOpenEvents,
      [eventId]: false,
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
          type: editedEvent.type,
          location: editedEvent.location,
        }),
      });

      // Assuming the response from the server returns the updated event object,
      // we can find the corresponding event in the rows array and update it with the editedEvent data.
      const updatedRows = rows.map((row) => {
        if (row._id === editingEventId) {
          return {
            ...row,
            name: editedEvent.name,
            date: editedEvent.date,
            type: editedEvent.type,
            location: editedEvent.location,
          };
        }
        return row;
      });

      // Close the edit dialog
      setOpenEvents((prevOpenEvents) => ({
        ...prevOpenEvents,
        [editingEventId]: false,
      }));
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  const handleEdit = (eventId) => {
    setEditingEventId(eventId);
    const eventToEdit = rows.find((event) => event._id === eventId);
    setEditedEvent({
      name: eventToEdit.name,
      date: eventToEdit.date,
      type: eventToEdit.type,
      location: eventToEdit.location,
    });
    setOpenEvents((prevOpenEvents) => ({
      ...prevOpenEvents,
      [eventId]: true,
    }));
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

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant="head" align="center">
                Name
              </TableCell>
              <TableCell variant="head" align="center">
                Type
              </TableCell>
              <TableCell variant="head" align="center">
                Location
              </TableCell>
              <TableCell variant="head" align="center">
                Date
              </TableCell>
              <TableCell variant="head" align="center">
                Groups
              </TableCell>
              <TableCell variant="head" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">
                  {dayjs(row.date).format("HH:mm    DD/MM/YY")}
                </TableCell>
                <TableCell align="center">{row.groups}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit" onClick={() => handleEdit(row._id)}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" onClick={() => handleDelete(row._id)}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {Object.entries(openEvents).map(([eventId, isOpen]) => (
        <Dialog
          fullWidth
          key={eventId}
          open={isOpen}
          onClose={() => handleCloseEditDialog(eventId)}>
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
                    setEditedEvent({ ...editedEvent, name: e.target.value })
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
                  Edit the type of the eveniment.
                </DialogContentText>
                <InputAtom
                  type="text"
                  value={editedEvent.type}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      type: e.target.value,
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
                    setEditedEvent({ ...editedEvent, location: e.target.value })
                  }
                />
              </DialogContent>

              <DialogActions>
                <ButtonAtom
                  label="Cancel"
                  type={"cancel"}
                  onClick={() => handleCloseEditDialog(eventId)}
                />
                <ButtonAtom
                  label="Confirm Changes"
                  onClick={() => handleConfirmChanges(eventId)}
                />
              </DialogActions>
            </div>
          </div>
        </Dialog>
      ))}
    </div>
  );
}
