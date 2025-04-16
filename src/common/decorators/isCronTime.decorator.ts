import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

export function IsCronTime(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCronTime',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // 使用正则表达式验证值是否符合 cron time 格式
          const cronTimeRegex =
            /^(\*|(\d+|,|-|\*|\?|\/)+)(\s+(\d+|,|-|\*|\?|\/)+){4}$/
          return cronTimeRegex.test(value)
        },
      },
    })
  }
}
