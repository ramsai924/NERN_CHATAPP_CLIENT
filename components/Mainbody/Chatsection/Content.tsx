import moment from 'moment';
import React from 'react'
import styles from '../../../src/styles/Main.module.css'

function Content(prop: any) {
    const { msgData, user  } = prop;
  return (
      <div className={styles.chat_context} style={{ alignSelf: `${msgData?.userId === user?._id ? 'flex-end' : 'flex-start'}` }}>
          <div className={styles.chat_context_data}>
              <p>{msgData?.content}</p>
              <p>{moment(msgData?.createdAt).format('LT')}</p>
          </div>
      </div>
  )
}

export default Content