import { NextApiResponse, NextApiRequest } from "next";
import requestNews from "./helper";
import authHandler from "./auth";
import { News } from "../../app/type/entity";
interface Query {
  q: string;
}
export default authHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await requestNews<News, Query>({
        path: "everything",
        queryOptions: { q: req.query.q.toString() },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(error.code).send(error);
    }
    res.end();
  }
);
