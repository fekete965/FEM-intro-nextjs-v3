import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return <main className="flex justify-center items-center w-screen h-screen bg-slate-900 text-white">{children}</main>
}

export default AuthLayout
