import React, { PropsWithChildren } from 'react'

export default function layout(props:PropsWithChildren) {
  return (
    <div className='h-screen flex items-center justify-center max-w-3xl m-auto max-md:m-4'>
      {props.children}
    </div>
  )
}
