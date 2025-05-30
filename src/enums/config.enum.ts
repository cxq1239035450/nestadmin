export enum ConfigEnum {
  SERVER_PORT = 'SERVER_PORT',
}

export enum DbEnum {
  DB_TYPE = 'DB_TYPE',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_DATABASE = 'DB_DATABASE',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_SYNC = 'DB_SYNC',
}

export enum JwtEnum {
  SECRET = 'SECRET', 
}

export enum RedisEnum {
  REDIS_HOST = 'REDIS_HOST',
  REDIS_PORT = 'REDIS_PORT',
  REDIS_PASSWORD = 'REDIS_PASSWORD',
  REDIS_DB = 'REDIS_DB', 
}

export enum LogEnum {
  LOG_LEVEL = 'LOG_LEVEL',
  LOG_ON = 'LOG_ON',
  TIMESTAMP = 'TIMESTAMP',
}

export enum UploadEnum {
  UPLOAD_PATH = 'UPLOAD_PATH',
  MAX_FILE_SIZE = 'MAX_FILE_SIZE',
}
