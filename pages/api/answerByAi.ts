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
	const mentor = req.body.mentor === "Andrew" ? "neuroscientist Andrew Huberman" : "Professor in the Department of Genetics David Sinclair"; 

	const openAi = new OpenAIApi( config );

	const response: any = await openAi.createCompletion( {
		model: "text-davinci-003",
		temperature: 0,
		max_tokens: 3600,
		prompt: `Answare the question abouton on how to improve your mental and physical health, fitness, wellness, diet, supplements Quesetion: ${ question }. Advices, Suggestions from ${mentor}`
	} );
    
	res.status(200).json({ answer: response.data.choices });  

}