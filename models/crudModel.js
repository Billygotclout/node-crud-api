const mongoose = require("mongoose");

const crudSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  phone: {
    type: String,
    required: [true, "Please enter number"],
  },
},{
    timestamps:true
});

module.exports= mongoose.model("Crud", crudSchema)