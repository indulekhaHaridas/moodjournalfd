import React from 'react'

function Preloader() {
  return (
    <>
  <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='md:grid grid-cols-3'>
        <div></div>
        <div className='flex justify-center items-center flex-col p-5 md:p-0'>
        <img  className='' src='https://mir-s3-cdn-cf.behance.net/project_modules/max_632/ac0bc353511683.593715e69d8cb.gif'/> 
        </div>
        <div ></div>
      </div>
    </div>
    </>
  )
}

export default Preloader