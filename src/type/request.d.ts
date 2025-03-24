
declare namespace Api {
  namespace Common {
    // 响应体
    type Response<T = any> = {
      code: number; // 状态码
      data?: T; // 业务数据
      msg: string; // 响应信息
    };
    // 分页数据
    type PageResponse<T = any> = {
      code: number; // 状态码
      current?: number; // 页码
      size?: number; // 当前页条数
      total?: number; // 总条数
      records: T[]; // 业务数据
    };
  }
 }