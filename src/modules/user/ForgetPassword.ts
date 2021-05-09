import { User } from '../../entity/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { createConfirmationUrl } from '../utils/createConfirmUrl';
import { sendEmail } from '../utils/sendEmail';
import { redis } from '../../redis';

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
    @Arg('token') token: string,
    @Arg('password') newPassword: string
  ) {
    const id = await redis.get(token);
    if (!id) throw new Error('Invalid token');

    const user = await User.find({
      where: {
        id,
      },
    });

    if (!user) throw new Error('User not found');

    const update = await User.update(
      {
        id: parseInt(id),
      },
      { password: newPassword }
    );
  }
}
