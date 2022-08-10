import { AxiosResponse } from 'axios';
import { time } from './helper';

export type ResponsePacket<D = any> = {
  message: string;
  data: D
}

export type AxiosProvider<D = any> = () => Promise<AxiosResponse<ResponsePacket<D>>>;

class ApiInfo {
  /**
   * Throttle in minutes.
   */
  throttle: number = 0;

  /**
   * Last request timestamp.
   */
  lastRequestTime: number = 0;

  /**
   * The number of requests.
   */
  requestCount: number = 0;
}

class ApiManager {
  private axiosProviderMapping: Map<string, ApiInfo> = new Map();

  private getApiInfo(axiosProvider: AxiosProvider): ApiInfo {
    const providerStr = axiosProvider.toString();
    let apiInfo = this.axiosProviderMapping.get(providerStr);

    if (!apiInfo) {
      apiInfo = new ApiInfo();
      this.axiosProviderMapping.set(providerStr, apiInfo);
    }

    return apiInfo;
  }

  private checkExists(axiosProvider: AxiosProvider): boolean {
    const str = axiosProvider.toString();
    if (this.axiosProviderMapping.has(str)) {
      return true;
    } else {
      this.axiosProviderMapping.set(str, new ApiInfo());
      return false;
    }
  }

  public async request<D>(axiosProvider: AxiosProvider, throttle: number = -1): Promise<D> {
    const apiInfo = this.getApiInfo(axiosProvider);

    // set throttle if given
    if (throttle >= 0) apiInfo.throttle = throttle;

    // check throttle
    const currentTime = time();
    if (currentTime - apiInfo.lastRequestTime < throttle) {
      throw new ThrottleException();
    }
    apiInfo.lastRequestTime = currentTime;

    // cope with request
    apiInfo.requestCount++;

    const response = await axiosProvider();
    return response.data.data;
  }
}

export const apiSingleton = new ApiManager();

export const api = <D>(axiosProvider: AxiosProvider, throttle: number = 0): Promise<D> => {
  return apiSingleton.request<D>(axiosProvider, throttle);
};

export class ThrottleException extends Error {
  name = 'ThrottleException';
}