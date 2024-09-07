import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import "../../../style/responsive.Table.css"; 
import { NavLink } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../../features/categories/categoriesApi";
import { Category } from "../../../types/api-types";
import { ClipLoader, FadeLoader } from 'react-spinners';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
 

const TABLE_HEAD = ["Image", "Category Name", "Actions"];

function CategoriesTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 3;
  const { data: categories, isLoading, isError, error } = useGetCategoriesQuery({ page, limit, search: searchQuery });
  const [deleteCategory,{isSuccess:delSuccess,isError:delError}] = useDeleteCategoryMutation();
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
 
  useEffect(()=>{
          if(delSuccess){
 
           Swal.fire({
            title: '<span>Deleted!</span>',
            html: '<span>The category has been deleted.</span>',
            icon: 'success',
            confirmButtonColor:'#607D8B'
          });

          }

          if(delError){
            Swal.fire(
              'Error!',
              'Failed to delete the application.',
              'error'
            );
         }

  },[delSuccess,delError])

  const noCategoriesFound = isError && error?.status === 404 && error?.data?.message === "No categories found";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#607D8B" size={50} {...(undefined as any)}/>
      </div>
    );
  }

  if (isError && !noCategoriesFound) return <div>Error fetching categories</div>;

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (categories?.totalPages && page < categories.totalPages) {
      setPage(page + 1);
    }
  };
  const handleDeleteCategory = async (id:string)=>{
    
          // await deleteCategory(id);
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#607D8B',
            cancelButtonColor: '#F44336',
            confirmButtonText: 'Yes, delete it!'
          });
          if(result.isConfirmed){  
            setDeletingCategoryId(id)
            await deleteCategory(id)
          }
  }

  return (
    <Card className="users-table-card" {...(undefined as any)}>
      <CardHeader floated={false} shadow={false} className="rounded-none" {...(undefined as any)}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" {...(undefined as any)}>
              Category List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" {...(undefined as any)}>
              See information about all categories
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <NavLink to="/dashboard/category/add">
              <Button className="flex items-center gap-3" size="sm" {...(undefined as any)}>
                <i className="fa-solid fa-folder-plus"></i>
                Add Category
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max"></Tabs>
          <div className="w-full md:w-72 mb-4">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5 mb-2" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              {...(undefined as any)}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-0 pt-0 pb-2" {...(undefined as any)}>
        <div className="table-container flex justify-center items-center">
          {noCategoriesFound ? (
            <div className="text-center p-4">
              <Typography variant="h6" color="red" className="font-normal" {...(undefined as any)}> 
                No categories found for the search term "{searchQuery}"
              </Typography>
            </div>
          ) : (
            <table className="users-table w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        {...(undefined as any)}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories?.data?.map((category: Category, index: number) => {
                  const { image, name } = category;
                  const isLast = index === categories.data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={category._id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={image} alt={name} size="md" {...(undefined as any)}/>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          {...(undefined as any)}
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <NavLink to={`/dashboard/category/edit/${category._id}`}>
                          <Tooltip content="Edit Category">
                            <Button
                              color="blue-gray"
                              variant="filled"
                              size="md"
                              className="mr-2"
                              {...(undefined as any)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Button>
                          </Tooltip>
                        </NavLink>
                        <Tooltip content="Delete Category">
                        <Button
                            color="red"
                            size="md"
                            onClick={() => handleDeleteCategory(category._id)}
                            disabled={deletingCategoryId === category._id} // Disable and show loading for the clicked ca
                            {...(undefined as any)}
                          >
                            {deletingCategoryId === category._id ? (
                              <span><ClipLoader color="white" size={15} /></span>
                            ) : (
                              <i className="fa-solid fa-trash"></i>
                            )}
                          </Button>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </CardBody>

      {!noCategoriesFound && (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...(undefined as any)}>
          <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
            Page {page} of {categories?.totalPages || 1}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePrevious}
              disabled={page === 1}
              {...(undefined as any)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleNext}
              disabled={page === categories?.totalPages}
              {...(undefined as any)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default CategoriesTable;
