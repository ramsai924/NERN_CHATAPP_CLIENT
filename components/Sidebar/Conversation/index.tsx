import React from 'react'
import { Avatar, TextField } from '@material-ui/core';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Search from './Search';
import List from './List';
import Modal from 'components/Modal/Modal'
import SearchandChat from 'components/Searchandchat/SearchandChat';
import Tooltip from '@mui/material/Tooltip';
import styles from '../../../src/styles/Sidebar.module.css'
import axios from '../../../environment/axios'
import AppContext from '../../Context/AppContext'

function Conversation(props: any) {
    const { userData, onChangeSidebarType, userlist } = props;
    const [img, setImg] = React.useState('')
    const [addUserModal, setAddUserModal] = React.useState(false);
    const [conversationList, setUserConversationList] = React.useState<any>([])
    const context: any = React.useContext(AppContext)
    const { user } = context
    
    const getUserConversationList = () => {
        axios.get(`/get-user-conversations/${user?._id}`).then((res: any) => {
            if (res.data.success) {
                const { conversations } = res.data.data;
                setUserConversationList([...conversations])
            }
        })
    }

    React.useEffect(() => {
        if (user !== undefined && user !== null){
            getUserConversationList()
            const { avatar } = user
            setImg(avatar?.location !== '' ? avatar?.location : '')
        }
    }, [user])

    const handleAddUserModal = () => {
        setAddUserModal(!addUserModal)
    }


  return (
        <>
          {
            addUserModal && (
                <Modal title="text">
                      <SearchandChat 
                        userData={userData} 
                        handleAddUserModal={handleAddUserModal} 
                        getUserConversationList={getUserConversationList}
                    />
                </Modal>
            )
          }
        <div className={styles.sidebar_container_left}>
            {/* header section  */}
          <div className={styles.sidebar_header}>
              <img src={img} alt="" referrerPolicy={"no-referrer"} style={{display:'none'}}/>
             
              <div className={styles.profile_avatar} onClick={() => onChangeSidebarType('PROFILE')}>
                  <Avatar src={img} />
                
              </div>
              <div className={styles.sidebar_header_navigation}>
                    {/* <Tooltip title="Add"> */}
                        <ChatIcon onClick={handleAddUserModal} />
                    {/* </Tooltip> */}

                  <MoreVertIcon />
              </div>
          </div>
          
          {/* search user and chat section  */}
          <Search 
            placeholderText="search user and chat" 
            searchFunction={() => {}} 
           />

           {/* conversation list section */}
          <List conversationList={conversationList} styles={styles} />
      </div>
      </>
  )
}

export default Conversation;
