import React from 'react'
import Categories from '../components/Categories'
import Hero from '../components/Hero'
import Header from '../layouts/Header'

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
        <Categories />
      </div>
    </div>
  )
}

export default Home