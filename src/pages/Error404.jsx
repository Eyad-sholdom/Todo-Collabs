import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
const Error404 = () => {
  return (
    <div className="container">
      <Typography variant="h1">404</Typography>
      <Typography variant="h1">Page Not Found</Typography>
      <Link to="/">
        <Typography variant="h5">
          Click here to return to the home page
        </Typography>
      </Link>
    </div>
  );
};

export default Error404;
