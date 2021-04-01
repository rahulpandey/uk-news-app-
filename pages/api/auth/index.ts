import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
const USERNAME = process.env.API_USERNAME;
const PASSWORD = process.env.API_PASSWORD;
const authHandler = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const authString = req.headers.authorization;
  if (!authString) {
    res.status(401).send({ message: "unauthorized access" });
  } else {
    const decodedString = Buffer.from(
      authString.split(" ")[1],
      "base64"
    ).toString("ascii");

    const results = decodedString.split(":");
    if (USERNAME === results[0] && PASSWORD === results[1]) {
      return await fn(req, res);
    } else {
      res.status(401).send({ message: "unauthorized access" });
    }
  }
};
export default authHandler;
