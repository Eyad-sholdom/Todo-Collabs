import { User } from "../../../models/index.js";

export default async (req, res) => {
  const users = await User.find()
    .select({
      _id: 1,
      name: 1,
      username: 1,
      email: 1,
      photo: 1,
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });

  await res.json(users);
};
