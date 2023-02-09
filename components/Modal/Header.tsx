import React from 'react'
import { GrFormClose } from 'react-icons/gr'

function Header(props: any) {
    const { title, handleCloseFun } = props;
  return (
    <>
      <div style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
          <div>
              <p style={{margin:2, padding: 2, textAlign: 'center'}}>{title}</p>
          </div>
          <div style={{width: 50, marginTop: 5, cursor: 'pointer'}}>
              <GrFormClose size={20} onClick={handleCloseFun}/>
          </div>
      </div>
      <hr />
      </>
  )
}

export default Header