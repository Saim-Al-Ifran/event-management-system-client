import React from 'react';
import CategoriesTable from '../../../components/Dashboard/Category/CategoiresTable';

 
const AllCategories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
       <CategoriesTable  />
    </div>
  )
}

export default AllCategories