import { Optional } from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class HomeResponseDto {
  id: number;
  address: string;
  city: string;
  image: string;

  @Exclude()
  number_of_bedrooms: number;
  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.number_of_bedrooms;
  }

  @Exclude()
  number_of_bathrooms: number;
  @Expose({ name: 'numberOfBathrooms' })
  numberOfBathrooms() {
    return this.number_of_bathrooms;
  }

  @Exclude()
  listed_date: Date;
  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listed_date;
  }

  price: number;

  @Exclude()
  land_size: number;
  @Expose({ name: 'landSize' })
  landSize() {
    return this.land_size;
  }

  @Exclude()
  property_type: PropertyType;
  @Expose({ name: 'propertyType' })
  propertyType() {
    return this.property_type;
  }

  @Exclude()
  realtor_id: number;
  @Exclude()
  createad_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }
}

class Image {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  numberOfBedrooms: number;

  @IsNumber()
  @IsPositive()
  numberOfBathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  landSize: number;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => Image)
  images: Image[];
}

export class UpdateHomeDto {
  @Optional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Optional()
  @IsNumber()
  @IsPositive()
  numberOfBedrooms: number;

  @Optional()
  @IsNumber()
  @IsPositive()
  numberOfBathrooms: number;

  @Optional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Optional()
  @IsNumber()
  @IsPositive()
  price: number;

  @Optional()
  @IsNumber()
  @IsPositive()
  landSize: number;

  @Optional()
  @IsEnum(PropertyType)
  propertyType: PropertyType;
}
