import { Button } from '@material-ui/core'
import { TextField } from '@mui/material'
import React from 'react'
import styles from '../../src/styles/Auth.module.css'

function Signin() {
    const inputRefs: any = React.useRef(null)
    const [signinData, setSignInData] = React.useState({
        email: '',
        password: ''
    })
    React.useEffect(() => {
        console.log('inputRef', inputRefs)
        inputRefs.current.focus()
    }, [])

  return (
    <form className={styles.auth_form_container}>
        <div className={styles.auth_form_label}>
            <TextField inputRef={inputRefs} placeholder='Email'/>
        </div>
        <div className={styles.auth_form_label}>
            <TextField placeholder='Password'/>
        </div>
        <div className={styles.auth_form_label}>
            <Button className={styles.auth_submit_btn}>SIGN IN</Button>
        </div>
    </form>
  )
}

export default Signin