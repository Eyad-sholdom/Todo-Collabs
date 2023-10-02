import express from "express";
import { port } from "./config/index.js";
import loader from "./loaders/index.js";

const app = express();

loader(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    // eslint-disable-next-line no-undef
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

export default app;
