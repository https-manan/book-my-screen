import React from 'react'
import Banner from './Banner'
import Recommended from './Recommended'
import LiveEvents from './LiveEvents'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Recommended/>
      <LiveEvents/>
    </div>
  )
}

export default Home
