const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const versionSchema = mongoose.Schema(
  {
    versionName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 255
    },
    versionId: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
    },
    dependences: [{
     dependenceVersion: {
        type: String,
        required: true,
        trim: true,
        lowercase: false,
      }, 
      dependenceName: {
        type: String,
        required: true,
        trim: true,
        lowercase: false,
      },
      dependenceSource: {
        type: String,
        required: true,
        trim: true,
        lowercase: false,
      },
      dependenceDes: {
        type: String,
        required: false,
        trim: true,
        lowercase: false,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
versionSchema.plugin(toJSON);
versionSchema.plugin(paginate);

/**
 * Check if version is taken
 * @param {string} version - The user's version
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
versionSchema.statics.isNameTaken = async function (versionName, excludeUserId) {
    const version = await this.findOne({ versionName, _id: { $ne: excludeUserId } });
    return !!version;
  };

/**
 * @typedef version
 */
const version = mongoose.model('version', versionSchema);

module.exports = version;
