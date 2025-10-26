// src/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto} from '../../models/dto/user/user.dto';
import { User } from '../../models/entities/user.entities';
import { BaseRepository } from '../../repository/base.respository';
import { normalizePhone } from '../../shared/helper/fn.helper';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UserService {
  private repository: BaseRepository<User>;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {
    this.repository = new BaseRepository<User>(this.userModel);
  }

  /**
   * Tạo mới user
   */
  public async createUser(dto: CreateUserDto): Promise<User | null> {
  const phoneObj = normalizePhone(dto.phoneNumber);
  const passwordHash = dto.password ? await bcrypt.hash(dto.password, 10) : '';

  const newUser: Partial<User> = {
    userId: uuidv4(),
    emailAddress: dto.emailAddress || "",
    firstName: dto.firstName || '',
    lastName: dto.lastName || '',
    fullName: `${dto.firstName || ''} ${dto.lastName || ''}`.trim(),
    phoneNumber: phoneObj?.custom_withPlus84_andRaw || '',
    defaultAddress: dto.defaultAddress || '',
    points: dto.points ?? 0,
    status: dto.status || 'active',
    passwordHash,
    listTenant: dto.listTenant || [],
    userCreate: dto.userCreate ?? 0,
    userUpdate: dto.userUpdate ?? 0,
    role: dto.role ?? 0,
    privateKey: "",
  };

  // repository.create sẽ gọi new this.model(data) bên trong
  return await this.repository.create(newUser);

  }

  /**
   * Lấy danh sách user với paging
   */
  public async getUsers(
    search: string = "",
    pageCurrent: number = 1,
    pageSize: number = 10,
    sortList: { key: string; value: 'asc' | 'desc' }[] = []
  ): Promise<{ users: any[]; totalUsers: number }> {
    const filter: any = {};
    if (search) {
      filter.$or = [
        { emailAddress: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const sort: any = {};
    sortList.forEach((s) => {
      sort[s.key] = s.value === 'asc' ? 1 : -1;
    });
    if (Object.keys(sort).length === 0) sort['updatedAt'] = -1;

    const skip = (pageCurrent - 1) * pageSize;
    const limit = pageSize;

    const { data, total } = await this.repository.getMany(filter, null, {
      skip,
      limit,
      sort,
    });

    // loại bỏ passwordHash & privateKey trước khi trả về
    const users = data.map((u:any) => {
      const { passwordHash, privateKey, ...rest } = u as any;
      return rest;
    });

    return { users, totalUsers: total };
  }

  /**
   * Lấy user theo id
   */
  public async getUserById(userId: string): Promise<any | null> {
    const user = await this.repository.getOne({ userId });
    if (!user) return null;

    const { passwordHash, privateKey, ...rest } = user as any;
    return rest;
  }

  /**
   * Cập nhật user
   */
  // public async updateUser(userId: string, dto: UpdateUserDto): Promise<any | null> {
  //   const updateData: any = {
  //     emailAddress: dto.emailAddress,
  //     firstName: dto.firstName || '',
  //     lastName: dto.lastName || '',
  //     fullName: `${dto.firstName || ''} ${dto.lastName || ''}`.trim(),
  //     phoneNumber: normalizePhone(dto.phoneNumber),
  //     address: dto.address,
  //     points: dto.points ?? 0,
  //     status: dto.status,
  //     listTenant: dto.listTenant,
  //     userUpdate: dto.userUpdate,
  //     role: dto.role ?? 0,
  //   };

  //   if (dto.password) {
  //     updateData.passwordHash = await bcrypt.hash(dto.password, 10);
  //     updateData.privateKey = generatePrivateKey();
  //   }

  //   const updatedUser = await this.repository.update(userId, updateData);
  //   if (!updatedUser) return null;

  //   const { passwordHash, privateKey, ...rest } = updatedUser as any;
  //   return rest;
  // }

  /**
   * Xóa mềm user
   */
  public async softDeleteUser(userId: string): Promise<any | null> {
    return this.repository.softDelete(userId);
  }

  /**
   * Xóa cứng user
   */
  public async hardDeleteUser(userId: string): Promise<{ deletedCount?: number }> {
    return this.repository.hardDelete(userId);
  }
}
