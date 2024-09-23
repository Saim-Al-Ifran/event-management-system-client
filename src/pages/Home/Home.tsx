import React from 'react'
import Banner from './sections/Banner'
import EventCategories from './sections/EventCategories'
 
import Newsletter from './sections/Newsletter'
import LatestEventsSection from './sections/LatestEventSection'
import UpcomingEventSection from './sections/UpcomingEventSection'
 
 

const Home:React.FC = () => {
  return (
    <>
       <Banner/>
       <EventCategories/>
       <LatestEventsSection/>
       <UpcomingEventSection/>
       <Newsletter/>
        
    </>
  )
}

export default Home