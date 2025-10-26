// src/dto/user.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Nguyen Van A', description: 'Tên người dùng' })
  @IsNotEmpty()
  @IsString()
  firstName: string= "";

  @ApiProperty({ example: 'Nguyen', description: 'Họ người dùng' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'abc@gmail.com', description: 'Email người dùng' })
  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @ApiProperty({ example: '+84901234567', description: 'Số điện thoại' })
  @IsNotEmpty()
  @IsString()
  phoneNumber!: string ;

  @ApiProperty({ example: 'active', description: 'Trạng thái người dùng' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: 0, description: 'Điểm người dùng' })
  @IsOptional()
  @IsNumber()
  points?: number;

  @ApiProperty({ example: 'password123', description: 'Mật khẩu' })
  @IsOptional()
  @IsString()
  password: string = "";

  @ApiProperty({ example: [], description: 'Danh sách tenant' })
  @IsOptional()
  listTenant?: string[] ;

  @ApiProperty({ example: 0, description: 'ID người tạo' })
  @IsOptional()
  @IsNumber()
  userCreate?: number;

  @ApiProperty({ example: 0, description: 'ID người cập nhật' })
  @IsOptional()
  @IsNumber()
  userUpdate?: number;

  @ApiProperty({ example: 0, description: 'Role người dùng' })
  @IsOptional()
  @IsNumber()
  role?: number;

  @ApiProperty({ example: 0, description: 'Address mẫu' })
  @IsOptional()
  @IsNumber()
  defaultAddress?: string;
}


// DTO để update user
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// DTO trả về user (response)
export class UserResponseDto {
  @ApiProperty()
  userId?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  fullName?: string;

  @ApiProperty()
  emailAddress?: string;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  points?: number;

  @ApiProperty()
  listTenant?: string;

  @ApiProperty()
  userCreate?: number;

  @ApiProperty()
  userUpdate?: number;

  @ApiProperty()
  role?: number;

  @ApiProperty()
  avatar?: string;

  @ApiProperty({ type: Date, nullable: true })
  birthday?: Date;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

