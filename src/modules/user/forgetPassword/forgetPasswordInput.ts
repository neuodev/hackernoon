import { MinLength } from 'class-validator';
import { InputType } from 'type-graphql';

@InputType()
export class ForgetPasswordInput {
  token: string;

  @MinLength(6)
  newPassword: string;
}
