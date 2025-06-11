import React from 'react'
import ChatInput from '../components/chat-input'

const page = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <ChatInput inChatPage={false}/>
    </div>
  )
}

export default page