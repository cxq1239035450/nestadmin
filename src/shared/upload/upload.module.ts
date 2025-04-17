import { Module } from '@nestjs/common';
import { CommonUploadService } from './upload.service';
import { NestApplication } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { UploadEnum } from "@enums/config.enum";
import { join,extname } from "path"
import { getTime } from '@utils/time'

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: (req, file, cb) => {
            // 从环境变量获取上传路径
            const uploadPath = configService.get(UploadEnum.UPLOAD_PATH) || 'uploads';
            // 确保路径存在
            const fullPath = join(process.cwd(), uploadPath);
            require('fs').mkdirSync(fullPath, { recursive: true });
            cb(null, fullPath);
          },
          filename: (req, file, cb) => {
            cb(null, `${getTime()}-${file.originalname}`);
          },
        }),
        limits: {
          fileSize: configService.get(UploadEnum.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 默认5MB
        },
      }),
    }),
  ],
  providers: [CommonUploadService],
  exports: [CommonUploadService,MulterModule],
})
export class CommonUploadModule {
}