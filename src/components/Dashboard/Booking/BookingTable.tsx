
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import "../../../style/responsive.Table.css";
import { NavLink } from "react-router-dom";

const TABLE_HEAD = ["Image", "Title",  "Location", "Price", "Actions"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    title: "Book Fair",
    location: "Library Hall",
    status: "pending",
    price: 700,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    title: "Concert",
    location: "Stadium",
    status: "active",
    price: 1000,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    title: "Tech Conference",
    location: "Convention Center",
    status: "completed",
    price: 900,
  },
];

function BookingTable() {
  return ( 
    <Card className="users-table-card" {...(undefined as any)}>
      <CardHeader floated={false} shadow={false} className="rounded-none"  {...(undefined as any)}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" {...(undefined as any)}>
              Bookings List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" {...(undefined as any)}>
              Overview of your bookings
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:mr-1">
          <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5 mb-2" />}
              {...(undefined as any)}
            />
          </div>
        </div>
 
      </CardHeader>

      <CardBody className="px-0 pt-0 pb-2" {...(undefined as any)}>
        <div className="table-container">
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
                ({ img, title, location, price }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={title} size="md" {...(undefined as any)} />
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
                            {title}
                          </Typography>
                        </div>
                      </td>
 
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          {...(undefined as any)}
                        >
                          {location}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          {...(undefined as any)}
                        >
                          ${price.toFixed(2)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <NavLink to="/dashboard/bookings/edit/1">
                          <Tooltip content="Edit Booking">
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
                        <Tooltip content="Delete Booking">
                          <Button color="red" size="md" {...(undefined as any)}>
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

export default BookingTable;
