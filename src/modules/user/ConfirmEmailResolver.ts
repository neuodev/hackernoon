import { User } from '../../entity/User';
import { Arg, Mutation } from 'type-graphql';
import { redis } from '../../redis';

class ConfirmEmailResover {
  @Mutation(() => Boolean, {
    nullable: false,
  })
  async confirmEamil(@Arg('token') token: string): Promise<boolean> {
    const id = await redis.get(token);
    if (!id) {
      throw new Error('Token Expired');
    }

    const user = await User.findOne(id);

    if (!user) throw new Error('User Not Found');

    await redis.del(token);

    user.confirmed = true;

    user.save();

    return true;
  }
}

export default ConfirmEmailResover;
