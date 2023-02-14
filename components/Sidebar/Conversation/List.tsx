import React from 'react'
import Chat from './Chat';
import router from 'next/router'
import Appcontext from 'components/Context/AppContext'

function List(props: any) {
  const { conversationList, styles } = props;
  const context: any = React.useContext(Appcontext)
  const { user } = context;

  const navigateConversation = (data: any) => {
    // console.log('data',router, data)
    router.push(`/conversation/${data._id}`)

  }

  return (
    <div className={styles.chat_list_container}>
          {
            conversationList.length > 0 ? (
            conversationList.map((conversation: any, index: any) =>{
              if (conversation?.createdBy?._id === user?._id){
                if (conversation?.topChat === null || conversation?.topChat !== null){
                  return (
                    <Chat
                      data={conversation}
                      key={index}
                      index={index}
                      type="CONVERSATION_LIST"
                      time={true}
                      content={true}
                      functionality="GOTO_CONVERSATION"
                      functionCall={navigateConversation}
                    />
                  )
                }
              }else{
                if (conversation?.topChat !== null) {
                  return (
                    <Chat
                      data={conversation}
                      key={index}
                      index={index}
                      type="CONVERSATION_LIST"
                      time={true}
                      content={true}
                      functionality="GOTO_CONVERSATION"
                      functionCall={navigateConversation}
                    />
                  )
                }
              }
            })
              ) : (
                <p></p>
              )
          }
    </div>
  )
}

export default List