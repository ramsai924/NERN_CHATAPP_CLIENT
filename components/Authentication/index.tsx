import {useEffect, useState} from 'react'
import { Avatar } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { FcGoogle } from 'react-icons/fc'
import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/router'
import Loader from 'components/Loader';
import styles from '../../src/styles/Auth.module.css'
import axios from '../../environment/axios'
import Modal from 'components/Modal/Modal';
import AuthIndex from './AuthIndex';


function Authentication(props: any) {
    const [auth, setAuth] = useState(true);


  return (
    <>
    {
        auth && (
            <Modal title="">
                <AuthIndex />
            </Modal>
        )
    }
    <div className={styles.auth_container}>
        <div className={styles.auth_section}>
            <div className={styles.auth_left_section}>
                <div className={styles.auth_heading}>
                      <Avatar style={{ width: 70, height: 70 }} alt="Remy Sharp" src="https://m.media-amazon.com/images/S/aplus-media/vc/eeae6f85-4736-4672-9a64-a17ceefe4d87._SL300__.png" />
                </div>
                <h3>All people at one place</h3>
                <p>Find your all friends in one place by signing the app.</p>
                <div className={styles.stack_avatars}>
                    {/* <Stack direction="row" spacing={2}>
                          <Avatar alt="Remy Sharp" src="https://e7.pngegg.com/pngimages/178/419/png-clipart-man-illustration-computer-icons-avatar-login-user-avatar-child-web-design-thumbnail.png" />
                          <Avatar alt="Travis Howard" src="https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png" />
                          <Avatar alt="Cindy Baker" src="https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png" />
                    </Stack> */}
                </div>
            </div>
            <div className={styles.auth_right_section}>
                <div className={styles.auth_oauth_section}>
                    <h1 className={styles.auth_oauth_title}>Let's Get Started</h1>
                    {/* <h2>Log in to your account</h2> */}
                      {/* <CardActionArea style={{borderRadius: '50px'}}>
                          <div className={styles.google_oauth_btn} onClick={() => {
                              Googlelogin()
                          }}>
                              <div>
                                  <FcGoogle />
                              </div>
                              <p>Sign in with Google</p>
                          </div>
                      </CardActionArea> */}
                      
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Authentication
