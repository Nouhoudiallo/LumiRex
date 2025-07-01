import React, { PropsWithChildren } from 'react'
import { cn } from '../lib/utils'

interface Props extends PropsWithChildren {
    className?: string
}

const Wrapper = ({ children, className }:Props) => {
  return (
    <div className={cn('min-h-screen px-5 md:px-[10%] mt-4 mb-10 mx-5', className)}>
      {children}
    </div>
  )
}

export default Wrapper
