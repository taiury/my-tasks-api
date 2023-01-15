import validator from 'validator';

type CheckEmail = (email: string) => boolean;

const checkEmail: CheckEmail = (email: string): boolean => {
  const isValid = validator.isEmail(email);
  return isValid;
};

export { checkEmail, CheckEmail };
