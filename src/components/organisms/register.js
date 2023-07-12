'use client'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import ButtonAtom from '../atoms/Button'
import { useState } from 'react'

export default function Register() {
  const [username, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      name: username,
      email: email,
      password: password,
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = 'http://localhost:3001/register'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    console.log(result)
  }
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Register
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Name
            </Typography>
            <Input
              label="Aurel"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              E-mail
            </Typography>
            <Input
              label="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Password
            </Typography>
            <Input
              label="***********"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div></div>
        </div>
        <Button label="Register" onClick={handleSubmit} />
      </CardContent>
    </Card>
  )
}
