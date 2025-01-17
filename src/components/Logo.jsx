import React from 'react'

function Logo({ width = '45px' , height= '45px' }) {
  return (
    <div>
      <img src="logo.png" alt="Logo" style= {{ width,height }} />
    </div>
  )
}

export default Logo
