import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UserService } from "../../services/admin/user.service";
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
} from "../../models/dto/user/user.dto";
import { BaseController } from "../base/base.controller";
import { BaseCrud } from "../base/crud.controller";

@ApiTags("UsersPrivate")
@ApiBearerAuth("access-token") // dùng token đã khai báo ở swagger
@Controller("usersPrivate")
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
  async register(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  async findAll() {
    return this.userService.getUsers();
  }
}
