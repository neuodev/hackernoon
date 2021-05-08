import { Post } from '../../entity/Post';
import { MyContext } from '../../types/MyContext';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export default class PostResolver {
  @Mutation(() => Post, {
    nullable: true,
  })
  async createPost(
    @Arg('title') title: string,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    if (!ctx.req.session!.userId) return null;

    const user = await User.findOne(ctx.req.session!.userId);

    const post = await Post.create({
      title,
      user: user,
    }).save();

    return post;
  }
}
