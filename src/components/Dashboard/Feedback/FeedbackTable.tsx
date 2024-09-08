import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Button
} from "@material-tailwind/react";
import { useGetFeedbackQuery } from "../../../features/feedback/feedbackApi";
import { FadeLoader } from "react-spinners";
import { useState } from "react";
import { FeedbackResponse } from "../../../types/api-types";

const TABLE_HEAD = ["Title", "Email", "Phone Number", "Message"];

function FeedbackTable() {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: feedBacks, error, isLoading } = useGetFeedbackQuery({page,limit});

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (feedBacks?.totalPages && page < feedBacks.totalPages) {
      setPage(page + 1);
    }
  };
 
  const displayedData = feedBacks?.data;

  return (
    <Card className="w-full shadow-lg rounded-lg" {...(undefined as any)}>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-t-lg bg-[#607D8B] text-center"
        {...(undefined as any)}
      >
        <Typography variant="h5" color="white" className="mb-2" {...(undefined as any)}>
          User Feedback
        </Typography>
        <Typography color="white" className="font-light" {...(undefined as any)}>
          Read valuable feedback from our users
        </Typography>
      </CardHeader>

      <CardBody className="px-4 pt-2 pb-4" {...(undefined as any)}>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center ">
                <FadeLoader color="#607D8B" size={50} {...(undefined as any)}/>
            </div>
          ) : error ? (
            <Typography color="red" className="text-center p-4" {...(undefined as any)}>
              Failed to load feedback. Showing default data.
            </Typography>
          ) : (
            <table className="min-w-full table-auto text-left">
              <thead className="hidden md:table-header-group">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-blue-gray-900"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold leading-none opacity-80"
                        {...(undefined as any)}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedData.map(
                  ({ title, email, phoneNumber, message }:FeedbackResponse, index:number) => (
                    <tr
                      key={index}
                      className="block md:table-row border-b border-blue-gray-100 bg-white hover:bg-blue-gray-50 transition-colors"
                    >
                      <td className="p-4 block md:table-cell">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          {...(undefined as any)}
                        >
                          {title}
                        </Typography>
                      </td>
                      <td className="p-4 block md:table-cell">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          {...(undefined as any)}
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className="p-4 block md:table-cell">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          {...(undefined as any)}
                        >
                          {phoneNumber}
                        </Typography>
                      </td>
                      <td className="p-4 block md:table-cell">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          {...(undefined as any)}
                        >
                          {message}
                        </Typography>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" {...(undefined as any)}>
          <Typography variant="small" color="blue-gray" className="font-normal" {...(undefined as any)}>
            Page {page} of {feedBacks?.totalPages || 1}
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
              disabled={page === feedBacks?.totalPages}
              {...(undefined as any)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
    </Card>
  );
}

export default FeedbackTable;
