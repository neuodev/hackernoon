import { Post } from '../../entity/Post';
import { MyContext } from '../../types/MyContext';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { EditPostInput } from './post/EditPostInput';

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

  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    const posts = await Post.find({ relations: ['user'] });
    return posts;
  }

  @Mutation(() => Post, {
    nullable: true,
  })
  async editPost(
    @Arg('data') { postId, title }: EditPostInput,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    if (!ctx.req.session) return null;
    const userId = ctx.req.session!.userId;

    // check for the user and the post
    const post = await Post.findOne({
      relations: ['user'],
      where: {
        id: postId,
        user: {
          id: userId,
        },
      },
    });

    if (!post) return null;

    post.title = title;
    post.save();

    return post;
  }

  @Mutation(() => String)
  async deletePost(
    @Arg('postId') postId: string,
    @Ctx() ctx: MyContext
  ): Promise<string> {
    if (!ctx.req.session) return 'session is expired';
    const userId = ctx.req.session!.userId;

    // check if the user and the post exist
    // return it if exsit
    const post = await Post.findOne({
      relations: ['user'],
      where: {
        id: postId,
        user: {
          id: userId,
        },
      },
    });
    if (!post) return "User or the post is n't exist";

    // delete the post
    post.remove();
    return 'success';
  }
}
