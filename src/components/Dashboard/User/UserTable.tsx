import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import "../../../style/responsive.Table.css"; 
import { NavLink } from "react-router-dom";
import { useDeleteUserMutation, useGetUsersQuery } from "../../../features/user/userApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ClipLoader, FadeLoader } from "react-spinners";
import { RootState } from "../../../app/store";
import Swal from "sweetalert2";
import { User } from "../../../types/types";

const TABLE_HEAD = ["Member", "Role", "Status", "Number", "Actions"];

 

function UsersTable() {
  
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const getUser = useSelector((state: RootState)=>state.auth);
  const {role} = getUser?.user;
  const entity = role === 'super-admin' ? 'entities' : 'users';
  const {data:users,isError,error,isLoading} = useGetUsersQuery({
     role: role,
     entity: entity,
     page,
     limit,
     search:searchQuery,
  });
 const [deleteUser,{isSuccess:isDelSuccess,isError:isDelError}]= useDeleteUserMutation();
  
  useEffect(()=>{
        if(isDelSuccess){
          Swal.fire({
            title: '<span>Deleted!</span>',
            html: '<span>The data has been deleted succcessfully.</span>',
            icon: 'success',
            confirmButtonColor:'#607D8B'
          });
        }
        if(isDelError){
          Swal.fire(
            'Error!',
            'Failed to delete the user',
            'error'
          );
        }
  },[isDelSuccess,isDelError])

  useEffect(() => {
    setPaginationLoading(false);  
    setSearchLoading(false);
  }, [users]);

  const noUsersFound = isError && error?.status === 404 && error?.data?.message === "No users found";
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#607D8B" size={50} {...(undefined as any)}/>
      </div>
    );
  }
  if (isError && !noUsersFound) return <div>Error fetching users</div>;

  const handlePrevious = () => {
    setPaginationLoading(true);
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (users?.users?.totalPages && page < users?.users?.totalPages) {
      setPaginationLoading(true);
      setPage(page + 1);
    }
  };
 
  const handleDeleteUser = async (id:string)=>{
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
      setDeletingUserId(id);
      await deleteUser({role,entity,id})
    }
  }
  

  return (
    <Card className="users-table-card" {...(undefined as any)}>
      <CardHeader floated={false} shadow={false} className="rounded-none" {...(undefined as any)}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray"{...(undefined as any)}>
              Users list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" {...(undefined as any)}>
              See information about all users
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <NavLink to="/dashboard/users/add">
              <Button className="flex items-center gap-3" size="sm" {...(undefined as any)}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
              </Button>
            </NavLink>

          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
   
          </Tabs>
          <div className="w-full md:w-72 mb-4">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5 mb-2" />}
              {...(undefined as any)}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSearchLoading(true)
              }}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-0 pt-0 pb-2" {...(undefined as any)}>
        {paginationLoading || (searchLoading && !noUsersFound) ? (
           <div className="flex justify-center">
               <ClipLoader color="#607D8B" size={30} />
           </div>
        ):(      
        <div className="table-container">
          {noUsersFound ? (
            <div className="text-center p-4">
              <Typography variant="h6" color="red" className="font-normal" {...(undefined as any)}> 
                No users found for the search term "{searchQuery}"
              </Typography>
           </div>
          ):(
        
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
              {users?.users?.data.map(
                ({_id,image, username, email, role, isBlocked, phoneNumber }:User, index:number) => {
                  const isLast = index === users?.users?.data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={image} alt={username} size="sm"  {...(undefined as any)}/>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              {...(undefined as any)}
                            >
                              {username}
                            </Typography>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal opacity-70"
                              {...(undefined as any)}
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            {...(undefined as any)}
                          >
                            {role}
                          </Typography>
    
                        </div>
                      </td>
                      <td className={classes}>
                        <Chip
                          variant="gradient"
                          color={isBlocked ? "red" : "green"}
                          value={isBlocked ? "Blocked" : "Active"}
                          className="w-max"
                        />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          {...(undefined as any)}
                        >
                          {phoneNumber}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <NavLink to={`/dashboard/users/edit/${_id}`}>
                            <Tooltip content="Edit User">
                                <Button 
                                  color="blue-gray"
                                  variant="filled"
                                  {...(undefined as any)}
                                  size="md"
                                  className="mr-2"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Button>
                            </Tooltip>
                        </NavLink>

                        <Tooltip content="Delete User">
                            <Button 
                              color="red"
                              {...(undefined as any)}
                              size="md"
                              onClick={()=>handleDeleteUser(_id)}
                              disabled={deletingUserId === _id }
                            >
                            {deletingUserId === _id ? (
                              <span><ClipLoader color="white" size={15} /></span>
                            ) : (
                              <i className="fa-solid fa-trash"></i>
                            )}
                            </Button>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          )}

        </div>
        )}

      </CardBody>
      {!noUsersFound && (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...(undefined as any)}>
        <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
          Page {page} of {users?.users?.totalPages|| 1}
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
            disabled={page === users?.users?.totalPages}
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

export default UsersTable;
