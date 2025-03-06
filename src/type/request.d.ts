export interface preResponse<T> {
  data: T
}
export interface Response<T> {
  code: number
  data: T
  msg: string
}
