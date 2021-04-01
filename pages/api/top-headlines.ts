// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiResponse, NextApiRequest } from "next";
import requestNews from "./helper";
import authHandler from "./auth";
import { News } from "../../app/type/entity";

export default authHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await requestNews<News>({
        path: "top-headlines",
        addCountry: true,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(error.code).send(error);
    }
    res.end();
  }
);
