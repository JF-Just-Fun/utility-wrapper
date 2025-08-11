export interface IOptions {
  /**
   * 是否限制输入 false只返回正确与否 true直接返回限制后的结果
   */
  limit: boolean;
}

export interface IEmailLimiterOptions {
  suffix?: string;
}

export interface LimiterFnRes {
  valid: boolean;
  value: string;
}

export type TLimiterFn = (v: string) => LimiterFnRes;
