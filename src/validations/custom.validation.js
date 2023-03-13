const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const serviceName = (value, helpers) => {
  console.log(value)
  if (value.length < 3) {
    return helpers.message('service must be at least 3 characters');
  }

  if (value.length > 225) {
    return helpers.message('service must be maximum 255 characters');
  }
  return value
}

module.exports = {
  objectId,
  password,
  serviceName
};
