import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { authReset, register } from '../../features/auth/authSlice'

const UserRegister = () => {
  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { userName, name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && user) {
      toast.success('New account created!')
      navigate('/dashboard')
    }

    return () => {
      dispatch(authReset())
    }
  }, [user, isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        userName,
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  return (
    <div className='layout__main'>
      <div className='user'>
        <p className='user__message'>Welcome to Movietime!</p>
        <form onSubmit={onSubmit}>
          <div className='user__input'>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
            />
            <label>Email</label>
          </div>
          <div className='user__input'>
            <input
              type='text'
              id='userName'
              name='userName'
              value={userName}
              onChange={onChange}
            />
            <label>User Name</label>
          </div>
          <div className='user__input'>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
            />
            <label>Name</label>
          </div>
          <div className='user__input'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
            />
            <label>Password</label>
          </div>
          <div className='user__input'>
            <input
              type='password'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
            />
            <label>Confirm Password</label>
          </div>
          <div className='user__submit'>
            <button type='submit' className='btn btn--large'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserRegister
