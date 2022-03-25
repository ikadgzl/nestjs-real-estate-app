import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { HomeResponseDto } from './dtos/home.dto';
import { HomeService } from './home.service';

@Controller('/api/v1/home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHomes(): Promise<HomeResponseDto[]> {
    return this.homeService.getHomes();
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
