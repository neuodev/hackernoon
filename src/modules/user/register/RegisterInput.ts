import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsUserAlreadyExist } from './isUserAlreadyExist';

@InputType()
export class RegisterInput {
  @Length(3, 50)
  @Field()
  firstName: string;

  @Length(3, 50)
  @Field()
  lastName: string;

  @IsEmail()
  @IsUserAlreadyExist()
  @Field()
  email: string;

  @Field()
  password: string;
}
