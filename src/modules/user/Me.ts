import { MyContext } from 'src/types/MyContext';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver(User)
class MeRe {
  @Query(() => User, {
    nullable: true,
  })
  async Me(@Ctx() ctx: MyContext): Promise<User | null> {
    if (!ctx.req.session) throw new Error('You should login first');
    const id = ctx.req.session!.userId;
    const user = await User.findOne({
      relations: ['posts'],
      where: {
        id: id,
      },
    });

    if (!user) throw new Error('User Not Found');

    return user;
  }
}

export default MeRe;
