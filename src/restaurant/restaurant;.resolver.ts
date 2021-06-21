import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  // @Query(() => [Restaurant]) // GraphQl을 위한 리턴 타입
  // restaurant(): Promise<Restaurant[]> {
  //   // TS를 위한 리턴 타입
  //   return this.restaurantService.getAll();
  // }
  @Mutation((returns) => CreateRestaurantOutput)
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.createRestaurant(
      authUser,
      createRestaurantInput,
    );
  }

  // @Mutation((returns) => Boolean)
  // async updateRestaurant(
  //   @Args('input') updateRestaurantDto: UpdateRestaurantDto,
  // ) {
  //   try {
  //     await this.restaurantService.updateRestaurant(updateRestaurantDto);
  //     return true;
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // }
}
