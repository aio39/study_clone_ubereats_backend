import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Category } from 'src/restaurant/dtos/category.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Dish } from 'src/restaurant/dtos/dish.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

// relation 지정 후에  graphql의
// ObjectTYpe과 InputType이 같은 이름을 사용하지 않도록  InputType 첫번쨰 매개변수 추가
@InputType('RestaurantInputType', { isAbstract: true }) // input type이 스키마에 포함되지 않는다. 추상 확장 , OmitType에 명시하거나 여기에 적던가 택1
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  // @PrimaryGeneratedColumn()
  // @Field((type) => Number)
  // id: number; // core로 대체

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => Category, { nullable: true }) // 카테고리를 지울 때 레스토랑은 지우지 않는다.
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User) // 카테고리를 지울 때 레스토랑은 지우지 않는다.
  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.restaurant)
  orders: Order[];

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field((type) => [Dish])
  @OneToMany((type) => Dish, (dish) => dish.restaurant)
  menu: Dish[];
}
