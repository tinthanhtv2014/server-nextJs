import { Injectable } from "@nestjs/common";

import { BaseService } from "../helper/crud.service";
import { PermissionDocument } from "../../models/entities/permission.entities";
import { PermissionRepository } from "../../repository/permission/permission.repository";

@Injectable()
export class PermissionService extends BaseService<PermissionDocument> {
  constructor(permissionRepository: PermissionRepository) {
    super(permissionRepository);
  }
}
