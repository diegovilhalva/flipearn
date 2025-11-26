import React from 'react'
import Hero from '../components/Hero'
import LatestListings from '../components/LatestListings'
import Plans from '../components/Plans'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestListings />
      <Plans />
    </div>
  )
}

export default Home