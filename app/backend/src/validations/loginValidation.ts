import UserInterface from '../interfaces/UserInterface';

const loginValidation = async ({ email, password }: UserInterface) => {
  if (!email) return { error: 401, message: 'All fields must be filled' };

  const regex = /\S+@\S+\.\S+/;
  const validEmail = regex.test(email);

  if (!validEmail) return { error: 401, message: 'Incorrect email or password' };

  if (password.length < 6) return { error: 401, message: 'All fields must be filled' };

  return { error: 200, message: 'OK' };
};

export default loginValidation;
