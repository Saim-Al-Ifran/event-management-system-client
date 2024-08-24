import React from 'react'
import Banner from './sections/Banner'
import EventCategories from './sections/EventCategories'
import EventsSection from './sections/EventSection'

const Home:React.FC = () => {
  return (
    <>
       <Banner/>
       <EventCategories/>
       <EventsSection/>
    </>
  )
}

export default Home