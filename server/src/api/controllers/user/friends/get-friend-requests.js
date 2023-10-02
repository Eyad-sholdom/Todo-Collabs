import { User } from "../../../../models/index.js";
import { errorHelper } from "../../../../utils/index.js";

export default async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    return res.status(500).json(errorHelper("00090", req, err.message));
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  // get user requests
  const requests = await User.find({
    _id: {
      $in: user.requests,
    },
  }).select("name username photo lastLogin");

  return res.status(200).json({
    requests,
  });
};
