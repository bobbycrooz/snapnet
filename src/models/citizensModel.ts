const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", true);

const citizensSchema = new Schema(
  {
    email: {
      type: String,
    },
    fullname: {
      type: String,
    },
    id: {
      type: String,
    },

    gender: {
      type: String,
    },
    address: {
      type: String,
    },

    phone: {
      type: String,
    },

    wardId: {
      type: Schema.Types.ObjectId,
      ref: "Ward",
    },
  },
  {
    timestamps: true,
  }
);

const Citizens = mongoose.model("Citizens", citizensSchema);
export default Citizens;
