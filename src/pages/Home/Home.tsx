import React from 'react'
import Banner from './sections/Banner'
import EventCategories from './sections/EventCategories'
import EventsSection from './sections/EventSection'
import LatestEventSection from './sections/LatestEventSection'
import Newsletter from './sections/Newsletter'
 

const Home:React.FC = () => {
  return (
    <>
       <Banner/>
       <EventCategories/>
       <EventsSection/>
       <LatestEventSection/>
       <Newsletter/>
        
    </>
  )
}

export default Home