const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    validate: {
      validator: function (str) {
        if (str.length <= 280 && str.length >= 1) {
          return;
        }
      },
      message: "Please keep you thought between 1-280 characters",
    },
    required: [true, "A penny for your thoughts?"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  username: {
    type: String,
    required: [true, "Who wrote this thought?"],
  },
  //   reactions: [reactionSchema] //create this later
});
