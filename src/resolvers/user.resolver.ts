import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateUserInput,
  LoginInput,
  User,
} from '../schema/user.schema';
import UserService from '../service/user.service';
import Context from '../types/context';

@Resolver()
export default class UserResolver {
  constructor(private userServer: UserService) {
    this.userServer = new UserService();
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput) {
    return this.userServer.createUser(input);
  }

  @Mutation(() => String) // return jwt token
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.userServer.login(input, context);
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
