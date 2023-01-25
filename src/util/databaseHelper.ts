
const mongoose = require("mongoose");

function cleanup() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
}

const url =
  "mongodb+srv://hot_bobby:a24627DD4@nodedb.kicqw.mongodb.net/nodeDB?retryWrites=true&w=majority";

export const databaseHelper = {
  connect: async () => {
    try {
      await mongoose
        .connect(url, { useNewUrlParser: true })
        .then(() => {
          console.info("Database connection established <3");
        })
        .catch((err: any) => console.log("we couldn't connect because:", err));
      process.on("SIGINT", cleanup);
      process.on("SIGTERM", cleanup);
      process.on("SIGHUP", cleanup);
    } catch (error) {
      console.error(error, {
        message: "mogo server didn't connect ",
      });
      process.exit(1); //iono
    }
  },
};
