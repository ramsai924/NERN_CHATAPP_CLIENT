import React from 'react'
import Chat from './Chat';
import router from 'next/router'

function List(props: any) {
  const { conversationList, styles } = props;

  const navigateConversation = (data: any) => {
    // console.log('data',router, data)
    router.push(`/conversation/${data._id}`)

  }

  return (
    <div className={styles.chat_list_container}>
          {
            conversationList.length > 0 ? (
            conversationList.map((conversation: any, index: any) => (
                <Chat
                  data={conversation}
                  index={index}
                  type="CONVERSATION_LIST"
                  time={true}
                  content={true}
                  functionality="GOTO_CONVERSATION"
                  functionCall={navigateConversation}
                />
                ))
              ) : (
                <p></p>
              )
          }
    </div>
  )
}

export default List