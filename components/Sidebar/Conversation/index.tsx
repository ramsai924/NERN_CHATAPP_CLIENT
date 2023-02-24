import React from 'react'
import Search from './Search';
import List from './List';
import Modal from 'components/Modal/Modal'
import SearchandChat from 'components/Searchandchat/SearchandChat';
import Tooltip from '@mui/material/Tooltip';
import styles from '../../../src/styles/Sidebar.module.css'
import axios from '../../../environment/axios'
import AppContext from '../../Context/AppContext'
import Header from './Header';

function Conversation(props: any) {
    const { userData, onChangeSidebarType, userlist } = props;
    const [img, setImg] = React.useState('')
    const [addUserModal, setAddUserModal] = React.useState(false);
    const context: any = React.useContext(AppContext)
    const { conversationList, socket, user, getUserConversationList } = context
    
    

    React.useEffect(() => {
        if (user !== undefined && user !== null){
            getUserConversationList(user?._id)
            const { avatar,_id } = user
            setImg(avatar?.location !== '' ? avatar?.location : '')

            socket.on(`new_conversation_update_${_id}`, () => {
                const audio = new Audio('https://www.zamzar.com/download.php?uid=19ca5a91354f6407677be52267cf57-f0b2d5adba511ba7&tcs=Z81&fileID=p1gpqcctn91ukdogcncth4j16u14.ogg')
                audio.play()
                getUserConversationList(user?._id)
            })
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
              <Header img={img} getUserConversationList={getUserConversationList} onChangeSidebarType={onChangeSidebarType} handleAddUserModal={handleAddUserModal} />
          
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
