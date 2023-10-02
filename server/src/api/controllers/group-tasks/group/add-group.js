import { Group, User } from "../../../../models/index.js";

export default async (req, res) => {
  const { title, description } = req.body;
  const body = req.body;
  const { _id } = req.user;

  let group = new Group();

  group.title = title;
  group.members = [{ user: _id, role: "Admin" }];
  group.createdBy = _id;

  body.members?.forEach(async (member) => {
    // check if member exists in the database
    const user = await User.findById(member.user);
    if (!user) {
      return;
    }
    // add member to the group
    group.members.push({
      user: User._id,
      role: "normal",
    });
  });

  if (description) {
    group.description = description;
  }

  let result = await group.save().catch(() => {
    return res.status(400).json({
      error: "Bad request or invalid input data.",
      message: "Group not created.",
    });
  });

  // add group to the user's joinedGroups
  const user = await User.findById(_id);
  user.joinedGroups.push(result._id);
  await user.save();

  res.status(200).json({
    _id: result._id,
    title: result.title,
    members: result.members,
    description: result.description,
    createdBy: result.createdBy,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  });
};

/**
 * @swagger
 * paths:
 *   /group/get-group:
 *     get:
 *       summary: Get a Group by ID
 *       description: Retrieve information about a specific group by its ID.
 *       parameters:
 *         - in: query
 *           name: groupId
 *           description: The ID of the group to retrieve.
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response with the retrieved group data.
 *           content:
 *             application/json:
 *               example:
 *                 _id: "5f7d0f97a4f08a20e0e0d6a5"
 *                 tasks:
 *                   - "5f7d0f97a4f08a20e0e0d6b1"
 *                   - "5f7d0f97a4f08a20e0e0d6b2"
 *                 title: "Example Group"
 *                 tags:
 *                   - "Tag1"
 *                   - "Tag2"
 *                 members:
 *                   - user: "5f7d0f97a4f08a20e0e0d6c1"
 *                     role: "Admin"
 *                   - user: "5f7d0f97a4f08a20e0e0d6c2"
 *                     role: "Moderator"
 *                 createdBy: "5f7d0f97a4f08a20e0e0d6d1"
 *                 createdAt: "2023-09-16T12:00:00Z"
 *                 updatedAt: "2023-09-16T14:30:00Z"
 *         '400':
 *           description: Bad request or invalid input data.
 *         '404':
 *           description: Group not found.
 *         '500':
 *           description: Internal server error.
 *
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
