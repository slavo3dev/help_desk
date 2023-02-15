import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";


type Data = {
    answer: {
        response: {
            data: {
                choices: string
            }
        };
    };
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

	const config = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
	} );
    
	const question = req.body.questionInput ? req.body.questionInput : "";
    

	const openAi = new OpenAIApi( config );

	const response: any = await openAi.createCompletion( {
		model: "text-davinci-003",
		temperature: 0,
		max_tokens: 3600,
		prompt: `Answare the question about health, fitness, wellness and diet! 
        Quesetion: ${ question }. 
        Advices, Suggestions from neuroscientist Andrew Huberman or Professor in the Department of Genetics David Sinclair`
	} );
    
	res.status(200).json({ answer: response.data.choices });  

}