import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import PropTypes from "prop-types";

const CustomCard = (props) => {
  return (
    <Card {...props}>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

CustomCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomCard;
