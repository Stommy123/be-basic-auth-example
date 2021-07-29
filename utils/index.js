const isNil = input => input === '' || input === undefined || input === null;

module.exports.validateRequest = (item, fields = []) => {
  const requiredFields = [];

  fields.forEach(field => {
    if (isNil(item[field])) {
      requiredFields.push(field);
    }
  });

  return requiredFields;
};
