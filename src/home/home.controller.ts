import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { HomeResponseDto } from './dtos/home.dto';
import { HomeService } from './home.service';

@Controller('/api/v1/home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
  ): Promise<HomeResponseDto[]> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) }),
          }
        : undefined;

    const filters = {
      ...(city && { city }),
      ...(price && { price }),
      ...(propertyType && { propertyType }),
    };

    return this.homeService.getHomes(filters);
  }

  @Get('/:id')
  getHomeById() {
    return this.homeService.getHomeById();
  }

  @Post()
  createHome() {
    return this.homeService.createHome();
  }

  @Put('/:id')
  updateHome() {
    return this.homeService.updateHome();
  }

  @Delete('/:id')
  deleteHome() {
    return this.homeService.deleteHome();
  }
}
