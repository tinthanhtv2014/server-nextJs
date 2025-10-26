import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../../services/admin/user.service';
import { CreateUserDto, UpdateUserDto } from '../../models/dto/user/user.dto';
import { BaseController} from '../base/base.controller';
import { BaseCrud } from '../base/crud.controller';

@ApiTags('Users')
@Controller('users')
export class UserController extends BaseCrud<UserService>(
  "userId",
  CreateUserDto,
  UpdateUserDto,
) {
  constructor(public readonly userService: UserService) {
    super(userService);
  }
}