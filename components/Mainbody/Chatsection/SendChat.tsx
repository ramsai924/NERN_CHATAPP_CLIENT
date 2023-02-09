import React from 'react'
import { IoSend } from 'react-icons/io5'

function SendChat(props: any) {
    const {styles} = props;

    const submitChat = (e: any) => {
        e.preventDefault()
        alert('sendChat')
    }
  return (
      <div className={styles.main_input_section}>
          <form onSubmit={submitChat}>
              <div>
                  <input />
              </div>
              <div>
                  <IoSend size={30} onClick={submitChat} />
              </div>
          </form>
      </div>
  )
}

export default SendChat