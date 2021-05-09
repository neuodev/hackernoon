import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ForgetPasswordInput {
  @Field()
  token: string;

  @Field()
  @MinLength(6)
  newPassword: string;
}
