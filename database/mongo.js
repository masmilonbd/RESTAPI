const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// .then(() => console.log("mongo connected"))
// .catch((err) => console.log("mongo error at " + err));

mongoose.connection
  .once("open", () => console.log("mongo connected"))
  .on("error", (error) => console.log("Warning " + error));
