import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { DbEnum } from '@enums/config.enum'
import { getServerConfig } from '@utils/index'
import { join } from 'path'

// 为什么要使用这个文件
// 使用ormcli
export function buildConnectionOptions() {
  const config = getServerConfig()
  //会和热更新冲突
  const entitiesDir =
    process.env.NODE_ENV === 'test'
      ? [join(__dirname, '../modules/**/entities/*.entity.ts')]
      : [join(__dirname, '../modules/**/entities/*.entity{.js,.ts}')]


  return {
    type: config[DbEnum.DB_TYPE],
    host: config[DbEnum.DB_HOST],
    port: config[DbEnum.DB_PORT],
    username: config[DbEnum.DB_USERNAME],
    password: config[DbEnum.DB_PASSWORD],
    database: config[DbEnum.DB_DATABASE],
    entities: entitiesDir,
    // 同步本地的schema与数据库 -> 初始化的时候去使用
    synchronize: true,
    // logging: logFlag && process.env.NODE_ENV === 'development',
    // logging: false,
  } as TypeOrmModuleOptions
}

export const typeOrmConfig = buildConnectionOptions()
export default new DataSource({
  ...typeOrmConfig,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions)
