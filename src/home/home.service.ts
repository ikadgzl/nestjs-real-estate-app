import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dtos/home.dto';

interface GetHomesParams {
  city?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
  propertyType?: string;
}

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHomes(filters: GetHomesParams): Promise<HomeResponseDto[]> {
    const homes = await this.prismaService.home.findMany({
      include: {
        images: true,
      },
      where: filters,
    });

    if (!homes.length) throw new NotFoundException();

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
