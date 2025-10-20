
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../base.respository';
import { Role, RoleDocument } from '../../models/entities/role.entities';

@Injectable()
export class RoleRepository extends BaseRepository<RoleDocument> {
  constructor(@InjectModel(Role.name) protected readonly roleModel: Model<RoleDocument>) {
    super(roleModel);
  }
}