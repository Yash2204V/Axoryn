import React from 'react'
import { Footer, Header } from '../../components'

function Landing() {
  return (
    <div className='h-screen overflow-y-auto bg-[#121212] text-white'>
      <Header />
      <section className='relative mx-auto max-w-3xl px-4 py-20 flex justify-center items-center'>
        <h1>Landing</h1>
      </section>
      <Footer />
    </div>
  )
}

export default Landing