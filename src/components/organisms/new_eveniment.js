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
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

// import SelectPlaces from "react-select-places";
// import "react-select/dist/react-select.css";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  // var SelectPlaces = require("react-select-places");
  const handleSubmit = async (event) => {
    const data = {
      name: name,
      date: selectedDate,
      type: type,
      location: location,
    };
    console.log(data);
    const JSONdata = JSON.stringify(data);
    const endpoint = "http://localhost:3001/create";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
  };

  //dialog buttons handlers
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setName("");
    setSelectedDate("");
    setType("");
    setLocation("");
    console.log(name);
    console.log(selectedDate);
    console.log(type);
    console.log(location);
    setOpen(false);
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
  const isOptionEqualToValue = (option, value) => {
    return option.label === value.label;
  };

  const [selectedDate, setSelectedDate] = useState();
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [location, setLocation] = useState();

  //check if all fields are filled in
  const handleBlankFields = () => {
    const isAnyFieldBlank = !name || !type || !location || !selectedDate;
    console.log(isAnyFieldBlank);
    return !isAnyFieldBlank;
  };

  return (
    <div>
      <ButtonAtom
        variant="outlined"
        onClick={handleClickOpen}
        label={"New Eveniment"}
      />
      <div className="new-form">
        <Dialog open={open} onClose={handleClose} fullWidth>
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
                  onChange={(newValue) => setName(newValue)}
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
                {/* <SelectPlaces onChange={logChange} /> */}
                <InputAtom
                  id="location"
                  label="Location"
                  onChange={(newValue) => setLocation(newValue)}
                  className="location-input"
                />
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
