'use client'

import ButtonAtom from '../atoms/Button'
import InputAtom from '../atoms/Input'
import 'bootstrap/dist/css/bootstrap.css'
import { Navigate, useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = 'http://localhost:3001/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    if (result.admin == true) {
      // navigate("/admin");
      console.log('admin')
    } else {
      // navigate("/user");
      console.log('user')
    }
  }
  return (
    <div className="col-sm-7 bg-color align-self-center">
      <div className="form-section">
        <div className="title"></div>
        <h3>Login into your account</h3>
        <div className="register-inner-form"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group form-box">
            <InputAtom id="email" name="email" placeholder="Email" />
          </div>
          <div className="form-group form-box">
            <InputAtom
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <ButtonAtom label="Login" type={'submit'} />
          </div>
        </form>
      </div>
    </div>
  )
}
