const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", true);

const wardSchema = new Schema(
  {
    lgaId: {
      type: Schema.Types.ObjectId,
      ref: "Lga",
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

const Ward = mongoose.model("Ward", wardSchema);
export default Ward;
