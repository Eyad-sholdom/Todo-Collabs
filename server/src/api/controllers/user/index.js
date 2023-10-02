// AUTH
export { default as register } from "./auth/register.js";
export { default as login } from "./auth/login.js";
export { default as logout } from "./auth/logout.js";
export { default as refreshToken } from "./auth/refresh-token.js";
export { default as forgotPassword } from "./auth/forgot-password.js";

// EDIT
export { default as changePassword } from "./edit/change-password.js";
export { default as editUser } from "./edit/edit-user.js";

// OTHER
export { default as getUser } from "./get-user.js";
export { default as getMember } from "./get-member.js";
export { default as getUsers } from "./get-users.js";
export { default as deleteUser } from "./delete-user.js";

// friend
export { default as responseFriendRequest } from "./friends/response-friend-request.js";
export { default as getFriendRequests } from "./friends/get-friend-requests.js";
export { default as sendFriendRequest } from "./friends/send-friend-request.js";
export { default as deleteFriend } from "./friends/delete-friend.js";
