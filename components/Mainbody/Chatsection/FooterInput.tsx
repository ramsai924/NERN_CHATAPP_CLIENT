import React from 'react'
import { IoSend } from 'react-icons/io5'
import styles from '../../../src/styles/Main.module.css'
import Appcontext from 'components/Context/AppContext'
import axios from '../../../environment/axios'

function SendChat(props: any) {
    const [message, setMessage] = React.useState('');
    const context: any = React.useContext(Appcontext)
    const { socket, user, getUserConversationList } = context
    const { conversationId, chatUser, conversationData } = props;
    

    const onChangeText = (e: any) => {
        setMessage(e.target.value)
    }

    const createMessage = async () => {
        try {
            const response: any = await axios.post(`/create-message`, {
                content: message,
                conversationId: conversationId,
                userId: user._id,
                users: conversationData.users?.filter((usr: any) => usr._id !== user._id).map((usr1: any) => usr1._id)
            });
            if (response.status === 201) {
                if (response.data.success) {
                    const data: any = response.data.data;
                    setMessage('')
                    getUserConversationList(user._id)
                } else {
                    alert('Some went wrong while fetching conversation data')
                }
            }
        } catch (err: any) {
            console.log('get conversation err : ', err)
        }
    }

    const submitChat = (e: any) => {
        e.preventDefault()
        if (message === '') {
            return;
        }
        createMessage()
    }


  return (
      <div className={styles.main_input_section}>
          <form onSubmit={submitChat}>
              <div>
                  <input placeholder='send message' value={message} onChange={onChangeText} />
              </div>
              <div>
                  <IoSend size={30} onClick={submitChat} />
              </div>
          </form>
      </div>
  )
}

export default SendChat