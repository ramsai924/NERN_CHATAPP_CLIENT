import React from 'react'
import styles from '../../src/styles/Auth.module.css'
import { Button } from '@material-ui/core'
import { TextField } from '@mui/material'

interface signupProps {
    email: any,
    password: any,
    confirmPassword: any,
    firstName: any,
    lastName:any
}

function SignUp() {
    const inputRefs: any = React.useRef(null)
    const [signUpData, setSignUpData] = React.useState<signupProps>({
        email: {
            value: '',
            error: false,
            message: ''
        },
        password: {
            value: '',
            error: false,
            message: ''
        },
        confirmPassword: {
            value: '',
            error: false,
            message: ''
        },
        firstName: {
            value: '',
            error: false,
            message: ''
        },
        lastName: {
            value: '',
            error: false,
            message: ''
        }
    })

    const setErrorValue = (keyName: any, message: any, status: any) => {
        setSignUpData((prev: any) => {
            return {
                ...prev,
                [keyName]: {
                    ...prev[keyName],
                    error: status,
                    message: message
                }
            }
        })
    }

    const onChangeKey = (e: any) => {

        setSignUpData((prev: any) => {
            return {
                ...prev,
                [e.target.name]: {
                    ...prev[e.target.name],
                    value: e.target.value
                }
            }
        })

        if (e.target.name === 'email'){
            if (e.target.value.length < 5) {
                setErrorValue(e.target.name, 'Please provide valid email', true)
            } else {
                setErrorValue(e.target.name, '', false)
            }
        }

        if (e.target.name === 'password') {
            if (e.target.value.length < 6) {
                setErrorValue(e.target.name, 'Password minimum length is 6', true)
            } else {
                setErrorValue(e.target.name, '', false)
            }

            if (signUpData.confirmPassword.value !== '' && signUpData.confirmPassword.value !== e.target.value) {
                setErrorValue('confirmPassword', 'Not matched with password', true)
            } else {
                setErrorValue('confirmPassword', '', false)
            }
        }

        if (e.target.name === 'confirmPassword') {
            if (signUpData.password.value !== e.target.value) {
                setErrorValue(e.target.name, 'Not matched with password', true)
            } else {
                setErrorValue(e.target.name, '', false)
            }
        }

        if (e.target.name === 'firstName') {
            if(e.target.value.length >= 1){
                setErrorValue(e.target.name, '', false)
            }
        }
       
    }

    const onFormSubmit = () => {
       
        if (signUpData.firstName.value === ''){
            setErrorValue('firstName', 'First Name is required', true)
        }
        if (signUpData.email.value === '') {
            setErrorValue('email', 'Email is required', true)
        }
        if (signUpData.password.value === '') {
            setErrorValue('password', 'Password is required', true)
        }
    }
    React.useEffect(() => {
        console.log('inputRef', inputRefs)
        inputRefs.current.focus()
    }, [])

  return (
    <form className={styles.auth_form_container} onSubmit={(e: any) => {
        e.preventDefault()
        onFormSubmit()
    }}>
          <div className={styles.auth_form_label}>
              <TextField 
                inputRef={inputRefs} 
                placeholder='Email' 
                name='email'
                value={signUpData.email.value}
                onChange={onChangeKey}
                error={signUpData.email.error}
                label={signUpData.email.error ? signUpData.email.message : ""}
            />
          </div>
          <div className={styles.auth_form_label}>
              <TextField 
                placeholder='Password' 
                name='password'
                value={signUpData.password.value}
                onChange={onChangeKey}
                error={signUpData.password.error}
                label={signUpData.password.error ? signUpData.password.message : ""}

            />
          </div>
          <div className={styles.auth_form_label}>
              <TextField 
                name='confirmPassword'
                placeholder='Confirm Password'
                value={signUpData.confirmPassword.value}
                onChange={onChangeKey}
                error={signUpData.confirmPassword.error}
                label={signUpData.confirmPassword.error ? signUpData.confirmPassword.message : ""}
                />
          </div>
          <div className={styles.auth_form_label}>
              <TextField 
                name='firstName'
                placeholder='Fisrt Name'
                value={signUpData.firstName.value}
                onChange={onChangeKey}
                error={signUpData.firstName.error}
                label={signUpData.firstName.error ? signUpData.firstName.message : ""}
                />
          </div>
          <div className={styles.auth_form_label}>
              <TextField 
                name='lastName'
                placeholder='Last Name'
                value={signUpData.lastName.value}
                onChange={onChangeKey}
                error={signUpData.lastName.error}
                label={signUpData.lastName.error ? signUpData.lastName.message : ""}
                />
          </div>
          <div className={styles.auth_form_label}>
              <Button type='submit' className={styles.auth_submit_btn}>SIGN UP</Button>
          </div>
      </form>
  )
}

export default SignUp