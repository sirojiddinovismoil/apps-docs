import { ApiProperty } from "@nestjs/swagger";
import { IsNumber,  IsString} from "class-validator";

export class CreateLaptopDto {
@ApiProperty()
@IsString()
name:string;

@ApiProperty()
@IsString()
module:string;

@ApiProperty()
@IsNumber()
memory_GB:number

@ApiProperty()
@IsNumber()
brandId:number
}
