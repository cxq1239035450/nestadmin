import * as fs from 'fs'
import * as dotenv from 'dotenv'
import { join } from 'path'

export const envFilePath =
  `.env.${process.env.NODE_ENV || 'development'}`.trimEnd()

// 通过环境变量读取不同的.env文件
export function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env))
  }
  return {}
}

export function getServerConfig() {
  const defaultConfig = getEnv('.env')
  const envConfig = getEnv(envFilePath)
  // configService
  const config = { ...defaultConfig, ...envConfig }
  return config
}
