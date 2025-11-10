import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UserService } from "../../services/admin/user.service";
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
  RegisterUserDto,
} from "../../models/dto/user/user.dto";
import { BaseController } from "../base/base.controller";
import { BaseCrud } from "../base/crud.controller";

@ApiTags("Users")
@ApiBearerAuth("access-token") // dùng token đã khai báo ở swagger
@Controller("users")
export class UserController extends BaseCrud<UserService>(
  "userId",
  CreateUserDto,
  UpdateUserDto
) {
  constructor(public readonly userService: UserService) {
    super(userService);
  }
  @Post()
  @ApiOperation({ summary: "Create a new user" })
  async create(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post("login")
  @ApiOperation({ summary: "Login user" })
  async login(@Body() body: LoginUserDto) {
    return this.userService.login(body.emailOrPhone, body.password);
  }

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  async register(@Body() body: RegisterUserDto) {
    return this.userService.register(body);
  }
}
