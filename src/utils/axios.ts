import axios, { AxiosRequestConfig, AxiosResponse, Method, } from "axios";
import { serverConfig } from "../../config/common";

export class AxiosUtils {

  private async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const axiosResponse = await axios.request<T>({
      ...config,
      timeout: config.timeout || serverConfig.axiosRequestTimeout
    });
    return axiosResponse;
  }
 
  public async getRequest<T>(url: string, options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const method: Method = 'GET';
    const config = {
      url,
      method: method,
      ...options
    }
    return await this.request<T>(config);
  }

  public async postRequest<T>(url: string, options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const method: Method = 'POST';
    const config = {
      url,
      method,
      ...options
    }
    const postResponse = await this.request<T>(config);
    return postResponse;
  }

  public async putRequest<T>(url: string, options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const method: Method = 'PUT';
    const config = {
      url,
      method,
      ...options
    }
    const putResponse = await this.request<T>(config);
    return putResponse;
  }

  public async deleteRequest<T>(url: string, options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const method: Method = 'DELETE';
    const config = {
      url,
      method,
      ...options
    }
    const deleteResponse = await this.request<T>(config);
    return deleteResponse;
  }

}
