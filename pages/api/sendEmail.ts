// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  email: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
)
{
	console.log("Req Body: ", req.body);
	res.status(200).json({ email: "send email" });
}
