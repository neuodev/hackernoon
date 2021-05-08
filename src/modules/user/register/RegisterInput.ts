import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsUserAlreadyExist } from './isUserAlreadyExist';

@InputType()
export class RegisterInput {
  @Length(3, 255)
  @Field()
  username: string;

  @IsEmail()
  @IsUserAlreadyExist({
    message: 'User Already exist',
  })
  @Field()
  email: string;

  @Field()
  password: string;
}
