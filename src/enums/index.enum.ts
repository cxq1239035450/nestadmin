/**
 * 删除标志:0代表存在 1代表删除
 */
export enum DelFlagEnum {
  /**
   * 存在
   */
  NORMAL = '0',
  /**
   * 删除
   */
  DELETE = '1',
}

/**
 * 数据状态:0正常,1停用
 */
export enum StatusEnum {
  /**
   * 正常
   */
  NORMAL = '0',
  /**
   * 停用
   */
  STOP = '1',
}

/**
 * 性别:0男,1女
 */
export enum SexEnum {
  /**
   * 男
   */
  MAN = '0',
  /**
   * 女
   */
  WOMAN = '1',
}
