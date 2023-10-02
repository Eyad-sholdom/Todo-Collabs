import { User } from "../../../../models/index.js";
import { errorHelper } from "../../../../utils/index.js";

export default async (req, res) => {
  // check method type

  const { userId: responserId } = req.body.memberId;

  const user = await User.findById(req.user._id).catch((err) => {
    return res.status(500).json(errorHelper("00090", req, err.message));
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const responserUser = await User.findById(responserId);

  if (!responserUser) {
    return res.status(400).json({
      message: "Receiver does not exist",
    });
  }

  // check if user has a request from the member
  const hasRequest = user.friendRequests.find(
    (request) => request.toString() === responserId.toString()
  );

  if (!hasRequest) {
    // remove user from member's requests
    user.friendRequests = user.friendRequests.filter(
      (request) => request.toString() !== responserId.toString()
    );
    await user.save();
    return res.status(400).json({
      message: "You don't have a request from this user",
    });
  }

  switch (req.method) {
    case "POST":
      // remove user from requests and add user to friends
      user.friendRequests = user.friendRequests.filter(
        (request) => request.toString() !== responserId.toString()
      );
      user.friends.push(responserUser);
      await user.save();

      // add user to responser's friends
      responserUser.friends.push(user);

      res.status(200).json({
        message: "Friend request accepted",
      });
      await responserUser.save();
      break;
    case "DELETE":
      // remove user from requests
      user.friendRequests = user.friendRequests.filter(
        (request) => request.toString() !== responserId.toString()
      );
      await user.save();

      // remove user from responser's requests
      responserUser.friendRequests = responserUser.friendRequests.filter(
        (request) => request.toString() !== user._id.toString()
      );
      await responserUser.save();
      break;
    default:
      break;
  }
};
