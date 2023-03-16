import React from 'react'
import ModalHeader from 'components/Modal/Header'
import styles from '../../../src/styles/Sidebar.module.css'
import Search from './Search';
import axios from '../../../environment/axios'
import Chat from './Chat';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { Avatar, Button, TextField } from '@material-ui/core';
import router from 'next/router'
import Appcontext from 'components/Context/AppContext';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

function Group(props: any) {
    const { handleCreateGroupModal, getUserConversationList } = props;
    const [groupName, setGroupName] = React.useState('');
    const [userList, setUserList] = React.useState<any>([])
    const [searched, setSearched] = React.useState(false);
    const [selectedUsers, setSecletedUsers] = React.useState<any>([]);
    const context: any = React.useContext(Appcontext)
    const { user } = context;
    const fetchResults = (query: any) => {
        // setSearchText(query)
        setSearched(true)

        if (query === '') {
            setUserList([])
            return
        }

        axios.get(`/search-user-list?qs=${query}`).then((res: any) => {
            const { success, data } = res.data
            if (success) {
                if (data.length > 0) {
                    // let filterData: any = [...data].filter((dt: any) => dt._id !== userData._id)
                    setUserList(data)
                } else {
                    setUserList([])
                }
            }
        }).catch((err: any) => {
            alert('error occured')
        })
    }

    const addUserToList = (user: any) => {
        if(selectedUsers.length > 10){
            alert('Only 10 users can be added to group')
            return
        }
        if(selectedUsers.some((usr: any) => usr._id === user._id)){
            return;
        }
        setSecletedUsers([...selectedUsers, user])
        setUserList(userList.filter((usr: any) => usr._id !== user._id))
        
    }

    const handleDelete = (chipToDelete: any) => () => {
        setSecletedUsers((users: any) => users.filter((user: any) => user._id !== chipToDelete._id));
        // setUserList([...userList, chipToDelete])

    };

    const createGroup = () => {
        if (groupName === ''){
            alert('Please provide Group Name..!!')
            return;
        }
        let conversationBody = {
            type: 'GROUP',
            name: groupName,
            users: [...selectedUsers.map((usr: any) => usr._id), user._id],
            createdBy: user._id
        }

        axios.post('/create-conversation', conversationBody).then((res: any) => {
            if (res.status === 201) {
                const { success, data, message } = res.data;
                console.log(res.data)
                if (success === true && data !== null) {
                    handleCreateGroupModal()
                    setTimeout(() => {
                        getUserConversationList(user._id)
                        router.push(`/conversation/${data._id}`)
                    }, 500)

                } else {
                    alert(message)
                }
            } else if (res.status === 200) {
                const { success, data, message } = res.data;
                if (data !== null) {
                    setTimeout(() => {
                        getUserConversationList(user._id)
                        router.push(`/conversation/${data._id}`)
                        handleCreateGroupModal()
                    }, 500)
                }
            }
        })
    }

  return (
    <div className={styles.create_group_container}>
          <ModalHeader
              handleCloseFun={handleCreateGroupModal}
              title="Create Group"
          />
          <input 
              type={'text'} 
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter Group Name" 
              style={{padding: '10px'}}
            />
          {
            selectedUsers.length > 0 && (
                  <Paper
                      sx={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          flexWrap: 'wrap',
                          listStyle: 'none',
                          p: 0.5,
                          m: 0,
                          
                      }}
                      component="ul"
                  >
                      {selectedUsers.map((data: any) => {
                          let icon;

                          return (
                              <ListItem key={data.key} style={{ width: 'auto' }}>
                                  <Chip
                                      style={{ background: 'lightgrey', borderRadius: '10px' }}
                                      label={data?.firstName}
                                      onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                  />
                              </ListItem>
                          );
                      })}
                  </Paper>
            )
          }
          <Search placeholderText="Search user" fetchResults={fetchResults} />
          <Button disabled={selectedUsers.length === 0} onClick={createGroup}>Create</Button>
          <div className={styles.searchuser_result}>
              {
                  searched && userList.length === 0 ? (
                      <p style={{ textAlign: 'center' }}>No user found</p>
                  ) : (
                      userList.map((user: any, i: any) => (
                          <>
                              <Chat
                                  data={user}
                                  type="SEARCH_LIST"
                                  functionality="CREATE_CONVERSATION"
                                  functionCall={addUserToList}
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

export default Group