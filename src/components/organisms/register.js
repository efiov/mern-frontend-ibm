'use client'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Input from '../atoms/Input'
import ButtonAtom from '../atoms/Button'
import { useState } from 'react'

async function registerUser(credentials) {
  console.log(credentials)
  return fetch('http://localhost:3001/register', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

export default function Register() {
  const [username, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(token)
    const token = await registerUser({
      username,
      email,
    })
    setToken(token)
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
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <ButtonAtom label="Register" onSubmit={!handleSubmit} />
        </CardActions>
      </CardContent>
    </Card>
  )
}
