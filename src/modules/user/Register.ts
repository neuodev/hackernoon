import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
@Resolver(User)
class Register {
  @Query(() => String)
  async health() {
    return 'healthy';
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { username, password, email }: RegisterInput
  ): Promise<User> {
    //   hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //  create the user

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    }).save();
    return user;
  }
}

export default Register;
