import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Category } from 'src/common/entities/category.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@InputType({ isAbstract: true }) // input type이 스키마에 포함되지 않는다. 추상 확장 , OmitType에 명시하거나 여기에 적던가 택1
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

  @Field((type) => Category)
  @ManyToOne((type) => Category, (category) => category.restaurants)
  category: Category;
}
