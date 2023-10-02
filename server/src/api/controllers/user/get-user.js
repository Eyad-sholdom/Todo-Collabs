import { User } from "../../../models/index.js";
import { errorHelper } from "../../../utils/index.js";

export default async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    return res.status(500).json(errorHelper("00088", req, err.message));
  });

  delete user._doc.__v;
  delete user._doc.password;

  const friends = await User.find({ _id: { $in: user.friends } })
    .select("_id name username photo lastLogin")
    .catch((err) => {
      return res.status(500).json(errorHelper("00088", req, err.message));
    });

  user._doc.friends = friends;

  return res.status(200).json(user);
};

/**
 * @swagger
 * /user:
 *    get:
 *      summary: Get User Info
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: The user information has gotten successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
