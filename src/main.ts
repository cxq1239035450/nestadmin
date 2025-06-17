import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module'
import { AllExceptionFilter } from '@filters/all-exception.filter'
import { TransformInterceptor } from '@interceptors/transform.interceptor'
import { ConfigEnum } from '@enums/config.enum';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除在类上不存在的字段
      whitelist: true,
      // 自动转换参数类型
      transform: true,
      // 遇到错误立即停止验证
      stopAtFirstError: true,
    }),
  )
  app.useGlobalInterceptors(new TransformInterceptor())

  const config = app.get(ConfigService);
  // // helmet头部安全
  // app.use(helmet())

  const swaggerOptions = new DocumentBuilder()
    .setTitle('NEST后台')
    .setDescription(
      '描述：<a href="http://localhost:3000/api">默认 json 链接</a>',
    )
    .setVersion('1.0.1')
    .setOpenAPIVersion('3.1.0')
    .addBearerAuth() // 添加授权
    .build()
  // 创建文档
  const document = SwaggerModule.createDocument(app, swaggerOptions)
  // 设置文档路径 为 api
  SwaggerModule.setup('api', app, document, { jsonDocumentUrl: 'swagger/json' })
  const port = config.get<number>(ConfigEnum.SERVER_PORT) || 3000
  await app.listen(port)
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
  console.log(`Nest 服务启动成功`, '\n', '服务地址', `http://localhost:${port}/`, '\n', 'swagger 文档地址', `http://localhost:${port}/api/`);
}
bootstrap()
