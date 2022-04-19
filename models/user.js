const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Пожалуйста, введите ваше имя"],
  },
  lastName: {
    type: String,
    required: [true, "Пожалуйста, введите свою фамилию"],
  },
  middleName: {
    type: String
  },
  email: {
    type: String,
    required: [true, "Пожалуйста, введите свой email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Введите корректный email"],
  },
  password: {
    type: String,
    required: [true, "Пожалуйста, введите пароль"],
    minlength: [8, "Пароль должен состояить минимум из 8 символов"],
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  group: {
    type: Number,
  },
  course: {
    type: Number,
  },
  isStudent: {
    type: Boolean,
   default: 'false',
  },
  isPrepod: {
    type: Boolean,
    default: 'false',
  },
  isAdmin: {
    type: Boolean,
    default: 'false',
  },
  tasks: [
    {
      task: {
        displayName: 'анятие',
        type: String,
        required: true,
      },
      typeWork: {
        type: String,
        required: true,
      },
      course: {
        type: String,
        required: true,
      },
      group: {
        type: String,
        required: true,
      },
      countStudents: {
        type: Number,
        required: true,
      },
      numberWeek: {
        type: String,
        required: true,
      },
      dayWeek: {
        type: String,
        required: true,
      },
      startDate:{
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
      completed: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.statics.login = async function (email, password) {
  if (email === "") {
    throw Error("Email Not Provided");
  }
  if (password === "") {
    throw Error("Password Not Provided");
  }
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};
const user = mongoose.model("account_information", userSchema);
module.exports = user;
