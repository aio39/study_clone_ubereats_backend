import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from 'src/restaurant/dtos/category.entity';

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field((type) => [Category], { nullable: true }) // gq와 ts의 옵션은 따로 각각 줘야함.
  categories?: Category[]; // 카테고리가 언제나 존재하는 것은 아니므로 "?"
}
