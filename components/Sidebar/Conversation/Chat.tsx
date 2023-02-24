import { Avatar } from '@material-ui/core';
import React from 'react'
import styles from '../../../src/styles/Sidebar.module.css'
import moment from 'moment';
import TimeFormater from 'components/Reuse/TimeFormater';

function Chat(props: any) {
  const { time, content, data, type, functionality, functionCall } = props;
  const [name, setName] = React.useState('');
  const [profile, setProfile] = React.useState('')
  const [contentTxt, setContent] = React.useState('');

  const onclickHandlerFun = () => {
    functionCall(data)
  }

 React.useEffect(() => {
   if (type === 'CONVERSATION_LIST') {
     const { users, topChat, name } = data;
     const localData: any = localStorage.getItem("USER")
     const getUserData: any = JSON.parse(localData);
     setContent(topChat === null ? '' : topChat?.content)
     if (data?.type === 'GROUP'){
       setName(name)
     }else{
       users.forEach((user: any) => {
         if (user._id.toString() !== getUserData._id.toString()) {
           console.log('first', user)
           setName(user.firstName)
           setProfile(user.avatar.location)
           
         }
       })
     }
     
   }

   if (type === 'SEARCH_LIST'){
     const { firstName, avatar } = data;
     setName(firstName)
     setProfile(avatar.location)
   }
 }, [data])



  return (
    <div className={styles.chat_container} onClick={onclickHandlerFun}>
        <div className={styles.chat_avatar_content}>
        {type === 'SEARCH_LIST' && <Avatar src={profile} />}
        {type === 'CONVERSATION_LIST' && (data.type === 'PRIVATE' ? <Avatar src={profile} /> : 'GROUP')}
            <div className={styles.name_and_content}>
                  <p>{name}</p>
                  {
                    content && (contentTxt === '' ? <p style={{fontStyle: 'italic'}}>Draft</p> : (
                      <p>{contentTxt}</p>
                    ))
                  }
            </div>
        </div>
        {
          time && (
          <div className={styles.conversation_time}>
            <TimeFormater date={data?.updatedAt} />
          </div>
          )
        }
        
    </div>
  )
}

export default Chat