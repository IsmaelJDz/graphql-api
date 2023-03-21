import { UserModel } from '../resolvers/schema/user.schema';

class UserService {
  async createUser(input: any) {
    /** Call user model to create a user */

    return UserModel.create(input);
  }
}

//export default new UserService();
export default UserService;
