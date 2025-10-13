import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Link to="/login" className='text-2xl font-semibold text-white rounded-xl  bg-primary hover:bg-primary/80 py-2 px-4'>Go to Login</Link>
    </div>
  )
}

export default Landing