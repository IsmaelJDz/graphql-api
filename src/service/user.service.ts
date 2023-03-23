import { ApolloError } from 'apollo-server';
import {
  CreateUserInput,
  UserModel,
  LoginInput,
} from '../schema/user.schema';
import Context from '../types/context';
import bcrypt from 'bcrypt';
import { signJwt } from '../utils/jwt';

class UserService {
  async createUser(input: CreateUserInput) {
    /** Call user model to create a user */

    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const e = 'Invalid email or password';

    /** Get our user by email */
    const user = await UserModel.find()
      .findByEmail(input.email)
      .lean();

    /** Check if user exists */

    if (!user) {
      throw new ApolloError(e);
    }

    /** Validate password */

    const passwordIsValid = await bcrypt.compare(
      input.password,
      user.password
    );

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }

    /** Sign a jwt */

    const token = signJwt(user);

    /** Set a cookie for the jwt */

    // context.res.cookie('accessToken', token, {
    //   maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year 3.154e10
    //   httpOnly: true,
    //   domain:
    //     process.env.NODE_ENV === 'production'
    //       ? '.ismaelbr.com'
    //       : 'localhost',
    //   path: '/',
    //   sameSite: 'strict',
    //   secure: process.env.NODE_ENV === 'production' ? true : false,
    // });

    context.res.cookie('accessToken', token, {
      //maxAge: 3.154e10, // 1 year
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });

    /** Return the jwt */

    return token;
  }
}

//export default new UserService();
export default UserService;
