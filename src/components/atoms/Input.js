'use client'
import { TextField } from '@mui/material'
const Input = ({ label, defaultLabel }) => {
  return (
    <TextField
      label={label}
      id="Input"
      defaultValue={defaultLabel}
      size="small"
    />
  )
}

export default Input
