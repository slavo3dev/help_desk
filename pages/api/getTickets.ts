import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";


type Data = {
  question: []
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
)
{

	const query = supabase.from( "questions" ).select( "*" );
	const { data: question, error }: any = await query
		.order("like", { ascending: false })
		.limit( 1000 );
        
	if ( !error ) { 
		res.status(200).json({ question });  
	} {
		throw new Error("Oops, Ticket was not created, please try again");
	}
        
	
}