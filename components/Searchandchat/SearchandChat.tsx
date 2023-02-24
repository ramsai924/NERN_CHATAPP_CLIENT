import { TextField } from '@material-ui/core'
import React from 'react'
import styles from '../../src/styles/SearchandChat.module.css'
import ModalHeader from 'components/Modal/Header'
import Chat from 'components/Sidebar/Conversation/Chat';
import Search from 'components/Sidebar/Conversation/Search';
import axios from '../../environment/axios'
import router from 'next/router'
import Appcontext from 'components/Context/AppContext';

function SearchandChat(props: any) {
  const { handleAddUserModal, userData, getUserConversationList } = props;
  const [userList, setUserList] = React.useState([])
  const [searched, setSearched] = React.useState(false);
  const [userdatas, setUserData] = React.useState<any>(null)
  const context: any = React.useContext(Appcontext)
  const { user } = context;

  const fetchResults = (query: any) => {
    // setSearchText(query)
    setSearched(true)
  
    if(query === ''){
      setUserList([])
      return 
    }

    axios.get(`/search-user-list?qs=${query}`).then((res: any) => {
      const { success, data } = res.data
      if(success){
        if (data.length > 0){
          let filterData: any = [...data].filter((dt: any) => dt._id !== userData._id)
          setUserList(filterData)
        }else{
          setUserList([])
        }
      }
    }).catch((err: any) => {
      alert('error occured')
    })
  }

  const createConversation = (data: any) => {
    // console.log('data', data)
    let conversationBody = {
      type: 'PRIVATE',
      users: [userdatas._id, data._id],
      createdBy: userdatas._id
    }

    axios.post('/create-conversation', conversationBody).then((res: any) => {
      if(res.status === 201){
        const { success, data, message } = res.data;
        console.log(res.data)
        if (success === true && data !== null){
          handleAddUserModal()
          setTimeout(() => {
            getUserConversationList(user._id)
            router.push(`/conversation/${data._id}`)
          },500)
          
        }else{
          alert(message)
        }
      }else if(res.status === 200){
        const { success, data, message } = res.data;
        if(data !== null){
          setTimeout(() => {
            getUserConversationList(user._id)
            router.push(`/conversation/${data._id}`)
            handleAddUserModal()
          }, 500)
        }
      }
    })
  }

  React.useEffect(() => {
   
    setUserData(userData)
    return () => {
      setSearched(false)
    }
  }, [userData])


  return (
    <div className={styles.searchandchat_container}>
      <ModalHeader
        handleCloseFun={handleAddUserModal}
        title="Start new chat"
      />
      <Search placeholderText="Search user" fetchResults={fetchResults} />

      <div className={styles.searchuser_result}>
        {
           searched && userList.length === 0 ? (
            <p style={{textAlign: 'center'}}>No user found</p>
          ) : (
              userList.map((user: any, i: any) => (
                <>
                  <Chat
                    data={user}
                    type="SEARCH_LIST"
                    functionality="CREATE_CONVERSATION"
                    functionCall={createConversation}
                    time={false}
                    content={false}
                  />
                </>
              ))
          )
        }
      </div>
    </div>
  )
}

export default SearchandChat