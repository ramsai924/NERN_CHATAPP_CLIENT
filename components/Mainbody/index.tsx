import React from 'react'
import Headersection from './Chatsection/Header'
import styles from '../../src/styles/Main.module.css'
import ContextBody from './Chatsection/ContextBody'
import SendChat from './Chatsection/FooterInput'
import { useRouter } from 'next/router'
import axios from '../../environment/axios'
import Appcontext from 'components/Context/AppContext'

function Main(props: any) {
  const router: any = useRouter()
  const { query } = router;
  const context: any = React.useContext(Appcontext)
  const { socket, user } = context
  const [conversationData, setConversationData] = React.useState(null)
  const [chatUser, setChatUser] = React.useState(null);
  const [messages, setMessages] = React.useState<any>([]);

  const fetchConversation = async (id: any) => {
    try {
      const response: any = await axios.get(`/get-conversation-data/${id}`);
      if (response.status === 200){
        if (response.data.success){
          const data: any = response.data.data;
          if (user && data?.users?.length >= 2){
            const findOtherUser: any = data?.users.find((usr: any) => usr._id !== user._id)
            setChatUser(findOtherUser)
          }
          setConversationData(data)
        }else{
          alert('Some went wrong while fetching conversation data')
        }
      }
    } catch (err: any) {
      console.log('get conversation err : ', err)
    }
  }

  const fetchMessages = async (id: any) => {
    try {
      const response: any = await axios.get(`/get-messages/${id}`);
      if (response.status === 200) {
        if (response.data.success) {
          const data: any = response.data.data;
          setMessages([...data])
        } else {
          alert('Some went wrong while fetching conversation data')
        }
      }
    } catch (err: any) {
      console.log('get conversation err : ', err)
    }
  }

  React.useEffect(() => {
    setMessages([])
    if (query?.conversationId){
      fetchConversation(query?.conversationId)
      fetchMessages(query?.conversationId)
    }
  }, [query?.conversationId])

  React.useEffect(() => {
    socket.on(`new_conversation_${query?.conversationId}`, (message: any) => {
      console.log('new msg', messages, message)
      
      setMessages([...messages, message?.data])
      
    })
  }, [query?.conversationId, messages])

  // console.log('chatUser', chatUser)

  return (
    <div className={styles.main_container}>
      <Headersection conversationData={conversationData} chatUser={chatUser} />
      <ContextBody user={user} messages={messages} />
      <SendChat chatUser={chatUser} conversationData={conversationData} conversationId={query?.conversationId} />
    </div>
  )
}

export default Main