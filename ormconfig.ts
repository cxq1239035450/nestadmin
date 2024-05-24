import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { ConfigEnum } from './src/enums/config.enum'
import { getServerConfig } from './src/utils'

// 为什么要使用这个文件
// 使用ormcli
export function buildConnectionOptions() {
  const config = getServerConfig()
  //会和热更新冲突 
  const entitiesDir =
    process.env.NODE_ENV === 'test'
      ? [__dirname + '/src/modules/**/entities/*.entity.ts']
      : [__dirname + '/src/modules/**/entities/*.entity{.js,.ts}']

  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
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
