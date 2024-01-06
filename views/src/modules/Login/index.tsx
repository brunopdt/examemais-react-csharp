import bgImage from '../../assets/welcome-screens-background.jpg';
import { Card } from './components/card';
import { Form } from './components/form';

export const Login = () => {
  return (
    <div style={{ 
      backgroundImage: `url(${bgImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }} className='h-svh'>
      <Card>
        <Form />
      </Card>
    </div>
  )
}