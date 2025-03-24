import { envFilePath } from '../utils'
import * as dotenv from 'dotenv'
import * as Joi from 'joi' //校验数据

export const schema = Joi.object({
  DB_PORT: Joi.number().default(3306),
  DB_HOST: Joi.alternatives().try(
    Joi.string().ip(),
    Joi.string().domain(),
    'localhost',
  ),
  DB_TYPE: Joi.string().valid('mysql', 'postgres'),
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
  SECRET_KEY: Joi.string(),
  // LOG_ON: Joi.boolean(),
  // LOG_LEVEL: Joi.string(),
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number(),
  REDIS_PASSWORD: Joi.string(),
  REDIS_DB: Joi.number()
})
export const envConfig = {
  isGlobal: true, //设置成全局
  envFilePath, //指定环境变量文件
  load: [() => dotenv.config({ path: '.env' })],
  validationSchema: schema,
  validationOptions: {
    //允许环境变量中未知的键
    allowUnknown: true,
    abortEarly: false,
  },
}
