import { User } from 'src/entity/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { createConfirmationUrl } from '../utils/createConfirmUrl';
import { sendEmail } from '../utils/sendEmail';

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
}
