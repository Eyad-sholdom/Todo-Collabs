import logger from "../logger.js";
import en from "../lang/en.js";

export default (code, req, errorMessage) => {
  //NOTE: This control routes every server error to the same lang key.
  let key = code;
  if (!en[code]) key = "00008";

  let userId = "";
  if (req && req.user && req.user._id) userId = req.user._id;

  const resMessage = en[key];

  if (resMessage.includes("server error")) {
    logger(code, userId, errorMessage, "Server Error", req);
  } else {
    logger(code, userId, errorMessage ?? resMessage, "Client Error", req);
  }

  return {
    resultMessage: resMessage,
    resultCode: code,
  };
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Result:
 *       type: object
 *       properties:
 *         resultMessage:
 *           $ref: '#/components/schemas/ResultMessage'
 *         resultCode:
 *           $ref: '#/components/schemas/ResultCode'
 *     ResultMessage:
 *       type: string
 *     ResultCode:
 *       type: string
 */
