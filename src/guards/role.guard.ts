import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from 'src/enums/role.enum'
import { ROLES_KEY } from '@decorators/roles.decorator'
import { UserService } from '@modules/user/user.service'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // jwt -> userId -> user -> roles
    // getAllAndMerge -> 合并 getAllAndOveride -> 读取路由上的metadata
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }
    const req = context.switchToHttp().getRequest()
    console.log(req, req.user)

    // const user = await this.userService.find(req.user.username)

    // const roleIds = user.roles.map(o => o.id)
    // console.log(roleIds, user)

    // const flag = requiredRoles.some((role) => roleIds.includes(role));
    return true
  }
}
