import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAtom from "../atoms/Input";
import ButtonAtom from "../atoms/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import MapSearch from "../molecules/MapSearch";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function NewEveniment() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [name, setName] = useState();
  const [type, setType] = useState();
  console.log(selectedLocation);
  // var SelectPlaces = require("react-select-places");
  const handleSubmit = async () => {
    const data = {
      name: name,
      type: type,
      date: selectedDate,
      selectedGroups: selectedGroups,
      latitude: selectedLocation?.lat, // Access latitude from selectedLocation object
      longitude: selectedLocation?.lng, // The longitude value received from MapSearch
    };
    console.log(data);
    const JSONdata = JSON.stringify(data);
    const endpoint = "http://localhost:3001/createEvent";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const handleChipClick = (group) => {
    setSelectedGroups((prevSelectedGroups) => {
      if (prevSelectedGroups.includes(group._id)) {
        return prevSelectedGroups.filter((id) => id !== group._id);
      } else {
        return [...prevSelectedGroups, group._id];
      }
    });
  };
  //dialog buttons handlers
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName("");
    setSelectedDate("");
    setType("");
    setOpen(false);
  };

  const handleMapSearchResult = (latitude, longitude) => {
    setSelectedLocation({ lat: latitude, lng: longitude });
  };

  //types of eveniment that can be selected from the backend menu
  const typesOfEveniment = [
    "Movie",
    "Theater",
    "Concert",
    "Festival",
    "Party",
    "Other",
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:3001/getGroups");
        const data = await response.json();
        setGroups(data); // Set the fetched groups in the state variable
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const isOptionEqualToValue = (option, value) => {
    return option.label === value.label;
  };

  //check if all fields are filled in
  const handleBlankFields = () => {
    const isAnyFieldBlank = !name || !type || !selectedDate;
    console.log(isAnyFieldBlank);
    console.log(selectedLocation);
    return !isAnyFieldBlank;
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        New Event
      </Button>
      <div className="new-form">
        <Dialog open={open} onClose={handleClose} fullWidth zIndex={1000}>
          <div className="col-sm-7 bg-color align-self-center">
            <DialogTitle>New Eveniment</DialogTitle>
            <div className="form-group form-box">
              <DialogContent>
                <DialogContentText>
                  Please enter the name of the eveniment.
                </DialogContentText>
                <InputAtom
                  id="name"
                  label="Eveniment Name"
                  onChange={(event) => setName(event.target.value)}
                  className="name-input"
                />
              </DialogContent>
              <DialogContent>
                <DialogContentText>
                  Please enter the date of the eveniment.
                </DialogContentText>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DateTimePicker", "DateTimePicker"]}>
                    <DateTimePicker
                      id="date"
                      label="Select date"
                      dateFormat="MMMM d, yyyy h:mmaa"
                      onChange={(newValue) => setSelectedDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </DialogContent>
              <DialogContent>
                <DialogContentText>
                  Please enter the type of the eveniment.
                </DialogContentText>
                <Autocomplete
                  disablePortal
                  id="type"
                  options={typesOfEveniment}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                  isOptionEqualToValue={isOptionEqualToValue}
                  onChange={(event, value) => setType(value)}
                />
              </DialogContent>
              <DialogContent>
                <DialogContentText>
                  Please enter the location of the eveniment.
                </DialogContentText>
                <div>
                  <MapSearch />
                </div>
              </DialogContent>
              <DialogContent>
                <DialogContentText>
                  Select all grups to invite
                </DialogContentText>
                <Stack direction="row" spacing={1}>
                  {groups.map((group) => (
                    <Chip
                      key={group._id}
                      label={group.name}
                      onClick={() => handleChipClick(group)}
                      color={
                        selectedGroups.includes(group._id)
                          ? "primary"
                          : "default"
                      }
                    />
                  ))}
                </Stack>
              </DialogContent>
            </div>
            <DialogActions>
              <ButtonAtom
                label="Cancel"
                type={"cancel"}
                onClick={handleClose}
              />
              <ButtonAtom
                label="Submit"
                type={"submit"}
                onClick={() => {
                  if (handleBlankFields()) {
                    handleSubmit();
                    handleClose();
                  } else {
                    alert("Please fill in all the required fields.");
                  }
                }}
              />
            </DialogActions>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
