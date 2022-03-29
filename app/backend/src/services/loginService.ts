import * as bcrypt from 'bcryptjs';
import loginValidation from '../validations/loginValidation';
import createToken from '../auth/createToken';
import user from '../database/models/user';
import UserInterface from '../interfaces/UserInterface';

const login = async ({ email, password }: UserInterface) => {
  const userValidation = await loginValidation({ email, password });

  if (userValidation.message !== 'OK') return userValidation;

  const userLogin = await user.findOne({ where: { email } });

  if (!userLogin) return { error: 401, message: 'Usuário não cadastrado' };

  const passCrypt = bcrypt.compareSync(password, userLogin.password);

  if (!passCrypt) return { error: 401, message: 'Incorrect email or password' };

  const token = await createToken({ email, password });

  const resultUser = {
    user: {
      id: userLogin.id,
      username: userLogin.username,
      role: userLogin.role,
      email: userLogin.email,
    },
    token,
  };

  return { error: 200, message: resultUser };
};

export default login;
