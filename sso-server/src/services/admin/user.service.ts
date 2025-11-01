// src/services/user.service.ts
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateUserDto } from "../../models/dto/user/user.dto";

import { BaseRepository } from "../../repository/base.respository";
import { normalizePhone } from "../../shared/helper/fn.helper";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "../helper/crud.service";
import { User, UserDocument } from "../../models/entities/user.entities";
import { UserRepository } from "../../repository/user/user.respository";
import { createToken } from "../../shared/utils/jwt.util";
import {
  ConflictError,
  NotfoundError,
  ProcessError,
  Unauthorized,
} from "../../shared/utils/response.util";
@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(protected readonly userRepository: UserRepository) {
    super(userRepository);
  }

  public async createUser(dto: CreateUserDto): Promise<any | null> {
    const phoneObj = normalizePhone(dto.phoneNumber);

    const existingUser = await this.repository.getOne({
      $or: [
        { phoneNumber: phoneObj?.custom_withPlus84_andRaw || "" },
        { emailAddress: dto.emailAddress || "" },
      ],
    });

    if (existingUser) {
      return ConflictError("Email hoặc số điện thoại đã tồn tại");
    }
    const passwordHash = dto.password
      ? await bcrypt.hash(dto.password, 10)
      : "";

    const newUser: Partial<UserDocument> = {
      userId: uuidv4(),
      emailAddress: dto.emailAddress || "",
      firstName: dto.firstName || "",
      lastName: dto.lastName || "",
      fullName: `${dto.firstName || ""} ${dto.lastName || ""}`.trim(),
      phoneNumber: phoneObj?.custom_withPlus84_andRaw || "",
      address: dto.address || "",
      points: dto.points ?? 0,
      status: dto.status || "active",
      passwordHash,
      roleId: dto.roleId ?? "",
      privateKey: uuidv4(),
    };

    // repository.create sẽ gọi new this.model(data) bên trong
    await this.repository.create(newUser);
    return {
      user: newUser,
      isEncrypted: true,
    };
  }

  /**
   * Lấy danh sách user với paging
   */
  public async getUsers(
    search: string = "",
    pageCurrent: number = 1,
    pageSize: number = 10,
    sortList: { key: string; value: "asc" | "desc" }[] = []
  ): Promise<{ users: any[]; totalUsers: number; isEncrypted: boolean }> {
    const filter: any = {};
    if (search) {
      filter.$or = [
        { emailAddress: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
      ];
    }

    const sort: any = {};
    sortList.forEach((s) => {
      sort[s.key] = s.value === "asc" ? 1 : -1;
    });
    if (Object.keys(sort).length === 0) sort["updatedAt"] = -1;

    const skip = (pageCurrent - 1) * pageSize;
    const limit = pageSize;

    const { data, total } = await this.repository.getMany(filter, null, {
      skip,
      limit,
      sort,
    });

    // loại bỏ passwordHash & privateKey trước khi trả về
    const users = data.map((u: any) => {
      const { passwordHash, privateKey, ...rest } = u as any;
      return rest;
    });

    return { users, totalUsers: total, isEncrypted: true };
  }

  /**
   * Lấy user theo id
   */
  public async getUserById(userId: string): Promise<any | null> {
    const user = await this.repository.getOne({ userId });
    if (!user) return null;

    const { passwordHash, ...rest } = user as any;
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
    return this.repository.softDelete({ userId });
  }

  /**
   * Xóa cứng user
   */
  public async hardDeleteUser(
    userId: string
  ): Promise<{ deletedCount?: number }> {
    return this.repository.delete({ userId });
  }

  //login
  public async login(emailOrPhone: string, password: string): Promise<any> {
    let phoneNormalized: string | null = null;
    const query: any[] = [];

    if (/^\+?\d{9,15}$/.test(emailOrPhone.replace(/\s/g, ""))) {
      const normalized = normalizePhone(emailOrPhone);
      if (normalized) {
        phoneNormalized = normalized.custom_withPlus84_andRaw;
        query.push({ phoneNumber: phoneNormalized });
      }
    }

    query.push({ emailAddress: emailOrPhone });

    const user: UserDocument | null = await this.repository.getOne({
      $or: query,
    });
    if (!user) {
      return NotfoundError();
    }

    if (user.status === "block") {
      return ProcessError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return Unauthorized("Mật khẩu không đúng");
    }
    const token: string = createToken(user);
    return {
      user,
      token,
    };
  }

  public async register(dto: CreateUserDto): Promise<any | null> {
    const phoneObj = normalizePhone(dto.phoneNumber);

    const existingUser = await this.repository.getOne({
      $or: [
        { phoneNumber: phoneObj?.custom_withPlus84_andRaw || "" },
        { emailAddress: dto.emailAddress || "" },
      ],
    });

    if (existingUser) {
      return ConflictError("Email hoặc số điện thoại đã tồn tại");
    }
    const passwordHash = dto.password
      ? await bcrypt.hash(dto.password, 10)
      : "";

    const newUser: Partial<UserDocument> = {
      userId: uuidv4(),
      emailAddress: dto.emailAddress || "",
      firstName: dto.firstName || "",
      lastName: dto.lastName || "",
      fullName: `${dto.firstName || ""} ${dto.lastName || ""}`.trim(),
      phoneNumber: phoneObj?.custom_withPlus84_andRaw || "",
      address: dto.address || "",
      status: "active",
      passwordHash,
      roleId: dto.roleId ?? "",
      privateKey: uuidv4(),
    };

    await this.repository.create(newUser);
    const token: string = createToken(newUser);
    return {
      newUser,
      token,
    };
  }
}
