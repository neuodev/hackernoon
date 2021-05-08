import { Field, ObjectType } from 'type-graphql';

export interface ResponseMessage {
  success: boolean;
  message: string;
}

@ObjectType()
export class ResponseMessageType {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
