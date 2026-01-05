import { Module } from '@nestjs/common';
import { LaptopService } from './laptop.service';
import { LaptopController } from './laptop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { laptopEntity } from 'src/entities/laptop.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([laptopEntity])
  ],
  controllers: [LaptopController],
  providers: [LaptopService],
})
export class LaptopModule {}
