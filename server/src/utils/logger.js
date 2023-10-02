import { Log } from "../models/index.js";

export default async (code, userId, errorMessage, level, req) => {
  if (!userId) return;

  let log = new Log({
    resultCode: code,
    level: level,
    errorMessage: errorMessage,
    userId: userId,
  });

  await log.save().catch((err) => {
    console.log("Logging is failed: " + err);
  });
};
