// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";


type Data = {
  ticket: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
)
{
	const { title, description, category, email } = req.body;
	try {
		await supabase
			.from("questions")
			.insert([{ title, description, category, email }])
			.select();
        
		res.status(200).json({ ticket: "Ticket Created" });
	} catch (error) {
		throw new Error("Oops, Ticket was not created, please try again");
        
	}
}
