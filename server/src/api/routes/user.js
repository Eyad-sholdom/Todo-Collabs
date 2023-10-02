import { Router } from "express";
import {
  changePassword,
  deleteUser,
  editUser,
  forgotPassword,
  getUser,
  login,
  logout,
  refreshToken,
  register,
  responseFriendRequest,
  getFriendRequests,
  deleteFriend,
  sendFriendRequest,
  getUsers,
  getMember,
} from "../controllers/user/index.js";
import { auth, imageUpload } from "../middlewares/index.js";

const router = Router();

// AUTH
router.post("/", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", auth, forgotPassword);

// friend
router.get("/friend-requests", auth, getFriendRequests);

// Friend Response - Body = {userId: "userId"}
router.post("/friend-response", auth, responseFriendRequest);
router.delete("/friend-response", auth, responseFriendRequest);

// delete/send Friend  - Body = {userId: "userId"}
router.delete("/friend", auth, deleteFriend);
router.post("/friend", auth, sendFriendRequest);

// EDIT
router.post("/change-password", auth, changePassword);
router.put("/", auth, imageUpload, editUser);

router.get("/", auth, getUser);
router.get("/users", auth, getUsers);
router.get("/search/:memberId", auth, getMember);
router.delete("/", auth, deleteUser);

export default router;
