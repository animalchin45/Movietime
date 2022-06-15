import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { authReset, login } from '../../features/auth/authSlice'

const UserSignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/dashboard')
        } 

        return () => {
            dispatch(authReset())
        }

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        // await dispatch(login(userData))
        toast.promise(
            dispatch(login(userData)),
            {
                pending: 'Just a moment...',
                success: `Welcome back!`,
                error: 'Oops, something went wrong...'
            }
        )
    }

    return (
        <div className='layout__main'>
            <div className="user">
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
                            type='password' 
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                        />
                        <label>Password</label>
                    </div>
                    <div className='user__submit'>
                        <button type='submit' className='btn btn--large'>
                            Submit
                        </button>
                    </div>
                </form>
                <p className='small-text'>Not a member yet? Sign up <Link to={'/register'} className='link-text'>here</Link>.</p>
            </div>
        </div>
    )
}

export default UserSignIn