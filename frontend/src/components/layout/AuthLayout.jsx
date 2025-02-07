import React from 'react'
import CARD_1 from "../../assets/images/auth1.jpg"
import CARD_2  from "../../assets/images/auth2.jpg"
import CARD_3 from "../../assets/images/auth3.jpg"

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-1/2 px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Polling App</h2>
        {children}

      </div>
      <div className='hidden md:block w-1/2 h-screen bg-sky-50 bg-cover bg-no-repeat overflow-hidden relative'>
        <img src={CARD_1} alt="element1" className='w-64 lg:w-72 absolute top-[8%] left-[10%] shadow-lg object-cover shadow-blue-400-15 rounded-2xl' />
        <img src={CARD_2} alt="element1" className='w-64 lg:w-72 absolute top-[42%] left-[44%] shadow-lg object-cover shadow-blue-400-15 rounded-2xl' />
        <img src={CARD_3} alt="element1" className='w-64 lg:w-72 absolute top-[70%] left-[10%] shadow-lg object-cover shadow-blue-400-15 rounded-2xl' />
      </div>
    </div>
  )
}

export default AuthLayout