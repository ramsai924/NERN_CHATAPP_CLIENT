import { Avatar } from '@material-ui/core';
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendChat from './FooterInput';
import ContextBody from './ContextBody';
import Appcontext from 'components/Context/AppContext'; 
import styles from '../../../src/styles/Main.module.css'
 
function ChatsectionHeader(props: any) {
    const context = React.useContext(Appcontext)
    const [isOnline, setIsOnline] = React.useState(false);
    const { socket, user } = context;
    // console.log('context', context)

    React.useEffect(() => {
        if (user){
            socket.on(`user_online_63e52d739d7160c486120349`, (data: any) => {
                console.log('sockket_', data)
                const { userStatus  } = data;
                setIsOnline(userStatus)
            })
        }
    }, [user])

  return (
    <div className={styles.main_container}>
        <div className={styles.main_header}>
            <div className={styles.main_profile_avatar} >
                <Avatar />
                <div className={styles.main_name_and_content}>
                    <p>Ramsai</p>
                    {isOnline && <p>Online</p>}
                </div>
            </div>
            <div className={styles.main_conversation_header_navigation}>
                <MoreVertIcon />
            </div>
        </div>
        <ContextBody styles={styles} />
        <SendChat styles={styles}/>
    </div>
  )
}

export default ChatsectionHeader