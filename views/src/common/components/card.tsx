import { ReactNode } from 'react'

interface ICardProps {
  children: ReactNode
}

export function Card({ children }: Readonly<ICardProps>) {
  return (
    <div className="flex items-center h-svh">
      <div className="h-fit w-1/3 bg-background rounded-xl ml-20">
        {children}
      </div>
    </div>
  )
}
