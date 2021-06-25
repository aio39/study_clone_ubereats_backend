import { InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Field, Float } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Dish } from 'src/restaurant/dtos/dish.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType', { isAbstract: true }) // input type이 스키마에 포함되지 않는다. 추상 확장 , OmitType에 명시하거나 여기에 적던가 택1
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer?: User;

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.rides, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  driver: User;

  @Field((type) => Restaurant)
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  restaurant: Restaurant;

  @Field((type) => [Dish])
  @ManyToMany((type) => Dish)
  @JoinTable() //owning 쪽에 한번만 사용.
  dishes: Dish[];

  @Column({ nullable: true })
  @Field((type) => Float, { nullable: true })
  total?: number;

  @Column({ type: 'enum', enum: OrderStatus })
  @Field((type) => OrderStatus)
  status: OrderStatus;
}
