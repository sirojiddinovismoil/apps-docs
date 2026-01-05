    import { PartialType } from '@nestjs/mapped-types';
    import { CreateLaptopDto } from './create-laptop.dto';
    import { ApiProperty } from '@nestjs/swagger';
    import { IsDefined, IsEmpty, IsNumber, Min } from 'class-validator';

    export class UpdateLaptopDto extends PartialType(CreateLaptopDto) {
    @ApiProperty()
    @IsNumber()
    @IsDefined()
    // @IsEmpty()
    @Min(1)
    id:number
    }
