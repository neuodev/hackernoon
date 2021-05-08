import { Field, InputType } from 'type-graphql';

@InputType()
export class EditPostInput {
  @Field()
  title: string;

  @Field()
  postId: string;
}
