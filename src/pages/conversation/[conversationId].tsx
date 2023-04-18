import React from 'react'
import Main from '../../../components/Mainbody/index'

function ConversationId(props: any) {
  console.log(props)
  return (
    <>
      <Main />
    </>
  )
}

export default ConversationId

export const getServerSideProps = async () => {
  // const response: any = await axios.get(`/get-user-conversations?${req.headers.cookie.toString().split(';')[0].trim()}`)
  // console.log('res__________', response.data, req.headers.cookie.toString().split(';')[0].trim())
  return {
    props: {
      date: 'test'
    }
  }
}


