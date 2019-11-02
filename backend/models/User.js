const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltWorkFactor = 10;

const userSchema = mongoose.Schema({
  regionId: {
    type: String,
    required: [true, "Region is required"]
  },
  userId: {
      type: String,
      required: [true, "User ID is required"]
  },
  username: {
      type: String,
      required: [true, "Username is required"]
  },
  password: {
      type: String,
      required: [true, "Password is required"]
  },
  name: {
      type: String,
      required: [true, "Name is required"]
  },
  age: {
      type: Number,
      required: [true, "Age is required"]
  },
  sex: {
      type: String,
      required: [true, "Sex is required"]
  }
});

userSchema.pre("save", function(next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(saltWorkFactor, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash; //60 character hash
      next();
    });
  });
});

userSchema.methods.validatePassword = async function (candidatePassword) {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
};

const User = mongoose.model("User", userSchema);

module.exports = User;
