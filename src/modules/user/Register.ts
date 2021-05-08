import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
@Resolver(User)
class Register {
  @Query(() => String)
  async health() {
    return 'healthy';
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') passowrd: string
  ): Promise<User> {
    //   hash the password
    const hashedPassword = await bcrypt.hash(passowrd, 10);
    //  create the user

    const user = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    }).save();
    return user;
  }
}

export default Register;
