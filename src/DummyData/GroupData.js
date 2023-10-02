const Dummy_Data = {
  groups: null,
};

export default Dummy_Data;

// [
//   {
//     _id: "group1_id",
//     tasks: [
//       {
//         _id: "task1_id",
//         status: "In Progress",
//         taskCreator: "user1_id",
//         description: "Task 1 description",
//         tags: ["tag1", "tag2", "tag3"],
//         assignedTo: { id: "user2_id", name: "User 2" },
//         comments: [
//           {
//             _id: "comment1_id",
//             createdAt: new Date(),
//             commentedBy: { _id: "user3_id", name: "User 3", role: "Admin" },
//             editedAt: null,
//             commentData: "Comment 1",
//           },
//           {
//             _id: "comment2_id",
//             createdAt: new Date(),
//             commentedBy: { _id: "user4_id", name: "User 4", role: "User" },
//             editedAt: null,
//             commentData: "Comment 2",
//           },
//         ],
//         createdAt: new Date(),
//         Priority: "High",
//         dueDate: new Date("2023-10-15"),
//       },
//       {
//         _id: "task2_id",
//         status: "Pending",
//         taskCreator: "user2_id",
//         description: "Task 2 description",
//         tags: ["tag2", "tag3"],
//         assignedTo: { id: "user3_id", name: "User 3" },
//         comments: [],
//         createdAt: new Date(),
//         Priority: "Medium",
//         dueDate: new Date("2023-10-20"),
//       },
//       // Add more tasks for Group 1 if needed
//     ],
//     createdAt: new Date(),
//     members: ["user1_id", "user2_id", "user3_id"],
//     tags: ["group_tag1", "group_tag2"],
//     title: "Group 1",
//     group_description: "Description for Group 1",
//     CreatedBy: "user1_id",
//   },
//   {
//     _id: "group2_id",
//     tasks: [
//       {
//         _id: "task3_id",
//         status: "Completed",
//         taskCreator: "user4_id",
//         description: "Task 3 description",
//         tags: ["tag1"],
//         assignedTo: { id: "user1_id", name: "User 1" },
//         comments: [
//           {
//             _id: "comment3_id",
//             createdAt: new Date(),
//             commentedBy: { _id: "user2_id", name: "User 2", role: "Admin" },
//             editedAt: null,
//             commentData: "Comment 3",
//           },
//         ],
//         createdAt: new Date(),
//         Priority: "Low",
//         dueDate: new Date("2023-10-10"),
//       },
//       // Add more tasks for Group 2 if needed
//     ],
//     createdAt: new Date(),
//     members: ["user1_id", "user4_id"],
//     tags: ["group_tag2", "group_tag3"],
//     title: "Group 2",
//     group_description: "Description for Group 2",
//     CreatedBy: "user4_id",
//   },
//   {
//     _id: "group3_id",
//     tasks: [
//       {
//         _id: "task4_id",
//         status: "In Progress",
//         taskCreator: "user3_id",
//         description: "Task 4 description",
//         tags: ["tag1", "tag3"],
//         assignedTo: { id: "user2_id", name: "User 2" },
//         comments: [],
//         createdAt: new Date(),
//         Priority: "Medium",
//         dueDate: new Date("2023-10-18"),
//       },
//       {
//         _id: "task5_id",
//         status: "Pending",
//         taskCreator: "user1_id",
//         description: "Task 5 description",
//         tags: ["tag2"],
//         assignedTo: { id: "user4_id", name: "User 4" },
//         comments: [],
//         createdAt: new Date(),
//         Priority: "High",
//         dueDate: new Date("2023-10-25"),
//       },
//       // Add more tasks for Group 3 if needed
//     ],
//     createdAt: new Date(),
//     members: ["user2_id", "user3_id", "user4_id"],
//     tags: ["group_tag1", "group_tag3"],
//     title: "Group 3",
//     group_description: "Description for Group 3",
//     CreatedBy: "user3_id",
//   },
//   // Define more groups (Group4, Group5, etc.) using a similar structure
// ],
