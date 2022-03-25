import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dtos/home.dto';

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHomes(): Promise<HomeResponseDto[]> {
    const homes = await this.prismaService.home.findMany({
      include: {
        images: true,
      },
    });

    return homes.map((home) => {
      const fetchedHome = { ...home, image: home.images[0]?.url };
      delete fetchedHome.images;

      return new HomeResponseDto(fetchedHome);
    });
  }

  getHomeById() {
    throw new Error('Method not implemented.');
  }

  createHome() {
    throw new Error('Method not implemented.');
  }

  updateHome() {
    throw new Error('Method not implemented.');
  }
  deleteHome() {
    throw new Error('Method not implemented.');
  }
}
