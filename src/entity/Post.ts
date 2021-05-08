import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @Field()
  @OneToOne(() => User)
  @JoinColumn()
  by: User;

  @Field()
  @Column('date', {
    default: new Date(),
  })
  date: string;
}
