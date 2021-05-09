import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { MyContext } from 'src/types/MyContext';

class ConfirmEmailResover {
  @Mutation(() => Boolean, {
    nullable: false,
  })
  async confirmEamil(@Arg('token') token: string): Promise<boolean> {
    return true;
  }
}

export default ConfirmEmailResover;
