'use client'
import { TextField } from '@mui/material'
const Input = ({ label, defaultLabel, type }) => {
  return (
    <TextField
      label={label}
      type={type}
      id="Input"
      defaultValue={defaultLabel}
      size="small"
    />
  )
}

export default Input
