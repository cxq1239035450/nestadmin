import * as dayjs from 'dayjs'

export const getTime = (cron?: string | Date): string => {
  return dayjs(cron || '').format('YYYY-MM-DD HH:mm:ss')
}
export const dateToCron = (date: Date): string => {
  // 实现代码
  return ``
}
