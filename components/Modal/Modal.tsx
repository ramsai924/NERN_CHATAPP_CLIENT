import React from 'react'
import ReactDom from 'react-dom'
import styles from '../../src/styles/Modal.module.css'

function Modal(props: any) {
    const [isBrowser, setIsBrowser] = React.useState(false);
    const { handleFun, Component, title } = props;
    React.useEffect(() => {
        setIsBrowser(true)
    }, [])

    const ModalContent = (
        <div className={styles.modal_container_overlay}>
            <div className={styles.modal_container}>
                {props.children}
            </div>
        </div>
    )

  if(isBrowser && typeof window !== "undefined"){
      const modalRoot: any = document.getElementById("main-root")
      return ReactDom.createPortal(ModalContent, modalRoot)
  }else{
    return null
  }
}

export default Modal