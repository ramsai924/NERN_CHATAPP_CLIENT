import React from 'react'
import Conversation from './Conversation';
import Profile from './Profile/Index';
import styles from '../../src/styles/Sidebar.module.css'


function Sidebar(props: any) {
  const { userData } = props;
  const [sidebarType, setSidebarType] = React.useState('CONVERSATION')
  

  const onChangeSidebarType = (type: any) => {
    setSidebarType(type)
  }

  
 
  return (
    <>
      {
        sidebarType === 'CONVERSATION' && (
            <Conversation 
              userData={userData}
              onChangeSidebarType={onChangeSidebarType}
            />
        )
      }
      {
        sidebarType === 'PROFILE' && (
          <Profile
            styles={styles}
            onChangeSidebarType={onChangeSidebarType}
          />
        )
      }
    </>
  )
}

export default Sidebar