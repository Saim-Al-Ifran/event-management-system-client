import React from 'react'
import BookingTable from '../../../components/Dashboard/Booking/BookingTable'
 
const AllBookings: React.FC = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6">
          <BookingTable />
    </div>
</>
  )
}

export default AllBookings