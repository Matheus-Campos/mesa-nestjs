import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class FilterUsersDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  perPage?: number;
}
