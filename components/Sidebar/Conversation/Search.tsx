import React from 'react'
import { IoMdSearch } from 'react-icons/io';
import { BsArrowLeftShort } from 'react-icons/bs'
import styles from '../../../src/styles/Sidebar.module.css'

function Search(props: any) {
    const { placeholderText, fetchResults, value } = props;

    const debounce = function () {
        let timer: any;
        return function (e: any) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fetchResults(e.target.value)
            }, 500)
        }
    }

    let onKeyupFunction = debounce()

  return (
      <div className={styles.sidebar_search}>
          <div style={{ width: '50px', height: '30px' }}>
              {/* <BsArrowLeftShort size={25}/> */}
              <IoMdSearch size={18} style={{ marginTop: 5 }} />
          </div>
          <input type={'text'} value={value} onKeyUp={onKeyupFunction} placeholder={placeholderText} />
      </div>
  )
}

export default Search