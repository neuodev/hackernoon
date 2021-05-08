import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import LoginInput from './login/LoginInput';
@Resolver(User)
class Login {
  @Mutation(() => User, {
    nullable: true,
  })
  async login(
    @Arg('data') { password, email }: LoginInput
  ): Promise<User | null> {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }
}

export default Login;
