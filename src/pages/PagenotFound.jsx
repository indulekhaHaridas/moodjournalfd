import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='md:grid grid-cols-3'>
        <div></div>
        <div className='flex justify-center items-center flex-col p-5 md:p-0'>
        <img src='https://i.pinimg.com/originals/96/8c/05/968c05ea7b23b576fa518e60ada1b3b0.gif'/> 
        <p>Oh No!</p>
        <h1 className='md:text-4xl text-2xl'>Look Like You 're Lost</h1>
        <h5>The Page you  are Looking for is not available</h5>
        <Link to ={'/'}>
        <button className='mt-4 px-4 py-3 bg-purple-400 text-white rounded hover:border hover:border-purple-800 hover:bg-white hover:text-purple-800'>Back Home</button>
        </Link>
       
        </div>
        <div ></div>
      </div>
    </div>
   
    </>
  )
}

export default PagenotFound