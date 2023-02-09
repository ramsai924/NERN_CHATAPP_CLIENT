import { Avatar } from '@material-ui/core';
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendChat from './SendChat';
import ContextBody from './ContextBody';


function Chatsection(props: any) {
    const { styles } = props;
  return (
    <div className={styles.main_container}>
        <div className={styles.main_header}>
            <div className={styles.main_profile_avatar} >
                <Avatar />
                <div className={styles.main_name_and_content}>
                    <p>Ramsai</p>
                    <p>Online</p>
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

export default Chatsection