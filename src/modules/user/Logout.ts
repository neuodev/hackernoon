import { MyContext } from 'src/types/MyContext';
import { Ctx, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class Logout {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((res, rej) => {
      if (!ctx.req.session) rej(false);
      return ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err.message);
          rej(false);
        }
        res(true);
      });
    });
  }
}
