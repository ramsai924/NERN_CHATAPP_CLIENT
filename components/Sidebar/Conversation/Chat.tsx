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
     const { users, topChat } = data;
     const localData: any = localStorage.getItem("USER")
     const getUserData: any = JSON.parse(localData);
     
     users.forEach((user: any) => {
       if (user._id.toString() !== getUserData._id.toString()){
        console.log('first', user)
         setName(user.firstName)
         setProfile(user.avatar.location)
         setContent(topChat === null ? '' : topChat?.content)
       }
     })
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
            <Avatar src={profile} />
            <div className={styles.name_and_content}>
                  <p>{name}</p>
                  {
                    content && (contentTxt === '' ? <p style={{fontStyle: 'italic'}}>Draft</p> : (
                      <p>Hello hi how are you testing ?</p>
                    ))
                  }
            </div>
        </div>
        {
          time && (
          <div className={styles.conversation_time}>
            {
              
              data.topChat === null ? (
                  <>
                    <TimeFormater date={data?.createdAt}/>
                  </>
              ) : (
                <p>3:00 PM</p>
              )
            }
            
          </div>
          )
        }
        
    </div>
  )
}

export default Chat