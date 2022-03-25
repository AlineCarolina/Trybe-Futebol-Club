import * as bcrypt from 'bcryptjs';
import createToken from '../auth/createToken';
import user from '../database/models/user';
import UserInterface from '../interfaces/UserInterface';

const login = async ({ email, password }: UserInterface) => {
  const userLogin = await user.findOne({ where: { email } });

  if (!userLogin) {
    return false;
  }

  const passCrypt = bcrypt.compareSync(password, userLogin.password);

  if (!passCrypt) {
    return false;
  }

  const token = await createToken({ email, password });

  return token;
};

export default login;