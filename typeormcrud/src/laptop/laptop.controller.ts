import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, } from '@nestjs/common';
import { LaptopService } from './laptop.service';
import { CreateLaptopDto } from './dto/create-laptop.dto';
import { UpdateLaptopDto } from './dto/update-laptop.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListDto } from './dto/list.dto';

@Controller('laptop')
export class LaptopController {
  constructor(private readonly laptopService: LaptopService) {}

  @Post()
  create(@Body() payload: CreateLaptopDto) {
    console.log('accepted')
    return this.laptopService.create(payload);
  }

  @Put() 
  update(@Body() payload: UpdateLaptopDto){
    return this.laptopService.updateEX(payload)
  }

  @Get()
  findAll() {
    return this.laptopService.findAll();
  }
  
    @Get('list')
    async getCount(@Query() payload:ListDto ){
   return this.laptopService.findCounts(payload)
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laptopService.findOne(+id);
  }
  

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.laptopService.remove(+id);
  }
}
