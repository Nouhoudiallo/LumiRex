import Dashboard from '@/src/pages/dashboard'
import { PropsWithChildren } from 'react'

const layout = ({ children }: PropsWithChildren) => {
  return (
    <Dashboard>
        {children}
    </Dashboard>
  )
}

export default layout