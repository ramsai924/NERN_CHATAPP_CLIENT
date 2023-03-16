import { Button } from '@material-ui/core'
import { alertTitleClasses, TextField } from '@mui/material'
import React from 'react'
import styles from '../../src/styles/Auth.module.css'
import axios from '../../environment/axios'
import Cookie from 'js-cookie'
import Appcontext from 'components/Context/AppContext'
import { useRouter } from 'next/router'
import Cartoon from 'components/Cartoon/Cartoon'


interface signupProps {
    email: any,
    password: any
}

function Signin(props: any) {
    const inputRefs: any = React.useRef(null)
    const context: any = React.useContext(Appcontext)
    const [showPass, setshowPass] = React.useState(false);
    const [type, setType] = React.useState("");
    const history = useRouter();

    const { setUserDatafromServer } = context;

    const [signInData, setsignInData] = React.useState<signupProps>({
        email: {
            value: '',
            error: false,
            message: ''
        },
        password: {
            value: '',
            error: false,
            message: ''
        }
    })

    const setErrorValue = (keyName: any, message: any, status: any) => {
        setsignInData((prev: any) => {
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
        setType(e.target.name);
        setsignInData((prev: any) => {
            return {
                ...prev,
                [e.target.name]: {
                    ...prev[e.target.name],
                    value: e.target.value
                }
            }
        })

        if (e.target.name === 'email') {
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
        }

    }

    const onFormSubmit = () => {
        if (signInData.email.value === '') {
            return setErrorValue('email', 'Email is required', true)
        }
        if (signInData.password.value === '') {
            return setErrorValue('password', 'Password is required', true)
        }
        const copySigninObj: any = {...signInData}
        const signinObjKeys: any = Object.keys(signInData);
        const checkAnyErros = signinObjKeys.some((key: any) => copySigninObj[key].error === true)

        if (checkAnyErros){
            return alert('Please provide valid details')
        }

        const { email, password } = copySigninObj

        axios.post('/signin-user', {
            email: email.value,
            password: password.value
        }).then((res: any) => {
            if(res.status === 200){
                if (res.data.success){
                    const { accessToken, refreshToken } = res.data.data;
                    const jwtPayload = JSON.parse(window.atob(accessToken.split('.')[1]))
                    
                    Cookie.set('access', JSON.stringify(accessToken), { expires: new Date(jwtPayload.exp * 1000) })
                    Cookie.set('refresh', JSON.stringify(refreshToken), { expires: new Date(jwtPayload.exp * 1000) })
                    localStorage.setItem("USER", JSON.stringify(jwtPayload))
                    setUserDatafromServer(jwtPayload)
                    history.push('/')
                } 
            }
        }).catch((err: any) => {
            alert(err)
        })

    }

    React.useEffect(() => {
        console.log('inputRef', inputRefs)
        inputRefs.current.focus()
    }, [])

  return (
    <>
        <div style={{display: 'grid', placeItems: 'center'}}>
            <Cartoon 
                emaillength={signInData.email.value.length}
                passwordlength={signInData.password.value.length}
                type={type}
                unhidepassword={showPass}
             />
        </div>
      <form className={styles.auth_form_container} onSubmit={(e: any) => {
          e.preventDefault()
          onFormSubmit()
      }}>
        <div className={styles.auth_form_label}>
            <TextField 
                inputRef={inputRefs} 
                placeholder='Email' 
                name='email'
                value={signInData.email.value}
                onChange={onChangeKey}
                error={signInData.email.error}
                label={signInData.email.error ? signInData.email.message : ""} 
            />
        </div>
        <div className={styles.auth_form_label}>
            <TextField 
                placeholder='Password' 
                name='password'
                value={signInData.password.value}
                onChange={onChangeKey}
                error={signInData.password.error}
                label={signInData.password.error ? signInData.password.message : ""}
            />
        </div>
        <div className={styles.auth_form_label}>
            <Button type='submit' className={styles.auth_submit_btn}>SIGN IN</Button>
        </div>
      </form>
      </>
  )
}

export default Signin