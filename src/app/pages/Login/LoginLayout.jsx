import React from 'react';
import './Login.css';
import bg1 from '../../../assets/background.svg';
import Login from './Login';
const LoginLayout = () => {
  return (
      <div className='container'>
      <img
        className='wave'
        src='https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png'
      />
        <div
          className='login-left'
          style={{
            backgroundImage: `url(${bg1})`,
          }}
        >
          {/* login */}
        </div>
        <div className='login-right'>
          <Login />
        </div>
      </div>
  );
};

export default LoginLayout;
