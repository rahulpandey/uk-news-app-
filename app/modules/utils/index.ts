interface IDefaultParam<B> {
  readonly path: string;
  readonly method?: "GET" | "PUT" | "POST" | "DELETE";
  readonly body?: B;
  readonly headers?: HeadersInit;
}
class ApiRequest {
  private static USERNAME = "rahul";
  private static PASSWORD = "rahulK@";
  private static API_URL = "http://localhost:3000/api/";

  static request = async <T, B = any>(params: IDefaultParam<B>): Promise<T> => {
    const body =
      typeof params.body === "object" ? JSON.stringify(params.body) : undefined;

    const authString = `${ApiRequest.USERNAME}:${ApiRequest.PASSWORD}`;
    let headers: HeadersInit | any = {
      "Content-type": "application/json",
      authorization: `Basic ${btoa(authString)}`,
    };

    if (params.headers) {
      headers = {
        ...headers,
        ...params.headers,
      };
    }
    try {
      const res = await fetch(`${ApiRequest.API_URL}${params.path}`, {
        method: params.method || "GET",
        body,
        mode: "cors",
        headers,
      });

      if (!res.ok) {
        const error = await res.json();
        return Promise.reject(error);
      }

      const response: T = await res.json();
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}
export default ApiRequest;
