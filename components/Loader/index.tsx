import React from 'react'
import {Comment} from 'react-loader-spinner'

function Loader() {
  return (
    <div style={{height: '100vh', width: '100vh', position:'relative'}}>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}>
              <Comment
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="comment-loading"
                  wrapperStyle={{}}
                  wrapperClass="comment-wrapper"
                  color="#fff"
                  backgroundColor="#F4442E"
              />
        </div>
    </div>
  )
}

export default Loader