import React from 'react'
import styles from '../../../src/styles/Sidebar.module.css'
import { Avatar, TextField } from '@material-ui/core';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover, } from 'material-ui-popup-state';
import {
    usePopupState
} from 'material-ui-popup-state/hooks'
import cookies from 'js-cookie'
import Appcontext from 'components/Context/AppContext';
import { useRouter } from 'next/router'
import Modal from 'components/Modal/Modal'
import Group from './Group';

function Header(props: any) {
    const { img, onChangeSidebarType, handleAddUserModal, getUserConversationList  } = props;
    const context: any = React.useContext(Appcontext)
    const [createGroupModal, setcreateGroupModal] = React.useState(false)
    const router: any = useRouter()
    const verticalRef: any = React.useRef(null)

    const { socket, user } = context;
    
    const logoutUser = () => {
        socket.emit('user_offline', { userID: user._id, dateTime: new Date().toUTCString() })
        cookies.remove('access')
        cookies.remove('refresh')
        localStorage.removeItem("USER")
        router.push('/auth')
    }

    const handleCreateGroupModal = () => {
        document.getElementById("main-root")?.click()
        // console.log('usePopupState', usePopupState({ parentPopupState: PopupState, }))f
        setcreateGroupModal(!createGroupModal)
    }

  return (
    <>
        {
            createGroupModal && (
                <Modal title="text">
                    <Group handleCreateGroupModal={handleCreateGroupModal} getUserConversationList={getUserConversationList} />  
                </Modal>
            )
        }
        <div className={styles.sidebar_header}>
        <img src={img} alt="" referrerPolicy={"no-referrer"} style={{ display: 'none' }} />

        <div className={styles.profile_avatar} onClick={() => onChangeSidebarType('PROFILE')}>
            <Avatar src={img} />
        </div>
        <div className={styles.sidebar_header_navigation}>
            {/* <Tooltip title="Add"> */}
            <ChatIcon onClick={handleAddUserModal} />
            {/* </Tooltip> */}
            <div style={{width: 'auto'}}>
            
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <div>
                            <MoreVertIcon {...bindTrigger(popupState)} />
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                style={{maxWidth: '200px'}}
                            >
                                <div className={styles.more_options_Popup}>
                                <div onClick={handleCreateGroupModal}>
                                    <p>Create Group</p>
                                </div>
                                <hr />
                                <div>
                                    <p onClick={logoutUser}>Logout</p>
                                </div>
                                </div>
                            </Popover>
                        </div>
                    )}
                </PopupState>
            </div>
        </div>
    </div>
    </>
      
  )
}

export default Header