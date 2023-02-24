import { Avatar } from '@material-ui/core';
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { MdEdit } from 'react-icons/md'
import AppContext from '../../Context/AppContext'


function Profile(props: any) {
  const { styles, onChangeSidebarType } = props;
  const context: any = React.useContext(AppContext)
  const { user } = context
  return (
    <div className={styles.profile_container}>
          <div className={styles.profile_header}>
              <div onClick={() => onChangeSidebarType('CONVERSATION')}>
                <BiArrowBack size={25}/>
              </div>
              <div>
                <h3>Profile</h3>
              </div>
          </div>
          <div className={styles.profile_avatar} style={{ justifyContent: 'center' }}>
              <Avatar style={{ width: 150, height: 150, padding: 10, }}/>
          </div>
          <div className={styles.profile_name_navigation}>
              <h4>Your Name</h4>
              <hr />
              <div className={styles.profile_name}>
                <p>{user?.firstName} {user?.lastName}</p>
                <div>
                    <MdEdit />
                </div>
              </div>
          </div>
          <div className={styles.profile_name_navigation}>
              <h4>Your Status</h4>
              <hr />
              <div className={styles.profile_name}>
                  <p>Belive in yourself...!!</p>
                  <div>
                      <MdEdit />
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Profile