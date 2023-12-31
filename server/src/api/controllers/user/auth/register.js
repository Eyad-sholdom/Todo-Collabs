import { User } from "../../../../models/index.js";
import { validateRegister } from "../../../validators/user.validator.js";
import {
  errorHelper,
  generateRandomCode,
  logger,
  getText,
  signAccessToken,
} from "../../../../utils/index.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;

export default async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    let code = "00025";
    if (error.details[0].message.includes("email")) code = "00026";
    else if (error.details[0].message.includes("password")) code = "00027";
    else if (error.details[0].message.includes("name")) code = "00028";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  const exists = await User.exists({ email: req.body.email }).catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  if (exists) return res.status(409).json(errorHelper("00032", req));

  // Hash password
  const hashed = await hash(req.body.password, 10);

  let username = "";
  let tempName = "";
  let existsUsername = true;
  let name = req.body.name;

  if (name.includes(" ")) {
    tempName = name.trim().split(" ").slice(0, 1).join("").toLowerCase();
  } else {
    tempName = name.toLowerCase().trim();
  }

  do {
    username = tempName + "#" + generateRandomCode(4);
    existsUsername = await User.exists({ username: username }).catch((err) => {
      return res.status(500).json(errorHelper("00033", req, err.message));
    });
  } while (existsUsername);

  let user = new User({
    email: req.body.email,
    username: username,
    name: name,
    password: hashed,
    lastLogin: Date.now(),
    joinedAt: Date.now(),
    photo: req.body.photo || "",
    bio: req.body.bio || "",
  });

  user = await user.save().catch((err) => {
    return res.status(500).json(errorHelper("00034", req, err.message));
  });

  delete user.password;
  delete user.__v;

  const confirmCodeToken = signAccessToken(user._id);

  logger("00035", user._id, getText("00035"), "Info", req);
  
  return res.status(200).json({
    resultMessage: getText("00035"),
    resultCode: "00035",
    user,
    confirmToken: confirmCodeToken,
  });
};

/**
 * @swagger
 * /user:
 *    post:
 *      summary: Registers the user
 *      requestBody:
 *        description: All required information about the user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: You registered successfully.
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
 *                          confirmToken:
 *                              type: string
 *        "400":
 *          description: Please provide all the required fields!
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
