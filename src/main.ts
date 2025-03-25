import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { AllExceptionFilter } from '@filters/all-exception.filter'
import { TransformInterceptor } from '@interceptors/transform.interceptor'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除在类上不存在的字段
      whitelist: true,
    }),
  )
  app.useGlobalInterceptors(new TransformInterceptor())
  // // helmet头部安全
  // app.use(helmet())

  // // rateLimit限流
  // app.use(
  //   rateLimit({
  //     windowMs: 1 * 60 * 1000, // 1 minutes
  //     max: 300, // limit each IP to 100 requests per windowMs
  //   }),
  // )
  const config = new DocumentBuilder()
    .setTitle('NEST后台')
    .setDescription(
      '描述：<a href="http://localhost:3000/api">默认 json 链接</a>',
    )
    .setVersion('1.0.1')
    .setOpenAPIVersion('3.1.0')
    .addBearerAuth() // 添加授权
    .build()
  // 创建文档
  const document = SwaggerModule.createDocument(app, config)
  // 设置文档路径 为 api
  SwaggerModule.setup('api', app, document, { jsonDocumentUrl: 'swagger/json' })
  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
