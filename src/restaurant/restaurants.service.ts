import { Injectable } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { number } from 'joi';
import { Category } from 'src/common/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dtos/edit-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable() // service는 resolver에 inject하고 repository는 service에 inject해서 bd 접근가능
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly categories: CategoryRepository,
  ) {}
  // getAll(): Promise<Restaurant[]> {
  //   return this.restaurants.find();
  // }

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      newRestaurant.owner = owner;
      const category = await this.categories.getOrCreate(
        createRestaurantInput.categoryName,
      );
      newRestaurant.category = category;
      await this.restaurants.save(newRestaurant);
      return { ok: true };
    } catch {
      return {
        ok: false,
        error: 'Could not create restaurant',
      };
    }
  }
  // updateRestaurant({ id, data }: UpdateRestaurantDto) {
  //   return this.restaurants.update(id, { ...data });
  // }

  async editRestaurant(
    owner: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    try {
      // TODO  find 중복 함수화
      const restaurant = await this.restaurants.findOne(
        editRestaurantInput.restaurantId,
        {
          //  loadRelationIds: true , RelationId를 설정하면 자동
        },
      );

      if (!restaurant) {
        return { ok: false, error: 'Restaurant not found' };
      }
      if (owner.id !== restaurant.ownerId)
        return {
          ok: false,
          error: "You can't edit a restaurant that you don't own",
        };

      let category: Category = null;
      if (editRestaurantInput.categoryName) {
        category = await this.categories.getOrCreate(
          editRestaurantInput.categoryName,
        );
      }

      await this.restaurants.save([
        {
          id: editRestaurantInput.restaurantId,
          ...editRestaurantInput,
          ...(category && { category }),
        },
      ]);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: ' Could not edit restaurant' };
    }
  }

  async deleteRestaurant(
    owner: User,
    { restaurantId }: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);

      if (!restaurant) {
        return { ok: false, error: 'Restaurant not found' };
      }
      if (owner.id !== restaurant.ownerId)
        return {
          ok: false,
          error: "You can't delete a restaurant that you don't own",
        };
      await this.restaurants.delete(restaurantId);
    } catch {
      return { ok: false, error: 'Could not delete' };
    }
  }
}
