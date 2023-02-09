import React from 'react'

function ContextBody(props: any) {
    const { styles } = props;
  return (
    <div className={styles.main_chat_body}>
        <div className={styles.chat_context} style={{alignSelf: `${true ? 'flex-end' : 'flex-start'}`}}>
            <div className={styles.chat_context_data}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt eligendi possimus sunt maxime, esse in?</p>
                <p>2:00 pm</p>
            </div>
        </div>
          <div className={styles.chat_context} style={{ alignSelf: `${false ? 'flex-end' : 'flex-start'}` }}>
              <div className={styles.chat_context_data}>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facilis numquam totam vitae illum non eos commodi optio voluptas eius reiciendis beatae, quasi qui eveniet molestias perspiciatis quam recusandae aliquid?</p>
                  <p>2:00 pm</p>
              </div>
          </div>
    </div>
  )
}

export default ContextBody