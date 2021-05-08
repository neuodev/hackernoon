import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text', {
    nullable: false,
  })
  title: string;

  @Field(() => User, {
    nullable: false,
  })
  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Field()
  @Column('date', {
    default: new Date(),
  })
  date: string;
}
