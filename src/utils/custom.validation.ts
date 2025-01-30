import { CustomHelpers } from 'joi';

export const objectId = (value: string, helpers: CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' });
  }
  return value;
};

export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({custom: 'Password must be at least 8 characters long'});
  }
  if (!/[0-9]/.test(value) || !/[a-zA-Z]/.test(value)) {
    return helpers.message({custom: 'Password must contain at least 1 letter and 1 number'});
  }
  return value;
};