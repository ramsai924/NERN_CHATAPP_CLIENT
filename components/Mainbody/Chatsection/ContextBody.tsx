import React from 'react'
import styles from '../../../src/styles/Main.module.css'
import Content from './Content';

function ContextBody(props: any) {
    // const { styles } = props;

  return (
    <div className={styles.main_chat_body} style={{position: 'relative'}} onClick={(e: any) => {}}>
     {
        new Array(4).fill('').map((msgData: any, index: any) => <Content key={index} {...msgData} />)
     }
    </div>
  )
}

export default ContextBody