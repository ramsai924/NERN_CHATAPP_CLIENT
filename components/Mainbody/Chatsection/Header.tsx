import { Avatar } from '@material-ui/core';
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Appcontext from 'components/Context/AppContext'; 
import styles from '../../../src/styles/Main.module.css'
import moment from 'moment';
import TimeFormater from 'components/Reuse/TimeFormater';

function ChatsectionHeader(props: any) {
    const context: any = React.useContext(Appcontext)
    const [isOnline, setIsOnline] = React.useState(false);
    const [lastSeen, setLastSeen] = React.useState(null);

    const { socket, user } = context;
    const { chatUser, conversationData } = props;
    // console.log('chatUser', chatUser, conversationData)
    React.useEffect(() => {
        if (chatUser){
            const { lastseen } = chatUser;
            setLastSeen(lastseen)

            socket.on(`user_online_${chatUser?._id}`, (data: any) => {
                console.log('sockket_', data)
                const { userStatus  } = data;
                setIsOnline(userStatus)
            })

            socket.on(`user_offline_${chatUser?._id}`, (data: any) => {
                console.log('sockket_', data)
                const { userStatus, dateTime } = data;
                setLastSeen(dateTime)
                setIsOnline(userStatus)
            })
        }
    }, [chatUser])

  return (
    <div className={styles.main_header}>
            <div className={styles.main_profile_avatar} >
                <Avatar />
                <div className={styles.main_name_and_content}>
                    {
                      conversationData && conversationData?.type === 'GROUP' ? (
                          <p>{conversationData?.name}</p>
                      ) : (
                          <p>{chatUser?.firstName} {chatUser?.lastName}</p>
                      )
                    }
                  {
                      conversationData && conversationData?.type === 'PRIVATE' && (
                        <>
                              {isOnline ? <p>Online</p> : lastSeen && <TimeFormater date={lastSeen} chatType="CONVERSATION_DATA" />}
                        </>
                      )
                  }
                  
                </div>
            </div>
            <div className={styles.main_conversation_header_navigation}>
                <MoreVertIcon />
            </div>
        </div>
  )
}

export default ChatsectionHeader