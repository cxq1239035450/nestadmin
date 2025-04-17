import * as dayjs from 'dayjs'

export const getTime = (date?: string | Date): string => {
  return dayjs(date || new Date()).format('YYYY-MM-DD HH:mm:ss')
}

export const dateToCron = (date: Date): string => {
  // 实现代码
  return ``
}
