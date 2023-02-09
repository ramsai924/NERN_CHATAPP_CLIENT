import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Sidebar from 'components/Sidebar'
import Appcontext from 'components/Context/AppContext'
import {useRouter} from 'next/router'


export default function App({ Component, pageProps }: any) {
  const [userData, setUserData] = React.useState<any>(null || undefined)
  const history = useRouter();
  const [loadStatus, setLoadStatus] = React.useState(false)


  // React.useEffect(() => {
  //   const localData: any = localStorage.getItem('USER');
  //   const userData: any = JSON.parse(localData);
    
  //   if (userData !== null) {
  //     history.push('/')
  //   } else {
  //     if (userData?.user?.email !== undefined && userData === null) {
  //       const { email, name, image } = userData?.user;
  //       const [firstName, lastName] = name.split(" ")
  //       // checkUserData(email, firstName, lastName, image)
  //     }
  //   }
  // }, [])


  if(Component.getLayout){
    return Component.getLayout(
        <Component {...pageProps} userData={userData} />
      )
  }
  
  return (
    <>
    <Appcontext.Provider value={{ user: userData }}>
      <div className='main_container'>
        <div className='sidebar_container'>
          <Sidebar userData={userData} />
        </div>
        <div className='main_body_container'>
            <Component {...pageProps} userData={userData} />
        </div>
      </div>
    </Appcontext.Provider>
    </>
  )
}
