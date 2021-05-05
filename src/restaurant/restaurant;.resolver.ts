import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly RestaurantService: RestaurantService) {}
  @Query(() => [Restaurant]) // GraphQl을 위한 리턴 타입
  restaurant(): Promise<Restaurant[]> {
    // TS를 위한 리턴 타입
    return this.RestaurantService.getAll();
  }
  @Mutation((returns) => Boolean)
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    return true;
  }
}
