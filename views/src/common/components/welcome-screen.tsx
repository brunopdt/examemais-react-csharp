import { ReactNode } from 'react'
import bgImage from '../../assets/welcome-screens-background.jpg'
import { Card } from './card'

interface IWelcomeScreenProps {
  children: ReactNode
}

export const WelcomeScreen = ({ children }: Readonly<IWelcomeScreenProps>) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      className="h-svh"
    >
      <Card>{children}</Card>
    </div>
  )
}
