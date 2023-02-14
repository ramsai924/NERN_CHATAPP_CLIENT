import React from 'react'
import styles from '../../../src/styles/Main.module.css'

function Content(prop: any) {
    const { data  } = prop;
  return (
      <div className={styles.chat_context} style={{ alignSelf: `${true ? 'flex-end' : 'flex-start'}` }}>
          <div className={styles.chat_context_data}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt eligendi possimus sunt maxime, esse in?</p>
              <p>2:00 pm</p>
          </div>
      </div>
  )
}

export default Content