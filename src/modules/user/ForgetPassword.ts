import { User } from '../../entity/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { createConfirmationUrl } from '../utils/createConfirmUrl';
import { sendEmail } from '../utils/sendEmail';
import { redis } from '../../redis';
import { ForgetPasswordInput } from './forgetPassword/forgetPasswordInput';
import bcrypt from 'bcryptjs';
@Resolver()
export class ForgetPasswordResolver {
  @Mutation(() => Boolean)
  async forgetPassword(@Arg('email') email: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new Error('Invalid email, user not found');

    await sendEmail(email, await createConfirmationUrl(user.id));

    return true;
  }

  @Mutation(() => Boolean)
  async changePassword(
    @Arg('data') { token, newPassword }: ForgetPasswordInput
  ) {
    const id = await redis.get(token);
    if (!id) throw new Error('Invalid token');

    const user = await User.find({
      where: {
        id,
      },
    });

    if (!user) throw new Error('User not found');

    // hash  the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // update user password
    await User.update(
      {
        id: id as any,
      },
      { password: hashedPassword }
    );

    // remove the token
    await redis.del(token);
    return true;
  }
}
