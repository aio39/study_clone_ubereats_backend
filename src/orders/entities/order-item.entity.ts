import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Dish, DishOption } from 'src/restaurant/dtos/dish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  // NOTE 항상 반대 entity에도 상관 관계를 명시해줄 필요는 없다.
  //    반대쪽 관계에 접근의 필요성이 있을때만 해준다.
  //   이 entity에서 상대쪽으로 접근은 불가능하지만 상대 entity에서 여기로는 접근 가능.
  @ManyToOne((type) => Dish, { nullable: true, onDelete: 'CASCADE' })
  dish: Dish;

  @Field((type) => [DishOption], { nullable: true })
  @Column({ type: 'json', nullable: true }) // mysql postgreSQL
  options: DishOption[];
}
