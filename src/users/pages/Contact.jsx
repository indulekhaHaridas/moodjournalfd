import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function Contact() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">Contact Us</h2>
          <p className="text-gray-600 text-center mb-8">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out. Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <div className="bg-rose-100 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-lg font-medium mb-4 text-center">Send a Message</h3>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              />
              <textarea
                placeholder="Message"
                rows="4"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-rose-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-rose-600 transition duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Contact