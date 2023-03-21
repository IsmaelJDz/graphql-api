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
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userServer.createUser(input);
  }

  @Mutation(() => String) // return jwt token
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.userServer.login(input, context);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    return context.user;
  }
}
