import { join } from 'path'

export const ServeStaticConfig = {
    rootPath: join(__dirname, '..', 'static'), // 静态资源目录
    serveRoot: '/static', // 静态资源访问路径
    exclude: [], // 排除路径
    serveStaticOptions: {
      maxAge: 3600 * 24 * 7, // 缓存时间
    },
  }