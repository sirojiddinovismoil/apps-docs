import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";

export class ListDto{
      @ApiProperty()
  @IsNumberString()
  page: number ;

  @ApiProperty()
  @IsNumberString()
  size: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  keyword?: string;

}
