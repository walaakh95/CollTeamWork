const mongoose = require('mongoose');
const { genSalt, hash, compare } = require('bcryptjs');
const Role = require('./roleModel'); // we’ll use this for the pre-save validation

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
      unique: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Role,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);


UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret, options) {
    if (ret.roleId) {
      if (options && options.roleAsName) {
        ret.role = ret.roleId.name;
      } else {
        ret.role = ret.roleId;
      }
      delete ret.roleId;
    }

    delete ret.password;
    delete ret._id
    delete ret.__v
    return ret;
  },
});



UserSchema.pre('save', async function (next) {
  try {
    if (!this.roleId) {
      const defaultRole = await Role.findOne({ name: 'user' });
      if (!defaultRole)
        return next(new Error('Default role "user" not found.'));
      this.roleId = defaultRole._id;
    } else if (this.isModified('roleId')) {
      const role = await Role.findById(this.roleId);
      if (!role) {
        return next(new Error('Invalid roleId: No role found.'));
      }
    }

    if (this.isModified('password')){
      const salt = await genSalt(10)
      this.password = await hash(this.password, salt);
    }

    next();
  } catch (error) {
    next(error);
  }
});


UserSchema.methods.validatePassword = async function (password) {
  return compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);