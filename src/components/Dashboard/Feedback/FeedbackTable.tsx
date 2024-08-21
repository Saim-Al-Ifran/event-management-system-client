 
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Title", "Email", "Phone Number", "Message"];

const feedbackData = [
  {
    title: "Great Service",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    message: "I really enjoyed the event. Everything was well organized.",
  },
  {
    title: "Excellent Support",
    email: "jane.smith@example.com",
    phoneNumber: "987-654-3210",
    message: "Customer support was very responsive and helpful.",
  },
  {
    title: "Good Experience",
    email: "michael.brown@example.com",
    phoneNumber: "555-555-5555",
    message: "Had a pleasant experience with the service overall.",
  },
];

function FeedbackTable() {
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
              {feedbackData.map(
                ({ title, email, phoneNumber, message }, index) => (
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
        </div>
      </CardBody>
    </Card>
  );
}

export default FeedbackTable;
