import Authentication from 'components/Authentication';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react'
import styles from '../../styles/Auth.module.css'

function Auth(props: any) {
  const { checkUserData } = props;
  const history = useRouter()
  React.useEffect(() => {
    if (Cookies.get('access')) {
      history.push('/')
    }
  }, [])
  return (
    <>
      <Authentication checkUserData={checkUserData} styles={styles} />
    </>
  )
}

export default Auth;

Auth.getLayout = function PageLayout(page: any){
  return (
    <>
      {page}
    </>
  )
}