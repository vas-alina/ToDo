
import { Outlet } from 'react-router-dom';
import './index.css';

export const App = () => {
  


  return (
    <>
      <div className='container'>
        <h1>TODO LIST</h1>
        <div className="main">
          <Outlet />
        </div>
      </div>
     
    </>
  )
}

