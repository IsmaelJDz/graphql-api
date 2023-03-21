import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserInput, User } from './schema/user.schema';
import UserService from '../service/user.service';

@Resolver()
export default class UserResolver {
  constructor(private userServer: UserService) {
    this.userServer = new UserService();
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput) {
    return this.userServer.createUser(input);
  }

  @Query(() => User)
  me() {
    return {
      _id: 1,
      name: 'John Doe',
      email: 'ismaelbr87@gmail.com',
    };
  }
}
