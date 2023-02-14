import React from 'react'
import Chatsection from './Chatsection/Header'

function Main(props: any) {
    const { styles } = props;
  return (
    <>
      <Chatsection styles={styles} />
    </>
  )
}

export default Main