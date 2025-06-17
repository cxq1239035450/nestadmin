import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from 'src/enums/role.enum'
import { ROLES_KEY } from 'src/common/decorators/roles.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // jwt -> userId -> user -> roles
    // getAllAndMerge -> 合并 getAllAndOveride -> 读取路由上的metadata

    const req = context.switchToHttp().getRequest()
    const roles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (roles) {
      return this.hasRole(req.user.roles,roles);
    }
    return true
  }
  // 校验用户角色
  hasRole(role: string, roles: string[]) {
    return roles.some((v) => v === role);
  }
}
