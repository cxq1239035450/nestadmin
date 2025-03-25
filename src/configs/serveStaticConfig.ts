import { ServeStaticModuleOptions } from '@nestjs/serve-static'
import { join } from 'path'

export const ServeStaticConfig = [
  {
    rootPath: join(process.cwd(), 'static'), // 静态资源目录
    serveRoot: '/static', // 静态资源访问路径
    exclude: [], // 排除路径
    serveStaticOptions: {
      maxAge: 3600 * 24 * 7, // 缓存时间
    },
  },
  {
    rootPath: join(process.cwd(), 'uploads'), // 静态资源目录
    serveRoot: '/uploads',
    exclude: [],
    serveStaticOptions: {
      maxAge: 3600 * 24 * 7, // 缓存时间
    },
  },
] as ServeStaticModuleOptions []
