import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class CreateRestaurantDto {
  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  name: String;
  @Field((type) => Boolean)
  @IsBoolean()
  isVegan: boolean;
  @Field((type) => String)
  @IsString()
  address: String;
  @Field((type) => String)
  @IsString()
  ownersName: String;
}
