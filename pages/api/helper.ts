import { IError } from "./error";
import { request } from "https";
import { IncomingMessage } from "http";
const API_BASE_URI = process.env.BASE_URI;
const API_KEY = process.env.NEWS_API_KEY;
const DEFAULT_COUNTRY = process.env.COUNTRY;
interface IRequest<T> {
  path: "top-headlines" | "everything";
  queryOptions?: T;
  addCountry?: boolean;
}
const requestNews = async <T, B extends object = undefined>(
  param: IRequest<B>
): Promise<T | IError> => {
  const { path, queryOptions } = param;
  let uri = `${API_BASE_URI}${path}?apiKey=${API_KEY}`;
  if (param.addCountry) {
    uri = uri = `${uri}&country=${DEFAULT_COUNTRY}`;
  }
  if (queryOptions) {
    const query = Object.keys(queryOptions)
      .map((key) => {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(queryOptions[key])
        );
      })
      .join("&");
    uri = `${uri}&${query}`;
  }

  return new Promise((resolve, reject) => {
    request(uri, (response: IncomingMessage) => {
      const { statusCode } = response;
      if (statusCode >= 300) {
        reject({
          code: statusCode,
          message: "Unable to fetch news",
        });
      }
      const chunks = [];
      response.on("data", (chunk) => {
        chunks.push(chunk);
      });
      response.on("end", () => {
        const chunkResult = Buffer.concat(chunks).toString();
        const _result: T = JSON.parse(chunkResult);
        resolve(_result);
      });
    }).end();
  });
};

export default requestNews;
