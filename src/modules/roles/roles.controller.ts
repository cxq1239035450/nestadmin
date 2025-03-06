import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('角色')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  create(@Body() createRuleDto: CreateRoleDto) {
    console.log(createRuleDto, 'createRuleDtocreateRuleDto')

    return this.rolesService.create(createRuleDto)
  }
}
