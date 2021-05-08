import { Field, ID, ObjectType, Root } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Field()
  @Column()
  username: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;
}
