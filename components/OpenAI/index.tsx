import axios from "axios";
import { useState, FC } from "react";
import { Loader } from "../ui/Loader";
import classes from "./openai.module.css";

export const OpenAI: FC = () => {

	const [aiRes, setAiRes] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [questionInput, setQuestionInput] = useState<string>("");

	const handleApiAI = async () =>
	{
		setIsLoading(true);
		const res = await axios.post( "api/answerByAi", {
			questionInput
		} );
		setAiRes( res );
		setIsLoading(false);
	};
	return (
		<>
			<div className="max-w-sm rounded overflow-hidden shadow-lg w-full lg:max-w-full lg:flex">
				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full lg:max-w-full">
					<div className="mb-4 pl-8 pr-8">
						<label className="block text-gray-700 text-xl font-bold mb-2" >
                           Target Advices and Suggestions from Andrew Huberman or David Sinclair ( AI will find best ansers for you )
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Ask Question about diet, health or fitness..."
							value={ questionInput }
							onChange={ e => setQuestionInput( e.target.value ) } />
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline ml-8 mr-8"
							type="button"
							onClick={ () => handleApiAI() }>
                                Press For Answer
						</button>
					</div>
					{ isLoading ? <Loader title={"Please Wait...Answer is coming..."} /> :
						aiRes?.data?.answer.map( ( answer: { text: string; } ) =>
							<p key={ Math.random() } className="text-gray-700 text-base p-8">
								{ answer.text }
							</p> ) 
					}
				</div>
			</div>

		</>
	);
};