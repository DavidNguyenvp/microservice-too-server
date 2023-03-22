const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const serviceSchema = mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 255
    },
    serviceUrl: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      default: 'de-Active'
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
serviceSchema.plugin(toJSON);
serviceSchema.plugin(paginate);

/**
 * Check if service is taken
 * @param {string} service - The user's service
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
serviceSchema.statics.isNameTaken = async function (serviceName, excludeUserId) {
    const service = await this.findOne({ serviceName, _id: { $ne: excludeUserId } });
    return !!service;
  };

/**
 * @typedef Service
 */
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
