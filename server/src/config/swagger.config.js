export default {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "ToDO-Collabs API",
      version: "1.0.0",
      description:
        "ToDo-Collabs Project API is a RESTful API application made with Express and documented with Swagger",
    },
    basePath: "/api",
    servers: [
      {
        url: "http://localhost:3000/api/",
      },
    ],
  },
  tags: [
    {
      name: "User",
      description: "API for users",
    },
    {
      name: "Task",
      description: "API for tasks",
    },
  ],
  apis: [
    "src/models/*.js",
    "src/utils/helpers/*.js",
    "src/api/controllers/user/*.js",
    "src/api/controllers/user/edit/*.js",
    "src/api/controllers/user/auth/*.js",
    "src/api/controllers/group-tasks/group/*.js",
    "src/api/controllers/group-tasks/task/*.js",
  ],
};
