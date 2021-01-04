import { IsPhoneNumber, IsNotEmpty, MinLength } from 'class-validator';

import { Match } from '../../../utils/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber(null)
  phone: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Match('password', {
    message: 'Password confirmation must be equal to password',
  })
  passwordConfirmation: string;
}
