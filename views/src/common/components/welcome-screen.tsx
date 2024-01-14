import bgImage from '../../assets/welcome-screens-background.jpg'
import { Card } from './card'
import { Outlet } from 'react-router-dom'

export const WelcomeScreen = () => {
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
      <Card>
        <Outlet />
      </Card>
    </div>
  )
}
