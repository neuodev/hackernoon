import { MyContext } from 'src/types/MyContext';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver(User)
class MeRe {
  @Query(() => User, {
    nullable: true,
  })
  async Me(@Ctx() ctx: MyContext): Promise<User | null> {
    if (!ctx.req.session) return null;
    const id = ctx.req.session!.userId;
    const user = await User.findOne({
      relations: ['posts'],
      where: {
        id: id,
      },
    });

    if (!user) return null;

    return user;
  }
}

export default MeRe;
