const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { userRouter } = require("./routes/userRouter");
const { loginRouter } = require("./routes/loginRouter");
const { authFilter } = require("./middleware/authMiddleware");
const app = express();
const PORT = 8081;

// before its comes to route meke the rquest data in json format right

app.use(bodyParser.json());
app.use("/", userRouter);
app.use("/auth", loginRouter);

app.listen(PORT, () => {
  mongoose
    .connect(
      "mongodb://admin:admin@localhost:27017/user-service?authSource=admin"
    )
    .then(() => console.log("database connection is successful!"))
    .catch((err) => console.error(err));
});
