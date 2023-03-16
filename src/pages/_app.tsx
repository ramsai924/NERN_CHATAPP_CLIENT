import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Sidebar from 'components/Sidebar'
import Appcontext from 'components/Context/AppContext'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import io from 'socket.io-client'
import axis from 'axios'
import axios from '../../environment/axios'
let source: any;
const socket = io('http://localhost:3030')

export default function App({ Component, pageProps }: any) {
  const [userData, setUserData] = React.useState<any>(null || undefined)
  const [conversationList, setUserConversationList] = React.useState<any>([])
  const history = useRouter();
  const [loadStatus, setLoadStatus] = React.useState(false)
  source = axis.CancelToken.source();

  const setTokenExpire = (time: any) => {
    const timeOut: any = Math.ceil(new Date(Number(time) * 1000).getTime() - new Date().getTime());
    
    if(isNaN(timeOut) === false){
      setTimeout(() => {
        Cookies.remove('access')
        Cookies.remove('refresh')
        localStorage.removeItem("USER")
        history.push('/auth')
      }, Math.round(timeOut / 1000))
    }
    
  }

  const setUserDatafromServer = (data: any) => {
    const { exp } = data
  
    setUserData(data)
    setTokenExpire(exp)
  }

  const getUserConversationList = (user: any) => {
    axios.get(`/get-user-conversations/${user}`).then((res: any) => {
      if (res.data.success) {
        const { conversations } = res.data.data;
        setUserConversationList([...conversations])
      }
    })
  }


  React.useEffect(() => {
    const accessToken: any = Cookies.get('access');
    const refreshToken: any = Cookies.get('refresh');
    const localData: any = localStorage.getItem('USER');
    const userData: any = JSON.parse(localData);
    
    if (refreshToken !== undefined || accessToken !== undefined) {
      setUserData(userData)
    } else {
      history.push('/auth')
      localStorage.removeItem("USER")
    }

    if (userData !== undefined) {
      // const { exp } = userData
      setTokenExpire(userData?.exp)
    }

    return () => {
      if (source) {
        source.cancel("");
      }
    }

  }, [])

  React.useEffect(() => {
    if(userData){
      window.addEventListener('focus', () => {
        socket.emit('user_online', { userID: userData._id  })
      })

      window.addEventListener('blur', () => {
        socket.emit('user_offline', { userID: userData._id, dateTime: new Date().toUTCString() })
      })
    }
  }, [userData])


  if(Component.getLayout){
    return Component.getLayout(
      <Appcontext.Provider value={{ socket:socket, user: userData, setUserDatafromServer }}>
        <Component {...pageProps} userData={userData} />
      </Appcontext.Provider> 
      )
  }

  
  
  return (
    <>
      <Appcontext.Provider value={{ getUserConversationList, conversationList, socket: socket, user: userData, setUserDatafromServer }}>
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
