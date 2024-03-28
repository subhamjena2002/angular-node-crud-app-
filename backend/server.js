const express = require("express");
const app = express();
const apiRouter = require("./api");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("", apiRouter);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

module.exports = { app };
