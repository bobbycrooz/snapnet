const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", true);

const lgasSchema = new Schema(
  {
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "State",
    },
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

const Lga = mongoose.model("Lga", lgasSchema);
export default Lga;
