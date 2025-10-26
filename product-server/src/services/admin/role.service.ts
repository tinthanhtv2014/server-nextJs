import { Injectable } from "@nestjs/common";
import { RoleDocument } from "../../models/entities/role.entities";
import { RoleRepository } from "../../repository/role/role.respository";
import { BaseService } from "../helper/crud.service";

@Injectable()
export class RoleService extends BaseService<RoleDocument> {
  constructor(roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
