import Authentication from 'components/Authentication';
import React from 'react'
import styles from '../../styles/Auth.module.css'

function Auth(props: any) {
  const { checkUserData } = props;
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