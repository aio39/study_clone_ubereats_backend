import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable() // service는 resolver에 inject하고 repository는 service에 inject해서 bd 접근가능
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }
  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    // const newRestaurant = new Restaurant();
    const newRestaurant = this.restaurants.create(createRestaurantDto); //DB와 관계없는 단순한 JS 객체
    return this.restaurants.save(newRestaurant); // promise 반환
  }
}
