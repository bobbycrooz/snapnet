const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", true);

const companySchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "username must be included"],
      unique: [true, "username already taken"],
    },

    uuid: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("User", companySchema);
export default Company;
