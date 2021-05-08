import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;
}

export default LoginInput;
