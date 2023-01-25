const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", true);

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    id: {
      type: String,
    },

    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
