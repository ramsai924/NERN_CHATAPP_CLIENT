import React from 'react'
import ModalHeader from '../Modal/Header'
import styles from '../../src/styles/Auth.module.css'
import Signin from './Signin'
import SignUp from './SignUp'

function AuthIndex() {
    const [contentType, setContentType] = React.useState('SIGNUP')

    // window.addEventListener("orientationchange", function () {
    //     alert(window.orientation);
    // }, false);

    return (
        <div className={styles.auth_modal_container}>
            <ModalHeader
                handleCloseFun={() => { }}
                title=""
            />
            <div className={styles.auth_modal_selection}>
                <div className={styles.auth_modal_option} onClick={() => setContentType("SIGNIN")}>
                    <p style={{fontWeight: `${contentType === "SIGNIN" ? "800" : ""}`}}>Sign in</p>
                </div>
                <div className={styles.auth_modal_option} onClick={() => setContentType("SIGNUP")}>
                    <p style={{ fontWeight: `${contentType === "SIGNUP" ? "800" : ""}`}}>Sign Up</p>
                </div>
            </div>
            <hr style={{opacity: '0.3'}}/>
            <div className={styles.auth_modal_body}>
                {contentType === 'SIGNIN' && <Signin />}
                {contentType === 'SIGNUP' && <SignUp />}
            </div>
        </div>
    )
}

export default AuthIndex