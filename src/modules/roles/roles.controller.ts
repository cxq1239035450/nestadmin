import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { QueryRoleDto } from './dto/query-role.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('角色')
@UseGuards(AuthGuard('jwt'))
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @ApiOperation({
    summary: '创建角色',
  })
  @Post('create')
  create(@Body() createRuleDto: CreateRoleDto) {
    return this.rolesService.create(createRuleDto)
  }

  @ApiOperation({
    summary: '获取角色列表',
  })
  @Get('list')
  findAll(@Query() selectObj: QueryRoleDto) {
    console.log(selectObj,21);
    
    return this.rolesService.findAll(selectObj)
  }

  @ApiOperation({
    summary: '获取角色详情',
  })
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.rolesService.findOne(id)
  }

  @ApiOperation({
    summary: '修改角色',
  })
  @Put('update')
  update(@Body() createRuleDto: CreateRoleDto) {
    return this.rolesService.create(createRuleDto)
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.rolesService.remove(id) 
   }
}
