import { Post } from '../../entity/Post';
import { MyContext } from '../../types/MyContext';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { EditPostInput } from './post/EditPostInput';
import { ResponseMessage, ResponseMessageType } from '../../types/Response';

@Resolver()
export default class PostResolver {
  @Mutation(() => Post, {
    nullable: true,
  })
  async createPost(
    @Arg('title') title: string,
    @Ctx() ctx: MyContext
  ): Promise<Post | null> {
    if (!ctx.req.session!.userId)
      throw new Error('Session Expired, Try to login ');

    const user = await User.findOne(ctx.req.session!.userId);

    if (!user) throw new Error('User Not Found');

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
    if (!ctx.req.session) throw new Error('Session Expired, Try to login ');
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

    if (!post) throw new Error('Post Not Found');

    post.title = title;
    post.save();

    return post;
  }

  @Mutation(() => ResponseMessageType)
  async deletePost(
    @Arg('postId') postId: string,
    @Ctx() ctx: MyContext
  ): Promise<ResponseMessage> {
    if (!ctx.req.session)
      return {
        success: false,
        message: 'Session expired, Try to login',
      };
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
    if (!post)
      return {
        success: false,
        message: "User or the post is n't exist",
      };

    // delete the post
    post.remove();
    return {
      success: true,
      message: 'Post deleted successfully',
    };
  }
}
