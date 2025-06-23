import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr]  px-5 py-10 bg-black text-white'>
        <div className='p-3'>
          <img src={logo} alt="Emotly Logo" />
          <p className='mt-4 text-justify'>Emotly is a digital mood journal that helps users track and express
            their emotions through daily entries. With a clean, user-friendly
            interface, it encourages self-reflection and emotional awareness,
            making mental well-being easier to manage one mood at a time.</p>
        </div>
        <div className='flex justify-start md:justify-center'>
          <div className='p-3'>
            <h3 className="font-semibold mb-2">Links</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <Link to={'/'}><li>Home</li></Link>
              <Link to={'/journal'}><li>Journal</li></Link>
              <Link to={'/analysis'}><li>Analysis</li></Link>
              <Link to={'/contact'}><li>Contact</li></Link>
            </ul>
          </div>
        </div>
        <div className='p-3'>
          <h3 className='font-semibold mb-2'>FOLLOW US</h3>
          <p className='mt-4 text-justify'>Let Us be social</p>
          <div className='flex gap-5 mt-3  text-2xl'>
            <FontAwesomeIcon icon={faInstagram} className="" />
            <FontAwesomeIcon icon={faTwitter} className="" />
            <FontAwesomeIcon icon={faFacebook} className="" />
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="bg-purple-400 text-black text-center text-sm py-4">
        Copyright © 2025 All rights reserved | This website is made with ❤️ by
        Indulekha Haridas
      </div>
    </>
  )
}

export default Footer