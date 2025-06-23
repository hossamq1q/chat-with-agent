import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DatabaseConfigDto {
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsString()
  @IsNotEmpty()
  port: number;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  database: string;

  @IsString()
  @IsNotEmpty()
  mysql_query: string;
}

export class CreateApiDto {
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @IsOptional()
  urls: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DatabaseConfigDto)
  database_config?: DatabaseConfigDto;
}
