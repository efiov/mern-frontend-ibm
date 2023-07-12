import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InputAtom from '../atoms/Input'
import ButtonAtom from '../atoms/Button'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import dayjs from 'dayjs'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
export default function FormDialog() {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const typesOfEveniment = [
    { label: 'Birthday' },
    { label: 'Wedding' },
    { label: 'Party' },
    { label: 'Conference' },
    { label: 'Meeting' },
    { label: 'Other' },
  ]

  const [selectedDate, setSelectedTime] = useState(new Date())
  return (
    <div>
      <ButtonAtom
        variant="outlined"
        onClick={handleClickOpen}
        label={'New Eveniment'}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Eveniment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the eveniment.
          </DialogContentText>
          <InputAtom id="name" label="Eveniment Name" />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please enter the date of the eveniment.
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Picker"
              onChange={(newValue) => {
                setSelectedTime(newValue)
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please enter the time of the eveniment.
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
          </LocalizationProvider>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please enter the type of the eveniment.
          </DialogContentText>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={typesOfEveniment}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Please enter the location of the eveniment.
          </DialogContentText>
          <InputAtom id="location" label="Location" />
        </DialogContent>

        <DialogActions>
          <ButtonAtom label="Cancel" type={'cancel'} onClick={handleClose} />
          <ButtonAtom label="Submit" type={'submit'} onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </div>
  )
}
