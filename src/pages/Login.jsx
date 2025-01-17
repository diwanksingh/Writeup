import React from 'react';
import { Login } from '../components';  // Ensure you import the Login component properly

function LoginPage() {  // Renaming the function to avoid confusion
  return (
    <div className='py-8'>
        <Login />  {/* Use the correct component name here */}
    </div>
  );
}

export default LoginPage;
