import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useUser } from "src/composables/useUser";
import { useRouter } from "vue-router";

const router = useRouter();

enum StatusCode {
  Unauthorized = 401,
}

const injectToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { user } = useUser();
  const token = user.value.token;
  if (token && token != null && token != "" && !config.headers!.Authorization) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: (import.meta as any).env.VITE_VUE_APP_BASE_URL as string,
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        return this.handleError(error);
      }
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleError(error: any) {
    let status: any;
    if (error.status) {
      status = error.status;
    } else if (error.response.status) {
      status = error.response.status;
    }
    switch (status) {
      case StatusCode.Unauthorized: {
        const { cleanLS } = useUser();
        cleanLS();
        router.push({ name: "Login" });
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
