const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", true);

const stateSchema = new Schema(
  {

    name: {
      type: String,
    },
    id: {
      type: String,
    },


  },
  {
    timestamps: true,
  }
);

const State = mongoose.model("State", stateSchema);
export default State;
