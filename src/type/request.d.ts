export interface preResponse<T> {
  data: T
}
export interface Response<T> {
  code: Number
  data: T
  msg: String
}
