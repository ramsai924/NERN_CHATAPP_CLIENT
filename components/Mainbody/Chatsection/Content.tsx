import moment from 'moment';
import React from 'react'
import styles from '../../../src/styles/Main.module.css'
const colors: any = ['red','pink','yellow','brown', 'blue', 'skyblue']

function Content(prop: any) {
    const { msgData, user  } = prop;
  return (
      <div className={styles.chat_context} style={{ alignSelf: `${msgData?.userId?._id === user?._id ? 'flex-end' : 'flex-start'}` }}>
          <div>
              {(typeof msgData?.conversationId === 'object' && msgData?.conversationId?.type === 'GROUP') && (
                  (typeof msgData?.userId === 'object' && msgData?.userId._id !== user._id) && 
                  (<p 
                      style={{ fontSize: 10, margin: '5px 0', color: colors[Math.floor(Math.random() * (colors.length))] }}
                    >
                        {msgData?.userId?.firstName}
                    </p>)
              )}
              <div className={styles.chat_context_data}>
                  <p>{msgData?.content}</p>
                  <p>{moment(msgData?.createdAt).format('LT')}</p>
              </div>
          </div>
      </div>
  )
}

export default Content