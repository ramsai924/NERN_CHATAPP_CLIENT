import React from 'react'
import styles from '../../../src/styles/Main.module.css'
import Content from './Content';

function ContextBody(props: any) {
  const { messages, user } = props;
  const contentBodyRef: any = React.useRef(null)
  
  React.useEffect(() => {
    contentBodyRef.current.scrollTop = contentBodyRef.current.scrollHeight
  }, [messages])

  return (
    <div ref={contentBodyRef} className={styles.main_chat_body} style={{position: 'relative'}} onClick={(e: any) => {}}>
     {
        messages.map((msgData: any, index: any) => <Content key={index} msgData={msgData} user={user} />)
     }
    </div>
  )
}

export default ContextBody