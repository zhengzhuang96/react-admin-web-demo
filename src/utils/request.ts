import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { domain } from "../config/index";

export class Request {
  private baseConfig: AxiosRequestConfig = {
    // baseURL: config.domain + process.env.NODE_ENV === 'development' ? '/api' : '',
    baseURL: domain + "/api",
    headers: {},
    timeout: 8000,
  };

  // axios实例
  private instance: AxiosInstance = axios.create(this.baseConfig);

  public constructor() {
    this.setReqInterceptors();
    this.setResnterceptors();
  }

  // 设置请求头
  public setHeader = (headers: any) => {
    this.baseConfig.headers = {
      ...this.baseConfig.headers,
      ...headers,
      platform: "zhd",
    };
    this.instance = axios.create(this.baseConfig);
    this.setReqInterceptors();
    this.setResnterceptors();
  };

  // get请求
  public get = (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<any> =>
    this.instance({
      ...{ url, method: "get", params: data },
      ...config,
    });

  // post请求
  public post = (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<any> =>
    this.instance({
      ...{ url, method: "post", data },
      ...config,
    });

  // put请求
  public put = (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<any> =>
    this.instance({
      ...{ url, method: "put", data },
      ...config,
    });

  // put请求
  public del = (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<any> =>
    this.instance({
      ...{ url, method: "delete", params: data },
      ...config,
    });

  // 不经过统一的axios实例的get请求
  public postOnly = (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ) =>
    axios({
      ...this.baseConfig,
      ...{ url, method: "post", data },
      ...config,
    });

  // 不经过统一的axios实例的post请求
  public getOnly = (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ) =>
    axios({
      ...this.baseConfig,
      ...{ url, method: "get", params: data },
      ...config,
    });

  // delete请求,后端通过requestBody接收
  public deleteBody = (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ) =>
    this.instance({
      ...{ url, method: "delete", data },
      ...config,
    });

  // delete请求,后端通过后端通过requestParam接收
  public deleteParam = (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ) =>
    this.instance({
      ...{ url, method: "delete", params: data },
      ...config,
    });

  // 请求拦截器
  private setReqInterceptors = () => {
    this.instance.interceptors.request.use(
      (config) => {
        // 设置token
        const token = localStorage.getItem("token");
        config.headers = config.headers ?? {};
        if (token) {
          config.headers.token = `${token}`;
        }
        return config;
      },
      (err) => {
        // $message.error("请求失败");
        return Promise.reject(err);
      }
    );
  };

  // 响应拦截器
  private setResnterceptors = () => {
    this.instance.interceptors.response.use(
      (res) => {
        // if (res.status !== 200) return $message.error("系统错误，请联系管理员");

        // 获取验证码接口单独处理
        if (res.config.url == "/captcha") {
          return res.data;
        }

        const { code, data, message } = res.data;

        // 数据正确
        if (code === 0) {
          return data;
        }

        // token 报错
        if (code === -2) {
          localStorage.setItem("token", "");
          window.location.href = "/#/accounts/login";
        }

        // $message.error(message || "获取数据失败");
        return Promise.reject(res);
      },
      (err) => {
        // $message.error("服务器响应失败");
        return Promise.reject(err);
      }
    );
  };
}

export default new Request();
