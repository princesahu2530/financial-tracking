import React from 'react'

const Navbar = () => {
    function logoutFnc() {
        alert("Logout!")
    }
  return (
    <div className='bg-primary px-[1rem] py-[1.2rem] top-0 left-0 w-full flex justify-between items-center sticky '>
      <p className='text-white font-medium text-lg m-0'>FinTrack</p>
      <p className='text-white font-medium text-lg m-0 opacity-[0.8] cursor-pointer hover:opacity-[1] transition-all duration-300' onClick={logoutFnc}>Logout</p>
    </div>
  )
}

export default Navbar
