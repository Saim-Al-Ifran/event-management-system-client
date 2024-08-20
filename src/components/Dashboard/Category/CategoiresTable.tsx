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

const TABLE_HEAD = ["Image", "Category name", "Actions"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    job: "Manager",
    org: "Organization", 
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    job: "Programator",
    org: "Developer",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    job: "Executive",
    org: "Projects",
  },
];

function CategoriesTable() {
  return (
    <Card className="users-table-card" {...(undefined as any)}>
      <CardHeader floated={false} shadow={false} className="rounded-none" {...(undefined as any)}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray"{...(undefined as any)}>
             Category list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" {...(undefined as any)}>
              See information about all users
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
          <Tabs value="all" className="w-full md:w-max">
   
          </Tabs>
          <div className="w-full md:w-72 mb-4">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5 mb-2" />}
              {...(undefined as any)}
            />
          </div>
        </div>
      </CardHeader>
 
      <CardBody className="px-0 pt-0 pb-2" {...(undefined as any)}>
        <div className="table-container flex justify-center items-center">
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
              {TABLE_ROWS.map(
                ({ img, name, job}, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={name} size="md"  {...(undefined as any)}/>
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
                            {job}
                          </Typography>
   
                        </div>
                      </td>
 
                      <td className={classes}>
                        <NavLink to="/dashboard/category/edit/1">
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
                            >
                              <i className="fa-solid fa-trash"></i>
                            </Button>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...(undefined as any)}>
        <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" {...(undefined as any)}>
            Previous
          </Button>
          <Button variant="outlined" size="sm" {...(undefined as any)}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CategoriesTable;
