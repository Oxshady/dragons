import React from 'react'
import Hero from './Hero'
import UpcomingMovies from './UpcomingMovies'
import TopRatedMovies from './TopRatedMovies'
import Take_Survey from './Take_Survey'
function HomePage() {
  return (
    <>
      <Hero />
      <Take_Survey />
      <UpcomingMovies />
      <TopRatedMovies />


    </>
  )
}

export default HomePage
